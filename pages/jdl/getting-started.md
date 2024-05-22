---
layout: default
title: Langage de Domaine JHipster -  Premiers pas
permalink: /jdl/getting-started
sitemap:
  priority: 0.5
  lastmod: 2021-03-08T12:00:00-00:00
---

# <i class="fa fa-star"></i> Langage de Domaine JHipster (JDL) -  Premiers pas

## Sommaire

Sur cette page, vous apprendrez à utiliser le JDL et à créer des applications et tout ce qui les entoure.

1. [Générer du contenu](#generer-du-contenu)
   1. [Utiliser des fichiers](#utiliser-des-fichiers)
   1. [Utiliser un JDL inline](#utiliser-un-jdl-inline)
1. [Applications](#generer-des-applications)
1. [Entités](#generer-des-entites)
1. [Champs](#generer-des-champs)
1. [Énumérations](#enumerations)
1. [Relations](#ajouter-des-relations)
1. [Options](#options)
1. [Déploiements](#deploiements)
1. [Constantes](#constantes)
1. [Exporter vers un fichier JDL](#exporter-vers-un-fichier-jdl)

---

## Générer du contenu

### Utiliser des fichiers

Vous pouvez utiliser des fichiers JDL pour générer des entités :

- Créez un fichier avec l'extension '.jh' ou '.jdl',
- Déclarez vos applications, déploiements, entités et relations ou créez et téléchargez le fichier avec [JDL-Studio](https://start.jhipster.tech/jdl-studio/) ou [JHipster IDE](https://www.jhipster.tech/jhipster-ide/),
- Si vous ne créez que des entités, exécutez `jhipster jdl my_file.jdl` dans le dossier racine de votre application JHipster.
- Si vous créez des applications, exécutez `jhipster jdl my_file.jdl` dans un dossier.

et _Voilà_, c'est terminé !

Si vous travaillez en équipe, vous préférerez peut-être avoir plusieurs fichiers au lieu d'un seul.
Nous avons ajouté cette option pour que vous n'ayez pas à concaténer manuellement tous les fichiers en un seul. Il suffit d'exécuter :

    jhipster jdl my_file1.jdl my_file2.jdl

Si vous ne souhaitez pas régénérer vos entités lors de l'importation d'un JDL, vous pouvez utiliser l'option `--json-only` pour ignorer la création des entités et créer uniquement les fichiers json dans le dossier `.jhipster`.

    jhipster jdl ./my-jdl-file.jdl --json-only

Par défaut, `jdl` régénère uniquement les entités qui ont changé. Si vous souhaitez que toutes vos entités soient régénérées,
utilisez l'option `--force`.
Veuillez noter que cela écrasera toutes vos modifications locales aux fichiers d'entité :

    jhipster jdl ./my-jdl-file.jdl --force

Si vous souhaitez l'utiliser dans votre projet, vous pouvez l'ajouter en faisant :

- NPM : `npm install jhipster-core --save`

pour l'installer localement et l'enregistrer dans votre fichier `package.json`.

---


### Utiliser un JDL inline

L'autre façon de générer du contenu est de passer un code JDL dans votre CLI, de cette manière :
`jhipster jdl --inline "application { config { baseName jhipster, applicationType microservice } }"`.

Cette méthode de génération de contenu est particulièrement utile pour générer des entités.

---

Pour l'instant, nous allons commencer avec un petit contenu JDL pour connaître les différentes façons de générer du contenu.
L'accent est mis ici sur la génération de code. L'explication de la syntaxe est faite dans d'autres sections.

Voici le contenu de base que nous utiliserons :

```jdl
application {
  config {
    baseName jhipster
    applicationType microservice
  }
}

```

Il s'agit d'une application microservice très basique nommée "jhipster", et nous verrons les différentes façons de générer
une application à partir de cet exemple.

Vous verrez qu'avec ce petit exemple, vous avez réussi à créer une application à partir de zéro.
---

## Utiliser un fichier JDL distant

Vous pouvez également utiliser une URL avec la commande `jdl`.  Il suffit de passer l'URL au lieu du nom du fichier comme ci-dessous :

```
jhipster jdl https://my-site.com/my.jdl


jhipster jdl https://gist.githubusercontent.com/user/id/raw/id/myapp.jdl
```

Vous pouvez également récupérer un fichier JDL distant à partir de notre [répertoire d'exemples JDL ](https://github.com/jhipster/jdl-samples) en spécifiant simplement le nom du fichier, et nous résoudrons automatiquement l'URL :
```
jhipster jdl default.jdl
```

## Générer des applications

Comme nous l'avons vu dans l'exemple précédent, générer des applications est assez simple. Prenons l'exemple précédent
et ajoutons-y plus de choses :

```jdl
application {
  config {
    baseName jhipster
    applicationType microservice
    serverPort 4242
    buildTool gradle
  }
}
```

Décomposons cela:

- `application` est le mot-clé pour dire que vous voulez déclarer une application
- `config` pour dire que vous voulez spécifier la configuration
  - nous verrons plus tard que vous pouvez également déclarer des entités dans les applications
- `baseName`, `applicationType`, etc. sont des mots-clés pour ajuster l'application

C'est ainsi que vous créez une application en utilisant le JDL.
Pour voir toutes les options d'application prises en charge, rendez-vous sur [cette page](/jdl/applications).

---

## Générer des entités

Générer des entités est un peu moins simple.
Vous pouvez également consulter la [page dédiée aux entités](/jdl/entities-fields) pour en savoir plus sur ce que vous pouvez faire avec les entités.

### Générer une entité de base

```jdl
entity A
```

Cette entité n'a pas de champs, ni même de nom de table explicite (bien que JHipster en définisse un pour vous à partir du nom de l'entité).
C'est la façon la plus simple de déclarer une entité.

Notez que cette forme est équivalente à :

```jdl
entity A(a) {}
```

Nous avons ajouté un nom de table et des accolades.
Par défaut, JHipster génère un nom de table basé sur le nom de l'entité spécifiée.

Les accolades sont nécessaires pour déclarer des champs.

### Ajouter des commentaires

Voici comment ajouter un commentaire à une entité :

```jdl
/**
 * Ceci est une entité simple
 */
entity A
```

Si le backend est en Java, cela ajoutera un commentaire Javadoc.

### Entités dans les applications

Pour générer uniquement certaines entités dans une application, le mot-clé entities peut être utilisé :

```jdl
application {
  config {}
  entities A, B
}

application {
  config {}
  entities C
}

entity A
entity B
entity C
```

C'est particulièrement utile dans les architectures de microservices.

---

## Générer des champs

Les champs sont déclarés dans les entités, en spécifiant un corps à une entité :

```jdl
entity MyEntity {
  name String
  closed Boolean
}
```

Il y a plus de types que ces deux-là, consultez-les dans la [page des entités et des champs](/jdl/entities-fields).

### Ajouter des commentaires et des validations

De la même manière que nous avons ajouté des commentaires aux entités, nous pouvons ajouter des commentaires aux champs :

```jdl
entity MyEntity {
  /** My field */
  name String required minlength(2) maxlength(50)
}
```

Les validations dépendent du type de champ et sont également détaillées dans la[page des entités et des champs](/jdl/entities-fields).

---

## Énumérations

Les énumérations sont des types avec des valeurs fixes :

```jdl
enum Type {
  A,
  B(b)
}

entity E {
  name Type
}
```

Remarquez que les valeurs des énumérations sont optionnelles.

Elles n'ont qu'une seule validation: `required`.

Vous pouvez consulter la [page dédiée aux énumérations](/jdl/enums) pour plus de détails sur les énumérations.

---

## Ajouter des relations  

Les relations entre entités sont également disponibles et sont déclarées avec le mot-clé  `relationship`.

```jdl
entity A
entity B

relationship OneToOne {
  A{a} to B{b}
}
```

Voici ce que nous pouvons remarquer:

- `OneToOne` est le type de relation
  - il y a aussi `OneToMany`, `ManyToMany` et `ManyToOne`
- nous déclarons la source et la destination de la relation (de `A` à `B`)
- nous déclarons également les champs injectés dans chaque entité (`a` dans `B`, et `b` dans `A`)
  - cela signifie que la relation est bidirectionnelle

Pour en savoir plus sur les relations, vous pouvez consulter [la page dédiée](/managing_relationships).

### Relations unidirectionnelles ou bidirectionnelles ?

En fonction de la conception de vos modèles, vous pouvez préférer des relations unidirectionnelles plutôt que bidirectionnelles.
Cela se fait en ne spécifiant pas de champ injecté, comme ceci :

```jdl
relationship OneToOne {
  A{a} to B
}
```

Vous pouvez également ne pas les spécifier, et au moins un sera injecté par défaut (la source) :

```jdl
relationship OneToOne {
  A to B
}
```

### Commentaires et validations des relations

Les relations ont également des commentaires et des validations (une seule : `required`):

```jdl
relationship OneToOne {
  A{a} to B{b required}
}
```

Dans cet exemple, nous pouvons voir :

- `required` pour spécifier si un côté de la relation est requis
  - au lieu d'avoir 0..1, cette relation Un à Un exige qu'un côté ne soit pas nul

Pour en savoir plus sur les relations, vous pouvez consulter la [page dédiée aux relations](/jdl/relationships)

---

## Options

De la même manière que vous pouvez appliquer des options aux entités dans le CLI, vous pouvez également le faire dans le JDL :

```jdl
entity A
entity B
entity C

readOnly A
dto * with mapstruct
service * with serviceImpl
paginate A, B with pager
```

Il y a plusieurs choses intéressantes ici :

- `dto`, `paginate` et `service` sont des options binaires car elles nécessitent une liste d'entités et une valeur
  - `with` est utilisé pour spécifier la valeur de l'option
  - notez le `*` qui signifie que l'option doit être appliquée à toutes les entités
- `readOnly` est une option unitaire, ce qui signifie que ces options ne prennent qu'une liste d'entités

Il existe plusieurs façons de déclarer une liste d'entités :

- vous pouvez les énumérer une par une :: `A, B, C`
- vous pouvez les sélectionner toutes: `*` ou `all`
  - ous pouvez avoir des exceptions pour exclure des entités: `service * with serviceImpl except A, B`

### Annotations

Les annotations sont une autre façon de déclarer des options, réécrivons l'exemple précédent :

```jdl
@readOnly
@dto(mapstruct)
@service(serviceImpl)
@paginate(pager)
entity A

@dto(mapstruct)
@service(serviceImpl)
@paginate(pager)
entity B

@dto(mapstruct)
@service(serviceImpl)
entity C
```

Similaires à Java ou Typescript, les annotations sont des "décorateurs", des options pour les entités.

Cet exemple et le précédent sont équivalents car ils peuvent être utilisés pour générer le même code.

Pour en savoir plus sur les options, vous pouvez consulter la [page des options](/jdl/options)

---

## Déploiements

Enfin, les déploiements peuvent également être générés à partir d'un fichier JDL en utilisant le mot-clé `deployment`, compatible avec JHipster
v5.7 et supérieur :

```jdl
deployment {
  deploymentType docker-compose
  appsFolders [foo, bar]
  dockerRepositoryName "yourDockerLoginName"
}
```

_Pour importer un ou plusieurs déploiements, vous n'avez pas besoin d'être dans un dossier d'application JHipster._

Les déploiements sont décrits dans [leur propre page](/jdl/deployments).

Un déploiement JHipster a une configuration avec des valeurs par défaut pour toutes les autres propriétés et en utilisant la syntaxe précédente, vous vous assurez que votre déploiement utilisera les valeurs par défaut (comme si vous n'aviez fait aucun choix spécifique).
Le déploiement résultant aura :

- deploymentType: `docker-compose`
- appsFolders: `foo, bar`
- dockerRepositoryName: `yourDockerLoginName`
- serviceDiscoveryType: `consul`
- gatewayType: `SpringCloudGateway`
- directoryPath: `../`
- etc.

Maintenant, si vous voulez des options personnalisées :

```jdl
deployment {
  deploymentType kubernetes
  appsFolders [store, invoice, notification, product]
  dockerRepositoryName "yourDockerLoginName"
  serviceDiscoveryType no
  istio autoInjection
  kubernetesServiceType Ingress
  kubernetesNamespace jhipster
  ingressDomain "jhipster.192.168.99.100.nip.io"
}
```

TCes options ne sont qu'un échantillon de ce qui est disponible dans le JDL.
La liste complète des options est disponible dans la page de déploiement, [ici](/jdl/deployments).

---

## Constantes

Le JDL supporte les constantes numériques.
Voici un exemple :

```jdl
DEFAULT_MIN_LENGTH = 1
DEFAULT_MAX_LENGTH = 42
DEFAULT_MIN_BYTES = 20
DEFAULT_MAX_BYTES = 40
DEFAULT_MIN = 0
DEFAULT_MAX = 41

entity A {
  name String minlength(DEFAULT_MIN_LENGTH) maxlength(DEFAULT_MAX_LENGTH)
  content TextBlob required
  count Integer min(DEFAULT_MIN) max(DEFAULT_MAX)
}
```

---

## Exporter vers un fichier JDL

Si vous avez déjà des entités dans votre application et souhaitez obtenir un fichier JDL, ne vous inquiétez pas ! Vous n'avez pas à l'écrire à partir de zéro car il existe un sous-générateur qui le fait pour vous.

Exécutez `jhipster export-jdl <FILE_NAME>` dans le dossier racine de votre application et vous aurez toutes vos applications, entités,
relations et options exportées dans un seul fichier JDL.

Note : vous pouvez également ne pas fournir de nom de fichier au sous-générateur, le fichier JDL exporté sera nommé d'après le nom de base de l'application. Par exemple, si votre application s'appelle 'mySuperApp', alors votre fichier JDL sera  `mySuperApp.jdl`.
