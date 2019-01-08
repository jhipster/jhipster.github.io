---
layout: default
title: Release 4.0.4
---

JHipster release 4.0.4
==================

What's new
----------

This is the fourth patch release for JHipster 4.0.0, with 54 bug fixes and tickets closed.

There are 2 important changes to notice:

- We now have HTTP/2 support thanks to top hipster [Matt Raible](https://twitter.com/mraible). Configuration is available in the `application-*.yml` files, with a new JHipsterProperties entry.
- For Angular 2+ users, we used to have a `jhiHasAuthority` and a `jhiHasAnyAuthority` directives, which basically did the same thing, so now only the `jhiHasAnyAuthority` directive is available.

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.0.4+is%3Aclosed)__.

How to upgrade
------------

**Manual upgrades (works for JHipster 4.x applications)**

For a manual upgrade, first upgrade your version of JHipster with:

```
yarn global upgrade generator-jhipster
```

If you have an existing project, it will still use the JHipster version with which it was generated.
To upgrade your project, you must first delete its `node_modules` folder and then run:

```
yo jhipster
```

You can also update your project and all its entities by running

```
yo jhipster --with-entities
```

You can also update your entities one-by-one by running again the entity sub-generator, for example if your entity is named _Foo_

```
yo jhipster:entity Foo
```

**Automatic upgrade only works for JHipster 3.x applications**

For an automatic upgrade, use the [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) on an existing application:

```
yo jhipster:upgrade
```

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

If the issue you have is an urgent bug or security issue, please:

- Contact [@java_hipster](https://twitter.com/java_hipster) on Twitter
