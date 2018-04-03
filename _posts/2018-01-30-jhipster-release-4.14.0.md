---
layout: default
title: Release 4.14.0
---

JHipster release 4.14.0
==================

What's new
----------

The big news is that this is the last 4.x release from the master branch. Starting now, our focus will be JHipster 5, and JHipster 4 will be in maintenance mode: we will do patches if necessary, but the main development work will be on JHipster 5.

For the record, JHipster 5 will focus on Spring Boot 2 and on React. Angular will still be a first-class citizen, but AngularJS will be excluded from the main project (you will still be able to use AngularJS as an external "blueprint", which is a new system that will be published with JHipster 5).

Here are the highlights of this release:

- Upgrade to Spring Security 4.2.4 to fix [CVE-2017-8030](http://spring.io/blog/2018/01/30/cve-2017-8030-spring-security-5-0-1-4-2-4-4-1-5-released) - see [#7059](https://github.com/jhipster/generator-jhipster/issues/7059)
- Migrate to the new HttpClientModule from Angular 4.3 - see [#6281](https://github.com/jhipster/generator-jhipster/issues/6281)
- Upgrade to Angular 5.2 and Bootstrap 4.0.0 - see [#7005](https://github.com/jhipster/generator-jhipster/pull/7005)
- Upgrade to Angular CLI to 1.6.6 - see [#7052](https://github.com/jhipster/generator-jhipster/pull/7052)
- Heroku deployments can now be made directly through Git - see [#7045](https://github.com/jhipster/generator-jhipster/pull/7045)
- React support is still "experimental", so you need to run `jhipster --experimental` to enable React support. This is not complete yet, but we are quickly moving forward, so you can already have a good taste of JHipster 5 here. And if you're a React expert, don't hesitate to contribute!
- Generate i18n mouseover/tooltip help from JDL comments - see [#6797](https://github.com/jhipster/generator-jhipster/issues/6797)

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.14.0+is%3Aclosed)__.

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
