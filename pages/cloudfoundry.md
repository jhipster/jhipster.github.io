---
layout: default
title: Deploying to Cloud Foundry
permalink: /cloudfoundry/
redirect_from:
  - /cloudfoundry.html
sitemap:
    priority: 0.7
    lastmod: 2014-11-04T00:00:00-00:00
---

# Deploying to Cloud Foundry

This sub-generator allows to deploy automatically your JHipster application to a [Cloud Foundry PaaS](http://cloudfoundry.org/).

It works with MySQL, PostgreSQL and MongoDB cloud providers.

## Supported clouds

[![]({{ site.url }}/images/logo/logo-pws.png)](http://run.pivotal.io/)

As this sub-generator uses the Cloud Foundry command-line tool, it can deploy to all Cloud Foundry instances:

*   [Pivotal Web Services](http://run.pivotal.io/), which officially sponsors JHipster, so it is the only one we can test and provide support on
*   [Atos Canopy](https://canopy-cloud.com/)
*   [IBM Bluemix](https://console.ng.bluemix.net/)
*   And of course your own private Cloud Foundry instance if you have decided to install Cloud Foundry yourself!

## Running the sub-generator

Before running the sub-generator, you need to install the [cf Command Line Interface (CLI)](http://docs.cloudfoundry.org/devguide/installcf/), and have a Cloud Foundry account created.

To deploy your application to Cloud Foundry, type:

`jhipster cloudfoundry`

You will have a couple of questions to configure your database, asking you the name of your database service and the plan you want to use. The available databases depend on your current Cloud Foundry installation, type `cf marketplace` to know which services and plans are available on your Cloud Foundry marketplace. By default, the database and plan selected are the free PostgreSQL service from ElephantSQL on the public Pivotal Cloud Foundry instance, as they sponsor JHipster.

This should package your application (in production or development mode), create a Cloud Foundry application (with a database), upload your code, and start the application.

## Updating your deployed application

When your application is already deployed, you can re-deploy it by building it normally by running:

**With Maven:**

`./mvnw -Pprod package`

`cf push -f ./deploy/cloudfoundry/manifest.yml -p target/*.war`

**With Gradle:**

`./gradlew -Pprod bootWar`

`cf push -f ./deploy/cloudfoundry/manifest.yml -p build/libs/*.war`

You can also run the sub-generator again, by typing another time:

`jhipster cloudfoundry`

## More information

*   [Spring Boot Cloud Foundry documentation](http://docs.spring.io/spring-boot/docs/current/reference/html/cloud-deployment.html)
*   [Spring Cloud Connectors](http://cloud.spring.io/spring-cloud-connectors/)
