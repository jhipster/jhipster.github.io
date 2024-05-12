---
layout: default
title: Release 7.3.0
---

JHipster release v7.3.0
==================

This is the new minor release of JHipster v7 with [290 closed tickets and merged pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A7.3.0+is%3Aclosed).


Most important new features and upgrades
-------------

- New Docker images, available at [GitHub Packages](https://github.com/orgs/jhipster/packages) - [#16249](https://github.com/jhipster/generator-jhipster/pull/16249)
- Upgrade to Spring Boot 2.5.5 - [#16434](https://github.com/jhipster/generator-jhipster/pull/16434)
- Enable build cache when Gradle Enterprise is selected - [#16298](https://github.com/jhipster/generator-jhipster/pull/16298)
- Allow entities to be organized by packages - [#16041](https://github.com/jhipster/generator-jhipster/pull/16041)
- Husky issue - [#16360](https://github.com/jhipster/generator-jhipster/pull/16360)
- Allow Java 17 to be used - [#16296](https://github.com/jhipster/generator-jhipster/pull/16296)
- Many libraries upgrades

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A7.3.0+is%3Aclosed)__.

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
