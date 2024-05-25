---
layout: default
title: Installation de JHipster
permalink: /installation/
redirect_from:
  - /installation.html
sitemap:
    priority: 0.7
    lastmod: 2018-08-30T08:20:00-00:00
---

# <i class="fa fa-cloud-download"></i> Installation de JHipster

## Types d'installation

Nous proposons 4 façons de travailler avec JHipster. En cas de doute, choisissez notre 2ème option, "Installation locale avec NPM":

*   [JHipster en ligne](https://start.jhipster.tech/) est une manière de générer une application sans installer JHipster au préalable.
*   "Installation locale avec NPM" est la manière classique de travailler avec JHipster. Tout est installé sur votre machine, ce qui peut être un peu complexe à mettre en place, mais c'est ainsi que la plupart des gens travaillent habituellement.
*   Le conteneur "[Docker](https://www.docker.io/)", qui vous offre un conteneur léger avec JHipster installé.

## JHipster en ligne (pour les utilisateurs désirant une manière simplifiée d'exécuter JHipster)

[JHipster en ligne](https://start.jhipster.tech/) vous permet de générer des applications JHipster, sans avoir à installer JHipster.

Ceci est destiné aux personnes essayant JHipster pour la première fois, ou qui veulent jeter un coup d'œil à ce que JHipster offre.

Bien que ce soit plus facile à utiliser, ce n'est pas l'"expérience complète de JHipster", et une fois votre application générée, vous devrez toujours suivre la plupart des étapes de la prochaine section ("Installation locale avec NPM"), car vous aurez toujours besoin de Java (pour exécuter votre application) et de NPM (pour gérer votre code front-end).

À l'avenir, nous nous attendons à ce que JHipster en ligne fournisse davantage de fonctionnalités.

## Installation locale avec NPM (recommandée pour les utilisateurs normaux)

### Configuration rapide

1.  Installez Java 17 ou 21 LTS. Nous vous recommandons d'utiliser les [versions Eclipse Temurin](https://adoptium.net/temurin/releases/?version=21), car elles sont open source et gratuites.
2.  Installez Node.js à partir [du site Web Node.js](http://nodejs.org/) (veuillez utiliser une version 64 bits LTS, les versions non LTS ne sont pas prises en charge)
3.  Installez JHipster: `npm install -g generator-jhipster`
4.  (optionnel) Si vous voulez utiliser un module ou un blueprint (par exemple à partir du [Marché JHipster]({{ site.url }}/modules/marketplace/#/list)), installez [Yeoman](https://yeoman.io/): `npm install -g yo`

Maintenant que JHipster est installé, votre prochaine étape est de [créer une application]({{ site.url }}/creating-an-app/)

### Installations optionnelles

1. Installez un outil de construction Java.
    * Que vous choisissiez d'utiliser [Maven](http://maven.apache.org/) ou [Gradle](http://www.gradle.org/), vous n'avez généralement rien à installer, car JHipster installera automatiquement le [Maven Wrapper](https://github.com/takari/maven-wrapper) ou le [Gradle Wrapper](http://gradle.org/docs/current/userguide/gradle_wrapper.html) pour vous.
    * Si vous ne voulez pas utiliser ces wrappers, rendez-vous sur le site officiel de [Maven](http://maven.apache.org/) ou [Gradle](http://www.gradle.org/) pour effectuer votre propre installation.
2. Installez Git à partir de [git-scm.com](http://git-scm.com/). Nous vous recommandons également d'utiliser un outil comme [SourceTree](http://www.sourcetreeapp.com/) si vous débutez avec Git.
    * JHipster essaiera de commiter votre projet dans Git, s'il est installé.
    * Le [sous-générateur de mise à niveau de JHipster]({{ site.url }}/upgrading-an-application/) nécessite d'avoir Git installé.

### Informations supplémentaires

JHipster utilise [Yeoman](http://yeoman.io/) pour la génération de code.
Pour trouver plus d'informations, des astuces et de l'aide, veuillez consulter [le guide de démarrage de Yeoman](http://yeoman.io/learning/index.html) avant [de soumettre un bogue](https://github.com/jhipster/generator-jhipster/issues?state=open).

La configuration sera stockée dans un fichier `.yo-rc.json` généré, il est donc **vivement** recommandé de ne pas générer un projet JHipster dans votre répertoire HOME. Si vous l'avez fait, vous ne pourrez pas générer un autre projet dans un sous-répertoire. Pour résoudre ce problème, supprimez le fichier `.yo-rc.json`.

## Installation Docker (pour les utilisateurs avancés uniquement)

_Veuillez noter: cette image Docker est pour exécuter le générateur JHipster à l'intérieur d'un conteneur. C'est complètement différent des [configurations Docker et Docker Compose]({{ site.url }}/docker-compose/) que JHipster générera, dont l'objectif est d'exécuter votre application générée à l'intérieur d'un conteneur_

### Informations

JHipster dispose d'un [Dockerfile](https://github.com/jhipster/generator-jhipster/blob/main/Dockerfile) spécifique, qui fournit une image [Docker](https://www.docker.io/).

Il réalise une "Construction automatique" Docker qui est disponible sur: [https://hub.docker.com/r/jhipster/jhipster/](https://hub.docker.com/r/jhipster/jhipster/)

Cette image vous permettra d'exécuter JHipster à l'intérieur de Docker.


### Prérequis

1.  **(Recommandé) Docker Desktop:** la manière la plus simple de construire, exécuter et tester les applications dockerisées. [Docker Desktop](https://docs.docker.com/desktop/) est livré avec une interface graphique pour gérer les conteneurs/images/volumes, les outils de développement Docker, le support Kubernetes et bien plus encore.
2.  **Moteur Docker:** application client-serveur avec interface en ligne de commande (CLI). Suivez les instructions d'installation du [moteur Docker](https://docs.docker.com/engine/install/)

Comme les fichiers générés sont dans votre dossier partagé, ils ne seront pas supprimés si vous arrêtez votre conteneur Docker. Cependant, si vous ne voulez pas que Docker continue de télécharger toutes les dépendances Maven et NPM à chaque fois que vous démarrez le conteneur, vous devriez commiter son état ou monter un volume.

<div class="alert alert-warning"><i>Attention: </i>

En fonction de votre OS, votre <code>DOCKER_HOST</code> sera différent. Sur Linux, ce sera localhost.
Pour Mac/Windows, vous devrez obtenir l'IP en utilisant la commande suivante: <code>docker-machine ip default</code>

</div>

Sur Linux, vous devrez peut-être exécuter la commande `docker` en tant qu'utilisateur root si votre utilisateur ne fait pas partie du groupe docker. Il est conseillé d'ajouter votre utilisateur au groupe docker pour pouvoir exécuter des commandes docker en tant qu'utilisateur non root. Suivez les étapes sur [http://askubuntu.com/a/477554](http://askubuntu.com/a/477554) pour le faire.

### Utilisation sur Linux/Mac Windows (avec Docker)

#### Tirer l'image

Tirez la dernière image Docker de JHipster:

`docker image pull jhipster/jhipster`

Tirez l'image Docker de développement JHipster:

`docker image pull jhipster/jhipster:master`

Vous pouvez voir toutes les balises [ici](https://hub.docker.com/r/jhipster/jhipster/tags/)

#### Exécuter l'image

<div class="alert alert-warning"><i>Attention: </i>

Si vous utilisez Docker Machine sur Mac ou Windows, votre démon Docker n'a qu'un accès limité à votre système de fichiers OS X ou Windows. Docker Machine essaie de partager automatiquement votre répertoire /Users (OS X) ou C:\Users\&lt;username&gt; (Windows). Vous devez donc créer le dossier du projet sous ces répertoires pour éviter tout problème de montage de volume.

</div>


Créez un dossier "jhipster" dans votre répertoire personnel:

`mkdir ~/jhipster`

Exécutez l'image Docker, avec les options suivantes:

*   Le dossier Docker "/home/jhipster/app" est partagé avec le dossier local "~/jhipster"
*   Transférer tous les ports exposés par Docker (8080 pour l'application Java, 9000 pour BrowserSync, 3001 pour l'interface utilisateur BrowserSync)

`docker container run --name jhipster -v ~/jhipster:/home/jhipster/app -v ~/.m2:/home/jhipster/.m2 -p 8080:8080 -p 9000:9000 -p 3001:3001 -d -t jhipster/jhipster`

<div class="alert alert-info"><i>Astuce: </i>

Si vous avez déjà démarré le conteneur une fois auparavant, vous n'avez pas besoin d'exécuter la commande ci-dessus, vous pouvez démarrer/arrêter le conteneur existant.

</div>

#### Vérifier si le conteneur est en cours d'exécution

Pour vérifier que votre conteneur est en cours d'exécution, utilisez la commande `docker container ps`:

    CONTAINER ID    IMAGE               COMMAND                 CREATED         STATUS          PORTS                                                       NAMES
    4ae16c0539a3    jhipster/jhipster   "tail -f /home/jhipst"  4 seconds ago   Up 3 seconds    0.0.0.0:9000-3001->9000-3001/tcp, 0.0.0.0:8080->8080/tcp    jhipster

#### Opérations courantes

*   Pour arrêter le conteneur, exécutez: `docker container stop jhipster`
*   Et pour redémarrer, exécutez: `docker container start jhipster`

Si vous mettez à jour l'image Docker (reconstruction ou tirage depuis le hub Docker), il est préférable de supprimer le conteneur existant, puis de le relancer. Pour ce faire, arrêtez d'abord le conteneur, supprimez-le, puis exécutez-le à nouveau:

1.  `docker container stop jhipster`
2.  `docker container rm jhipster`
3.  `docker image pull jhipster/jhipster`
4.  `docker container run --name jhipster -v ~/jhipster:/home/jhipster/app -v ~/.m2:/home/jhipster/.m2 -p 8080:8080 -p 9000:9000 -p 3001:3001 -d -t jhipster/jhipster`

### Accès au conteneur

<div class="alert alert-warning"><i>Attention: </i>

Sur Windows, vous devez exécuter le Terminal rapide Docker en tant qu'administrateur pour pouvoir créer des liens symboliques lors de l'étape `npm install`.

</div>

La manière la plus simple de vous connecter au conteneur en cours d'exécution est d'exécuter la commande suivante:

`docker container exec -it <container_name> bash`

Si vous avez copié-collé la commande ci-dessus pour exécuter le conteneur, notez que vous devez spécifier `jhipster` comme nom du conteneur:

`docker container exec -it jhipster bash`

Vous vous connecterez en tant qu'utilisateur "jhipster".

Si vous voulez vous connecter en tant que "root", comme la commande `sudo` n'est pas disponible dans Ubuntu Xenial, vous devez exécuter:

`docker container exec -it --user root jhipster bash`

### Votre premier projet

Vous pouvez ensuite accéder au répertoire /home/jhipster/app dans votre conteneur et commencer à construire votre application à l'intérieur de Docker:

`cd /home/jhipster/app`

`jhipster`

Une fois votre application créée, vous pouvez exécuter toutes les commandes normales gulp/bower/maven, par exemple:

`./mvnw`

**Félicitations! Vous avez lancé votre application JHipster dans Docker!**

Sur votre machine, vous devriez pouvoir:

*   Accéder à l'application en cours d'exécution à `http://DOCKER_HOST:8080`
*   Obtenir tous les fichiers générés dans votre dossier partagé

<div class="alert alert-warning"><i>Attention: </i>
    Par défaut, Docker n'est pas installé dans l'image <code>jhipster/jhipster</code>.
    <br/>
    Vous ne pourrez donc pas:
    <ul>
        <li>utiliser les fichiers docker-compose</li>
        <li>construire une image Docker avec le daemon docker (objectif Maven: <code>jib:dockerBuild</code> ou tâche Gradle: <code>jibDockerBuild</code>)</li>
    </ul>
    Cependant, vous pourrez utiliser le mode sans daemon de <a href="https://github.com/GoogleContainerTools/jib">jib</a> qui peut construire une image docker et la pousser vers un registre sans accès à un daemon docker (objectif Maven: <code>jib:build</code> ou tâche Gradle: <code>jibBuild</code>). Mais vous devrez configurer les informations d'identification pour le registre docker comme prérequis pour la construction de l'application. Consultez la <a href="https://github.com/GoogleContainerTools/jib/tree/master/jib-maven-plugin#configuration">documentation de configuration du plugin Jib</a> pour plus de détails.
</div>