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

[![]({{ site.url }}/images/logo/logo-kubernetes.png)](http://kubernetes.io/)

## Limitations

- Cassandra is not supported yet
- ELK with [JHipster Console]({{ site.url }}/monitoring/) is not supported yet

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

`jhipster kubernetes`

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

The default command to push to Docker Hub is `docker image push`
For example, if you use the Google Cloud to host your Docker images, it will be: `gcloud docker push`


## Updating your deployed application

### Preparing a new deployment

When your application is already deployed, you can re-deploy it by building a new Docker image:

`./mvnw package -Pprod -DskipTests docker:build`

Or when using gradle:

`./gradlew -Pprod bootRepackage buildDocker -x test`

### Pushing to Docker Hub

Tag locally your image:

`docker image tag application username/application`

Push your image to Docker Hub:

`docker image push username/application`

## Deploying a monolith application

Deploy your application:

`kubectl apply -f application/`

It will create a Kubernetes deployment for your application and its associated dependent services (database, elasticsearch...) as well as a Kubernetes service to expose the application to the outside.

## Deploying a microservice application

### Deploying a Service Registry in Kubernetes

Although, Kubernetes does feature its own internal service discovery with **Kube-DNS**, JHipster rely on Spring Cloud for service discovery, so it depends on a third party service registry like Eureka or Consul. This has the advantage of being platform independent and to work similarly in production and on a local development machine.

Consequently, for microservices applications, the JHipster Kubernetes sub-generator will generate Kubernetes manifest files to deploy service registries like the **JHipster-Registry** (based on Eureka) or **Consul**. Moreover, the generated microservices and gateway Kubernetes manifests will contains the appropriate configuration to register themselves to their central registry.

### Managing the JHipster Registry or Consul in Kubernetes

For the JHipster Registry and Consul, [StatefulSets](https://kubernetes.io/docs/concepts/abstractions/controllers/statefulsets/) configurations are provided. Those are a special kind of Kubernetes resource that can handle stateful applications and will let you scale your service registries for high-availability. For more information on high-availability for Eureka and Consul refer to their respective documentation.

### Centralized configuration in Kubernetes

Centralized configuration is also setup using either **Spring Cloud Config Server** (when using the JHipster-Registry) or the **Consul Key/Value store** (when using Consul). By default, both configuration servers load their configuration from a Kubernetes [ConfigMap](http://kubernetes.io/docs/user-guide/configmap/) which contains property files in this format :

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: application-config
  namespace: default
data:
  application.yml: |- # global properties shared by all applications
    jhipster:
      security:
        authentication:
          jwt:
            secret: secret
  gateway-prod.yml: |- # gateway application properties for the "prod" profile
    foo:
      bar: foobar
```

By default, configuration servers run in development mode, which means that YAML property files are read directly from the filesystem and hot-reloaded on changes. For production it is advised to setup configuration from a git repository as explained in our microservice documentation for the [JHipster-Registry config server](/microservices-architecture/#consul_app_configuration) and [Consul config server](/microservices-architecture/#consul_app_configuration).

## More information

*   [Kubernetes documentation](http://kubernetes.io/docs/)
