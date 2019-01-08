---
layout: default
title: Release 4.13.0
---

JHipster release 4.13.0
==================

What's new
----------

This release was initially supposed to be a patch release, to fix this very annoying bug:

- Missing locale data and UI issues when the native language is not English, see [#6836](https://github.com/jhipster/generator-jhipster/issues/6836)

But as we also merged support for Angular 5.1, it has become a minor release:

- Upgrade Angular to 5.1.0 / TypeScript to 2.5.3, see [#6841](https://github.com/jhipster/generator-jhipster/pull/6841)
- This also improves our Webpack build time by about 10 to 20%, which is very impressive!

As a result, this is recommended upgrade over JHipster v4.12.0 for everyone.

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.13.0+is%3Aclosed)__.

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
