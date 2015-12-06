---
layout: default
title: Creating a module
sitemap:
priority: 0.7
lastmod: 2015-12-05T18:40:00-00:00
---

# <i class="fa fa-cube"></i> Creating a module

A JHipster module is a Yeoman generator that is [composed](http://yeoman.io/authoring/composability.html) with a specific JHipster sub-generator.

This allows to create third-party generators that have access to the JHipster variables and functions, and act as standard JHipster sub-generators.

## Example

The [JHipster Fortune module](https://github.com/jdubois/generator-jhipster-fortune) generates a "fortune cookie" page in a JHipster-generated application.

It is our sample module that showcases how you can JHipster's variables and functions in order to create your own generator.

## Basic rules for a JHipster module

A JHipster module:

- is an NPM package, and is a Yeoman generator.
- follows an extension of the Yeoman rules listed at [http://yeoman.io/generators/](http://yeoman.io/generators/) and can be installed, used and updated using the "yo" command. Instead of being prefixed by "generator-", it is prefixed by "generator-jhipster-", and instead of having just the "yeoman-generator" keyword, it has 2 keywords, yeoman-generator" and "jhipster-module".

## Composability

A JHipster module uses the new "composability" feature from Yeoman, described at [http://yeoman.io/authoring/composability.html](http://yeoman.io/authoring/composability.html) to have access to JHipster's variables and functions.

For this, it composes with the "jhispter:modules" sub generator:

    templates: function() {
        this.composeWith('jhipster:modules', { options: {
            jhipsterVar: jhipsterVar, jhipsterFunc: jhipsterFunc }});
    },


### Variables available

`baseName`: the name of the application

`packageName`: the Java package name

`angularAppName`: the AngularJS application name

`javaDir`: the directory for the Java application, including the package folders

`resourceDir`: the directory containing the Java resources (always `src/main/resources`)

`webappDir`: the directory containing the Web application (always `src/main/webapp`)

### Functions available

`addJavaScriptToIndex`: add a JavaScript file to the `index.html`

`addMessageformatLocaleToIndex`: add a message format locale (for i18n)

`addElementToMenu`: add an entry in the navigation menu

`addEntityToMenu`: add an entity in the entity navigation sub-menu

`addElementTranslationKey`: add a new translation key in the `global.json` file

`addEntityTranslationKey`: add a new translation key for an entity in the `global.json` file

`addChangelogToLiquibase`: add a new changelog in the Liquibase `master.xml` file

`dateFormatForLiquibase`: creates a new timestamp to be used by a Liquibase changelog

`copyI18nFilesByName`: copy i18n files

## Registering a module to the JHipster marketplace

To have your module available in [the JHipster marketplace](marketplace.html), you need to add it to the [modules.json file](https://github.com/jhipster/jhipster.github.io/blob/master/modules/marketplace/data/modules.json) by doing a Pull Request to the [jhipster/jhipster.github.io project](https://github.com/jhipster/jhipster.github.io).

The `modules.json` is a JSON file containing an array of the available modules. Add a new module in the array, and specify all fields. Leave the "verified" field as false: your module will become "verified" if the JHipster team verifies it.

Once your Pull Request is accepted, your module will become available!
