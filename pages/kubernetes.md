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

# Deploying to Kubernetes

This sub-generator allows deployment of your JHipster application to [Kubernetes](http://kubernetes.io/).

[![]({{ site.url }}/img/logo-kubernetes.png)](http://kubernetes.io/)

## Running the sub-generator

To deploy your application to Kubernetes, run this command:

`yo jhipster:kubernetes`

This should package your application in "production" mode, create a Kubernetes application with a database, upload your code, and start the application.

## Updating your deployed application

### Preparing a new deployment

When your application is already deployed, you can prepare a new deployment by typing:

`./mvnw package -Pprod -DskipTests`

Or when using gradle:

`./gradlew -Pprod bootRepackage -x test`

### Pushing to production


## Deploying Microservices


## Troubleshooting


## More information

*   [Kubernetes documentation](http://kubernetes.io/docs/)
