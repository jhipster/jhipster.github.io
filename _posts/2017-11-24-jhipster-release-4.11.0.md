---
layout: default
title: Release 4.11.0
---

JHipster release 4.11.0
==================

What's new
----------

This release features [115 closed tickets and pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.11.0+is%3Aclosed), here are the more important ones:

- [Use jhipster-dependencies BOM](https://github.com/jhipster/generator-jhipster/pull/6509), that should greatly simplifies future application upgrades.
- [Couchbase support](https://github.com/jhipster/generator-jhipster/issues/6086), in addition to our current MongoDB and Cassandra support (and of course MySQL, PostgreSQL, MariaDB, Oracle, SQL Server!).
- [Switch back from Chromium to PhantomJS](https://github.com/jhipster/generator-jhipster/issues/6567) - this is going to impact everyone: if you ever had any issue downloading or running Puppeteer, we've switched back to our old system, which was running faster and smoother. Of course, in the long term, the plan is still to move to Puppeteer.

We also added React support as an "experimental" feature, as we know a lot of people are waiting for it:

- Please note this is **experimental**. Don't expect it to work if you use non-default options, for example.
- To enable experimental features, we have a specific `--experimental` flag: if you run `jhipster --experimental` you will have the new React option when selecting your front-end framework.
- We need help to test and finish this implementation, so don't hesitate to participate!

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.11.0+is%3Aclosed)__.

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
