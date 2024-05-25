---
layout: default
title: Création d'une entité
permalink: /creating-an-entity/
redirect_from:
  - /creating_an_entity.html
sitemap:
    priority: 0.7
    lastmod: 2018-09-04T00:00:00-00:00
---


# <i class="fa fa-bolt"></i> Création d'une entité

_**Veuillez consulter notre [tutoriel vidéo]({{ site.url }}/video-tutorial/) sur la création d'une nouvelle application JHipster !**_

**Important :** Si vous souhaitez bénéficier du "rechargement en direct" de votre code JavaScript/TypeScript, vous devrez exécuter `npm start`. Vous pouvez consulter la page [Utilisation de JHipster en développement]({{ site.url }}/development/) pour plus d'informations.

## Introduction

Une fois que vous avez créé votre application, vous voudrez créer des _entités_. Par exemple, vous voudrez peut-être créer une entité _Auteur_ et une entité _Livre_. Pour chaque entité, vous aurez besoin de :

*   Une table de base de données
*   Un ensemble de changements Liquibase
*   Une entité JPA
*   Un dépôt Spring Data JPA
*   Un contrôleur REST Spring MVC, qui contient les opérations CRUD de base
*   Un routeur Angular, un composant et un service
*   Une vue HTML
*   Des tests d'intégration, pour valider que tout fonctionne comme prévu
*   Des tests de performance, pour voir si tout fonctionne de manière fluide

Si vous avez plusieurs entités, vous voudrez probablement établir des relations entre elles. Pour cela, vous aurez besoin de :

*   Une clé étrangère de base de données
*   Un code JavaScript et HTML spécifique pour gérer cette relation

Le sous-générateur "entity" créera tous les fichiers nécessaires et fournira une interface utilisateur frontale CRUD pour chaque entité (voir [Structure du projet Angular]({{ site.url }}/using-angular/) et [Structure du projet React]({{ site.url }}/using-react/)). Le sous-générateur peut être invoqué en exécutant `jhipster entity <nom_entité> --[options]`. Vous pouvez trouver la référence de ces options en tapant `jhipster entity --help`.

Voici les options prises en charge :

*   `--table-name <nom_table>` - Par défaut, JHipster générera un nom de table en fonction du nom de votre entité. Si vous souhaitez avoir un nom de table différent, vous pouvez le faire en passant cette option.
*   `--angular-suffix <suffixe>` - Si vous voulez que toutes vos routes Angular aient un suffixe personnalisé, vous pouvez le spécifier avec cette option.
*   `--client-root-folder <nom_dossier>` - Utiliser un nom de dossier racine pour les entités côté client. Par défaut, c'est vide pour les monolithes et le nom du microservice pour les passerelles.
*   `--regenerate` - Cela régénérera une entité existante sans poser de questions.
*   `--skip-server` - Cela ignorera le code côté serveur et générera uniquement le code côté client.
*   `--skip-client` - Cela ignorera le code côté client et générera uniquement le code côté serveur.
*   `--skip-db-changelog` - Cela ignorera la génération du changelog de la base de données (utilisation de Liquibase pour les bases de données SQL).
*   `--db` - Spécifier la base de données lors de l'ignorance de la génération côté serveur, sans effet autrement.

<div class="alert alert-warning"><i>Avertissement :</i>

Ne choisissez pas un nom court pour votre entité (voir <a href="https://github.com/jhipster/generator-jhipster/issues/8446" target="_blank" rel="noopener">ce ticket</a>).

</div>

## JHipster UML et JDL Studio

Cette page décrit comment créer des entités avec JHipster en utilisant l'interface en ligne de commande standard. Si vous souhaitez créer de nombreuses entités, vous préférerez peut-être utiliser un outil graphique.

Dans ce cas, deux options sont disponibles :

