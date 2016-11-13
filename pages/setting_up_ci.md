---
layout: default
title: Setting up Continuous Integration
permalink: /setting-up-ci/
redirect_from:
  - /setting_up_ci.html
sitemap:
    priority: 0.7
    lastmod: 2016-11-03T12:40:00-00:00
---

# <i class="fa fa-stethoscope"></i> Setting up Continuous Integration

Setting up Continuous Integration (CI) for a JHipster application is harder than for a classic typical Spring MVC application because of the complexity associated with maintaining a build composed of 2 software stacks:

- the Java back-end code with Maven or Gradle
- the JavaScript front-end with NodeJS, NPM and Gulp

Each stack comes with its own dependency management (Maven artifacts, NPM packages) with potential conflicts to solve.

JHipster should support the following CI systems out of the box:

- Jenkins:
    - [Setting up Jenkins 1]({{ site.url }}/setting-up-ci-jenkins1/)
    - [Setting up Jenkins 2]({{ site.url }}/setting-up-ci-jenkins2/) (recommended)
- Travis: refer to the [Travis Documentation](https://docs.travis-ci.com/user/getting-started/), note that a `.travis.yml` configuration file is generated with your application.

Moreover, the [JHipster CI module](https://github.com/pascalgrimaud/generator-jhipster-ci) provides support for other CI systems like Gitlab CI and Circle CI.
