---
layout: default
title: Creating a module
sitemap:
priority: 0.7
lastmod: 2015-12-05T18:40:00-00:00
---

# <i class="fa fa-cube"></i> Creating a module

A JHipster module is a Yeoman generator that is [composed](http://yeoman.io/authoring/composability.html) with a specific JHipster sub-generator.

JHipster modules are listed on the [JHipster marketplace](marketplace.html).

This allows to create third-party generators that have access to the JHipster variables and functions, and act as standard JHipster sub-generators.

## Example

The [JHipster Fortune module](https://github.com/jdubois/generator-jhipster-fortune) generates a "fortune cookie" page in a JHipster-generated application.

It is our sample module that showcases how you can JHipster's variables and functions in order to create your own generator.

## Basic rules for a JHipster module

A JHipster module:

- is an NPM package, and is a Yeoman generator.
- follows an extension of the Yeoman rules listed at [http://yeoman.io/generators/](http://yeoman.io/generators/) and can be installed, used and updated using the "yo" command. Instead of being prefixed by "generator-", it is prefixed by "generator-jhipster-", and instead of having just the "yeoman-generator" keyword, it has 2 keywords, "yeoman-generator" and "jhipster-module".

## Composability

A JHipster module uses the new "composability" feature from Yeoman, described at [http://yeoman.io/authoring/composability.html](http://yeoman.io/authoring/composability.html) to have access to JHipster's variables and functions.

For this, it composes with the "jhipster:modules" sub generator:

    templates: function() {
        this.composeWith('jhipster:modules', { options: {
            jhipsterVar: jhipsterVar, jhipsterFunc: jhipsterFunc }});
    },


### Variables available

Global variables:

- `baseName`: the name of the application
- `packageName`: the Java package name
- `angularAppName`: the AngularJS application name
- `javaDir`: the directory for the Java application, including the package folders
- `resourceDir`: the directory containing the Java resources (always `src/main/resources`)
- `webappDir`: the directory containing the Web application (always `src/main/webapp`)

And all the variables from your `.yo-rc.json` file:

- `authenticationType`: the type of authentication
- `hibernateCache`: the Hibernate 2nd level cache
- `clusteredHttpSession`: whether a clustered HTTP session is used
- `websocket`: whether WebSockets are used
- `databaseType`: the type of database used
- `devDatabaseType`: the database used in "dev" mode
- `prodDatabaseType`: the database used in "prod" mode
- `searchEngine`: whether a search engine is used
- `useSass`: if Sass is used for CSS pre-processing
- `buildTool`: the Java build tool
- `frontendBuilder`: the front-end (JavaScript/CSS/HTML) build tool
- `enableTranslation`: if translations are enabled
- `enableSocialSignIn`: if social login is enabled
- `testFrameworks`: an array of the test frameworks selected

### Functions available

- `addJavaScriptToIndex`: add a JavaScript file to the `index.html`
- `addMessageformatLocaleToIndex`: add a message format locale (for i18n)
- `addElementToMenu`: add an entry in the navigation menu
- `addEntityToMenu`: add an entity in the entity navigation sub-menu
- `addElementToAdminMenu`: add an entry in the admin navigation sub-menu
- `addElementTranslationKey`: add a new translation key in the `global.json` file
- `addEntityTranslationKey`: add a new translation key for an entity in the `global.json` file
- `addAdminElementTranslationKey`: add a new translation key for an admin sub-menu in the `global.json` file
- `addGlobalTranslationKey`: add a new translation key in the `global.json` file
- `addTranslationKeyToAllLanguages`: add a new translation key for all installed languages using methods `addElementTranslationKey`, `addEntityTranslationKey`, `addAdminElementTranslationKey`
- `getAllSupportedLanguages`: get the list of languages supported by Jhipster
- `getAllInstalledLanguages`: get the list of languages installed by current application
- `addChangelogToLiquibase`: add a new changelog in the Liquibase `master.xml` file
- `addColumnToLiquibaseEntityChangeset`: add new columns to the Liquibase changelog for an entity
- `dateFormatForLiquibase`: creates a new timestamp to be used by a Liquibase changelog
- `copyI18nFilesByName`: copy i18n files
- `addMavenDependency`: add a new maven dependency in the `pom.xml`file
- `addMavenPlugin`: add a new maven plugin in the `pom.xml` file
- `addGradleDependency`: add a new gradle dependency
- `addGradlePlugin`: add a new gradle plugin
- `applyFromGradleScript`: apply script from another gradle file
- `addBowerDependency`: add a new package in the `bower.json` file
- `addBowerOverride`: add an override configuration in the `bower.json` file
- `addAngularJsModule`: add a new module in the `app.js` file
- `addAngularJsConfig`: add a new config in the `app.js` file
- `addAngularJsInterceptor` : register an angular js interceptor in the `app.js` file
- `addMainCSSStyle`: add a new style in the `main.css` file
- `addMainSCSSStyle`: add a new style in the `main.scss` file
- `copyTemplate`: copy a template from source to a destination after stripping any translation content when translation is disabled
- `copyHtml`: short hand method for `copyTemplate` which is defaulted to action `stripHtml`
- `copyJs`: short hand method for `copyTemplate` which is defaulted to action `stripJs`
- `rewriteFile`: add the given content above a specific custom needle in a file
- `replaceContent`: replace the given content for a specific pattern/regex in a file

## Registering a module to the JHipster marketplace

To have your module available in [the JHipster marketplace](marketplace.html), you need to add it to the [modules.json file](https://github.com/jhipster/jhipster.github.io/blob/master/modules/marketplace/data/modules.json) by doing a Pull Request to the [jhipster/jhipster.github.io project](https://github.com/jhipster/jhipster.github.io).

The `modules.json` is a JSON file containing an array of the available modules. Add a new module in the array, and specify all fields. Leave the "verified" field as false: your module will become "verified" if the JHipster team verifies it.

Once your Pull Request is accepted, your module will become available!
