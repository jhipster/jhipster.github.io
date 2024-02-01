---
layout: default
title: Deploying to Google Cloud Platform
permalink: /gcp/
sitemap:
    priority: 0.5
    lastmod: 2023-12-19T00:00:00-00:00
---

# <i class="fa fa-cloud-upload"></i> Deploying to Google Cloud Platform

[![Google Cloud Platform]({{ site.url }}/images/logo/logo-gcp.png)](https://cloud.google.com)

You can deploy JHipster applications to Google Cloud Platform and run on:
- Virtual machines with [Google Compute Engine](https://cloud.google.com/compute/)
- Containers in Kubernetes with [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/)
- Platform as a Service with [Google App Engine](https://cloud.google.com/appengine/)

You can obtain [Google Cloud Platform free trial](https://cloud.google.com/free) to deploy your applications. Please check the [Always Free](https://cloud.google.com/free/) tiers for free usages up to the specified usage limits during and past the free trial.

## Before you start

Install and authenticate with the gcloud SDK on your local environment to access `gcloud` CLI. For more information, visit this link:

- [Install gcloud SDK](https://cloud.google.com/sdk/install)

## Deploy to Google Kubernetes Engine

Google Kubernetes Engine is a fully managed Kubernetes cluster as a service. Once provisioned, you can deploy your containers and JHipster applications using standard Kubernetes commands.

1. Enable API: `gcloud services enable container.googleapis.com containerregistry.googleapis.com`
1. Install `kubectl` CLI if not already installed: `gcloud components install kubectl`
1. Create a new Google Kubernetes Engine cluster: `gcloud container clusters create mycluster --zone us-central1-a --machine-type n1-standard-4`

_See GCP's [zones](https://cloud.google.com/compute/docs/regions-zones/) and [machine-types](https://cloud.google.com/compute/docs/machine-types/) for other options._

Once the cluster is created, you can use JHipster Kubernetes generator to generate the deployment descriptors.

1. Generate Kubernetes deployment files: `jhipster kubernetes`
1. If you want to use Google Container Registry to publish container images in a private registry:
  1. **What should we use for the base Docker repository name** set to `gcr.io/YOUR_PROJECT_ID`

Build the container image.

1. If you use Google Container Registry, you can build directly to the registry without local Docker daemon: `./mvnw package -Pprod jib:build`
1. Otherwise, build to Docker daemon: `./mvnw package -Pprod jib:dockerBuild`

Deploy to Kubernetes cluster:

1. Apply the Kubernetes configurations: `./kubectl-apply.sh`

For full Kubernetes generator features, see [Deploying to Kubernetes](/kubernetes).

## Enable HTTPS

To enable HTTPS for your cluster, see Ray Tsang's [External Load Balancing docs](https://spring-gcp.saturnism.me/deployment/kubernetes/load-balancing/external-load-balancing). 

You can force the use of HTTPS by adding the following configuration to your `SecurityConfiguration.java`.

```java
// Spring MVC
http.requiresChannel(channel -> channel
    .requestMatchers(r -> r.getHeader("X-Forwarded-Proto") != null).requiresSecure());

// WebFlux
http.redirectToHttps(redirect -> redirect
    .httpsRedirectWhen(e -> e.getRequest().getHeaders().containsKey("X-Forwarded-Proto")));
```

See Spring Security's [Servlet](https://docs.spring.io/spring-security/site/docs/5.5.x/reference/html5/#servlet-http-redirect) and [WebFlux](https://docs.spring.io/spring-security/site/docs/5.5.x/reference/html5/#webflux-http-redirect) documentation for more information.
