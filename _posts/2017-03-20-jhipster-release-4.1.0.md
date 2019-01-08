---
layout: default
title: Release 4.1.0
---

JHipster release 4.1.0
==================

What's new
----------

This is a minor release, as we migrated to Yeoman 1.0 (see [#5331](https://github.com/jhipster/generator-jhipster/pull/5331)). This means we had to refactor a lot of code, including all the sub-generators. If you are using modules from [our marketplace]({{ site.url }}/modules/marketplace), they *should* work, but we recommend that all module authors check their code with this new version.

The JHipster Registry reached release v2.6.0, with a new Spring Cloud version, and more aggressive Eureka timeouts, which should be better for normal use cases (if you have hundreds or thousands of microservices, you might consider raising those numbers again). In our roadmap, we expect to have new major release of the JHipster Registry, which should be able to monitor all monoliths, gateways and microservices in one single place.

We also closed 51 issues and pull requests (see the list below), and upgraded many dependencies.

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.1.0+is%3Aclosed)__.

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
