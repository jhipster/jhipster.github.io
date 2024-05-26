---
layout: default
title: Création d'un Blueprint autonome (alias module)
permalink: /modules/creating-a-module/
redirect_from:
  - /creating_a_module.html
  - /modules/creating_a_module.html
sitemap:
    priority: 0.7
    lastmod: 2015-12-05T18:40:00-00:00
---

# <i class="fa fa-cube"></i> Création d'un Blueprint autonome (alias module)

À partir de JHipster v7.9.0, le support des modules a été fusionné avec le support des blueprints. Ainsi, les mêmes règles s'appliquent.

Avant de créer un Blueprint, assurez-vous d'avoir lu [Principes de base des Blueprint](/modules/extending-and-customizing/#-blueprint-basics).

## Exemple

[JHipster Ionic](https://github.com/jhipster/generator-jhipster-ionic) a été converti d'un module en blueprint.

## Migration

- Renommez vos générateurs d'application et d'entité de module (s'ils existent) en quelque chose comme app-module et entity-module

```sh
mv generators/app generators/app-module
mv generators/entity generators/entity-module
```

- Renommez tous les autres générateurs qui correspondent à un générateur-jhipster (sinon, ils seront appelés comme un blueprint).
Et mettez à jour les références.
- Ajoutez un CLI personnalisé  (`cli/cli.mjs`)

```javascript
#!/usr/bin/env node

import { runJHipster, done, logger } from 'generator-jhipster/cli';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, basename } from 'path';

// Get package name to use as namespace.
// Allows blueprints to be aliased.
const packagePath = dirname(dirname(fileURLToPath(import.meta.url)));
const packageFolderName = basename(packagePath);

(async () => {
  const { version, bin } = JSON.parse(await readFile(new URL('../package.json', import.meta.url)));
  const executableName = Object.keys(bin)[0];

  runJHipster({
    executableName,
    executableVersion: version,
    defaultCommand: 'app-module', // Generator to be used as entry point to replace `yo` command
    blueprints: {
      [packageFolderName]: version,
    },
    lookups: [{ packagePaths: [packagePath], lookups: ['generators'] }],
  }).catch(done);
})();

process.on('unhandledRejection', up => {
  logger.error('Unhandled promise rejection at:');
  logger.fatal(up);
});
```

- Ajoutez le CLI à `package.json`

```json
{
  "bin": {
    "jhipster-module": "cli/cli.mjs"
  }
}
```

### Hooks

Le support des hooks sera supprimé pour JHipster 8. Pour la migration, vous pouvez utiliser les blueprints côte-à-côte suivants pour simuler des hooks.

- Ajoutez les générateurs suivants.

Générateur d'application (`generators/app/index.mjs`) pour les hooks post-app:

```javascript
import chalk from 'chalk';
import GeneratorBaseApplication from 'generator-jhipster/generators/base-application';
import { INSTALL_PRIORITY } from 'generator-jhipster/priorities';

export default class extends GeneratorBaseApplication {
  constructor(args, opts, features) {
    super(args, opts, features);

    if (this.options.help) return;

    if (!this.options.jhipsterContext) {
      throw new Error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints myBlueprint')}`);
    }

    this.sbsBlueprint = true;
  }

  get [GeneratorBaseApplication.INSTALL]() {
    return {
      async afterRunHook() {
        await this.composeWithJHipster(`my-blueprint:app-module`, {
          appConfig: this.configOptions,
        });
      },
    };
  }
}
```

Générateur d'entité  (`generators/entity/index.mjs`) pour les hooks post-entité :

```javascript
import chalk from 'chalk';
import GeneratorBaseApplication from 'generator-jhipster/generators/base-application';

export default class extends GeneratorBaseApplication {
  constructor(args, opts, features) {
    super(args, opts, features);

    if (this.options.help) return;

    if (!this.options.jhipsterContext) {
      throw new Error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints myBlueprint')}`);
    }

    this.sbsBlueprint = true;
  }

  get [GeneratorBaseApplication.INSTALL]() {
    return {
      async afterRunHook() {
        await this.composeWithJHipster(`my-blueprint:entity-module`, {
          entityConfig: this.options.jhipsterContext.context,
        });
      },
    };
  }
}
```
