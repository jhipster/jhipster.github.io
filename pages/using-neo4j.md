---
layout: default
title: Using Neo4j
permalink: /using-neo4j/
redirect_from:
  - /using_neo4j.html
sitemap:
    priority: 0.7
    lastmod: 2020-01-18T00:00:00-00:00
---

# <i class="fa fa-database"></i> Using Neo4j [BETA]

[Neo4j](https://neo4j.com/) is one of the supported databases that can be selected when your application is being generated.

When Neo4j is selected:

* [Spring Data Neo4j/RX](https://neo4j.github.io/sdn-rx) will be used to access the database. This is very close to Spring Data JPA, and this is why Neo4j support is very close to the (default) JPA support.
* [Neo4j Migrations](https://github.com/michael-simons/neo4j-migrations) is used instead of [Liquibase](http://www.liquibase.org/) to manage database changes.
* [Neo4j Testcontainers](https://www.testcontainers.org/modules/databases/neo4j/) is used to launch a containerized version of the database for running unit tests.

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
