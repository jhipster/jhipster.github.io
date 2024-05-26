---
layout: default
title:  Utilisation d'Elasticsearch
permalink: /using-elasticsearch/
redirect_from:
  - /using_elasticsearch.html
sitemap:
    priority: 0.7
    lastmod: 2023-07-12T00:00:00-00:00
---

# <i class="fa fa-search"></i> Utilisation d'Elasticsearch

Elasticsearch est une option qui ajoute des capacités de recherche sur votre base de données.

Cette option présente certaines limitations :

*   Elle ne fonctionne qu'avec des bases de données SQL et MongoDB. Le support de Cassandra et Couchbase sera ajouté ultérieurement (toute aide est la bienvenue !).
*   Il n'y a pas de mécanisme de réplication automatique entre votre base de données et Elasticsearch, vous pourriez donc avoir des données désynchronisées. En conséquence, vous devrez probablement écrire un code spécifique pour synchroniser vos données, par exemple en utilisant l'annotation `@Scheduled` de Spring, pour s'exécuter tous les soirs.
    *   Cela signifie également que si votre base de données est modifiée en dehors de votre application, vos index de recherche seront désynchronisés. Le module [Elasticsearch Reindexer](https://www.jhipster.tech/modules/marketplace/#/details/generator-jhipster-elasticsearch-reindexer) de JHipster peut aider dans ces situations.

Lorsque l'option Elasticsearch est sélectionnée :

*   Spring Data Elasticsearch est utilisé avec l'autoconfiguration de Spring Boot. Il peut être configuré à l'aide des propriétés de configuration `spring.elasticsearch.*`.
*   Le package "repository" a un nouveau sous-package, appelé "search", qui contient tous les dépôts Elasticsearch.
*   L'entité "User" est indexée dans Elasticsearch, et vous pouvez la interroger en utilisant le point de terminaison REST `/api/_search/users/:query`.
*   Lorsque le [sous-générateur d'entité]({{ site.url }}/creating-an-entity/) est utilisé, l'entité générée est automatiquement indexée par Elasticsearch et utilisée dans le point de terminaison REST. Les fonctionnalités de recherche sont également ajoutées à l'interface utilisateur, vous pouvez donc rechercher votre entité dans l'écran principal CRUD.

### Utilisation en développement

En développement, JHipster fonctionne avec une instance Elasticsearch intégrée. Vous pouvez également utiliser une instance Elasticsearch externe si vous définissez une variable d'environnement `SPRING_DATA_URIS` (ou ajoutez une propriété `spring.elasticsearch.uris` à votre `application-dev.yml`).

La manière la plus simple de démarrer une instance Elasticsearch externe est d'utiliser la configuration Docker Compose fournie :

    docker-compose -f src/main/docker/elasticsearch.yml up -d

Ensuite, définissez une variable d'environnement pour pointer vers celle-ci :

    export SPRING_DATA_URIS=http://localhost:9200

### Utilisation en production

En production, JHipster s'attend à ce qu'une instance Elasticsearch externe soit disponible. Par défaut, l'application recherche une instance Elasticsearch en cours d'exécution sur localhost. Cela peut être configuré en utilisant les propriétés standard de Spring Boot, dans le fichier `application-prod.yml`.

### Utilisation sur Heroku

Sur Heroku, le [Bonsai Elasticsearch](https://elements.heroku.com/addons/bonsai) est configuré en tant qu'add-on. JHipster est automatiquement configuré pour communiquer avec lui.

Malheureusement, jusqu'à JHipster 7.9.3, Elasticsearch [ne fonctionne pas immédiatement avec Heroku](https://github.com/jhipster/generator-jhipster/issues/20315). Pour résoudre ce problème, vous pouvez créer une image Docker avec Elasticsearch et la déployer quelque part où vous pouvez l'exécuter, ou vous pouvez utiliser Elastic Cloud. Nous ne configurons pas automatiquement l'[Add-on Elasticsearch](https://elements.heroku.com/addons/foundelasticsearch) car son plan le moins cher est de 67 USD/mois et cela semble un peu cher.

### Utilisation d'Elastic Cloud

Vous pouvez [démarrer un essai gratuit](https://cloud.elastic.co/registration) sur Elastic Cloud. Après vous être connecté, créez un déploiement. Utilisez les paramètres par défaut, sélectionnez **7.17.7** comme version, et appuyez sur **Create deployment**.

**ATTENTION** : Utiliser la dernière version entraînera une erreur "Unable to parse response body".

Téléchargez vos informations d'identification à partir de l'écran suivant et cliquez sur **Continue**. Ensuite, sélectionnez **Gérer ce déploiement** dans le menu et copiez l'URL de point de terminaison Elasticsearch.

Définissez les informations d'identification et l'URL de point de terminaison en tant que nouvelle variable d'environnement `ELASTIC_URL` sur Heroku.

```shell
heroku config:set ELASTIC_URL=https://elastic:<password>@<endpoint-url>
```

Ensuite, modifiez `heroku.gradle` pour supprimer la solution de contournement pour Bonsai (qui ne fonctionne plus) et mettez à jour `application-heroku.yml` pour utiliser `ELASTIC_URL` :

```yaml
spring:
  ...
  elasticsearch:
    uris: ${ELASTIC_URL}
```

Redéployez votre application sur Heroku et tout devrait fonctionner comme prévu.