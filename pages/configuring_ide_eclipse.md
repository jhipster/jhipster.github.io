---
layout: default
title: Configuring Eclipse with Maven
permalink: /configuring-ide-eclipse/
redirect_from:
  - /configuring_ide_eclipse.html
sitemap:
    priority: 0.7
    lastmod: 2015-05-22T18:40:00-00:00
---

# <i class="fa fa-keyboard-o"></i> Configuring Eclipse

Importing your JHipster application in Eclipse will require a few manual steps. You will need to do some configuration:

- on the Maven side (for Maven users)
- on the JavaScript side (so Eclipse can ignore a couple of folders for static files)

## 1. Import your project as a Maven project

- Select File -> Import
- Choose "Existing Maven Projects"
- Select your project
- Click on "Finish"

![Import]({{ site.url }}/images/configuring_ide_eclipse_1.png)

![Select]({{ site.url }}/images/configuring_ide_eclipse_2.png)


At the end of the import phase, you can expect to see the below dialog.  "Maven plugin connectors" are an extension for m2eclipse. That one should be installed and Eclipse will need to restart after completion.

If you have installed it already, you will be good to go and do not need to do anything.

![Select]({{ site.url }}/images/configuring_ide_eclipse_maven_processor.png)

__Note__: if you already have an existing JHipster project and have not installed the corresponding connector, you should see the below error:

`Plugin execution not covered by lifecycle configuration: org.bsc.maven:maven-processor-plugin:2.2.4:process (execution: process, phase: generate-sources)`

Just select Quick Fix/Ctrl+1 (Cmd+1 on Mac) on the error marker and select "Discover new m2e connectors"

## 2. Excluding generated static folders
At this stage you should not have any Java error but should still see some JavaScript errors. This is because you have some JavaScript files that Eclipse cannot parse properly. Those files are used at execution time only and do not need to be visible in your workspace. They should be excluded.


### Exclude the ‘node_modules’ folder

- Right-click on Project -> Properties -> Resource -> Resource Filters
- Select: Exclude all, Applies to folders, Name matches node_modules
- Press "Ok"

![Right-click]({{ site.url }}/images/configuring_ide_eclipse_3.png)

![Exclude]({{ site.url }}/images/configuring_ide_eclipse_4.png)


### Exclude 'app' from src/main/webapp

- Right click on Project -> Properties -> Javascript -> Include path
- Click on the “source” tab and select your_project/src/main/webapp
- Select “Excluded: (None) -> Edit -> Add multiple
- Select  `app` and click “Ok”
- The following folders should have been automatically excluded (if not, exclude them manually):
    - `bower_components`
    - `node_modules/`

![Right-click]({{ site.url }}/images/configuring_ide_eclipse_5.png)

![Exclude]({{ site.url }}/images/configuring_ide_eclipse_6.png)

![Multiple select]({{ site.url }}/images/configuring_ide_eclipse_7.png)

### Maven IDE profile

If you are using Maven, you need to activate the `IDE` profile in Eclipse. This is used for applying IDE-specific tweaks, which currently only includes applying the MapStruct annotation processor.

- Right click on Project -> Properties -> Maven
- In "Active Maven Profiles", type `dev,IDE`

With this configuration, you will be using both the JHipster `dev` and `IDE` profiles.

### Configuring MapStruct plugins

In case for the IDE correctly recognize the mapstruct code generator some more things needs to be done.

You should use the plugin m2e-apt (https://marketplace.eclipse.org/content/m2e-apt). Installing the m2e-apt plugin, enable Eclipse to work along with mapstruct.

Also you can install the plugin MapStruct Eclipse Plugin (https://marketplace.eclipse.org/content/mapstruct-eclipse-plugin) for help and tips from the IDE. 
