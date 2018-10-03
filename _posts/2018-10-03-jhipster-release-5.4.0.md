---
layout: default
title: Release 5.4.0
---

JHipster release v5.4.0
==================

This release comes with 89 fixed issues and closed pull requests, including [8 bug bounties](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.4.0+is%3Aclosed+label%3A%24100) that were paid thanks to our [bug bounty program](https://www.jhipster.tech/bug-bounties/). If your company benefits from JHipster, wants great visibility in our community, or wants the ability to choose which tickets deserve bug bounties, please consider [sponsoring the project](https://www.jhipster.tech/sponsors/).

Here are the most important changes for this release:

- Migration to [Jib](https://github.com/GoogleContainerTools/jib) for creating Docker images ([#8352](https://github.com/jhipster/generator-jhipster/pull/8352)) thanks to [Daniel Petisme](https://github.com/danielpetisme). This is a huge improvement over the Docker Maven plugin that we were using, but as a result the command to create an image as changed, and that will impact everyone! Please use now `./mvnw package -Pprod jib:dockerBuild` or `./gradlew -Pprod bootWar jibDockerBuild`.
- Support for relationships in MongoDB  ([#7944](https://github.com/jhipster/generator-jhipster/issues/7944)), thanks to [Iván García Sainz-Aja](https://github.com/ivangsa). Relationships work with Angular and React, and also with the JHipster Domain Language (JDL) exactly as they do with an SQL database. This is a very impressive achievement, and probably one of our most requested features!
- Upgrade to the [JHipster Console 4.0.0](https://github.com/jhipster/jhipster-console/releases/tag/v4.0.0) thanks to [Pierre Besson](https://github.com/PierreBesson). This includes many new features, the most impressive one being that you can now jump directly from the Zipkin UI to Kibana (and back again!), allowing you to easily spot where your microservices spend time.
- Upgrade to Istio 1.x, as well as many improvements in the Istio configuration ([#8321](https://github.com/jhipster/generator-jhipster/pull/8321)) thanks to [Srinivasa Vasu](https://github.com/srinivasa-vasu).
- Upgrade to the latest Keycloak ([#8432](https://github.com/jhipster/generator-jhipster/pull/8432)) and Traefik ([#8427](https://github.com/jhipster/generator-jhipster/pull/8427)) versions.

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.4.0+is%3Aclosed)__.

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

- Contact [@java_hipster](https://twitter.com/java_hipster) on Twitter
