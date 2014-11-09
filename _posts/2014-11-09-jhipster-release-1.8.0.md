---
layout: default
title: Release 1.8.0
---

JHipster release 1.8.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

What's new
----------

We have a major change in this release: we swichted our JPA ID generation strategy, from "TABLE" to "AUTO". Originally we selected "TABLE" as it's the easiest way to be portable across databases, but we discovered (thanks to our friends from YourKit!) that this was consuming extra database connections. As a result of this change, you can now use JHipster applications without any trouble on "free" cloud databases like ClearDB or ElephantSQL (which only give you 4 connections available).

And as always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A1.8.0+is%3Aclosed)__.

How to upgrade
------------

Update your version of JHipster with:

```
npm update -g generator-jhipster
```

And then you can update your project when you run again

```
yo jhipster
```

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Contact [@java_hipster](https://twitter.com/java_hipster) on Twitter
- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)
