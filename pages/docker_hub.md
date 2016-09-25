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

[![]({{ site.url }}/img/docker-hub.png)](https://hub.docker.com/u/jhipster/)

JHipster has his own [organization] at Docker Hub and provides different Docker images.


The [jhipster-docker-hub] project provides all docker-compose files to launch these images easily.
To use the docker-compose commands, you have to:

- clone the project: `git clone https://github.com/jhipster/jhipster-docker-hub`
- go inside project: `cd jhipster-docker-hub`


<div class="alert alert-warning"><i>Warning: </i>

Based on your OS, your <code>DOCKER_HOST</code> will differ. On Linux, it will be simply your <code>localhost</code>.
For Mac/Windows, you will have to obtain the IP using following command: <code>docker-machine ip default</code>

</div>


## Alternative installation of JHipster

This alternative installation of JHipster is possible with this image: [jhipster/jhipster](https://hub.docker.com/r/jhipster/jhipster)

See the [installation]({{ site.url }}/installation/) page for full instructions.

These following commands can be used in specific use cases.

### Use the latest release of JHipster

Launch `yo jhipster` in the current folder, with the latest release

```
docker run --rm -it -v "$PWD":/home/jhipster/app jhipster/jhipster yo jhipster
```

### Use JHipster v3.0.0

Launch `yo jhipster` in the current folder, with an older release:

```
docker run --rm -it -v "$PWD":/home/jhipster/app jhipster/jhipster:v3.0.0 yo jhipster
```

You can see all tags available [here](https://hub.docker.com/r/jhipster/jhipster/tags/)


## JDL-Studio offline

The image used here is [jhipster/jdl-studio](https://hub.docker.com/r/jhipster/jdl-studio)

You can use JDL-Studio offline and access to it at [http://localhost:18080](http://localhost:18080)

```
docker run -d -p 18080:80 jhipster/jdl-studio
```

## Sample application with H2 or MySQL

The image used here is [jhipster/jhipster-sample-app](https://hub.docker.com/r/jhipster/jhipster-sample-app)

### Quick launch

Run a simple jhipster application directly with Docker, in development profile

```
docker run -d -p 8080:8080 -e SPRING_PROFILES_ACTIVE=dev jhipster/jhipster-sample-app
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


## Sample application with Elasticsearch

The image used here is [jhipster/jhipster-sample-app-elasticsearch](https://hub.docker.com/r/jhipster/jhipster-sample-app-elasticsearch)

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


## Sample application with MongoDB

The image used here is [jhipster/jhipster-sample-app-mongodb](https://hub.docker.com/r/jhipster/jhipster-sample-app-mongodb)

Run the application in production profile, with MongoDB database

```
docker-compose -f jhipster-sample-app-mongodb/prod.yml up
```


## Sample application with Cassandra

The image used here is [jhipster/jhipster-sample-app-cassandra](https://hub.docker.com/r/jhipster/jhipster-sample-app-cassandra)

Run the application in production profile, with Cassandra cluster

```
docker-compose -f jhipster-sample-app-cassandra/prod.yml up
```


[organization]: https://hub.docker.com/u/jhipster/
[jhipster-docker-hub]: https://github.com/jhipster/jhipster-docker-hub
