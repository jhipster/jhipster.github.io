---
layout: default
title: Creating microservices
permalink: /creating-microservices/
sitemap:
    priority: 0.7
    lastmod: 2017-05-03T00:00:00-00:00
---

# <i class="fa fa-bolt"></i> Creating microservices

Microservices are a type of JHipster application, that have no front-end (the Angular front-end must be generated on a [gateway]({{ site.url }}/api-gateway/)), and which work with the [Consul]({{ site.url }}/consul/) to be configured, discovered, and managed.

<h2 id="entities">Entities in a microservices architecture</h2>

The User entity is not generated in a microservice when using JWT or DTO. When OAuth 2.0 is used, there is a mechanism in the microservice to extract user data from the token and save it to the microservice's database. So for JWT and DTO you can not use and/or define a relationship with the User entity because it exists only in the gateway's database.

Relationships between entities from different microservices are not supported.

<h2 id="generating_entities">Generating entities</h2>

For entities in a microfrontend see [Microfrontends](#microfrontends).

Using the [entity sub-generator]({{ site.url }}/creating-an-entity/) works a little bit differently in a microservices architecture, as the front-end and the back-end codes are not located in the same application.

First, generate the entities in the microservice applications: this works as usual, and you can also use [JHipster UML]({{ site.url }}/jhipster-uml/) or [JDL Studio](https://start.jhipster.tech/jdl-studio/) to help you generate complex entities and relationships. As microservices don't have a front-end, no UI code will be generated.

Then, on the gateway(s), run the entity sub-generator again. A new question will appear at the beginning, which is specific to gateways:

- You will have the choice either to generate a new entity normally (a gateway is also a standard JHipster application, so this would work like for a monolith application), or use an existing JHipster configuration from a microservice.
- If you choose to generate the entity from a microservice, you will need to enter the path to this microservice on your local computer, and then JHipster will generate the front-end code on the gateway.

## Microfrontends

Microfrontend support is a work in progress. Implementation is subject to change and varies between frameworks. Refer to [Microfrontend Support](https://github.com/jhipster/generator-jhipster/issues/17031) for the latest status.

JHipster's microfrontends implementation uses [Webpack Module Federaration](https://webpack.js.org/concepts/module-federation/) and allows frontend entities implementation to be located in the microservice instead of in the gateway.

A gateway is still required to be running in development due to the authentication process.

You can find more information about starting microfrontends using gateway or alone in the generated README.

<h2 id="hazelcast">Distributed caching with Hazelcast</h2>

If your application uses an SQL database, JHipster proposes a different 2nd-level caching solution with microservices:

- JHipster's default caching solution with microservices is Hazelcast
- You can still choose Ehcache (the default solution with monolith applications) or Caffeine or choose not to use a cache at all

This solution is the default with microservices, as in this architecture the idea is that you will scale your services:

- with a local cache, your service instances won't have a synchronized cache, resulting in incorrect data
- without any cache, the burden of scaling will be pushed to the database, which won't be very good at it (unless you use our Cassandra option)

Using Hazelcast with microservices will result in a specific configuration:

- At start-up, your application will connect to the Service Registry to find if other instances of the same service are running
- With the `dev` profile, JHipster will create a cluster of those instances on localhost (`127.0.0.1`),  using a different port per instance. By default, the Hazelcast port is `your application's port + 5701` (so if your application's port is `8081`, Hazelcast will use port `13782`)
- With the `prod` profile, JHipster will create a cluster with all the other nodes it finds, using the default Hazelcast port (`5701`)

<h2 id="no_database">Microservices with no database</h2>

Only microservices applications can be created without a database. This is because microservices are small and do not have user-management code.

A microservice without a database is very small, and could be used to connect to a specific back-end like a legacy system.
