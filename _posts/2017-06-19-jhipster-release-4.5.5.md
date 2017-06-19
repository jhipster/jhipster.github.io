---
layout: default
title: Release 4.5.5
---

JHipster release 4.5.5
==================

What's new
----------

This is the fifth patch release for JHipster v4.5.0.

This release corrects a security issue in the JHipster Registry (see [jhipster/jhipster-registry #150](https://github.com/jhipster/jhipster-registry/issues/150)), and is a recommended upgrade for people using it.

Other noteworthy changes several updates in our Angular 4 code, as we move forward to release it out of beta - see [#5907](https://github.com/jhipster/generator-jhipster/pull/5907) [#5926](https://github.com/jhipster/generator-jhipster/pull/5926) [#5932](https://github.com/jhipster/generator-jhipster/pull/5932).

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.5.5+is%3Aclosed)__.

How to upgrade
------------

**Automatic upgrade**

WARNING we have many reports that automatic upgrade do not work well, see [#5883](https://github.com/jhipster/generator-jhipster/issues/5883). This depends on your specific configuration, so if you have trouble with this:

- You can still do a "manual upgrade" (see below)
- If you find anything helpful for us, please send us comments on ticket [#5883](https://github.com/jhipster/generator-jhipster/issues/5883)
- If you have time and want to help, don't hesitate to contribute on this part!

For an automatic upgrade, use the [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) on an existing application:

```
yo jhipster:upgrade
```

Please note that with our new JHipster CLI release, the new command will be:

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
