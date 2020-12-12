---
layout: default
title: Release 6.10.3
---

JHipster release v6.10.3
==================

This is a patch release which contains these fixes:
- Fix prettier-java dependency
- Security: prevent leakage of technical details trough problem message - [#12128](https://github.com/jhipster/generator-jhipster/pull/12128)
- Redis: do not use dynamic property source in junit callbacks - [#12150](https://github.com/jhipster/generator-jhipster/pull/12150)
- Sponsor: add Entando as new Gold Sponsor - [#12205](https://github.com/jhipster/generator-jhipster/pull/12205)
- Security: avoid password and resetKey column to be sorted by the /users API - [#12327](https://github.com/jhipster/generator-jhipster/pull/12327)
- AWS-Containers: Use bootJar instead of bootWar - [#12342](https://github.com/jhipster/generator-jhipster/pull/12342)
- Angular: fix protractor waiting for timeout with angular - [#12420](https://github.com/jhipster/generator-jhipster/pull/12420)


Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.10.3+is%3Aclosed)__.

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

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

If the issue you have is an urgent bug or security issue, please:

- Contact [@jhipster](https://twitter.com/jhipster) on Twitter
