---
layout: default
title: JHipster Registry
permalink: /jhipster-registry/
sitemap:
    priority: 0.7
    lastmod: 2017-05-03T00:00:00-00:00
---

# <i class="fa fa-dashboard"></i> The JHipster Registry

## Overview

The JHipster Registry is a runtime application, provided by the JHipster team. Like the JHipster generator, it is an Open Source, Apache 2-licensed application, and its source code is available on GitHub under the JHipster organization at [jhipster/jhipster-registry](https://github.com/jhipster/jhipster-registry).

The JHipster Registry can be cloned/forked/downloaded directly from [jhipster/jhipster-registry](https://github.com/jhipster/jhipster-registry), and we recommend you use the same version tag as the one you use for your JHipster generator. As the JHipster Registry is also a JHipster-generated application, you can run it like any other JHipster application:

- run it with `./mvnw` in development, it will use by default the `dev` profile and the Eureka Registry will be available at [http://127.0.0.1:8761/](http://127.0.0.1:8761/).
- use `./mvnw -Pprod package` to package it in production, and generate the usual JHipster executable WAR file.

If you'd rather run the JHipster Registry from a Docker image, it is available an Docker Hub at [jhipster/jhipster-registry](https://hub.docker.com/r/jhipster/jhipster-registry/). This image is already pre-configured in the Docker configuration that is provided with each microservice application:

- run `docker-compose -f src/main/docker/jhipster-registry.yml up` to start the JHipster Registry. The Eureka Registry will be available on port `8761` of your Docker host, so if it runs on your machine it should be at [http://127.0.0.1:8761/](http://127.0.0.1:8761/).

Please read our [Docker Compose documentation]({{ site.url }}/docker-compose/) for more information on using the JHipster Registry with Docker Compose.

## Securing the JHipster Registry

The JHipster Registry is secured by default. You can login using the usual "admin/admin" login and password that are used in normal JHipster applications.

Applications also connect to the JHipster Registry using that same "admin" user, but use HTTP Basic authentication. So if your microservices cannot access the registry, and you see some "401 authentication error" messages, it is because you have misconfigured those applications.

In order to secure your JHipster Registry:

- You must change the default "admin" password. This password is set using the standard Spring Boot property `security.user.password`, so you can use the usual Spring Boot mechanisms to modify it: you could modify the project's `application-*.yml` files, or add a `SECURITY_USER_PASSWORD` environment variable. The [Docker Compose sub-generator]({{ site.url }}/docker-compose/) uses the environment variable method.
- As your applications will connect to the registry using HTTP, it is very important to secure that connection channel. There are many ways to do it, and the easiest one is probably to use HTTPS.

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
