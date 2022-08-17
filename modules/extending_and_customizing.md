---
layout: default
title: Blueprint Basics
permalink: /modules/extending-and-customizing/
redirect_from:
  - /extending_and_customizing.html
  - /modules/extending_and_customizing.html
sitemap:
    priority: 0.7
    lastmod: 2015-12-05T18:40:00-00:00
---

# <i class="fa fa-cube"></i> Blueprint Basics

JHipster has support for `plugins`, and we call them `blueprints` and `modules`.

Prior to JHipster v7.9.0, `modules` were Yeoman generators executed using `yo`, extended `generators-jhipster`'s `generator-base` class, and registered hooks to integrate into JHipster's workflow.

As of JHipster v7.9.0, `modules` are `blueprints` with stand-alone generators (not blueprinted) and a custom CLI.
We will refer to them as standalone blueprints (or just blueprints) from now on.

## Basic rules for a JHipster blueprint

JHipster blueprints:

- are NPM packages and Yeoman generators.
- follow an extension of the Yeoman rules listed at [https://yeoman.io/authoring/index.html](https://yeoman.io/authoring/index.html). Instead of being prefixed by `generator-`, are prefixed with `generator-jhipster-`, and instead of having just the `yeoman-generator` keyword, and must have 2 keywords, `yeoman-generator` and `jhipster-blueprint`.

## Usage

To use a blueprint, run the below command

```bash
jhipster --blueprints <blueprint name>
```

Or use the custom provided CLI:

```bash
jhipster-my-blueprint
```

## Examples

JHipster has many official blueprints, some examples:

- Backend
  - [JHipster Kotlin](https://github.com/jhipster/jhipster-kotlin) blueprint replaces most of the server side Java code with equivalent Kotlin code.
  - [JHipster.NET](https://github.com/jhipster/jhipster-dotnetcore) blueprint replaces the entire server side with .NET implementation.
  - [JHipster NodeJS](https://github.com/jhipster/generator-jhipster-nodejs) blueprint replaces the entire server side with NestJS implementation.
- Backend Customization
  - [JHipster Native](https://github.com/jhipster/generator-jhipster-native) blueprint customizes JHipster applications with Spring Native compatibility.
- Frontend
  - [Svelte Hipster](https://github.com/jhipster/generator-jhipster-svelte) blueprint replaces the entire client side with Svelte implementation.
- Mobile
  - [JHipster Ionic](https://github.com/jhipster/generator-jhipster-ionic) blueprint generates an Ionic application.

## Side-by-side blueprint

Each generator can be a side-by-side (SBS) blueprint. An sbs blueprint doesn't change the original generator's behavior but can customize the behavior and the result.
Side-by-side blueprint makes easier to support multiple JHipster versions and port to a new JHipster version.

To make the generator side-by-side, add this to the constructor:

```js
this.sbsBlueprint = true;
```

Example: [server generator at Native Blueprint](https://github.com/jhipster/generator-jhipster-native/blob/bb9c042f6bc70a26ba8037e951c93dc1d1820983/generators/server/generator.mjs#L17).
At this example the generator [customizes package.json](https://github.com/jhipster/generator-jhipster-native/blob/bb9c042f6bc70a26ba8037e951c93dc1d1820983/generators/server/generator.mjs#L26-L35), [removes files](https://github.com/jhipster/generator-jhipster-native/blob/bb9c042f6bc70a26ba8037e951c93dc1d1820983/generators/server/generator.mjs#L37-L40), [customizes pom.xml](https://github.com/jhipster/generator-jhipster-native/blob/bb9c042f6bc70a26ba8037e951c93dc1d1820983/generators/server/generator.mjs#L42-L186), [customizes java files](https://github.com/jhipster/generator-jhipster-native/blob/bb9c042f6bc70a26ba8037e951c93dc1d1820983/generators/server/generator.mjs#L211-L307), [customizes cypress](https://github.com/jhipster/generator-jhipster-native/blob/bb9c042f6bc70a26ba8037e951c93dc1d1820983/generators/server/generator.mjs#L321-L329) and so one.

A side-by-side blueprint can be used to create hooks and help migrate an existing module. This is covered in [Creating a module](/modules/creating-a-module).

## Custom CLI

Standalone blueprints can be executed using `yo`, but `yo` is aggressive in generators discovery (can be slow) and lacks some improvements. The JHipster CLI provides help and JHipster integration.
Therefore, we recommend using the `jhipster` CLI or creating a custom CLI based on `generator-jhipster`.

The `jhipster` command executes the `generator-jhipster` version you have installed globally.
A custom CLI will execute the dependent `generator-jhipster` and will make sure to use the supported `generator-jhipster`'s version.

Custom CLI allows you to execute a custom generator and is covered in [Creating a module](/modules/creating-a-module).

## Development and public API

We still lack published JSDoc API documentation, so you will need to refer to the source code.

## Application configuration:

JHipster's configuration follows [Yeoman configuration](https://yeoman.io/authoring/storage.html) pattern and provides additional support for blueprint config.

The `config` and `jhipsterConfig` properties store the common config and write to the `generator-jhipster` key in the `.yo-rc.json` file.
The `blueprintStorage` and `blueprintConfig` properties store the blueprint-specific config and write to the `generator-jhipster-(my-blueprint)` key in the `.yo-rc.json` file.

The `config` and `blueprintStorage` are [Storage instances](https://yeoman.github.io/generator/Storage.html), 
while `jhipsterConfig` and `blueprintConfig` are [proxy objects](https://yeoman.github.io/generator/Storage.html#createProxy) for `config` and `blueprintStorage` storages for convenience.

## Constants:

You can use constants in [`generator-constants.js`](https://github.com/jhipster/generator-jhipster/blob/main/generators/generator-constants.js):

```javascript
const javaDir = `${jhipsterConstants.SERVER_MAIN_SRC_DIR + this.packageFolder}/`;
const resourceDir = jhipsterConstants.SERVER_MAIN_RES_DIR;
const webappDir = jhipsterConstants.CLIENT_MAIN_SRC_DIR;
```

## Functions:

You can use all functions in [generator-base.js](https://github.com/jhipster/generator-jhipster/blob/main/generators/generator-base.js):

## Running a Blueprint locally for development

While developing a blueprint, please note the below steps. They are very important.

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

Or install `generator-jhipster` from git:

```bash
cd generator-jhipster-my-blueprint
npm install jhipster/generator-jhipster
```

3. Create a new folder for the app to be generated, and run JHipster ignoring JHipster dependencies (otherwise a released version will be installed each time `npm install/ci` is called)

```bash
mkdir my-app && cd my-app

jhipster --blueprints my-blueprint --skip-jhipster-dependencies
```

4. Once the blueprint/generator-jhipster is released, re-add the JHipster dependencies for reproducibility

```bash
jhipster --no-skip-jhipster-dependencies
```

## Registering a blueprint to the JHipster marketplace

To make your blueprint available in [the JHipster marketplace]({{ site.url }}/modules/marketplace/), you need to make sure you have the two keywords `yeoman-generator` and `jhipster-blueprint` in your published npm `package.json`.
If you find any entry in the marketplace that is not a JHipster module or blueprint, you can help to deny list it by adding it to the `blacklistedModules` section of the [`modules-config.json file`](https://github.com/jhipster/jhipster.github.io/blob/main/modules/marketplace/data/modules-config.json) by doing a Pull Request to the [jhipster/jhipster.github.io project](https://github.com/jhipster/jhipster.github.io).


Once you publish your blueprint to NPM, your blueprint will become available in our marketplace.
