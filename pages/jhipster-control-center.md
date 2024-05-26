---
layout: default
title: Le Centre de contrôle JHipster
permalink: /jhipster-control-center/
sitemap:
    priority: 0.7
    lastmod: 2020-10-20T00:00:00-00:00
---

# <i class="fa fa-codepen"></i> Le Centre de contrôle JHipster

## Aperçu

Le but principal du Centre de contrôle JHipster est de surveiller et de gérer les applications.

Toutes ses fonctionnalités sont regroupées dans une application externe avec une interface utilisateur moderne basée sur Vue. Son code source est disponible sur GitHub sous l'organisation JHipster à l'adresse [jhipster/jhipster-control-center](https://github.com/jhipster/jhipster-control-center).

![]({{ site.url }}/images/jhipster-control-center-animation.gif)

## Sommaire

1. [Profils Spring spécifiques](#profiles)
2. [Installation](#installation)
3. [Architecture](#architecture)
4. [Mécanisme d'authentification](#authentication)
5. [Fonctionnalités](#features)

<h2 id="profiles"> Profils Spring spécifiques</h2>

**Le Centre de contrôle utilise les profils Spring `dev` et `prod` habituels de JHipster. Mais, pour fonctionner correctement, il doit être démarré avec un profil Spring correspondant à un backend de découverte Spring Cloud.**

- `eureka` : Se connecte à un serveur Eureka et récupère ses instances enregistrées, configurées dans application-eureka.yml
- `consul` : Se connecte à un serveur Consul et récupère ses instances enregistrées, configurées dans application-consul.yml
- `static` : Utilise une liste statique d'instances fournies en tant que propriétés, configurées dans application-static.yml
- `kubernetes` : Configuré dans application-kubernetes.yml

Cela est très utile pour les architectures de microservices : c'est ainsi que le Centre de contrôle sait quels microservices sont disponibles et quelles instances sont actives.

Pour toutes les applications, y compris les monolithes, c'est ainsi que le cache distribué Hazelcast peut se redimensionner automatiquement, voir [la documentation sur le cache Hazelcast]({{ site.url }}/using-cache/)

<h2 id="installation">Installation</h2>

### Exécution en local

* ### Étape 1 : Exécutez le serveur utilisé par le backend de découverte Spring Cloud

    Des fichiers docker-compose existent pour Eureka et Consul sous src/main/docker pour faciliter le test du projet (voir [profils Spring spécifiques](#profiles)).

    - pour Consul : exécutez `docker-compose -f src/main/docker/consul.yml up -d`
    - pour Eureka : exécutez `docker-compose -f src/main/docker/jhipster-registry.yml up -d`
    - pour Kubernetes : consultez [la documentation Kubernetes](https://www.jhipster.tech/kubernetes/#deploying-to-kubernetes)
    - Sinon, pour utiliser une liste statique d'instances, vous pouvez passer directement à l'étape suivante.

* ### Étape 2 : Choisissez votre profil d'authentification

    Il existe 2 types d'authentification (voir [mécanisme d'authentification](#authentication)) :

    - JWT : Il s'agit de l'authentification par défaut, si vous choisissez celle-ci, vous n'avez rien à faire.
    - OAuth2 : Pour utiliser l'authentification OAuth2, vous devez lancer Keycloak. Exécutez `docker-compose -f src/main/docker/keycloak.yml up -d`
    

* ### Étape 3 : Exécutez le projet cloné

    Exécutez le Centre de contrôle en fonction des profils Spring spécifiques que vous souhaitez, voici quelques exemples :

    - Pour le développement avec JWT et Consul, exécutez `./mvnw -Dspring.profiles.active=consul,dev`
    - Pour le développement avec JWT et Eureka, exécutez `./mvnw -Dspring.profiles.active=eureka,dev`
    - Pour le développement avec JWT et une liste statique d'instances, exécutez `./mvnw -Dspring.profiles.active=static,dev`
    - Pour le développement avec OAuth2 et Consul, exécutez `./mvnw -Dspring.profiles.active=consul,dev,oauth2`
    - Pour le développement avec OAuth2 et Eureka, exécutez `./mvnw -Dspring.profiles.active=eureka,dev,oauth2`
    - Pour simplement démarrer en développement, exécutez `./mvnw` et dans un autre terminal exécutez `npm start` pour le rechargement à chaud du code côté client

### Exécution depuis Docker

Une image de conteneur a été rendue disponible sur Docker hub. Pour l'utiliser, exécutez ces commandes :

- `docker pull jhipster/jhipster-control-center`
- `docker run -d --name jhcc -p 7419:7419 jhipster/jhipster-control-center:latest`

<h2 id="architecture">Architecture</h2>

Il s'agit d'une application web standard qui se connecte à une ou plusieurs applications JHipster via leurs points de terminaison d'API de gestion. Ces points de terminaison de gestion peuvent être exposés sur le port API standard (typiquement 8080, 8081, ...) ou de préférence sur un port de gestion dédié (typiquement 9999) afin qu'ils soient isolés du monde extérieur.

Le Centre de contrôle utilise [Spring Cloud Gateway](https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/) pour le routage des API et Spring Cloud LoadBalancer pour fournir un équilibrage de charge côté client dans les appels à un autre microservice (Ribbons est désactivé par défaut pour utiliser la mise en œuvre de l'équilibrage de charge par Spring Cloud LoadBalancer).

![]({{ site.url }}/images/jhipster-control-center-architecture.png)


<h2 id="authentication">Mécanisme d'authentification</h2>

Pour accéder à vos applications, le Centre de contrôle JHipster utilise un mécanisme de sécurité spécifique en fonction du profil.

#### ***JWT***
Il s'agit d'une implémentation personnalisée de JHipster. La clé JWT utilisée pour signer la demande doit être la même pour les applications et le Centre de contrôle : comme par défaut le Centre de contrôle configure les applications via Spring Cloud Config, cela devrait fonctionner directement, car il enverra la même clé à toutes les applications.

#### ***OAuth2***
Ce profil utilise un serveur d'autorisation-authentification tiers tel que Keycloak (ou bientôt Okta). Le Centre de contrôle utilisera le protocole OAuth2 pour générer une session dans Keycloak lorsque vous vous connectez au Centre de contrôle.

Ensuite, notre configuration de sécurité, dans Oauth2SecurityConfiguration.java, utilisera la chaîne de filtres de sécurité de Spring pour obtenir une autorisation de Keycloak et générer un Principal Spring (utilisateur actuel) avec `http.oauth2Login()`. Ensuite, la chaîne de filtres de sécurité de Spring appliquera `http.oauth2ResourceServer().jwt().jwtAuthenticationConverter(jwtAuthenticationConverter())` pour obtenir une authentification avec ses rôles. De cette façon, nous pouvons changer notre fournisseur (Keycloak, Okta, etc.) facilement.



<h2 id="features">Fonctionnalités</h2>

### ***Instances***

Le Centre de contrôle JHipster fournit une liste des instances des applications. Dès qu'une application s'enregistre sur un serveur (consul ou eureka), elle devient disponible dans la liste.

![]({{ site.url }}/images/jhipster-control-center-instances.png)

### ***Métriques***

La page de métriques utilise Micrometer pour donner une vue détaillée des performances de l'application.

Elle fournit des métriques sur :

- la JVM
- les requêtes HTTP
- l'utilisation du cache
- le pool de connexions de la base de données

En cliquant sur le bouton "Développer" à côté des métriques de thread JVM, vous obtiendrez une trace de la pile de l'application en cours d'exécution, ce qui est très utile pour détecter les threads bloqués.

![]({{ site.url }}/images/jhipster-control-center-metrics.png)

### ***Santé***

La page de santé utilise le point de terminaison de santé de Spring Boot Actuator pour fournir des informations sur la santé de diverses parties de l'application.

De nombreux contrôles de santé sont fournis en standard par Spring Boot Actuator, et vous pouvez ajouter des contrôles de santé spécifiques à l'application.

![]({{ site.url }}/images/jhipster-control-center-health.png)

### ***Configuration***

La page de configuration utilise le point de terminaison de configuration de Spring Boot Actuator pour donner une vue complète de la configuration Spring de l'application actuelle.

![]({{ site.url }}/images/jhipster-control-center-configuration.png)

### ***Journaux***

La page de journaux permet de gérer à l'exécution la configuration Logback de l'application en cours d'exécution.

Vous pouvez changer le niveau de journalisation du package Java en cliquant sur un bouton, ce qui est très pratique tant en développement qu'en production.

![]({{ site.url }}/images/jhipster-control-center-logs.png)

### ***Fichier de journal***

La page du fichier de journal permet de voir à l'exécution le journal de l'application en cours d'exécution. Par défaut, il est désactivé, vous devez le configurer. Ce message est affiché si le fichier de journal est désactivé :


```
Aucun fichier de journal disponible. Veuillez noter qu'il n'est pas disponible par défaut, vous devez configurer les propriétés Spring Boot ci-dessous !
Veuillez vérifier:
 - si le microservice est opérationnel
 - si ces propriétés sont définies: 
     - logging.file.path
     - logging.file.name (pour éviter d'utiliser le même spring.log)

Voir:
 - https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-endpoints.html
 - https://docs.spring.io/spring-boot/docs/current/reference/html/howto-logging.html
```

![]({{ site.url }}/images/jhipster-control-center-logfile.png)

### ***API***

La page de l'API permet de voir toute la documentation de l'API de vos applications et de tester leurs points de terminaison à travers un seul cadre Swagger UI.

![]({{ site.url }}/images/jhipster-control-center-api.png)

