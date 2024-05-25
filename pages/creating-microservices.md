---
layout: default
title: Création de microservices
permalink: /creating-microservices/
sitemap:
    priority: 0.7
    lastmod: 2017-05-03T00:00:00-00:00
---


# <i class="fa fa-bolt"></i> Création de microservices

Les microservices sont un type d'application JHipster, qui n'ont pas d'interface utilisateur (l'interface Angular doit être générée sur une [passerelle]({{ site.url }}/api-gateway/)), et qui fonctionnent avec [Consul]({{ site.url }}/consul/) pour être configurés, découverts et gérés.

<h2 id="entities">Entités dans une architecture de microservices</h2>

L'entité Utilisateur n'est pas générée dans un microservice lors de l'utilisation de JWT ou DTO. Lorsque OAuth 2.0 est utilisé, il existe un mécanisme dans le microservice pour extraire les données utilisateur du jeton et les sauvegarder dans la base de données du microservice. Donc pour JWT et DTO, vous ne pouvez pas utiliser et/ou définir une relation avec l'entité Utilisateur car elle n'existe que dans la base de données de la passerelle.

Les relations entre entités provenant de différents microservices ne sont pas prises en charge.

<h2 id="generating_entities">Génération d'entités</h2>

Pour les entités dans un microfront, voir [Microfrontends](#microfrontends).

L'utilisation du [sous-générateur d'entités]({{ site.url }}/creating-an-entity/) fonctionne un peu différemment dans une architecture de microservices, car les codes frontaux et backend ne sont pas situés dans la même application.

Tout d'abord, générez les entités dans les applications de microservice : cela fonctionne comme d'habitude, et vous pouvez également utiliser [JHipster UML]({{ site.url }}/jhipster-uml/) ou [JDL Studio](https://start.jhipster.tech/jdl-studio/) pour vous aider à générer des entités et des relations complexes. Comme les microservices n'ont pas d'interface utilisateur, aucun code d'interface utilisateur ne sera généré.

Ensuite, sur la(les) passerelle(s), exécutez à nouveau le sous-générateur d'entités. Une nouvelle question apparaîtra au début, qui est spécifique aux passerelles :

- Vous aurez le choix de générer une nouvelle entité normalement (une passerelle est également une application JHipster standard, donc cela fonctionnerait comme pour une application monolithique), ou d'utiliser une configuration JHipster existante à partir d'un microservice.
- Si vous choisissez de générer l'entité à partir d'un microservice, vous devrez entrer le chemin de ce microservice sur votre ordinateur local, et ensuite JHipster générera le code frontend sur la passerelle.

## Microfrontends

Le support des microfrontends est en cours de développement. L'implémentation est sujette à changement et varie selon les frameworks. Consultez [Microfrontend Support](https://github.com/jhipster/generator-jhipster/issues/17031) pour obtenir le dernier état.

L'implémentation des microfrontends de JHipster utilise [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/) et permet à l'implémentation des entités frontend d'être située dans le microservice plutôt que dans la passerelle.

Une passerelle est toujours nécessaire pour fonctionner en développement en raison du processus d'authentification.

Vous pouvez trouver plus d'informations sur le démarrage des microfrontends en utilisant une passerelle ou seul dans le README généré.

<h2 id="hazelcast">Mise en cache distribuée avec Hazelcast</h2>

Si votre application utilise une base de données SQL, JHipster propose une solution de mise en cache de niveau 2 différente avec les microservices :

- La solution de mise en cache par défaut de JHipster avec les microservices est Hazelcast
- Vous pouvez toujours choisir Ehcache (la solution par défaut avec les applications monolithiques) ou Caffeine ou choisir de ne pas utiliser de cache du tout

Cette solution est la solution par défaut avec les microservices, car dans cette architecture, l'idée est que vous allez mettre à l'échelle vos services :

- avec un cache local, vos instances de service n'auront pas de cache synchronisé, ce qui entraînera des données incorrectes
- sans aucun cache, le fardeau de la mise à l'échelle sera poussé vers la base de données, ce qui ne sera pas très efficace (à moins d'utiliser notre option Cassandra)

L'utilisation de Hazelcast avec les microservices entraînera une configuration spécifique :

- Au démarrage, votre application se connectera au registre de services pour savoir si d'autres instances du même service sont en cours d'exécution
- Avec le profil `dev`, JHipster créera un cluster de ces instances sur localhost (`127.0.0.1`), en utilisant un port différent par instance. Par défaut, le port Hazelcast est `le port de votre application + 5701` (donc si le port de votre application est `8081`, Hazelcast utilisera le port `13782`)
- Avec le profil `prod`, JHipster créera un cluster avec tous les autres nœuds qu'il trouve, en utilisant le port Hazelcast par défaut (`5701`)

<h2 id="no_database">Microservices sans base de données</h2>

Seules les applications de microservices peuvent être créées sans base de données. C'est parce que les microservices sont petits et n'ont pas de code de gestion des utilisateurs.

Un microservice sans base de données est très petit et pourrait être utilisé pour se connecter à un back-end spécifique comme un système hérité.