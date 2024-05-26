---
layout: default
title: Release 7.9.0
---

JHipster release v7.9.0
==================

This is the new minor release of JHipster v7 with [958 closed tickets and merged pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A7.9.0+is%3Aclosed).


Most important new features and upgrades
-------------

- Update spring-boot version to 2.7.2 - [#19218](https://github.com/jhipster/generator-jhipster/pull/19218)
- Upgrade angular version to 14 - [#18586](https://github.com/jhipster/generator-jhipster/pull/18586)
- Update react version to 18 - [#18823](https://github.com/jhipster/generator-jhipster/pull/18823)
- Migrate to cypress version 10 - [#18854](https://github.com/jhipster/generator-jhipster/pull/18854)
- Add support to generate custom generators at generate-blueprint (replaces modules) - [#18306](https://github.com/jhipster/generator-jhipster/pull/18306)
- Add microfrontend support to jdl. - [#18254](https://github.com/jhipster/generator-jhipster/pull/18254)
- Add support to mixed microservice/microfrontend. - [#18632](https://github.com/jhipster/generator-jhipster/pull/18632)
- Use latest version in liquibase xsd changelog - [#19029](https://github.com/jhipster/generator-jhipster/pull/19029)
- Fix pagination for elasticsearch - [#18882](https://github.com/jhipster/generator-jhipster/pull/18882)
- Implement new interfaces for ElasticSearch Entity indexing - [#18741](https://github.com/jhipster/generator-jhipster/pull/18741)
- Use testcontainers for sql - [#18513](https://github.com/jhipster/generator-jhipster/pull/18513)
- Upgrade keycloak version to 18.0.0 - [#18441](https://github.com/jhipster/generator-jhipster/pull/18441)
- Many libraries upgrades

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A7.9.0+is%3Aclosed)__.

How to upgrade
------------

**Automatic upgrade**

For an automatic upgrade, use the [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) on an existing application:

Upgrade your version of JHipster:

```
npm update -g generator-jhipster
```

And then run the upgrade sub-generator:

```
jhipster upgrade
```

**Manual upgrades**

For a manual upgrade, first upgrade your version of JHipster with:

```
npm update -g generator-jhipster
```

If you have an existing project, it will still use the JHipster version with which it was generated.
To upgrade your project, you must first delete its `node_modules` folder and then run:

```
jhipster
```

You can also update your project and all its entities by running

```
jhipster --with-entities
```

You can also update your entities one-by-one by running again the entity sub-generator, for example if your entity is named _Foo_

```
jhipster entity Foo
```


## Aide et bugs

Si vous rencontrez un problème avec cette version, n'hésitez pas à :

- Ajouter un bug sur notre [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Poser une question sur [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)
- Créer une nouvelle discussion sur [GitHub](https://github.com/jhipster/generator-jhipster/discussions)

Si le problème que vous avez est un bug urgent ou un problème de sécurité, veuillez :

- Contacter [@jhipster](https://twitter.com/jhipster) sur Twitter