---
layout: default
title: Release 5.7.1
---

JHipster release v5.7.1
==================

This is a patch release on JHipster 5.7.0, which was released last month, and which includes [140 closed tickets and merged pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.7.1+is%3Aclosed).

Most of those changes are minor bug fixes, typos and formatting errors, and also some libraries upgrades.

The biggest new feature here is our new artwork, which includes our new inclusive images and logos! For more information on this artwork, have a look at our specific [JHipster artwork repository](https://github.com/jhipster/jhipster-artwork). For your information, the image used on each generated project is now selected from a hash of your project name: as a result, you will get a random image from our "JHispter family", and that image will stay the same when you re-generate your project, unless you modify the project name.

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.7.1+is%3Aclosed)__.

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
