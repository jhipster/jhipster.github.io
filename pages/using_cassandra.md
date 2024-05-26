---
layout: default
title: Utilisation de Cassandra
permalink: /using-cassandra/
redirect_from:
  - /using_cassandra.html
sitemap:
    priority: 0.7
    lastmod: 2015-02-24T00:00:00-00:00
---

# <i class="fa fa-eye"></i> Utilisation de Cassandra

Cassandra est l'une des bases de données prises en charge qui peuvent être sélectionnées lors de la génération de votre application.

Ce générateur a une limitation :

* Il ne prend pas en charge l'authentification OAuth2 (nous devons implémenter un back-end Cassandra pour le serveur OAuth2 de Spring Security)

Lorsque Cassandra est sélectionnée :

* Spring Data Reactive for Apache Cassandra est utilisé
* Le [sous-générateur d'entité]({{ site.url }}/creating-an-entity/) ne vous demandera pas de relations d'entités, car vous ne pouvez pas avoir de relations avec une base de données NoSQL (du moins pas de la même manière que vous avez des relations avec JPA)
* Les entités générées ne prennent en charge qu'une clé de partition, qui est l'ID. Les versions futures fourniront des clés primaires composites et des clés de regroupement

## Outil de migration

Similaire à [Liquibase](http://www.liquibase.org/), JHipster fournit un outil pour appliquer vos scripts de migration CQL, avec certaines restrictions :

* L'outil n'est pas exécuté par l'application elle-même lorsqu'elle est démarrée mais à l'intérieur d'un conteneur Docker ou manuellement
* Tous les scripts CQL doivent suivre le modèle `{timestamp}_{description}.cql` et être placés dans le répertoire de journal des modifications : `src/main/resources/config/cql/changelog/`
* Tous les scripts non encore appliqués situés dans le répertoire de journal des modifications sont appliqués dans l'ordre alphabétique (c'est-à-dire suivant le timestamp)
* Comme Cassandra n'est pas une base de données transactionnelle, en cas d'erreur avant l'insertion des métadonnées dans la table utilisée par l'outil, il existe un risque que votre script de migration CQL soit exécuté plusieurs fois

Quelques informations sur l'outil :

* Après la génération d'une entité, son fichier CQL sera généré dans `src/main/resources/config/cql/changelog/` de la même manière que nous générons les journaux de modifications Liquibase pour JPA
* Pour exécuter des tests, tous les scripts CQL dans le répertoire `src/main/resources/config/cql/changelog/` sont automatiquement appliqués au cluster en mémoire
    * Cela signifie que vous n'avez rien à faire, il vous suffit de déposer votre script dans le répertoire de journal des modifications pour qu'il soit appliqué pour les tests
* L'outil utilise sa propre table Cassandra `schema_version` pour stocker les métadonnées de migration

L'outil appliquera les scripts de migration à partir de `src/main/resources/config/cql/` dans l'ordre suivant :

1. `create-keyspace.cql` - créer l'espace de clés et la table `schema_version` pour stocker les métadonnées de migration
2. tous les fichiers `cql/changelog/\*.cql` par ordre alphabétique

### Exécution de l'outil

En fonction de l'utilisation ou non de Docker, vous avez plusieurs options pour exécuter l'outil de migration.

#### Avec Docker :

Si vous avez démarré le cluster Cassandra avec docker-compose, en utilisant les fichiers de composition `app.yml` ou `cassandra.yml` générés, l'outil a déjà été exécuté et tous les scripts CQL ont été appliqués.

Après avoir ajouté un script CQL dans le répertoire de journal des modifications, vous pouvez relancer le service Docker responsable de l'exécution du service de migration à nouveau sans arrêter le cluster :  
`docker-compose -f src/main/docker/cassandra.yml up <app>-cassandra-migration`

#### Manuellement :

Avec quelques prérequis, vous pouvez exécuter l'outil manuellement. Cela pourrait être utile pour vous familiariser avec l'outil pour ensuite l'inclure dans votre pipeline de déploiement.

##### Prérequis :

* Ajoutez la variable d'environnement du point de contact Cassandra, généralement localement : ``export CASSANDRA_CONTACT_POINT=`127.0.0.1` ``
* Installez une version récente (>4) de bash et md5sum avec votre gestionnaire de paquets préféré
* Ayez CQLSH dans votre chemin de classe

Pour exécuter l'outil, utilisez cette commande : `src/main/docker/cassandra/scripts/autoMigrate.sh src/main/resources/config/cql/changelog/`

Par défaut, le script `src/main/resources/config/create-keyspace.cql` est utilisé pour créer l'espace de clés si nécessaire.
Vous pouvez le remplacer par un deuxième argument : `src/main/docker/cassandra/scripts/autoMigrate.sh src/main/resources/config/cql/changelog/ create-keyspace-prod.cql`

Si vous voulez uniquement exécuter un script spécifique contre votre cluster, utilisez : `src/main/docker/cassandra/scripts/execute-cql.sh src/main/resources/config/cql/changelog/<votre script>.cql`

## Cassandra et Docker sur les systèmes non-linux

Sur Mac OSx et Windows, les conteneurs Docker ne sont pas hébergés directement mais sur une machine virtuelle VirtualBox.  
Ainsi, vous ne pouvez pas y accéder en localhost mais devez utiliser l'IP de VirtualBox.

Vous pouvez remplacer le point de contact Cassandra (localhost par défaut) avec cette variable d'environnement : ``export SPRING_DATA_CASSANDRA_CONTACTPOINTS=`docker-machine ip default` ``

#### Noeuds Cassandra :

Comme les nœuds Cassandra sont également hébergés dans la machine virtuelle, le pilote Java Cassandra recevra une erreur lorsqu'il essaiera de les contacter après avoir reçu leur adresse à partir du point de contact.  
Pour contourner cela, vous pouvez ajouter une règle de routage à votre table de routage, [(source)](http://krasserm.github.io/2015/07/13/chaos-testing-with-docker-and-cassandra/#port-mapping).

En supposant que les conteneurs exécutant les nœuds Cassandra ont l'adresse IP 172.18.0.x :  
``sudo route -n add 172.18.0.0/16 `docker-machine ip default` ``