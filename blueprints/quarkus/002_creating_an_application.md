---
layout: default
title: Creating an application
sitemap:
priority: 0.5
lastmod: 2021-01-07T08:40:00-00:00
---

# Creating an application

## Quick start

First of all, create an empty directory in which you will create your application:

`mkdir my-quarkus-application`

Go to that directory:

`cd my-quarkus-application`

To generate your JHipster Quarkus application, type:

`jhipster-quarkus`

## Advanced

`jhipster-quarkus` embeds the `jhipster` dependency which means you don't have to install `jhipster` by your own.
The main benefits of `jhipster-quarkus` is to ensure the compatibility between the JHipster Quarkus blueprint and the underneath JHipster.

However, if you want to use a custom `jhipster` installation, you can use the `--blueprint` flag as follow:

`jhipster --blueprints quarkus`

Please, keep in mind that in this configuration you may face compatibility issues, that's why we do not recommend this usage.

## Questions asked when generating an application

The question asked during JHipster Quarkus creation are identical to standard Quarkus.

Please refer to the according documentation: [Questions asked when generating an application]({{ site.url }}/creating-an-app/#2)
