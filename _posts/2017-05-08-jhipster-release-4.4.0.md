---
layout: default
title: Release 4.4.0
---

JHipster release 4.4.0
==================

JHipster Registry 3.0
----------

The [JHipster Registry]({{ site.url }}/jhipster-registry/) has reached version 3.0! It is a major release, that adds dashboards to the Registry: it is now able to monitor all application types (monoliths, gateways, microservices) in one central location.

As a result, the [JHipster Registry has a new documentation page]({{ site.url }}/jhipster-registry/), which is now part of new section dedicated to microservices on this website. Please check this out, there is a lot of new stuff here!

This new JHipster Registry has been possible thanks to the great work of [Julien Margarido](https://github.com/JulienMrgrd), our new trainee working on JHipster, congratulations to him!

Other important news and updates
----------

This new releases comes with 135 closed tickets and pull requests! Here are the most important news:

- Several library updates, including an upgrade to Spring Cloud Dalston
- Lots of code clean up and new unit tests (our sample application now has 91,1% code coverage!)
- The JHipster gateway API now supports rate limiting using Bucket4j instead of Cassandra, which gives much better quality and performance, see [#5388](https://github.com/jhipster/generator-jhipster/issues/5388) and the new [API gateway documentation]({{ site.url }}/api-gateway/). This rate limiting system can still scale across several gateway instances, using our distributed caching support with Hazelcast, which works thanks to the JHipster Registry!
- Much improved Zuul and Eureka settings, giving a huge performance increase, more quality and stability, than when using the standard Spring Cloud settings
- Support for JSR310's Instant type, see [#5684](https://github.com/jhipster/generator-jhipster/pull/5684)

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.4.0+is%3Aclosed)__.

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
