---
layout: default
title: Docker Hub
permalink: /docker-hub/
redirect_from:
  - /docker_hub.html
sitemap:
    priority: 0.7
    lastmod: 2016-09-25T00:00:00-00:00
---

# <i class="fa fa-cloud-upload"></i> Docker Hub

## Summary

[![]({{ site.url }}/images/logo/docker-hub.png)](https://hub.docker.com/u/jhipster/)

JHipster has his own [organization] at Docker Hub and provides different Docker images.


The [jhipster-docker-hub] project provides all docker-compose files to launch these images easily.
To use the docker-compose commands, you have to:

- clone the project: `git clone https://github.com/jhipster/jhipster-docker-hub`
- go inside project: `cd jhipster-docker-hub`


<div class="alert alert-warning"><i>Warning: </i>

Based on your OS, your <code>DOCKER_HOST</code> will differ. On Linux, it will be simply your <code>localhost</code>.
For Mac/Windows, you will have to obtain the IP using following command: <code>docker-machine ip default</code>

</div>


## [jhipster/jhipster](https://hub.docker.com/r/jhipster/jhipster) : an alternative installation of JHipster

See the [installation]({{ site.url }}/installation/) page for full instructions.

These following commands can be used in specific use cases.

### Use the latest release of JHipster

Launch `jhipster` in the current folder, with the latest release

```
docker container run --rm -it -v "$PWD":/home/jhipster/app jhipster/jhipster jhipster
```

### Use JHipster v3.0.0

Launch `jhipster` in the current folder, with an older release:

```
docker container run --rm -it -v "$PWD":/home/jhipster/app jhipster/jhipster:v3.0.0 jhipster
```

You can see all tags available [here](https://hub.docker.com/r/jhipster/jhipster/tags/)


## [jhipster/jdl-studio](https://hub.docker.com/r/jhipster/jdl-studio) : JDL-Studio offline

You can use JDL-Studio offline and access to it at [http://localhost:18080](http://localhost:18080)

```
docker container run -d -p 18080:80 jhipster/jdl-studio
```

## [jhipster/jhipster-sample-app](https://hub.docker.com/r/jhipster/jhipster-sample-app)

It is a sample application with H2 or MySQL.

### Quick launch

Run a simple jhipster application directly with Docker, in development profile

```
docker container run -d -p 8080:8080 -e SPRING_PROFILES_ACTIVE=dev jhipster/jhipster-sample-app
```

Then, you can access to the application at [http://localhost:8080](http://localhost:8080)

### Development profile

Run the application in development profile

```
docker-compose -f jhipster-sample-app/dev.yml up
```

### Production profile

Run the application in production profile, with MySQL database

```
docker-compose -f jhipster-sample-app/prod.yml up
```

### Production profile and monitoring with ELK stack

Run the application in production profile, with MySQL database and ELK stack

```
docker-compose -f jhipster-sample-app/prod-elk.yml up
```

Access to the running application at [http://localhost:8080](http://localhost:8080)

Access to the Kibana dashboard at [http://localhost:5601](http://localhost:5601)


## [jhipster/jhipster-sample-app-elasticsearch](https://hub.docker.com/r/jhipster/jhipster-sample-app-elasticsearch)

It is a sample application with MySQL and Elasticsearch.

### Development profile

Run the application in development profile

```
docker-compose -f jhipster-sample-app-elasticsearch/dev.yml up
```

### Production profile

Run the application in production profile, with MySQL database and Elasticsearch

```
docker-compose -f jhipster-sample-app-elasticsearch/prod.yml up
```

## [jhipster/jhipster-sample-app-mongodb](https://hub.docker.com/r/jhipster/jhipster-sample-app-mongodb)

It is a sample application with MongoDB.

### Production profile

Run the application in production profile, with MongoDB database

```
docker-compose -f jhipster-sample-app-mongodb/prod.yml up
```


## [jhipster/jhipster-sample-app-cassandra](https://hub.docker.com/r/jhipster/jhipster-sample-app-cassandra)

It is a sample application with a Cassandra cluster.

### Production profile

Run the application in production profile, with Cassandra cluster

```
docker-compose -f jhipster-sample-app-cassandra/prod.yml up
```

Scale a Cassandra node

```
docker-compose -f jhipster-sample-app-cassandra/prod.yml scale sample-cassandra-node=2
```


[organization]: https://hub.docker.com/u/jhipster/
[jhipster-docker-hub]: https://github.com/jhipster/jhipster-docker-hub


## Microservices architecture

The images used here are:

- [jhipster/jhipster-registry](https://hub.docker.com/r/jhipster/jhipster-registry)
- [jhipster/jhipster-sample-app-gateway](https://hub.docker.com/r/jhipster/jhipster-sample-app-gateway)
- [jhipster/jhipster-sample-app-microservice](https://hub.docker.com/r/jhipster/jhipster-sample-app-microservice)

### Production profile

Run the full stack in production profile

```
docker-compose -f jhipster-sample-microservices/prod/prod.yml up
```

It will start:

- the JHipster Registry
- the gateway
- a MySQL database
- the microservice
- a PostgreSQL database


Scale the microservice

```
docker-compose -f jhipster-sample-microservices/prod/prod.yml scale jhipstersamplemicroservice-app=2
```

### Production profile and monitoring with ELK stack

Run the full stack in production profile, with ELK stack

```
docker-compose -f jhipster-sample-microservices/prod-elk/prod-elk.yml up
```

Scale the microservice

```
docker-compose -f jhipster-sample-microservices/prod-elk/prod-elk.yml scale jhipstersamplemicroservice-app=2
```

Access to the registry at: [http://localhost:8761](http://localhost:8761)

Access to the gateway at: [http://localhost:8080](http://localhost:8080)

Access to the Kibana dashboard at: [http://localhost:5601](http://localhost:5601)
