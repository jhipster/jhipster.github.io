---
layout: default
title: Using Pulsar
permalink: /using-pulsar/
redirect_from:
  - /using_pulsar.html
sitemap:
    priority: 0.7
    lastmod: 2019-10-30T00:00:00-00:00
---

# <i class="fa fa-envelope"></i> Using Pulsar

## Features

[Pulsar](http://pulsar.apache.org/) is a popular publish-subscribe messaging system that supports both streaming and queueing use-cases. JHipster has an optional support for Pulsar, that will:

- Configure [Pulsar clients](https://pulsar.apache.org/docs/2.11.x/client-libraries-java/) with JHipster.
- Generate a Docker Compose configuration file, so Pulsar is usable by typing `docker-compose -f src/main/docker/pulsar.yml up -d`.
- Generate an integration test using the [Spring Cloud Stream](https://docs.spring.io/spring-cloud-stream/docs/current/reference/html/) Pulsar binder and [Testcontainers](https://www.testcontainers.org/).

## Prerequisite

Generate a new application and make sure to select `Asynchronous messages using Apache Pulsar` when prompted for technologies you would like to use. A Docker Compose configuration file is generated and you can start Pulsar with the command:

```sh
docker-compose -f src/main/docker/pulsar.yml up -d
```

## Usage

Check the [Spring for Apache Pulsar documentation](https://docs.spring.io/spring-pulsar/docs/current/reference/html/) (prefer the versioned pulsar documentation link generated in your application's README.md) for how to use Pulsar in JHipster.
There are several ways to interact with Pulsar from lowest to highest level of abstraction:
* Generate Producer/Consumer/Reader from respectively PulsarProducerFactory/PulsarConsumerFactory/PulsarReaderFactory
* Inject PulsarTemplate and create PulsarListener beans
* Configure Spring Cloud Streams binders in `application.yml` and Supplier/Consumer/Function beans (see the generated test for an example).
