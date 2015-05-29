---
layout: default
title: Release 2.13.1
---

JHipster release 2.13.1
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

What's new
----------

This is a small bug-fixing release, for people using DTOs on Linux.

Version 2.13.0 was coded and tested on Mac OS X, which is supposed to be a Unix-like OS, and have a "real" filesystem. Turns out its filesystem is not case-sensitive by default (you can test yours with `diskutil info /`), which caused our issue [#1545](https://github.com/jhipster/generator-jhipster/pull/1545).

And as always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.13.1+is%3Aclosed)__.

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

You can also update your entities by running again the entity sub-generator, for example if your entity is named _Foo_

```
yo jhipster:entity Foo
```

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Contact [@java_hipster](https://twitter.com/java_hipster) on Twitter
- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)
