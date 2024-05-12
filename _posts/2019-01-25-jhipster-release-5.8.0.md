---
layout: default
title: Release 5.8.0
---

JHipster release v5.8.0
==================

This new minor release has [133 closed tickets and merged pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.8.0+is%3Aclosed).

Here are the most significant ones:

- Switch to Micrometer - [#8812](https://github.com/jhipster/generator-jhipster/pull/8812)
- Angular: Lazy load entities - [#8925](https://github.com/jhipster/generator-jhipster/pull/8925)
- Support JPA derived identifiers for one-to-one - [#8685](https://github.com/jhipster/generator-jhipster/pull/8685)
- Add global logout for OIDC authentication - [#8757](https://github.com/jhipster/generator-jhipster/pull/8757)
- Many libraries upgrades, including an upgrade to Spring Boot 2.0.8.RELEASE

After this release, we will focus on JHipster 6, so JHipster 5 will go into maintenance mode. We should announce beta releases of JHipster 6 shortly.


Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.8.0+is%3Aclosed)__.

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
