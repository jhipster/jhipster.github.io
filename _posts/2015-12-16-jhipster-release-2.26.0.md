---
layout: default
title: Release 2.26.0
---

JHipster release 2.26.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

What's new
----------

### The marketplace is open!

Everybody has been waiting for this for a long time, our [marketplace]({{ site.url }}/modules/marketplace.html) is now open!

You can code your own modules, with all the power of the JHipster sub-generators, but without having to be part of the project: anybody can code and publish them easily, just follow our [documentation here]({{ site.url }}/modules/creating_a_module.html).

### JHipster "needles"

The modules have made us update the "needles" again! We promise it's the last time you need to merge them!

### New date picker

Since the beginning we were using the standard HTML5 datepicker. It's standard, but it just doesn't work on Firefox, which is really annoying.
As we use more and more Angular UI features (the router, the modular views), we decided to use their datepicker by default.

### Hazelcast issues

We've had a lot of Hazelcast issues recently, so all of this code has been reworked and refactored!

Closed tickets
------------

As always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.26.0+is%3Aclosed)__.

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
