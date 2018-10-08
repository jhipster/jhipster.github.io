---
layout: default
title: Release 5.4.1
---

JHipster release v5.4.1
==================

This patch release comes with 15 fixed issues and closed pull requests, including [3 bug bounties](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.4.1+is%3Aclosed+label%3A%24100) that were paid thanks to our [bug bounty program](https://www.jhipster.tech/bug-bounties/). If your company benefits from JHipster, wants great visibility in our community, or wants the ability to choose which tickets deserve bug bounties, please consider [sponsoring the project](https://www.jhipster.tech/sponsors/).

This fixes a few minor issues, including:

- JHipster 5.4.0 doesn't use correct userId type for relationships with OAuth 2.0 ([#8454](https://github.com/jhipster/generator-jhipster/issues/8454))
- One CVE on MySQL connector (and a couple of false positives when testing for CVEs) ([#8452](https://github.com/jhipster/generator-jhipster/pull/8452))

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.4.1+is%3Aclosed)__.

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
