---
layout: default
title: Configuring your IDE
sitemap:
priority: 0.7
lastmod: 2015-05-22T18:40:00-00:00
---

# <i class="icon-keyboard"></i> Configuring Intellij IDEA

## Import your project

- Simply open your project normally
- Maven should be detected, and your project will build automatically

## Exclude directories

- Right-click on the `src/main/webapp/bower_components` folder
- Select "Mark Directory As" and select "Excluded"
- You should also exclude
    - `.tmp/`,
    - `node_modules/` and
    - `src/main/webapp/dist` (the `dist` folder will be created when you generate a production build)

![Exclude](images/configuring_ide_idea_1.png)
