---
layout: default
title: Release 6.0.0
---

JHipster release v6.0.0
==================

This is the first official release of JHipster v6.

It builds upon our v6.0.0.beta.0 release, after one month of beta testing and [120 closed tickets and pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.0.0+is%3Aclosed).

Most important new features and upgrades
-------------

Those are the release notes from our previous beta release (v6.0.0.beta.0), updated for this stable release (v6.0.0).

- Migration to Spring Boot 2.1.x
- JDK 11 support (while keeping JDK 8+ compatibility)
- HTML 5 pushstate [#9098](https://github.com/jhipster/generator-jhipster/pull/9098)
- Kubernetes enhancements (Istio, Helm)
- Migration to Spring Cloud Greenwish.x
- Upgrade to Spring Security 5.1's OIDC Support
- Upgrade to JUnit 5
- FakerJS support to generate sample data for entities [#9104](https://github.com/jhipster/generator-jhipster/pull/9104)
- Update to latest Angular version [#8161](https://github.com/jhipster/generator-jhipster/pull/8161)
- Update to latest React version
- Lazy Loading of Angular entities
- Bootswatch theme selection
- Removed CSS Option [#9350](https://github.com/jhipster/generator-jhipster/pull/9350)
- Improvements in Sonar integration [#9423](https://github.com/jhipster/generator-jhipster/pull/9423) and [#9482](https://github.com/jhipster/generator-jhipster/pull/9482), including an externalized sonar-project.properties file.
- Gatling 3 support, including several improvements with better and faster incremental builds and BOM support.
- Integration tests are set up in their separate phase for Maven and Gradle
- Update to Gradle 5
- Migration to Liquibase 3.6.x
- Update Elastic to 6.4.x
- Update to Couchbase 6.x
- Update to Infinispan 9.4.x
- Update to Cassandra 4.x
- Update to Hazelcast 3.11.x
- Logging to the console in json format
- Changing the default packaging to Jar while still being able to produce a War [#9034](https://github.com/jhipster/generator-jhipster/pull/9034)
- Prettier for formatting YAML [#9281](https://github.com/jhipster/generator-jhipster/pull/9281)
- Prettier transform to prettify the output from all sub-generators [#9371](https://github.com/jhipster/generator-jhipster/pull/9371)

We also removed a few features:

- Removed deprecated 'rancher-compose' sub-generator
- Removed Chocolatey and Homebrew installations, as we found out they didn't provide much benefits to users
- Deprecated the [JHipster Devbox](https://github.com/jhipster/jhipster-devbox) for the moment: we are looking for a maintainer, if you are interested please ping us!

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.0.0+is%3Aclosed)__.

How to upgrade
------------

**Automatic upgrade**

For an automatic upgrade, use the [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) on an existing application:

Upgrade your version of JHipster:

```
npm update -g generator-jhipster
```

And then run the upgrade sub-generator:

```
jhipster upgrade
```

**Manual upgrades**

For a manual upgrade, first upgrade your version of JHipster with:

```
npm update -g generator-jhipster
```

If you have an existing project, it will still use the JHipster version with which it was generated.
To upgrade your project, you must first delete its `node_modules` folder and then run:

```
jhipster
```

You can also update your project and all its entities by running

```
jhipster --with-entities
```

You can also update your entities one-by-one by running again the entity sub-generator, for example if your entity is named _Foo_

```
jhipster entity Foo
```

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

If the issue you have is an urgent bug or security issue, please:

- Contact [@jhipster](https://twitter.com/jhipster) on Twitter
