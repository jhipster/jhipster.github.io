---
layout: default
title: Using Elasticsearch
permalink: /using-elasticsearch/
redirect_from:
  - /using_elasticsearch.html
sitemap:
    priority: 0.7
    lastmod: 2023-07-12T00:00:00-00:00
---

# <i class="fa fa-search"></i> Using Elasticsearch

Elasticsearch is an option that adds search capabilities on top of your database.

This option has some limitations:

*   It only works with SQL databases and MongoDB. Cassandra and Couchbase support will be added in the future (help is welcome!).
*   There is no automatic replication mechanism between your database and Elasticsearch, so you might have out-of-sync data. As a result, you will probably need to write some specific code to synchronize your data, for example using the Spring `@Scheduled` annotation, to run every evening.
    *   This also means if your database is changed outside of your application, your search indexes will be out-of-sync. The [Elasticsearch Reindexer](https://www.jhipster.tech/modules/marketplace/#/details/generator-jhipster-elasticsearch-reindexer) JHipster module can help in these situations.

When the Elasticsearch option is selected:

*   Spring Data Elasticsearch is used with Spring Boot's autoconfiguration. It can be configured using `spring.elasticsearch.*` configuration properties.
*   The "repository" package has a new subpackage, called "search", that holds all Elasticsearch repositories.
*   The "User" entity gets indexed in Elasticsearch, and you can query it using the `/api/_search/users/:query` REST endpoint.
*   When the [entity sub-generator]({{ site.url }}/creating-an-entity/) is used, the generated entity gets automatically indexed by Elasticsearch, and is used in the REST endpoint. Search capabilities are also added to the UI, so you can search your entity in the main CRUD screen.

### Using in Development

In development, JHipster runs with an embedded Elasticsearch instance. You can also use an external Elasticsearch instance if you set a `SPRING_DATA_URIS` environment variable (or add a `spring.elasticsearch.uris` property to your `application-dev.yml`).

The easiest way to run an external Elasticsearch instance is to use the provided Docker Compose configuration:

    docker-compose -f src/main/docker/elasticsearch.yml up -d

Then set an environment variable to point to it:

    export SPRING_DATA_URIS=http://localhost:9200

### Using in Production

In production, JHipster expects an external Elasticsearch instance. By default, the application looks for an Elasticsearch instance running on localhost. This can be configured by using the standard Spring Boot properties, in the `application-prod.yml` file.

### Using on Heroku

On Heroku, the [Bonsai Elasticsearch](https://elements.heroku.com/addons/bonsai) is configured as an add-on. JHipster is automatically configured to talk to it. 

Unfortunately, as of JHipster 7.9.3, Elasticsearch [doesn't work out of the box with Heroku](https://github.com/jhipster/generator-jhipster/issues/20315). To solve this, you can create a Docker image with Elasticsearch and deploy it to somewhere that can run it, or you can use Elastic Cloud. We don't automatically configure the [Elasticsearch Add-on](https://elements.heroku.com/addons/foundelasticsearch) because its cheapest plan is 67 USD/month and that seems a little expensive.

### Using Elastic Cloud

You can [start a free trial](https://cloud.elastic.co/registration) on Elastic Cloud. After logging in, create a deployment. Use the default settings, select **7.17.7** as the version, and press **Create deployment**.

**WARNING**: Using the latest version will result in an "Unable to parse response body" error.

Download your credentials from the next screen and click **Continue**. Then, select **Manage this deployment** from the menu and copy the Elasticsearch endpoint. 

Set the credentials and endpoint URL as a new `ELASTIC_URL` environment variable on Heroku.

```shell
heroku config:set ELASTIC_URL=https://elastic:<password>@<endpoint-url>
```

Then, modify `heroku.gradle` to remove the workaround for Bonsai (that no longer works) and update `application-heroku.yml` to use `ELASTIC_URL`:

```yaml
spring:
  ...
  elasticsearch:
    uris: ${ELASTIC_URL}
```

Redeploy your application to Heroku and everything should work as expected.
