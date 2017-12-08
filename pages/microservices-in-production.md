---
layout: default
title: Microservices in production
permalink: /microservices-in-production/
sitemap:
    priority: 0.7
    lastmod: 2017-05-03T00:00:00-00:00
---

# <i class="fa fa-cloud"></i> Microservices in production

Microservices are a specific kind of JHipster applications. Please refer to our main [Using JHipster in production documentation]({{ site.url }}/production) for more information on doing a production build, optimizing it and securing it.

## <a name="elk"></a> Microservices monitoring

Please refer to our [JHipster Registry documentation]({{ site.url }}/jhipster-registry) for learning which runtime dashboards are available, and how to use them.

Our [monitoring documentation]({{ site.url }}/monitoring) is also very important, to learn specific information on using:

- The JHipster Console to use ELK with your microservices architecture
- Zipkin to trace HTTP requests throughout your services
- Elastalert to get alerted when an issue occurs

When using the Docker-Compose sub-generator, you will be asked if you want to add monitoring to your infrastructure. This option will add the JHipster Console to your `docker-compose.yml` file. Once started, it will be available on [http://localhost:5601](http://localhost:5601) and start to gather your applications' logs and metrics.

For gateways and microservices applications, additional features are provided to help you effectively monitor a microservices cluster. For example logs are enriched with each application's name, host, port and Eureka/Consul ServiceId so that you can trace from which service instance they are originating from. The JHipster Console also comes with default dashboards that give you an overview of all your services metrics.

## <a name="docker_compose"></a> Using Docker Compose to develop and deploy

Working on a microservices architecture means you will need several different services and databases working together, and in that context Docker Compose is a great tool to manage your development, testing and production environments.

A specific section on microservices is included in our [Docker Compose documentation]({{ site.url }}/docker-compose#microservices), and we highly recommend that you get familiar with it when working on a microservices architecture.

As Docker Swarm uses the same API as Docker Machine, deploying your microservices architecture in the cloud is exactly the same as deploying it on your local machine. Follow our [Docker Compose documentation]({{ site.url }}/docker-compose/) to learn more about using Docker Compose with JHipster.

## <a name="cloudfoundry"></a> Going to production with Cloud Foundry

The [Cloud Foundry sub-generator]({{ site.url }}/cloudfoundry/) works the same with a microservices architecture, the main difference is that you have more applications to deploy:

- Use the [Cloud Foundry sub-generator]({{ site.url }}/cloudfoundry/) to deploy first the JHipster Registry (which is a normal JHipster application).
- Note the URL on which your JHipster Registry is deployed. Your applications must all point to that URL:
  - In the `bootstrap-prod.yml` file, the `spring.cloud.config.uri` must point to `http(s)://<your_jhipster_registry_url>/config/`
  - In the `application-prod.yml` file, the `eureka.client.serviceUrl.defaultZone` must point to `http(s)://<your_jhipster_registry_url>/eureka/`
- Deploy your gateway(s) and microservices
- Scale your applications as usual with Cloud Foundry

One important point to remember is that the JHipster Registry isn't secured by default, and that the microservices are not supposed to be accessible from the outside world, as users are supposed to use the gateway(s) to access your application.

Two solutions are available to solve this issue:

- Secure your Cloud Foundry using specific routes.
- Keep everything public, but use HTTPS everywhere, and secure your JHipster Registry using Spring Security's basic authentication support

## <a name="heroku"></a> Going to production with Heroku

The [Heroku sub-generator]({{ site.url }}/heroku/) works nearly the same with a microservices architecture, the main difference is that you have more applications to deploy:

Deploy a JHipster Registry directly with one click:

[![Deploy to Heroku](https://camo.githubusercontent.com/c0824806f5221ebb7d25e559568582dd39dd1170/68747470733a2f2f7777772e6865726f6b7563646e2e636f6d2f6465706c6f792f627574746f6e2e706e67)](https://dashboard.heroku.com/new?&template=https%3A%2F%2Fgithub.com%2Fjhipster%2Fjhipster-registry)

Please follow the [Heroku sub-generator documentation]({{ site.url }}/heroku/) in order to understand how to secure your JHipster Registry.

Note the URL on which your JHipster Registry is deployed. Your applications must all point to that URL in their `application-prod.yml` file. Change that configuration to be:

    eureka:
        instance:
            hostname: https://admin:[password]@[appname].herokuapp.com
            prefer-ip-address: false

You can now deploy and scale the gateway(s) and microservices. The Heroku sub-generator will ask you a new question, to know the URL of your JHipster Registry: this will allow your applications to fetch their configuration on the Spring Cloud Config server.
