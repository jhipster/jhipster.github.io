---
layout: default
title: Configuring Eclipse with Gradle
permalink: /configuring-ide-eclipse-gradle/
redirect_from:
  - /configuring-ide-eclipse-gradle.html
sitemap:
    priority: 0.7
    lastmod: 2015-05-22T18:40:00-00:00
---

# <i class="fa fa-keyboard-o"></i> Configuring Eclipse with Gradle

To get full Gradle support in eclipse you should install the [buildship plugin](https://gradle.org/eclipse/).
For configuring the [JavaScript]({{ site.url }}/configuring-ide-eclipse/) side you can follow the instructions for Maven.

## 1. Import your project as a Gradle project

- Select ``File -> Import``
- Choose ``Gradle Project``
- Select your projects root directory
- Click on ``Next`` and finish the wizard

![Import]({{ site.url }}/images/configuring_ide_eclipse_gradle_1.png)

![Select]({{ site.url }}/images/configuring_ide_eclipse_gradle_2.png)

## 2. Add apt generated source folder to build path

When using buildship gradles default outputfolder is filtered and not visible in your workspace.
Therefore you need to remove it from eclipse's resource filter setting.

- Right click on your project and select ``Properties``
- Select ``Resources``
- Remove the entry ``build``
- Select ``Java Build Path``
- Click ``Add Folder...``
- Check the path ``build/generated/source/apt/main``

Make sure the new source folder contains the correctly generated mapper implementations when running JHipster via eclipse.

![Exclude]({{ site.url }}/images/configuring_ide_eclipse_gradle_3.png)

![Buildpath]({{ site.url }}/images/configuring_ide_eclipse_gradle_4.png)
