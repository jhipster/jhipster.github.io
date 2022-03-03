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

As of JHipster v7.8.0, module support was merged into blueprint support. So the same rules apply.

Before creating a Blueprint, make sure you have read [Blueprint Basics](/module/blueprint-basics)

## Hooks

Hooks support have been removed for JHipster 8. For migration, you can use the following side-by-side blueprints to simulate hooks.

- Rename your module app and entity generators (if they exist) to app-module and entity-module
- Add the following generators.

App generator for post app hooks:

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

Entity generator for post entity hooks:

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