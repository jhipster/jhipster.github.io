---
layout: default
title: Utilisation de MongoDB
permalink: /using-mongodb/
redirect_from:
  - /using_mongodb.html
sitemap:
    priority: 0.7
    lastmod: 2015-02-24T00:00:00-00:00
---

# <i class="fa fa-leaf"></i> Utilisation de MongoDB

MongoDB est l'une des bases de données prises en charge qui peuvent être sélectionnées lors de la génération de votre application.

Lorsque MongoDB est sélectionné :

*   Spring Data MongoDB sera utilisé pour accéder à la base de données. Cela ressemble beaucoup à Spring Data JPA, et c'est pourquoi le support de MongoDB est très proche du support JPA (par défaut).
*   [Mongock](https://www.mongock.io) est utilisé à la place de [Liquibase](http://www.liquibase.org/) pour gérer les changements de base de données.
*   [de.flapdoodle.embed.mongo](https://github.com/flapdoodle-oss/de.flapdoodle.embed.mongo) est utilisé pour exécuter une version en mémoire de la base de données pour les tests unitaires.

<br/><br/><br/><br/><br/>