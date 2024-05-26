---
layout: default
title: Stack technologique
permalink: /tech-stack/
redirect_from:
  - /tech_stack.html
sitemap:
    priority: 0.8
    lastmod: 2021-03-08T12:00:00-00:00
---

# <i class="fa fa-stack-overflow"></i> Stack technologique

## Stack technologique côté client

Application Web monopage :

*   [Angular](https://angular.io/) ou [React](https://reactjs.org/) ou [Vue](https://vuejs.org/)
*   Conception Web adaptative avec [Twitter Bootstrap](http://getbootstrap.com/)
*   [HTML5 Boilerplate](http://html5boilerplate.com/)
*   Compatible avec les navigateurs modernes (Chrome, FireFox, Microsoft Edge...)
*   Support complet de l'internationalisation
*   Support optionnel de [Sass](https://www.npmjs.com/package/node-sass) pour la conception CSS
*   Support optionnel de WebSocket avec Spring Websocket

Avec un excellent flux de travail de développement :

*   Installation de nouvelles bibliothèques JavaScript avec [NPM](https://www.npmjs.com/get-npm)
*   Compilation, optimisation et rechargement en direct avec [Webpack](https://webpack.js.org/)
*   Tests avec [Jest](https://facebook.github.io/jest/) et [Protractor](http://www.protractortest.org)

Et si une application Web monopage ne suffit pas à vos besoins ?

*   Prise en charge du moteur de modèle [Thymeleaf](http://www.thymeleaf.org/), pour générer des pages Web côté serveur

## Stack technologique côté serveur

Une application [Spring complète](http://spring.io/):

*   [Spring Boot](http://projects.spring.io/spring-boot/) pour la configuration de l'application
*   Configuration [Maven](http://maven.apache.org/) ou [Gradle](http://www.gradle.org/) pour la construction, les tests et l'exécution de l'application
*   [Profils "développement" et "production"]({{ site.url }}/profiles/) (à la fois pour Maven et Gradle)
*   [Spring Security](http://docs.spring.io/spring-security/site/index.html)
*   [Spring MVC REST](http://spring.io/guides/gs/rest-service/) + [Jackson](https://github.com/FasterXML/jackson)
*   Support optionnel de WebSocket avec Spring Websocket
*   [Spring Data JPA](http://projects.spring.io/spring-data-jpa/) + Validation des beans
*   Mises à jour de la base de données avec [Liquibase](http://www.liquibase.org/)
*   Support d'[Elasticsearch](https://github.com/elastic/elasticsearch) si vous souhaitez avoir des capacités de recherche sur votre base de données
*   Prise en charge de [MongoDB](http://www.mongodb.org) et [Couchbase](https://www.couchbase.com) si vous préférez utiliser une base de données NoSQL orientée documents au lieu de JPA
*   Prise en charge de [Cassandra](http://cassandra.apache.org/) si vous préférez utiliser une base de données NoSQL orientée colonnes au lieu de JPA
*   Prise en charge de [Kafka](http://kafka.apache.org/) et [Pulsar](http://pulsar.apache.org/) si vous souhaitez utiliser un système de messagerie pub-sub

## Stack technologique pour les microservices

Les microservices sont facultatifs et entièrement pris en charge :

* Routage HTTP à l'aide de [Spring Cloud Gateway](https://github.com/spring-cloud/spring-cloud-gateway)
* Découverte de services à l'aide de [HashiCorp Consul](https://www.consul.io/) ou [Netflix Eureka](https://github.com/Netflix/eureka)

## Prêt à être mis en production :

*   Surveillance avec [Metrics](http://metrics.dropwizard.io/) et [la pile ELK](https://www.elastic.co/products)
*   Mise en cache avec [ehcache](http://ehcache.org/) (cache local), [Caffeine](https://github.com/ben-manes/caffeine) (cache local), [Hazelcast](http://www.hazelcast.com/), [Infinispan](http://infinispan.org/), [Memcached](https://memcached.org/) ou [Redis](https://redis.io/)
*   Ressources statiques optimisées (filtre gzip, en-têtes de cache HTTP)
*   Gestion des journaux avec [Logback](http://logback.qos.ch/), configurable en temps réel
*   Pool de connexions avec [HikariCP](https://github.com/brettwooldridge/HikariCP) pour des performances optimales
*   Crée un fichier WAR standard ou un fichier JAR exécutable
*   Support complet de Docker et Docker Compose
*   Support pour tous les principaux fournisseurs de cloud : AWS, Cloud Foundry, GCP, Heroku, Kubernetes, OpenShift, Azure, Docker...