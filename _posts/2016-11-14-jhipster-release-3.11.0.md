---
layout: default
title: Release 3.11.0
---

JHipster release 3.11.0
==================

What's new
----------

75 closed tickets and merged PRs in this release! Those are mostly library upgrades, and quite a lot of small improvements in the generated code.

Here are the most important ones:

- Upgrade Gradle to 3.2 - [#4472](https://github.com/jhipster/generator-jhipster/pull/4472)
- Tests generated for ZonedDateTime entity attributes are failing - [#4373](https://github.com/jhipster/generator-jhipster/issues/4373)
- Update to Spring Boot 1.4.2 - [#4449](https://github.com/jhipster/generator-jhipster/issues/4449)
- Change @PostConstruct to @Before in tests - [#4435](https://github.com/jhipster/generator-jhipster/pull/4435)
- Upgrade springfox to 2.6.1 - [#4438](https://github.com/jhipster/generator-jhipster/pull/4438)
- Enable oauth with live reload - [#4442](https://github.com/jhipster/generator-jhipster/pull/4442)
- Configure default date format as ISO - [#4433](https://github.com/jhipster/generator-jhipster/pull/4433)
- Early support for Yarn - [#4426](https://github.com/jhipster/generator-jhipster/pull/4426)
- ClassNotFoundException when using Kafka + Gatling - [#4402](https://github.com/jhipster/generator-jhipster/issues/4402)
- Upgrade to node 6.9.1 LTS - [#4419](https://github.com/jhipster/generator-jhipster/pull/4419)
- Fill test strings with stream to avoid constant string too long error - [#4336](https://github.com/jhipster/generator-jhipster/pull/4336)
- CLOB validation annotations are wrong - [#4344](https://github.com/jhipster/generator-jhipster/issues/4344)


Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.11.0+is%3Aclosed)__.

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
