---
layout: default
title: Deploying to AWS with Boxfuse
permalink: /boxfuse/
redirect_from:
  - /boxfuse.html
sitemap:
    priority: 0.7
    lastmod: 2016-08-22T00:00:00-00:00
---

# Deploying to AWS with Boxfuse

This guide show how to deploy your JHipster application to AWS using [Boxfuse](https://boxfuse.com/).

[![]({{ site.url }}/images/logo/logo-boxfuse.png)](https://boxfuse.com/)

Boxfuse comes with **first-class support for JHipster** and works by creating minimal immutable machine images for your application, which can then be deployed either on VirtualBox or on AWS.

<div class="alert alert-info"><i>Tip: </i>

As an alternative to Boxfuse you can also deploy your JHipster application to AWS using <a href="{{ site.url }}/aws/">Elastic Beanstalk</a>.

</div>

## Prerequisites

To be able to deploy, you must first [create a Boxfuse account](https://console.boxfuse.com) and install the [Boxfuse Client](https://boxfuse.com/getstarted/download).

You will also need to connect your AWS account in the [Boxfuse Console](https://console.boxfuse.com).

## Preparing a deployment

When your application is ready, you can prepare it for deployment by typing:

`./mvnw package -Pprod -DskipTests`

Or when using gradle:

`./gradlew -Pprod bootWar -x test`

## Deploying to AWS

To deploy your application to AWS type:

`boxfuse run -env=prod`

Boxfuse will then analyse your application, fuse a minimal machine image for it and automatically provision, configure and secure all necessary
AWS infrastructure (instances, security groups, Elastic IPs, ELBs, MySQL or PostgreSQL RDS databases, ...)

<pre>Creating jhipster ...
Mapping jhipster-dev-myuser.boxfuse.io to 127.0.0.1 ...
Created App jhipster (single-instance / postgresql)
Fusing Image for jhipster-1.0.war (JHipster) ...
Image fused in 00:05.036s (96301 K) -> myuser/jhipster:1.0
Pushing myuser/jhipster:1.0 ...
Verifying myuser/jhipster:1.0 ...
Creating security group boxsg-db-myuser-prod-jhipster ...
Creating RDS PostgreSQL database (db.t2.micro / 5 GB / single-az) => boxdb-myuser-prod-jhipster (this one-time action may take up to 10 minutes to complete) ...
Waiting for AWS to create an AMI for myuser/jhipster:1.0 in eu-central-1 (this may take up to 50 seconds) ...
AMI created in 00:35.564s in eu-central-1 -> ami-35fa0b5a
Waiting for AWS to make RDS DB boxdb-myuser-prod-jhipster available ...
DB boxdb-myuser-prod-jhipster [creating]
DB boxdb-myuser-prod-jhipster [backing-up]
DB boxdb-myuser-prod-jhipster [available]
Creating security group boxsg-myuser-prod-jhipster ...
Creating Elastic IP ...
Mapping jhipster-myuser.boxfuse.io to 52.29.78.197 ...
Creating security group boxsg-myuser-prod-jhipster-1.0 ...
Launching t2.micro instance of myuser/jhipster:1.0 (ami-35fa0b5a) in prod (eu-central-1) ...
Instance launched in 00:20.687s -> i-95d15028
Creating Cloud Watch Alarm for Instance auto-recovery -> i-95d15028-auto-recovery-alarm
Waiting for AWS to boot Instance i-95d15028 and Payload to start at http://54.93.63.207:8080/ ...
Payload started in 01:29.685s -> http://54.93.63.207:8080/
Remapping Elastic IP 52.29.78.197 to i-95d15028 ...
Waiting 15s for AWS to complete Elastic IP Zero Downtime transition ...
Deployment completed successfully. myuser/jhipster:1.0 is up and running at http://jhipster-myuser.boxfuse.io:8080/</pre>

Note that you didn't need to explicitly specify things like ports, healthcheck urls or database types. By default Boxfuse auto-discovers those
from your JHipster war based on your `application-prod.yml` file and the included jars. You can of course
override those auto-discovered settings if you want to, but in most cases you won't need to.

## Deploying updates

To deploy an update to an existing application simply follow the preparation and deploy steps outlined above. All updates
are performed as zero downtime-blue deployments.

## More information

*   [Get Started with Boxfuse and JHipster](https://boxfuse.com/getstarted/jhipster)
*   [JHipster Boxfuse documentation](https://boxfuse.com/docs/payloads/jhipster)
