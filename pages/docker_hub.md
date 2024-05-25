---
layout: default
title: Docker Hub
permalink: /docker-hub/
redirect_from:
  - /docker_hub.html
sitemap:
    priority: 0.7
    lastmod: 2016-09-25T00:00:00-00:00
---

# <i class="fa fa-cloud-upload"></i> Docker Hub

## Sommaire

[![]({{ site.url }}/images/logo/docker-hub.png)](https://hub.docker.com/u/jhipster/)

JHipster dispose de sa propre [organisation] sur Docker Hub et fournit différentes images Docker.

Le projet [jhipster-docker-hub] fournit tous les fichiers docker-compose pour lancer ces images.
Pour utiliser les commandes docker-compose, vous devez :

- cloner le projet : `git clone https://github.com/jhipster/jhipster-docker-hub`
- entrer dans le projet : `cd jhipster-docker-hub`

<div class="alert alert-warning"><i>Avertissement : </i>

En fonction de votre système d'exploitation, votre <code>DOCKER_HOST</code> sera différent. Sous Linux, ce sera <code>localhost</code>.
Pour Mac/Windows, vous devrez obtenir l'IP en utilisant la commande suivante : <code>docker-machine ip default</code>

</div>

## [jhipster/jhipster](https://hub.docker.com/r/jhipster/jhipster) : une installation alternative de JHipster

Voir la page [installation]({{ site.url }}/installation/) pour des instructions complètes.

Les commandes suivantes peuvent être utilisées dans des cas spécifiques.

### Utiliser la dernière version de JHipster

Lancer `jhipster` dans le dossier actuel, avec la dernière version

<pre>
docker container run --rm -it -v "$PWD":/home/jhipster/app jhipster/jhipster jhipster
</pre>

### Utiliser JHipster v3.0.0

Lancer `jhipster` dans le dossier actuel, avec une version plus ancienne :

<pre>
docker container run --rm -it -v "$PWD":/home/jhipster/app jhipster/jhipster:v3.0.0 jhipster
</pre>

Vous pouvez voir toutes les tags disponibles [ici](https://hub.docker.com/r/jhipster/jhipster/tags/)

## [jhipster/jdl-studio](https://hub.docker.com/r/jhipster/jdl-studio) : JDL-Studio hors ligne

Vous pouvez utiliser JDL-Studio hors ligne et y accéder à [http://localhost:18080](http://localhost:18080)

<pre>
docker container run -d -p 18080:80 jhipster/jdl-studio
</pre>

## [jhipster/jhipster-sample-app](https://hub.docker.com/r/jhipster/jhipster-sample-app)

Il s'agit d'une application exemple avec H2 ou MySQL.

### Lancement rapide

Lancer une application JHipster directement avec Docker, en profil développement

<pre>
docker container run -d -p 8080:8080 -e SPRING_PROFILES_ACTIVE=dev jhipster/jhipster-sample-app
</pre>

Vous pouvez alors accéder à l'application à [http://localhost:8080](http://localhost:8080)

### Profil développement

Lancer l'application en profil développement

<pre>
docker-compose -f jhipster-sample-app/dev.yml up
</pre>

### Profil production

Lancer l'application en profil production, avec la base de données MySQL

<pre>
docker-compose -f jhipster-sample-app/prod.yml up
</pre>

### Profil production et monitoring avec la pile ELK

Lancer l'application en profil production, avec la base de données MySQL et la pile ELK

<pre>
docker-compose -f jhipster-sample-app/prod-elk.yml up
</pre>

Accéder à l'application en cours d'exécution à [http://localhost:8080](http://localhost:8080)

Accéder au tableau de bord Kibana à [http://localhost:5601](http://localhost:5601)

## [jhipster/jhipster-sample-app-elasticsearch](https://hub.docker.com/r/jhipster/jhipster-sample-app-elasticsearch)

Il s'agit d'une application exemple avec MySQL et Elasticsearch.

### Profil développement

Lancer l'application en profil développement

<pre>
docker-compose -f jhipster-sample-app-elasticsearch/dev.yml up
</pre>

### Profil production

Lancer l'application en profil production, avec la base de données MySQL et Elasticsearch

<pre>
docker-compose -f jhipster-sample-app-elasticsearch/prod.yml up
</pre>

## [jhipster/jhipster-sample-app-mongodb](https://hub.docker.com/r/jhipster/jhipster-sample-app-mongodb)

Il s'agit d'une application exemple avec MongoDB.

### Profil production

Lancer l'application en profil production, avec la base de données MongoDB

<pre>
docker-compose -f jhipster-sample-app-mongodb/prod.yml up
</pre>

## [jhipster/jhipster-sample-app-cassandra](https://hub.docker.com/r/jhipster/jhipster-sample-app-cassandra)

Il s'agit d'une application exemple avec un cluster Cassandra.

### Profil production

Lancer l'application en profil production, avec le cluster Cassandra

<pre>
docker-compose -f jhipster-sample-app-cassandra/prod.yml up
</pre>

Scaler un nœud Cassandra

<pre>
docker-compose -f jhipster-sample-app-cassandra/prod.yml scale sample-cassandra-node=2
</pre>

[organisation]: https://hub.docker.com/u/jhipster/
[jhipster-docker-hub]: https://github.com/jhipster/jhipster-docker-hub

## Architecture microservices

Les images utilisées ici sont :

- [jhipster/jhipster-registry](https://hub.docker.com/r/jhipster/jhipster-registry)
- [jhipster/jhipster-sample-app-gateway](https://hub.docker.com/r/jhipster/jhipster-sample-app-gateway)
- [jhipster/jhipster-sample-app-microservice](https://hub.docker.com/r/jhipster/jhipster-sample-app-microservice)

### Profil production

Lancer toute la stack en profil production

<pre>
docker-compose -f jhipster-sample-microservices/prod/prod.yml up
</pre>

Cela va démarrer :

- Consul ou le JHipster Registry
- la passerelle (gateway)
- une base de données MySQL
- le microservice
- une base de données PostgreSQL

Scaler le microservice

<pre>
docker-compose -f jhipster-sample-microservices/prod/prod.yml scale jhipstersamplemicroservice-app=2
</pre>

### Profil production et monitoring avec la pile ELK

Lancer toute la stack en profil production, avec la pile ELK

<pre>
docker-compose -f jhipster-sample-microservices/prod-elk/prod-elk.yml up
</pre>

Scaler le microservice

<pre>
docker-compose -f jhipster-sample-microservices/prod-elk/prod-elk.yml scale jhipstersamplemicroservice-app=2
</pre>

Accéder au registre à : [http://localhost:8761](http://localhost:8761)

Accéder à la passerelle à : [http://localhost:8080](http://localhost:8080)

Accéder au tableau de bord Kibana à : [http://localhost:5601](http://localhost:5601)