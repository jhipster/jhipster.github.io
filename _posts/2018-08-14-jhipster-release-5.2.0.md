---
layout: default
title: Release 5.2.0
---

JHipster release v5.2.0
==================

JHipster v5.2.0 comes with 120 closed tickets and pull requests.

Please note that we have launched a [bug bounties program]({{ site.url }}/bug-bounties/) and that several important tickets have been closed thanks to this. At the moment, we have $2,000 on this program thanks to our awesome sponsors, through our [OpenCollective initiative](https://opencollective.com/generator-jhipster).

Here are the most important tickets closed in this release:

- Lots of CI/CD improvements by [@pascalgrimaud](https://twitter.com/pascalgrimaud) - see  [#7904](https://github.com/jhipster/generator-jhipster/issues/7904).
- Upgrade to Yeoman 3 [#7909](https://github.com/jhipster/generator-jhipster/issues/7909).
- Production build fix for React [#8023](https://github.com/jhipster/generator-jhipster/pull/8023).
- Make Angular e2e tests use async/await [#8026](https://github.com/jhipster/generator-jhipster/pull/8026).
- Update spring-boot to 2.0.4, spring-cloud to Finchley.SR1  [#8046](https://github.com/jhipster/generator-jhipster/pull/8046).
- Add admin module tests for Angular [#8048](https://github.com/jhipster/generator-jhipster/pull/8048).
- Update Angular to 6.1 [#8066](https://github.com/jhipster/generator-jhipster/pull/8066).
- Move to Terser plugin instead of UglifyJS [#8069](https://github.com/jhipster/generator-jhipster/pull/8069).

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.2.0+is%3Aclosed)__.

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
