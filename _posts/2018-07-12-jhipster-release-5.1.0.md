---
layout: default
title: Release 5.1.0
---

JHipster release v5.1.0
==================

JHipster v5.1.0 comes with 29 closed tickets and pull requests. This is a minor release as it has a couple of important changes:

- Upgrade to JHipster Registry v4.0.0. This is a major release of the Registry, with a simple but very important configuration change, see [jhipster/jhipster-registry#282](https://github.com/jhipster/jhipster-registry/pull/282). This comes from a change in Spring Cloud, that made it impossible to modify the default JWT secret token if you used the `native` profile, which is of course a major issue.
- Fix failing Angular production builds with more than one lazy loading module, see [#7949](https://github.com/jhipster/generator-jhipster/pull/7949).

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.1.0+is%3Aclosed)__.

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
