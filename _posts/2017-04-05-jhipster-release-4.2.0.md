---
layout: default
title: Release 4.2.0
---

JHipster release 4.2.0
==================

What's new
----------

The biggest news in JHipster 4.2.0 is that we migrated to the freshly-released Angular 4! This includes AOT support inside JHipster, which provides an important performance enhancements - have a look at the [Angular cookbook on AOT](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html) if you need more information.

Angular 4 is still in BETA, but the final release is getting closer and closer. We now have quite a lot of people using it, with some very good results. Our biggest remaining work is to provide a "production" build as good as the AngularJS 1 (in fact, thanks to AOT, it should be much, much better!!). So you can start developing Angular 4 applications with confidence, and prepare to upgrade your JHipster version when we have finished the production build.

Other really cool features are:

- [ELK 5](https://www.elastic.co/fr/v5) and [Zipkin](http://zipkin.io/) support in our microservices architecture by [Pierre Besson](https://twitter.com/pibesson) - beware, the new dashboards are gorgeous :-)
- [Rancher](http://rancher.com/rancher/) support by [Steve Houël](https://twitter.com/SteveHouel), documentation should be available in the next few days.

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.2.0+is%3Aclosed)__.

How to upgrade
------------

**Automatic upgrade**

For an automatic upgrade, use the [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) on an existing application:

```
yo jhipster:upgrade
```

**Manual upgrades**

For a manual upgrade, first upgrade your version of JHipster with:

```
yarn global upgrade generator-jhipster
```

If you have an existing project, it will still use the JHipster version with which it was generated.
To upgrade your project, you must first delete its `node_modules` folder and then run:

```
yo jhipster
```

You can also update your project and all its entities by running

```
yo jhipster --with-entities
```

You can also update your entities one-by-one by running again the entity sub-generator, for example if your entity is named _Foo_

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
