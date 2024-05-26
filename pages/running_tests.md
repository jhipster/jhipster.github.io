---
layout: default
title: Exécution des tests
permalink: /running-tests/
redirect_from:
  - /running_tests.html
sitemap:
    priority: 0.7
    lastmod: 2019-04-19T00:00:00-00:00
---

# <i class="fa fa-shield"></i> Exécution des tests

## Introduction

JHipster est livré avec un ensemble étendu de tests, et chaque application générée comporte :

*   Des tests unitaires utilisant [JUnit 5](https://junit.org/junit5/){:target="_blank" rel="noopener"}.
*   Des tests d'intégration utilisant le framework Spring Test Context.
*   Des tests d'interface utilisateur avec [Jest](https://facebook.github.io/jest/){:target="_blank" rel="noopener"}.
*   Des tests d'architecture avec [ArchUnit](https://www.archunit.org/){:target="_blank" rel="noopener"}.

En option, JHipster peut également générer :

*   Des tests de performance avec [Gatling](http://gatling.io/){:target="_blank" rel="noopener"}.
*   Des tests basés sur le comportement avec [Cucumber](https://cucumber.io/){:target="_blank" rel="noopener"}.
*   Des tests d'intégration Angular/React/Vue avec [Cypress](https://www.cypress.io/){:target="_blank" rel="noopener"} ou [Protractor](https://angular.github.io/protractor/#/){:target="_blank" rel="noopener"}.

Nous avons deux objectifs dans la génération de ces tests :

*   Aider chaque utilisateur de JHipster à suivre les meilleures pratiques, car nous croyons que les tests sont une partie très utile de chaque application.
*   Valider que ce qui est généré est correct. Donc même si vous ne prévoyez pas d'utiliser ces tests du tout, exécuter `./mvnw clean verify` et `npm test` après avoir généré votre application est un bon moyen de savoir si tout va bien. Vous êtes alors libre d'ignorer ces tests si vous pensez que les tests sont une perte de temps !

Tous ces tests seront générés dans le dossier Maven standard `src/test`.

## Tests d'intégration

Les tests d'intégration sont réalisés avec le framework Spring Test Context et sont situés dans le dossier `src/test/java`. JHipster lancera un contexte de test Spring spécifique, qui sera réutilisé pour tous les tests, car :

*   Vos beans Spring doivent être sans état et thread-safe, et peuvent donc être réutilisés dans vos différents ensembles de tests.
*   Lancer un seul contexte Spring pour tous les tests est beaucoup plus rapide que de lancer un nouveau contexte Spring pour chaque test.

Ce contexte de test Spring utilisera une base de données de test spécifique pour exécuter ses tests :

*   Si vous utilisez une base de données SQL, JHipster lancera une instance H2 en mémoire afin d'utiliser une base de données temporaire pour ses tests d'intégration. En outre, en utilisant le profil `testcontainers`, JHipster lancera une version conteneurisée de la base de données de production à l'aide de [Testcontainers](https://www.testcontainers.org/modules/databases/){:target="_blank" rel="noopener"}. Dans tous les cas, Liquibase sera exécuté automatiquement et générera le schéma de la base de données.
*   Si vous utilisez Cassandra, JHipster lancera une version conteneurisée de Cassandra avec Docker en utilisant [Testcontainers](https://www.testcontainers.org){:target="_blank" rel="noopener"}.
*   Si vous utilisez MongoDB, JHipster lancera une instance MongoDB en mémoire à l'aide de [de.flapdoodle.embed.mongo](https://github.com/flapdoodle-oss/de.flapdoodle.embed.mongo){:target="_blank" rel="noopener"}.
*   Si vous utilisez Elasticsearch, JHipster lancera une instance Elasticsearch en mémoire à l'aide de Spring Data Elasticsearch.
*   Si vous utilisez Couchbase, JHipster lancera une version conteneurisée de Couchbase avec Docker en utilisant [Couchbase Testcontainers](https://github.com/differentway/testcontainers-java-module-couchbase){:target="_blank" rel="noopener"}.
*   Si vous utilisez Neo4j, JHipster lancera une version conteneurisée de Neo4j avec Docker en utilisant [Neo4j Testcontainers](https://www.testcontainers.org/modules/databases/neo4j/){:target="_blank" rel="noopener"}.

Ces tests peuvent être exécutés directement dans votre IDE, en cliquant avec le bouton droit de la souris sur chaque classe de test, ou en exécutant `./mvnw clean verify` (ou `./gradlew test integrationTest` si vous utilisez Gradle).

**Limitations :** si les entités générées ont la validation activée, JHipster n'est pas en mesure de générer les valeurs correctes en fonction des règles de validation. Ces règles peuvent être si complexes, par exemple si une expression rationnelle est utilisée, que cela n'est pas possible. Dans ce cas, les tests échoueront à la validation, et les valeurs par défaut utilisées dans le test devront être modifiées manuellement pour qu'elles puissent passer les règles de validation.

## Tests d'interface utilisateur

Les tests d'unité d'interface utilisateur sont situés dans le dossier `src/test/javascript/spec`. Ils utilisent [Jest](https://facebook.github.io/jest/){:target="_blank" rel="noopener"}.

Ces tests simuleront l'accès aux points de terminaison REST de l'application, afin que vous puissiez tester votre couche d'interface utilisateur sans avoir à lancer le back-end Java.

*   Ces tests peuvent être exécutés en utilisant `npm test`.
*   Astuce : si vous voulez vous concentrer sur un seul test, changez la description du module de `describe('...', function() {` à `fdescribe('...', function() {` et Jest exécutera ce test uniquement.

### Cypress/Protractor

Les tests d'intégration de l'interface utilisateur sont réalisés avec [Cypress](https://www.cypress.io/){:target="_blank" rel="noopener"} ou [Protractor](https://angular.github.io/protractor/#/){:target="_blank" rel="noopener"} et sont situés dans le dossier `src/test/javascript/e2e`.

Ces tests lanceront un navigateur Web et utiliseront l'application comme le ferait un utilisateur réel, donc vous devez avoir une application réelle en cours d'exécution, avec sa base de données configurée.

# <i class="fa fa-shield"></i> Exécution des tests

Ces tests peuvent être exécutés en utilisant `npm run e2e`.

## Tests d'architecture

Les tests d'architecture, qui imposent certaines contraintes et meilleures pratiques, sont réalisés avec [ArchUnit](https://www.archunit.org/){:target="_blank" rel="noopener"}.
Vous pouvez écrire vos propres règles pour vérifier les contraintes personnalisées pour votre architecture au moment de la construction en suivant la [documentation officielle](https://www.archunit.org/userguide/html/000_Index.html){:target="_blank" rel="noopener"}.

## Tests de performance

Les tests de performance sont réalisés avec [Gatling](http://gatling.io/){:target="_blank" rel="noopener"}, et sont situés dans le dossier `src/test/java/gatling/simulations`. Ils sont générés pour chaque entité, et permettent de les tester chacune avec un grand nombre de requêtes concurrentes.

**Attention !** Pour l'instant, ces tests ne prennent pas en compte les règles de validation que vous avez pu imposer sur vos entités. De plus, les tests pour la création d'entités qui ont une relation requise avec une autre entité échoueront par défaut. Vous devrez de toute façon modifier ces tests, selon vos règles métier, voici donc quelques conseils pour améliorer vos tests :

*   Sur votre application en cours d'exécution, allez à l'écran `Administration > Journaux`, et mettez `org.springframework` en mode `debug`. Vous verrez les erreurs de validation, par exemple.
*   Utilisez normalement l'application et ouvrez la console Chrome : vous pourrez voir les requêtes REST avec tous leurs paramètres, y compris les en-têtes HTTP.

Pour exécuter des tests Gatling sur une application microservices, vous devez :

*   Exécuter un registre
*   Exécuter une passerelle
*   Exécuter l'application microservices
*   Ensuite, vous pouvez exécuter les tests Gatling

### Utilisation de Maven pour exécuter Gatling

Vous pouvez exécuter tous les tests Gatling avec `./mvnw gatling:test`.
### Utilisation de Gradle pour exécuter Gatling

Vous pouvez exécuter tous les tests Gatling avec `./gradlew gatlingRun`.
## Développement piloté par le comportement (BDD)

Le développement piloté par le comportement (BDD) est disponible en utilisant [Cucumber](https://cucumber.io/){:target="_blank" rel="noopener"}, avec sa [mise en œuvre JVM](https://github.com/cucumber/cucumber-jvm){:target="_blank" rel="noopener"}.

Les fonctionnalités [Gherkin](https://docs.cucumber.io/gherkin/reference/){:target="_blank" rel="noopener"} devront être écrites dans votre répertoire  `src/test/features`.