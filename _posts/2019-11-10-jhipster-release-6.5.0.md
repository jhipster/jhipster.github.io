---
layout: default
title: Release 6.5.0
---

JHipster release v6.5.0
==================

This is a new minor release of JHipster v6 with [147 closed tickets and merged pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.5.0+is%3Aclosed).

Here are the most significant ones:

- Azure Spring Cloud sub generator - [merge commit](https://github.com/jhipster/generator-jhipster/commit/d40cf08ab79c0c4d005550551380ea446a1e4c6e)
- Support of GitHub Actions - [#10606](https://github.com/jhipster/generator-jhipster/pull/10606)
- Persistence improvements using hypersistence optimizer - [#10667](https://github.com/jhipster/generator-jhipster/pull/10667)
- Upgrade to Spring Boot 2.1.10.RELEASE - [#10734](https://github.com/jhipster/generator-jhipster/pull/10734)
- Upgrade to JHipster Core 6+ - [#10745](https://github.com/jhipster/generator-jhipster/pull/10745)
- Microservices Support for AWS Containers - [#10494](https://github.com/jhipster/generator-jhipster/pull/10494)
- No HTTP Checkstyle plugin - [#10466](https://github.com/jhipster/generator-jhipster/pull/10466)
- New flag to disable Fake data generation - [#9663](https://github.com/jhipster/generator-jhipster/pull/9663)
- Many libraries upgrades

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.5.0+is%3Aclosed)__.

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
