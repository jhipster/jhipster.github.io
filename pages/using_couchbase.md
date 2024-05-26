---
layout: default
title: Utilisation de Couchbase
permalink: /using-couchbase/
redirect_from:
  - /using_couchbase.html
sitemap:
    priority: 0.7
    lastmod: 2015-02-24T00:00:00-00:00
---

# <i class="fa fa-database"></i> Utilisation de Couchbase

Couchbase est l'une des bases de données prises en charge qui peuvent être sélectionnées lors de la génération de votre application.

Lorsque Couchbase est sélectionné :

*   Spring Data Couchbase sera utilisé pour accéder à la base de données. C'est très similaire à Spring Data JPA, et c'est pourquoi le support de Couchbase est très proche du support (par défaut) de JPA.
*   [Couchmove](https://github.com/differentway/couchmove) est utilisé à la place de [Liquibase](http://www.liquibase.org/) pour gérer les modifications de la base de données.
*   Le [sous-générateur d'entité]({{ site.url }}/creating-an-entity/) ne vous demandera pas de relations d'entité, car vous ne pouvez pas avoir de relations avec une base de données NoSQL (du moins pas de la même manière que vous avez des relations avec JPA).
*   [Couchbase Testcontainers](https://github.com/differentway/testcontainers-java-module-couchbase) est utilisé pour lancer une version conteneurisée de la base de données pour exécuter des tests unitaires.

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>