---
layout: default
title: Release 6.1.1
---

JHipster release v6.1.1
==================

This is an emergency patch release because of a broken transitive dependency, that blocks our command line. see [#9952](https://github.com/jhipster/generator-jhipster/issues/9952) for more information.

Apart from this blocker issue, this release also includes many improvements, here are the most important ones:

- Lots of work to improve how faker.js generates fake data  - [#9862](https://github.com/jhipster/generator-jhipster/pull/9862) [#9663](https://github.com/jhipster/generator-jhipster/pull/9663) [#9890](https://github.com/jhipster/generator-jhipster/pull/9890)
- Update to Spring Boot 2.1.6 - [#9930](https://github.com/jhipster/generator-jhipster/pull/9930)

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.1.1+is%3Aclosed)__.

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
