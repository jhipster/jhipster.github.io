---
layout: default
title: Release 0.11.0
---

JHipster release 0.11.0
==================

*JHipster gives you Yeoman + Maven + Spring + AngularJS all working together in one handy generator.*

What's new
----------

This is the most important version we have done, ever. More than one month of work to give you full hot reloading of your Java code.

We do not know of any other solution that goes this far, as we have hot reloading working from the database (the tables are automatically updated) to the JavaScript application!

Hot reload is specifically impressive as you can:

- Add or modify any Spring bean (JHipster handles autowiring, aspects, caching... all automatically!)
- Add or modify Spring Data JPA repositories or Spring MVC REST endpoints
- Add new JPA entities (Hibernate is updated, and we even generate the Liquibase changeset automatically, and update the database accordingly!)

All those are possible thanks to a lot of very complex code that is generated inside your application: in the future, we will probably release this as a separate library.

This version also comes with some less important changes:

- Many improvements on the Metrics page
- All Grunt libraries are now fixed, as we had to many issues with broken JavaScript libraires. This is the same thing we have done with Bower in the previous release
- We have switched from HSQLDB to H2, as it provides a nice Web console, available with the "/console" URL of your application. This allows you to check that hot reload really updated your database!
- Several bugfixes, most noticeably in the Atmosphere code

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

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Contact [@java_hipster](https://twitter.com/java_hipster) on Twitter
- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)
