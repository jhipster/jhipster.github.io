---
layout: default
title: Release 2.2.0
---

JHipster release 2.2.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

What's new
----------

This is mostly a bug-fixing release, but we included a __breaking change__ in the configuration files of the entity sub-generator:

- Configuration files are now stored in the '.jhipster' directory, and not at the root directory, so we don't end up with lots of files at the root of the project (this mostly affected Windows users, as their inferior OS has no idea what a dotfile is)
- Now those files always start with a upper case letter: they have the same name as the entity they generate. Otherwise we had trouble with people calling the sub-generator twice, once with a upper-case letter, and once with a lower-case letter

And as always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.2.0+is%3Aclosed)__.

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
