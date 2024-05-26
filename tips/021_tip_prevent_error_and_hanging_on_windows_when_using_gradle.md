---
layout: default
title: Éviter les erreurs/blocages sur Windows lors de l'utilisation de Gradle
sitemap:
priority: 0.5
lastmod: 2017-01-03T22:30:00-00:00
---

# Éviter les erreurs/blocages sur Windows lors de l'utilisation de Gradle

## /!\ Ce conseil est obsolète depuis JHipster v4.1.1 car nous avons mis à niveau vers Gradle 3.4

__Conseil soumis par [@kaidohallik](https://github.com/kaidohallik)__

## Description du problème

Si vous utilisez cmd.exe sur Windows pour exécuter des tâches Gradle, des erreurs ou des blocages peuvent se produire :

1. parfois le processus se bloque simplement
2. parfois une erreur survient

```
FAILURE: Build failed with an exception.

* What went wrong:
Unable to process incoming event 'ProgressComplete ' (ProgressCompleteEvent)
```

## Quand le problème se produit

Le problème survient après qu'une commande ait produit certains symboles critiques et/ou une certaine quantité de symboles dans la fenêtre cmd.exe.
L'émergence du problème dépend de la hauteur de la taille du tampon d'écran. Plus elle est élevée, plus il y a de chances qu'aucune erreur/blocage ne se produise.
Mais le problème se reproduit également avec la hauteur maximale de la taille du tampon d'écran (9999).

## Solutions de contournement

Le problème ne survient jamais lorsque Gradle est utilisé avec les commutateurs suivants :

* `gradlew --info`
* `gradlew --debug`
* `gradlew --console plain`

Le problème peut parfois être évité avec les actions suivantes :

* augmenter la hauteur de la taille du tampon d'écran de cmd.exe, par exemple à la valeur maximale possible de 9999
* ouvrir une nouvelle fenêtre cmd.exe et l'utiliser pour exécuter des tâches Gradle

Dans les applications JHipster, ce problème a été reproduit avec les tâches Gradle suivantes :

* gulpConstantDev
* gulpBuildWithOpts
* npmInstall
* webpack

Il existe une astuce qui empêche cette erreur/blocage dans les applications JHipster. Il suffit de mettre le code suivant dans votre `build.gradle` :

```
tasks.withType(NodeTask) {
    doLast {
        println()
    }
}
tasks.withType(com.moowork.gradle.node.npm.NpmTask) {
    doLast {
        println()
    }
}
```

## Informations supplémentaires

Actuellement, il existe un [problème Gradle ouvert](https://github.com/gradle/gradle/issues/882) concernant le problème d'erreur/blocage décrit.
Il est possible que dans les versions futures de Gradle, le problème d'erreur/blocage décrit n'existe plus.
