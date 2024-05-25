---
layout: default
title: Configurer Eclipse avec Gradle
permalink: /configuring-ide-eclipse-gradle/
redirect_from:
  - /configuring-ide-eclipse-gradle.html
sitemap:
    priority: 0.7
    lastmod: 2015-05-22T18:40:00-00:00
---

# <i class="fa fa-keyboard-o"></i> Configurer Eclipse avec Gradle

Pour obtenir un support complet de Gradle dans Eclipse, vous devez installer le [plugin buildship](https://gradle.org/eclipse/).
Pour configurer la partie [JavaScript]({{ site.url }}/configuring-ide-eclipse/), vous pouvez suivre les instructions pour Maven.

## 1. Importez votre projet en tant que projet Gradle

- Sélectionnez ``File -> Import``
- Choisissez ``Gradle Project``
- Sélectionnez le répertoire racine de votre projet
- Cliquez sur ``Next`` et terminez l'assistant

![Import]({{ site.url }}/images/configuring_ide_eclipse_gradle_1.png)

![Select]({{ site.url }}/images/configuring_ide_eclipse_gradle_2.png)

## 2. Ajoutez le dossier de source généré apt au chemin de build

Lors de l'utilisation de buildship, le dossier de sortie par défaut de Gradle est filtré et n'est pas visible dans votre espace de travail.
Par conséquent, vous devez le retirer du paramètre de filtre de ressources d'Eclipse.

- Cliquez avec le bouton droit sur votre projet et sélectionnez ``Properties``
- Sélectionnez ``Resources``
- Supprimez l'entrée ``build``
- Sélectionnez ``Java Build Path``
- Cliquez sur ``Add Folder...``
- Cochez le chemin ``build/generated/source/apt/main``

Assurez-vous que le nouveau dossier source contient correctement les implémentations de mapper générées lors de l'exécution de JHipster via Eclipse.

![Exclude]({{ site.url }}/images/configuring_ide_eclipse_gradle_3.png)

![Buildpath]({{ site.url }}/images/configuring_ide_eclipse_gradle_4.png)
