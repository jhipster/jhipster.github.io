---
layout: default
title: Release 3.4.1
---

JHipster release 3.4.1
==================

What's new
----------

This is a bug-fix version, with 2 notable changes:

- The "Upgrade sub-generator" has been modified, please read [#3696](https://github.com/jhipster/generator-jhipster/issues/3696) before using it! This website has been updated with the latest documentation, be sure to read [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) before running the sub-generator.
- We still recommend using a NodeJS LTS (Long Term Support) version, but if you want to live on the bleeding edge, NodeJS 6.x should now work correctly [#3663](https://github.com/jhipster/generator-jhipster/issues/3663)
- Docker images containing JHipster applications should now be 40% smaller! [#3700](https://github.com/jhipster/generator-jhipster/issues/3700)

Closed tickets
------------
As always, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.4.1+is%3Aclosed)__.

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
