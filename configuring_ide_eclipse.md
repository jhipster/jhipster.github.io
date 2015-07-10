---
layout: default
title: Configuring your IDE
sitemap:
priority: 0.7
lastmod: 2015-05-22T18:40:00-00:00
---

# <i class="fa fa-keyboard-o"></i> Configuring Eclipse

## Import your project

- Select File -> Import
- Choose "Existing Maven Projects"
- Select your project
- Click on "Finish"

![Import](images/configuring_ide_eclipse_1.png)

![Select](images/configuring_ide_eclipse_2.png)

## Exclude the ‘node_modules’ folder

- Right-click on Project -> Resource -> Resource Filters
- Select: Exclude all, Applies to folders, Name matches node_modules
- Press "Ok"

![Right-click](images/configuring_ide_eclipse_3.png)

![Exclude](images/configuring_ide_eclipse_4.png)

## Exclude 'scripts' and 'bower_components' from src/main/webapp

- Right click on Project -> Javascript -> Include path
- Click on the “source” tab and select your_project/src/main/webapp
- Select “Excluded: (None) -> Edit -> Add multiple
- Select `bower_components` and `scripts` and click “Ok”
- You should also exclude
    - `.tmp/`,
    - `node_modules/` and
    - `src/main/webapp/dist` (the `dist` folder will be created when you generate a production build)

![Right-click](images/configuring_ide_eclipse_5.png)

![Exclude](images/configuring_ide_eclipse_6.png)

![Multiple select](images/configuring_ide_eclipse_7.png)
