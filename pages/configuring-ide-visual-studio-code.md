---
layout: default
title: Configuring Visual Studio Code
permalink: /configuring-ide-visual-studio-code/
sitemap:
    priority: 0.7
    lastmod: 2016-09-15T17:13:00-00:00
---

# <i class="fa fa-keyboard-o"></i> Configuring Visual Studio Code

Visual Studio Code is an Open Source text editor made by Microsoft. It has excellent support for TypeScript, so many people want to use it for developing AngularJS 2 applications.

![Screenshot]({{ site.url }}/images/configuring_ide_visual_studio_code_1.png)

## Yeoman Support

**Warning! At the time of this writing, this extension is broken**

Visual Studio Code has a Yeoman extension, which should help you run JHipster commands.

You can install it by using the Visual Studio Code marketplace:

![Screenshot]({{ site.url }}/images/configuring_ide_visual_studio_code_2.png)

## Java Code Support

Visual Studio Code has a Java extension developped by RedHat. It has a good Java support, using Maven (so it won't work if you select the Gradle option with JHipster).

You can install it by using the Visual Studio Code marketplace:

![Screenshot]({{ site.url }}/images/configuring_ide_visual_studio_code_3.png)

## Common tasks: compiling, running and packaging the code

The Visual Studio Code Java extension can't be used to run commands: it can't compile, run the code, or package the application.

For all those tasks, there are 2 solutions:

- Use the [JHipster App]({{ site.url }}/jhipster-app), which offers a graphical interface for all those commands
- Use the terminal, for instance the internal terminal provided by Visual Studio Code, to run those commands manually
