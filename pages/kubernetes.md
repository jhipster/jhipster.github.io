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

## Pre-requisites

You have to install:

- [Docker](https://docs.docker.com/installation/#installation)
- [kubectl](http://kubernetes.io/docs/user-guide/prereqs/)

You must have a Docker registry. If you don’t have one, you can use the official [Docker hub](https://hub.docker.com/)

## Running the sub-generator

To generate config files for Kubernetes, run this command in a new folder:

`yo jhipster:kubernetes`

The instruction should be displayed all information to deploy your application.

## Updating your deployed application

### Preparing a new deployment

When your application is already deployed, you can prepare a new deployment by typing for building a new Docker image:

`./mvnw package -Pprod -DskipTests docker:build`

Or when using gradle:

`./gradlew -Pprod bootRepackage buildDocker -x test`

### Pushing to Docker Hub

Tag locally your image:

`docker tag application username/application`

Push your image to Docker Hub:

`docker push username/application`

## Deploying application

Deploy your application

`kubectl apply -f application`

## Troubleshooting

- Elasticsearch is not supported yet
- Cassandra is not supported yet

## Minikube

[Minikube](https://github.com/kubernetes/minikube) is a tool that makes it easy to run Kubernetes locally. Minikube runs a single-node Kubernetes cluster inside a VM on your laptop for users looking to try out Kubernetes or develop with it day-to-day.

You can use it to test your application before pushing it to [Kubernetes](http://kubernetes.io/).

## More information

*   [Kubernetes documentation](http://kubernetes.io/docs/)
