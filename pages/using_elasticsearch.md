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

*   It only works with SQL databases and MongoDB. Cassandra and Couchbase support will be added in the future (help is welcome!).
*   There is no consistency between your database and Elasticsearch, so you might have out-of-sync data. This is normal, as Elasticsearch is not a real database. As a result, you will probably need to write some specific code to synchronize your data, for example using the Spring `@Scheduled` annotation, to run every evening.
    *   This also means if your database is changed outside of your application, your search indexes will be out-of-sync.  The [Elasticsearch Reindexer](https://www.jhipster.tech/modules/marketplace/#/details/generator-jhipster-elasticsearch-reindexer) JHipster module can help in these situations.

When the Elasticsearch option is selected:

*   Spring Data Elasticsearch is used, with the help of [Spring Data Jest](https://github.com/VanRoy/spring-data-jest). Spring Data Jest which allows communication with Elasticsearch's REST API. It disables Spring Boot's autoconfiguration and uses its own instead.
*   The "repository" package has new subpackage, called "search", that holds all ElastiSearch repositories.
*   The "User" entity gets indexed in Elasticsearch, and you can query is using the `/api/_search/users/:query` REST endpoint.
*   When the [entity sub-generator]({{ site.url }}/creating-an-entity/) is used, the generated entity gets automatically indexed by Elasticsearch, and is used in the REST endpoint. Search capabilities are also added to the Angular/React user interface, so you can search your entity in the main CRUD screen.

### Using in Development

In development, JHipster runs with an embedded Elasticsearch instance. You can also use an external Elasticsearch instance if you set a `SPRING_DATA_JEST_URI` environment variable (or add a `spring.data.jest.uri` property to your `application-dev.yml`). 

The easiest way to run an external Elasticsearch instance is to use the provided Docker Compose configuration:

    docker-compose -f src/main/docker/elasticsearch.yml up -d
    
Then set an environment variable to point to it:

    export SPRING_DATA_JEST_URI=http://localhost:9200

### Using in Production

In production, JHipster expects an external Elasticsearch instance. By default, the application looks for an Elasticsearch instance running on localhost. This can be configured by using the standard Spring Boot properties, in the `application-prod.yml` file.

### Using on Heroku

On Heroku, the [Bonsai Elasticsearch](https://elements.heroku.com/addons/bonsai) is configured as an add-on. JHipster is automatically configured to talk to it. 
