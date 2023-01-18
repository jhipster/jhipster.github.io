---
layout: default
title: Creating a module
permalink: /modules/creating-a-module/
redirect_from:
  - /creating_a_module.html
  - /modules/creating_a_module.html
sitemap:
    priority: 0.7
    lastmod: 2015-12-05T18:40:00-00:00
---

# <i class="fa fa-cube"></i> Creating a stand alone Blueprint (aka module)

As of JHipster v7.9.0, module support was merged into blueprint support. So the same rules apply.

Before creating a Blueprint, make sure you have read [Blueprint Basics](/modules/extending-and-customizing/#-blueprint-basics)

## Example

[JHipster Ionic](https://github.com/jhipster/generator-jhipster-ionic) was converted from a module to a blueprint.

## Migration

- Rename your module app and entity generators (if they exist) to something else like app-module and entity-module

```sh
mv generators/app generators/app-module
mv generators/entity generators/entity-module
```

- Rename every other generator that matches a generator-jhipster generator (otherwise they will be called as a blueprint).
And update referentes.
- Add a custom cli (`cli/cli.mjs`)

```javascript
#!/usr/bin/env node

import { runJHipster, done, logger } from 'generator-jhipster/esm/cli';
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

- Add the cli to `package.json`

```json
{
  "bin": {
    "jhipster-module": "cli/cli.mjs"
  }
}
```

### Hooks

Hooks support will be removed for JHipster 8. For migration, you can use the following side-by-side blueprints to simulate hooks.

- Add the following generators.

App generator (`generators/app/index.mjs`) for post app hooks:

```javascript
import chalk from 'chalk';
import { GeneratorBase } from 'generator-jhipster';
import { INSTALL_PRIORITY } from 'generator-jhipster/priorities';

export default class extends GeneratorBase {
  constructor(args, opts, features) {
    super(args, opts, features);

    if (this.options.help) return;

    if (!this.options.jhipsterContext) {
      throw new Error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints myBlueprint')}`);
    }

    this.sbsBlueprint = true;
  }

  get [INSTALL_PRIORITY]() {
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

Entity generator (`generators/entity/index.mjs`) for post entity hooks:

```javascript
import chalk from 'chalk';
import { GeneratorBase } from 'generator-jhipster';
import { INSTALL_PRIORITY } from 'generator-jhipster/priorities';

export default class extends GeneratorBase {
  constructor(args, opts, features) {
    super(args, opts, features);

    if (this.options.help) return;

    if (!this.options.jhipsterContext) {
      throw new Error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints myBlueprint')}`);
    }

    this.sbsBlueprint = true;
  }

  get [INSTALL_PRIORITY]() {
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
