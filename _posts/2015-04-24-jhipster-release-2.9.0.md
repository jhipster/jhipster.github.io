---
layout: default
title: Release 2.9.0
---

JHipster release 2.9.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

What's new
----------

We now have support for __Elasticsearch__!

Original work was done by [David Pilato](https://twitter.com/dadoonet) from Elasticsearch, during the DevoxxFR HackerGarten, but (sorry, David!) we ended up recoding everything in order to use Spring Data Elasticsearch.

The main interest of using Spring Data Elasticsearch is that everything is automatically configured for you by Spring Boot.

If you want more information on our Elasticsearch support, we have a [specific documentation available](http://jhipster.github.io/using_elasticsearch.html).

And as always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.9.0+is%3Aclosed)__.

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
