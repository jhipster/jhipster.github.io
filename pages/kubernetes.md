---
layout: default
title: Deploying to Kubernetes
permalink: /kubernetes/
redirect_from:
  - /kubernetes.html
sitemap:
    priority: 0.7
    lastmod: 2016-08-12T00:00:00-00:00
---

# [BETA] Deploying to Kubernetes

**WARNING!** This is a new sub-generator, of **BETA** quality. Use it at your own risk! Feedback is highly welcome!

This sub-generator allows deployment of your JHipster application to [Kubernetes](http://kubernetes.io/).

[![]({{ site.url }}/img/logo-kubernetes.png)](http://kubernetes.io/)

## Limitations

- Cassandra is not supported yet
- ELK with [JHipster Console]({{ site.url }}/monitoring/) is not supported yet
- Kafka is not supported yet
- Consul is not supported yet

## Pre-requisites

You have to install:

- [Docker](https://docs.docker.com/installation/#installation)
- [kubectl](http://kubernetes.io/docs/user-guide/prereqs/)

You must have a Docker registry. If you don’t have one, you can use the official [Docker Hub](https://hub.docker.com/)

## Minikube

[Minikube](https://github.com/kubernetes/minikube) is a tool that makes it easy to run Kubernetes locally. Minikube runs a single-node Kubernetes cluster inside a VM on your laptop for users looking to try out Kubernetes or develop with it day-to-day.

You can use it to test your application before pushing it to [Kubernetes](http://kubernetes.io/).

## Running the sub-generator

To generate config files for Kubernetes, run this command in a new folder:

`yo jhipster:kubernetes`

Then answer all the questions to deploy your application.


### Which *type* of application would you like to deploy?

Your type of application depends on whether you wish to deploy a microservices architecture or classical applications.


### Enter the root directory where your applications are located

Enter the path.

### Which applications do you want to include in your Kubernetes configuration?

Select your applications.


### Enter the admin password used to secure the JHipster Registry admin

This question is only displayed if you choose microservices architecture.


### What should we use for the Kubernetes namespace?

See the documentation on namespace [here](http://kubernetes.io/docs/user-guide/namespaces/)


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

## Deploying the application

Deploy your application

`kubectl apply -f application`

## More information

*   [Kubernetes documentation](http://kubernetes.io/docs/)
