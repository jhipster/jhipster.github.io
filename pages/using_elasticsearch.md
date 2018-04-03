---
layout: default
title: Using Elasticsearch
permalink: /using-elasticsearch/
redirect_from:
  - /using_elasticsearch.html
sitemap:
    priority: 0.7
    lastmod: 2017-04-16T00:00:00-00:00
---

# <i class="fa fa-search"></i> Using Elasticsearch

Elasticsearch is an option that adds search capabilities on top of your database.

This option has some limitations:

*   It only works with SQL databases. MongoDB, Cassandra and Couchbase support will be added in the future (help is welcome!).
*   There is no consistency between your database and Elasticsearch, so you might have out-of-sync data. This is normal, as Elasticsearch is not a real database. As a result, you will probably need to write some specific code to synchronize your data, for example using the Spring `@Scheduled` annotation, to run every evening.
    *   This also means if your database is changed outside of your application, your search indexes will be out-of-sync.  The [Elasticsearch Reindexer](https://www.jhipster.tech/modules/marketplace/#/details/generator-jhipster-elasticsearch-reindexer) JHipster module can help in these situations.

When the Elasticsearch option is selected:

*   Spring Data Elasticsearch is being used, and is automatically configured by Spring Boot ([here is the documentation](http://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-nosql.html#boot-features-elasticsearch)).
*   The "repository" package has new subpackage, called "search", that holds all ElastiSearch repositories.
*   The "User" entity gets indexed in Elasticsearch, and you can query is using the `/api/_search/users/:query` REST endpoint.
*   When the [entity sub-generator]({{ site.url }}/creating-an-entity/) is used, the generated entity gets automatically indexed by Elasticsearch, and is used in the REST endpoint. Search capabilities are also added to the Angular/React user interface, so you can search your entity in the main CRUD screen.

### Using in Development

In development, JHipster uses an embedded Elasticsearch cluster.  The embedded instance is configured to store data files under the target folder, a simple `./mvn clean` will destroy the persisted indices.  You will need to re-index your data if this happens.

You can enable HTTP access by adding this configuration in `application-dev.yml` :

```
elasticsearch:
  properties:
      http:
          enabled: true
```

### Using in Production

In production, JHipster expects an external Elasticsearch instance. By default, the application looks for an Elasticsearch instance running on localhost. This can be configured by using the standard Spring Boot properties, in the `application-prod.yml` file.
