---
layout: default
title: Release 6.10.5
---

JHipster release v6.10.5
==================

Warning, this release fixes an **important security vulnerabilities**.
See this [link](https://nvd.nist.gov/vuln/detail/CVE-2020-10687) for details.

This is a patch release which contains these fixes:
- Update Undertow to fix CVE-2020-10687 - [#906](https://github.com/jhipster/jhipster/pull/906) [#12956](https://github.com/jhipster/generator-jhipster/pull/12956)
- Fix ExtendWith annotation for Redis cache - [#12817](https://github.com/jhipster/generator-jhipster/issues/12817)
- Change jdl command to use main branch - [#12961](https://github.com/jhipster/generator-jhipster/pull/12961)
- Exclude translation of DataAccessException when there's no database - [#12830](https://github.com/jhipster/generator-jhipster/pull/12830) [#12829](https://github.com/jhipster/generator-jhipster/pull/12829)


Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.10.5+is%3Aclosed)__.

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

**Tips**

To generate your project with all Java classes already formatted using [prettier-java](https://github.com/jhipster/prettier-java), you should use:

```
jhipster --prettier-java
```

## Aide et bugs

Si vous rencontrez un problème avec cette version, n'hésitez pas à :

- Ajouter un bug sur notre [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Poser une question sur [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)
- Créer une nouvelle discussion sur [GitHub](https://github.com/jhipster/generator-jhipster/discussions)

Si le problème que vous avez est un bug urgent ou un problème de sécurité, veuillez :

- Contacter [@jhipster](https://twitter.com/jhipster) sur Twitter