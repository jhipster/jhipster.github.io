---
layout: default
title: Configurer Intellij IDEA
permalink: /configuring-ide-idea/
redirect_from:
  - /configuring_ide_idea.html
sitemap:
    priority: 0.7
    lastmod: 2015-11-28T17:13:00-00:00
---

# <i class="fa fa-keyboard-o"></i> Configurer Intellij IDEA

## Ouvrir votre projet

- Ouvrez votre projet normalement
- Maven devrait être détecté et votre projet se construira automatiquement

Si vous souhaitez plus de contrôle sur votre configuration, vous pouvez également choisir "Importer le projet".

## Exclure les répertoires

Si vous utilisez Git, initialisez votre projet (`git init && git add . && git commit -m 'Initial commit'`), Intellij IDEA exclura automatiquement les répertoires ignorés par Git (vous n'avez donc rien à faire).

Pour exclure les répertoires manuellement :

- Cliquez avec le bouton droit sur le dossier `node_modules/`
- Sélectionnez "Mark Directory As" et choisissez "Excluded"

![Exclude]({{ site.url }}/images/configuring_ide_idea_1.png)

**Remarque:** Si vous utilisez Intellij IDEA Ultimate et souhaitez utiliser IDEA pour coder le frontend, vous ne devez **pas** exclure le dossier `node_modules`. Sinon, vous n'aurez pas d'assistance au code pour le frontend !

## Support de Spring (non disponible dans l'édition communautaire)

Pour ajouter le support de Spring à plusieurs modules JHipster à partir d'un nouveau projet, allez d'abord dans `File → Project Structure`.

![Project Structure]({{ site.url }}/images/configuring_ide_idea_2.png)

Ensuite, allez dans l'onglet Modules, cliquez sur le bouton `+`, puis sur "Spring" pour ajouter l'assistance au code Spring à votre projet.

![Spring]({{ site.url }}/images/configuring_ide_idea_3.png)

Il vous indiquera qu'il y a des fichiers de configuration Spring non mappés. Cliquez sur le signe `+` en bas à droite (pas celui d'origine) et sélectionnez tous les fichiers Spring appartenant à votre projet, cliquer sur le dossier suffit pour tout sélectionner.

![Spring Application Context]({{ site.url }}/images/configuring_ide_idea_4.png)

Après cela, cliquez sur `OK` et Spring devrait être configuré avec une assistance au code appropriée.

Cliquez maintenant sur le bouton `+` d'origine que vous avez utilisé pour ajouter Spring et ajoutez Hibernate. Vous n'avez pas besoin d'ajouter de fichiers pour celui-ci, l'ajouter là vous donnera une assistance au code basée sur Hibernate. N'oubliez pas de cliquer sur `OK` dans la boîte de dialogue de la structure du projet.

Vous devriez maintenant avoir un support Spring pour la plupart de la base de code. Vous devez répéter cette étape chaque fois que vous démarrez un nouveau projet, car ces paramètres sont spécifiques au projet.

## Redémarrage à chaud de l'application avec Spring Boot devtools

[Spring Boot devtools](https://docs.spring.io/spring-boot/docs/current/reference/html/using-boot-devtools.html) est configuré par JHipster et "redémarrera à chaud" votre application lorsque les classes de votre projet seront compilées. C'est une fonctionnalité indispensable, car elle met à jour votre application à la volée.

Par défaut, IntelliJ IDEA ne compile pas automatiquement les fichiers lorsque l'application est en cours d'exécution. Pour activer la fonctionnalité "Compile on save" :

* Allez dans `File -> Settings -> Build, Execution, Deployment -> Compiler` et activez "Make project automatically"
* Ouvrez la fenêtre d'action :
  * Linux : `CTRL+SHIFT+A`
  * Mac OSX : `SHIFT+COMMAND+A`
  * Windows : `CTRL+ALT+SHIFT+/`
* Entrez `Registry...` et activez `compiler.automake.allow.when.app.running`

Remarque : Pour IntelliJ IDEA version 2021.2
* Allez dans `File -> Settings -> Build, Execution, Deployment -> Compiler` et activez "Build project automatically"
* Allez dans `File -> Advanced Settings -> Compiler` et activez "Allow auto-make to start even if developed application is currently running"

## Profil IDE Maven

Si vous utilisez Maven, vous devez activer le profil `IDE` dans IntelliJ. Cela est utilisé pour appliquer des ajustements spécifiques à l'IDE, qui incluent actuellement l'application du processeur d'annotations MapStruct.

Ouvrez la fenêtre "Maven Projects" (View -> Tool Windows), cochez le profil `IDE` maven pour l'activer.

## Gradle

Pour tirer le meilleur parti de l'expérience out-of-the-box avec Gradle, vous devez déléguer toutes les [actions de construction/exécution de l'IDE à Gradle](https://www.jetbrains.com/idea/whatsnew/#v2017-3-gradle) directement. Avec ce paramètre, le traitement des annotations est automatiquement configuré et vous n'aurez pas de classes dupliquées lors de la combinaison des constructions IDE et CLI. Si vous utilisez une version antérieure ( < 2016.3), vous devez activer le traitement des annotations manuellement.
