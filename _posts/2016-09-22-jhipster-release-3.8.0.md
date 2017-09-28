---
layout: default
title: Release 3.8.0
---

JHipster release 3.8.0
==================

What's new
----------

This is a bug-fixing release, that comes with major new features like Kafka support (in BETA).

- Support for Kafka in [#4129](https://github.com/jhipster/generator-jhipster/issues/4129). Full documentation is available on this site in the new [Using Kafka page]({{ site.url }}/using-kafka/)
- Support for the Spring Boot remote shell - see [#4167](https://github.com/jhipster/generator-jhipster/issues/4167)
- Many Sonar issues have been corrected, which will improve the overall quality of the generated code
- Better support for Heroku - see [#4187](https://github.com/jhipster/generator-jhipster/pull/4187)
- Migration to Spring Boot 1.4.1 - see [#4185](https://github.com/jhipster/generator-jhipster/pull/4185)
- Migration to Gradle 3.1 - see [#4168](https://github.com/jhipster/generator-jhipster/pull/4168)

Closed tickets
------------
As always, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.8.0+is%3Aclosed)__.

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
