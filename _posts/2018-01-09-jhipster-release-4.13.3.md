---
layout: default
title: Release 4.13.3
---

JHipster release 4.13.3
==================

What's new
----------

This patch release has several important fixes and changes:

- HTTP Session Clustering with Hazelcast has been removed ([#6944](https://github.com/jhipster/generator-jhipster/pull/6944)). JHipster now has far better Spring Cache abstraction support, which is a much better solution for everyone. This also lowers the maintenance burden for the core team, for an option which was very rarely used.
- E-mails can now be used as usernames ([#6923](https://github.com/jhipster/generator-jhipster/issues/6923)), as it prevented both Keycloak and Okta to work properly. So you can now login both with your username or your e-mail address - but as your username can also be an e-mail address, we understand this can be confusing, and are currently considering if we should remove the usernames completely, and only use e-mail addresses to login.
- workbox-webpack-plugin was causing the front-end build to fail, and is corrected with [#6950](https://github.com/jhipster/generator-jhipster/pull/6950)
- The `prod` profile now works correctly with microservices, see [#6947](https://github.com/jhipster/generator-jhipster/issues/6947)
- It looks like Oracle changed its JDBC driver names, and this is corrected in [#6952](https://github.com/jhipster/generator-jhipster/issues/6952)
- Support for "includes()" functions with Internet Explorer has been added in [#6953](https://github.com/jhipster/generator-jhipster/issues/6953)

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.13.3+is%3Aclosed)__.

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
