---
layout: default
title: Release 5.0.2
---

JHipster release v5.0.2
==================

This is the second patch release of JHipster 5.

It includes [81 closed tickets and pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.0.2+is%3Aclosed), here are the most important ones:

- Blueprint support has been greatly enhanced, and most importantly documented on the new ["Creating a blueprint" page]({{ site.url }}/modules/creating-a-blueprint/).
- Lazy-loading is now working in React thanks to [#7541](https://github.com/jhipster/generator-jhipster/pull/7541).
- Upgrades to the latest [JHipster dependencies](https://github.com/jhipster/jhipster) (including upgrades to several Java libraries in [jhipster/jhipster#80](https://github.com/jhipster/jhipster/pull/80)), to the latest [ng-jhipster](https://github.com/jhipster/generator-jhipster/pull/7920), and to Node and NPM in [#7922](https://github.com/jhipster/generator-jhipster/pull/7922).

If you are using JHipster in development mode (to [contribute to the project](https://github.com/jhipster/generator-jhipster/blob/master/CONTRIBUTING.md)) please note that `yarn link` is currently [broken](https://github.com/jhipster/generator-jhipster/issues/7919). This is an issue with Yarn 1.6.0 and 17.0 (at least!), and it is currently solved if you use the Yarn nightly builds - we hope the Yarn team will do a release soon!

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.0.2+is%3Aclosed)__.

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
