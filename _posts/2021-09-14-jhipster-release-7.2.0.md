---
layout: default
title: Release 7.2.0
---

JHipster release v7.2.0
==================

This is the second minor release of JHipster v7 with [947 closed tickets and merged pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A7.2.0+is%3Aclosed).


Most important new features and upgrades
-------------

- Couchbase support is back - [#16227](https://github.com/jhipster/generator-jhipster/pull/16227) [#16208](https://github.com/jhipster/generator-jhipster/pull/16208) [#16080](https://github.com/jhipster/generator-jhipster/pull/16080) [#16115](https://github.com/jhipster/generator-jhipster/pull/16115) [#16102](https://github.com/jhipster/generator-jhipster/pull/16102) [#16077](https://github.com/jhipster/generator-jhipster/pull/16077) [#15645](https://github.com/jhipster/generator-jhipster/pull/15645)
- Modernizer plugin to detect legacy/deprecated API usage - [#16198](https://github.com/jhipster/generator-jhipster/pull/16198)
- Auth0 - [#16127](https://github.com/jhipster/generator-jhipster/pull/16127) [#15634](https://github.com/jhipster/generator-jhipster/pull/15634)
- JDL enum comments - [#15364](https://github.com/jhipster/generator-jhipster/pull/15364)
- No Database selection project generation issue - [#15978](https://github.com/jhipster/generator-jhipster/pull/15978)
- Enable OAuth2 refresh token - [#15424](https://github.com/jhipster/generator-jhipster/pull/15424)
- Support Punjabi language - [#15402](https://github.com/jhipster/generator-jhipster/pull/15402)
- Replace Spring Cloud Hystrix by Spring Cloud Resilience4j - [#14031](https://github.com/jhipster/generator-jhipster/issues/14031)
- Support generating Gradle Enterprise configuration - [#14226](https://github.com/jhipster/generator-jhipster/issues/14226) 
- Many libraries upgrades

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A7.2.0+is%3Aclosed)__.

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
