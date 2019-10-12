---
layout: default
title: Deploying to Google Cloud Platform
permalink: /gcp/
sitemap:
    priority: 0.5
    lastmod: 2018-10-02T00:00:00-00:00
---

# <i class="fa fa-cloud-upload"></i> Deploying to Google Cloud Platform

[![Google Cloud Platform]({{ site.url }}/images/logo/logo-gcp.png)](https://cloud.google.com)

You can deploy JHipster applications to Google Cloud Platform easily and run on:
- Virtual machines with [Google Compute Engine](https://cloud.google.com/compute/)
- Containers in Kubernetes with [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/)
- Platform as a Service with [Google App Engine](https://cloud.google.com/appengine/)

You can obtain [Google Cloud Platform free trial](https://cloud.google.com/free) to deploy your applications. Please check the [Always Free](https://cloud.google.com/free/) tiers for free usages up to the specified usage limits during and past the free trial period.

## Before you start

Install and authenticate with the gcloud SDK on your local environment to access `gcloud` CLI. For more information, visit this link:

- [Install gcloud SDK](https://cloud.google.com/sdk/install)

## Deploy to Google App Engine

Google App Engine is a fully managed Platform as a Service that can automatically scale up application instances under load, and scale down to zero when not used.

You can use the Google App Engine generator to generate and deploy JHipster application. Google App Engine generator supports monolith application, with Cloud SQL MySQL/PostgreSQL database.

1. Generate a new monolith application: `jhipster`
1. Run Google App Engine generator: `jhipster gae`
1. Optionally create a new Cloud SQL instance if creating a brand new application

This generator will:
1. Add `src/main/appengine/app.yaml` that describes the App Engine instance and scaling configuration.
1. Add the App Engine plugin to Maven / Gradle.

To deploy:
Please note that currently the Google App Engine generator only supports deployments to [App Engine Standard (Java 11)](https://cloud.google.com/appengine/docs/standard/java11/) environment. 

1. Use the App Engine plugin to deploy: `./mvnw package appengine:deploy -DskipTests -Pgae,prod-gae` or using Gradle `./gradlew appengineDeploy -Pgae -Pprod-gae`

2. If you are using Cloud SQL, you need to add Cloud SQL Client role to the App Engine service account. Refer, https://cloud.google.com/sql/docs/mysql/connect-app-engine#setting_up

In addition, Google App Engine provides a full suite of features to manage your application:
- Traffic Splitting - Deploy multiple versions of your application and split traffic to different versions. This is also great for canary new changes.
- Stackdriver Logging - Automatically capture and store application logs in centralized logging that can be searched, monitored, and exported.
- Error Reporting - Automatically extract errors and exceptions for the log and notify you of new errors.
- Cloud Debugger - Allow you to debug your production application without stopping the world. If you needed more log messages to diagnose the issue, simply add new log messages without redeploying/restarting your application.

You can watch a walk through of features in [2018 JHipster Conf video on the Google App Engine generator](https://www.youtube.com/watch?v=J9_MW3HOj5w) with [Ray Tsang](https://twitter.com/saturnism) and [Ludovic Champenois](https://twitter.com/ludoch).

## Deploy to Google Kubernetes Engine

Google Kubernetes Engine is a fully managed Kubernetes cluster as a service. Once provisioned, you can deploy your containers and JHipster applications using standard Kubernetes commands.

1. Enable API: `gcloud services enable container.googleapis.com containerregistry.googleapis.com`
1. Install `kubectl` CLI if not already installed: `gcloud components install kubectl`
1. Create a new Google Kubernetes Engine cluster: `gcloud container clusters create mycluster`

Once the cluster is created, you can use JHipster Kubernetes generator to generate the deployment descriptors.

1. Generate Kubernetes deployment files: `jhipster kubernetes`
1. If you want to use Google Container Registry to host container images in a private registry:
  1. **What should we use for the base Docker repository name** set to `gcr.io/YOUR_PROJECT_ID`

Build the container image.

1. If you use Google Container Registry, you can build directly to the registry without local Docker daemon: `./mvnw package -Pprod jib:build`
1. Otherwise, build to Docker daemon: `./mvnw package -Pprod jib:dockerBuild`

Deploy to Kubernetes cluster:

1. Apply the Kubernetes configurations: `./kubectl-apply.sh`

For full Kubernetes generator features, see [Deploying to Kubernetes](/kubernetes).
