---
layout: default
title: Release 6.10.0
---

JHipster release v6.10.0
==================

This is the new minor release, with [142 closed tickets and merged pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.10.0+is%3Aclosed).

Here are the most significant ones:

- Upgrade to Angular 10 - [#11998](https://github.com/jhipster/generator-jhipster/pull/11998)
- Microservice support for GAE sub-generator - [#11969](https://github.com/jhipster/generator-jhipster/pull/11969)
- Support Okta as OIDC provider when deploying to Heroku - [#11715](https://github.com/jhipster/generator-jhipster/pull/11715)
- Provide Memcached and Redis support for Heroku [#11712](https://github.com/jhipster/generator-jhipster/pull/11712)
- Many libraries upgrades
- Many bug fixes

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.10.0+is%3Aclosed)__.

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
