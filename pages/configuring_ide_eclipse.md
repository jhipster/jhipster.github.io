---
layout: default
title: Configuring your IDE
sitemap:
priority: 0.7
lastmod: 2015-05-22T18:40:00-00:00
---

# <i class="fa fa-keyboard-o"></i> Configuring Eclipse

Importing your JHipster application in Eclipse will require a few manual steps. You will need to do some configuration:

- on the Maven side (for Maven users)
- on the Javascript side (so Eclipse can ignore a couple of folders for static files)


## 1. Import your project as a Maven project

- Select File -> Import
- Choose "Existing Maven Projects"
- Select your project
- Click on "Finish"

![Import](/images/configuring_ide_eclipse_1.png)

![Select](/images/configuring_ide_eclipse_2.png)


At the end of the import phase, you can expect to see the below dialog.  "Maven plugin connectors" are an extension for m2eclipse. That one should be installed and Eclipse will need to restart after completion.

If you have installed it already, you will be good to go and do not need to do anything.

![Select](/images/configuring_ide_eclipse_maven_processor.png)

__Note__: if you already have an existing JHipster project and have not installed the corresponding connector, you should see the below error:

`Plugin execution not covered by lifecycle configuration: org.bsc.maven:maven-processor-plugin:2.2.4:process (execution: process, phase: generate-sources)`

Just select Quick Fix/Ctrl+1 (Cmd+1 on Mac) on the error marker and select "Discover new m2e connectors"

## 2. Excluding generated static folders
At this stage you should not have any Java error but should still see some JavaScript errors. This is because you have some JavaScript files that Eclipse cannot parse properly. Those files are used at execution time only and do not need to be visible in your workspace. They should be excluded.


### Exclude the ‘node_modules’ folder

- Right-click on Project -> Properties -> Resource -> Resource Filters
- Select: Exclude all, Applies to folders, Name matches node_modules
- Press "Ok"

![Right-click](/images/configuring_ide_eclipse_3.png)

![Exclude](/images/configuring_ide_eclipse_4.png)


### Exclude 'scripts' and 'bower_components' from src/main/webapp

- Right click on Project -> Properties -> Javascript -> Include path
- Click on the “source” tab and select your_project/src/main/webapp
- Select “Excluded: (None) -> Edit -> Add multiple
- Select `bower_components` and `scripts` and click “Ok”
- You should also exclude
    - `.tmp/`,
    - `node_modules/` and
    - `src/main/webapp/dist` (the `dist` folder will be created when you generate a production build)

![Right-click](/images/configuring_ide_eclipse_5.png)

![Exclude](/images/configuring_ide_eclipse_6.png)

![Multiple select](/images/configuring_ide_eclipse_7.png)
