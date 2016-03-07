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

# <i class="fa fa-music"></i> [BETA] Docker Compose

__WARNING!__ This is a new feature, currently in __BETA__. Only these containers are available: MySQL, PostgreSQL, MongoDB, Cassandra, Elasticsearch, SonarQube.

## Description

When generating your application, if you choose MySQL, PostgreSQL, MongoDB or Cassandra, some docker-compose files (`dev.yml`, `prod.yml`, `sonar.yml`) are generated in your folder project `src/main/docker/`.

If you choose Elasticsearch as search engine, the configuration will be included in `prod.yml`.

So you can use docker-compose to start your database in development or production profile.

All these images come from the official [Docker Hub](https://hub.docker.com/):

- [MySQL](https://hub.docker.com/_/mysql/)
- [PostgreSQL](https://hub.docker.com/_/postgres/)
- [MongoDB](https://hub.docker.com/_/mongo/)
- [Cassandra](https://hub.docker.com/_/cassandra/)
- [Elasticsearch](https://hub.docker.com/_/elasticsearch/)
- [SonarQube](https://hub.docker.com/_/sonarqube/)

## Prerequisites

You have to install Docker and Docker Compose:

- [Docker](https://docs.docker.com/installation/#installation)
- [Docker Compose](https://docs.docker.com/compose/install)

## Working with databases

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

## Working with Sonar

When generating your application, the `src/main/docker/sonar.yml` is generated in your folder project.
So you can start a sonar instance to analyze your code:

Start a sonar instance :

`docker-compose -f src/main/docker/sonar.yml up -d`

Analyze your code:

`mvn sonar:sonar` or `./gradlew sonar`

You can access to sonar: [http://localhost:9000](http://localhost:9000)


## Common commands

### List the containers

You can use `docker ps -a` to list all the containers

    $ docker ps -a
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
    fc35e1090021        mysql               "/entrypoint.sh mysql"   4 seconds ago       Up 4 seconds        0.0.0.0:3306->3306/tcp   sampleApplication-mysql


### Stop the containers

In development profile:

`docker-compose -f src/main/docker/dev.yml stop`

In production profile:

`docker-compose -f src/main/docker/prod.yml stop`

You can use directly docker:

`docker stop "container id"`

When you stop a container, the data are not deleted, unless you delete the container.

### Delete a container

Be carefull! All data will be deleted:

`docker rm "container id"`
