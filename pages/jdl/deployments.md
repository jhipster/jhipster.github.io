---
layout: default
title: JHipster Domain Language - Deployments
permalink: /jdl/deployments
sitemap:
    priority: 0.5
    lastmod: 2019-10-27T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster Domain Language (JDL) - Deployments

## Summary

1. [Syntax](#syntax)
1. [Examples](#examples)
1. [Available deployment options](#available-deployment-options)

---

### Syntax

The deployment declaration is done as follows:

```
deployment {
  <deployment option name> <deployment option value>
}
```

  - Similar to applications, deployment declaration works by specifying option keys & values

---

### Examples

#### Basic example

```jdl
deployment {
  deploymentType docker-compose
  appsFolders [foo, bar]
  dockerRepositoryName "yourDockerLoginName"
}
```

---

#### More than one deployment

If you want more than one deployment, here's how you do it:

```
// will be created under 'docker-compose' folder
deployment {
  deploymentType docker-compose
  appsFolders [foo, bar]
  dockerRepositoryName "yourDockerLoginName"
}

// will be created under 'kubernetes' folder
deployment {
  deploymentType kubernetes
  appsFolders [foo, bar]
  dockerRepositoryName "yourDockerLoginName"
}
```

You can have one deployment per `deploymentType`. The applications defined in `appsFolders` should be in the same 
folder where you are creating deployments or in the folder defined in `directoryPath`.

For example, above you need to have a folder structure like this:

```
.
├── yourJdlFile.jdl
├── foo
├── bar
├── kubernetes // will be created by the JDL
└── docker-compose // will be created by the JDL
```

---

### Available deployment options

Here are the deployment options supported in the JDL:

<table class="table table-striped table-responsive">
  <tr>
    <th>JDL option name</th>
    <th>Default value</th>
    <th>Possible values</th>
    <th>Comment</th>
  </tr>
  <tr>
    <td>deploymentType</td>
    <td>docker-compose</td>
    <td>docker-compose, kubernetes, openshift</td>
    <td></td>
  </tr>
  <tr>
    <td>directoryPath</td>
    <td>"../"</td>
    <td></td>
    <td>Relative path. Must be in double quotes</td>
  </tr>
  <tr>
    <td>appsFolders</td>
    <td>[]</td>
    <td></td>
    <td>Directory names for the applications separated by comma. Must be a list, example [foo, bar]</td>
  </tr>
  <tr>
    <td>clusteredDbApps</td>
    <td>[]</td>
    <td></td>
    <td>Directory names for the applications with clustered DB separated by comma. Must be a list, example [foo, bar]</td>
  </tr>
  <tr>
    <td>gatewayType</td>
    <td>zuul</td>
    <td>zuul, traefik</td>
    <td>Value is ignored when serviceDiscoveryType is `no`</td>
  </tr>
  <tr>
    <td>monitoring</td>
    <td>no</td>
    <td>no, elk, prometheus</td>
    <td></td>
  </tr>
  <tr>
    <td>consoleOptions</td>
    <td>[]</td>
    <td>[curator, zipkin]</td>
    <td>Must be a list</td>
  </tr>
  <tr>
    <td>serviceDiscoveryType</td>
    <td>eureka</td>
    <td>eureka, consul, no</td>
    <td></td>
  </tr>
  <tr>
    <td>dockerRepositoryName</td>
    <td></td>
    <td></td>
    <td>The name or URL of the docker repository. Must be in double quotes</td>
  </tr>
  <tr>
    <td>dockerPushCommand</td>
    <td>"docker push"</td>
    <td></td>
    <td>The docker push command to use. Must be in double quotes</td>
  </tr>
  <tr>
    <td>kubernetesNamespace</td>
    <td>default</td>
    <td></td>
    <td>Applicable only when deploymentType is kubernetes</td>
  </tr>
  <tr>
    <td>kubernetesServiceType</td>
    <td>LoadBalancer</td>
    <td>LoadBalancer, NodePort, Ingress</td>
    <td>Applicable only when deploymentType is kubernetes</td>
  </tr>
  <tr>
    <td>ingressDomain</td>
    <td></td>
    <td></td>
    <td>The domain for Ingress when kubernetesServiceType is `Ingress`. Must be in double quotes. Applicable only when deploymentType is kubernetes</td>
  </tr>
  <tr>
    <td>istio</td>
    <td>false</td>
    <td>true, false</td>
    <td>Applicable only when deploymentType is kubernetes</td>
  </tr>
  <tr>
    <td>openshiftNamespace</td>
    <td>default</td>
    <td></td>
    <td>Applicable only when deploymentType is openshift</td>
  </tr>
  <tr>
    <td>storageType</td>
    <td>ephemeral</td>
    <td>ephemeral, persistent</td>
    <td>Applicable only when deploymentType is openshift</td>
  </tr>
</table>
