---
layout: default
title: Release 4.5.6
---

JHipster release 4.5.6
==================

What's new
----------

This is the sixth patch release for JHipster v4.5.0.

This patch release that was triggered by [this comment](https://github.com/jhipster/generator-jhipster/commit/bdc77898d184c2ad9a1b1d4acc8acf40aadc0431#commitcomment-22724306), as the previous release had an issue for all MongoDB and Cassandra entities, which made the Angular 4 code fail to compile (if you are on 4.5.5, don't worry and look at the comment, this is really a trivial fix).

This release also comes with some really awesome new features:

- After months of being stuck, our [Upgrade sub-generator is fixed!](https://github.com/jhipster/generator-jhipster/pull/5966). Many thanks to [Tien Tran](https://github.com/tientq) who fixed this! Of course there are many use cases when upgrading, and this is still very new, so feedback is **highly welcome**.
- Infinispan support for both Hibernate 2nd-level cache and Spring Cache abstraction - see [#5874](https://github.com/jhipster/generator-jhipster/issues/5874) - many thanks to [@srinivasavasu](https://twitter.com/srinivasavasu) from Red Hat! This is still in **BETA** and should be more tested, but you can already try it and send us your feedback.

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.5.6+is%3Aclosed)__.

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
