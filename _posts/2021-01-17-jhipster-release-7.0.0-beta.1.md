---
layout: default
title: Release 7.0.0-beta.1
---

JHipster release v7.0.0-beta.1
==================

This is our second beta release for JHipster v7, and the first of this new year.

It includes [227 closed tickets and pull requests on the main project](https://github.com/jhipster/generator-jhipster/issues?q=is%3Aclosed+milestone%3A7.0.0-beta.1).

_It is not available through the usual channels as this is a beta release, please read below for more information!_

What's new?
------------

- Tests next to the files they are testing in React [#13425](https://github.com/jhipster/generator-jhipster/issues/13425)
- Add support to --pk-type [#13296](https://github.com/jhipster/generator-jhipster/issues/13296)
- Add support to @MapstructExpression [#13195](https://github.com/jhipster/generator-jhipster/issues/13296)
- Server common scripts - webpack profile replaced by webapp [#13196](https://github.com/jhipster/generator-jhipster/pull/13196)
- Broken Swagger with Microservices [#13446](https://github.com/jhipster/generator-jhipster/pull/13446)
- Support neo4j with k8s subgenerator [#13548](https://github.com/jhipster/generator-jhipster/pull/13548)
- Many improvements
- Many libraries upgrades
- Many bug fixes

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=is%3Aclosed+milestone%3A7.0.0-beta.1)__.


How to install
------------

This is a beta release, so it is not available on our usual "stable" release channel.

To install JHipster v7.0.0-beta.1 using using NPM:

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