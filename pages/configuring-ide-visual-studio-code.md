---
layout: default
title:  Configurer Visual Studio Code
permalink: /configuring-ide-visual-studio-code/
sitemap:
    priority: 0.7
    lastmod: 2016-09-15T17:13:00-00:00
---

# <i class="fa fa-keyboard-o"></i> Configurer Visual Studio Code

Visual Studio Code est un éditeur de texte Open Source développé par Microsoft. Il offre un excellent support pour TypeScript, ce qui en fait un choix populaire pour le développement d'applications Angular.

![Screenshot]({{ site.url }}/images/configuring_ide_visual_studio_code_1.png)

## Support de Yeoman

**Attention ! À l'heure actuelle, cette extension est cassée**

Visual Studio Code dispose d'une extension Yeoman, qui devrait vous aider à exécuter des commandes JHipster.

Vous pouvez l'installer en utilisant la place de marché de Visual Studio Code :

![Screenshot]({{ site.url }}/images/configuring_ide_visual_studio_code_2.png)

## Support du code Java

Visual Studio Code dispose d'une extension Java développée par Red Hat. Elle offre un bon support pour Java, utilisant Maven ou Gradle.

Vous pouvez l'installer en utilisant la place de marché de Visual Studio Code :

![Screenshot]({{ site.url }}/images/configuring_ide_visual_studio_code_3.png)

## Tâches courantes : compilation, exécution et empaquetage du code

L'extension Java de Visual Studio Code ne peut pas être utilisée pour exécuter des commandes : elle ne peut pas compiler, exécuter le code ou empaqueter l'application.

Pour toutes ces tâches, il existe 2 solutions :

- Utilisez le terminal, par exemple le terminal intégré fourni par Visual Studio Code, pour exécuter ces commandes manuellement
- Utilisez le [JHipster App]({{ site.url }}/jhipster-app), qui offre une interface graphique pour toutes ces commandes. **Note :** JHipster App est déprécié.

## Redémarrage automatique de l'application avec Spring Boot devtools

[Spring Boot devtools](https://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-devtools.html) est configuré par JHipster et "redémarre à chaud" votre application lorsque les classes de votre projet sont compilées. C'est une fonctionnalité indispensable, car elle permet de mettre à jour votre application à la volée.

Pour l'utiliser dans Visual Studio Code, vous devez :

- Exécuter votre application dans un terminal, en tapant généralement `./mvnw`
- Dans un autre terminal, compilez votre application : `./mvnw compile`

Dans le premier terminal, votre application JHipster devrait se redéployer automatiquement et utiliser votre nouveau code.

Si vous utilisez JHipster App, il suffit de cliquer sur 2 boutons (un pour exécuter l'application, l'autre pour la compiler), et votre application se redéploiera automatiquement de la même manière.

## Paramètres personnalisés

Pour des performances optimales, il est recommandé d'exclure certains dossiers. Dans le dossier `.vscode` de votre projet, créez un fichier `settings.json` comme ci-dessous :

```json
{
    "files.exclude": {
        "**/.git": true,
        "**/.gradle": true,
        "**/.idea": true,
        "**/.mvn": true,
        "**/.svn": true,
        "**/.hg": true,
        "**/.DS_Store": true
    },
    "search.exclude": {
        "**/node": true,
        "**/node_modules": true,
        "**/bower_components": true,
        "**/build": true,
        "**/target": true
    }
}

```
