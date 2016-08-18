---
layout: default
title: Release 3.6.1
---

JHipster release 3.6.1
==================

What's new
----------

This is a minor release, correcting a few bugs from yesterday's 3.6.0 release.

- Several primary keys have had their length reduced because of [#3996](https://github.com/jhipster/generator-jhipster/issues/3996). This caused a bug with older (4.6) versions of MySQL, but those length were too big, so it's a good thing to reduce them if possible. If you have an existing database, you don't have to alter your tables: having a bigger PK doesn't do any harm, so migration is totally optional.
- The Elasticsearch Docker image has been upgraded to v2.3.5, which is its latest version, and which works with Spring Boot 1.4. See [#4000](https://github.com/jhipster/generator-jhipster/issues/4000).
- Kubernetes now uses the same image versions as Docker. See [#4002](https://github.com/jhipster/generator-jhipster/pull/4002).

Closed tickets
------------
As always, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.6.1+is%3Aclosed)__.

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
