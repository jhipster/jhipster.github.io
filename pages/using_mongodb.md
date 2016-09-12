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
*   [Mongobee](https://github.com/mongobee/mongobee) is used instead of [Liquibase](http://www.liquibase.org/) to manage database changes
*   The [entity sub-generator]({{ site.url }}/creating-an-entity/) will not ask you for entity relationships, as you can't have relationships with a NoSQL database (at least not in the way you have relationships with JPA)
*   [de.flapdoodle.embed.mongo](https://github.com/flapdoodle-oss/de.flapdoodle.embed.mongo) is used to run an in-memory version of the database for running unit tests.
