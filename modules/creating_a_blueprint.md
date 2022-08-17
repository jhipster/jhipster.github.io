---
layout: default
title: Creating a Blueprint
permalink: /modules/creating-a-blueprint/
redirect_from:
  - /creating_a_blueprint.html
  - /modules/creating_a_blueprint.html
sitemap:
    priority: 0.7
    lastmod: 2015-12-05T18:40:00-00:00
---

# <i class="fa fa-cube"></i> Creating a blueprint

A JHipster blueprint is a Yeoman generator that is [composed](http://yeoman.io/authoring/composability.html) from a specific JHipster sub-generator to extend the functionality of that sub-generator. The blueprint can override any defined getter of the sub generator and provide its own templates and functionality.

JHipster blueprints are listed on the [JHipster marketplace](/modules/marketplace/) with the `jhipster-blueprint` label.

This allows to create third-party blueprints that can override a specific part of JHipster, say for example only the client side templates.

## Using a blueprint

To use a blueprint, run the below command

```bash
jhipster --blueprints <blueprint name>
```

## Generating the blueprint

We recommend to use the builtin `generate-blueprint` generator to kickstart your blueprint

```bash
mkdir my-blueprint && cd my-blueprint

jhipster generate-blueprint
```
A JHipster blueprint must have `generator-jhipster` as a dependency and should import the appropriate sub-generator to override it.

```javascript
import chalk from 'chalk';
import ClientGenerator from 'generator-jhipster/generators/client';
import {
  INITIALIZING_PRIORITY,
  // Others priorities omitted for brevity
} from 'generator-jhipster/priorities';

export default class extends ClientGenerator {
  constructor(args, opts, features) {
    super(args, opts, features);

    if (this.options.help) return;

    if (!this.options.jhipsterContext) {
      throw new Error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints myBlueprint')}`);
    }
  }

  get [INITIALIZING_PRIORITY]() {
    return {
      // async preInitializingTemplateTask() {},
      ...super._initializing(),
      // async postInitializingTemplateTask() {},
    };
  }

  // Others priorities omitted for brevity
}
```

## Local Blueprints

A local blueprint is implemented inside your project's `.blueprint` directory. It's detected and used by default.

Kickstart using [Generating the blueprint](#generating-the-blueprint) or run:

```
jhipster generate-blueprint --local-blueprint --sub-generators app --all-priorities
```

Multiples sub-generators are useful for organizing multiples features. Local blueprints have a limited scope (the application), so a single sub-generator, the main one, is probably enough to customize your application (client and server). 

## Developing

### Priorities

There are multiple ways to customize a priority from JHipster.

1) Let JHipster handle the priority, blueprint doesn't override anything.

```javascript
    get [INITIALIZING_PRIORITY]() {
        return super.initializing;
    }
```

2) Override the entire priority, this is when the blueprint takes control of a priority.

```javascript
  get [INITIALIZING_PRIORITY]() {
    return {
      myCustomInitPriorityStep() {
        // Do all your stuff here
      },
      myAnotherCustomInitPriorityStep(){
        // Do all your stuff here
      }
    };
  }
```

3) Partially override a priority, this is when the blueprint gets the priority from JHipster and customizes it.

```javascript
    get [INITIALIZING_PRIORITY]() {
        return {
            ...super._initializing(),
            displayLogo() {
                // override the displayLogo method from the initializing priority of JHipster
            },
            myCustomInitPriorityStep() {
                // Do all your stuff here
            },
        };
    }
```

4) Decorate a priority, this is when the blueprint runs custom steps before or after the priority coming from JHipster.

This is usefull to customize properties that will be used during the priority to generate derived properties.

```javascript
    // Run the blueprint steps before and/or after any parent steps
    get initializing() {
        return {
            myCustomPreInitStep() {
                // Stuff to do BEFORE the JHipster steps
                // Eg: set name that will generate nameCapitalized, nameLowercase, etc.
            }
            ...super._initializing(),
            myCustomPostInitStep() {
                // Stuff to do AFTER the JHipster steps
            }
        };
    }
```
