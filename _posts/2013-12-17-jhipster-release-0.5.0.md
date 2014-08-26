---
layout: default
title: Release 0.5.0
---

JHipster release 0.5.0
==================

*JHipster gives you Yeoman + Maven + Spring + AngularJS all working together in one handy generator.*

What's new
----------

- The "entity" sub-generator is now in ready to use. A full documentation is available [here](/creating_an_entity.html)
- You can now create a single executable JAR file of the application, for easy deployment. It is documentated in the [production section](/production.html)
- Several bug fixes and minor improvements, and updated documentation

How to upgrade
------------

Update your version of JHipster with:

```
npm update -g generator-jhipster
```

And then you can update your project when you run again

```
yo jhipster
```

As we have changed the Liquibase changeSet, to include the "HIBERNATE_SEQUENCES" table, you might need to drop your existing schema, or add this table manually.

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Contact [@java_hipster](https://twitter.com/java_hipster) on Twitter
- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)
