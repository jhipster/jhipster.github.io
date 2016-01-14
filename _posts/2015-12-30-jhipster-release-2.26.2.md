---
layout: default
title: Release 2.26.2
---

JHipster release 2.26.2
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

What's new
----------

This is a minor release, with several minor bugfixes.

Most important news are:

- Libraries upgrades: Spring Boot 1.3.1, Gradle 2.10, Liquibase 3.4.2
- Correction of Hazelcast issues when using clustered HTTP sessions

Closed tickets
------------

As always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.26.2+is%3Aclosed)__.

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
