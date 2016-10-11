---
layout: default
title: Release 3.9.0
---

JHipster release 3.9.0
==================

What's new
----------

Lots of new exciting features in this release, as well as the usual bug fixes. Here are the most important ones:

- The "upgrade" sub-generator had issues since Git v2.9.0. You will probably need this when upgrading to this new JHipster release! See [#4253](https://github.com/jhipster/generator-jhipster/pull/4253)
- Consul support is now available for microservices architecture. This gives a second option, in replacement from the JHipster Registry (which is based on Eureka). See [#4143](https://github.com/jhipster/generator-jhipster/issues/4143) [#4165](https://github.com/jhipster/generator-jhipster/pull/4165)
- The Docker-Compose sub-generator can now work on monoliths (and not just gateways/microservices): [#4267](https://github.com/jhipster/generator-jhipster/pull/4267)
- New "IDE" Maven profile, to better configure IDEs when using DTOs with MapStruct: [#4118](https://github.com/jhipster/generator-jhipster/pull/4118)
- Continuous compilation with the Scala Maven Plugin. This isn't fully documented yet, as we are still testing some corner cases. This allows to have the application built automatically from the command line, which is really awesome when used with the Spring Boot devtools and BrowserSync: [#4204](https://github.com/jhipster/generator-jhipster/pull/4204)
- The generated README file is now much better, and points to the specific JHipster version that was used to generate the project, in our archived documentation. See [#4236](https://github.com/jhipster/generator-jhipster/pull/4236)
- Upgrade to the latest SpringFox version: [#4279](https://github.com/jhipster/generator-jhipster/pull/4279)
- Upgrade to the latest Spring Cloud Stream "Brooklyn" release, which allows to use the latest Kafka API version.
- Elasticsearch support in Kubernetes: [#4269](https://github.com/jhipster/generator-jhipster/pull/4269)

Closed tickets
------------
As always, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.9.0+is%3Aclosed)__.

How to upgrade
------------

For an automatic upgrade, starting with JHipster v3.4.0, use the [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) on an existing application:

```
yo jhipster:upgrade
```

For a manual upgrade, first upgrade your version of JHipster with:

```
npm update -g generator-jhipster
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
