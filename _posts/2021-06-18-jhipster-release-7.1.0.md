---
layout: default
title: Release 7.1.0
---

JHipster release v7.1.0
==================

This is the first minor release of JHipster v7 with [817 closed tickets and merged pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A7.1.0+is%3Aclosed).

Breaking changes
------------

- React: Redux toolkit migration - [#15033](https://github.com/jhipster/generator-jhipster/issues/15033)
- React: Migrate to react-hook-form from availity-reactstrap-validation - [#15191](https://github.com/jhipster/generator-jhipster/pull/15191)

Most important new features and upgrades
-------------

- Angular 12 - [#14980](https://github.com/jhipster/generator-jhipster/pull/14980)
- Add microfrontend support to angular - [#15286](https://github.com/jhipster/generator-jhipster/pull/15286)
- Remove AWS Containers Subgenerator - [#14637](https://github.com/jhipster/generator-jhipster/pull/14637)
- Update spring-boot version to 2.4.7 and other dependencies - [#15283](https://github.com/jhipster/generator-jhipster/pull/15283)
- Cache frontend application files - [#15126](https://github.com/jhipster/generator-jhipster/issues/15126)
- Cypress 7.4.0 - [#14983](https://github.com/jhipster/generator-jhipster/pull/14983)
- JWTRelay allow no authorization header - [#14854](https://github.com/jhipster/generator-jhipster/pull/14854)
- Use by default Base64-encoded JWT secret - [#14952](https://github.com/jhipster/generator-jhipster/issues/14952)
- Many libraries upgrades

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A7.1.0+is%3Aclosed)__.

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

**Tips**

To generate your project with all Java classes already formatted using [prettier-java](https://github.com/jhipster/prettier-java), you should use:

```
jhipster --prettier-java
```

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

If the issue you have is an urgent bug or security issue, please:

- Contact [@jhipster](https://twitter.com/jhipster) on Twitter
