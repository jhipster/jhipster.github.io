---
layout: default
title: Release 3.7.1
---

JHipster release 3.7.1
==================

What's new
----------

This is a bug-fixing release, with a few new features.

- Questions in the main generator have been refactored - see [#4134](https://github.com/jhipster/generator-jhipster/pull/4134)
- Downgrade the MySQL Docker image to 5.7.13 - see [#4144](https://github.com/jhipster/generator-jhipster/pull/4144)
- Add Swagger back in the default `dev` profile - see [#4146](https://github.com/jhipster/generator-jhipster/pull/4146)
- Ehcache configuration is now generated for entities and their relationships - see [this commit](https://github.com/jhipster/generator-jhipster/commit/d8477598334c133ff86b7a2b6999803f8fdd5a8d)
- The Maven Spring Boot plugin now runs in fork mode, which allows hot-reload using the Spring Boot devtools.
- We now support officially Visual Studio Code, [here is our new specific documentation]({{ site.url }}/configuring-ide-visual-studio-code/)

Closed tickets
------------
As always, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.7.1+is%3Aclosed)__.

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
