---
layout: default
title: Setting up Continuous Integration on Jenkins 2
permalink: /setting-up-ci-jenkins2/
redirect_from:
  - /setting_up_ci_jenkins2.html
sitemap:
    priority: 0.7
    lastmod: 2017-01-19T14:15:00-00:00
---

# <i class="fa fa-stethoscope"></i> Setting up Continuous Integration on Jenkins 2

## Installing Jenkins 2

### Standard

Install JDK 8 on your machine.

Go to the official site [https://jenkins.io/2.0/](https://jenkins.io/2.0/)

Download the `jenkins.war`

### With Docker

Launch the [Docker image](https://hub.docker.com/r/jenkinsci/jenkins/) (the default port has been changed to 18080):

`docker container run -d --name jenkins2 -p 18080:8080 -p 50000:50000 jenkinsci/jenkins`

## Create a new Job

- Add New Item
    - Enter an item name
    - Select pipeline
    - Click OK

![Jenkins2 item]({{ site.url }}/images/jenkins2_add_item.png)

- Definition: Pipeline script from SCM
- SCM: Git
- Repositories
    - Repository URL: select your repository here

![Jenkins2 pipeline]({{ site.url }}/images/jenkins2_pipeline.png)

## Jenkinsfile

![Jenkins2 result]({{ site.url }}/images/jenkins2_result.png)