*   [JHipster UML]({{ site.url }}/jhipster-uml/), qui vous permet d'utiliser un éditeur UML.
*   [JDL Studio](https://start.jhipster.tech/jdl-studio/), notre outil en ligne pour créer des entités et des relations en utilisant notre langage spécifique au domaine [JDL]({{ site.url }}/jdl/).

Si vous avez utilisé le JDL Studio :

*   Vous pouvez générer des entités à partir d'un fichier JDL en utilisant le sous-générateur `jdl`, en exécutant `jhipster jdl votre-fichier-jdl.jh`.

    * Si vous ne souhaitez pas régénérer vos entités lors de l'importation d'un JDL, vous pouvez utiliser le drapeau `--json-only` pour ignorer la partie création d'entité et créer uniquement les fichiers json dans le dossier `.jhipster`.

    ```
    jhipster jdl ./mon-fichier-jdl.jdl --json-only
    ```

    * Par défaut, `jdl` régénère uniquement les entités qui ont changé, si vous voulez que toutes vos entités soient régénérées, passez le drapeau `--force`. Veuillez noter que cela écrasera toutes vos modifications locales apportées aux fichiers d'entité

    ```
    jhipster jdl ./mon-fichier-jdl.jdl --force
    ```

*   Si vous souhaitez utiliser JHipster UML au lieu du sous-générateur `jdl`, vous devez l'installer en exécutant `npm install -g jhipster-uml`, puis exécuter `jhipster-uml votreNomDeFichier.jh`.

## Champs d'entité

Pour chaque entité, vous pouvez ajouter autant de champs que vous le souhaitez. Vous devrez saisir les noms de champ et leurs types, et JHipster générera pour vous tout le code et la configuration nécessaires, de la vue HTML Angular au changelog Liquibase.

Ces champs ne peuvent pas contenir de mots-clés réservés dans les technologies que vous utilisez. Par exemple, si vous utilisez MySQL :

*   Vous ne pouvez pas utiliser de mots-clés réservés Java (votre code ne compilerait pas)
*   Vous ne pouvez pas utiliser de mots-clés réservés MySQL (la mise à jour du schéma de votre base de données échouerait)


## Types de champs

JHipster prend en charge de nombreux types de champs. Cette prise en charge dépend de votre backend de base de données, nous utilisons donc des types Java pour les décrire : une `String` Java sera stockée différemment dans Oracle ou Cassandra, et c'est l'une des forces de JHipster de générer le code d'accès à la base de données correct pour vous.

*   `String` : Une chaîne de caractères Java. Sa taille par défaut dépend du backend sous-jacent (si vous utilisez JPA, c'est 255 par défaut), mais vous pouvez la modifier en utilisant les règles de validation (en mettant une taille `max` de 1024, par exemple).
*   `Integer` : Un entier Java.
*   `Long` : Un long Java.
*   `Float` : Un flottant Java.
*   `Double` : Un double Java.
*   `BigDecimal` : Un objet [java.math.BigDecimal](https://docs.oracle.com/javase/8/docs/api/java/math/BigDecimal.html), utilisé lorsque vous avez besoin de calculs mathématiques exacts (souvent utilisé pour les opérations financières).
*   `LocalDate` : Un objet [java.time.LocalDate](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDate.html), utilisé pour gérer correctement les dates en Java.
*   `Instant` : Un objet [java.time.Instant](https://docs.oracle.com/javase/8/docs/api/java/time/Instant.html), utilisé pour représenter un horodatage, un point instantané sur la ligne de temps.
*   `ZonedDateTime` : Un objet [java.time.ZonedDateTime](https://docs.oracle.com/javase/8/docs/api/java/time/ZonedDateTime.html), utilisé pour représenter un date-heure locale dans un fuseau horaire donné (typiquement un rendez-vous de calendrier). Notez que les fuseaux horaires ne sont pas pris en charge par les couches REST ni par les couches de persistance, vous devriez donc probablement utiliser `Instant` à la place.
*   `Duration` : Un objet [java.time.Duration](https://docs.oracle.com/javase/8/docs/api/java/time/Duration.html), utilisé pour représenter une durée.
*   `UUID` : Un [java.util.UUID](https://docs.oracle.com/javase/8/docs/api/java/util/UUID.html).
*   `Boolean` : Un booléen Java.
*   `Enumeration` : Un objet d'énumération Java. Lorsque ce type est sélectionné, le sous-générateur vous demandera quelles valeurs vous voulez dans votre énumération, et il créera une classe `enum` spécifique pour les stocker.
*   `Blob` : Un objet Blob, utilisé pour stocker des données binaires. Lorsque ce type est sélectionné, le sous-générateur vous demandera si vous voulez stocker des données binaires génériques, un objet image, ou un CLOB (long texte). Les images seront gérées spécifiquement côté Angular, afin qu'elles puissent être affichées à l'utilisateur final.

## Validation

La validation peut être configurée pour chaque champ. En fonction du type de champ, différentes options de validation seront disponibles.

La validation sera automatiquement générée sur :

*   les vues HTML, en utilisant le mécanisme de validation Angular, React ou Vue
*   les objets de domaine Java, en utilisant [Bean Validation](http://beanvalidation.org/)

La validation des objets de domaine sera ensuite utilisée pour valider automatiquement les objets de domaine lorsqu'ils sont utilisés dans :

*   les contrôleurs Spring MVC REST (en utilisant l'annotation `@Valid`)
*   Hibernate/JPA (les entités sont automatiquement validées avant d'être enregistrées)

Les informations de validation seront également utilisées pour générer des métadonnées de colonne de base de données plus précises :

*   Les champs requis seront marqués comme non nuls
*   Les champs uniques créeront une contrainte unique
*   Les champs ayant une longueur maximale auront la même longueur de colonne

La validation présente quelques limitations :

*   Nous ne prenons pas en charge toutes les options de validation d'Angular, de React et de Bean Validation, car nous ne prenons en charge que celles qui sont communes aux API client et serveur
*   Les expressions régulières ne fonctionnent pas de la même manière en JavaScript et en Java, donc si vous en configurez une, vous devrez peut-être ajuster l'une des expressions générées
*   JHipster génère des tests unitaires qui fonctionnent pour des entités génériques, sans connaître vos règles de validation : il est possible que les tests générés ne respectent pas les règles de validation. Dans ce cas, vous devrez mettre à jour les valeurs d'exemple utilisées dans vos tests unitaires, afin qu'elles respectent les règles de validation.


## Relations entre les entités

Les relations entre les entités ne sont disponibles que pour les bases de données SQL. C'est un sujet assez complexe, qui a sa propre page de documentation : [Gestion des relations]({{ site.url }}/managing-relationships/).

## Génération d'une classe de service distincte pour votre logique métier

Avoir une classe de service distincte permet d'avoir une logique plus complexe par rapport à l'utilisation directe d'un contrôleur REST Spring. Avoir une couche de service (avec ou sans interface) vous permettra d'utiliser des DTO (voir la section suivante).

Il s'agit de la même logique que celle utilisée avec le [sous-générateur de service Spring]({{ site.url }}/creating-a-spring-service/), nous vous recommandons donc de lire sa documentation pour avoir plus d'informations.

## Objets de transfert de données (DTO)

Par défaut, les entités JHipster n'utilisent pas de DTO, mais ils sont disponibles en option, si vous choisissez d'avoir une couche de service (voir la section précédente). Voici la documentation : [Utilisation des DTO]({{ site.url }}/using-dtos/).

## Filtrage

Facultativement, les entités stockées dans les bases de données SQL peuvent être filtrées à l'aide de JPA. Voici la documentation : [Filtrer vos entités]({{ site.url }}/entities-filtering/).

## Pagination

Veuillez noter que la pagination n'est pas disponible si vous avez créé votre application avec [Cassandra]({{ site.url }}/using-cassandra/). Cela sera ajouté dans une future version.

La pagination utilise [l'en-tête Link](http://tools.ietf.org/html/rfc5988), comme dans [l'API GitHub](https://developer.github.com/v3/#pagination). JHipster fournit une implémentation personnalisée de cette spécification à la fois côté serveur (Spring MVC REST) et côté client (Angular/React).

Lorsque l'entité est générée, JHipster propose 4 options de pagination :

*   Pas de pagination (dans ce cas, le back-end ne sera pas paginé)
*   Un système de pagination complet, basé sur [le composant de pagination Bootstrap](https://getbootstrap.com/docs/4.3/components/pagination/){: target="_blank"}
*   Un système de défilement infini, basé sur [la directive de défilement infini](http://sroze.github.io/ngInfiniteScroll/)

## Mise à jour d'une entité existante

La configuration de l'entité est enregistrée dans un fichier `.json` spécifique, dans le répertoire `.jhipster`. Donc, si vous exécutez à nouveau le sous-générateur, en utilisant un nom d'entité existant, vous pouvez mettre à jour ou régénérer l'entité.

Lorsque vous exécutez le sous-générateur d'entité pour une entité existante, vous serez invité à une question "Voulez-vous mettre à jour l'entité ? Cela remplacera les fichiers existants pour cette entité, tout votre code personnalisé sera écrasé" avec les options suivantes :

*   `Oui, régénérer l'entité` - Cela régénérera votre entité. Astuce : cela peut être forcé en passant le flag `--regenerate` lors de l'exécution du sous-générateur.
*   `Oui, ajouter plus de champs et de relations` - Cela vous donnera des questions pour ajouter plus de champs et de relations.
*   `Oui, supprimer des champs et des relations` - Cela vous donnera des questions pour supprimer les champs et les relations existantes de l'entité.
*   `Non, quitter` - Cela quittera le sous-générateur sans rien changer.

Vous voudrez peut-être mettre à jour votre entité pour les raisons suivantes :

*   Vous voulez ajouter/supprimer des champs et des relations à une entité existante.
*   Vous voulez réinitialiser le code de votre entité à son état d'origine.
*   Vous avez mis à jour JHipster et souhaitez que votre entité soit générée avec les nouveaux modèles.
*   Vous avez modifié le fichier de configuration `.json` (le format est assez proche des questions posées par le générateur, donc ce n'est pas très compliqué), donc vous pouvez avoir une nouvelle version de votre entité.
*   Vous avez copié/collé le fichier `.json`, et vous voulez une nouvelle entité qui soit très proche de l'entité copiée.

ASTUCE : pour régénérer toutes vos entités en une seule fois, vous pouvez utiliser les commandes suivantes (supprimez le flag `--force` pour que des questions soient posées lorsque des fichiers ont changé).

*   Linux et Mac : ``for f in `ls .jhipster`; do jhipster entity ${f%.*} --force ; done``
*   Windows : `for %f in (.jhipster/*) do jhipster entity %~nf --force`

## Tutoriel

Il s'agit d'un court tutoriel sur la création de deux entités (un Auteur et un Livre) qui ont une relation de un-à-plusieurs.

**Important** si vous souhaitez avoir un "rechargement automatique" de votre code JavaScript/TypeScript, vous devrez exécuter `npm start`. Vous pouvez consulter la page [Utilisation de JHipster en développement]({{ site.url }}/development/) pour plus d'informations.

### Générer l'entité "Auteur"(author)

Comme nous voulons avoir une relation de un-à-plusieurs entre les Auteurs et les Livres (un auteur peut écrire plusieurs livres), nous devons d'abord créer l'Auteur. Au niveau de la base de données, JHipster pourra ensuite ajouter une clé étrangère sur la table des Livres, liée à la table des Auteurs.

`jhipster entity author`

Répondez aux questions suivantes concernant les champs de cette entité, l'auteur a :

*   un "nom" de type "String"
*   une "date de naissance" de type "LocalDate"

Puis répondez aux questions concernant les relations, l'auteur a :

*   Une relation de un-à-plusieurs avec l'entité "book" (qui n'existe pas encore)


### Générer l'entité "Livre"(Book)

`jhipster entity book`

Répondez aux prochaines questions concernant les champs de cette entité, le livre a :

*   un "titre", de type "String"
*   une "description", de type "String"
*   une "date de publication", de type "LocalDate"
*   un "prix", de type "BigDecimal"

Puis répondez aux questions concernant les relations, le livre :

*   A une relation de plusieurs-à-un avec l'entité "author"
*   Et cette relation utilise le champ "nom" (de l'entité Auteur) pour être affichée

### Vérifiez le code généré

Exécutez la suite de tests générée, avec `mvn test`, qui testera l'entité Auteur et l'entité Livre.

Lancez l'application (par exemple avec `mvn`), connectez-vous et sélectionnez les entités "Auteur" et "Livre" dans le menu "entités".

Vérifiez les tables de la base de données, pour voir si vos données sont correctement insérées.

### Améliorez le code généré

Les fichiers générés contiennent toutes les opérations CRUD de base, et n'ont pas besoin d'être modifiés si vous n'avez pas besoin de plus que des opérations CRUD.

Si vous souhaitez modifier le code généré ou le schéma de base de données, vous devez suivre notre [guide de développement]({{ site.url }}/development/)

Si vous souhaitez des comportements métier plus complexes, vous devrez peut-être ajouter une classe Spring `@Service`, en utilisant le [sous-générateur de service]({{ site.url }}/creating-a-service/).

### Vous avez terminé !

Votre page CRUD générée devrait ressembler à ceci :

![]({{ site.url }}/images/screenshot_5.png)
