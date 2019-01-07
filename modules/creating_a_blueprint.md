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

JHipster blueprints are listed on the [JHipster marketplace]({{ site.url }}/modules/marketplace/) with the `jhipster-blueprint` label.

This allows to create third-party blueprints that can override a specific part of JHipster, say for example only the client side templates.

## Using a blueprint

To use a blueprint, run the below command

```bash
jhipster --blueprint <blueprint name>
```

## Example

The [JHipster Kotlin](https://github.com/jhipster/jhipster-kotlin) blueprint replaces most of the server side Java code with equivalent Kotlin code.

It is our official blueprint that showcases how you can create your own blueprint.

The [JHipster Sample Blueprint](https://github.com/hipster-labs/generator-jhipster-sample-blueprint) shows how a client sub-generator can be overriden.

Or, you can use the [JHipster blueprint generator](https://github.com/jhipster/generator-jhipster-blueprint) to help you to initialize your blueprint. 

To use the JHipster blueprint generator run the following commands

```bash
npm install -g generator-jhipster-blueprint

mkdir my-blueprint && cd my-blueprint

yo jhipster-blueprint
```

Choose the sub-generators that you would like to override while answering the questions.

## Basic rules for a JHipster blueprint

A JHipster blueprint:

- is an NPM package, and is a Yeoman generator.
- follows an extension of the Yeoman rules listed at [http://yeoman.io/generators/](http://yeoman.io/generators/) and can be installed, used and updated using the `yo` command. Instead of being prefixed by `generator-`, it is prefixed by `generator-jhipster-`, and instead of having just the `yeoman-generator` keyword, it must have 2 keywords, `yeoman-generator` and `jhipster-blueprint`.
- A blueprint can only extend the following sub-generators (under the generators folder)
    - common
    - client
    - server
    - entity
    - entity-client
    - entity-server
    - entity-i18n
    - spring-controller
    - spring-service

## Import the generator-jhipster

A JHipster blueprint must have generator-jhipster as a dependency and should import the appropriate sub generator to override it.

```javascript
    const chalk = require('chalk');
    const ClientGenerator = require('generator-jhipster/generators/client');
    ...

    module.exports = class extends ClientGenerator {
        constructor(args, opts) {
            super(args, Object.assign({ fromBlueprint: true }, opts)); // fromBlueprint variable is important

            const jhContext = this.jhipsterContext = this.options.jhipsterContext;

            if (!jhContext) {
                this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint helloworld')}`);
            }

            this.configOptions = jhContext.configOptions || {};
            // This sets up options for this sub generator and is being reused from JHipster
            jhContext.setupClientOptions(this, jhContext);
        }

        get initializing() {
            // Here we are not overriding this phase and hence its being handled by JHipster
            return super._initializing();
        }

        // other phases of the sub generator
    }
```

Any method beginning with `_` can be reused from the superclass that is being extended, for example `ClientGenerator` in the example above.

Each JHipster sub-generator is made of multiple yeoman phases, each phase is a getter, `get initializing` for example. A blueprint can customize one or more phases of the sub-generator that it is overriding.

There are multiple ways to customize a phase from JHipster.

1) Let JHipster handle a phase, blueprint doesnt override anything.

```javascript
    get initializing() {
        return super._initializing();
    }
```

2) Override the entire phase, this is when the blueprint takes control of a phase

```javascript
    get initializing() {
        return {
            myCustomInitPhaseStep() {
                // Do all your stuff here
            },
            myAnotherCustomInitPhaseStep(){
                // Do all your stuff here
            }
        };
    }
```

3) Partially override a phase, this is when the blueprint gets the phase from JHipster and customizes it.

```javascript
    get initializing() {
        const phaseFromJHipster = super._initializing();
        const myCustomPhaseSteps = {
            displayLogo() {
                // override the displayLogo method from the _initializing phase of JHipster
            },
            myCustomInitPhaseStep() {
                // Do all your stuff here
            },
        }
        return Object.assign(phaseFromJHipster, myCustomPhaseSteps);
    }
```

You can also access to JHipster's variables and functions directly from a Blueprint.

## Available variables and functions

### Variables from configuration:

You can access to configuration in `.yo-rc.json` which will consist of both the JHipster config and your blueprint config.

### Global variables:

You can use constants in [generator-constants](https://github.com/jhipster/generator-jhipster/blob/master/generators/generator-constants.js):

```javascript
    const javaDir = `${jhipsterConstants.SERVER_MAIN_SRC_DIR + this.packageFolder}/`;
    const resourceDir = jhipsterConstants.SERVER_MAIN_RES_DIR;
    const webappDir = jhipsterConstants.CLIENT_MAIN_SRC_DIR;
```

### Functions:

You can use all functions in [generator-base](https://github.com/jhipster/generator-jhipster/blob/master/generators/generator-base.js):

```javascript
    this.angularAppName = this.getAngularAppName(); // get the Angular application name.
    this.printJHipsterLogo(); // to print the JHipster logo
```

**Note**: The functions in `generator-base.js` and variables in `generator-constants.js` are part of public API and hence will follow semver versioning. But other files like `generator-base-private.js`, `utils.js` etc will not follow semver versioning and might break method signature across minor versions.

## Running local Blueprint version for development

During development of blueprint, please note the below steps. they are very important.

1. Link your blueprint globally 

Note: If you do not want to link the blueprint(step 3) to each project being created, use NPM instead of Yarn as yeoman doesn't seem to fetch globally linked Yarn modules. On the other hand, this means you have to use NPM in all the below steps as well.

```bash
cd my-blueprint
npm link
```

2. Link a development version of JHipster to your blueprint (optional: required only if you want to use a non-released JHipster version, like the master branch or your own custom fork)

```bash
cd generator-jhipster
npm link

cd my-blueprint
npm link generator-jhipster
```

3. Create a new folder for the app to be generated and link JHipster and your blueprint there

```bash
mkdir my-app && cd my-app

npm link generator-jhipster-myblueprint
npm link generator-jhipster (Optional: Needed only if you are using a non-released JHipster version)

jhipster -d --blueprint myblueprint

```

## Registering a blueprint to the JHipster marketplace

To have your blueprint available in [the JHipster marketplace]({{ site.url }}/modules/marketplace/), you need to make sure you have the two keyword `yeoman-generator` and `jhipster-blueprint` in your published npm `package.json`.
If you find any entry in the marketplace which is not a JHipster module or blueprint, you can help to blacklist it by adding it to the `blacklistedModules` section of the [modules-config.json file](https://github.com/jhipster/jhipster.github.io/blob/master/modules/marketplace/data/modules-config.json) by doing a Pull Request to the [jhipster/jhipster.github.io project](https://github.com/jhipster/jhipster.github.io).


Once you publish your blueprint to NPM, your blueprint will become available in our marketplace.
