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
- follows an extension of the Yeoman rules listed at [http://yeoman.io/generators/](http://yeoman.io/generators/) and can be installed, used and updated using the "yo" command. Instead of being prefixed by "generator-", it is prefixed by "generator-jhipster-", and instead of having just the "yeoman-generator" keyword, it must have 2 keywords, "yeoman-generator" and "jhipster-module".
- A JHipster module registering as a hook should not call `process.exit` in its generators being hooked.

## Composability

A JHipster module uses the new "composability" feature from Yeoman, described at [http://yeoman.io/authoring/composability.html](http://yeoman.io/authoring/composability.html) to have access to JHipster's variables and functions.

For this, it composes with the "jhipster:modules" sub generator:

    compose: function() {
        this.composeWith('jhipster:modules', {
            options: {
                jhipsterVar: jhipsterVar,
                jhipsterFunc: jhipsterFunc
            }
        });
    },

## Hooks

JHipster will call certain hooks before and after some of its tasks, currently available and planned tasks are listed below.

- Post Entity creation hook
- Pre Entity creation hook [planned]
- Post App creation hook [planned]
- Pre App creation hook [planned]

[JHipster module generator](https://github.com/jhipster/generator-jhipster-module) now has option to generate this.
A JHipster module can register to act as a hook when its main generator is run by the end user. You need to call the `registerModule` method available in `jhipsterFunc` from your main (app) generator to register as hook, you need to pass the below parameters in the method as below

```javascript
jhipsterFunc.registerModule(npmPackageName, hookFor, hookType[, callbackSubGenerator[, description]])
```

- `npmPackageName` npm package name of the generator. e.g: `jhipster-generator-fortune`
- `hookFor` which Jhipster hook from above this should be registered to ( values must be `entity` or `app`)
- `hookType` where to hook this at the generator stage ( values must be `pre` or `post`)
- `callbackSubGenerator` [optional] sub generator to invoke, if this is not given the module's main (app) generator will be called, e.g: `bar` or `foo` generator
- `description` [optional] description of the generator, if this is not given we will generate a default based on the npm name given

### Variables available <small>(source <a href="https://github.com/jhipster/generator-jhipster/blob/master/generators/modules/index.js" target="_blank">here</a>)</small>

Global variables:

- `baseName`: the name of the application
- `packageName`: the Java package name
- `mainClassName`: the main Java class name
- `angularAppName`: the AngularJS application name
- `packageFolder`: the Java package folder
- `javaDir`: the directory for the Java application, including the package folders
- `resourceDir`: the directory containing the Java resources (always `src/main/resources`)
- `webappDir`: the directory containing the Web application (always `src/main/webapp`)
- `CONSTANTS`: the constants used by JHipster

And all the variables from the JHipster `.yo-rc.json` file:

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
- `enableTranslation`: if translations are enabled
- `nativeLanguage`: native language selected for i18n
- `languages`: additional languages selecetd for i18n
- `enableSocialSignIn`: if social login is enabled
- `testFrameworks`: an array of the test frameworks selected
- `jhiPrefix`: the prefix applied before services, controllers and states names of JHipster components
- `jhipsterVersion`: the JHipster version used to generate the application

### Functions available <small>(source <a href="https://github.com/jhipster/generator-jhipster/blob/master/generators/generator-base.js" target="_blank">here</a>)</small>

- `addSocialButton`: add a new social button in the login and register modules
- `addSocialConnectionFactory`: add a new social connection factory in the `SocialConfiguration.java` file
- `addSocialConfiguration`: add new social configuration in the `application.yml`
- `addMavenPlugin`: add a new maven plugin in the `pom.xml` file
- `addMavenDependency`: add a new maven dependency in the `pom.xml`file
- `addGradlePlugin`: add a new gradle plugin
- `addGradleDependency`: add a new gradle dependency
- `applyFromGradleScript`: apply script from another gradle file
- `addBowerrcParameter`: add a new parameter in the `.bowerrc`
- `addBowerDependency`: add a new package in the `bower.json` file
- `addBowerOverride`: add an override configuration in the `bower.json` file
- `addMainCSSStyle`: add a new style in the `main.css` file
- `addMainSCSSStyle`: add a new style in the `main.scss` file
- `addAngularJsModule`: add a new module in the `app.js` file
- `addAngularJsInterceptor`: register an AngularJS interceptor in the `app.js` file
- `addElementToMenu`: add an entry in the navigation menu
- `addElementToAdminMenu`: add an entry in the admin navigation sub-menu
- `addEntityToMenu`: add an entity in the entity navigation sub-menu
- `addElementTranslationKey`: add a new translation key in the `global.json` file
- `addAdminElementTranslationKey`: add a new translation key for an admin sub-menu in the `global.json` file
- `addEntityTranslationKey`: add a new translation key for an entity in the `global.json` file
- `addGlobalTranslationKey`: add a new translation key in the `global.json` file
- `addTranslationKeyToAllLanguages`: add a new translation key for all installed languages using methods `addElementTranslationKey`, `addEntityTranslationKey`, `addAdminElementTranslationKey`
- `isSupportedLanguage`: check if a language is supported by JHipster
- `getAllSupportedLanguages`: get the list of languages supported by Jhipster
- `getAllSupportedLanguageOptions`: get all the language options supported by JHipster
- `getAllInstalledLanguages`: get the list of languages installed by current application
- `addChangelogToLiquibase`: add a new changelog in the Liquibase `master.xml` file for a given needle
- `addConstraintsChangelogToLiquibase`: add a new constraints changelog to the Liquibase `master.xml` file
- `addLiquibaseChangelogToMaster`: add a new changelog to the Liquibase `master.xml` file
- `addColumnToLiquibaseEntityChangeset`: add new columns to the Liquibase changelog for an entity
- `dateFormatForLiquibase`: creates a new timestamp to be used by a Liquibase changelog
- `copyI18nFilesByName`: copy i18n files
- `copyTemplate`: copy a template from source to a destination after stripping any translation content when translation is disabled
- `copyHtml`: short hand method for `copyTemplate` which is defaulted to action `stripHtml`
- `copyJs`: short hand method for `copyTemplate` which is defaulted to action `stripJs`
- `rewriteFile`: add the given content above a specific custom needle in a file
- `replaceContent`: replace the given content for a specific pattern/regex in a file
- `registerModule`: register a JHipster module to act as a hook from app or entity generator
- `getModuleHooks`: get the array of all registered module hooks for the application
- `updateEntityConfig`: update the json configuration file for an entity with given key and value
- `getExistingEntities`: get sorted list of entities according to changelog date in the current application
- `isJhipsterVersionLessThan`: check if the JHipster version used to generate the project is less than a particular version 


## Registering a module to the JHipster marketplace

To have your module available in [the JHipster marketplace]({{ site.url }}/modules/marketplace/), you need to make sure you have the 2 keyword `yeoman-generator` and `jhipster-module` in your published npm `package.json`.
If you find any entry in the marketplace which is not a JHipster module, you can help to blacklist it by adding it to the `blacklistedModules` section of the [modules-config.json file](https://github.com/jhipster/jhipster.github.io/blob/master/modules/marketplace/data/modules-config.json) by doing a Pull Request to the [jhipster/jhipster.github.io project](https://github.com/jhipster/jhipster.github.io).

Your module will become "verified" if the JHipster team verifies it.

Once you publish your module to NPM, your module will become available in our marketplace.
