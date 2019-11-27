---
layout: default
title: Using Kafka
permalink: /using-kafka/
redirect_from:
  - /using_kafka.html
sitemap:
    priority: 0.7
    lastmod: 2019-10-30T00:00:00-00:00
---

# <i class="fa fa-envelope"></i> Using Kafka

## Features

[Kafka](http://kafka.apache.org/) is a popular publish-subscribe messaging system. JHipster has an optional support for Kafka, that will:

- Configure [Kafka clients](https://docs.confluent.io/5.3.1/clients/consumer.html#java-client) with JHipster.
- Add the necessary configuration in the `application-*.yml`
- Generate a Docker Compose configuration file, so Kafka is usable by typing `docker-compose -f src/main/docker/kafka.yml up -d`.

## Prerequisite

Generate a new application and make sure to select `Asynchronous messages using Apache Kafka` when prompted for technologies you would like to use. A Docker Compose configuration file is generated and you can start Kafka with the command:

`docker-compose -f src/main/docker/kafka.yml up -d`

## Consumer and Producer

A consumer (`<appName>KafkaConsumer` class) is running and can be adapted to your needs.

A producer (`<appName>KafkaProducer` class) is also available and can be called through a REST endpoint (`<appName>KafkaResource class`).

## Running the app

Allow access to the endpoint in `SecurityConfiguration.java`:

`.antMatchers("/api/<appName>-kafka/publish").permitAll()`

If you invoke the endpoint `http://localhost:8080/api/<appName>-kafka/publish?message=...`, you should see the message logged to the console.