---
layout: default
title: Release 5.6.0
---

JHipster release v5.6.0
==================

This minor release comes with 132 closed tickets and pull requests, here are the most important ones:

- Upgrade to Typescript 3 in [#8149](https://github.com/jhipster/generator-jhipster/issues/8149)
- Upgrade to Angular 7 in [#8161](https://github.com/jhipster/generator-jhipster/pull/8161)
- All dates managed with Hibernate are now using UTC in [#8501](https://github.com/jhipster/generator-jhipster/pull/8501)
- Many dependencies upgrades and clean-ups, including Spring Boot 2.0.6 in [#8591](https://github.com/jhipster/generator-jhipster/pull/8591) and Node 10 in [#8682](https://github.com/jhipster/generator-jhipster/issues/)
- Many improvements for Google App Engine in [#8616](https://github.com/jhipster/generator-jhipster/pull/8616)

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.6.0+is%3Aclosed)__.

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
