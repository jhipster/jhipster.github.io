---
layout: default
title: Blueprint Basics
permalink: /modules/extending-and-customizaing/
redirect_from:
  - /extending_and_customizaing.html
  - /modules/extending_and_customizaing.html
sitemap:
    priority: 0.7
    lastmod: 2015-12-05T18:40:00-00:00
---

# <i class="fa fa-cube"></i> Blueprint Basics

JHipster has support for `plugins`, and we call them `blueprints` and `modules`.

Prior to JHipster v7.7.0, `modules` were yeoman generators executed using `yo`, extends `generators-jhipster`s `generator-base` class and register hooks to integrate into JHipster workflow.

As of JHipster v7.7.0, `modules` are `blueprints` with stand-alone generators (not blueprinted) with custom cli.
So we may refer them as standalone blueprints or just blueprints from now on.

## Basic rules for a JHipster blueprint

JHipster blueprints:

- are NPM packages, and are Yeoman generators.
- follows an extension of the Yeoman rules listed at [https://yeoman.io/authoring/index.html](https://yeoman.io/authoring/index.html). Instead of being prefixed by `generator-`, it is prefixed by `generator-jhipster-`, and instead of having just the `yeoman-generator` keyword, it must have 2 keywords, `yeoman-generator` and `jhipster-blueprint`.

## Usage

To use a blueprint, run the below command

```bash
jhipster --blueprints <blueprint name>
```

Or use the custom provided cli:

```bash
jhipster-my-blueprint
```

### Examples

JHipster has many official blueprints, some examples:

- [JHipster Kotlin](https://github.com/jhipster/jhipster-kotlin) blueprint replaces most of the server side Java code with equivalent Kotlin code.
- [JHipster.NET](https://github.com/jhipster/jhipster-dotnetcore) blueprint replaces the entire server side with .NET implementation.
- [JHipster NodeJS](https://github.com/jhipster/generator-jhipster-nodejs) blueprint replaces the entire server side with NestJS implementation.
- [Svelte Hipster](https://github.com/jhipster/generator-jhipster-svelte) blueprint replaces the entire client side with Svelte implementation.
- [JHipster Native](https://github.com/jhipster/generator-jhipster-native) blueprint customizes JHipster applications with Spring Native compatibility.

### Side-by-side blueprint

Each generator can be a sbs blueprint. A sbs blueprint doesn't change the original generator behavior, but can customize the behavior and the result.
Side-by-side blueprint makes easier to support multiple JHipster versions and port to a new JHipster version.

To make the generator side-by-side, add this to the constructor:

```js
this.sbsBlueprint = true;
```

Example: [server generator at Native Blueprint](https://github.com/mshima/generator-jhipster-native/blob/bb9c042f6bc70a26ba8037e951c93dc1d1820983/generators/server/generator.mjs#L17).
At this example the generator [customizes package.json](https://github.com/mshima/generator-jhipster-native/blob/bb9c042f6bc70a26ba8037e951c93dc1d1820983/generators/server/generator.mjs#L26-L35), [removes files](https://github.com/mshima/generator-jhipster-native/blob/bb9c042f6bc70a26ba8037e951c93dc1d1820983/generators/server/generator.mjs#L37-L40), [customizes pom.xml](https://github.com/mshima/generator-jhipster-native/blob/bb9c042f6bc70a26ba8037e951c93dc1d1820983/generators/server/generator.mjs#L42-L186), [customizes java files](https://github.com/mshima/generator-jhipster-native/blob/bb9c042f6bc70a26ba8037e951c93dc1d1820983/generators/server/generator.mjs#L211-L307), [customizes cypress](https://github.com/mshima/generator-jhipster-native/blob/bb9c042f6bc70a26ba8037e951c93dc1d1820983/generators/server/generator.mjs#L321-L329) and so one.

Side-by-side blueprint will be used to create hooks and help migrate a existing module and will be covered at [Creating a module](/modules/creating-a-module).

### Custom cli

Standalone blueprints can be executed using `yo`, but `yo` is aggressive in generators discovery (can be slow) and lacks some improvements JHipster cli provides like help and jhipster integration.
So we recommend using `jhipster` cli or custom cli based on generator-jhipster.

`jhipster` command executes the generator-jhipster version you have installed globally.
A custom cli will execute the dependent generator-jhipster version, so will make sure to use the supported generator-jhipster version.

Custom cli allows to execute a custom generator and will be covered at [Creating a module](/modules/creating-a-module).

## Development

### Application configuration:

JHipster configuration follows [yeoman configuration](https://yeoman.io/authoring/storage.html) pattern and provides additional support for blueprint config.

`config` and `jhipsterConfig` properties stores the common config and write to `generator-jhipster` key at `.yo-rc.json` file.
`blueprintStorage` and `blueprintConfig` properties stores the blueprint specific config and write to `generator-jhipster-(my-blueprint)` key at `.yo-rc.json` file.

`config` and `blueprintStorage` are [Storage instances](https://yeoman.github.io/generator/Storage.html).
While `jhipsterConfig` and `blueprintConfig` are [proxy objects](https://yeoman.github.io/generator/Storage.html#createProxy) for `config` and `blueprintStorage` storages for convenience.

### Global constants:

You can use constants in [generator-constants](https://github.com/jhipster/generator-jhipster/blob/main/generators/generator-constants.js):

```javascript
    const javaDir = `${jhipsterConstants.SERVER_MAIN_SRC_DIR + this.packageFolder}/`;
    const resourceDir = jhipsterConstants.SERVER_MAIN_RES_DIR;
    const webappDir = jhipsterConstants.CLIENT_MAIN_SRC_DIR;
```

### Functions:

You can use all functions in [generator-base](https://github.com/jhipster/generator-jhipster/blob/main/generators/generator-base.js):

## Running local Blueprint version for development

During development of blueprint, please note the below steps. they are very important.

1. Link your blueprint globally 

Note: If you do not want to link the blueprint(step 3) to each project being created.

```bash
cd generator-jhipster-my-blueprint
npm link
```

2. Link a development version of JHipster to your blueprint (optional: required only if you want to use a non-released JHipster version, like the main branch or your own custom fork)

```bash
cd generator-jhipster
npm link

cd generator-jhipster-my-blueprint
npm link generator-jhipster
```

Or install generator-jhipster from git:

```bash
cd generator-jhipster-my-blueprint
npm install jhipster/generator-jhipster
```

3. Create a new folder for the app to be generated, and run JHipster ignoring JHipster dependencies (otherwise a released version will be installed each time npm install/ci is called)

```bash
mkdir my-app && cd my-app

jhipster --blueprints my-blueprint --skip-jhipster-dependencies
```

4. Once the blueprint/generator-jhipster was released re-add the jhipster dependencies for reproducibility

```bash
jhipster --no-skip-jhipster-dependencies
```

## Registering a blueprint to the JHipster marketplace

To have your blueprint available in [the JHipster marketplace]({{ site.url }}/modules/marketplace/), you need to make sure you have the two keyword `yeoman-generator` and `jhipster-blueprint` in your published npm `package.json`.
If you find any entry in the marketplace which is not a JHipster module or blueprint, you can help to blacklist it by adding it to the `blacklistedModules` section of the [modules-config.json file](https://github.com/jhipster/jhipster.github.io/blob/main/modules/marketplace/data/modules-config.json) by doing a Pull Request to the [jhipster/jhipster.github.io project](https://github.com/jhipster/jhipster.github.io).


Once you publish your blueprint to NPM, your blueprint will become available in our marketplace.
