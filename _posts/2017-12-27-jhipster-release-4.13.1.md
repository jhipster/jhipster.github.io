---
layout: default
title: Release 4.13.1
---

JHipster release 4.13.1
==================

What's new
----------

This is an emergency patch release to fix the [broken 'prod' profile build](https://github.com/jhipster/generator-jhipster/issues/6910) using Angular.

Please note that:

- This bug also affects both Angular ([here is the ticket](https://github.com/angular/angular/issues/21173)) and Angular CLI ([here is the ticket](https://github.com/angular/angular-cli/issues/8997)). So JHipster users are lucky as we solved this quicker than both Angular and Angular CLI, and provide the only working Angular "prod" build at the moment :-)
- This bug comes from uglify-es, which is a transitive dependency pulled by uglifyjs-webpack-plugin. This is why our [Policy 4](https://www.jhipster.tech/policies/) is to fix dependencies, but we can't force our dependencies to do the same. Of course we did a [Pull Request to the uglifyjs-webpack-plugin project](https://github.com/webpack-contrib/uglifyjs-webpack-plugin/pull/199) to solve this on their side, but they haven't merged it yet.

Many thanks to [@pascalgrimaud](https://twitter.com/pascalgrimaud) who found the bug, and corrected it!

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.13.1+is%3Aclosed)__.

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
