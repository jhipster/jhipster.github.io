---
layout: default
title: Docker and Docker Compose
permalink: /docker-compose/
redirect_from:
  - /docker_compose.html
sitemap:
    priority: 0.7
    lastmod: 2016-12-01T00:00:00-00:00
---

# <i class="fa fa-music"></i> Docker and Docker Compose

## Summary

Using Docker and Docker Compose is highly recommended in development, and is also a good solution in production.

1. [Description](#1)
2. [Prerequisites](#2)
3. [Building a Docker image of your application](#3)
4. [Generating a custom Docker-Compose configuration for multiple applications](#docker-compose-subgen)
5. [Working with databases](#4)
6. [Elasticsearch](#5)
7. [Sonar](#6)
7. [Keycloak](#7)
8. [Common commands](#8)
9. [Memory Tweaking](#9)

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


If you encounter the error `npm ERR! Error: EACCES: permission denied` when installing JHipster UML (or any unbundled package), your container may not have `sudo` installed (for instance, sudo isn't bundled with Ubuntu Xenial).

__Solution 1__

The NPM documentation recommends not installing any NPM package as root. Follow the [official documentation](https://docs.npmjs.com/getting-started/fixing-npm-permissions) to fix this.

__Solution 2__

  - `docker container exec -u root -it jhipster bash`,
  - `npm install -g YOUR_PACKAGE`,
  - then exit and log into the container normally: `docker container exec -it jhipster bash`

## <a name="3"></a> Building and running a Docker image of your application

To create a Docker image of your application, and push it into your Docker registry:

- With Maven, type: `./mvnw package -Pprod dockerfile:build`
- With Gradle, type: `./gradlew bootRepackage -Pprod buildDocker`

This will package your application with the `prod` profile, and install the image.

On Windows, due to [lack of named pipes](https://github.com/spotify/docker-client/issues/875), you may have to tune settings for Docker and turn on “Expose daemon on tcp://localhost:2375 without TLS”.

To run this image, use the Docker Compose configuration located in the `src/main/docker` folder of your application:

- `docker-compose -f src/main/docker/app.yml up`

This command will start up your application and the services it relies on (database, search engine, JHipster Registry...).

If you chose OAuth 2.0 for authentication, be sure to read our [Keycloak section on this documentation](#7).

## <a name="docker-compose-subgen"></a> Generating a custom Docker-Compose configuration for multiple applications

If your architecture is composed of several JHipster applications, you can use the specific `docker-compose` sub-generator, which will generate a global Docker Compose configuration for all selected applications. This will allow you to deploy and scale your complete architecture with one command.
To use the `docker-compose` subgenerator:

- You need to have all your monolith(s), gateway(s) and microservices in the same directory.
- Create another directory, for example `mkdir docker-compose`.
- Go into that directory: `cd docker-compose`.
- Run the sub-generator: `jhipster docker-compose`.
- The sub-generator will ask you which application you want to have in your architecture, and if you want to setup monitoring with ELK or Prometheus.

This will generate a global Docker Compose configuration, type `docker-compose up` to run it, and have all your services running at once.

In the case of a microservice architecture, this configuration will also pre-configure a JHipster Registry or Consul, that will configure your services automatically:

- Those services will wait until the JHipster Registry (or Consul) is running to start. This can be configured in your `bootstrap-prod.yml` file using the `spring.cloud[.consul].config.fail-fast` and `spring.cloud[.consul].config.retry` keys.
- The registry will configure your applications, for example it will share the JWT secret token between all services.
- Scaling each service is done using Docker Compose, for example type `docker-compose scale test-app=4` to have 4 instances of application "test" running. Those instances will be automatically load-balanced by the gateway(s), and will automatically join the same Hazelcast cluster (if Hazelcast is your Hibernate 2nd-level cache).


## <a name="4"></a> Working with databases

### MySQL, MariaDB, PostgreSQL, Oracle, MongoDB or Cassandra

Running `docker-compose -f src/main/docker/app.yml up` already starts up your database automatically.

If you just want to start your database, and not the other services, use the Docker Compose configuration of your database:

- With MySQL: `docker-compose -f src/main/docker/mysql.yml up`
- With MariaDB: `docker-compose -f src/main/docker/mariadb.yml up`
- With PostgreSQL: `docker-compose -f src/main/docker/postgresql.yml up`
- With Oracle: `docker-compose -f src/main/docker/oracle.yml up`
- With MongoDB: `docker-compose -f src/main/docker/mongodb.yml up`
- With Cassandra: `docker-compose -f src/main/docker/cassandra.yml up`
- With Couchbase: `docker-compose -f src/main/docker/couchbase.yml up`

### MongoDB Cluster Mode

If you want to use MongoDB with a replica set or shards and a shared configuration between them, you need to build and set up manually MongoDB images.
Follow these steps to do so:

- Build the image: `docker-compose -f src/main/docker/mongodb-cluster.yml build`
- Run the database: `docker-compose -f src/main/docker/mongodb-cluster.yml up -d`
- Scale the MongoDB node service (you have to choose an odd number of nodes): `docker-compose -f src/main/docker/mongodb-cluster.yml scale <name_of_your_app>-mongodb-node=<X>`
- Init the replica set (parameter X is the number of nodes you input in the previous step, folder is the folder where the YML file is located, it's `docker` by default): `docker container exec -it <yml_folder_name>_<name_of_your_app>-mongodb-node_1 mongo --eval 'var param=<X>, folder="<yml_folder_name>"' init_replicaset.js`
- Init the shard: `docker container exec -it <yml_folder_name>_<name_of_your_app>-mongodb_1 mongo --eval 'sh.addShard("rs1/<yml_folder_name>_<name_of_your_app>-mongodb-node_1:27017")'`
- Build a Docker image of your application: `./mvnw package -Pprod dockerfile:build`
- Start your application: `docker-compose -f src/main/docker/app.yml up -d <name_of_your_app>-app`

If you want to add or remove some MongoDB nodes, just repeat step 3 and 4.

### Couchbase Cluster Mode

If you want to use Couchbase with multiple nodes, you need to build and set up manually Couchbase images.
Follow these steps to do so:

- Build the image: `docker-compose -f src/main/docker/couchbase-cluster.yml build`
- Run the database: `docker-compose -f src/main/docker/couchbase-cluster.yml up -d`
- Scale the Couchbase node service (you have to choose an odd number of nodes): `docker-compose -f src/main/docker/couchbase-cluster.yml scale <name_of_your_app>-couchbase-node=<X>`
- Build a Docker image of your application: `./mvnw package -Pprod dockerfile:build`
- Start your application: `docker-compose -f src/main/docker/app.yml up -d <name_of_your_app>-app`

### Cassandra

Unlike the other databases, where the schema migrations are executed by the application itself, Cassandra schema migrations are executed by a dedicated Docker container.

#### <a name="cassandra-in-development"></a>Cassandra in development
To start a Cassandra cluster to run your application locally, you can use the docker_compose file for development use:
`docker-compose -f src/main/docker/cassandra.yml up -d`

Docker-compose will start 2 services:

- `<name_of_your_app>-cassandra`:  a container with the Cassandra node contact point
- `<name_of_your_app>-cassandra-migration`: a container to automatically apply all CQL migrations scripts (create the Keyspace, create the tables, all data migrations, ...)

See the [Cassandra page]({{ site.url }}/using-cassandra/) for more information on how to add new CQL scripts without restarting the local cluster.

#### Cassandra in production:
The `app.yml` docker-compose file uses `cassandra-cluster.yml` to configure the cluster.
The application starts after few seconds (see _JHIPSTER_SLEEP_ variable) to gives the time to the cluster to start and the migrations to be executed.

One big difference between Cassandra and the other databases, is that you can scale your cluster with Docker Compose. To have X+1 nodes in your cluster, run:

- `docker-compose -f src/main/docker/cassandra-cluster.yml scale <name_of_your_app>-cassandra-node=X`

### Microsoft SQL Server

If you want to use the MSSQL Docker image with JHipster, there are a few steps to follow:

- Increase the RAM available to Docker to at least 3.25GB
- Run the database: `docker-compose -f src/main/docker/mssql.yml up -d`
- Create the database with a MSSQL client of your choice
- Start your application: `docker-compose -f src/main/docker/app.yml up -d <name_of_your_app>-app`

## <a name="5"></a> Elasticsearch

Running `docker-compose -f src/main/docker/app.yml up` already starts up your search engine automatically.

If you just want to start your Elasticsearch node, and not the other services, use its specific Docker Compose configuration:

- `docker-compose -f src/main/docker/elasticsearch.yml up`

## <a name="6"></a> Sonar

A Docker Compose configuration is generated for running Sonar:

- `docker-compose -f src/main/docker/sonar.yml up`

To analyze your code, run Sonar on your project:

- With Maven: `./mvnw sonar:sonar`
- With Gradle: `./gradlew sonar`

The Sonar reports will be available at: [http://localhost:9000](http://localhost:9000)

## <a name="7"></a> Keycloak

If you chose OAuth 2.0 as your authentication, Keycloak is used as the default identity provider. Running `docker-compose -f src/main/docker/app.yml up` starts up Keycloak automatically.

To make things work, you'll need to make sure to add the following to your hosts file (`/etc/hosts` on Mac/Linux, `c:\Windows\System32\Drivers\etc\hosts` on Windows).

```
127.0.0.1	keycloak
```

This is because you will access your application with a browser on your machine (which name is localhost, or `127.0.0.1`), but inside Docker it will run in its own container, which name is `keycloak`.

If you just want to start Keycloak, and not the other services, use its specific Docker Compose configuration:

- `docker-compose -f src/main/docker/keycloak.yml up`

## <a name="8"></a> Common commands

### List the containers

You can use `docker container ps -a` to list all the containers

    $ docker container ps -a
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
    fc35e1090021        mysql               "/entrypoint.sh mysql"   4 seconds ago       Up 4 seconds        0.0.0.0:3306->3306/tcp   sampleApplication-mysql

### Docker stats for containers
`docker container stats` or {% raw %}`docker container stats $(docker container ps --format={{.Names}})`{% endraw %} to list all running containers with CPU, Memory, Networking I/O and Block I/O stats.

    $ docker container stats {% raw %}$(docker container ps --format={{.Names}}){% endraw %}
    CONTAINER                 CPU %               MEM USAGE / LIMIT     MEM %               NET I/O               BLOCK I/O             PIDS
    jhuaa-mysql               0.04%               221 MB / 7.966 GB     2.77%               66.69 kB / 36.78 kB   8.802 MB / 302.5 MB   37
    00compose_msmongo-app_1   0.09%               965.6 MB / 7.966 GB   12.12%              121.3 kB / 54.64 kB   89.84 MB / 14.88 MB   35
    00compose_gateway-app_1   0.39%               1.106 GB / 7.966 GB   13.89%              227.5 kB / 484 kB     117 MB / 28.84 MB     92
    jhipster-registry         0.74%               1.018 GB / 7.966 GB   12.78%              120.2 kB / 126.4 kB   91.12 MB / 139.3 kB   63
    gateway-elasticsearch     0.27%               249.1 MB / 7.966 GB   3.13%               42.57 kB / 21.33 kB   48.16 MB / 4.096 kB   58
    00compose_jhuaa-app_1     0.29%               1.042 GB / 7.966 GB   13.08%              101.8 kB / 78.84 kB   70.08 MB / 13.5 MB    68
    msmongo-mongodb           0.34%               44.8 MB / 7.966 GB    0.56%               49.72 kB / 48.08 kB   33.97 MB / 811 kB     18
    gateway-mysql             0.03%               202.7 MB / 7.966 GB   2.54%               60.84 kB / 31.22 kB   27.03 MB / 297 MB     37

### Scale a container

Run `docker-compose scale test-app=4` to have 4 instances of application "test" running.

### Stop containers

`docker-compose -f src/main/docker/app.yml stop`

You can also use directly Docker:

`docker container stop <container_id>`

When you stop a container, the data is not deleted, unless you delete the container.

### Delete a container

Be careful! All data will be deleted:

`docker container rm <container_id>`


## <a name="9"></a> Memory Tweaking

In order to optimize memory usage for applications running in the container, you can setup Java memory parameters on `Dockerfile` or `docker-compose.yml`

### Adding memory parameters to Dockerfile

Set the environment variable.

    ENV JAVA_OPTS=-Xmx512m -Xms256m

### Adding memory parameters to docker-compose.yml

This solution is desired over Dockerfile. In this way, you have a single control point for your memory configuration on all containers that compose you application.

Add the `JAVA_OPTS` into `environment` section.

```
    environment:
      - (...)
      - JAVA_OPTS=-Xmx512m -Xms256m
```

Depending on the Docker base image, `JAVA_OPTS` won't work. In this case, try to use `_JAVA_OPTIONS` instead:

```
    environment:
      - (...)
      - _JAVA_OPTIONS=-Xmx512m -Xms256m
```
