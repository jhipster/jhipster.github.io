---
layout: default
title: Using Couchbase
permalink: /using-couchbase/
redirect_from:
  - /using_couchbase.html
sitemap:
    priority: 0.7
    lastmod: 2015-02-24T00:00:00-00:00
---

# <i class="fa fa-database"></i> Using Couchbase

Couchbase is one of the supported databases that can be selected when your application is being generated.

When Couchbase is selected:

*   Spring Data Couchbase will be used to access the database. This is very close to Spring Data JPA, and this is why Couchbase support is very close to the (default) JPA support
*   [Couchmove](https://github.com/differentway/couchmove) is used instead of [Liquibase](http://www.liquibase.org/) to manage database changes
*   The [entity sub-generator]({{ site.url }}/creating-an-entity/) will not ask you for entity relationships, as you can't have relationships with a NoSQL database (at least not in the way you have relationships with JPA)
*   [Couchbase TestContainers](https://github.com/differentway/testcontainers-java-module-couchbase) is used to launch a containerized version of the database for running unit tests.

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
