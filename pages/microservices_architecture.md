---
layout: default
title: Doing microservices with JHipster
permalink: /microservices-architecture/
sitemap:
    priority: 0.7
    lastmod: 2016-03-10T00:00:00-00:00
---

# <i class="fa fa-sitemap"></i> Doing microservices with JHipster

## Summary

1. [Microservices vs Monolithic architecture](#microservices_vs_monolithic)
2. [Overview](#overview)
3. [The JHipster API gateway](#gateway)
  * [HTTP routing](#http_routing)
  * [Security](#security)
  * [Automatic documentation](#documentation)
  * [Rate limiting](#rate_limiting)
  * [Access control policy](#acl)
4. [The JHipster Registry](#registry)
  * [JHipster Registry overview](#registry_overview)
  * [Securing the JHipster Registry](#securing_registry)
  * [Application configuration with the JHipster Registry](#registry_app_configuration)
5. [Creating microservices](#microservices)
  * [Generating entities](#generating_entities)
  * [Distributed caching with HazelCast](#hazelcast)
  * [Microservices with no database](#no_database)
6. [Using Docker Compose](#docker_compose)
7. [Monitoring with JHipster Console and the ELK stack](#monitoring)
8. [Production](#production)
  * [Going to production with Docker Swarm](#docker_swarm)
  * [Going to production with CloudFoundry](#cloudfoundry)
  * [Going to production with Heroku](#heroku)

## <a name="microservices_vs_monolithic"></a> Microservices vs Monolithic architecture

The first question JHipster will ask you is the kind of application you want to generate. You have in fact the choice between two architecture styles:

- A "monolithic" architecture uses a single, one-size-fits-all application, which contains both the front-end AngularJS code, and the back-end Spring Boot code.
- A "microservices" architecture splits the front-end and the back-end, so that it's easier for your application to scale and survive infrastructure issues.

A "monolithic" application is much easier to work on, so if you don't have any specific requirements, this is the option we recommend, and our default option.

_The rest of this guide is only for people interested in doing a microservices architecture._

## <a name="overview"></a> Overview

The JHipster microservices architecture works in the following way:

 * A [gateway](#gateway) is a JHipster-generated application (using application type `microservice gateway` when you generate it) that handles Web traffic, and serves an AngularJS application. There can be several different gateways, if you want to follow the [Backends for Frontends pattern](https://www.thoughtworks.com/insights/blog/bff-soundcloud), but that's not mandatory.
 * The [JHipster Registry](#registry) is a runtime application, using the usual JHipster structure, on which all applications registers and get their configuration from.
 * Microservices are JHipster-generated applications (using application type `microservice application` when you generate them), that handle REST requests. They are stateless, and several instances of them can be launched in parallel to handle heavy loads.
 * The [JHipster Console](https://github.com/jhipster/jhipster-console) is a monitoring & alerting console, based on the ELK stack.

In the diagram below, the green components are specific to your application and the blue components provide its underlying infrastructure.

![Diagram]({{ site.url }}/images/microservices_architecture_1.png)

## <a name="gateway"></a> The JHipster API gateway

JHipster allows use to generate an API gateway. This gateway is a normal JHipster application, so you can use the usual JHipster options and development workflows on that project, but it also acts as the entrance to your microservices. More specifically, it provides HTTP routing and load balancing, quality of service, security and API documentation for all microservices.

### <a name="http_routing"></a> HTTP requests routing using the gateway

When the gateways and the microservices are launched, they will register themselves in the registry (using the `eureka.client.serviceUrl.defaultZone` key in the `src/main/resources/config/application.yml` file).

The gateway will automatically proxy all requests to the microservices, using their application name: for example, when microservices `app1` is registered, it is available on the gateway on the `/app1` URL.

For example, if your gateway is running on `localhost:8080`, you could point to [http://localhost:8080/app1/rest/foos](http://localhost:8080/app1/rest/foos) to
get the `foos` resource served by microservice `app1`. If you're trying to do this with your Web browser, don't forget REST resources are secured by default in JHipster, so you need to send the correct JWT header (see the point on security below), or remove the security on those URLs in the microservice's `MicroserviceSecurityConfiguration` class.

If there are several instances of the same service running, the gateway will get those instances from the JHipster Registry, and will:

- Load balance HTTP requests using [Netflix Ribbon](https://github.com/Netflix/ribbon).
- Provide a circuit breaker using [Netflix Hystrix](https://github.com/Netflix/hystrix), so that failed instances are quickly and safely removed.

Each gateway as a specific "admin > gateway" menu, where opened HTTP routes and microservices instances can be monitored.

### <a name="security"></a> Security

#### JWT (JSON Web Token)

JWT (JSON Web Token) is an industry standard, easy-to-use method for securing applications in a microservices architecture.

JHispter uses the [JJWT library](https://github.com/jwtk/jjwt), provided by Stormpath, for implementing JWT.

Tokens are generated by the gateway, and sent to the underlying microservices: as they share a common secret key, microservices are able to validate the token, and authenticate users using that token.

Those tokens are self-sufficient: they have both authentication and authorization information, so microservices do not need to query a database or an external system. This is important in order to ensure a scalable architecture.

For security to work, a JWT secret token must be shared between all applications.

- For each application the default token is unique, and generated by JHipster. It is stored in the `.yo-rc.json` file.
- Tokens are configured with the `jhipster.security.authentication.jwt.secret` key in the `src/main/resources/config/application.yml` file.
- To share this key between all your applications, copy the key from your gateway to all the microservices, or share it using the JHipster Registry's Spring Config Server.
- A good practice is to have a different key in development and production.

#### OAuth2

This feature is currently in **BETA** and thus its documentation is not yet complete.

JHipster provides the option to generate a "UAA" (User Account and Authentication) server, based on Spring Security. This server provides OAuth2 tokens for securing the gateway.

Then, the gateway uses Spring Security's JWT implementation to send JWT tokens to the microservices.

### <a name="documentation"></a> Automatic documentation

The gateway exposes the Swagger API definitions of the services it proxifies so you can benefit from all useful tools like Swagger UI and swagger-codegen.

The "admin > API" menu of a gateway has a specific drop-down list, showing the gateway's API and all the APIs from the registered microservices.

Using this drop-down list, all microservices APIs are automatically documented, and testable from the gateway.

When using a secured API, security tokens are automatically added to the Swagger UI interface, so all requests work out-of-the-box.

### <a name="rate_limiting"></a> Rate limiting

This is an advanced feature that requires setting up a Cassandra cluster (which is easy to do with the provided Docker Compose configuration).

Gateways provide rate-limiting features, so the number of REST requests can be limited:

- by IP address (for anonymous users)
- by user login (for logged-in users)

JHipster will then use a Cassandra cluster to store request counts, and will send HTTP 429 (too many requests) errors when the limit is exceeded. The default limit per user is 100,000 API calls per hour.

This is an important feature, to protect a microservice architecture from being flooded by a specific user's requests.

As the gateway secures the REST endpoints, it has full access to the user's security information, so it can be easily extended to provide specific rate limits depending on the user's security roles.

To enable rate limiting, open up the `application-dev.yml` or `application-prod.yml` file and set `enabled` to `true`:

    jhipster:
        gateway:
            rate-limiting:
                enabled: true

The Cassandra cluster needs to be set up and configured. If you use JHipster's Docker Compose configuration (available in `src/main/docker`), this should all work automatically, but here are the detailed steps if you want to set up your cluster manually:

- A working Cassandra cluster should be available.
- A schema with the JHipster rate-limiting tables must be configured, using the `create_keyspace.cql` and `create_tables.cql` scripts from the `src/main/resources/config/cql` directory
- That cluster must configured in the `application-*.yml` files, using the `spring.data.cassandra` keys (a default configuration is already generated)

If you want to add more rules, or modify the existing rules, you need to code them in the `RateLimitingFilter` class. Examples of modifications could be:

- Lowering the limit of HTTP calls
- Adding limits per minute or per day
- Removing all limits for "admin" users

### <a name="acl"></a> Access control policy

By default all registered microservices are available through the gateway. If you want to exclude a specific API from being exposed through the gateway, you can use the gateway's specific access control policy filter. It is configurable using the `jhipster.gateway.authorized-microservices-endpoints` key in the `application-*.yml` files:

    jhipster:
        gateway:
            authorized-microservices-endpoints: # Access Control Policy, if left empty for a route, all endpoints will be accessible
                app1: /api,/v2/api-docs # recommended dev configuration

For example, if you only want the `/api/foo` endpoint of microservice `bar` to be available:

    jhipster:
        gateway:
            authorized-microservices-endpoints:
                bar: /api/foo

## <a name="registry"></a> The JHipster Registry

### <a name="registry_overview"></a> JHipster Registry overview

The JHipster Registry is a runtime application, provided by the JHipster team. Like the JHipster generator, it is an Open Source, Apache 2-licensed application, and its source code is available on GitHub under the JHipster organization at [jhipster/jhipster-registry](https://github.com/jhipster/jhipster-registry).

The JHipster Registry can be cloned/forked/downloaded directly from [jhipster/jhipster-registry](https://github.com/jhipster/jhipster-registry), and we recommend you use the same version tag as the one you use for your JHipster generator. As the JHipster Registry is also a JHipster-generated application, you can run it like any other JHipster application:

- run it with `./mvnw` in development, it will use by default the `dev` profile and the Eureka Registry will be available at [http://127.0.0.1:8761/](http://127.0.0.1:8761/).
- use `./mvnw -Pprod package` to package it in production, and generate the usual JHipster executable WAR file.

If you'd rather run the JHipster Registry from a Docker image, it is available an Docker Hub at [jhipster/jhipster-registry](https://hub.docker.com/r/jhipster/jhipster-registry/). This image is already pre-configured in the Docker configuration that is provided with each microservice application:

- run `docker-compose -f src/main/docker/jhipster-registry.yml up` to start the JHipster Registry. The Eureka Registry will be available on port `8761` of your Docker host, so if it runs on your machine it should be at [http://127.0.0.1:8761/](http://127.0.0.1:8761/).

Please read our [Docker Compose documentation]({{ site.url }}/docker-compose/) for more information on using the JHipster Registry with Docker Compose.

### <a name="securing_registry"></a> Securing the JHipster Registry

The JHipster Registry is secured by default. You can login using the usual "admin/admin" login and password that are used in normal JHipster applications.

Applications also connect to the JHipster Registry using that same "admin" user, but use HTTP Basic authentication. So if your microservices cannot access the registry, and you see some "401 authentication error" messages, it is because you have misconfigured those applications.

In order to secure your JHipster Registry:

- You must change the default "admin" password. This password is set using the standard Spring Boot property `security.user.password`, so you can use the usual Spring Boot mechanisms to modify it: you could modify the project's `application-*.yml` files, or add a `SECURITY_USER_PASSWORD` environment variable. The [Docker Compose sub-generator]({{ site.url }}/docker-compose/) uses the environment variable method.
- As your applications will connect to the registry using HTTP, it is very important to secure that connection channel. There are many ways to do it, and the easiest one is probably to use HTTPS.

### <a name="registry_app_configuration"></a> Application configuration with the JHipster Registry

The JHipster Registry is a [Netflix Eureka server](https://github.com/Netflix/eureka) and also a [Spring Config Server](http://cloud.spring.io/spring-cloud-config/spring-cloud-config.html): when applications are launched they will first connect to the JHipster Registry to get their configuration. This is true for both gateways and microservices.

This configuration is a Spring Boot configuration, like the one found in the JHipster `application-*.yml` files, but it is stored in a central server, so it is easier to manage.

On startup, your gateways and microservices app will query the Registry's config server and overwrite their local properties with the ones defined there.

Two kinds of configurations sources are available:

- A `native` configuration, which is used by default in development (using the JHipster `dev` profile), and which uses the local filesystem.
- A `Git` configuration, which is used by default in production (using the JHipster `prod` profile), and which stores the configuration in a Git server. This allows to tag, branch or rollback configurations using the usual Git tools, which are very powerful in this use-case.

To manage your centralized configuration you just need to add `appname-profile.yml` files in your configuration source where **appname** and **profile** correspond to the application's name and current profile of the service that you want to configure.
For example, adding properties in a `gateway-prod.yml` file will set those properties only for the application named **gateway** started with a **prod** profile. Moreover, properties defined in `application[-dev|prod].yml` will be set for all your applications.

As the Gateway routes are configured using Spring Boot, they can also be managed using the Spring Config Server, for example you could map application `app1-v1` to the `/app1` URL in your `v1` branch, and map application `app1-v2` to the `/app1` URL in your `v2` branch. This is a good way of upgrading microservices without any downtime for end-users.

## <a name="microservices"></a> Creating microservices

Microservices are a type of JHipster applications, that have no front-end (the AngularJS front-end must be generated on a gateway), and which work with the JHipster Registry to be configured and discovered.

### <a name="generating_entities"></a> Generating entities in a microservices architecture

Using the [entity sub-generator]({{ site.url }}/creating-an-entity/) works a little bit differently in a microservices architecture, as the front-end and the back-end codes are not located in the same application.

First, generate the entities in the microservices applications: this works as usual, and you can also use [JHipster UML]({{ site.url }}/jhipster-uml/) or [JDL Studio]({{ site.url }}/jdl-studio/) to help you generate complex entities and relationships. As microservices don't have a front-end, no AngularJS code will be generated.

Then, on the gateway(s), run the entity sub-generator again. A new question will appear at the beginning, which is specific to gateways:

- You will have the choice either to generate an new entity normally (a gateway is also a standard JHipster application, so this would work like for a monolith application), or use an existing JHipster configuration from a microservice.
- If you choose to generate the entity from a microservice, you will need to enter the path to this microservice on your local computer, and then JHipster will generate the front-end code on the gateway.

### <a name="hazelcast"></a> Distributed caching with Hazelcast

If your application uses an SQL database, JHipster proposes a different 2nd-level caching solution with microservices:

- JHipster's default caching solution with microservices is Hazelcast
- You can still choose Ehcache (the default solution with monolith applications) or choose not to use a cache at all

This solution is the default with microservices, as in this architecture the idea is that you will scale your services:

- with a local cache, your service instances won't have a synchronized cache, resulting in incorrect data
- without any cache, the burden of scaling will be pushed to the database, which won't be very good at it (unless you use our Cassandra option)

Using Hazelcast with microservices will result in a specific configuration:

- At start-up, your application will connect to the JHipster Registry to find if other instances of the same service are running
- With the `dev` profile, JHipster will create a cluster of those instances on localhost (`127.0.0.1`),  using a different port per instance. By default, the Hazelcast port is `your application's port + 5701` (so if your application's port is `8081`, Hazelcast will use port `13782`)
- With the `prod` profile, JHipster will create a cluster with all the other nodes it finds, using the default Hazelcast port (`5701`)

### <a name="no_database"></a> Microservices with no database

Only microservices applications can be created without a database. This is because microservices are small and do not have user-management code.

A microservice without a database is very small, and could be used to connect to a specific back-end like a legacy system.

## <a name="docker_compose"></a> Using Docker Compose to develop and deploy

Working on a microservices architecture means you will need several different services and databases working together, and in that context Docker Compose is a great tool to manage your development, testing and production environments.

A specific section on microservices is included in our [Docker Compose documentation]({{ site.url }}/docker-compose#microservices), and we highly recommend that you get familiar with it when working on a microservices architecture.

## <a name="monitoring"></a> Monitoring with JHipster Console and the ELK stack

When using the Docker-Compose sub-generator, you will be asked if you want to add monitoring to your infrastructure. This option, will add the JHipster-Console to your `docker-compose.yml` file. Once started, it will be available on [http://localhost:5601](http://localhost:5601) and start to gather your applications' logs and metrics. For instructions on how to set up monitoring for your applications please refer to the [monitoring documentation]({{ site.url }}/monitoring).

Compared with monolithic applications, gateways and microservices monitoring configuration provide additional features to help you effectively monitor a microservices cluster. For example logs are enriched with each application's name, host, port and Eureka ServiceId so that you can trace from which service they are originating from. Moreover the JHipster Console comes with default dashboards that give you a view of all your services at the same time.

## <a name="production"></a> Production

### <a name="docker_swarm"></a> Going to production with Docker Swarm

As Docker Swarm uses the same API as Docker Machine, deploying your microservices architecture in the cloud is exactly the same as deploying it on your local machine. Follow our [Docker Compose documentation]({{ site.url }}/docker-compose/) to learn more about using Docker Compose with JHipster.

### <a name="cloudfoundry"></a> Going to production with CloudFoundry

The [CloudFoundry sub-generator]({{ site.url }}/cloudfoundry/) works the same with a microservices architecture, the main difference is that you have more applications to deploy:

- Use the sub-generator to deploy first the JHipster Registry (which is a normal JHipster application).
- Note the URL on which your JHipster Registry is deployed. Your applications must all point to that URL:
  - In the `bootstrap-prod.yml` file, the `spring.cloud.config.uri` must point to `http://<your_jhipster_registry_url>/config/`
  - In the `application-prod.yml` file, the `eureka.client.serviceUrl.defaultZone` must point to `http://<your_jhipster_registry_url>/eureka/`
- Deploy your gateway(s) and microservices
- Scale your applications as usual with Cloud Foundry

One important point to remember is that the JHipster Registry isn't secured by default, and that the microservices are not supposed to be accessible from the outside world, as users are supposed to use the gateway(s) to access your application.

Two solutions are available to solve this issue:

- Secure your Cloud Foundry using specific routes.
- Keep everything public, but use HTTPS everywhere, and secure your JHipster Registry using Spring Security's basic authentication support

### <a name="heroku"></a> Going to production with Heroku

The [Heroku sub-generator]({{ site.url }}/heroku/) works nearly the same with a microservices architecture, the main difference is that you have more applications to deploy:

Deploy a JHipster Registry directly with one click:

[![Deploy to Heroku](https://camo.githubusercontent.com/c0824806f5221ebb7d25e559568582dd39dd1170/68747470733a2f2f7777772e6865726f6b7563646e2e636f6d2f6465706c6f792f627574746f6e2e706e67)](https://dashboard.heroku.com/new?&template=https%3A%2F%2Fgithub.com%2Fjhipster%2Fjhipster-registry)

Please follow the [Heroku sub-generator documentation]({{ site.url }}/heroku/) in order to understand how to secure your JHipster Registry.

Note the URL on which your JHipster Registry is deployed. Your applications must all point to that URL in their `application-prod.yml` file. Change that configuration to be:

    eureka:
        instance:
            hostname: <your_jhipster_registry_url>.herokuapp.com
            non-secure-port: 80
            prefer-ip-address: false

You can now deploy and scale the gateway(s) and microservices. The Heroku sub-generator will ask you a new question, to know the URL of your JHipster Registry: this will allow your applications to fetch their configuration on the Spring Cloud Config server.

**Warning** The above configuration uses HTTP, but in order to have your architecture secured in production, use HTTPS to connect to the JHipster Registry! As the admin password is sent using HTTP Basic authentication, using an encrypted communication channel is very highly recommended.
