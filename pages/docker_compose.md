---
layout: default
title: Docker et Docker Compose
permalink: /docker-compose/
redirect_from:
  - /docker_compose.html
sitemap:
    priority: 0.7
    lastmod: 2016-12-01T00:00:00-00:00
---

# <i class="fa fa-music"></i> Docker et Docker Compose

## Sommaire

L'utilisation de Docker et Docker Compose est fortement recommandée en développement, et est également une bonne solution en production.

1. [Description](#1)
2. [Prérequis](#2)
3. [Construction d'une image Docker de votre application](#3)
4. [Génération d'une configuration Docker-Compose personnalisée pour plusieurs applications](#docker-compose-subgen)
5. [Travailler avec des bases de données](#4)
6. [Elasticsearch](#5)
7. [Sonar](#6)
7. [Keycloak](#7)
8. [Commandes courantes](#8)
9. [Ajustement de la mémoire](#9)

<h2 id="1">Description</h2>

_Remarque : cette configuration Docker est utilisée pour exécuter votre (vos) application(s) générée(s) dans une image de conteneur. Elle est complètement différente de la [configuration Docker]({{ site.url }}/installation/) que JHipster propose également, qui est destinée à exécuter le générateur JHipster dans un conteneur._

JHipster fournit un support complet de Docker afin de :

- Faciliter le développement, car vous pouvez démarrer une infrastructure complète avec une seule commande, même lorsque vous utilisez une architecture de microservices complexe.
- Pour les personnes utilisant Docker Swarm, déployer directement en production, car il utilise la même configuration Docker Compose.

Une fonctionnalité intéressante de l'utilisation de Docker Compose est que vous pouvez faire évoluer vos conteneurs en utilisant la commande `docker-compose scale`. Cela est très intéressant si vous utilisez JHipster avec [une architecture de microservices](#3).

Lors de la génération de votre application, JHipster génère pour vous plusieurs configurations Docker Compose pour vous aider à exécuter votre application avec des services tiers, par exemple une base de données. Ces fichiers sont situés dans le dossier `src/main/docker/`.

<h2 id="2">Prérequis</h2>

Vous devez installer Docker et Docker Compose :

- [Docker](https://docs.docker.com/installation/#installation)
- [Docker Compose](https://docs.docker.com/compose/install)

Docker nécessite désormais de créer un compte sur le store Docker pour télécharger Docker pour Mac et Docker pour Windows. Pour contourner cela :

<div class="alert alert-info"><i>Conseil : </i>

Sur Windows et Mac OS X, Kitematic est une interface graphique facile à utiliser fournie avec le Docker Toolbox, ce qui facilitera grandement l'utilisation de Docker.

</div>

<div class="alert alert-warning"><i>Attention : </i>

Si vous utilisez Docker Machine sur Mac ou Windows, votre démon Docker a un accès limité à votre système de fichiers OS X ou Windows. Docker Machine essaie de partager automatiquement votre répertoire /Users (OS X) ou C:\Users\&lt;username&gt; (Windows). Vous devez donc créer le dossier de votre projet sous ce répertoire pour éviter tout problème.

</div>

Si vous rencontrez l'erreur `npm ERR! Error: EACCES: permission denied` lors de l'installation de JHipster UML (ou de tout autre package non intégré), votre conteneur peut ne pas avoir `sudo` installé (par exemple, sudo n'est pas inclus avec Ubuntu Xenial).

__Solution 1__

La documentation NPM recommande de ne pas installer de package NPM en tant que root. Suivez la [documentation officielle](https://docs.npmjs.com/getting-started/fixing-npm-permissions) pour résoudre ce problème.

__Solution 2__

  - `docker container exec -u root -it jhipster bash`,
  - `npm install -g YOUR_PACKAGE`,
  - puis sortez et connectez-vous normalement au conteneur : `docker container exec -it jhipster bash`

<h2 id="3">Construire et exécuter une image Docker de votre application</h2>

Pour construire une image Docker de votre application en utilisant [Jib](https://github.com/GoogleContainerTools/jib) en se connectant au démon Docker local :

- NPM : `npm run java:docker`, sur Apple Silicon : `npm run java:docker:arm64`
- Maven : `./mvnw package -Pprod verify jib:dockerBuild`
- Gradle : `./gradlew -Pprod bootJar jibDockerBuild`

Pour construire une image Docker de votre application sans Docker et la pousser directement dans votre registre Docker, exécutez :

- Maven : `./mvnw package -Pprod verify jib:build -Djib.to.image=<dockerhub-username>/<artifact-id>`
- Gradle : `./gradlew -Pprod bootJar jib -Djib.to.image=<dockerhub-username>/<artifact-id>`

Si cela ne fonctionne pas directement pour vous, consultez la documentation de Jib pour les détails de configuration, notamment concernant la configuration de l'authentification à un registre Docker :

- [Documentation du plugin Jib Maven](https://github.com/GoogleContainerTools/jib/tree/master/jib-maven-plugin#configuration)
- [Documentation du plugin Jib Gradle](https://github.com/GoogleContainerTools/jib/tree/master/jib-gradle-plugin#configuration)

<div id="3-warning" class="alert alert-warning"><i>Attention : </i>
<p>
En raison de la manière dont Jib fonctionne, il essaiera d'abord de récupérer la dernière version de l'image Docker de base à partir du registre Docker configuré. Cela est intentionnel car dans un environnement CI, vous devez vous assurer de toujours construire sur la dernière image de base mise à jour.
</p>
<p>
Cependant, dans un environnement local, cela peut échouer si jib ne peut pas accéder au registre Docker. Une solution de contournement consiste à utiliser le drapeau `--offline` et cela résoudra le problème tant que jib aura déjà récupéré l'image Docker de base dans son cache.
</p>
<p>
Avec Maven, tapez : <pre>./mvnw -Pprod package verify jib:dockerBuild --offline</pre>
Avec Gradle, tapez : <pre>./gradlew -Pprod bootJar jibDockerBuild --offline</pre>
</p>
<p>
Si jib n'a pas déjà récupéré l'image Docker de base dans son cache, pour ce faire, vous devez modifier le pom.xml (dans le cas de Maven) ou le docker.gradle (dans le cas de Gradle) en ajoutant `docker://` comme préfixe de votre image de base (à la balise "image", imbriquée dans la balise "from").
</p>
<p>
Exemple : <pre>docker://imagename:latest</pre>
De cette manière, jib met l'image présente dans votre démon docker local dans son cache.
</p>
</div>

Pour exécuter cette image, utilisez la configuration Docker Compose située dans le dossier `src/main/docker` de votre application :

- `docker-compose -f src/main/docker/app.yml up`

Cette commande démarrera votre application et les services dont elle dépend (base de données, moteur de recherche, Consul, JHipster Registry...).

Si vous avez choisi OAuth 2.0 pour l'authentification, assurez-vous de lire notre [section Keycloak sur cette documentation](#7).

<h2 id="docker-compose-subgen">Génération d'une configuration Docker-Compose personnalisée pour plusieurs applications</h2>

Si votre architecture est composée de plusieurs applications JHipster, vous pouvez utiliser le sous-générateur spécifique `docker-compose`, qui générera une configuration Docker Compose globale pour toutes les applications sélectionnées. Cela vous permettra de déployer et de faire évoluer votre architecture complète avec une seule commande.
Pour utiliser le sous-générateur `docker-compose` :

- Vous devez avoir tous vos monolithes, passerelles et microservices dans le même répertoire.
- Créez un autre répertoire, par exemple `mkdir docker-compose`.
- Allez dans ce répertoire : `cd docker-compose`.
- Exécutez le sous-générateur : `jhipster docker-compose`.
- Le sous-générateur vous demandera quelles applications vous souhaitez avoir dans votre architecture, et si vous souhaitez configurer la surveillance avec ELK ou Prometheus.

Cela générera une configuration Docker Compose globale, tapez `docker-compose up` pour l'exécuter, et avoir tous vos services en cours d'exécution en même temps.

Dans le cas d'une architecture microservices, cette configuration pré-configurera également Consul ou JHipster Registry, qui configurera automatiquement vos services :

- Ces services attendront que Consul (ou JHipster Registry) soit en cours d'exécution pour démarrer. Cela peut être configuré dans votre fichier `bootstrap-prod.yml` en utilisant les clés `spring.cloud[.consul].config.fail-fast` et `spring.cloud[.consul].config.retry`.
- Le registre configurera vos applications, par exemple il partagera le jeton secret JWT entre tous les services.
- La mise à l'échelle de chaque service se fait à l'aide de Docker Compose, par exemple tapez `docker-compose scale test-app=4` pour avoir 4 instances de l'application "test" en cours d'exécution. Ces instances seront automatiquement équilibrées par les passerelles et rejoindront automatiquement le même cluster Hazelcast (si Hazelcast est votre cache de deuxième niveau Hibernate).

<h2 id="4">Travailler avec des bases de données</h2>

### MySQL, MariaDB, PostgreSQL, Oracle, MongoDB, Couchbase, Neo4j ou Cassandra

Exécuter `docker-compose -f src/main/docker/app.yml up` démarre déjà automatiquement votre base de données.

Si vous ne souhaitez démarrer que votre base de données, et non les autres services, utilisez la configuration Docker Compose de votre base de données :

- Avec MySQL : `docker-compose -f src/main/docker/mysql.yml up`
- Avec MariaDB : `docker-compose -f src/main/docker/mariadb.yml up`
- Avec PostgreSQL : `docker-compose -f src/main/docker/postgresql.yml up`
- Avec Oracle : `docker-compose -f src/main/docker/oracle.yml up`
- Avec MongoDB : `docker-compose -f src/main/docker/mongodb.yml up`
- Avec Cassandra : `docker-compose -f src/main/docker/cassandra.yml up`
- Avec Couchbase : `docker-compose -f src/main/docker/couchbase.yml up`
- Avec Neo4j : `docker-compose -f src/main/docker/neo4j.yml up`

### Mode Cluster MongoDB

Si vous souhaitez utiliser MongoDB avec un jeu de réplicas ou des shards et une configuration partagée entre eux, vous devez construire et configurer manuellement les images MongoDB.
Suivez ces étapes pour ce faire :

- Construisez l'image : `docker-compose -f src/main/docker/mongodb-cluster.yml build`
- Exécutez la base de données : `docker-compose -f src/main/docker/mongodb-cluster.yml up -d`
- Mettez à l'échelle le service de nœud MongoDB (vous devez choisir un nombre impair de nœuds) : `docker-compose -f src/main/docker/mongodb-cluster.yml scale <name_of_your_app>-mongodb-node=<X>`
- Initialisez la réplique pour le serveur de configuration mongo : `docker exec -it <name_of_your_app>-mongodb-config mongo --port 27019 --eval 'rs.initiate();'`
- Initialisez le jeu de réplicas (le paramètre X est le nombre de nœuds que vous avez entré à l'étape précédente, le dossier est le dossier où se trouve le fichier YML, il est `docker` par défaut) : `docker container exec -it <yml_folder_name>_<name_of_your_app>-mongodb-node_1 mongo --port 27018 --eval 'var param=<X>, folder="<yml_folder_name>"' init_replicaset.js`
- Initialisez le shard : `docker container exec -it <yml_folder_name>_<name_of_your_app>-mongodb_1 mongo --eval 'sh.addShard("rs1/<yml_folder_name>_<name_of_your_app>-mongodb-node_1:27018")'`
- Construisez une image Docker de votre application : `./mvnw -Pprod clean verify jib:dockerBuild` ou `./gradlew -Pprod clean bootJar jibDockerBuild`
- Démarrez votre application : `docker-compose -f src/main/docker/app.yml up -d <name_of_your_app>-app`

Si vous souhaitez ajouter ou supprimer des nœuds MongoDB, répétez les étapes 3 et 4.

### Mode Cluster de Couchbase

Si vous souhaitez utiliser Couchbase avec plusieurs nœuds, vous devez construire et configurer manuellement les images Couchbase.
Suivez ces étapes pour le faire :

- Construire l'image : `docker-compose -f src/main/docker/couchbase-cluster.yml build`
- Démarrer la base de données : `docker-compose -f src/main/docker/couchbase-cluster.yml up -d`
- Scaler le service de nœud Couchbase (vous devez choisir un nombre impair de nœuds) : `docker-compose -f src/main/docker/couchbase-cluster.yml scale <nom_de_votre_app>-couchbase-node=<X>`
- Construire une image Docker de votre application : `./mvnw -Pprod clean verify jib:dockerBuild` ou `./gradlew -Pprod clean bootJar jibDockerBuild`
- Démarrer votre application : `docker-compose -f src/main/docker/app.yml up -d <nom_de_votre_app>-app`

### Cassandra

Contrairement aux autres bases de données, où les migrations de schéma sont appliquées par l'application elle-même, les migrations de schéma Cassandra sont appliquées par un conteneur Docker dédié.

<h4 id="cassandra-en-developpement">Cassandra en développement</h4>
Pour démarrer un cluster Cassandra pour exécuter votre application localement, vous pouvez utiliser le fichier docker_compose pour le développement :
`docker-compose -f src/main/docker/cassandra.yml up -d`

Docker-compose démarrera 2 services :

- `<nom_de_votre_app>-cassandra` : un conteneur avec le point de contact du nœud Cassandra
- `<nom_de_votre_app>-cassandra-migration` : un conteneur pour appliquer automatiquement tous les scripts de migration CQL (créer le Keyspace, créer les tables, toutes les migrations de données, ...)

Voir la [page Cassandra]({{ site.url }}/using-cassandra/) pour plus d'informations sur la façon d'ajouter de nouveaux scripts CQL sans redémarrer le cluster local.

#### Cassandra en production:
Le fichier `app.yml` docker-compose utilise `cassandra-cluster.yml` pour configurer le cluster.
L'application démarre après quelques secondes (voir la variable _JHIPSTER_SLEEP_) pour laisser le temps au cluster de démarrer et aux migrations d'être appliquées.

Une grande différence entre Cassandra et les autres bases de données est que vous pouvez scaler votre cluster avec Docker Compose. Pour avoir X+1 nœuds dans votre cluster, exécutez :

- `docker-compose -f src/main/docker/cassandra-cluster.yml scale <nom_de_votre_app>-cassandra-node=X`

### Microsoft SQL Server

Si vous souhaitez utiliser l'image Docker MSSQL avec JHipster, voici quelques étapes à suivre :

- Augmentez la RAM disponible pour Docker à au moins 3,25 Go
- Démarrez la base de données : `docker-compose -f src/main/docker/mssql.yml up -d`
- Créez la base de données avec un client MSSQL de votre choix
- Démarrez votre application : `docker-compose -f src/main/docker/app.yml up -d <nom_de_votre_app>-app`

<h2 id="5">Elasticsearch</h2>

L'exécution de `docker-compose -f src/main/docker/app.yml up` démarre déjà votre moteur de recherche automatiquement.

Si vous souhaitez seulement démarrer votre nœud Elasticsearch, et non les autres services, utilisez sa configuration Docker Compose spécifique :

- `docker-compose -f src/main/docker/elasticsearch.yml up`

<h2 id="6">Sonar</h2>

Une configuration Docker Compose est générée pour exécuter Sonar :

- `docker-compose -f src/main/docker/sonar.yml up`

Pour analyser votre code, exécutez Sonar sur votre projet :

- Avec Maven : `./mvnw initialize sonar:sonar`
- Avec Gradle : `./gradlew sonar`

Les rapports Sonar seront disponibles à l'adresse suivante : [http://localhost:9000](http://localhost:9000)

<h2 id="7">Keycloak</h2>

Si vous avez choisi OAuth 2.0 comme méthode d'authentification, Keycloak est utilisé comme fournisseur d'identité par défaut. L'exécution de `docker-compose -f src/main/docker/app.yml up` démarre automatiquement Keycloak.

Pour faire fonctionner Keycloak, vous devez ajouter la ligne suivante à votre fichier hosts (`/etc/hosts` sur Mac/Linux, `c:\Windows\System32\Drivers\etc\hosts` sur Windows).

<pre>
127.0.0.1	keycloak
</pre>

Ceci est nécessaire car vous accéderez à votre application avec un navigateur sur votre machine (dont le nom est localhost, ou `127.0.0.1`), mais à l'intérieur de Docker, elle fonctionnera dans son propre conteneur, dont le nom est `keycloak`.

Si vous souhaitez uniquement démarrer Keycloak, et non les autres services, utilisez sa configuration Docker Compose spécifique :

- `docker-compose -f src/main/docker/keycloak.yml up`

<h2 id="8">Commandes courantes</h2>

### Lister les conteneurs

Vous pouvez utiliser `docker container ps -a` pour lister tous les conteneurs

    $ docker container ps -a
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
    fc35e1090021        mysql               "/entrypoint.sh mysql"   4 seconds ago       Up 4 seconds        0.0.0.0:3306->3306/tcp   sampleApplication-mysql

### Statistiques Docker pour les conteneurs
`docker container stats` ou {% raw %}`docker container stats $(docker container ps --format={{.Names}})`{% endraw %} pour lister tous les conteneurs en cours d'exécution avec les statistiques de CPU, de mémoire, de réseau I/O et de Block I/O.

    $ docker container stats {% raw %}$(docker container ps --format={{.Names}}){% endraw %}
    CONTAINER                 CPU %               MEM USAGE / LIMIT     MEM %               NET I/O               BLOCK I/O             PIDS
    jhips-mysql               0.04%               221 MB / 7.966 GB     2.77%               66.69 kB / 36.78 kB   8.802 MB / 302.5 MB   37
    00compose_msmongo-app_1   0.09%               965.6 MB / 7.966 GB   12.12%              121.3 kB / 54.64 kB   89.84 MB / 14.88 MB   35
    00compose_gateway-app_1   0.39%               1.106 GB / 7.966 GB   13.89%              227.5 kB / 484 kB     117 MB / 28.84 MB     92
    jhipster-registry         0.74%               1.018 GB / 7.966 GB   12.78%              120.2 kB / 126.4 kB   91.12 MB / 139.3 kB   63
    gateway-elasticsearch     0.27%               249.1 MB / 7.966 GB   3.13%               42.57 kB / 21.33 kB   48.16 MB / 4.096 kB   58
    00compose_jhips-app_1     0.29%               1.042 GB / 7.966 GB   13.08%              101.8 kB / 78.84 kB   70.08 MB / 13.5 MB    68
    msmongo-mongodb           0.34%               44.8 MB / 7.966 GB    0.56%               49.72 kB / 48.08 kB   33.97 MB / 811 kB     18
    gateway-mysql             0.03%               202.7 MB / 7.966 GB   2.54%               60.84 kB / 31.22 kB   27.03 MB / 297 MB     37

### Scaler un conteneur

Exécutez `docker-compose scale test-app=4` pour avoir 4 instances de l'application "test" en cours d'exécution.

### Arrêter les conteneurs

`docker-compose -f src/main/docker/app.yml stop`

Vous pouvez également utiliser directement Docker :

`docker container stop <container_id>`

Lorsque vous arrêtez un conteneur, les données ne sont pas supprimées, sauf si vous supprimez le conteneur.

### Supprimer un conteneur

Attention ! Toutes les données seront supprimées :

`docker container rm <container_id>`

<h2 id="9">Ajustement de la mémoire</h2>

Afin d'optimiser l'utilisation de la mémoire pour les applications fonctionnant dans le conteneur, vous pouvez configurer les paramètres de mémoire Java dans le `Dockerfile` ou le `docker-compose.yml`.

### Ajouter des paramètres de mémoire au Dockerfile

Définir la variable d'environnement.

    ENV JAVA_OPTS=-Xmx512m -Xms256m

### Ajouter des paramètres de mémoire au docker-compose.yml

Cette solution est préférable par rapport au Dockerfile. De cette manière, vous avez un point de contrôle unique pour la configuration de la mémoire sur tous les conteneurs qui composent votre application.

Ajoutez `JAVA_OPTS` dans la section `environment`.

<pre>
    environment:
      - (...)
      - JAVA_OPTS=-Xmx512m -Xms256m
</pre>

Selon l'image de base Docker, `JAVA_OPTS` ne fonctionnera pas. Dans ce cas, essayez d'utiliser `_JAVA_OPTIONS` à la place :

<pre>
    environment:
      - (...)
      - _JAVA_OPTIONS=-Xmx512m -Xms256m
</pre>