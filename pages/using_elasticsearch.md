---
layout: default
title: Using Elasticsearch
permalink: /using-elasticsearch/
redirect_from:
  - /using_elasticsearch.html
sitemap:
    priority: 0.7
    lastmod: 2016-11-21T00:00:00-00:00
---

# <i class="fa fa-search"></i> Using Elasticsearch

Elasticsearch is an option that adds seach capabilities on top of your database.

This option has some limitations:

*   It only works with SQL databases. There should not be too much work to add this feature to the Cassandra and MongoDB options, but as Elasticsearch support is new in JHipster, we first focus on our main use case before making it available for everyone.

When the Elasticsearch option is selected:

*   Spring Data Elasticsearch is being used, and is automatically configured by Spring Boot ([here is the documentation](http://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-nosql.html#boot-features-elasticsearch)).
*   By default, we use an embedded Elasticsearch in development, and try to connect to a local cluster in production. This can be configured by the standard Spring Boot properties, in the `application.yml` file.  
    When using the dev profile, the embedded Elasticsearch is configured to store data files under the target folder, a simple `mvn clean` will destroy the persisted indices.
*   The "repository" package has new subpackage, called "search", that holds all ElastiSearch repositories.
*   The "User" entity gets indexed in Elasticsearch, and you can query is using the `/api/_search/users/:query` REST endpoint.
*   When the [entity sub-generator]({{ site.url }}/creating-an-entity/) is used, the generated entity gets automatically indexed by Elasticsearch, and is used in the REST endpoint. Search capabilities are also added to the AngularJS user interface, so you can search your entity in the main CRUD screen.
*   When using dev profile, you can enable http access by adding this configuration in `application-dev.yml` :

```
elasticsearch:
  properties:
      http:
          enabled: true
```
