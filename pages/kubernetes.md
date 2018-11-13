---
layout: default
title: Deploying to Kubernetes
permalink: /kubernetes/
redirect_from:
  - /kubernetes.html
sitemap:
    priority: 0.7
    lastmod: 2018-06-10T00:00:00-00:00
---

# Deploying to Kubernetes

This sub-generator allows deployment of your JHipster application to [Kubernetes](http://kubernetes.io/).

[![]({{ site.url }}/images/logo/logo-kubernetes.png)](http://kubernetes.io/)

## Limitations

- Cassandra is not supported yet
- Kubernetes v1.9+ is required

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

If you choose [Google Container Registry](https://cloud.google.com/container-registry/), then it'll be `gcr.io/[PROJECT ID]`, or a regional registry, such as `eu.grc.io/[PROJECT ID]`, `us.gcr.io/[PROJECT ID]`, or `asia.gcr.io/[PROJECT ID]`. See [Pushing and Pulling Images](https://cloud.google.com/container-registry/docs/pushing-and-pulling) for more detial.

### What command should we use for push Docker image to repository?

The default command to push to Docker Hub is `docker image push`

If you use Google Container Registry to host your Docker images, it will be: `gcloud docker push`

## Updating your deployed application

### Preparing a new deployment

When your application is already deployed, you can re-deploy it by building a new Docker image:

`./mvnw package -Pprod -DskipTests jib:dockerBuild`

Or when using Gradle:

`./gradlew -Pprod bootWar jibDockerBuild -x test`

### Pushing to Docker Hub

Tag locally your image:

`docker image tag application username/application`

Push your image to Docker Hub:

`docker image push username/application`

## Deploying a monolith application

Deploy your application:

`kubectl apply -f application/`

It will create a Kubernetes deployment for your application and its associated dependent services (database, Elasticsearch...) as well as a Kubernetes service to expose the application to the outside.

## Deploying a microservice application

Before deploying your microservices, first deploy the service discovery service (JHipster Registry or Consul). If you selected JHipster Console or Prometheus, it is recommended to deploy them before the microservices. The sub-generator placed a README file with the correct order of execution.

### Custom namespaces

It is possible to specify a custom namespace for the entire deployment. To perform custom commands, you have to specify the target namespace, like in this example:

`kubectl get pods -n <custom-namespace>`

### Scaling your deployments

You can scale your applications using

`kubectl scale deployment <app-name> --replicas <replica-count> `

### Zero downtime deployments

The default way to update a running application in Kubernetes is to deploy a new image tag to your Docker registry and then deploy it using:

`kubectl set image deployment/<app-name>-app <app-name>=<new-image>`

Using livenessProbes and readinessProbe allows you to tell Kubernetes about the state of your applications, in order to ensure availability of your services. You will need a minimum of 2 replicas for every application if you want to have zero downtime deployment. This is because the rolling upgrade strategy first kills a running replica in order to place a new one. Running only one replica will cause a short downtime during upgrades.

### Deploying a Service Registry in Kubernetes

Although Kubernetes features its own internal service discovery with **Kube-DNS**, JHipster rely on Spring Cloud for service discovery, so it depends on a third party service registry like Eureka or Consul. This has the advantage of being platform independent and to work similarly in production and on a local development machine.

Consequently, for microservices applications, the JHipster Kubernetes sub-generator will generate Kubernetes manifest files to deploy service registries like the **JHipster-Registry** (based on Eureka) or **Consul**. Moreover, the generated microservices and gateway Kubernetes manifests will contains the appropriate configuration to register themselves to their central registry.

### Managing the JHipster Registry or Consul in Kubernetes

For the JHipster Registry and Consul, [StatefulSets](https://kubernetes.io/docs/concepts/abstractions/controllers/statefulsets/) configurations are provided. Those are a special kind of Kubernetes resources that can handle stateful applications and will let you scale your service registries for high availability. For more information on high-availability for Eureka and Consul refer to their respective documentation.

### Centralized configuration in Kubernetes

Centralized configuration is also setup using either **Spring Cloud Config Server** (when using the JHipster Registry) or the **Consul Key/Value store** (when using Consul). By default, both configuration servers load their configuration from a Kubernetes [ConfigMap](http://kubernetes.io/docs/user-guide/configmap/) which contains property files in this format:

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

By default, configuration servers run in development mode, which means that YAML property files are read directly from the filesystem and hot-reloaded on changes. For production it is advised to setup configuration from a Git repository as explained in our microservice documentation for the [JHipster-Registry config server]({{ site.url }}/jhipster-registry) and [Consul config server]({{ site.url }}/consul).

### Exposing headless services

The registry is deployed using a headless service in Kubernetes, so the primary service has no IP address, and cannot get a node port. You can create a secondary service for any type, using:

`kubectl expose service jhipster-registry --type=NodePort --name=exposed-registry `

and explore the details using

`kubectl get svc exposed-registry `

For scaling the JHipster Registry, use

`kubectl scale statefulset jhipster-registry --replicas 3 `

## Monitoring tools

The sub-generator provides monitoring tools and configuration for usage with your applications.

### JHipster Console

Your application logs can be found in JHipster Console (powered by Kibana). You can find its service details by
`kubectl get svc jhipster-console `

Point your browser to an IP of any of your nodes and use the node port described in the output.

### Prometheus metrics

If not already done, install the [Prometheus operator by CoreOS](https://github.com/coreos/prometheus-operator). You can quickly deploy the operator using

`kubectl create -f https://raw.githubusercontent.com/coreos/prometheus-operator/master/bundle.yaml`

**hint**: More information on how to enable and protect prometheus metrics in your application you can find in our [monitoring documentation]({{ site.url }}/monitoring/#configuring-metrics-forwarding).

The Prometheus instance for your applications can be explored using

`kubectl get svc prometheus-appname `

## Taking Advantage of Kubernetes

Kubernetes offers a number of facilities out-of-the-box to help with Microservices deployments, such as:
* Service Registry - Kubernetes `Service` is a first-class citizen that provides service registry and lookup via DNS name.
* Load Balancing - Kubernetes Service acts as a L4 load balancer
* Health Check - Liveness probes and readiness probes help determine the health of the service.
* Configuration - Kubernetes `ConfigMap` can be used to store and apply configuration outside of the application.

There are a number of benefits of using Kubernetes facilities:
* Simplified deployment
* No need for additional Eureka/Consul deployment
* No need for Zuul to proxy/route requests
* No need for Ribbon

At the same time, there are some drawbacks:
* No Application Management through JHipster Registry - This function relies on Spring Cloud's `DiscoveryClient`. This can be updated in the future to add `spring-cloud-kubernetes`
* No local Docker Compose support - You must use `minikube` for local development, and use Ingress to route traffic
* No request-level load balancing - Kubernetes Service is a L4 load balancer that load balances per connection. Use Istio for request level load balancing (see below).

### Using Kubernetes as Service Registry

To avoid relying on Eureka or Consul, you'll need to disable service discovery altogether
* When asked `Which service discovery server do you want to use?`, simply choose `No service discovery`

A JHipster Gateway usually fronts the API calls and routing these calls using `Zuul`. Without a service registry, routing via `Zuul` won't work. You'll need to use Kubernetes `Ingress` to route the traffic to microservices.
* When asked `Choose the kubernetes service type for your edge services`, choose `Ingress`.

## Istio

You can deploy microservices into [Istio](https://istio.io)-enabled Kubernetes cluster. While Kubernetes manages microservices deployment and configuration, Istio can manage service to service communication, such as request-level load balancing, retries, circuit breakers, traffic routing/splitting, and more.

To enable Istio support:
* When asked `Do you want to configure Istio?`, choose one of the Istio options
* When asked `Do you want to generate Istio route files`, choose `Yes` to generate default configuration for circuit breaking, etc.

## Troubleshooting

> My applications don't get pulled, because of 'imagePullBackoff'

Check the registry your Kubernetes cluster is accessing. If you are using a private registry, you should add it to your namespace by `kubectl create secret docker-registry` (check the [docs](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/) for more information).

> My applications get killed, before they can boot up

This can occur, if your cluster has low resources (e.g. Minikube). Increase the `initialDelySeconds` value of livenessProbe of your deployments.

> My applications are starting very slow, despite I have a cluster with many resources

The default setting is optimized for middle-scale clusters. You are free to increase the JAVA_OPTS environment variable, resource requests and limits to improve the performance. Be careful!

> I have selected Prometheus but no targets are visible

This depends on the setup of Prometheus operator and the access control policies in your cluster. Version 1.6.0+ is needed for the RBAC setup to work.

> I have selected Prometheus, but my targets never get scraped

This means your applications are probably not built using the `prometheus` profile in Maven/Gradle

> My SQL-based microservice are stuck during Liquibase initialization when running multiple replicas

Sometimes the database changelog lock gets corrupted. You will need to connect to the database using `kubectl exec -it` and removes all lines of liquibases `databasechangeloglock` table.

## More information

*   [Kubernetes documentation](http://kubernetes.io/docs/)
