---
layout: default
title: Release 4.0.3
---

JHipster release 4.0.3
==================

What's new
----------

This is the third patch release for JHipster 4.0.0, with 52 bug fixes and tickets closed.

One big improvement is that you are now able to use the [JHipster Registry]({{ site.url }}/jhipster-registry/) with a monolith application, in order to use a distributed Hazelcast cache. You can find more information about this on our ["Using a cache" documentation]({{ site.url }}/using-cache/).

We have also greatly improved our documentation, so you should find more easily help on common problems, like running `yarn start` to have your client-side development server running.

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.0.3+is%3Aclosed)__.

How to upgrade
------------

**Manual upgrades (works for JHipster 4.x applications)**

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

**Automatic upgrade only works for JHipster 3.x applications**

For an automatic upgrade, use the [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) on an existing application:

```
yo jhipster:upgrade
```

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

If the issue you have is an urgent bug or security issue, please:

- Contact [@java_hipster](https://twitter.com/java_hipster) on Twitter
