---
layout: default
title: Release 4.6.0
---

JHipster release 4.6.0
==================

What's new
----------

**Angular 4 is now out of beta**

Our Angular 4 support is now ready for production:

- Our production build works fine, both on the client-side (AOT, tree shaking, etc.) and on the server-side (caching, gzipping, etc.). Our tests show huge improvements compared to our previous BETA releases (which were not suitable for production, that's why they were marked BETA). As a result, this new version is a recommended upgrade for anyone already using Angular 2 or Angular 4 with JHipster.
- Angular 4 is now our default option for JHipster. AngularJS 1 won't disappear soon, but we are not going to improve it in the future, and it will probably slowly die over the next months.
- Our goal is to support React in the future, and we will focus our development effort on this new option. At some point in the future, this means we should have both Angular and React as stable options. Help is highly welcome on that part, so if you are interested, don't hesitate to join the team on GitHub.

**Other important news**

- Upgrade to Gradle 4 (see [#5949](https://github.com/jhipster/generator-jhipster/pull/5949)), which has some excellent performance improvements according to our initial tests.
- Farsi language support (see [#5961](https://github.com/jhipster/generator-jhipster/pull/5961)), which means we do support right-to-left languages!

**Minor improvements**

In total, this release has 72 closed tickets and pull requests, out of which 11 were marked `invalid`. This is an improvement over the past releases, but please if you have a question or a bug, don't spam the development team and follow [our guidelines](https://github.com/jhipster/generator-jhipster/blob/master/CONTRIBUTING.md).

**Deprecation warning (for module developers)**

The JHipster Module sub generator is deprecated. We now recommend using commonJS or ES6 require/import to get `generator-base` in order to use our Public API. See [creating a module]({{ site.url }}/modules/creating-a-module/) page for more details.

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.6.0+is%3Aclosed)__.

How to upgrade
------------

**Automatic upgrade**

WARNING [this has been fixed very recently](https://github.com/jhipster/generator-jhipster/pull/5966), so if you have trouble with this:

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
