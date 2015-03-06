---
layout: default
title: Release 2.5.2
---

JHipster release 2.5.2
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

What's new
----------

This is a bug-fixing release. The 2 major changes are:

- The generated .gitignore file has been [really improved](https://github.com/jhipster/generator-jhipster/blob/master/app/templates/gitignore). This should solve issues like [#1211](https://github.com/jhipster/generator-jhipster/issues/1211) but __be careful__ as this might ignore files which weren't ignored before!
- [Pagination has been corrected](https://github.com/jhipster/generator-jhipster/issues/1208)

And as always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.5.2+is%3Aclosed)__.

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
