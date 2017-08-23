---
layout: default
title: Release 4.7.0
---

JHipster release 4.7.0
==================

What's new
----------

- Major new feature: Generate criteria class and backend for filtering using JPA! [read the new documentation here]({{ site.url }}/entities-filtering/) - see [#5540](https://github.com/jhipster/generator-jhipster/pull/5540)
- Major new feature: Support for API-first dev using swagger-codegen - see [#6229](https://github.com/jhipster/generator-jhipster/pull/6229)
- Spring dependencies upgrades - see [#6268](https://github.com/jhipster/generator-jhipster/pull/6268)
- Bootstrap, ng-bootstrap and Webpack upgrades - see [#6233](https://github.com/jhipster/generator-jhipster/pull/6233)
- Upgrade to JHipster Console v2.2.1 - see [#6175](https://github.com/jhipster/generator-jhipster/pull/6175)
- Migratation of Logstash appender from UDP to TCP - see [#6102](https://github.com/jhipster/generator-jhipster/issues/6102)
- Many minor bugs and small new features

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.7.0+is%3Aclosed)__.

How to upgrade
------------

**Automatic upgrade**

WARNING [this has been fixed very recently](https://github.com/jhipster/generator-jhipster/pull/5966), so if you have trouble with this:

- You can still do a "manual upgrade" (see below)
- If you find anything helpful for us, please send us comments on ticket [#5883](https://github.com/jhipster/generator-jhipster/issues/5883)
- If you have time and want to help, don't hesitate to contribute on this part!

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
