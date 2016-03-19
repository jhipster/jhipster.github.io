---
layout: default
title: Docker Compose
permalink: /docker-compose/
redirect_from:
  - /docker_compose.html
sitemap:
    priority: 0.7
    lastmod: 2015-12-24T00:00:00-00:00
---

# <i class="fa fa-music"></i> Docker and Docker Compose

## Summary

Using Docker and Docker Compose is highly recommended in development, and is also a good solution in production.

1. [Description](#1)
2. [Prerequisites](#2)
3. [Differences when using a microservices architecture](#3)
4. [Building a Docker image of your application](#4)
5. [Working with databases](#5)
6. [Elasticsearch](#6)
7. [Sonar](#7)
8. [Common commands](#8)

## <a name="1"></a> Description

_Please note: this Docker configuration is used to run your generated application(s) inside a container image. It's completely different from the [Docker setup]({{ site.url }}/installation/) that JHipster also provides, which is for running the JHipster generator inside a container_

JHipster provides a complete Docker support, in order to:

- Facilitate development, as you can start a full infrastructure very easily, even when using a complex microservices architecture
- For people using Docker Swarm, deploying to production directly, as it uses the same Docker Compose configuration

One great feature of using Docker Compose is that you can easily scale your containers, using the `docker scale` command. This is very interesting if you use JHipster with a [a microservices architecture](#3).

When generating your application, JHipster generates for you:

- A `DockerFile` for running your application inside a container
- Several Docker Compose configurations to help you run your application with third-party services, for example a database

Those files are located inside folder `src/main/docker/`.

## <a name="2"></a> Prerequisites

You have to install Docker and Docker Compose:

- [Docker](https://docs.docker.com/installation/#installation)
- [Docker Compose](https://docs.docker.com/compose/install)

<div class="alert alert-info"><i>Tip: </i>

On Windows and Mac OS X, Kitematic is an easy-to-use graphical interface provided with the Docker Toolbox, which will makes using Docker a lot easier.

</div>

## <a name="3"></a> Differences when using a microservices architecture

If you have selected to generate a [microservices architecture]({{ site.url }}/microservices-architecture/), each application (gateway, microservice) has a `DockerFile` and a Docker Compose configurations, like with a normal monolithic application.

But you can use the specific `docker-compose` sub-generator, which will generate a global Docker Compose configuration for all your gateway(s) and microservices. This will allow you to deploy and scale your complete architecture with one command.

- You need to have all your gateway(s) and microservices in the same directory.
- Create another directory, for example `mkdir docker-compose`.
- Go into that directory: `cd docker-compose`.
- Run the sub-generator: `yo jhispter:docker-compose`.
- The sub-generator will ask you which application you want to have in your architecture, and if you want to have monitoring with ELK included.

This will generate a global Docker Compose configuration, type `docker-compose up` to run it, and have all your services running at once.

This configuration will have a pre-configured JHipster Registry, that will configure your services automatically:

- Those services will wait until the JHipster Registry is running until they can start (this can be configured in your `bootstrap-prod.yml` file using the `spring.cloud.config.fail-fast` and `spring.cloud.config.retry` keys).
- The registry will configure your applications, for example it will share the JWT secret token between all services.
- Scaling each service is done using Docker Compose, for example type `docker-compose scale test-app=4` to have 4 instances of application "test" running. Those instances will be automatically load-balanced by the gateway(s), and will automatically join the same Hazelcast cluster (if Hazelcast is your Hibernate 2nd-level cache).

## <a name="4"></a> Building and running a Docker image of your application

To create a Docker image of your application, and push it into your Docker registry:

- With Maven, type: `./mvnw package -Pprod docker:build`
- With Gradle, type: `./gradlew bootRepackage -Pprod buildDocker`

This will package your application with the `prod` profile, and install the image.

To run this image, use the Docker Compose configuration located in the `src/main/docker` folder of your application:

- `docker-compose -f src/main/docker/app.yml up`

This command will start up your application and the services it relies on (database, search engine, JHipster Registry...).

## <a name="5"></a> Working with databases

### MySQL, PostgreSQL or MongoDB

Running `docker-compose -f src/main/docker/app.yml up` already starts up your database automatically.

If you just want to start your database, and not the other services, use the Docker Compose configuration of your database:

- With MySQL: `docker-compose -f src/main/docker/mysql.yml up`
- With PostgreSQL: `docker-compose -f src/main/docker/postgresql.yml up`
- With MongoDB: `docker-compose -f src/main/docker/mongodb.yml up`

### Cassandra

Before running `docker-compose -f src/main/docker/app.yml up`, you will need to build and set up manually your Cassandra image.

**Using DataStax OpsCenter**: if you want to monitor your application using DataStax OpsCenter, we also provide a `cassandra-opscenter.yml` configuration file, which you should use instead of the normal `cassandra.yml` file. OpsCenter will be available at [http://localhost:8888](http://localhost:8888).

To use Cassandra, we need to build and run a specific Docker image:

- Build the image: `docker-compose -f src/main/docker/cassandra.yml build`
- Start the container (it will show the container id): `docker-compose -f src/main/docker/cassandra.yml up`
- Use `docker ps` to get the "container id" of the jhipster-cassandra node, which will be used in the next commands (replace `<container_id>` by its value)
- Copy the cql scripts inside the container: `docker cp src/main/resources/config/cql/ <container_id>:/`
- Initialize the database by creating the Keyspace and the Tables: `docker exec -it <container_id> init`
- After using the [entity sub-generator]({{ site.url }}/creating-an-entity/), update the cql scripts inside the container: `docker cp src/main/resources/config/cql/ <container_id>:/`
- Create the tables: `docker exec -it <container_id> entities`

You can now run `docker-compose -f src/main/docker/app.yml up` to start your application with Cassandra, or `docker-compose -f src/main/docker/cassandra.yml up` if you just want to run Cassandra. Next time you want to add a new entity, follow the last 2 previous steps each time to update your database schema.

One big difference between Cassandra and the other databases, is that you can scale your cluster with Docker Compose. To have X+1 nodes in your cluster, run:

- `docker-compose -f src/main/docker/cassandra.yml scale <name_of_your_app>-cassandra-node=X`

## <a name="6"></a> Elasticsearch

Running `docker-compose -f src/main/docker/app.yml up` already starts up your search engine automatically.

If you just want to start your Elasticsearch node, and not the other services, use its specific Docker Compose configuration::

- `docker-compose -f src/main/docker/elasticsearch.yml up`

## <a name="7"></a> Sonar

A Docker Compose configuration is generated for running Sonar:

- `docker-compose -f src/main/docker/sonar.yml up`

To analyze your code, run Sonar on your project:

- With Maven: `./mvnw sonar:sonar`
- With Gradle: `./gradlew sonar`

The Sonar reports will be available at: [http://localhost:9000](http://localhost:9000)

## <a name="8"></a> Common commands

### List the containers

You can use `docker ps -a` to list all the containers

    $ docker ps -a
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
    fc35e1090021        mysql               "/entrypoint.sh mysql"   4 seconds ago       Up 4 seconds        0.0.0.0:3306->3306/tcp   sampleApplication-mysql

### Scale a container

Run `docker-compose scale test-app=4` to have 4 instances of application "test" running.

### Stop containers

`docker-compose -f src/main/docker/app.yml stop`

You can also use directly Docker:

`docker stop <container_id>`

When you stop a container, the data is not deleted, unless you delete the container.

### Delete a container

Be careful! All data will be deleted:

`docker rm <container_id>`
