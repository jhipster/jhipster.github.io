---
layout: default
title: Release 2.7.0
---

JHipster release 2.7.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

What's new
----------

This is a bug-fixing and library upgrade release. Most importantly, we have:

- Upgraded to the latest (1.2.3) version of Spring Boot
- Upgraded to the latest (4.0.0) version of Spring Security

As this is a major Spring Security release, some of its API has changed: you will find the reference documentation [here](http://docs.spring.io/spring-security/site/migrate/current/3-to-4/html5/migrate-3-to-4-jc.html), and you might need to modify some of your code.

Spring Security 4 also has better support for Spring Websocket, so we have refactored and optimized our Spring Websocket implementation.

And as always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.7.0+is%3Aclosed)__.

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
