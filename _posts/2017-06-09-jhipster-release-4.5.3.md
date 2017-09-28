---
layout: default
title: Release 4.5.3
---

JHipster release 4.5.3
==================

What's new
----------

This is the third patch release for JHipster v4.5.0.

Here are the highlights of this release:

- Upgrade to Spring Boot 1.5.4, released yesterday, which corrects a security vulnerability - see ticket [#5893](https://github.com/jhipster/generator-jhipster/issues/5893)
- Use of Jackson's Afterburner module, which includes some excellent performance enhancements for everyone! Some basic tests show a 5% gain in all applications, and [here is a more complete report](http://technicalrex.com/2015/02/27/performance-playground-jackson-vs-protocol-buffers-part-2) - see commit [01cc743af3f30939d1e9ee13012c865dffd6c46e](https://github.com/jhipster/generator-jhipster/commit/01cc743af3f30939d1e9ee13012c865dffd6c46e)
- Many Angular 4 updates, including Progressive Web App support! - see PR [#5880](https://github.com/jhipster/generator-jhipster/pull/5880) and PR [#5878](https://github.com/jhipster/generator-jhipster/pull/5878)
- Missed update in Elasticsearch after update user via service/UserService.updateUser - see ticket [#5867](https://github.com/jhipster/generator-jhipster/issues/5867)

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.5.3+is%3Aclosed)__.

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
