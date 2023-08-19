---
layout: default
title: Doing microservices with JHipster
permalink: /microservices-architecture/
sitemap:
    priority: 0.7
    lastmod: 2021-03-08T12:00:00-00:00
---

# <i class="fa fa-sitemap"></i> Doing microservices with JHipster

<h2 id="microservices_vs_monolithic">Microservices vs Monolithic architecture</h2>

The first question JHipster will ask you is the kind of application you want to generate. You have the choice between two architecture styles:

- A "monolithic" architecture uses a single, one-size-fits-all application, which contains both the front-end code, and the back-end Spring Boot code.
- A "microservices" architecture splits the front-end and the back-end, so that it's easier for your application to scale and survive infrastructure issues.

A "monolithic" application is much easier to work on, so if you don't have any specific requirements, this is the option we recommend, and our default option.

<h2 id="overview">Microservices architecture overview</h2>

The JHipster microservices architecture works in the following way:

 * A [gateway]({{ site.url }}/api-gateway/) is a JHipster-generated application (using application type `microservice gateway` when you generate it) that handles Web traffic, and serves an Angular/React/VueJs application. There can be several different gateways, if you want to follow the [Backends for Frontends pattern](https://www.thoughtworks.com/insights/blog/bff-soundcloud), but that's not mandatory.
 * [Consul]({{ site.url }}/consul/) is a service discovery service, as well as a key/value store.
 * The [JHipster Registry]({{ site.url }}/jhipster-registry/) is a runtime application on which all applications registers and get their configuration from. It also provides runtime monitoring dashboards. It can be used as an alternative to Consul.
 * [Microservices]({{ site.url }}/creating-microservices/) are JHipster-generated applications (using application type `microservice application` when you generate them), that handle REST requests. They are stateless, and several instances of them can be launched in parallel to handle heavy loads.

In the diagram below, the green components are specific to your application and the blue components provide its underlying infrastructure.

<img src="{{ site.url }}/images/microservices_architecture_2.png" alt="Diagram" style="width: 930px; height: 558px"/>
