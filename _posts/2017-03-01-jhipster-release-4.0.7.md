---
layout: default
title: Release 4.0.7
---

JHipster release 4.0.7
==================

What's new
----------

This is the 7th patch release for JHipster 4.0.0.

It includes 60 closed tickets and PRs, here are the most important ones:

- Fix a bug that made Hazelcast session clustering fail [#5330](https://github.com/jhipster/generator-jhipster/issues/5330).
- Registration page fixes [#5318](https://github.com/jhipster/generator-jhipster/issues/5318).
- Fix OAuth2 security [#5303](https://github.com/jhipster/generator-jhipster/issues/5303).
- Ehcache programmatic configuration (no XML) [#5286](https://github.com/jhipster/generator-jhipster/pull/5286).

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.0.7+is%3Aclosed)__.

How to upgrade
------------

**Manual upgrades (works for JHipster 4.x applications)**

For a manual upgrade, first upgrade your version of JHipster with:

```
yarn global upgrade generator-jhipster
```

If you have an existing project, it will still use the JHipster version with which it was generated.
To upgrade your project, you must first delete its `node_modules` folder and then run:

```
yo jhipster
```

You can also update your project and all its entities by running

```
yo jhipster --with-entities
```

You can also update your entities one-by-one by running again the entity sub-generator, for example if your entity is named _Foo_

```
yo jhipster:entity Foo
```

**Automatic upgrade only works for JHipster 3.x applications**

For an automatic upgrade, use the [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) on an existing application:

```
yo jhipster:upgrade
```

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

If the issue you have is an urgent bug or security issue, please:

- Contact [@java_hipster](https://twitter.com/java_hipster) on Twitter
