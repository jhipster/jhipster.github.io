---
layout: default
title: Using Kafka
permalink: /using-kafka/
redirect_from:
  - /using_kafka.html
sitemap:
    priority: 0.7
    lastmod: 2016-09-22T00:00:00-00:00
---

# <i class="fa fa-envelope"></i> Using Kafka

__WARNING!__ This is a new feature, of <b>BETA</b> quality. Use it at your own risk! Feedback is highly welcome!

## Features

[Kafka](http://kafka.apache.org/) is a popular publish-subscribe messaging system. JHipster has an optional support for Kafka, that will:

- Configure [Spring Cloud Stream](https://cloud.spring.io/spring-cloud-stream/) with JHipster.
- Add the necessary configuration in the `application-*.yml` files to have a sample `topic-jhipster` topic, and to have an healthcheck monitor for Kafka (which will be available in the `health` administration screen).
- Generate a Docker Compose configuration file, with the sample `topic-jhipster` topic, so Kafka is usable by simply typing `docker-compose -f src/main/docker/kafka.yml up -d`.
- Provide support for Kafka in a microservice environment, when using Docker. The Docker Compose sub-generator will generate a specific Kafka configuration, if one microservice or one gateway uses Kafka. All microservices and gateways will then use that Kafka broker for all their messages. The broker is common for all applications, as it is typically used as a message broker between applications.

## Limitation

- We currently do not provide a complete example on working with Kafka, and we have no client-side code using Kafka.
