---
layout: default
title: Configuring Visual Studio Code
permalink: /configuring-ide-visual-studio-code/
sitemap:
    priority: 0.7
    lastmod: 2016-09-15T17:13:00-00:00
---

# <i class="fa fa-keyboard-o"></i> Configuring Visual Studio Code

Visual Studio Code is an Open Source text editor made by Microsoft. It has excellent support for TypeScript, so many people want to use it for developing Angular 2 applications.

![Screenshot]({{ site.url }}/images/configuring_ide_visual_studio_code_1.png)

## Yeoman Support

**Warning! At the time of this writing, this extension is broken**

Visual Studio Code has a Yeoman extension, which should help you run JHipster commands.

You can install it by using the Visual Studio Code marketplace:

![Screenshot]({{ site.url }}/images/configuring_ide_visual_studio_code_2.png)

## Java Code Support

Visual Studio Code has a Java extension developped by Red Hat. It has a good Java support, using Maven or Gradle.

You can install it by using the Visual Studio Code marketplace:

![Screenshot]({{ site.url }}/images/configuring_ide_visual_studio_code_3.png)

## Common tasks: compiling, running and packaging the code

The Visual Studio Code Java extension can't be used to run commands: it can't compile, run the code, or package the application.

For all those tasks, there are 2 solutions:

- Use the [JHipster App]({{ site.url }}/jhipster-app), which offers a graphical interface for all those commands
- Use the terminal, for instance the internal terminal provided by Visual Studio Code, to run those commands manually

## Application "hot restart" with Spring Boot devtools

[Spring Boot devtools](https://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-devtools.html) is configured by JHipster, and will "hot restart" your application when classes from your project are compiled. This is a must-have feature, as it makes your application updated on the fly.

To use it within Visual Studio Code, you need to:

- Run your application in a terminal, typically by typing `./mvnw`
- In another terminal, compile your application: `./mvnw compile`

In the first terminal, your JHipster application should automatically redeploy, and use your new code.

If you use the JHipster App, this is only a matter of clicking on 2 buttons (one for running the application, the other for compiling it), and your application will automatically redeploy in the same way.

## Custom settings

For best performance, it's recommended to exclude some folders, in your project's `.vscode` folder create a `settings.json` file as below:

```
{
    // Configure glob patterns for excluding files and folders.
    "files.exclude": {
        "**/.git": true,
        "**/.gradle": true,
        "**/.idea": true,
        "**/.mvn": true,
        "**/.svn": true,
        "**/.hg": true,
        "**/.DS_Store": true
    },
    // Configure glob patterns for excluding files and folders in searches. Inherits all glob patterns from the files.exclude setting.
    "search.exclude": {
        "**/node": true,
        "**/node_modules": true,
        "**/bower_components": true,
        "**/build": true,
        "**/target": true
    }
}
```
