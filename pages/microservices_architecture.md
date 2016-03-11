---
layout: default
title: Microservices Architecture
permalink: /microservices-architecture/
sitemap:
    priority: 0.7
    lastmod: 2016-03-10T00:00:00-00:00
---

# <i class="fa fa-sitemap"></i> Microservices Architecture

## Overview

The JHipster microservices architecture works in the following way:

 * The [JHipster Registry] is a runtime application, using the usual JHipster structure, on which all applications registers.
 * A gateway is a JHipster-generated application (using application type microservice gateway when you generate it) that handles Web traffic, and serves an AngularJS application. There can be several different gateways, if needed.
 * Microservices are JHipster-generated applications (using application type microservice application when you generate them), that handle REST requests. They are stateless, and several instances of them can be launched in parallel to handle heavy loads.

![Diagram]({{ site.url }}/images/microservices_architecture_1.png)

### JHipster Registry

https://github.com/jhipster/jhipster-registry/blob/master/README.md

### JHipster Console

JHipster monitoring & alerting console, based on ELK

https://github.com/jhipster/jhipster-console/blob/master/README.md


[JHipster Registry](https://github.com/jhipster/jhipster-registry)