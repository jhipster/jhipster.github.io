---
layout: default
title: Release 2.3.0
---

JHipster release 2.3.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

What's new
----------

The most important news of this release is the support of [BrowserSync](http://www.browsersync.io/) to enable easy multi-device testing.

This supercedes the "live edit" plugin we were using before, so typing ```grunt serve``` will now launch BrowserSync. Everything should work the same as before, only better: you can now open several browsers, or use external devices, and all clicks/scrolls/inputs will be synchronized everywhere.

To have a preview of this feature, you can watch our [short introduction video](https://www.youtube.com/watch?v=u8rf8Fq5x0o).

And as always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.3.0+is%3Aclosed)__.

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
