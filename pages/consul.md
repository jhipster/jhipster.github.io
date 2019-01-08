---
layout: default
title: Consul
permalink: /consul/
sitemap:
    priority: 0.7
    lastmod: 2017-05-03T00:00:00-00:00
---

# <i class="fa fa-bullseye"></i> Consul

## Consul overview

As an alternative to the JHipster Registry you can choose to use [Consul](https://www.consul.io/), a datacenter management solution from Hashicorp.
Compared to Eureka it has a number of advantages:

- It is easier to operate in a multi-node cluster than Eureka.
- It favors consistency over availability so changes in the state of your cluster are propagated more quickly.
- Consul service discovery can simply interoperate with existing applications through its [DNS interface](https://www.consul.io/docs/agent/dns.html) or [HTTP API](https://www.consul.io/docs/agent/http.html).

## Architecture diagram

<img src="{{ site.url }}/images/microservices_architecture_detail.003.png" alt="Diagram" style="width: 800; height: 600" class="img-responsive"/>

## Getting started

To get started with developing applications that rely on a Consul registry, you can start a Consul instance in a docker container:

- run `docker-compose -f src/main/docker/consul.yml up` to start a Consul server in `dev` mode. Consul will then be available on port `8500` of your Docker host, so if it runs on your machine it should be at [http://127.0.0.1:8500/](http://127.0.0.1:8500/).

You can also use the [Docker Compose subgenerator]({{ site.url }}/docker-compose/#docker-compose-subgen) to generate a docker configuration for several consul-enabled applications.

## Application configuration with Consul

If you have chosen the Consul option when generating your JHipster microservice or gateway app, they will be automatically configured to retrieve their configuration from Consul's **Key/Value store**.

The Key/Value (K/V) store can be modified using either its UI available at [http://localhost:8500/v1/kv/](http://localhost:8500/v1/kv/) or its [REST API](https://www.consul.io/intro/getting-started/kv.html). However changes made this way are temporary and will be lost on Consul server/cluster shutdown. So, in order to help you interact easily with the Key/Value store and manage your configuration as simple YAML files, the JHipster Team has developed a small tool: the [consul-config-loader](https://github.com/jhipster/consul-config-loader). The **consul-config-loader** is automatically configured when starting Consul from the `consul.yml` docker-compose file but it can also be run as a standalone tool.
It can be run in two modes:

- a **dev** mode, where YAML files from the `central-server-config` directory are automatically loaded into Consul. Moreover any change to this directory will be immediately synchronized with Consul.
- a **prod** mode, that uses Git2Consul to setup the YAML files contained in a Git repository as a configuration source for the Key/Value store.

Note that as with the JHipster Registry, your configuration files will need to be named `appname-profile.yml` where appname and profile correspond to the application’s name and profile of the service that you want to configure. For example, adding properties in a `consulapp-prod.yml` file will set those properties only for the application named `consulapp` started with a `prod` profile. Moreover, properties defined in `application.yml` will be set for all your applications.
