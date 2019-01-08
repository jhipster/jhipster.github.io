---
layout: default
title: Release 4.1.1
---

JHipster release 4.1.1
==================

What's new
----------

This is the first patch release of JHipster 4.1.0.

- We have closed 32 issues and pull requests, but please note that **more than half** of the [closed tickets are marked invalid](https://github.com/jhipster/generator-jhipster/issues?q=is%3Aissue+milestone%3A4.1.1+is%3Aclosed). Please, follow our [guidelines](https://github.com/jhipster/generator-jhipster/blob/master/CONTRIBUTING.md) or we will close your tickets: invalid tickets make the whole team lose a lot of time, so if you want new patch releases and new cool features, you need to follow the project rules.
- With this release, the [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) is working again! As this is a small patch release, this is the good moment for everyone to test it! If you have it working (or not!), don't hesitate to tweet it and mention [@java_hipster](https://twitter.com/java_hipster).
- The most important bug fix on this release is [#5458](https://github.com/jhipster/generator-jhipster/pull/5458), as this made errors in all applications using OAuth2. Concerning OAuth2, please note that only 0,46% of applications used this option during the last month: there have already been talks to remove this, as it has a big maintenance cost, for very few users. So if you like OAuth2, please help maintaining it!

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.1.1+is%3Aclosed)__.

How to upgrade
------------

**Automatic upgrade**

For an automatic upgrade, use the [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) on an existing application:

```
yo jhipster:upgrade
```

**Manual upgrades**

For a manual upgrade, first upgrade your version of JHipster with:

```
yarn global upgrade generator-jhipster
```

If you have an existing project, it will still use the JHipster version with which it was generated.
To upgrade your project, you must first delete its `node_modules` folder and then run:

```
yo jhipster
```

You can also update your project and all its entities by running

```
yo jhipster --with-entities
```

You can also update your entities one-by-one by running again the entity sub-generator, for example if your entity is named _Foo_

```
yo jhipster:entity Foo
```

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

If the issue you have is an urgent bug or security issue, please:

- Contact [@java_hipster](https://twitter.com/java_hipster) on Twitter
