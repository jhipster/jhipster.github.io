---
layout: default
title: Release 3.10.0
---

JHipster release 3.10.0
==================

What's new
----------

Lots of new features and bug fixes in this new release, here are the most important ones:

- Use the new Spring 4.3 composed annotations for cleaner and shorter Spring MVC configuration. This is a great improvement for everyone!  [#4291](https://github.com/jhipster/generator-jhipster/pull/4291)
- Update the CSRF protection mechanism [#4272](https://github.com/jhipster/generator-jhipster/issues/4272)
- Pagination is causing issues when changing the number of items per page [#4347](https://github.com/jhipster/generator-jhipster/issues/4347)
- Add springfox-bean-validators dependency for better Swagger documentation [#4388](https://github.com/jhipster/generator-jhipster/pull/4388)
- Gitignore should have folders and not files [#4387](https://github.com/jhipster/generator-jhipster/issues/4387)
- Add listener to re-add logstash appender when config is reset [#4334](https://github.com/jhipster/generator-jhipster/pull/4334)
- Several improvements in the upgrade sub-generator [#4306](https://github.com/jhipster/generator-jhipster/pull/4306)
- Fix MongoDB running with Cloud Foundry [#4363](https://github.com/jhipster/generator-jhipster/issues/4363)

Closed tickets
------------
As always, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.10.0+is%3Aclosed)__.

How to upgrade
------------

For an automatic upgrade, starting with JHipster v3.4.0, use the [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) on an existing application:

```
yo jhipster:upgrade
```

For a manual upgrade, first upgrade your version of JHipster with:

```
npm update -g generator-jhipster
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

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

If the issue you have is an urgent bug or security issue, please:

- Contact [@java_hipster](https://twitter.com/java_hipster) on Twitter
