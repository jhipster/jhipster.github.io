---
layout: default
title: Release 7.6.0
---

JHipster release v7.6.0
==================

This is the new minor release of JHipster v7 with [185 closed tickets and merged pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A7.6.0+is%3Aclosed).


Most important new features and upgrades
-------------

- Upgrade to Spring Boot 2.6 - [#16787](https://github.com/jhipster/generator-jhipster/pull/16787) [#17628](https://github.com/jhipster/generator-jhipster/pull/17628)
- replace generated Archtest by TechnicalStructureTest - [#17521](https://github.com/jhipster/generator-jhipster/pull/17521) [#17548](https://github.com/jhipster/generator-jhipster/pull/17548) [#17644](https://github.com/jhipster/generator-jhipster/pull/17644)
- Vue - Fix userManagementService - [#17569](https://github.com/jhipster/generator-jhipster/pull/17569)
- Angular - Fix Browsersync not updating web after upgrading to 7.5.0 with Angular - [#17591](https://github.com/jhipster/generator-jhipster/pull/17591)
- Many libraries upgrades

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A7.6.0+is%3Aclosed)__.

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
