---
layout: default
title: Release 6.9.0
---

JHipster release v6.9.0
==================

This release fixes an **important security vulnerability** if you used master version between v6.8.0 and v6.9.0:

- Please read the [security advisory here](https://github.com/jhipster/generator-jhipster/security/advisories/GHSA-8w7w-67mw-r5p7).

**What's new in this release**

Apart from the security vulnerability, this is a minor release of JHipster v6 with [316 closed tickets and merged pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.9.0+is%3Aclosed).

Here are the most significant ones:

- Upgrade to Spring Boot 2.2.7.RELEASE - [#11718](https://github.com/jhipster/generator-jhipster/pull/11718)
- Lot of improvements for Reactive applications
- Lot of improvements for Neo4J
- Upgrade to Keycloak 10.0.0 - [#11688](https://github.com/jhipster/generator-jhipster/pull/11688)
- Prettier for Java - [#11645](https://github.com/jhipster/generator-jhipster/pull/11645)
- Support for Testcontainers - [#11584](https://github.com/jhipster/generator-jhipster/pull/11584)
- Circle CI support - [#11452](https://github.com/jhipster/generator-jhipster/pull/11452)
- New language : Bulgarian - [#11498](https://github.com/jhipster/generator-jhipster/pull/11498)
- New language : Sinhala - [#11564](https://github.com/jhipster/generator-jhipster/pull/11564)
- Many libraries upgrades
- Many bug fixes


Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.9.0+is%3Aclosed)__.

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
