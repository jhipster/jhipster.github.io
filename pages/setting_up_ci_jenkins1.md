---
layout: default
title: Setting up Jenkins 1
permalink: /setting-up-ci-jenkins1/
sitemap:
    priority: 0.7
    lastmod: 2016-11-03T12:40:00-00:00
---

# <i class="fa fa-wrench"></i> Setting up a Jenkins server

To configure a Jenkins server for JHipster, refer to the following guides:

- [Setting up Jenkins 1 on Linux]({{ site.url }}/setting-up-ci-linux/)
- [Setting up Jenkins 1 on Windows]({{ site.url }}/setting-up-ci-windows/)

# <i class="fa fa-sliders"></i> Jenkins Configuration

To setup a JHipster project in Jenkins, use the following configuration:

## For Maven:

```
* Project name: `yourApplicationName`
* Source Code Management
    * Git Repository: `git@github.com:xxxx/yourApplicationName.git`
    * Branches to build: `*/master`
    * Additional Behaviours: `Wipe out repository & force clone`
* Build Triggers
    * Poll SCM / Schedule: `H/5 * * * *`
* Build<% if (buildTool == 'maven') { %>
    * Invoke Maven / Tasks: `-Pprod clean package`
    * Execute Shell / Command:
        ````
        mvn spring-boot:run &
        bootPid=$!
        sleep 30s
        gulp itest
        kill $bootPid
        ````
* Post-build Actions
    * Publish JUnit test result report / Test Report XMLs: `build/test-results/*.xml`
```

## For Gradle:
```
* Project name: `yourApplicationName`
* Source Code Management
    * Git Repository: `git@github.com:xxxx/yourApplicationName.git`
    * Branches to build: `*/master`
    * Additional Behaviours: `Wipe out repository & force clone`
* Build Triggers
    * Poll SCM / Schedule: `H/5 * * * *`
* Build
    * Invoke Gradle script / Use Gradle Wrapper / Tasks: `-Pprod clean test bootWar`
    * Execute Shell / Command:
        ````
        ./gradlew bootRun &
        bootPid=$!
        sleep 30s
        gulp itest
        kill $bootPid
        ````
* Post-build Actions
    * Publish JUnit test result report / Test Report XMLs: `build/test-results/*.xml`
```

