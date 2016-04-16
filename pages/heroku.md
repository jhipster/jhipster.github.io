---
layout: default
title: Deploying to Heroku
permalink: /heroku/
redirect_from:
  - /heroku.html
sitemap:
    priority: 0.7
    lastmod: 2014-09-08T00:00:00-00:00
---

# Deploying to Heroku

This sub-generator allows deployment of your JHipster application to the [Heroku cloud](https://www.heroku.com/).

[![]({{ site.url }}/img/logo-heroku.png)](https://www.heroku.com/)

Heroku is helping JHipster in two ways:

- Joe Kutner, from Heroku, is currently maintaining this sub-generator
- Heroku gives us free credits, allowing us to test generated applications with complex, high-end setups, to guarantee everything works well for our common users

## Running the sub-generator

Before running the sub-generator, you must install the [Heroku toolbelt](https://toolbelt.heroku.com/), and have a Heroku account created.

You must also [create a Heroku account](http://signup.heroku.com/) and log in with the toolbelt by running the following command:

<pre>**$ heroku login**
Enter your Heroku credentials.
Email: YOUR_EMAIL
Password (typing will be hidden): YOUR_PASSWORD
Authentication successful.
</pre>

To deploy your application to Heroku, run this command:

`yo jhipster:heroku`

This should package your application in "production" mode, create an Heroku application with a database, upload your code, and start the application.

Note that if your application is a microservice, you will be prompted to provide a registry URL. Scroll down to learn how to do this.

_Please be aware that your application must start under 90 seconds, or it will be killed. Depending on the platform load, starting under 60 seconds is of course not guaranteed!_

## Updating your deployed application

### Preparing a new deployment

When your application is already deployed, you can prepare a new deployment by typing:

`./mvnw package -Pprod -DskipTests`

Or when using gradle:

`./gradlew -Pprod bootRepackage -x test`

### Pushing to production

_Note: This assumes you have run the generator on the machine you are executing this command from. If you have not, you will need to first run_ `heroku plugins:install https://github.com/heroku/heroku-deploy`.

To push to production, type:

`heroku deploy:jar --jar target/*.war`

Or when using gradle:

`heroku deploy:jar --jar build/libs/*war`

## Deploying Microservices

JHipster microservices require a JHipster registry as described in the [Doing microservices with JHipster](/microservices-architecture/) documentation. You can deploy a registry to Heroku by clicking this button:

[![Deploy to Heroku](https://camo.githubusercontent.com/c0824806f5221ebb7d25e559568582dd39dd1170/68747470733a2f2f7777772e6865726f6b7563646e2e636f6d2f6465706c6f792f627574746f6e2e706e67)](https://dashboard-preview.heroku.com/new?&template=https%3A%2F%2Fgithub.com%2Fjhipster%2Fjhipster-registry)

Once the registry is deployed, you can run the `yo jhipster:heroku` command against your microservice or gateway. The Heroku sub-generator will prompt you for the URL of your registry, which will be in the form `https://[appname].herokuapp.com`.

A registry running on Heroku has a few limitations, including:

*   The registry will only work with native configuration (and not Git config).
*   The Registry is not secured by default. You must add it with Spring Security’s basic authentication support (see below).
*   The registry service cannot be scaled up to multiple dynos to provide redundancy. You must deploy multiple applications (i.e. click the button more than once). This is because Eureka requires distinct URLs to synchronize in-memory state between instances.

### Securing your Heroku Registry

To secure the registry, you must add the `spring-boot-starter-security` dependency to the app. To do so, first clone a local copy of the registry by running these commands (but replace "[appname]" with the name of your Heroku registry app):

`git clone https://github.com/jhipster/jhipster-registry`
`cd jhipster-registry`
`heroku git:remote [appname]`

Then add the following dependency to the `pom.xml`:

    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-security</artifactId>
    </dependency>

Then commit the change and redeploy the registry by running these commands:

`git add pom.xml`
`git commit -m "security"`
`git push heroku master`

A random password for the registry was automatically configured when you deployed it. You can capture this value by running the following command:

`heroku config:get JHIPSTER_PASSWORD`

Finally, update all of your microservices and your gateway to use the credentials for the registry by running this command:

`heroku config:set JHIPSTER_REGISTRY_URL="http://user:[password]@[appname].herokuapp.com"`

## Troubleshooting

If your application is killed by Heroku when your Liquibase changelog is being applied, your database will be marked as "locked" by Liquibase. You will need to manually clean the lock table. On Postgres, you make sure you have a [local Postgres client installed](https://devcenter.heroku.com/articles/heroku-postgresql#local-setup) and run the following command:

`heroku pg:psql -c "update databasechangeloglock set locked=false;"`

Heroku has a default boot-timeout limit of 90 seconds. If your app takes longer than this, Heroku will kill the process, which may leave the database in a locked state. If the problem is persistent, try contacting [Heroku Support](http://help.heroku.com) to request a longer boot limit for your app.

## More information

*   [Example Application](https://github.com/kissaten/jhipster-example)
*   [Spring Boot Heroku documentation](http://docs.spring.io/spring-boot/docs/current/reference/html/cloud-deployment.html#cloud-deployment-heroku)
