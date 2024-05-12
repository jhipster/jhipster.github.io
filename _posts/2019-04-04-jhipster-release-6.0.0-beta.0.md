---
layout: default
title: Release 6.0.0-beta.0
---

JHipster release v6.0.0-beta.0
==================

This is our first beta release for JHipster v6.

It includes more than [400 closed tickets and pull requests on the main project](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.0.0-beta.0+is%3Aclosed), so it is really a huge work.

_It is not available through the usual channels as this is a beta release, please read below for more information!_

Most important new features and upgrades
-------------

- Migration to spring-boot 2.1.x
- JDK 11 support (while keeping JDK 8+ compatibility)
- HTML 5 pushstate [#9098](https://github.com/jhipster/generator-jhipster/pull/9098)
- Kubernetes enhancements (Istio, Helm)
- Migration to spring-cloud Greenwish.x
- Upgrade to Spring Security 5.1's OIDC Support
- FakerJS support to generate sample data for entities [#9104](https://github.com/jhipster/generator-jhipster/pull/9104)
- Update to latest Angular version [#8161](https://github.com/jhipster/generator-jhipster/pull/8161)
- Update to latest React version
- Lazy Loading of Angular entities
- Bootswatch theme selection
- Removed CSS Option [#9350](https://github.com/jhipster/generator-jhipster/pull/9350)
- Improvements in Sonar integration [#9423](https://github.com/jhipster/generator-jhipster/pull/9423) and [#9482](https://github.com/jhipster/generator-jhipster/pull/9482)
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
- Removed deprecated 'rancher-compose' sub-generator

How to install
------------

This is a beta release, so it is not available on our usual "stable" release channel.

To install JHipster v6.0.0-beta.0 using using NPM:

    npm install -g generator-jhipster@beta

It is also available using the JHipster Docker image, as it is automatically built from our source code.

However, as this is a BETA release it will not be available using our other usual channels like:

- [JHipster Online](https://start.jhipster.tech)
- Homebrew
- Chocolatey
- [JHipster Devbox](https://github.com/jhipster/jhipster-devbox)

You also won’t be able to use the `jhipster upgrade` sub-generator, as it won’t “see” the BETA release, which is distributed through a specific beta channel on NPM.


Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.0.0-beta.0+is%3Aclosed)__.

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

If the issue you have is an urgent bug or security issue, please:

- Contact [@jhipster](https://twitter.com/jhipster) on Twitter
