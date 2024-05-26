---
layout: default
title: Release 7.0.0-beta.0
---

JHipster release v7.0.0-beta.0 🦌🎅🤶🎁🎄
==================

This is our first beta release for JHipster v7.

It includes more than [1322 closed tickets and pull requests on the main project](https://github.com/jhipster/generator-jhipster/issues?q=is%3Aclosed+milestone%3A7.0.0-beta.0).

_It is not available through the usual channels as this is a beta release, please read below for more information!_


Breaking changes
------------

Related to Blueprints and Modules:
- Remove getAllJhipsterConfig - [#12023](https://github.com/jhipster/generator-jhipster/issues/12023). Use getJhipsterConfig instead of getAllJhipsterConfig.
- Create jhipsterConfig for synchronised config and move configOptions to generator-base - [#12026](https://github.com/jhipster/generator-jhipster/pull/12026). generators-base-blueprint's jhipsterConfig field is now a proxy instead of a Storage object look at the PR description for migration.
- Updates to `getXXXAppName()` methods on `base-generator` [#12325](https://github.com/jhipster/generator-jhipster/issues/12325):
  - added `getFrontendAppName()` and `frontendAppName` attribute
  - removed `getAngularAppName()` and `angularAppName` attribute
  - removed `getAngularXName()` and `angularXAppName` attribute
- Removed `setup*Options()` operations
  - A replacement may not be required. Use `load(App/Client/Server)Config` if needed.
- `id` field is added to fields at jhipster 7.
  - Remove id fields if the blueprint/module doesn't support. `this.fields = this.fields.filter(field => !field.id);`

Related to front:
- Angular: follow closer Angular Style Guide - [#13125](https://github.com/jhipster/generator-jhipster/issues/13125)
- Login page refactoring - [#11926](https://github.com/jhipster/generator-jhipster/pull/11926)
- Replace moment by Day.js - [#12575](https://github.com/jhipster/generator-jhipster/issues/12575)

Related to backend:
- Protect user api and create a filtered user api for relationships - [#12374](https://github.com/jhipster/generator-jhipster/issues/12374)
- Springfox 3 upgrade - [#12133](https://github.com/jhipster/generator-jhipster/pull/12133) and [jhipster/jhipster#764](https://github.com/jhipster/jhipster/pull/764)
  - `swagger` maven profile becomes `api-docs`
  - `jhipster.swagger` property becomes `jhipster.api-docs`
  - `SwaggerCustomizer` becomes `SpringfoxCustomizer`
  - `swaggerSpringfoxApiDocket` becomes `openapiSpringfoxApiDocket`
  - `swaggerSpringfoxManagementDocket` becomes `openAPISpringfoxManagementDocket`

Entities:
- Change relationship table name - [#11025](https://github.com/jhipster/generator-jhipster/issues/11025)

Most important new features and upgrades
-------------

New features
- Vue.js support - [#12064](https://github.com/jhipster/generator-jhipster/pull/12064)
- Cypress support - [#12307](https://github.com/jhipster/generator-jhipster/pull/12307)
- JDL Studio V2
- JHipster Control Center - See the [project](https://github.com/jhipster/jhipster-control-center)
- Prettier for Java - [#12109](https://github.com/jhipster/generator-jhipster/issues/12109)
- Angular CLI support - [#10539](https://github.com/jhipster/generator-jhipster/issues/10539)
- Snyk support - [#12441](https://github.com/jhipster/generator-jhipster/issues/12441)

Entities
- add support for custom ids - [#13258](https://github.com/jhipster/generator-jhipster/pull/13258)
- Incremental Liquibase - [#12178](https://github.com/jhipster/generator-jhipster/issues/12178)

Improvements
- Angular 11 - [#13035](https://github.com/jhipster/generator-jhipster/pull/13035)
- Blueprint improvement
- Webflux improvement
- Spring Boot 2.3 - [#11682](https://github.com/jhipster/generator-jhipster/pull/11682)
- Java 11 by default - [#12021](https://github.com/jhipster/generator-jhipster/pull/12021)
- PostgreSQL as default database - [#11736](https://github.com/jhipster/generator-jhipster/issues/11736)
- IntegrationTest annotation - [#12460](https://github.com/jhipster/generator-jhipster/issues/12460)
- Annotation to detect generated files - [#12459](https://github.com/jhipster/generator-jhipster/issues/12459)
- Remove system and anonymoususer - [#13043](https://github.com/jhipster/generator-jhipster/pull/13043)
- Docker-Compose v3 - [#12428](https://github.com/jhipster/generator-jhipster/issues/12428)
- Typescript 4 - [#12435](https://github.com/jhipster/generator-jhipster/pull/12435)

Refactoring
- JHipster library, with `tech.jhipster` as package name - [#12854](https://github.com/jhipster/generator-jhipster/issues/12854)
- JHipster Core is merged with generator-jhipster - [#11694](https://github.com/jhipster/generator-jhipster/pull/11694)
- ng-jhipster is merged with generator-jhipster - [#12909](https://github.com/jhipster/generator-jhipster/issues/12909)

Removed
- Removed audit page - [#12024](https://github.com/jhipster/generator-jhipster/pull/12024)
- Yarn support dropped - [#12134](https://github.com/jhipster/generator-jhipster/pull/12134)
- Remove deprecated JHipster Console (ELK) - [#12414](https://github.com/jhipster/generator-jhipster/pull/12414)


Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=is%3Aclosed+milestone%3A7.0.0-beta.0)__.


How to install
------------

This is a beta release, so it is not available on our usual "stable" release channel.

To install JHipster v7.0.0-beta.0 using using NPM:

    npm install -g generator-jhipster@beta

It is also available using the JHipster Docker image, as it is automatically built from our source code.

However, as this is a BETA release it will not be available using our other usual channels like:

- [JHipster Online](https://start.jhipster.tech)
- [JHipster Devbox](https://github.com/jhipster/jhipster-devbox)

You also won’t be able to use the `jhipster upgrade` sub-generator, as it won’t “see” the BETA release, which is distributed through a specific beta channel on NPM.

You can look at [v7 upgrade tips]({{ site.url }}/tips/033_tip_v7_upgrade.html) page for v7 upgrade hints.


## Aide et bugs

Si vous rencontrez un problème avec cette version, n'hésitez pas à :

- Ajouter un bug sur notre [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Poser une question sur [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)
- Créer une nouvelle discussion sur [GitHub](https://github.com/jhipster/generator-jhipster/discussions)

Si le problème que vous avez est un bug urgent ou un problème de sécurité, veuillez :

- Contacter [@jhipster](https://twitter.com/jhipster) sur Twitter