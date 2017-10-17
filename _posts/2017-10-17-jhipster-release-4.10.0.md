---
layout: default
title: Release 4.10.0
---

JHipster release 4.10.0
==================

What's new
----------

- OpenID Connect support is now ready! This means you can now secure your JHipster application using an OpenID Connect provider such as [Keycloak](http://www.keycloak.org/) or [Okta](https://www.okta.com). This also includes microservices security, using a Zuul proxy (in a JHipster gateway) or using Feign (to connect microservices together). This replaces our older OAuth2 support, as announced in our previous release. This is a huge work, so please be careful when using this first release. For more information, see [#6432](https://github.com/jhipster/generator-jhipster/issues/6432), [#6435](https://github.com/jhipster/generator-jhipster/pull/6435) and [#6519](https://github.com/jhipster/generator-jhipster/issues/6519).
- As the entity sub-generator goes too far for some simple use-cases, we have a new [Spring MVC REST controller sub-generator]({{ site.url }}/creating-a-spring-controller/). For consistency reasons, we also renamed our "Service sub-generator" to become the [Spring service sub-generator]({{ site.url }}/creating-a-spring-service/). Please note that we focus on the Spring Boot generators, as on the client-side you can use [Angular CLI](https://github.com/angular/angular-cli) with JHipster. For more information, see [#6451](https://github.com/jhipster/generator-jhipster/pull/6451).
- After project generation, if Git is installed, the generator now automatically initializes a Git repository and commits the generated application. See [#6453](https://github.com/jhipster/generator-jhipster/issues/6453).
- Our recent support for [Zalando problem-spring-web](https://github.com/zalando/problem-spring-web) had been greatly improved, for example with [#6404](https://github.com/jhipster/generator-jhipster/issues/6404) and [#6411](https://github.com/jhipster/generator-jhipster/pull/6411).

Roadmap
----------

Two important new features are planned for our next `4.11.0` release:

- [Couchbase support](https://github.com/jhipster/generator-jhipster/issues/6086).
- [Use jhipster-dependencies BOM](https://github.com/jhipster/generator-jhipster/pull/6509), that should greatly simplifies future application upgrades.

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.10.0+is%3Aclosed)__.

How to upgrade
------------

**Automatic upgrade**

For an automatic upgrade, use the [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) on an existing application:

Upgrade your version of JHipster:

```
yarn global upgrade generator-jhipster
```

And then run the upgrade sub-generator:

```
jhipster upgrade
```

**Manual upgrades**

For a manual upgrade, first upgrade your version of JHipster with:

```
yarn global upgrade generator-jhipster
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
