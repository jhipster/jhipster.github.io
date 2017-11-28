---
layout: default
title: Release 2.27.1
---

JHipster release 2.27.1
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

Documentation
----------

Looking for the (old) JHipster v2.x documentation? It's [Here]({{ post.url }}/documentation-archive)!

What's new
----------

This version is at the same time a bug-fix release and a first step towards migrating to JHipster 3.0. This is because our main bug-fix is in fact a back-port from JHipster 3.0!

- Recommended JavaScript build tool is now [Gulp](http://gulpjs.com/). Gulp will be the only option available with JHipster 3.0, as maintaining 2 tools in parallel is a waste of effort from the dev team. As AngularJS 2.0 is using Gulp, this is also a decision made to prepare our future move towards AngularJS 2.0 and TypeScript (but that will be for JHipster 4.0!).
- Most important bug fixed is [#2932](https://github.com/jhipster/generator-jhipster/issues/2932) which made the production profile fail when using both Gulp and Gradle.

And in case you missed it, we have released [the JDL Studio](https://start.jhipster.tech/jdl-studio/) to help you generate your entities. Check it out and send us feedback!

Closed tickets
------------

As always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.27.1+is%3Aclosed)__.

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

- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

If the issue you have is an urgent bug or security issue, please:

- Contact [@java_hipster](https://twitter.com/java_hipster) on Twitter
