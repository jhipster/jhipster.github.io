---
layout: default
title: Profiles
permalink: /profiles/
redirect_from:
  - /profiles.html
sitemap:
    priority: 0.7
    lastmod: 2014-11-26T00:00:00-00:00
---

# <i class="fa fa-group"></i> Profiles

JHipster comes with two [Spring profiles](http://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-profiles.html) :

*   `dev` for development: it focuses on ease of development and productivity
*   `prod` for production: it focuses on performance and scalability

Those profiles come in two different configurations:

*   The Maven/Gradle profiles are used at build time. For example `./mvnw -Pprod package` or `./gradlew bootWar -Pprod` will package a production application.
*   The Spring profiles work at run time. Some Spring beans will behave differently, depending on the profile.

Spring profiles are set by Maven/Gradle, so we have a consistency between the two methods: you will have a `prod` profile on Maven/Gradle and Spring at the same time.

_Note:_ Spring profiles are used to configure the JHipster application properties, so you should be interested in reading our [common application properties documentation]({{ site.url }}/common-application-properties/).

## By default, JHipster will use the `dev` profile

If you run the application without Maven/Gradle, launch the "Application" class (you can probably run it easily from your IDE by right-clicking on it).

If you run the application with Maven, run `./mvnw` to use our Maven Wrapper, or `mvn` to use your own Maven installation.

If you run the application with Gradle, run `./gradlew` to use our Gradle Wrapper, or `gradle` to use your own Gradle installation.

When using Angular 2+ if you need to do a clean run with webpack compilation enabled for `dev` profile you can pass the `webpack` param as below

  `./mvnw -Pdev,webpack`
  or
  `./gradlew -Pdev -Pwebpack`

## In production, JHipster has to run with the `prod` profile

You can run JHipster in production directly using Maven or Gradle:

*   With Maven, run `./mvnw -Pprod` (or `mvn -Pprod`)
*   With Gradle, run `./gradlew -Pprod` (or `gradle -Pprod`)

If you want to package your application as an executable WAR file, you should provide Maven or Gradle with a profile. E.g.,:

*   With Maven, run `./mvnw -Pprod package` (or `mvn -Pprod package`)
*   With Gradle, run `./gradlew -Pprod bootWar` (or `gradle -Pprod bootWar`)

When you run your production application from a WAR file, the default is to use the same profile(s) as used during packaging. If you want to override this, you can explicitly provide an alternative in VM argument:

*   `./java -jar jhipster-0.0.1-SNAPSHOT.war --spring.profiles.active=...`

## Spring profiles switches

JHipster comes with three additional profiles used as switches:

*   `swagger` to enable swagger
*   `no-liquibase` to disable liquibase
*   `tls` to enable TLS security and use the HTTP/2 protocol (see [the TLS and HTTP/2 documentation]({{ site.url }}/tls/))

These can be used along with both the `dev` and `prod` profiles. Please note that by default, the `swagger` profile is disabled in `prod` and enabled in `dev` by setting the `spring.profiles.include` property in `application.yml`.

`swagger`, `no-liquibase`, `tls` are only used at runtime:

*   In your IDE, run your main application class with `spring.profiles.active=dev,no-liquibase` (please note you need to include the `dev` or `prod` profile explicitly)
*   With a packaged application: `./java -jar jhipster-0.0.1-SNAPSHOT.war --spring.profiles.active=prod,no-liquibase`

With Maven, you can also use those profiles directly:

*   `./mvnw -Pprod,swagger,no-liquibase`
*   `./mvnw -Pdev,no-liquibase`

With Gradle, you can also use those profiles directly:

*   `./gradlew -Pprod -Pswagger -Pno-liquibase`
*   `./gradlew -Pno-liquibase`
