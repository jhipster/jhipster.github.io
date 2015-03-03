---
layout: default
title: Release 2.5.1
---

JHipster release 2.5.1
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

What's new
----------

JHipster now provides pagination on the generated entities!

Pagination uses [the Link header](http://tools.ietf.org/html/rfc5988), as in the [Github API](https://developer.github.com/v3/#pagination). You can have more information on doing pagination on a REST API on this [best practices document](http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api).

Pagination is based on Spring Data (that's why it works for SQL databases and MongoDB, but not Cassandra). As we couldn't find any ready-made implementation for the Link header API, JHipster provides a custom implementation of this specification on both the server (Spring MVC REST) and client (AngularJS) sides.

We have 4 pagination options:

- No pagination (in that case, the back-end won't be paginated)
- A simple pager, based on [the Bootstrap pager](http://getbootstrap.com/components/#pagination-pager)
- A complete pagination system, based on [the Bootstrap pagination component](http://getbootstrap.com/components/#pagination)
- An infinite scroll system, based on [the infinite scroll directive](http://sroze.github.io/ngInfiniteScroll/)

And as always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.5.1+is%3Aclosed)__.

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
