---
layout: default
title: Release 4.13.2
---

JHipster release 4.13.2
==================

What's new
----------

This patch release was triggered because of this issue, as it affects everyone:

- Tests on AuditsComponent fail with Prod profile [#6937](https://github.com/jhipster/generator-jhipster/issues/6937)

Please note that [we have voted to remove HTTP session clustering with Hazelcast](https://groups.google.com/forum/?hl=en#!topic/jhipster-dev/A6HabUyZRRY), and that since our last release you can easily configure a Spring Cache abstraction, which we believe gives a much better solution to the same problem. So this is probably the last release with that option enabled.

Our React support is moving quickly forward:

- all administration screens are finished
- simple entities are finished (but relationships are not yet available)

As before, you can test our React support by using the `--experimental` flag when running JHipster.

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.13.2+is%3Aclosed)__.

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
