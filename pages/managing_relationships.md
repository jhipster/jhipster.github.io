---
layout: default
title: Managing relationships
permalink: /managing-relationships/
redirect_from:
  - /managing_relationships.html
sitemap:
    priority: 0.7
    lastmod: 2020-11-25T09:07:00-00:00
---

# <i class="fa fa-sitemap"></i> Gestion des relations

Lorsque JPA est utilisé, le [sous-générateur d'entités]({{ site.url }}/création-dune-entité/) peut créer des relations entre les entités.

## Présentation

Les relations ne fonctionnent que lorsque JPA est utilisé. Si vous choisissez d'utiliser [Cassandra]({{ site.url }}/utilisation-de-cassandra/), elles ne seront pas disponibles. Dans le cas où vous utilisez [MongoDB]({{ site.url }}/utilisation-de-mongodb/), [Couchbase]({{ site.url }}/utilisation-de-couchbase/) ou [Neo4j]({{ site.url }}/utilisation-de-neo4j), les relations ont une sémantique différente, mais elles sont toutes disponibles à être utilisées. Pour plus d'informations sur les relations Couchbase et MongoDB, veuillez vous référer à [Entités incorporées pour Couchbase et MongoDB](#entités-incorporées-pour-couchbase-et-mongodb).

Une relation fonctionne entre deux entités, et JHipster générera le code pour :

- Gérer cette relation avec JPA dans les entités générées
- Créer le changelog Liquibase correct, afin que la relation existe dans la base de données
- Générer le front-end Angular/React pour que vous puissiez gérer cette relation graphiquement dans l'interface utilisateur

## JHipster UML et JDL Studio

Cette page décrit comment créer des relations avec JHipster en utilisant l'interface de ligne de commande standard. Si vous souhaitez créer de nombreuses entités et relations, vous préférerez peut-être utiliser un outil graphique.

Dans ce cas, trois options sont disponibles :

- [JDL Studio](https://start.jhipster.tech/jdl-studio/), notre outil en ligne pour créer des entités et des relations en utilisant notre langage spécifique au domaine.
- [JHipster IDE]({{ site.url }}/jhipster-ide/), un plugin qui fournit une prise en charge de l'édition textuelle des fichiers JDL pour les IDE populaires.
- Déprécié : _[JHipster UML]({{ site.url }}/jhipster-uml/), qui vous permet d'utiliser un éditeur UML._

Vous pouvez générer des entités avec des relations à partir d'un fichier JDL en utilisant le sous-générateur `jdl`, en exécutant `jhipster jdl votre-fichier-jdl.jh`.

## Relations disponibles

Comme nous utilisons JPA, les relations usuels un-à-plusieurs, plusieurs-à-un, plusieurs-à-plusieurs et un-à-un sont disponibles :


- [<i class="fa fa-sitemap"></i> Gestion des relations](#i-classfa-fa-sitemapi-gestion-des-relations)
  - [Présentation](#présentation)
  - [JHipster UML et JDL Studio](#jhipster-uml-et-jdl-studio)
  - [Relations disponibles](#relations-disponibles)
  - [Une relation unidirectionnelle un-à-plusieurs](#une-relation-unidirectionnelle-un-à-plusieurs)
  - [Une relation bidirectionnelle plusieurs-à-un](#une-relation-bidirectionnelle-plusieurs-à-un)
  - [Une relation bidirectionnelle un-à-plusieurs](#une-relation-bidirectionnelle-un-à-plusieurs)
  - [Une relation unidirectionnelle plusieurs-à-un](#une-relation-unidirectionnelle-plusieurs-à-un)
  - [Deux relations un-à-plusieurs sur les mêmes entités](#deux-relations-un-à-plusieurs-sur-les-mêmes-entités)
  - [Une relation plusieurs-à-plusieurs](#une-relation-plusieurs-à-plusieurs)
  - [Une relation un-à-un](#une-relation-un-à-un)
  - [Une relation unidirectionnelle un-à-un](#une-relation-unidirectionnelle-un-à-un)
    - [Utilisation d'identifiants dérivés JPA (@MapsId) pour la relation un-à-un](#utilisation-didentifiants-dérivés-jpa-mapsid-pour-la-relation-un-à-un)
    - [Définition de la stratégie de récupération des données sur demande (FetchType.EAGER)](#définition-de-la-stratégie-de-récupération-des-données-sur-demande-fetchtypeeager)
  - [Entités imbriquées pour Couchbase et MongoDB](#entités-imbriquées-pour-couchbase-et-mongodb)

_Conseil : l'entité `User`_

Les informations à ce sujet se trouvent [ici]({{ site.url }}/entite-utilisateur/).

**Un petit avertissement sur la génération d'entités et de relations** : dans les exemples suivants, vous remarquerez que la compilation
_peut_ échouer dans certains cas parce que les entités de destination ne sont pas générées, et c'est normal (cet avertissement peut être ignoré).
Il existe deux façons d'éviter cela :
  - Générer d'abord les entités, puis les relations
  - Utiliser le JDL

---

## Une relation unidirectionnelle un-à-plusieurs

Commençons par deux entités, un `Propriétaire` et une `Voiture`. Un propriétaire peut avoir plusieurs voitures, et une voiture peut avoir un seul propriétaire.

Il s'agit donc d'une relation un-à-plusieurs (un propriétaire a plusieurs voitures) d'un côté, et d'une relation plusieurs-à-un (plusieurs voitures ont un seul propriétaire) de l'autre côté :

    Propriétaire (1) <-----> (*) Voiture

Notez qu'après la génération de l'entité, le générateur vous informera que des erreurs se sont produites lors de la génération des fichiers.
C'est normal car l'entité de destination n'a pas encore été générée, vous pouvez donc ignorer en toute sécurité cet avertissement.

Nous allons d'abord créer le `Propriétaire`. Voici les questions pertinentes de JHipster pour le `Propriétaire` :

    jhipster entity Propriétaire
    ...
    Génération des relations avec d'autres entités
    ? Voulez-vous ajouter une relation vers une autre entité ? Oui
    ? Quel est le nom de l'autre entité ? Voiture
    ? Quel est le nom de la relation ? voiture
    ? Quel est le type de la relation ? un-à-plusieurs
    ? Quel est le nom de cette relation dans l'autre entité ? propriétaire

Veuillez noter que nous avons sélectionné les options par défaut concernant les noms des relations.

Maintenant, nous pouvons générer la `Voiture` :

    jhipster entity Voiture
    ...
    Génération des relations avec d'autres entités
    ? Voulez-vous ajouter une relation vers une autre entité ? Oui
    ? Quel est le nom de l'autre entité ? Propriétaire
    ? Quel est le nom de la relation ? propriétaire
    ? Quel est le type de la relation ? many-to-one
    ? Lorsque vous affichez cette relation avec Angular, quel champ de 'Propriétaire' souhaitez-vous utiliser ? id


La même chose peut être réalisée en utilisant le JDL ci-dessous également

    entité Propriétaire
    entity Voiture

    relationship OneToMany {
      Propriétaire{voiture} to Voiture{propriétaire}
    }

C'est tout, vous avez maintenant une relation un-à-plusieurs entre ces deux entités ! Sur l'interface client Angular/React générée, vous aurez une liste déroulante dans `Voiture` pour sélectionner un `Propriétaire`.

## Une relation bidirectionnelle plusieurs-à-un

Cela équivaut à la relation bidirectionnelle un-à-plusieurs après inversion des côtés dans le fichier JDL :

    entité Propriétaire
    entity Voiture

    relationship ManyToOne {
      Voiture{propriétaire} to Propriétaire{voiture}
    }

## Une relation unidirectionnelle plusieurs-à-un

Dans l'exemple précédent, nous avions une relation bidirectionnelle : à partir d'une instance `Voiture`, vous pouviez trouver son propriétaire, et à partir d'une instance `Propriétaire`, vous pouviez obtenir toutes ses voitures.

Une relation plusieurs-à-un unidirectionnelle signifie que les voitures connaissent leur propriétaire, mais pas l'inverse.

    Propriétaire (1) <----- (*) Voiture

Vous feriez cette relation pour deux raisons :

- Du point de vue métier, vous n'utilisez vos entités que de cette manière. Vous ne voulez donc pas avoir une API qui permet aux développeurs de faire quelque chose qui n'a pas de sens.
- Vous avez un petit gain de performance lorsque vous utilisez l'entité `Propriétaire` (car elle n'aura pas à gérer la collection de voitures).

Dans ce cas, vous créeriez toujours d'abord le `Propriétaire`, cette fois sans relation :

    jhipster entity Propriétaire
    ...
    Génération des relations avec d'autres entités
    ? Voulez-vous ajouter une relation vers une autre entité ? Non

Puis l'entité `Voiture`, comme dans l'exemple précédent :

    jhipster entity Voiture
    ...
    Génération des relations avec d'autres entités
    ? Voulez-vous ajouter une relation vers une autre entité ? Oui
    ? Quel est le nom de l'autre entité ? Propriétaire
    ? Quel est le nom de la relation ? propriétaire
    ? Quel est le type de la relation ? many-to-one
    ? Lorsque vous affichez cette relation avec Angular, quel champ de 'Propriétaire' souhaitez-vous utiliser ? id

Cela fonctionnera comme dans l'exemple précédent, mais vous ne pourrez pas ajouter ou supprimer de voitures de l'entité `Propriétaire`. Sur l'interface client Angular/React générée, vous aurez une liste déroulante dans `Voiture` pour sélectionner un `Propriétaire`.
Voici le JDL correspondant :

    entité Propriétaire
    entity Voiture

    relationship ManyToOne {
      Voiture{propriétaire} to Propriétaire
    }

## Une relation unidirectionnelle un-à-plusieurs

Une relation un-à-plusieurs unidirectionnelle signifie que l'instance `Propriétaire` peut obtenir sa collection de voitures, mais pas l'inverse. C'est l'opposé de l'exemple précédent.

    Propriétaire (1) -----> (*) Voiture

Ce type de relation n'est pas fourni par défaut dans JHipster pour le moment, voir [#1569](https://github.com/jhipster/generator-jhipster/issues/1569) pour plus d'informations.

Vous avez deux solutions pour cela :

- Faire une correspondance bidirectionnelle, et l'utiliser sans modification : c'est notre approche recommandée, car elle est beaucoup plus simple
- Faire une correspondance bidirectionnelle, puis la modifier pour la transformer en correspondance unidirectionnelle :
    - Supprimez l'attribut "mappedBy" sur votre annotation `@OneToMany`
    - Générez la table de jointure requise : vous pouvez faire un `mvn liquibase:diff` pour générer cette table, voir la [documentation sur l'utilisation de Liquibase diff]({{ site.url }}/development/)

Cela n'est pas pris en charge avec JDL car ce n'est pas dans JHipster.

## Deux relations un-à-plusieurs sur les mêmes deux entités

Pour cet exemple, une `Personne` peut être le propriétaire de plusieurs voitures et peut également être le conducteur de plusieurs voitures :

    Personne (1) <---possède---> (*) Voiture
    Personne (1) <---conduit---> (*) Voiture



Pour cela, nous devons utiliser les noms de relation, que nous avons laissés avec leurs valeurs par défaut dans les exemples précédents.

Générez l'entité `Personne`, qui a deux relations un-à-plusieurs avec l'entité `Voiture` :

    jhipster entity Personne
    ...
    Génération des relations avec d'autres entités
    ? Voulez-vous ajouter une relation vers une autre entité ? Oui
    ? Quel est le nom de l'autre entité ? Voiture
    ? Quel est le nom de la relation ? ownedCar
    ? Quel est le type de la relation ? one-to-many
    ? Quel est le nom de cette relation dans l'autre entité ? owner
    ...
    Génération des relations avec d'autres entités
    ? Voulez-vous ajouter une relation vers une autre entité ? Oui
    ? Quel est le nom de l'autre entité ? Voiture
    ? Quel est le nom de la relation ? drivenCar
    ? Quel est le type de la relation ? one-to-many
    ? Quel est le nom de cette relation dans l'autre entité ? driver

Générez maintenant l'entité `Voiture`, qui utilise le même nom de relation configuré dans l'entité `Personne` :

    jhipster entity Voiture
    ...
    Génération des relations avec d'autres entités
    ? Voulez-vous ajouter une relation vers une autre entité ? Oui
    ? Quel est le nom de l'autre entité ? Personne
    ? Quel est le nom de la relation ? owner
    ? Quel est le type de la relation ? many-to-one
    ? Lorsque vous affichez cette relation avec Angular, quel champ de 'Personne' souhaitez-vous utiliser ? id
    ...
    Génération des relations avec d'autres entités
    ? Voulez-vous ajouter une relation vers une autre entité ? Oui
    ? Quel est le nom de l'autre entité ? Personne
    ? Quel est le nom de la relation ? driver
    ? Quel est le type de la relation ? many-to-one
    ? Lorsque vous affichez cette relation avec Angular, quel champ de 'Personne' souhaitez-vous utiliser ? id

La même chose peut être réalisée en utilisant le JDL ci-dessous également :

    entité Personne
    entity Voiture

    relationship OneToMany {
      Personne{ownedCar} to Voiture{owner}
    }

    relationship OneToMany {
      Personne{drivenCar} to Voiture{driver}
    }

Une `Voiture` peut désormais avoir un propriétaire et un conducteur, qui sont tous deux des entités `Personne`. Sur l'interface client Angular/React générée, vous aurez des listes déroulantes dans `Voiture` pour sélectionner une `Personne` pour le champ `owner` et le champ `driver`.

## Une relation plusieurs-à-plusieurs

Un `Conducteur` peut conduire plusieurs voitures, mais une `Voiture` peut également avoir plusieurs conducteurs.

    Conducteur (*) <-----> (*) Voiture

Au niveau de la base de données, cela signifie que nous aurons une table de jonction entre les tables `Conducteur` et `Voiture`.

Pour JPA, l'une de ces deux entités devra gérer la relation : dans notre cas, ce serait l'entité `Voiture`, qui sera responsable d'ajouter ou de supprimer des conducteurs.

Veuillez noter qu'après avoir généré l'entité, le générateur vous informera que des erreurs se sont produites lors de la génération
des fichiers. C'est normal car l'entité de destination n'a pas encore été générée, vous pouvez donc ignorer en toute sécurité cet avertissement.

Générez maintenant le côté non propriétaire de la relation, le `Conducteur`, avec une relation plusieurs-à-plusieurs :

    jhipster entity Conducteur
    ...
    Génération des relations avec d'autres entités
    ? Voulez-vous ajouter une relation vers une autre entité ? Oui
    ? Quel est le nom de l'autre entité ? Voiture
    ? Quel est le nom de la relation ? voiture
    ? Quel est le type de la relation ? many-to-many
    ? Cette entité est-elle propriétaire de la relation ? Non
    ? Quel est le nom de cette relation dans l'autre entité ? conducteur

Puis générer la `Voiture`, avec le côté propriétaire de la relation plusieurs-à-plusieurs :

    jhipster entity Voiture
    ...
    Génération des relations avec d'autres entités
    ? Voulez-vous ajouter une relation vers une autre entité ? Oui
    ? Quel est le nom de l'autre entité ? Conducteur
    ? Quel est le nom de la relation ? conducteur
    ? Quel est le type de la relation ? many-to-many
    ? Cette entité est-elle propriétaire de la relation ? Oui
    ? Quel est le nom de cette relation dans l'autre entité ? voiture
    ? Lorsque vous affichez cette relation côté client, quel champ de 'Conducteur' souhaitez-vous utiliser ? Ce champ sera affiché comme une chaîne de caractères, il ne peut donc pas être un id Blob

La même chose peut être réalisée en utilisant le JDL ci-dessous également

    entity Conducteur
    entity Voiture

    relationship ManyToMany {
      Voiture{conducteur} à Conducteur{voiture}
    }

C'est tout, vous avez maintenant une relationship many-to-many entre ces deux entités ! Sur l'interface client Angular/React générée, vous aurez une liste déroulante multi-sélection dans `Voiture` pour sélectionner plusieurs `Conducteur` puisque `Voiture` est le côté propriétaire.

## Une relation un-à-un

Suivant notre exemple, une relation un-à-un signifierait qu'un `Conducteur` ne peut conduire qu'une `Voiture`, et qu'une `Voiture` ne peut avoir qu'un seul `Conducteur`.

    Conducteur (1) <-----> (1) Voiture

Créez d'abord le côté non propriétaire de la relation, dans notre cas le `Conducteur` :

    jhipster entity Conducteur
    ...
    Génération des relations avec d'autres entités
    ? Voulez-vous ajouter une relation vers une autre entité ? Oui
    ? Quel est le nom de l'autre entité ? Voiture
    ? Quel est le nom de la relation ? voiture
    ? Quel est le type de la relation ? one-to-one
    ? Cette entité est-elle propriétaire de la relation ? Non
    ? Quel est le nom de cette relation dans l'autre entité ? conducteur

Ensuite, générez la `Voiture`, qui possède la relation :

    jhipster entity Voiture
    ...
    Génération des relations avec d'autres entités
    ? Voulez-vous ajouter une relation vers une autre entité ? Oui
    ? Quel est le nom de l'autre entité ? Conducteur
    ? Quel est le nom de la relation ? conducteur
    ? Quel est le type de la relation ? one-to-one
    ? Cette entité est-elle propriétaire de la relation ? Oui
    ? Voulez-vous utiliser un identifiant dérivé JPA - @MapsId ? Non
    ? Quel est le nom de cette relation dans l'autre entité ? voiture
    ? Lorsque vous affichez cette relation côté client, quel champ de 'Conducteur' souhaitez-vous utiliser ? Ce champ sera affiché comme une chaîne de caractères, il ne peut donc pas être un id Blob

La même chose peut être réalisée en utilisant le JDL ci-dessous également :

    entity Conducteur
    entity Voiture

    relationship OneToOne {
      Voiture{conducteur} à Conducteur{voiture}
    }

C'est tout, vous avez maintenant une relation un-à-un entre ces deux entités ! Sur l'interface client Angular/React générée, vous aurez une liste déroulante dans `Voiture` pour sélectionner un `Conducteur` puisque `Voiture` est le côté propriétaire.

[Plus d'informations sur l'utilisation du one-to-one avec les identifiants dérivés JPA](#utilisation-d-identifiants-dériver-jpa-mapsid-pour-la-relation-one-to-one)

## Une relation unidirectionnelle un-à-un

Une relation unidirectionnelle un-à-un signifie que l'instance `citoyen` peut obtenir son passeport, mais l'instance `passeport` ne peut pas obtenir son propriétaire.

    Citoyen (1) -----> (1) Passeport

Générez d'abord l'entité `Passeport`, sans aucune relation avec son propriétaire :

    jhipster entity Passeport
    ...
    Génération des relations avec d'autres entités
    ? Voulez-vous ajouter une relation vers une autre entité ? Non

Ensuite, générez l'entité `Citoyen` :

    jhipster entity Citoyen
    ...
    Génération des relations avec d'autres entités
    ? Voulez-vous ajouter une relation vers une autre entité ? Oui
    ? Quel est le nom de l'autre entité ? Passeport
    ? Quel est le nom de la relation ? passeport
    ? Quel est le type de la relation ? one-to-one
    ? Cette entité est-elle propriétaire de la relation ? Oui
    ? Voulez-vous utiliser un identifiant dérivé JPA - @MapsId ? Non
    ? Quel est le nom de cette relation dans l'autre entité ? citoyen
    ? Lorsque vous affichez cette relation avec Angular, quel champ de 'Passeport' souhaitez-vous utiliser ? id

Après cela, un `Citoyen` possède un passeport, mais aucune instance de `Citoyen` n'est définie dans `Passeport`. Sur l'interface client Angular/React générée, vous aurez une liste déroulante dans `Citoyen` pour sélectionner un `Passeport` puisque `Citoyen` est le côté propriétaire.


    entity Citizen
    entity Passport

    relationship OneToOne {
      Citizen{passport} to Passport
    }


### Utilisation des identifiants dérivés JPA (@MapsId) pour les relations one-to-one

[Les identifiants dérivés JPA](https://javaee.github.io/javaee-spec/javadocs/javax/persistence/MapsId.html) peuvent être utilisés pour avoir [le mappage le plus efficace](https://vladmihalcea.com/the-best-way-to-map-a-onetoone-relationship-with-jpa-and-hibernate/).

Voici le JDL correspondant à l'exemple précédent de relation unidirectionnelle one-to-one :

    entity Citoyen
    entité Passeport

    relationship OneToOne {
      Citoyen{passeport} à @Id Passeport
    }

Voici le JDL correspondant à l'exemple précédent de relation bidirectionnelle one-to-one :

    entity Conducteur
    entity Voiture

    relationship OneToOne {
      Voiture{conducteur} à @Id Conducteur{voiture}
    }

Cependant, en fonction des besoins métier, il peut y avoir des cas où cela devrait être évité car cela présente la contrainte suivante :
**Une fois que l'identifiant (clé primaire) est défini côté propriétaire, il n'est pas modifiable en utilisant JPA/Hibernate. De toute façon, vous ne devriez pas le changer.**

**Voici quelques suggestions concernant l'utilisation :**

Utilisez `@MapsId` lorsque :
* Dépendant - si le côté propriétaire (entité enfant) semble étroitement dépendant du non-propriétaire (entité parent).
* La valeur d'association ne doit jamais être modifiée - si vous ne prévoyez jamais de modifier l'identifiant (clé primaire) de l'entité enfant une fois qu'il est défini.

    Par exemple :

    <pre>
    class Utilisateur{}
    class Profil{ @OneToOne @MapsId private Utilisateur utilisateur; } // le profil est uniquement destiné à cet utilisateur
    class Préférences{ @OneToOne @MapsId private Utilisateur utilisateur; } // les préférences sont uniquement destinées à cet utilisateur
    </pre>

    Une fois qu'un profil ou des préférences sont créés pour un utilisateur, ils ne changeront jamais pour se référer à un autre utilisateur.

N'utilisez pas `@MapsId` lorsque :
* Non dépendant - si le côté propriétaire (entité enfant) semble ne pas dépendre du non-propriétaire (entité parent).
* La valeur d'association est censée changer - si vous pensez que l'entité enfant va se référer à une autre entité parent à l'avenir.

    Par exemple :

    <pre>
    class Voiture{ @OneToOne @JoinColumn(name="current_driver_id") Conducteur conducteurActuel} // la voiture peut être conduite par un autre conducteur à l'avenir
    class Conducteur{@OneToOne(mappedBy = "conducteurActuel") Voiture voitureConduite} // le conducteur conduit une autre voiture à l'avenir
    </pre>
    À la fois la voiture et l'association du conducteur peuvent changer à l'avenir.

**Remarque : Il y a [un problème connu concernant l'utilisation de `@OneToOne` avec `@MapsId` et comment l'éviter](https://www.jhipster.tech/tips/026_tip_issue_of_onetoone_with_mapsid_how_to_avoid_it.html)**.


### Définir la stratégie de récupération des données sur eager (FetchType.EAGER)

Toutes les relations utilisent le FetchType JPA par défaut :
- OneToMany : LAZY
- ManyToOne : EAGER
- ManyToMany : LAZY
- OneToOne : EAGER

Il existe [un problème connu de NPE lors de la désérialisation JSON](https://github.com/jhipster/generator-jhipster/issues/10981) en raison du type de récupération eager. Si vous souhaitez définir la relation `OneToMany` ou `ManyToMany` sur `FetchType.EAGER`, vous pouvez utiliser l'une des solutions suivantes :
- Utilisez <pre>@JsonInclude(JsonInclude.Include.NON_EMPTY)</pre> sur la relation

    Par exemple :

    <pre>
    @OneToMany(mappedBy = "parent", fetch = FetchType.EAGER)
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Set<Child> child = new HashSet<>();
    </pre>
- Retournez null si la collection est vide lors de la récupération de la ressource dans le backend
- Utiliser DTO et gérer le cas particulier de collection vide

### Entités intégrées pour Couchbase et MongoDB

Couchbase et MongoDB prennent en charge les relations via des documents intégrés. Pour plus d'informations sur les documents intégrés dans MongoDB, consultez [https://docs.mongodb.com/manual/applications/data-models-relationships/](https://docs.mongodb.com/manual/applications/data-models-relationships/) et pour Couchbase, consultez [https://docs.couchbase.com/server/5.1/data-modeling/modeling-relationships.html](https://docs.couchbase.com/server/5.1/data-modeling/modeling-relationships.html).

Vous pouvez définir des documents intégrés simplement en utilisant `@embedded`. Par exemple, pour définir une relationship one-to-one ;

<pre>
entity Country {
  countryName String
}

@embedded
entity Region {
  regionName String
}


relationship OneToOne {
  Country to Region
}
</pre>

De même, pour une relationship one-to-many,

<pre>
entity Country {
  countryName String
}

@embedded
entity Region {
  regionName String
}


relationship OneToMany {
  Country to Region
}
</pre>

Pour une relationship many-to-many, vous pouvez simplement utiliser le mot-clé`@embedded` dans les deux directions ;

<pre>
@embedded
  entity Country {
  countryName String
}

@embedded
entity Region {
  regionName String
}


relationship ManyToMany {
  Country to Region
}
</pre>
