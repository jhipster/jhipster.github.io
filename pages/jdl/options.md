---
layout: default
title: JHipster Domain Language - Options
permalink: /jdl/options
sitemap:
    priority: 0.5
    lastmod: 2019-11-02T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster Domain Language (JDL) - Options

## Sommaire

Dans JHipster, vous pouvez spécifier des options pour vos entités telles que la pagination ou les DTO.
Vous pouvez faire de même avec le JDL, soit avec des annotations sur l'entité, soit avec la syntaxe suivante :

```jdl
entity A {
  name String required
}
entity B
entity C

dto A, B with mapstruct

paginate A with infinite-scroll
paginate B with pagination
paginate C with pager  // pager est uniquement disponible dans AngularJS

service A with serviceClass
service C with serviceImpl
```

La liste complète des options disponibles est [ici](#available-options).

1. [Comment faire](#comment-faire)
1. [Syntaxe](#syntaxe)
1. [Les options d'utilisation XYZ](#les-options-dutilisation-xyz)
1. [Exemples](#exemples)
   1. [Exemple de base unaire](#exemple-de-base-unaire)
   1. [Exemple de base binaire](#exemple-de-base-binaire)
   1. [Exemple all, *](#exemple-all--)
   1. [Exemple all, * avec exclusions (unaire)](#exemple-all--avec-exclusions-unaire)
   1. [Exemple all, * avec exclusions (binaire)](#exemple-all--avec-exclusions-binaire)
   1. [Option avec des valeurs personnalisées](#option-avec-des-valeurs-personnalisées)
   1. [Exemple mixte](#exemple-mixte)
1. [À propos des services](#à-propos-des-services)
1. [Options liées aux microservices](#options-liées-aux-microservices)
1. [Annotations personnalisées](#annotations-personnalisées)
1. [Options disponibles](#options-disponibles)
1. [Voir aussi](#voir-aussi)

---

### Comment faire

Il existe deux types d'options :
  - unaires (sans valeur d'option)
  - binaires (avec une valeur)

Il existe trois façons d'appliquer des options aux entités :
  - en utilisant le nom de l'option (`dto`, `readOnly`, etc.), voir exemples
  - en utilisant des annotations
  - en utilisant la forme `utiliser XYZ`

Il n'est pas recommandé de les mélanger car cela réduit la lisibilité.

---

### Syntaxe


Pour la forme régulière :
```
<option name> <option entity list>

ou

<option name> <option entity list> with <option value>

ou

<option name> <option entity list> with <option value> except <option excluded entity list>

ou 

<option name> <option entity list> except <option excluded entity list>

```

  - Pour les options unitaires :
    - le nom de l'option et la liste sont nécessaires
    - les entités exclues sont optionnelles avec le mot-clé `except` (voir ci-dessous pour plus de détails)
  - Pour les options binaires:
    - la liste des entités précède le mot-clé `with` et la valeur de l'option
    - encore une fois, les entités exclues se trouvent à la fin avec le mot-clé `except`

Pour les annotations :
```
@<option name>
entity <entity name>

ou

@<option name>(<option value>)
```

- Tout comme en Java, les annotations peuvent prendre des valeurs entre parenthèses.
- Selon l'option, les valeurs peuvent être facultatives ou non.

---

### Les options d'utilisation XYZ

Avec la forme d'utilisation d'option, vous pouvez spécifier certaines options sur vos entités.
Elle a été créée lors de JHipster Code 2020, et les raisons derrière sa création sont :
  - Résoudre le problème de désactivation des options (il existe plus d'une façon de dire 'non' dans JHipster : `no, false, none`)
  - Proposer un moyen de regrouper les options par entités

```jdl
entité A
entité B
entité C

utiliser serviceClass pour * sauf C
utiliser mapstruct, serviceImpl, infinite-scroll pour A, B
utiliser pagination pour C
```

<table class="table table-striped table-responsive">
  <tr>
    <th>Valeur de l'option Use</th>
    <th>Commentaire</th>
  </tr>
  <tr>
    <td>mapstruct</td>
    <td>Si des DTOs doivent être créés pour vos entités ; si une entité a un DTO mais pas de service, alors 'serviceClass sera utilisé'</td>
  </tr>
  <tr>
    <td>serviceClass</td>
    <td></td>
  </tr>
  <tr>
    <td>serviceImpl</td>
    <td></td>
  </tr>
  <tr>
    <td>pagination</td>
    <td>La pagination est interdite lorsque l'application utilise Cassandra</td>
  </tr>
  <tr>
    <td>infinite-scroll</td>
    <td>La pagination est interdite lorsque l'application utilise Cassandra</td>
  </tr>
  <tr>
    <td>elasticsearch</td>
    <td>Requiert que l'application ait l'option searchEngine activée</td>
  </tr>
  <tr>
    <td>couchbase</td>
    <td>Requiert que l'application ait l'option searchEngine activée</td>
  </tr>
</table>

---

### Exemples

Chaque exemple aura trois formes :
  - la forme régulière
  - la forme basée sur les annotations  
  - la forme `use` (lorsque applicable)

---

#### Exemple de base unitaire

Régulière :
```jdl
entity A

readOnly A
```

Basée sur les annotations :
```jdl
@readOnly
entity A
```

---

#### Exemple de base binaire

Régulière:
```jdl
entity A

dto A with mapstruct
```

Basée sur les annotations :
```jdl
@dto(mapstruct)
entity A
```

Avec le mot-clé `use`:
```jdl
entity A

use mapstruct, serviceImpl, pagination for A
```

---

#### Exemple avec all, *

`all` et `*` sont des alias.

Régulière:
```jdl
entity A
entity B

dto all with mapstruct
```

Basée sur les annotations:
```jdl
@dto(mapstruct)
entity A

@dto(mapstruct)
entity B
```

Avec le mot-clé `use`:
```jdl
entity A
entity B

use mapstruct, serviceImpl, pagination for *
```

---

#### Exemple avec all, * et exclusions (unitaire)

Régulière:
```jdl
entity A
entity B

skipClient * except A
```

Basée sur les annotations :
```jdl
entity A

@skipClient
entity B
```

Avec le mot-clé `use`:
```jdl
entity A
entity B

use mapstruct, serviceImpl, pagination for * except A
```

---

#### Exemple avec all, * et exclusions (binaire)

Régulière:
```jdl
entity A
entity B

dto all with mapstruct except A
```

Basée sur les annotations :
```jdl
entity A

@dto(mapstruct)
entity B
```

Avec le mot-clé `use`:
```jdl
entity A
entity B

use mapstruct, serviceImpl, pagination for all except A
```

---

#### Option avec valeurs personnalisées

```jdl
entity A
entity B

microservice all with mySuperMS
```

---

#### Exemple mixte

Régulière:
```jdl
entity A
entity B
entity C

readOnly B, C
dto * with mapstruct except C
service * with serviceClass except C
search A with elasticsearch
```

Basée sur les annotations :
```jdl
@dto(mapstruct)
@search(elastisearch)
@service(serviceClass)
entity A

@readOnly
@dto(mapstruct)
@service(serviceClass)
entity B

@readOnly
entity C
```

---

### À propos des services

Aucun service spécifié ne créera une classe ressource qui appellera directement l'interface repository. C'est l'option
par défaut et la plus simple, voir A.

`service with serviceClass` (voir B) fera que la ressource appellera la classe de service qui appellera l'interface repository.
`service with serviceImpl` (voir C) créera une interface de service qui sera utilisée par la classe ressource.

L'interface est implémentée par une classe concrète qui appellera l'interface repository.

Utiliser aucun service sauf en cas de certitude est l'option la plus simple et idéale pour le CRUD. Utilisez un service avec une Classe si vous avez beaucoup de logique métier qui utilisera plusieurs repositories, ce qui est idéal pour une classe de service. Les JHipsters ne sont pas fans des Interfaces inutiles mais si vous les aimez, optez pour un service avec impl.

```
  entity A
  entity B
  entity C

  // aucun service pour A
  service B with serviceClass
  service C with serviceImpl

```

### Options liées aux microservices

Depuis JHipster v3, des microservices peuvent être créés. Vous pouvez spécifier certaines options pour générer vos entités dans le JDL :
le nom du microservice et le moteur de recherche.

Voici comment vous pouvez spécifier le nom de votre microservice (le nom de l'application JHipster) 

```
entity A
entity B
entity C
microservice * with mysuperjhipsterapp except C
microservice C with myotherjhipsterapp
search * with elasticsearch except C
```

La première option est utilisée pour indiquer à JHipster que vous souhaitez que votre microservice gère vos entités, tandis que la seconde
spécifie comment et si vous voulez que vos entités soient recherchées.

---

### Annotations personnalisées

Les annotations personnalisées sont possibles dans le JDL, par exemple :

```jdl
@customAnnotation(customValue)
entity A
```

Le principal cas d'utilisation de cela est pour les blueprints : parfois, vous avez besoin d'options personnalisées pour les entités, ou même pour les champs.
Pour les options régulières (`dto`, `pagination`, etc.), ces options seront générées dans le JSON comme dans le CLI.
Cependant, pour les options personnalisées, elles seront générées sous une clé  `options`  dans le JSON exporté.

---

### Options disponibles

_Vous ne trouvez pas ce que vous cherchez ? Consultez les [options d'application](/jdl/applications#available-application-configuration-options)._

#### Options d'entité

Voici les options d'entité supportées dans le JDL :

<table class="table table-striped table-responsive">
  <tr>
    <th>Nom de l'option JDL (entité)</th>
    <th>Type d'option</th>
    <th>Valeur par défaut</th>
    <th>Valeurs possibles</th>
    <th>Commentaire</th>
  </tr>
  <tr>
    <td>skipClient</td>
    <td>unitaire</td>
    <td>false</td>
    <td></td>
    <td>Cela fera que la génération de code client soit ignorée</td>
  </tr>
  <tr>
    <td>skipServer</td>
    <td>unitaire</td>
    <td>false</td>
    <td></td>
    <td>Cela fera que la génération de code serveur soit ignorée</td>
  </tr>
  <tr>
    <td>noFluentMethod</td>
    <td>unitaire</td>
    <td>false</td>
    <td></td>
    <td>
      Voir <a href="https://www.jhipster.tech/2016/08/17/jhipster-release-3.6.0.html#important-change-fluent-setters">cette note</a>
      pour plus d'informations
    </td>
  </tr>
  <tr>
    <td>filter</td>
    <td>unitaire</td>
    <td>false</td>
    <td></td>
    <td>
      Voir <a href="https://www.jhipster.tech/entities-filtering/">filtering</a> pour plus de détails ; si une entité est filtrée
      mais n'a pas de service, alors 'serviceClass' sera utilisé
    </td>
  </tr>
  <tr>
    <td>readOnly</td>
    <td>unitaire</td>
    <td>false</td>
    <td></td>
    <td>
      Ajouter cette option rendra une entité en lecture seule, voir
      <a href="https://www.jhipster.tech/2019/10/10/jhipster-release-6.4.0.html#jhipster-release-v640">cette note de version</a>
      pour plus de détails
     </td>
  </tr>
  <tr>
    <td>dto</td>
    <td>binaire</td>
    <td>no</td>
    <td>mapstruct, no</td>
    <td>Si des DTOs doivent être créés pour vos entités ; si une entité a un DTO mais pas de service, alors 'serviceClass sera utilisé'</td>
  </tr>
  <tr>
    <td>service</td>
    <td>binaire</td>
    <td>no</td>
    <td>serviceClass, serviceImpl, no</td>
    <td></td>
  </tr>
  <tr>
    <td>paginate</td>
    <td>binaire</td>
    <td>no</td>
    <td>pagination, infinite-scroll, no</td>
    <td>La pagination est interdite lorsque l'application utilise Cassandra</td>
  </tr>
  <tr>
    <td>search</td>
    <td>binaire</td>
    <td>no</td>
    <td>elasticsearch, no</td>
    <td>Requiert que l'application ait l'option searchEngine activée</td>
  </tr>
  <tr>
    <td>microservice</td>
    <td>binaire</td>
    <td></td>
    <td>valeur personnalisée</td>
    <td>Sera automatiquement ajouté pour chaque entité déclarée dans une application microservice</td>
  </tr>
  <tr>
    <td>angularSuffix</td>
    <td>binaire</td>
    <td></td>
    <td>valeur personnalisée</td>
    <td></td>
  </tr>
  <tr>
    <td>clientRootFolder</td>
    <td>binaire</td>
    <td></td>
    <td>valeur personnalisée</td>
    <td></td>
  </tr>
</table>
Options de champ

Voici les options de champ supportées dans le JDL :
<table class="table table-striped table-responsive">
  <tr>
    <th>Nom de l'option JDL (champ)</th>
    <th>Valeur par défaut</th>
    <th>Valeurs possibles</th>
    <th>Commentaire</th>
  </tr>
  <tr>
    <td>defaultValue</td>
    <td>indéfini</td>
    <td>toute valeur correspondant au type de données du champ, par exemple "myDefaultValue" ou 42 ou true</td>
    <td>Définira une valeur par défaut fixe au niveau du schéma de la base de données sur la colonne, et ajustera les clients en passant l'option par défaut à partir des formulaires de saisie (uniquement Angular pour l'instant)</td>
  </tr>
  <tr>
    <td>defaultValueComputed</td>
    <td>indéfini</td>
    <td>fonctions de base de données pour générer des valeurs par défaut pour une colonne, par exemple "NOW(6)"</td>
    <td>Cela générera une valeur par défaut au niveau de la base de données en utilisant la fonction donnée</td>
  </tr>
</table>
---

### Voir aussi

Les options d'application sont disponibles [ici](/jdl/applications)
