---
layout: default
title: Release 5.2.1
---

JHipster release v5.2.1
==================

JHipster v5.2.1 has the following 2 important changes:

- Fix OAuth2 authentication for microservices, which was broken in 5.2.0 [#8092](https://github.com/jhipster/generator-jhipster/issues/8092).
- Upgrade to NG Bootstrap 3.0 [#8094](https://github.com/jhipster/generator-jhipster/pull/8094).

It also comes with our new "statistics" code: when asked if you want to send us anonymous statistics, please answer "Yes" so you can help us improve the generator.

We will then deploy our new "statistics" endpoint on [https://start.jhipster.tech/](https://start.jhipster.tech/), and we will publicly provide usage reports. We hope this will help everyone (and not just us) in their technology choices, as we should have usage data from thousands of real-world applications.

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.2.1+is%3Aclosed)__.

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
