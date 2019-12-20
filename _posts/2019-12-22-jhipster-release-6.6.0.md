---
layout: default
title: Release 6.6.0
---

JHipster release v6.6.0 🎅🎁🎄
==================

This is the Christmas Release of JHipster with [221 closed tickets and merged pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.6.0+is%3Aclosed).

Here are the most significant ones:

- Swagger UI v3 - [#10567](https://github.com/jhipster/generator-jhipster/pull/10567)
- Angular with strict Typescript - [#10631](https://github.com/jhipster/generator-jhipster/issues/10631)
- JHipster Registry, aligned with v6 - [#391](https://github.com/jhipster/jhipster-registry/issues/391)
- Azure Spring Cloud sub generator improvements - [#10908](https://github.com/jhipster/generator-jhipster/pull/10908) [#11015](https://github.com/jhipster/generator-jhipster/pull/11015)
- Refactor Kafka generated code - [#10935](https://github.com/jhipster/generator-jhipster/pull/10935) [#10809](https://github.com/jhipster/generator-jhipster/pull/10809)
- Migration to GitHub Actions for our CI - [#10817](https://github.com/jhipster/generator-jhipster/issues/10817)
- React Hook for logout and entities component - [#9983](https://github.com/jhipster/generator-jhipster/pull/9983) [#9968](https://github.com/jhipster/generator-jhipster/pull/9968)
- Support For Thin Jars in GAE - [#10420](https://github.com/jhipster/generator-jhipster/pull/10420)


Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.6.0+is%3Aclosed)__.

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

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

If the issue you have is an urgent bug or security issue, please:

- Contact [@jhipster](https://twitter.com/jhipster) on Twitter
