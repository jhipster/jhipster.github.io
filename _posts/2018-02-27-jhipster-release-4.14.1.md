---
layout: default
title: Release 4.14.1
---

JHipster release 4.14.1
==================

What's new
----------

This is an emergency patch release because of ticket [#7188 - TypeError when building with prod profile](https://github.com/jhipster/generator-jhipster/issues/7188).

As the v4 branch is now in maintenance mode, the other main updates are only dependencies updates:

- [Upgrade to Spring Boot 1.5.10](https://github.com/jhipster/generator-jhipster/commit/aa21562b2be5d4cc3b423075f01b3a32a3cfa2f7)
- [Upgrade to ng-bootstrap 1.0.0](https://github.com/jhipster/generator-jhipster/commit/5f39ae530030d72c9e9ef0af78dda3973b668100)

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.14.1+is%3Aclosed)__.

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
