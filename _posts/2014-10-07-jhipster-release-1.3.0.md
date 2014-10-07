---
layout: default
title: Release 1.3.0
---

JHipster release 1.3.0
==================

*JHipster gives you Yeoman + Maven + Spring + AngularJS all working together in one handy generator.*

What's new
----------

This is an important new release, with two major news:

- The entity sub-generator has been greatly improved, and can now generate a whole CRUD application, from database to HTML. Please check our [updated documentation](http://jhipster.github.io/creating_an_entity.html).
- Our Java "hot reload" feature has been deprecated. We had too many bugs, people got confused about it, and most importantly the Spring Loaded team is not working on the project. We will try to find an alternative, as we have invested a lot of time on this subject. Please note that for generating Liquibase changelogs, you can now use the new entity sub-generator (see above point).

[You can check the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A1.3.0+is%3Aclosed).

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
