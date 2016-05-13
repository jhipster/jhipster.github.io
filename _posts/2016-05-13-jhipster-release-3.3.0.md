---
layout: default
title: Release 3.3.0
---

JHipster release 3.3.0
==================

What's new
----------

This version is a library upgrade, as Spring Cloud Brixton is now officially stable. We have also upgraded to the latest Spring Boot and Spring Security versions.

Important changes and bug fixes:

- A new JHipster Registry (v2.1.0) has been released, and adds a new dashboard when you open up the application.
- MongoDB deployment was buggy, as there was an error in the Mongobee configuration [#3582](https://github.com/jhipster/generator-jhipster/issues/3582)
- Spring Data Cassandra support has been removed, so we use directly the DataStax Driver. This has allowed us to upgrade the Driver to a more recent version, and be ready for Cassandra 3.0 [#3570](https://github.com/jhipster/generator-jhipster/pull/3570)
- The mail health check is now disabled by default, as it was causing issues with the Registry and Cassandra [#3579](https://github.com/jhipster/generator-jhipster/issues/3579)

Closed tickets
------------
As always, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.3.0+is%3Aclosed)__.

How to upgrade
------------

Update your version of JHipster with:

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
