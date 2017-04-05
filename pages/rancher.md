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

- Spring config server only support Git urls for now

## Pre-requisites

You have to install:

- [Docker](https://docs.docker.com/installation/#installation)

You must have a Docker registry. If you don’t have one, you can use the official [Docker Hub](https://hub.docker.com/)

## Running the sub-generator

To generate config files for Rancher, run this command in a new folder:

`yo jhipster:rancher-compose`

Then answer all the questions to deploy your application.


### Which *type* of application would you like to deploy?

Your type of application depends on whether you wish to deploy a microservices architecture or classical applications.


### Enter the root directory where your applications are located

Enter the path.

### Which applications do you want to include in your Rancher configuration?

Select your applications.


### Enter the admin password used to secure the JHipster Registry admin

This question is only displayed if you choose microservices architecture.


### What should we use for the base Docker repository name?

If you choose [Docker Hub](https://hub.docker.com/) as main registry, it will be your Docker Hub login.


### What command should we use for push Docker image to repository?

The default command to push to Docker Hub is `docker push`
For example, if you use the Google Cloud to host your Docker images, it will be: `gcloud docker push`


## Updating your deployed application

### Preparing a new deployment

When your application is already deployed, you can re-deploy it by building a new Docker image:

`./mvnw package -Pprod -DskipTests docker:build`

Or when using gradle:

`./gradlew -Pprod bootRepackage buildDocker -x test`

### Pushing to Docker Hub

Tag locally your image:

`docker tag application username/application`

Push your image to Docker Hub:

`docker push username/application`

## Deploying a monolith application

Deploy your application:

`kubectl apply -f application/`

It will create a Kubernetes deployment for your application and its associated dependent services (database, elasticsearch...) as well as a Kubernetes service to expose the application to the outside.

## Deploying a microservice application

### Deploying a Service Registry in Rancher

Although, Kubernetes does feature its own internal service discovery with **Kube-DNS**, JHipster rely on Spring Cloud for service discovery, so it depends on a third party service registry like Eureka or Consul. This has the advantage of being platform independent and to work similarly in production and on a local development machine.

Consequently, for microservices applications, the JHipster Kubernetes sub-generator will generate Kubernetes manifest files to deploy service registries like the **JHipster-Registry** (based on Eureka) or **Consul**. Moreover, the generated microservices and gateway Kubernetes manifests will contains the appropriate configuration to register themselves to their central registry.

### Managing the JHipster Registry or Consul in Rancher

WAITING PIERREBESSON PR

By default, configuration servers run in development mode, which means that YAML property files are read directly from the filesystem and hot-reloaded on changes. For production it is advised to setup configuration from a git repository as explained in our microservice documentation for the [JHipster-Registry config server](/microservices-architecture/#consul_app_configuration) and [Consul config server](/microservices-architecture/#consul_app_configuration).

## More information

*   [Rancher documentation](http://rancher.com/docs/)
