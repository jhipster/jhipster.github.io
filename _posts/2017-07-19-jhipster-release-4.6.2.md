---
layout: default
title: Release 4.6.2
---

JHipster release 4.6.2
==================

What's new
----------

This is the second patch release for JHipster v4.6.0.

- As it is already used in several production clusters, our Kubernetes sub-generator is now out of beta - see [#6145](https://github.com/jhipster/generator-jhipster/pull/6145).
- Upgrade to Typescript 2.4.1 - see [#6051](https://github.com/jhipster/generator-jhipster/issues/6051).
- Support for Arabic language (another left-to-right language, following our Farsi support in [#5961](https://github.com/jhipster/generator-jhipster/pull/5961)) - see [#6101](https://github.com/jhipster/generator-jhipster/pull/6101).
- Support for Bahasa Indonesia language - see [#6092](https://github.com/jhipster/generator-jhipster/pull/6092).
- Lots of small improvements and minor bug fixes.

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.6.2+is%3Aclosed)__.

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
