---
layout: default
title: Traefik
permalink: /traefik/
sitemap:
    priority: 0.7
    lastmod: 2019-01-29T00:00:00-00:00
---

# <i class="fa fa-exchange"></i> Traefik

## Traefik overview

[Traefik](https://traefik.io/) is a modern HTTP reverse proxy and load balancer made to deploy microservices with ease.

It can route HTTP requests like Zuul, so it has some overlap with a [JHipster gateway]({{ site.url }}/api-gateway/), but it works on a lower level than an API Gateway: it only routes HTTP requests and does not provide rate limiting, security or Swagger documentation aggregation.

One of the benefits of Traefik is that is can work with many different service discovery solutions: with JHipster, however, it only works with [Consul]({{ site.url }}/consul/) by default.

It can be used in two different architecture styles, described below.

## Architecture diagram 1: default configuration

As Traefik is a reverse proxy and load balancer, it supercedes Zuul, and it routes directly all HTTP requests to the correct service.

<img src="{{ site.url }}/images/microservices_architecture_detail.004.png" alt="Diagram" style="width: 800; height: 600" class="img-responsive"/>

In that architecture, a JHipster "gateway" is not a real gateway anymore, it is mostly here to serve the Angular application.

This is our default configuration.

## Architecture diagram 2: Traefik and Zuul

Traefik can also work with Zuul: in that case, an HTTP request to a microservice goes through Traefik and then through Zuul before reaching its destination.

<img src="{{ site.url }}/images/microservices_architecture_detail.005.png" alt="Diagram" style="width: 800; height: 600" class="img-responsive"/>

This makes one more network request, and thus is less efficient than the previous architecture. However, this allows to use a JHipster gateway to its full potential: it can handle rate limiting or Swagger documentation aggregation.

As a result, Traefik can be used as an edge service, which allows to scale JHipster gateways.

This configuration works out-of-the-box with JHipster: the only issue is that client-side applications use an absolute URL, so for example, for "microservice1":

- The default URL is "/services/microservice1", which goes only through Traefik (this is the "default configuration" above).
- The "/services/gateway/microservice1" URL would use the "gateway" application configured in Traefik, which would then use Zuul to reach the "microservice1" application.

## Getting started

Please note that Traefik only works with [Consul]({{ site.url }}/consul/), so this cannot work if you use a [JHipster Registry]({{ site.url }}/jhipster-registry/).

To use Traefik in a microservice architecture, run the [docker-compose sub-generator]({{ site.url }}/docker-compose/) and select Traefik when you have the question asking you which gateway you want to use.

This will generate a `traefik.yml` configuration for running Traefik in Docker, as well as a `traefik/traefik.toml` file, which is Traefik's configuration file.

This configuration file is set up so that:

- Traefik runs on port `80`, so if you have an application called `gateway`, you can reach it by going to [http://localhost/services/gateway/](http://localhost/gateway/).
- The Traefik administration UI is available on port `28080`, so you can visit it at [http://localhost:28080](http://localhost:28080).

As Traefik is using Consul, it will also be useful to check the Consul administration UI, which is available on port `8500`: [http://localhost:8500](http://localhost:8500).

#### Configure your Base HREF

Before building the gateway's Docker image, you will need to configure the `baseHref` value in `webpack.common.js` to match the gateway base name.  For example, if the gateway base name is `gateway`, the `baseHref` should be `/services/gateway/`.

#### Configure for OAuth 2.0
If you have separated the frontend and the api, you don't need to perform additional configuration locally.
just use `npm start` and go to `http://localhost:9000`

Before building the gateway's Docker image, it is necessary to [Configure your Base HREF](#configure-your-base-href) and update various files.

##### Server
In `src/main/java/.../config/SecurityConfiguration.java`, you have to change the `defaultSuccessUrl` in spring.
For example, if the gateway base name is `gateway`, under `.oauth2Login()` you have to add `.defaultSuccessUrl("/services/gateway/")`.

You can now launch all your infrastructure by running `docker-compose up -d`.