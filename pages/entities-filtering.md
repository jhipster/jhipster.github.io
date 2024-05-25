---
layout: default
title: Filtrer vos entités
permalink: /entities-filtering/
sitemap:
    priority: 0.7
    lastmod: 2017-08-22T00:00:00-00:00
---

# <i class="fa fa-filter"></i> Filtrer vos entités

## Introduction

Après avoir implémenté les fonctionnalités CRUD de base pour une entité, il est très courant de recevoir une demande de création de divers filtres pour les attributs de l'entité,
afin que le serveur puisse être utilisé de manière plus efficace. Ces filtres doivent être envoyés en tant que paramètres de requête, afin que tout client - et tout navigateur - puisse les utiliser.
De plus, ces filtres doivent suivre un modèle raisonnable et concis, et ils doivent pouvoir être combinés librement.

## Comment activer

_Remarque_: `filter` n'est pas compatible avec `reactive`.
Lors de la génération d'une entité avec la commande `jhipster entity`, sélectionnez les services ou l'implémentation du service pour activer le filtrage sur cette entité.

Si vous souhaitez activer le filtrage pour des entités existantes, vous pouvez modifier la configuration de l'entité dans le répertoire `.jhipster` de votre projet, en définissant `service` sur `serviceClass` ou `serviceImpl` à partir de `no`, et `jpaMetamodelFiltering` sur `true` puis régénérez avec `jhipster entity <nom de l'entité>`.

Lors de l'utilisation de JDL, ajoutez une ligne `filter <nom de l'entité>` à votre fichier JDL et réimportez les définitions avec la commande `jhipster jdl`.

## Interface publique

Pour chaque entité, vous pouvez activer le filtrage dans le générateur d'entités, et ensuite, vous pouvez appeler votre point d'extrémité GET `/api/my-entity` avec les paramètres suivants :

* Pour chaque champ *xyz*
    * *xyz.equals=someValue*
        - Pour lister toutes les entités où xyz est égal à 'someValue'
    * *xyz.in=someValue,otherValue*
        - Pour lister toutes les entités où xyz est égal à 'someValue' ou 'otherValue'
    * *xyz.specified=true*
        - Pour lister toutes les entités où xyz n'est pas nul, spécifié.
    * *xyz.specified=false*
        - Pour lister toutes les entités où xyz est nul, non spécifié.
* Si le type de *xyz* est une chaîne de caractères :
    * *xyz.contains=something*
        - Pour lister toutes les entités où xyz contient 'something'.
* Si le type de *xyz* est l'un des types numériques ou de date.
    * *xyz.greaterThan=someValue*
        - Pour lister toutes les entités où xyz est supérieur à 'someValue'.
    * *xyz.lessThan=someValue*
        - Pour lister toutes les entités où xyz est inférieur à 'someValue'.
    * *xyz.greaterThanOrEqual=someValue*
        - Pour lister toutes les entités où xyz est supérieur ou égal à 'someValue'.
    * *xyz.lessThanOrEqual=someValue*
        - Pour lister toutes les entités où xyz est inférieur ou égal à 'someValue'.

Ils peuvent être combinés librement.

Une bonne façon de découvrir l'expressivité de cette API de filtrage est de l'utiliser depuis swagger-ui dans la page de documentation de l'API de votre application JHipster.

![]({{ site.url }}/images/entities_filtering_swagger.png)

## Implémentation

Lorsque cette fonctionnalité est activée, un nouveau service nommé `EntityQueryService` et une `EntityCriteria` sont générés. Spring convertira les paramètres de requête en champs de la classe `EntityCriteria`.

Dans le `EntityQueryService`, nous convertissons l'objet de critères en un objet de requête JPA statique, et de type sûr. Pour cela, il est **obligatoire** que la **génération statique du métamodèle soit activée** dans la construction. Voir la [documentation de génération statique du métamodèle JPA](https://docs.jboss.org/hibernate/orm/current/userguide/html_single/Hibernate_User_Guide.html#tooling-modelgen) pour plus de détails.

Pour prouver que les critères générés fonctionnent et que Spring est bien configuré, le `EntityResourceIntTest` est étendu avec de nombreux cas de test, un pour chaque filtre individuel.

### Angular

Lors de l'utilisation d'Angular, la manière appropriée de tirer parti de cette fonctionnalité utile ressemblerait à ceci :

* Égal (la même chose s'applique pour `contains` et `notEquals`)
<pre>javascript
this.bookService.query({'title.equals':someValue}).subscribe(...);
</pre>
* supérieur À (la même chose s'applique pour `lessThan`, `greaterThanOrEqual` et `lessThanOrEqual`  lors de l'utilisation des types de données`date` et `number`)
<pre>javascript
this.bookService.query({'id.greaterThan':value}).subscribe(...);
this.bookService.query({'birthday.lessThanOrEqual':value}).subscribe(...);
</pre>
* Dans (la même chose s'applique pour `notIn`)
<pre>javascript
this.bookService.query({'id.in':[value1, value2]}).subscribe(...);
</pre>
* Spécifié
<pre>javascript
this.bookService.query({'author.specified':true}).subscribe(...);
</pre>

## Limitations

Actuellement, seules les bases de données SQL (avec JPA) sont prises en charge, avec la combinaison d'un service séparé ou d'une implémentation/interface de service séparée.
