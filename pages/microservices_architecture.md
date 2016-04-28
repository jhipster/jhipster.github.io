---
layout: default
title: Doing microservices with JHipster
permalink: /microservices-architecture/
sitemap:
    priority: 0.7
    lastmod: 2016-03-10T00:00:00-00:00
---

# <i class="fa fa-sitemap"></i> Doing microservices with JHipster

## Microservices vs Monolithic architecture

The first question JHipster will ask you is the kind of application you want to generate. You have in fact the choice between two architecture styles:

- A "monolithic" architecture uses a single, one-size-fits-all application, which contains both the front-end AngularJS code, and the back-end Spring Boot code.
- A "microservices" architecture splits the front-end and the back-end, so that it's easier for your application to scale and survive infrastructure issues.

A "monolithic" application is much easier to work on, so if you don't have any specific requirements, this is the option we recommend, and our default option.

_The rest of this guide is only for people interested in doing a microservices architecture._

## Overview

The JHipster microservices architecture works in the following way:

 * A gateway is a JHipster-generated application (using application type `microservice gateway` when you generate it) that handles Web traffic, and serves an AngularJS application. There can be several different gateways, if you want to follow the [Backends for Frontends pattern](https://www.thoughtworks.com/insights/blog/bff-soundcloud), but that's not mandatory.
 * The [JHipster Registry](https://github.com/jhipster/jhipster-registry) is a runtime application, using the usual JHipster structure, on which all applications registers and get their configuration from.
 * Microservices are JHipster-generated applications (using application type `microservice application` when you generate them), that handle REST requests. They are stateless, and several instances of them can be launched in parallel to handle heavy loads.
 * The [JHipster Console](https://github.com/jhipster/jhipster-console) is a monitoring & alerting console, based on the ELK stack.

In the diagram below, the green components are specific to your application and the blue components provide its underlying infrastructure.

![Diagram]({{ site.url }}/images/microservices_architecture_1.png)

## HTTP requests routing using the gateway

When the gateways and the microservices are launched, they will register themselves in the registry (using the `eureka.client.serviceUrl.defaultZone` key in the `src/main/resources/config/application.yml` file).

The gateway will automatically proxy all requests to the microservices, using their application name: for example, when microservices `app1` is registered, it is available on the gateway on the `/app1` URL.

For example, if your gateway is running on `localhost:8080`, you could point to [http://localhost:8080/app1/rest/foos](http://localhost:8080/app1/rest/foos) to
get the `foos` resource served by microservice `app1`. If you're trying to do this with your Web browser, don't forget REST resources are secured by default in JHipster, so you need to send the correct JWT header (see the point on security below), or remove the security on those URLs in the microservice's `MicroserviceSecurityConfiguration` class.

If there are several instances of the same service running:

- the gateway will load balance requests between these instances through [Netflix Ribbon](https://github.com/Netflix/ribbon).
- if you are using an SQL database and have selected the Hazelcast 2nd-level cache (which is the default for microservices with JHipster), your instances should have a clustered cache automatically

It's also worth noting that the gateway exposes the Swagger API definitions of the services it proxifies and so you can still benefit from all useful tools like swagger-ui and swagger-codegen.

## Running the JHipster Registry

The JHipster Registry is a runtime application, provided by the JHipster team. Like the JHipster generator, it is an Open Source, Apache 2-licensed application, and its source code is available on Github under the JHipster organization at [jhipster/jhipster-registry](https://github.com/jhipster/jhipster-registry).

The JHipster Registry can be cloned/forked/downloaded directly from [jhipster/jhipster-registry](https://github.com/jhipster/jhipster-registry), and we recommend you use the same version tag as the one you use for your JHipster generator. As the JHipster Registry is also a JHipster-generated application, you can run it like any other JHipster application:

- run it with `mvn` in development, it will use by default the `dev` profile and the Eureka Registry will be available at [http://127.0.0.1:8761/](http://127.0.0.1:8761/).
- use `mvn -Pprod package` to package it in production, and generate the usual JHipster executable WAR file.

If you'd rather run the JHipster Registry from a Docker image, it is available an Docker Hub at [jhipster/jhipster-registry](https://hub.docker.com/r/jhipster/jhipster-registry/). This image is already pre-configured in the Docker configuration that is provided with each microservice application:

- run `docker-compose -f src/main/docker/jhipster-registry.yml up` to start the JHipster Registry. The Eureka Registry will be available on port `8761` of your Docker host, so if it runs on your machine it should be at [http://127.0.0.1:8761/](http://127.0.0.1:8761/).

Please read our [Docker Compose documentation]({{ site.url }}/docker-compose/) for more information on using the JHipster Registry with Docker Compose.

## Application configuration with the JHipster Registry

The JHipster Registry is a [Netflix Eureka server](https://github.com/Netflix/eureka) and also a [Spring Config Server](http://cloud.spring.io/spring-cloud-config/spring-cloud-config.html): when applications are launched they will first connect to the JHipster Registry to get their configuration. This is true for both gateways and microservices.

This configuration is a Spring Boot configuration, like the one found in the JHipster `application-*.yml` files, but it is stored in a central server, so it is easier to manage.

On startup, your gateways and microservices app will query the Registry's config server and overwrite their local properties with the ones defined there.

Two kinds of configurations sources are available:

- A `native` configuration, which is used by default in development (using the JHipster `dev` profile), and which uses the local filesystem.
- A `Git` configuration, which is used by default in production (using the JHipster `prod` profile), and which stores the configuration in a Git server. This allows to tag, branch or rollback configurations using the usual Git tools, which are very powerful in this use-case.

To manage your centralized configuration you just need to add `appname-profile.yml` files in your configuration source where **appname** and **profile** correspond to the application's name and current profile of the service that you want to configure.
For example, adding properties in a `gateway-prod.yml` file will set those properties only for the application named **gateway** started with a **prod** profile. Moreover, properties defined in `application[-dev|prod].yml` will be set for all your applications.

As the Gateway routes are configured using Spring Boot, they can also be managed using the Spring Config Server, for example you could map application `app1-v1` to the `/app1` URL in your `v1` branch, and map application `app1-v2` to the `/app1` URL in your `v2` branch. This is a good way of upgrading microservices without any downtime for end-users.

## Security considerations

In a microservices architecture, we use JWT (JSON Web Token) for securing our applications. Tokens are generated by the gateway, and sent to the underlying microservices: as they share a common secret key, microservices are able to validate the token, and authenticate users using that token.

Those tokens are self-sufficient: they have both authentication and authorization information, so microservices do not need to query a database or an external system. This is important in order to ensure a scalable architecture.

For security to work, you need to exchange the JWT secret token between all your applications.

- For each application the default token is unique, and generated by JHipster. It is stored in the `.yo-rc.json` file.
- Tokens are configured with the `jhipster.security.authentication.jwt.secret` key in the `src/main/resources/config/application.yml` file.
- To share this key between all your applications, copy the key from your gateway to all the microservices, or share it using the JHipster Registry's Spring Config Server.
- A good practice is to have a different key in development and production.

## Creating an application without a database

Only microservices applications can be created without a database. This is because microservices are small and do not have user-management code.

## Generating entities in a microservices architecture

Using the [entity sub-generator]({{ site.url }}/creating-an-entity/) works a little bit differently in a microservices architecture, as the front-end and the back-end codes are not located in the same application.

First, generate the entities in the microservices applications: this works as usual, and you can also use [JHipster UML]({{ site.url }}/jhipster-uml/) or [JDL Studio]({{ site.url }}/jdl-studio/) to help you generate complex entities and relationships. As microservices don't have a front-end, no AngularJS code will be generated.

Then, on the gateway(s), run the entity sub-generator again. A new question will appear at the beginning, which is specific to gateways:

- You will have the choice either to generate an new entity normally (a gateway is also a standard JHipster application, so this would work like for a monolith application), or use an existing JHipster configuration from a microservice.
- If you choose to generate the entity from a microservice, you will need to enter the path to this microservice on your local computer, and then JHipster will generate the front-end code on the gateway.

## Using Docker Compose to develop and deploy

Working on a microservices architecture means you will need several different services and databases working together, and in that context Docker Compose is a great tool to manage your development, testing and production environments.

A specific section on microservices is included in our [Docker Compose documentation]({{ site.url }}/docker-compose#8), and we highly recommend that you get familiar with it when working on a microservices architecture.

## Scaling up with Hazelcast distributed caching

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

## Monitoring with JHipster Console and the ELK stack

When using the Docker-Compose sub-generator, you will be asked if you want to add monitoring to your infrastructure. This option, will add the JHipster-Console to your `docker-compose.yml` file. Once started, it will be available on [http://localhost:5601](http://localhost:5601) and start to gather your applications' logs and metrics. For instructions on how to set up monitoring for your applications please refer to the [monitoring documentation]({{ site.url }}/monitoring).

Compared with monolithic applications, gateways and microservices monitoring configuration provide additional features to help you effectively monitor a microservices cluster. For example logs are enriched with each application's name, host, port and Eureka ServiceId so that you can trace from which service they are originating from. Moreover the JHipster Console comes with default dashboards that give you a view of all your services at the same time.

## Going to production with Docker Swarm

As Docker Swarm uses the same API as Docker Machine, deploying your microservices architecture in the cloud is exactly the same as deploying it on your local machine. Follow our [Docker Compose documentation]({{ site.url }}/docker-compose/) to learn more about using Docker Compose with JHipster.

## Going to production with CloudFoundry

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

## Going to production with Heroku

The [Heroku sub-generator]({{ site.url }}/heroku/) works nearly the same with a microservices architecture, the main difference is that you have more applications to deploy:

Deploy a JHipster Registry directly with one click:

[![Deploy to Heroku](https://camo.githubusercontent.com/c0824806f5221ebb7d25e559568582dd39dd1170/68747470733a2f2f7777772e6865726f6b7563646e2e636f6d2f6465706c6f792f627574746f6e2e706e67)](https://dashboard-preview.heroku.com/new?&template=https%3A%2F%2Fgithub.com%2Fjhipster%2Fjhipster-registry)

Note the URL on which your JHipster Registry is deployed. Your applications must all point to that URL in their `application-prod.yml` file. Change that configuration to be:

    eureka:
        instance:
            hostname: <your_jhipster_registry_url>.herokuapp.com
            non-secure-port: 80
            prefer-ip-address: false

You can now deply and scale the gateway(s) and microservices. The Heroku sub-generator will ask you a new question, to know the URL of your JHipster Registry: this will allow your applications can fetch their configuration on the Spring Cloud Config server.

One important point to remember is that the JHipster Registry isn't secured by default, so with Heroku anyone has direct access to it.

In order to have your architecture secured in production, use HTTPS everywhere, and secure your JHipster Registry using Spring Security's basic authentication support.
