---
layout: default
title: Release 4.8.1
---

JHipster release 4.8.1
==================

What's new
----------

This is a patch release, which uses JHipster Registry 3.1.2, which was just released to correct a small configuration issue for people using the JHipster Registry in `prod` mode, using Git - see [JHipster Registry #179](https://github.com/jhipster/jhipster-registry/issues/179). If you are not in this case, you don't need to upgrade!

If you are using AngularJS 1, we also [changed the required NodeJS version](https://github.com/jhipster/generator-jhipster/commit/2017a6f74302e1aa21e23fbe99eb7d7ec7897f86). Please note that we still recommend to use an LTS version, as the "stable" version has an history of breaking up JHipster!

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.8.1+is%3Aclosed)__.

How to upgrade
------------

**Automatic upgrade**

WARNING [this has been fixed recently](https://github.com/jhipster/generator-jhipster/pull/5966), so if you have trouble with this:

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
