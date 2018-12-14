---
layout: default
title: Openshift
permalink: /openshift/
redirect_from:
  - /openshift.html
sitemap:
    priority: 0.7
    lastmod: 2017-04-30T00:00:00-00:00
---

# [BETA] Deploying to OpenShift

**WARNING!** This is a new sub-generator, of **BETA** quality WIP release! Feedback is highly welcome!! Happy OpenShifting!!!

This sub-generator allows deployment of JHipster applications to [Openshift Container Platform](https://www.openshift.com/) / [OpenShift Origin](https://www.openshift.org/).

[![]({{ site.url }}/images/logo/logo-openshift.png)](https://www.openshift.com/)

## Work-in-progress

- Mongo and Cassandra replication mode is not yet tested

## Install Options

OpenShift offers two options,

- OpenShift Origin - is the open source upstream project that powers OpenShift
- OpenShift Container Platform - is the enterprise container application platform supported by Red Hat

## Minishift

[Minishift](https://github.com/minishift/minishift) is a toolkit that makes it easy to run the all in one OpenShift VM locally. Minishift runs a single-node OpenShift cluster inside a VM on a laptop for users to try it out locally.

Minishift requires a hypervisor to start the virtual machine on which the OpenShift cluster is provisioned. Make sure that the hypervisor of your choice is installed and enabled on your system before you start Minishift.

## Pre-requisites

You have to install:

- [Docker](https://docs.docker.com/installation/#installation)
- Hypervisor - Depending on your host OS, you have the choice of different options

You must have a Docker registry. If you don’t have one, you can use the official [Docker Hub](https://hub.docker.com/)

Minishift allows you to try out both Origin and Container Platform locally,

- [OpenShift Origin](https://github.com/minishift/minishift)
- [OpenShift Container Platform](https://developers.redhat.com/products/cdk/overview/) - Red Hat Container Development Kit provides a Minishift packaged pre-built Container Development Environment based on Red Hat Enterprise Linux. Developers can now get Red Hat Container Development Kit via the no-cost Red Hat Enterprise Linux® Developer Suite subscription for development purposes by registering and downloading through [redhat.com](https://developers.redhat.com).

The sub-generator works fine with both Origin and Container Platform and uses the same image versions as Docker.

## Running the sub-generator

To generate config files for OpenShift, run this command in the project/root folder:

`jhipster openshift`

Then answer all the questions to deploy your application.


### Which *type* of application would you like to deploy?

Type of application depends on whether you wish to deploy a microservices or monoliths.


### Enter the root directory where your applications are located

Enter the path. All the OpenShift generator files will be persisted in this path


### Which applications do you want to include in your OpenShift configuration?

Select your applications.


### Enter the admin password used to secure the JHipster Registry admin

This question is only displayed if you choose microservices architecture.


### What should we use for the OpenShift namespace?

This is the OpenShift project space where all the services get deployed and the generated files are tagged to this template


### Which *type* of database storage would you like to use?

This question is only displayed if any of the chosen apps has database type selected. This prompts for ephemeral or persistent storage options. Containers by very nature are ephemeral (data will not be retained between restarts/crashes). Persistent storage option allows
to mount external storage like NFS, EBS etc,. so that data survives between restarts and crashes.


### What should we use for the base Docker repository name?

If you choose [Docker Hub](https://hub.docker.com/) as main registry, it will be your Docker Hub login.


### What command should we use for push Docker image to repository?

The default command to push to Docker Hub is `docker image push`
For example, if you use the Google Cloud to host your Docker images, it will be: `gcloud docker push`


## Updating your deployed application

### Preparing a new deployment

When your application is already deployed, you can re-deploy it by building a new Docker image:

`./mvnw package -Pprod -DskipTests jib:dockerBuild`

Or when using gradle:

`./gradlew -Pprod bootWar jibDockerBuild -x test`

If you face any issue in running the image built by jib plugin (like `chmod +x entrypoint.sh not permitted`), then you might have to update scc. Do the following change,
`oc edit scc restricted` and update `runAsUser.Type` strategy to `RunAsAny`

### Pushing to Docker Hub

Tag locally your image:

`docker image tag application username/application`

Push your image to Docker Hub:

`docker image push username/application`

## Deploying application(s)

Deploy application(s):

You can deploy all your apps by either running:
  `<directoryPath>/ocp/ocp-apply.sh`

OR

  `oc apply -f <directoryPath>/ocp/registry`
  `oc apply -f <directoryPath>/ocp/app1gw`
and then install the apps from OpenShift console by choosing the template created in the chosen namespace

It will create a OpenShift deployment for your application and its associated dependent services (database, elasticsearch...) as well as OpenShift service for pod to pod communications(inter service) and a route to access the application from outside.

## Info regarding microservice application(s)

### Deploying a Service Registry

Although, OpenShift does feature its own internal service discovery with **Kube-DNS**, centralized config management with ConfigMaps and centralized logging through EFK stack, as JHipster relies on Spring Cloud for configuration management, Eureka/Consul for service discovery and jhipster-console(ELK) for log management, OpenShift deployment does support the same as well.

Consequently, for microservices applications, the JHipster OpenShift sub-generator will generate manifest files to deploy the **JHipster-Registry** (based on Eureka) or **Consul**. Moreover, the generated microservices and gateway manifests will contain the appropriate configuration to register themselves to their central registry service.

### Managing the JHipster Registry or Consul

For the JHipster Registry and Consul, [StatefulSets](https://kubernetes.io/docs/concepts/abstractions/controllers/statefulsets/) configurations are provided. Those are a special kind of deployment artifact that can handle stateful applications and will let you scale your service registries for high-availability. Kindly note **StatefulSets** are not yet production ready feature in OpenShift. It is in technology preview (BETA) and you need **OpenShift version >=3.5** to use this feature.

### Centralized configuration

Centralized configuration is also setup using either **Spring Cloud Config Server** (when using the JHipster-Registry) or the **Consul Key/Value store** (when using Consul). By default, both configuration servers load their configuration from a OpenShift [ConfigMap](https://docs.openshift.org/latest/dev_guide/configmaps.html) which contains property files in this format :

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

## Troubleshooting Tips

- If you are running All-in-one VM, make sure to run the following command before pushing docker images,
  ` eval $(docker-machine env <machine_name>) `
- If you face issues running StatefulSets or Services with persistent storage, make sure persistent volumes are properly initialized  
- If you face issues running StatefulSets, check the persistent volume claims. If PVCs' take longer time than usual while initializing, try creating it manually
- After running the generators, make sure you are in the chosen namespace **oc project <namespace>** before applying the oc commands
- Image pulling for services like elasticsearch, registry, console etc,. for the first time will take some time as it needs to be pulled from public registry to the container registry. If any of the dependent services fail because of this, try deploying it once the services with which it is dependent on are up and running.
- Please make sure you have the necessary privilege (may require admin) to run scc service that is required to run some of the pods.

## More information

*   [OpenShift Origin documentation](https://docs.openshift.org/latest/welcome/index.html)
*   [OpenShift Container Platform](https://access.redhat.com/documentation/en/openshift-container-platform/)
*   [Minishift](https://github.com/minishift/minishift#documentation)
*   [OpenShift CLI](https://docs.openshift.org/latest/cli_reference/get_started_cli.html)
