---
layout: default
title:  Utilisation de Neo4j
permalink: /using-neo4j/
redirect_from:
  - /using_neo4j.html
sitemap:
    priority: 0.7
    lastmod: 2020-01-18T00:00:00-00:00
---

# <i class="fa fa-database"></i> Utilisation de Neo4j [BÊTA]

[Neo4j](https://neo4j.com/) est l'une des bases de données prises en charge pouvant être sélectionnées lors de la génération de votre application.

Lorsque Neo4j est sélectionné :

* [Spring Data Neo4j/RX](https://neo4j.github.io/sdn-rx) sera utilisé pour accéder à la base de données. C'est très similaire à Spring Data JPA, et c'est pourquoi le support de Neo4j est très proche du support JPA (par défaut).
* [Neo4j Migrations](https://github.com/michael-simons/neo4j-migrations) est utilisé à la place de [Liquibase](http://www.liquibase.org/) pour gérer les changements de base de données.
* [Neo4j Testcontainers](https://www.testcontainers.org/modules/databases/neo4j/) est utilisé pour lancer une version conteneurisée de la base de données pour exécuter des tests unitaires.
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
