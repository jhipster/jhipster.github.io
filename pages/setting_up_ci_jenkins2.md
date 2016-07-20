---
layout: default
title: Setting up Continuous Integration on Jenkins 2
permalink: /setting-up-ci-jenkins2/
redirect_from:
  - /setting_up_ci_jenkins2.html
sitemap:
    priority: 0.7
    lastmod: 2016-06-19T12:40:00-00:00
---

# <i class="fa fa-stethoscope"></i> Setting up Continuous Integration on Jenkins 2

## Prerequisites

Install JDK 8 on your machine.

## Installing Jenkins 2

### Standard

Go to the official site [https://jenkins.io/2.0/](https://jenkins.io/2.0/)

Download the `jenkins.war`

### With Docker

Launch the [Docker image](https://hub.docker.com/r/jenkinsci/jenkins/) (the default port has been changed to 18080):

`docker run -d --name jenkins2 -p 18080:8080 -p 50000:50000 jenkinsci/jenkins`

## Configuring Jenkins2

You could install NodeJS globally but it's very likely that you may want to have different versions of NodeJS for different projects.

We suggest 2 alternatives below, choose the one you prefer.

If you choose Docker, you should use Jenkins NodeJS plugin.

### Global NodeJS installation

Install NodeJS, Bower and Gulp on your machine.

### Jenkins NodeJS plugin

Install Jenkins NodeJS plugin:

- Go to Manage Jenkins
    - Manage Plugins
    - Tab: Available
    - Select: NodeJS Plugin
    - Click on: Install

- Go back to Manage Jenkins
    - Global Tool Configuration
    - Click on: Add NodeJS
        - Choose a name: node-4.4.5 (this name is used by the Jenkinsfile)
        - Check: Install automatically
        - Installation: NodeJS 4.4.5
        - Global npm packages to install: npm bower gulp-cli

![Jenkins2 nodejs]({{ site.url }}/images/jenkins2_config_nodejs.png)

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

Here an example of Jenkinsfile which is generated:

~~~
node {
    // uncomment these 2 lines and edit the name 'node-4.4.5' according to what you choose in configuration
    // def nodeHome = tool name: 'node-4.4.5', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    // env.PATH = "${nodeHome}/bin:${env.PATH}"

    stage 'check environment'
    sh "node -v"
    sh "npm -v"
    sh "bower -v"
    sh "gulp -v"

    stage 'checkout'
    checkout scm

    stage 'npm install'
    sh "npm install"

    stage 'clean'
    sh "./mvnw clean"

    stage 'backend tests'
    sh "./mvnw test"

    stage 'frontend tests'
    sh "gulp test"

    stage 'packaging'
    sh "./mvnw package -Pprod -DskipTests"
}
~~~

These 2 lines need to be uncommented if you use NodeJS plugin:

~~~
    // def nodeHome = tool name: 'node-4.4.5', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    // env.PATH = "${nodeHome}/bin:${env.PATH}"
~~~

![Jenkins2 result]({{ site.url }}/images/jenkins2_result.png)
