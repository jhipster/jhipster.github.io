---
layout: default
title: Configuration de Jenkins 1
permalink: /setting-up-ci-jenkins1/
sitemap:
    priority: 0.7
    lastmod: 2016-11-03T12:40:00-00:00
---

# <i class="fa fa-wrench"></i> Configuration d'un serveur Jenkins

Pour configurer un serveur Jenkins pour JHipster, consultez les guides suivants :

- [Configuration de Jenkins 1 sur Linux]({{ site.url }}/configuration-ci-linux/)
- [Configuration de Jenkins 1 sur Windows]({{ site.url }}/configuration-ci-windows/)

# <i class="fa fa-sliders"></i> Configuration de Jenkins

Pour configurer un projet JHipster dans Jenkins, utilisez la configuration suivante :

## Pour Maven :

```
* Nom du projet : `nomDeVotreApplication`
* Gestion du code source
    * Référentiel Git : `git@github.com:xxxx/nomDeVotreApplication.git`
    * Branches à construire : `*/main`
    * Comportements supplémentaires : `Effacer le référentiel et forcer le clonage`
* Déclencheurs de construction
    * Poll SCM / Schedule: `H/5 * * * *`
* Construction<% if (buildTool == 'maven') { %>
    * Invoker Maven / Tâches : `-Pprod clean package`
    * Exécuter un shell / Commande :
        ````
        mvn spring-boot:run &
        bootPid=$!
        sleep 30s
        gulp itest
        kill $bootPid
        ````
* Actions post-construction
    * Publier le rapport de résultats de test JUnit / Fichiers XML du rapport de test : `build/test-results/*.xml`
```

## Pour Gradle :

```
* Nom du projet : `nomDeVotreApplication`
* Gestion du code source
    * Référentiel Git : `git@github.com:xxxx/nomDeVotreApplication.git`
    * Branches à construire : `*/main`
    * Comportements supplémentaires : `Effacer le référentiel et forcer le clonage`
* Déclencheurs de construction
    * Poll SCM / Schedule: `H/5 * * * *`
* Construction
    * Invoker le script Gradle / Utiliser le Wrapper Gradle / Tâches : `-Pprod clean test bootWar`
    * Exécuter un shell / Commande :
        ````
        ./gradlew bootRun &
        bootPid=$!
        sleep 30s
        gulp itest
        kill $bootPid
        ````
* Actions post-construction
    * Publier le rapport de résultats de test JUnit / Fichiers XML du rapport de test : `build/test-results/*.xml`
```