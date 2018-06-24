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

# <i class="fa fa-cube"></i> Creating a module

A JHipster module is a Yeoman generator that is [composed](http://yeoman.io/authoring/composability.html) with a specific JHipster sub-generator to inherit some of the common functionality from JHipster. A JHipster module can also register itself to act as a hook from the JHipster generator.

JHipster modules are listed on the [JHipster marketplace]({{ site.url }}/modules/marketplace/).

This allows to create third-party generators that have access to the JHipster variables and functions, and act like standard JHipster sub-generators.
The hook mechanism invokes third-party generators before and after app generation and entity generation.

## Example

The [JHipster Fortune module](https://github.com/jdubois/generator-jhipster-fortune) generates a "fortune cookie" page in a JHipster-generated application.

It is our sample module that showcases how you can use JHipster's variables and functions in order to create your own generator.

Or, you can use the [JHipster module generator](https://github.com/jhipster/generator-jhipster-module) to help you to initialize your module.

## Basic rules for a JHipster module

A JHipster module:

- is an NPM package, and is a Yeoman generator.
- follows an extension of the Yeoman rules listed at [http://yeoman.io/generators/](http://yeoman.io/generators/) and can be installed, used and updated using the "yo" command. Instead of being prefixed by "generator-", it is prefixed by "generator-jhipster-", and instead of having just the "yeoman-generator" keyword, it must have two keywords, "yeoman-generator" and "jhipster-module".
- A JHipster module registering as a hook should not call `process.exit` in its generators being hooked.

## Import the generator-jhipster

A JHipster module must import the generator-jhipster:

```
    const util = require('util');
    const BaseGenerator = require('generator-jhipster/generators/generator-base');
    const jhipsterConstants = require('generator-jhipster/generators/generator-constants');

    const JhipsterGenerator = generator.extend({});
    util.inherits(JhipsterGenerator, BaseGenerator);

    module.exports = JhipsterGenerator.extend({

        // all your yeoman code here

    });
```

Then, you can access to JHipster's variables and functions directly.

## Hooks

JHipster will call certain hooks before and after some of its tasks, currently available and planned tasks are listed below.

- Post Entity creation hook
- Pre Entity creation hook [planned]
- Post App creation hook [planned]
- Pre App creation hook [planned]

[JHipster module generator](https://github.com/jhipster/generator-jhipster-module) now has option to generate this.
A JHipster module can register to act as a hook when its main generator is run by the end user. You need to call the `registerModule` method from your main (app) generator to register as hook, you need to pass the below parameters in the method as below

```javascript
this.registerModule(npmPackageName, hookFor, hookType[, callbackSubGenerator[, description]])
```

- `npmPackageName` npm package name of the generator. e.g: `jhipster-generator-fortune`
- `hookFor` which Jhipster hook from above this should be registered to ( values must be `entity` or `app`)
- `hookType` where to hook this at the generator stage ( values must be `pre` or `post`)
- `callbackSubGenerator` [optional] sub generator to invoke, if this is not given the module's main (app) generator will be called, e.g: `bar` or `foo` generator
- `description` [optional] description of the generator, if this is not given we will generate a default based on the npm name given

## Available variables and functions

### Variables from configuration:

You have to use this function:

You can access to configuration in `.yo-rc.json`:

```
    this.jhipsterAppConfig = this.getJhipsterAppConfig();
    this.baseName = this.jhipsterAppConfig.baseName;
    this.packageName = this.jhipsterAppConfig.packageName;
    this.clientFramework = this.jhipsterAppConfig.clientFramework;
```

### Global variables:

You can use constants in [generator-constants](https://github.com/jhipster/generator-jhipster/blob/master/generators/generator-constants.js):

```
    const javaDir = `${jhipsterConstants.SERVER_MAIN_SRC_DIR + this.packageFolder}/`;
    const resourceDir = jhipsterConstants.SERVER_MAIN_RES_DIR;
    const webappDir = jhipsterConstants.CLIENT_MAIN_SRC_DIR;
```

### Functions:

You can use all functions in [generator-base](https://github.com/jhipster/generator-jhipster/blob/master/generators/generator-base.js):

```
    this.angularAppName = this.getAngularAppName(); // get the Angular application name.
    this.printJHipsterLogo(); // to print the JHipster logo
```

**Note**: The functions in `generator-base.js` and variables in `generator-constants.js` are part of public API and hence will follow semver versioning. But other files like `generator-base-private.js`, `utils.js` etc will not follow semver versioning and might break method signature across minor versions.

## Registering a module to the JHipster marketplace

To have your module available in [the JHipster marketplace]({{ site.url }}/modules/marketplace/), you need to make sure you have the 2 keyword `yeoman-generator` and `jhipster-module` in your published npm `package.json`.
If you find any entry in the marketplace which is not a JHipster module, you can help to blacklist it by adding it to the `blacklistedModules` section of the [modules-config.json file](https://github.com/jhipster/jhipster.github.io/blob/master/modules/marketplace/data/modules-config.json) by doing a Pull Request to the [jhipster/jhipster.github.io project](https://github.com/jhipster/jhipster.github.io).

Your module will become "verified" if the JHipster team verifies it.

Once you publish your module to NPM, your module will become available in our marketplace.
