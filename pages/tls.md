---
layout: default
title: Using TLS and HTTP/2
permalink: /tls/
sitemap:
    priority: 0.7
    lastmod: 2018-10-04T00:00:00-00:00
---

# <i class="fa fa-lock"></i> Using TLS and HTTP/2 in development

## Introduction

This page is for using TLS and HTTP/2 in development (mainly for testing purposes). For production configuration, please read the [security section in the production documentation]({{ site.url }}/production/#security) .

TLS is the protocol used when having an `https://` URL, and it is required in order to use HTTP/2 on modern browsers.

It is useful to use those protocols when testing an application, mainly for performance reasons.

## Using TLS and HTTP/2 with Spring Boot

JHipster has a specific configuration for configuring both TLS and HTTP/2 (see the [common application properties documentation]({{ site.url }}/common-application-properties/)), and in order to make things even simpler:

- JHipster generates a self-signed certificate at application generation
- A specific `tls` profile is provided (see the [profiles documentation]({{ site.url }}/profiles/))

In order to run JHipster with the provided self-signed certificate, with TLS and HTTP/2 enabled, you just need to use this `tls` profile:

*   with Maven: `./mvnw -Pdev,tls`
*   with Gradle: `./gradlew -Ptls`

The application will be available on `https://localhost:8080/`.

As the certificate is self-signed, your browser will issue a warning, and you will need to ignore it (or import it) in order to access the application.

## Using TLS and HTTP/2 with Angular or React

Instead of using `npm start` in order to run the front-end (with Webpack and BrowserSync), just run `npm run start-tls`, and it will connect to the back-end running on `https://localhost:8080/`.

Everything should then work the same as without TLS and HTTP/2.
