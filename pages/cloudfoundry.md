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

[![]({{ site.url }}/img/logo-pws.png)](http://run.pivotal.io/)

As this sub-generator uses the Cloud Foundry command-line tool, it can deploy to all Cloud Foundry instances:

*   [Pivotal Web Services](http://run.pivotal.io/), which officially sponsors JHipster, so it is the only one we can test and provide support on
*   [Atos Canopy](https://canopy-cloud.com/)
*   [IBM Bluemix](https://console.ng.bluemix.net/)
*   And of course your own private Cloud Foundry instance if you have decided to install Cloud Foundry yourself!

## Limitations

*   MongoDB cannot load its data with Mongeez because of [#733](https://github.com/jhipster/generator-jhipster/issues/733).

## Running the sub-generator

Before running the sub-generator, you need to install the [cf Command Line Interface (CLI)](http://docs.cloudfoundry.org/devguide/installcf/), and have a Cloud Foundry account created.

To deploy your application to Cloud Foundry, type:

`yo jhipster:cloudfoundry`

This should package your application (in production or development mode), create a Cloud Foundry application (with a database), upload your code, and start the application.

## Updating your deployed application

When your application is already deployed, you can re-deploy it by building it normally by running:

**With Maven:**
`./mvn -Pprod package`
`cf push -f ./deploy/cloudfoundry/manifest.yml -p target/*.war`

**With Gradle:**
`./gradlew -Pprod bootRepackage`
`cf push -f ./deploy/cloudfoundry/manifest.yml -p build/libs/*.war`

You can also run the sub-generator again, by typing another time:

`yo jhipster:cloudfoundry`

## More information

*   [Spring Boot Cloud Foundry documentation](http://docs.spring.io/spring-boot/docs/current/reference/html/cloud-deployment-cloud-foundry.html)
*   [Spring Cloud Connectors](http://cloud.spring.io/spring-cloud-connectors/)
