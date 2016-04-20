---
layout: default
title: Docker and Docker Compose
permalink: /docker-compose/
redirect_from:
  - /docker_compose.html
sitemap:
    priority: 0.7
    lastmod: 2016-03-20T00:00:00-00:00
---

# <i class="fa fa-music"></i> Docker and Docker Compose

## Summary

Using Docker and Docker Compose is highly recommended in development, and is also a good solution in production.

1. [Description](#1)
2. [Prerequisites](#2)
3. [Building a Docker image of your application](#3)
4. [Working with databases](#4)
5. [Elasticsearch](#5)
6. [Sonar](#6)
7. [Common commands](#7)
8. [Differences when using a microservices architecture](#8)


## <a name="1"></a> Description

_Please note: this Docker configuration is used to run your generated application(s) inside a container image. It's completely different from the [Docker setup]({{ site.url }}/installation/) that JHipster also provides, which is for running the JHipster generator inside a container_

JHipster provides a complete Docker support, in order to:

- Facilitate development, as you can start a full infrastructure very easily, even when using a complex microservices architecture
- For people using Docker Swarm, deploying to production directly, as it uses the same Docker Compose configuration

One great feature of using Docker Compose is that you can easily scale your containers, using the `docker-compose scale` command. This is very interesting if you use JHipster with a [a microservices architecture](#3).

When generating your application, JHipster generates for you:

- A `Dockerfile` for building a Docker image and running your application inside a container
- Several Docker Compose configurations to help you run your application with third-party services, for example a database

Those files are located inside folder `src/main/docker/`.

## <a name="2"></a> Prerequisites

You have to install Docker and Docker Compose:

- [Docker](https://docs.docker.com/installation/#installation)
- [Docker Compose](https://docs.docker.com/compose/install)

<div class="alert alert-info"><i>Tip: </i>

On Windows and Mac OS X, Kitematic is an easy-to-use graphical interface provided with the Docker Toolbox, which will makes using Docker a lot easier.

</div>

<div class="alert alert-warning"><i>Warning: </i>

If you are using Docker Machine on Mac or Windows, your Docker daemon has only limited access to your OS X or Windows file system. Docker Machine tries to auto-share your /Users (OS X) or C:\Users\&lt;username&gt; (Windows) directory. So you have to create the project folder under this directory to avoid any issues especially if you are using the <a href="{{ site.url }}/monitoring/">JHipster Console</a> for monitoring.

</div>

## <a name="3"></a> Building and running a Docker image of your application

To create a Docker image of your application, and push it into your Docker registry:

- With Maven, type: `./mvnw package -Pprod docker:build`
- With Gradle, type: `./gradlew bootRepackage -Pprod buildDocker`

This will package your application with the `prod` profile, and install the image.

To run this image, use the Docker Compose configuration located in the `src/main/docker` folder of your application:

- `docker-compose -f src/main/docker/app.yml up`

This command will start up your application and the services it relies on (database, search engine, JHipster Registry...).

## <a name="4"></a> Working with databases

### MySQL, PostgreSQL or MongoDB

Running `docker-compose -f src/main/docker/app.yml up` already starts up your database automatically.

If you just want to start your database, and not the other services, use the Docker Compose configuration of your database:

- With MySQL: `docker-compose -f src/main/docker/mysql.yml up`
- With PostgreSQL: `docker-compose -f src/main/docker/postgresql.yml up`
- With MongoDB: `docker-compose -f src/main/docker/mongodb.yml up`

### MongoDB Cluster Mode

If you want to use MongoDB with a replica set or shards and a shared configuration between them, you need to build and set up manually Mongo images.
Follow these steps to do so:

- Build the image: `docker-compose -f src/main/docker/mongodb-cluster.yml build`
- Run the database: `docker-compose -f src/main/docker/mongodb-cluster.yml up -d`
- Scale the mongodb node service (you have to choose an odd number of nodes): `docker-compose -f src/main/docker/mongodb-cluster.yml scale <name_of_your_app>-mongodb-node=X`
- Init the replica set (param is the number of node, folder is the folder where the YML file is located, it's `docker` by default): `docker exec -it <yml_folder_name>_<name_of_your_app>-mongodb-node_1 mongo --eval 'var param=X, folder="<yml_folder_name>"' init_replicaset.js`
- Init the shard: `docker exec -it <name_of_your_app>-mongodb mongo --eval 'sh.addShard("rs1/<yml_folder_name>_<name_of_your_app>-mongodb-node_1:27017")'`
- Start your application: `docker-compose -f src/main/docker/app.yml up -d <name_of_your_app>-app`

If you want to add or remove some MongoDB nodes, just repeat step 3 and 4.

### Cassandra

#### In development
To start a Cassandra cluster to run your application locally, you can use the docker_compose file for development `cassandra.yml`:
`docker-compose -f src/main/docker/cassandra.yml up -d`

Docker-compose will start 3 services:
- **<name_of_your_app>-cassandra**, a container with the Cassandra node contact point
- **<name_of_your_app>-cassandra-node-1**, a container with a second Cassandra node joining the cluster
- **<name_of_your_app>-cassandra-migration** a container to automatically apply all migrations scripts (create the Keyspace, create the tables, all data migrations, ...)

The migration service is responsible to apply all the migration scripts from src/main/resources/config/cql in the following order:

1. `create-keyspace.cql`
2. `create-tables.cql` - the initial bootstrap script.
3. all `cql/migration/\*.cql` files in alphabetical order - scripts altering the schemas or data (including `*_added_entity_*.cql` files generated by `jhipster:entity`). This is where you will add all the database changes

##### Note for non linux users:
On Mac OSx and Windows, Docker containers are not hosted directly but on a VirtualBox VM.
Those, you can not access them in localhost but have to hit the VirtualBox IP.

You can override the Cassandra contact point (localhost by default) with this environment variable:

    export SPRING_DATA_CASSANDRA_CONTACTPOINTS=`docker-machine ip default`

__Cassandra nodes__ :
Because Cassandra nodes are also hosted in the Virtual machine, the Cassandra Java driver will receive an error when trying to contact them after receiving their address from the contact point.
To workaround this, you can add a routing rule to your routing table, [(source)](http://krasserm.github.io/2015/07/13/chaos-testing-with-docker-and-cassandra/#port-mapping).

Assuming the containers running the Cassandra nodes have IP address 172.18.0.x:

    sudo route -n add 172.18.0.0/16 `docker-machine ip default`

#### In production:

The docker_compose files for Cassandra in production has 2 possible configurations:
- `cassandra-cluster.yml` => is the default linked in `app.yml`.
- `cassandra-opscenter.yml` => is an alternative with an additional container running OpsCenter to monitor the cluster. OpsCenter will be available at [http://localhost:8888](http://localhost:8888).

Unlike the [other databases](#4) docker-compose configuration, the application will not automatically create the Keyspace and apply the changelogs.
You have to first start the Cassandra cluster and manually apply the scripts before starting the rest of the services:

- Start the Cassandra cluster: `docker-compose -f src/main/docker/app.yml up -d <name_of_your_app>-cassandra`
- Copy the cql scripts inside the container: : `docker cp src/main/resources/config/cql/ <name_of_your_app>-cassandra:/`
- Initialize the database by creating the Keyspace and the tables: `docker exec -it <name_of_your_app>-cassandra init-prod`
- Run any additional changelog scripts necessary to migrate the database, for example: `docker exec -it <name_of_your_app>-cassandra execute-cql /cql/changelog/<insert_default_users scripts>.cql`
 - Every time you want to apply a new changelog script in production, copy the script inside the container and run the execute-cql command
 - You can also still run the scripts outside the containers with cqlsh
- Start the other services to run the app: `docker-compose -f src/main/docker/app.yml up -d`

One big difference between Cassandra and the other databases, is that you can scale your cluster with Docker Compose. To have X+1 nodes in your cluster, run:

- `docker-compose -f src/main/docker/cassandra-cluster.yml scale <name_of_your_app>-cassandra-node=X`

## <a name="5"></a> Elasticsearch

Running `docker-compose -f src/main/docker/app.yml up` already starts up your search engine automatically.

If you just want to start your Elasticsearch node, and not the other services, use its specific Docker Compose configuration::

- `docker-compose -f src/main/docker/elasticsearch.yml up`

## <a name="6"></a> Sonar

A Docker Compose configuration is generated for running Sonar:

- `docker-compose -f src/main/docker/sonar.yml up`

To analyze your code, run Sonar on your project:

- With Maven: `./mvnw sonar:sonar`
- With Gradle: `./gradlew sonar`

The Sonar reports will be available at: [http://localhost:9000](http://localhost:9000)

## <a name="7"></a> Common commands

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

## <a name="8"></a> Differences when using a microservices architecture

If you have selected to generate a [microservices architecture]({{ site.url }}/microservices-architecture/), each application (gateway, microservice) has a `Dockerfile` and a Docker Compose configurations, like with a normal monolithic application.

But you can use the specific `docker-compose` sub-generator, which will generate a global Docker Compose configuration for all your gateway(s) and microservices. This will allow you to deploy and scale your complete architecture with one command.

- You need to have all your gateway(s) and microservices in the same directory.
- Create another directory, for example `mkdir docker-compose`.
- Go into that directory: `cd docker-compose`.
- Run the sub-generator: `yo jhipster:docker-compose`.
- The sub-generator will ask you which application you want to have in your architecture, and if you want to have monitoring with ELK included.

This will generate a global Docker Compose configuration, type `docker-compose up` to run it, and have all your services running at once.

This configuration will have a pre-configured JHipster Registry, that will configure your services automatically:

- Those services will wait until the JHipster Registry is running until they can start (this can be configured in your `bootstrap-prod.yml` file using the `spring.cloud.config.fail-fast` and `spring.cloud.config.retry` keys).
- The registry will configure your applications, for example it will share the JWT secret token between all services.
- Scaling each service is done using Docker Compose, for example type `docker-compose scale test-app=4` to have 4 instances of application "test" running. Those instances will be automatically load-balanced by the gateway(s), and will automatically join the same Hazelcast cluster (if Hazelcast is your Hibernate 2nd-level cache).
