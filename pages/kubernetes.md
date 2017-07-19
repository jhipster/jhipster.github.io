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

[![]({{ site.url }}/images/logo/logo-kubernetes.png)](http://kubernetes.io/)

## Limitations

- Cassandra is not supported yet

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

Before deploying your microservices, first deploy the service discovery service (JHipster Registry or Consul). If you selected JHipster Console or Prometheus, it is recommended to deploy them before the microservices. The sub-generator placed a README file with the correct order of execution.

### custom namespaces

It is possible to specify a custom namespace for the entire deployment. To perform custom commands, you have to specify the target namespace, like in this example:

`kubectl get pods -n <custom-namespace>`

### Scaling your deployments

You can scale your apps using 

`kubectl scale deployment <app-name> --replicas <replica-count> `

### zero-downtime deployments

The default way to update a running app in kubernetes is to deploy a new image tag to your docker registry and then deploy it using

`kubectl set image deployment/<app-name>-app <app-name>=<new-image>`

Using livenessProbes and readinessProbe allows you to tell kubernetes about the state of your apps, in order to ensure availability of your services. You will need minimum 2 replicas for every app deployment, you want to have zero-downtime deployed. This is because the rolling upgrade strategy first kills a running replica in order to place a new. Running only one replica will cause a short downtime during upgrades.

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

### exposing headless service

The registry is deployed using a headless service in kubernetes, so the primary service has no IP address, and cannot get a node port. You can create a secondary service for any type, using:

`kubectl expose service jhipster-registry --type=NodePort --name=exposed-registry `

and explore the details using

`kubectl get svc exposed-registry `

For scaling the JHipster registry, use

`kubectl scale statefulset jhipster-registry --replicas 3 `

## Monitoring tools

The sub-generator provides monitoring tools and configuration for usage with your apps.

### JHipster console

Your application logs can be found in JHipster console (powered by Kibana). You can find its service details by
`kubectl get svc jhipster-console `

Point your browser to an IP of any of your nodes and use the node port described in the output.

### Prometheus metrics

If not already done, install the [Prometheus operator by CoreOS](https://github.com/coreos/prometheus-operator). You can quickly deploy the operator using 


`kubectl create -f https://raw.githubusercontent.com/coreos/prometheus-operator/master/bundle.yaml`

**hint**: use must build your apps with `prometheus` profile active!

The prometheus instance for your apps can be explored using

`kubectl get svc prometheus-appname `

## Troubleshooting

> my apps doesn't get pulled, because of 'imagePullBackof'

check the registry your kubernetes cluster is accessing. If you are using a private registry, you should add it to your namespace by `kubectl create secret docker-registry` (check the [docs](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/) for more info)

> my apps get killed, before they can boot up

This can occur, if your cluster has low resource (e.g. Minikube). Increase the `initialDelySeconds` value of livenessProbe of your deployments

> my apps are starting very slow, despite I have a cluster with many resources

The default setting is optimized for middle scale clusters. You are free to increase the JAVA_OPTS environment variable, and resource requests and limits to improve the performance. Be careful!

> I have selected prometheus but no targets are visible

This depends on the setup of prometheus operator and the access control policies in your cluster. Version 1.6.0+ is needed for the RBAC setup to work.

> I have selected prometheus, but my targets never get scraped

This means your apps are probably not built using the `prometheus` profile in Maven/Gradle

> my SQL based microservice stuck during liquibase initialization when running multiple replicas


Sometimes the database changelog lock gets corrupted. You will need to connect to the database using `kubectl exec -it` and removes all lines of liquibases `databasechangeloglock` table.


## More information

*   [Kubernetes documentation](http://kubernetes.io/docs/)
