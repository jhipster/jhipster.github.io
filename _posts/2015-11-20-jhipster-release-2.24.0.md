---
layout: default
title: Release 2.24.0
---

JHipster release 2.24.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

What's new
----------

We've had more than 50 closed bugs, and this is a recommended update for everyone.

## Spring Boot 1.3.0.RELEASE

JHipster has migrated to the newly-released stable version of Spring Boot 1.3.0, which includes many libraries updates.

## The JHipster "devbox" is now available

The [JHipster devbox](https://github.com/jhipster/jhipster-devbox) is now available! It is a virtualized development environment with JHipster and many other useful tools already installed.

Closed tickets
------------

As always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.24.0+is%3Aclosed)__.

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
