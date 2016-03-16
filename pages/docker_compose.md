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
6. [Working with Elasticsearch](#6)
7. [Working with Sonar](#7)
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

If you have selected to generate a [microservices architecture]({{ site.url }}/microservices-architecture/), each application (gateway, microservice) has a `DockerFile` and Docker Compose configurations, like with a normal monolithic application.

But you can use the specific `docker-compose` sub-generator, which will generate a global Docker Compose configuration for all your gateway(s) and microservices. This will allow you to deploy and scale your complete architecture with one command.

- You need to have all your gateway(s) and microservices in the same directory
- Create another directory, for example `mkdir docker-compose`
- Go into that directory: `cd docker-compose`
- Run the sub-generator: `yo jhispter:docker-compose`
- The sub-generator will ask you which application you want to have in your architecture, and if you want to have the JHipster Registry and the JHipster Console included

This will generate a global Docker Compose configuration, type `docker-compose up` to run it.

TODO

## <a name="4"></a> Building and running a Docker image of your application

TODO

`mvn package -Pprod docker:build`

`docker-compose -f src/main/docker/app.prod.yml -f src/main/docker/db.prod.yml up`


## <a name="5"></a> Working with databases

### Note

**Please note:** based on your OS your `DOCKER_HOST_IP` will differ. On Linux, it will be simply your localhost. For Mac/Windows, you will have to obtain the IP using following command: `docker-machine ip default` or `docker-machine env default`.

You have to use this `DOCKER_HOST_IP` instead of localhost for databases in your `application-dev.yml` and `application-prod.yml` files.

### Starting MySQL, PostgreSQL or MongoDB

**In development profile**:

`docker-compose -f src/main/docker/dev.yml up -d`

**In production profile** (it will start Elasticsearch too if you selected it as search engine):

`docker-compose -f src/main/docker/prod.yml up -d`

### Starting Cassandra the first time

**In development profile**:

- Build the image:

`docker-compose -f src/main/docker/dev.yml build`

- Start the container (it will show the container id):

`docker-compose -f src/main/docker/dev.yml up -d`

- Copy the cql scripts inside the container:

`docker cp src/main/resources/config/cql/ "container id":/`

- Initialize the database by creating the Keyspace and the Tables:

`docker exec -it "container id" init`

- After using entity sub generator, update the cql scripts inside the container:

`docker cp src/main/resources/config/cql/ "container id":/`

- Create the tables:

`docker exec -it "container id" entities`

**In production profile**:

- Build the image:

`docker-compose -f src/main/docker/prod.yml build`

- Start the container (it will show the container id):

`docker-compose -f src/main/docker/prod.yml up -d`

- Copy the cql scripts inside the container:

`docker cp src/main/resources/config/cql/ "container id":/`

- Initialize the database by creating the Keyspace and the Tables:

`docker exec -it "container id" init`

- Add X other nodes:

`docker-compose -f src/main/docker/prod.yml scale <name_of_your_app>-cassandra-node=X`

- You can manage all nodes with OpsCenter: [http://localhost:8888](http://localhost:8888)

- Before starting your application in production profile, add in your `application-prod.yml` every IP of containers to the key `spring.data.cassandra.contactPoints`

- After using entity sub generator, update the cql scripts inside the container:

`docker cp src/main/resources/config/cql/ "container id":/`

- Create the tables:

`docker exec -it "container id" entities`

### Starting Cassandra the next times

**In development profile**:

`docker-compose -f src/main/docker/dev.yml up -d`

**In production profile**:

`docker-compose -f src/main/docker/prod.yml up -d`

## <a name="6"></a> Working with Elasticsearch

If you choose Elasticsearch as search engine, the configuration will be included in `prod.yml`, so it will run alongside your database in production.

## <a name="7"></a> Working with Sonar

When generating your application, the `src/main/docker/sonar.yml` is generated in your folder project.
So you can start a sonar instance to analyze your code:

Start a sonar instance :

`docker-compose -f src/main/docker/sonar.yml up -d`

Analyze your code:

`mvn sonar:sonar` or `./gradlew sonar`

You can access to sonar: [http://localhost:9000](http://localhost:9000)


## <a name="8"></a> Common commands

### List the containers

You can use `docker ps -a` to list all the containers

    $ docker ps -a
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
    fc35e1090021        mysql               "/entrypoint.sh mysql"   4 seconds ago       Up 4 seconds        0.0.0.0:3306->3306/tcp   sampleApplication-mysql

### Scaling a container

TODO

### Stop the containers

In development profile:

`docker-compose -f src/main/docker/dev.yml stop`

In production profile:

`docker-compose -f src/main/docker/prod.yml stop`

You can use directly docker:

`docker stop "container id"`

When you stop a container, the data are not deleted, unless you delete the container.

### Delete a container

Be careful! All data will be deleted:

`docker rm "container id"`
