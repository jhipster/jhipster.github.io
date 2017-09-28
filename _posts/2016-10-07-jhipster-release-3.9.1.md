---
layout: default
title: Release 3.9.1
---

JHipster release 3.9.1
==================

What's new
----------

This is a bug-fix release, because of issue [#4283](https://github.com/jhipster/generator-jhipster/issues/4283).

This is important for everyone using our microservices architecture, as basically the JHipster Registry couldn't register correctly services, because of an issue with the latest SpringFox v2.6.0 release. So we reverted SpringFox to the previous v2.5.0 release, and will do the upgrade later.

Closed tickets
------------
As always, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.9.1+is%3Aclosed)__.

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
