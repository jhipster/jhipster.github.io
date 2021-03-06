---
layout: default
title: Using MongoDB
permalink: /using-mongodb/
redirect_from:
  - /using_mongodb.html
sitemap:
    priority: 0.7
    lastmod: 2015-02-24T00:00:00-00:00
---

# <i class="fa fa-leaf"></i> Using MongoDB

MongoDB is one of the supported databases that can be selected when your application is being generated.

When MongoDB is selected:

*   Spring Data MongoDB will be used to access the database. This is very close to Spring Data JPA, and this is why MongoDB support is very close to the (default) JPA support
*   [Mongock](https://www.mongock.io) is used instead of [Liquibase](http://www.liquibase.org/) to manage database changes
*   [de.flapdoodle.embed.mongo](https://github.com/flapdoodle-oss/de.flapdoodle.embed.mongo) is used to run an in-memory version of the database for running unit tests.
