---
layout: default
title: Release 3.2.1
---

JHipster release 3.2.1
==================

What's new
----------

This is a bug-fix version for JHipster v3.2.0, with a couple of cool new features.

Important bug fixes:

- Error with languages with 5-letter codes [#3554](https://github.com/jhipster/generator-jhipster/issues/3554)
- findByUserIsCurrentUser() not working with JWT [#3560](https://github.com/jhipster/generator-jhipster/issues/3560)

Cool new features:

- We have a brand new [JHipster DevBox](https://github.com/jhipster/jhipster-devbox). It is based on the latest Ubuntu Xenial release, uses XUbuntu, and has many improved applications.
- There should now be a notification when a new version is released [#3562](https://github.com/jhipster/generator-jhipster/pull/3562). Of course, this couldn't have been tested for real, so let's wait for the next version to see if it works :-)

Closed tickets
------------
As always, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.2.1+is%3Aclosed)__.

How to upgrade
------------

Update your version of JHipster with:

```
npm update -g generator-jhipster
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
