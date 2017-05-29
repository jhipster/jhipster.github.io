---
layout: default
title: Release 4.5.2
---

JHipster release 4.5.2
==================

What's new
----------

This is the second patch release for JHipster v4.5.0. It corrects a few annoying issues, and prepares for our next minor release (with a focus on getting Angular 4 support out of beta).

In total, 50 bugs and PRs have been fixed, here are the most important changes:

- Upgrade to the latest Angular 4.1.3 release [#5838](https://github.com/jhipster/generator-jhipster/pull/5838)
- Hand-code the UserMapper as we don't want to force people to use MapStruct by default [#5808](https://github.com/jhipster/generator-jhipster/issues/5808)
- Fix the LoggingAspect which wasn't working anymore [#5823](https://github.com/jhipster/generator-jhipster/issues/5823)

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.5.2+is%3Aclosed)__.

How to upgrade
------------

**Automatic upgrade**

For an automatic upgrade, use the [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) on an existing application:

```
yo jhipster:upgrade
```

Please note that with our new JHipster CLI release, the new command will be:

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
