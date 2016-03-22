---
layout: default
title: Setting up Continuous Integration
permalink: /setting-up-ci/
redirect_from:
  - /setting_up_ci.html
sitemap:
    priority: 0.7
    lastmod: 2015-01-09T12:40:00-00:00
---

# <i class="fa fa-stethoscope"></i> Setting up Continuous Integration

Setting up your own continuous integration server using Jenkins for a JHipster application is harder than for a classic Spring MVC application because of all the tools required to build and test the client code.

It's harder because you have to manage 2 software stacks in your build process:

- Java/Maven for the server code and the build orchestration
- Javascript/NodeJS/Gulp/Bower for client code

Each stack comes with its own dependency management (artifacts, npm) with potential conflicts to solve.

Some of the instructions below may help you also to setup your development environment.

- [Linux server]({{ site.url }}/setting-up-ci-linux/)
- [Windows server]({{ site.url }}/setting-up-ci-windows/)
