---
layout: default
title: Release 7.3.1
---

JHipster release v7.3.1
==================

This is a patch release with [145 closed tickets and merged pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A7.3.1+is%3Aclosed).

The important fix:
- Fix empty package for Enable Jpa Repositories - [#16736](https://github.com/jhipster/generator-jhipster/pull/16736)

Other improvements and upgrades:
- Consolidate java supported versions and add support to java 17 - [#16426](https://github.com/jhipster/generator-jhipster/pull/16426)
- Improve cypress relationships tests - [#16504](https://github.com/jhipster/generator-jhipster/pull/16504) [#16592](https://github.com/jhipster/generator-jhipster/pull/16592)
- Many libraries upgrades

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A7.3.1+is%3Aclosed)__.

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