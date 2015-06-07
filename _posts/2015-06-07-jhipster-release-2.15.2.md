---
layout: default
title: Release 2.15.2
---

JHipster release 2.15.2
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

What's new
----------

This is a bug-fixing release, which correct a missing NPM library (EJS), and adds also some bug fixes in the Gradle and Gulp.js builds.

If you still have the `Error: Cannot find module 'ejs'` issue, please send us a bug report, it's hard to test on a development build (as we have the module installed anyway). Of course it's easy to fix manually by typing `npm install ejs`, but we want this solved for everyone!

Those issues still come from our migration to Yeoman 0.20.1, which has been very complicated, but this should be the end of them! That's the price to pay to be ready for Yeoman 1.0.

And as always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.15.2+is%3Aclosed)__.

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
