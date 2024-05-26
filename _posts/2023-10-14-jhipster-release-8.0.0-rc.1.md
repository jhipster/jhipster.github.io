---
layout: default
title: Release 8.0.0-rc.1
---

# JHipster release v8.0.0-rc.1

This is our first release candidate for JHipster v8.

It includes [452 closed tickets and pull requests on the main project](https://github.com/jhipster/generator-jhipster/issues?q=is:closed+milestone:8.0.0-rc.1).

## What's new?

### :warning: Breaking changes/Deprecations/Removals

- Drop unmaintained deployment sub-generators ([#23422](https://github.com/jhipster/generator-jhipster/pull/23422))
  - aws
  - azure-app-service
  - azure-spring-cloud
  - cloudfoundry
  - gae
  - openshift
- drop openapi-client sub-generator ([#23632](https://github.com/jhipster/generator-jhipster/pull/23632))
- drop page sub-generator ([#23615](https://github.com/jhipster/generator-jhipster/pull/23615))
- drop upgrade-config sub-generator ([ab46e40](https://github.com/jhipster/generator-jhipster/commit/ab46e40d7013e68a1d82d3578d62a7c29f5b466e))
- drop spring-controller and spring-service sub-generators ([#23502](https://github.com/jhipster/generator-jhipster/pull/23502))

### :gem: Features & Enhancements

- Update spring-boot version to 3.1.4 ([#23613](https://github.com/jhipster/generator-jhipster/pull/23613))
- Update maven version to 3.9.5 ([#23843](https://github.com/jhipster/generator-jhipster/pull/23843))
- Upgrade to Gradle 8.4 ([#23787](https://github.com/jhipster/generator-jhipster/pull/23787))

### :computer: Frontend

- Migrate vue to vite. ([#23532](https://github.com/jhipster/generator-jhipster/pull/23532))
- fix swagger for gateway/microservices ([#23499](https://github.com/jhipster/generator-jhipster/pull/23499))
- Rework translation process ([#23488](https://github.com/jhipster/generator-jhipster/pull/23488))

### :paw_prints: JDL/Internals/Blueprints

- Improve blueprint support
- Lots of internal improvements and refactoring

### :scroll: Others

- Many improvements
- Many libraries upgrades
- Many bug fixes

## Closed tickets and merged pull requests

As always, **[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=is:closed+milestone:8.0.0-rc.1)**.

## How to install

To install JHipster v8.0.0-rc.1 using using NPM:

    npm install -g generator-jhipster

It is also available using the JHipster Docker image, as it is automatically built from our source code.

However, as this is a release candidate it will not be available using our other usual channels like:

- [JHipster Online](https://start.jhipster.tech)
- [JHipster Devbox](https://github.com/jhipster/jhipster-devbox)


## Aide et bugs

Si vous rencontrez un problème avec cette version, n'hésitez pas à :

- Ajouter un bug sur notre [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Poser une question sur [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)
- Créer une nouvelle discussion sur [GitHub](https://github.com/jhipster/generator-jhipster/discussions)

Si le problème que vous avez est un bug urgent ou un problème de sécurité, veuillez :

- Contacter [@jhipster](https://twitter.com/jhipster) sur Twitter