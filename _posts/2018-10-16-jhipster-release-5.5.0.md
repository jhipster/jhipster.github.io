---
layout: default
title: Release 5.5.0
---

JHipster release v5.5.0
==================

This minor release comes with 84 fixed issues and closed pull requests.

The most important one, as everybody doing front-end work will experience it, is our new "pacman" loader (you need to see it to understand!). Many thanks to [@sabrinapayet](https://github.com/sabrinapayet) who did [#8558](https://github.com/jhipster/generator-jhipster/pull/8558), that's a [bug bounty](https://www.jhipster.tech/bug-bounties/) which is well-deserved!

Here are the other important closed tickets and pull requests:

- Fix compilation & test issue with MongoDB relationships in [#8511](https://github.com/jhipster/generator-jhipster/pull/8511).
- Cloud Foundry sub-generator does not work: no suitable cloud connector found in [#8518](https://github.com/jhipster/generator-jhipster/issues/8518).
- Docker-Compose: limit memory to 512m in [#8539](https://github.com/jhipster/generator-jhipster/pull/8539).
- Generate correct Feign configuration for JWT gateways in [#8542](https://github.com/jhipster/generator-jhipster/pull/8542).
- Gatling with OAuth2 and Keycloak in [#8552](https://github.com/jhipster/generator-jhipster/issues/8552).
- Clean up and document ports in [#8580](https://github.com/jhipster/generator-jhipster/issues/8580).
- Application shouldn't write log to file in [#8582](https://github.com/jhipster/generator-jhipster/issues/8582).
- Updated Google App Engine Generator for latest JHipster in [#8583](https://github.com/jhipster/generator-jhipster/pull/8583).

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.5.0+is%3Aclosed)__.

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
