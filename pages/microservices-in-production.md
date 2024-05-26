---
layout: default
title: Microservices en production
permalink: /microservices-in-production/
sitemap:
    priority: 0.7
    lastmod: 2020-09-11T00:00:00-00:00
---

# <i class="fa fa-cloud"></i> Microservices en production

Les microservices sont un type spécifique d'applications JHipster. Veuillez vous référer à notre [documentation principale sur l'utilisation de JHipster en production]({{ site.url }}/production) pour plus d'informations sur la création, l'optimisation et la sécurisation d'une version de production.

<h2 id="elk">Surveillance des microservices</h2>

Si vous utilisez JHipster Registry, veuillez consulter notre [documentation sur JHipster Registry]({{ site.url }}/jhipster-registry) pour découvrir les tableaux de bord disponibles en temps d'exécution et comment les utiliser.

Notre [documentation sur la surveillance]({{ site.url }}/monitoring) est également très importante pour apprendre des informations spécifiques sur l'utilisation de :

- ELK pour collecter les journaux de vos microservices
- Prometheus pour collecter les métriques de vos microservices
- Zipkin pour tracer les requêtes HTTP à travers vos services

<h2 id="docker_compose">Utilisation de Docker Compose pour le développement et le déploiement</h2>

Travailler avec une architecture de microservices signifie que vous aurez besoin de plusieurs services et bases de données différents fonctionnant ensemble, et dans ce contexte, Docker Compose est un excellent outil pour gérer vos environnements de développement, de test et de production.

Une section spécifique sur les microservices est incluse dans notre [documentation Docker Compose]({{ site.url }}/docker-compose#microservices), et nous vous recommandons vivement de vous familiariser avec celle-ci lorsque vous travaillez sur une architecture de microservices.

Comme Docker Swarm utilise la même API que Docker Machine, déployer votre architecture de microservices dans le cloud est exactement le même que de le déployer sur votre machine locale. Suivez notre [documentation Docker Compose]({{ site.url }}/docker-compose/) pour en savoir plus sur l'utilisation de Docker Compose avec JHipster.

<h2 id="cloudfoundry">Mise en production avec Cloud Foundry</h2>

Le [sous-générateur Cloud Foundry]({{ site.url }}/cloudfoundry/) fonctionne de la même manière avec une architecture de microservices, la principale différence étant que vous avez plus d'applications à déployer :

- Utilisez le [sous-générateur Cloud Foundry]({{ site.url }}/cloudfoundry/) pour déployer d'abord JHipster Registry (qui est une application JHipster normale).
- Notez l'URL sur laquelle votre JHipster Registry est déployé. Vos applications doivent toutes pointer vers cette URL :
  - Dans le fichier `bootstrap-prod.yml`, l'`uri` de `spring.cloud.config` doit pointer vers `http(s)://<votre_url_registre_jhipster>/config/`
  - Dans le fichier `application-prod.yml`, `eureka.client.serviceUrl.defaultZone` doit pointer vers `http(s)://<votre_url_registre_jhipster>/eureka/`
- Déployez votre passerelle(s) et vos microservices
- Mettez à l'échelle vos applications comme d'habitude avec Cloud Foundry

Un point important à retenir est que le JHipster Registry n'est pas sécurisé par défaut, et que les microservices ne sont pas censés être accessibles depuis l'extérieur, car les utilisateurs sont censés utiliser la passerelle(s) pour accéder à votre application.

Deux solutions sont disponibles pour résoudre ce problème :

- Sécurisez votre Cloud Foundry en utilisant des routes spécifiques.
- Rendez tout public, mais utilisez HTTPS partout et sécurisez votre JHipster Registry en utilisant le support d'authentification basique de Spring Security

<h2 id="heroku">Mise en production avec Heroku</h2>

Le [sous-générateur Heroku]({{ site.url }}/heroku/) fonctionne presque de la même manière avec une architecture de microservices, la principale différence étant que vous avez plus d'applications à déployer :

Déployez un JHipster Registry directement en un clic :

[![Déployer sur Heroku](https://camo.githubusercontent.com/c0824806f5221ebb7d25e559568582dd39dd1170/68747470733a2f2f7777772e6865726f6b7563646e2e636f6d2f6465706c6f792f627574746f6e2e706e67)](https://dashboard.heroku.com/new?&template=https%3A%2F%2Fgithub.com%2Fjhipster%2Fjhipster-registry)

Veuillez suivre la [documentation du sous-générateur Heroku]({{ site.url }}/heroku/) afin de comprendre comment sécuriser votre JHipster Registry.

Notez l'URL sur laquelle votre JHipster Registry est déployé. Vos applications doivent toutes pointer vers cette URL dans leur fichier `application-prod.yml`. Modifiez cette configuration comme suit :

    eureka:
        instance:
            hostname: https://admin:[mot_de_passe]@[nom_application].herokuapp.com
            prefer-ip-address: false

Vous pouvez maintenant déployer et mettre à l'échelle la passerelle(s) et les microservices. Le sous-générateur Heroku vous posera une nouvelle question pour connaître l'URL de votre JHipster Registry : cela permettra à vos applications de récupérer leur configuration sur le serveur Spring Cloud Config.