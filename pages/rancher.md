---
layout: default
title: Deploying to Rancher
permalink: /rancher/
redirect_from:
  - /rancher.html
sitemap:
    priority: 0.7
    lastmod: 2017-02-27T00:00:00-00:00
---

# [BETA] Deploying to Rancher

**WARNING!** This is a new sub-generator, of **BETA** quality. Use it at your own risk! Feedback is highly welcome!

This sub-generator allows deployment of your JHipster application to [Rancher](http://rancher.com/).

[![]({{ site.url }}/images/logo/logo-rancher.png)](http://rancher.com/)

## Limitations

- Cassandra and Mongo cluster are not supported for now.

## Pre-requisites

You have to install:

- [Docker](https://docs.docker.com/installation/#installation)

You must have a Docker registry. If you don’t have one, you can use the official [Docker Hub](https://hub.docker.com/)

## Running the sub-generator

To generate config files for Rancher, run this command in a new folder:

`jhipster rancher-compose`

Then answer all the questions to deploy your application.


### Which *type* of application would you like to deploy?

Your type of application depends on whether you wish to deploy a microservices architecture or classical applications.


### Enter the root directory where your applications are located

Enter the path.

### Which applications do you want to include in your Rancher configuration?

Select your applications.

### Do you want to setup monitoring for your applications ?

Deploy JHipster Console or Prometheus to do monitoring on your application

### Enter the admin password used to secure the JHipster Registry admin

This question is only displayed if you choose microservices architecture.

### Would you like to enable rancher load balancing support?

Activate Load balancing service on Rancher. It will only bind your gateway application and map port 80 to your gateway port (by default 8080).

### What should we use for the base Docker repository name?

If you choose [Docker Hub](https://hub.docker.com/) as main registry, it will be your Docker Hub login.

### What command should we use for push Docker image to repository?

The default command to push to Docker Hub is `docker push`
For example, if you use the Google Cloud to host your Docker images, it will be: `gcloud docker push`

## Updating your deployed application

### Preparing a new deployment

When your application is already deployed, you can re-deploy it by building a new Docker image:

`./mvnw package -Pprod -DskipTests jib:dockerBuild`

Or when using gradle:

`./gradlew -Pprod bootWar jibDockerBuild -x test`

### Pushing to your Docker registry (Docker Hub)

Tag locally your image:

`docker tag application username/application`

Push your image to Docker Hub:

`docker push username/application`

### Generating your Rancher configuration

Create rancher folder on root folder

`mkdir rancher`

Go to it and generate yout rancher configuration

```
cd rancher
jhipster rancher-compose
```

Follow instruction and answer all questions.
You will then have to new files `docker-compose.yml`and `rancher-compose.yml`.

### Use local configuration for Config server

On same folder as your rancher configuration you should have a directory with name `registry-config-sidekick` when using a registry.

This sidekick allow you to use a local configuration file (located inside the directory) for the deployed config server instance compare to GIT method.

To use it, you need to build this image and deploy it to the same registry as your previous built image.

```
cd registry-config-sidekick
docker build -t username/registry-config-sidekick .
docker push username/registry-config-sidekick
```

Configuration files will be included into this image and then the Config Server instance will be able to map those files and use them.

## Deploying to your Rancher server

Once all your images have been pushed into your registry, you will be able to create your Stack on your Rancher server and use both your docker-compose configuration and the rancher-compose one.

By default rancher-compose deploy only one instance of each service for performance purpose.

## More information

*   [Rancher documentation](http://docs.rancher.com/)
