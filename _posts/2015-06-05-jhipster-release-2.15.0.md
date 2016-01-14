---
layout: default
title: Release 2.15.0
---

JHipster release 2.15.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

What's new
----------

This release fixes a few minor issues, but the biggest change is in our internal code: we have ported JHipster to the latest Yeoman version 0.20.1, and hence we are now ready for Yeoman 1.0!

A lot of things have changed under-the-hood: you should expect faster builds, but also maybe some new issues! Don't hesitate to send us feedback on Github/StackOverflow/Gitter.im.

And as always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.15.0+is%3Aclosed)__.

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
