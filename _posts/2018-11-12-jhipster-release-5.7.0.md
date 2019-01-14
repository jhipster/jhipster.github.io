---
layout: default
title: Release 5.7.0
---

JHipster release v5.7.0
==================

This new minor release comes with 55 closed tickets and pull requests. It has 2 major improvements:

- JHipster now uses UTC timestamps everywhere thanks to [#8284](https://github.com/jhipster/generator-jhipster/issues/8284). This follows our goal of generating full-stack, high quality applications. This will cause a few issues in existing applications, as we now force UTC (for example in the Hibernate configuration and in the Liquibase scripts), but the migration should be easy as this doesn't touch a lot of lines of code.
- The JDL has been refined, firstly by fixing several bugs (including in [#8547](https://github.com/jhipster/generator-jhipster/issues/8547)), and secondly by adding support for deploying applications straight from the JDL. Depoyments only work with Docker-based tools for the moment, so we support Docker Compose, Kubernetes, Openshift and Rancher Compose. If you want more information the documentation is already updated in the [JDL documentation]({{ site.url }}/jdl/).

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.7.0+is%3Aclosed)__.

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

- Contact [@java_hipster](https://twitter.com/java_hipster) on Twitter
