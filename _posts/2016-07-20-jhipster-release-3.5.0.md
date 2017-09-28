---
layout: default
title: Release 3.5.0
---

JHipster release 3.5.0
==================

What's new
----------

110 issues and PRs have been closed in this release, the most important being:

- Several libraries upgrade: Gradle [#3849](https://github.com/jhipster/generator-jhipster/pull/3849), Spring Cloud [#3836](https://github.com/jhipster/generator-jhipster/pull/3836), the Maven Docker plugin [#3801](https://github.com/jhipster/generator-jhipster/pull/3801)
- As a result of those upgrades, [JHipster Registry](https://github.com/jhipster/jhipster-registry) v2.3.0 has been released, and the generator now uses this new version
- The JDL import sub-generator is back! [#3532](https://github.com/jhipster/generator-jhipster/issues/3532)
- Upgrade sub-generator doesn't commit on jhipster_upgrade branch from second upgrade [#3757](https://github.com/jhipster/generator-jhipster/issues/3757)
- A new "swagger" profile to use both in dev and prod modes [#3402](https://github.com/jhipster/generator-jhipster/issues/3402)
- JSON pretty print in dev mode [#3830](https://github.com/jhipster/generator-jhipster/issues/3830)
- Better SpringFox configuration for pagination parameters [#3844](https://github.com/jhipster/generator-jhipster/pull/3844)

Closed tickets
------------
As always, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.5.0+is%3Aclosed)__.

How to upgrade
------------

For an automatic upgrade, starting with JHipster v3.4.0, use the [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) on an existing application:

```
yo jhipster:upgrade
```

For a manual upgrade, first upgrade your version of JHipster with:

```
npm update -g generator-jhipster
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

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

If the issue you have is an urgent bug or security issue, please:

- Contact [@java_hipster](https://twitter.com/java_hipster) on Twitter
