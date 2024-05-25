---
layout: default
title: Configurer Eclipse avec Maven
permalink: /configuring-ide-eclipse/
redirect_from:
  - /configuring_ide_eclipse.html
sitemap:
    priority: 0.7
    lastmod: 2015-05-22T18:40:00-00:00
---

# <i class="fa fa-keyboard-o"></i> Configurer Eclipse

L'importation de votre application JHipster dans Eclipse nécessitera quelques étapes manuelles. Vous devrez faire quelques configurations :

- du côté Maven (pour les utilisateurs de Maven)
- du côté JavaScript (pour qu'Eclipse puisse ignorer quelques dossiers pour les fichiers statiques)

## 1. Importez votre projet en tant que projet Maven

- Sélectionnez File -> Import
- Choisissez "Existing Maven Projects"
- Sélectionnez votre projet
- Cliquez sur "Finish"

![Import]({{ site.url }}/images/configuring_ide_eclipse_1.png)

![Select]({{ site.url }}/images/configuring_ide_eclipse_2.png)

À la fin de la phase d'importation, vous pouvez vous attendre à voir la boîte de dialogue ci-dessous. Les "Maven plugin connectors" sont une extension pour m2eclipse. Celui-ci devrait être installé et Eclipse devra redémarrer après l'installation.

Si vous l'avez déjà installé, vous pouvez continuer sans rien faire.

![Select]({{ site.url }}/images/configuring_ide_eclipse_maven_processor.png)

__Remarque__: si vous avez déjà un projet JHipster existant et que vous n'avez pas installé le connecteur correspondant, vous devriez voir l'erreur ci-dessous :

`Plugin execution not covered by lifecycle configuration: org.bsc.maven:maven-processor-plugin:2.2.4:process (execution: process, phase: generate-sources)`

Sélectionnez Quick Fix/Ctrl+1 (Cmd+1 sur Mac) sur le marqueur d'erreur et sélectionnez "Discover new m2e connectors"

## 2. Exclusion des dossiers statiques générés

À ce stade, vous ne devriez avoir aucune erreur Java, mais vous pourriez encore voir des erreurs JavaScript. Cela est dû au fait que vous avez des fichiers JavaScript qu'Eclipse ne peut pas analyser correctement. Ces fichiers sont utilisés uniquement au moment de l'exécution et n'ont pas besoin d'être visibles dans votre espace de travail. Ils doivent être exclus.

### Exclure le dossier 'node_modules'

- Cliquez avec le bouton droit sur le projet -> Properties -> Resource -> Resource Filters
- Sélectionnez: Exclude all, Applies to folders, Name matches node_modules
- Appuyez sur "Ok"

![Right-click]({{ site.url }}/images/configuring_ide_eclipse_3.png)

![Exclude]({{ site.url }}/images/configuring_ide_eclipse_4.png)

### Exclure 'app' de src/main/webapp

- Cliquez avec le bouton droit sur le projet -> Properties -> Javascript -> Include path
- Cliquez sur l’onglet “source” et sélectionnez your_project/src/main/webapp
- Sélectionnez “Excluded: (None) -> Edit -> Add multiple
- Sélectionnez `app` et cliquez sur “Ok”
- Les dossiers suivants devraient avoir été automatiquement exclus (sinon, excluez-les manuellement) :
    - `bower_components`
    - `node_modules/`

![Right-click]({{ site.url }}/images/configuring_ide_eclipse_5.png)

![Exclude]({{ site.url }}/images/configuring_ide_eclipse_6.png)

![Multiple select]({{ site.url }}/images/configuring_ide_eclipse_7.png)

### Profil IDE Maven

Si vous utilisez Maven, vous devez activer le profil `IDE` dans Eclipse. Cela est utilisé pour appliquer des ajustements spécifiques à l'IDE, qui incluent actuellement l'application du processeur d'annotations MapStruct.

- Cliquez avec le bouton droit sur le projet -> Properties -> Maven
- Dans "Active Maven Profiles", tapez `dev,IDE`

Avec cette configuration, vous utiliserez à la fois les profils JHipster `dev` et `IDE`.

### Configuration des plugins MapStruct

Pour que l'IDE reconnaisse correctement le générateur de code MapStruct, quelques étapes supplémentaires sont nécessaires.

Vous devriez utiliser le plugin m2e-apt (https://marketplace.eclipse.org/content/m2e-apt). L'installation du plugin m2e-apt permet à Eclipse de fonctionner avec MapStruct.

Vous pouvez également installer le plugin MapStruct Eclipse Plugin (https://marketplace.eclipse.org/content/mapstruct-eclipse-plugin) pour obtenir de l'aide et des conseils de l'IDE.