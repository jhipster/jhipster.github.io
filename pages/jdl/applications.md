---
layout: default
title: Langage de Domaine JHipster - Applications
permalink: /jdl/applications
sitemap:
    priority: 0.5
    lastmod: 2019-10-27T12:00:00-00:00
---

# <i class="fa fa-star"></i> Langage de Domaine JHipster (JDL) - Applications

## Sommaire

1. [Syntaxe](#syntaxe)
1. [Options dans les applications](#options-dans-les-applications)
1. [Exemples](#exemples)
   1. [Exemple Basique](#exemple-basique)
   1. [Plus d'une application](#plus-dune-application)
   1. [Avec des entités](#avec-des-entités)
   1. [Avec des options](#avec-des-options)
1. [Flux de travail des microservices](#flux-de-travail-des-microservices)
1. [Détails des exemples complets](#détails-des-exemples-complets)
1. [Options de configuration d'application disponibles](#options-de-configuration-dapplication-disponibles)
1. [Voir aussi](#voir-aussi)

***

### Syntaxe

La déclaration de l'application se fait comme suit :

```
application {
config {
<nom d'option de l'application> <valeur d'option de l'application>
}
[entities <liste d'entités de l'application>]
[<options>]
}
```

  - Les clés/valeurs de configuration d'application sont spécifiées sous `config` (qui doit être à l'intérieur de `application`)
  - Il peut y avoir 0, 1 ou plusieurs options d'application comme vous le souhaitez (à condition qu'elles soient valides)
  - Les entités qui seront générées à l'intérieur de l'application sont listées via `entities`, c'est la manière recommandée de générer des entités dans les applications.
    - Cela peut être omis mais générer des entités à l'intérieur de l'application nécessiterait de le faire :
      - à partir d'un autre fichier JDL à l'intérieur de l'application
      - ou avec l'interface de ligne de commande (CLI)
  - Le mot-clé `entities` est facultatif : vous pouvez l'omettre, mais chaque entité dans le fichier JDL sera générée à l'intérieur de l'application
  - Les applications peuvent avoir des options régulières (comme `dto` ou `service`), plus d'informations dans la [section suivante](#options-dans-les-applications).

---
### Options dans les applications

Les options de déclarations (`dto`, `service`, `skipServer`, etc.) sont prises en charge dans les applications JDL, mais avec certaines règles.

Supposons que nous avons ce fichier JDL :
```jdl
application {
  config {
    baseName app1
  }
  entities A, B, C
  dto * with mapstruct
}

application {
  config {
    baseName app2
  }
  entities C, D
  paginate * with pagination except D 
}

application {
  config {
    baseName app3
  }
  entities * except A, B, C, D, F
  service * with serviceClass
}

entity A
entity B
entity C
entity D
entity E
entity F

paginate * with infinite-scroll
```

Dans cet exemple, plusieurs éléments sont à noter :

- Il y a 6 entités déclarées dans le fichier JDL : `A, B, C, D, E et F`.
- Nous avons 3 applications : `app1, app2 et app3`
  - `app1` utilise `A, B et C`
  - `app2` utilise `C et D`
  - `app3` utilise `E` (`* sauf A, B, C, D, F`)
- Chacune de ces applications déclare des options, ainsi qu'une option **globale**.
  - `app1` utilise `dto` pour `A, B et C`
  - `app2` utilise `paginate` pour `C` (en raison d'une exception)
  - `app3` utilise `service` pour `E`
  - L'option globale utilise également `pagination` (pour chaque entité)

Voici comment les fichiers sont générés :

- `app1`
  - `A`: utilisera `paginate avec défilement infini` (l'option globale n'est pas écrasée par une option locale) et `dto avec mapstruct`
  - `B`: utilisera les mêmes options
  - `C`: utilisera également les mêmes options
- `app2`:
  - `C`: utilisera `paginate avec pagination` (et non `défilement infini`, car l'option locale prend le dessus)
  - `D`: utilisera `paginate avec défilement infini`, car l'option précédente n'inclut pas `D`
- `app3`:
  - `E`: utilisera `paginate avec défilement infini` et `service E avec serviceClass`

Cet exemple illustre le principe de **l'ombre**. Les options globales sont prises en charge et seront utilisées par chaque application déclarée **sauf si** des options sont également déclarées dans les applications.

Notez également cet extrait provenant de l'exemple précédent dans `app3` :
```jdl
entities * except A, B, C, D, F
service * with serviceClass
```

Cela signifie essentiellement que app3 utilisera uniquement E et que les entités de l'application utiliseront l'option service, c'est-à-dire E et non A à F.

Enfin, il y a l'entité F qui n'est dans aucune application et cette entité ne sera pas générée à cause de cela.

_Remarque : toutes les options régulières sont prises en charge pour le moment._

---

### Exemples

#### Exemple Basique

```jdl
application {
  config {
    baseName exampleApp
    applicationType gateway
  }
}
```

---

#### Plus d'une application

```jdl
application {
  config {
    baseName exampleApp1
    applicationType microservice
    serverPort 9001
  }
}

application {
  config {
    baseName exampleApp2
    applicationType microservice
    serverPort 9002
  }
}

application {
  config {
    baseName exampleApp3
    applicationType gateway
    serverPort 9000
  }
}
```

---

#### Avec des entités

```jdl
application {
  config {
    baseName exampleApp1
    applicationType microservice
    serverPort 9001
  }
  entities A
}

application {
  config {
    baseName exampleApp2
    applicationType microservice
    serverPort 9002
  }
  entities * except A
}

entity A
entity B
entity C
```

---

#### Avec des options

```jdl
application {
  config {
    baseName exampleApp1
    applicationType microservice
    serverPort 9001
  }
  entities A
  dto A with mapstruct 
}

application {
  config {
    baseName exampleApp2
    applicationType microservice
    serverPort 9002
  }
  entities * except A
  paginate C with pagination
}

entity A
entity B
entity C
```

---

### Détails des exemples complets

Exemple 1:

```jdl
application {
  config {
    baseName myMonolith
    applicationType monolith
  }
  entities * except C, D
}
application {
  config {
    baseName myGateway
    applicationType gateway
    serverPort 9042
  }
  entities * except A, B
}
application {
  config {
    baseName microserviceA
    applicationType microservice
  }
  entities C
}
application {
  config {
    baseName microserviceB
    applicationType microservice
    serverPort 8082
  }
  entities D
}
entity A
entity B
entity C
entity D
dto * with mapstruct
service * with serviceClass
paginate D with pagination
```

Maintenant, plusieurs choses se produiront lors de la génération de ces applications et dossiers :
  - Quatre applications seront créées :
    - myMonolith dans `./myMonolith`, avec pour port  `8080`
    - myGateway dans `./myGateway`, avec pour port  `9042`
    - microserviceA dans `./microserviceA`, avec pour port  `8081`
      - Même si nous n'avons pas spécifié de port de serveur, JHipster en définit un par défaut.
      - Pour les microservices, le port par défaut est `8081`
      - Pour les passerelles et les monolithes, c'est `8080`
    - microserviceB dans `./microserviceB`, avec pour port  `8082`
  - Quatre entités seront générées :
    - `A` et `B` dans le monolithe
    - `C` et `D` à la fois dans la passerelle
      - `C` dans le premier microservice
      - `D` dans le deuxième microservice
  - L'option `microservice` est implicite pour `C` et `D`
    - Étant donné qu'elles sont générées sur les deux microservices, cette option sera définie par défaut.
  - Les options fonctionnent de la même manière qu'auparavant

Notez que le générateur définit des valeurs par défaut s'ils ne sont pas présentes (comme le `databaseType`).
JHipster Core effectue exactement les mêmes actions pour vous.


---

Exemple 2: Avec des options
Voir la [section des options](#options-dans-les-applications).

---

### Flux de travail des microservices

La gestion des microservices est un peu délicate, mais le JDL vous offre quelques options pour gérer vos entités comme vous le souhaitez.
Avec l'option `microservice <ENTITIES> with <NOM_APPLICATION_MICROSERVICE>` vous pouvez spécifier quelles entités seront générées dans quel microservice.

Prenons cet exemple de configuration :
```
entity A
entity B
entity C
microservice A with firstMS
microservice B with secondMS
```

Étant donné deux applications JHipster ('firstMS' and 'secondMS'), voici ce que vous obtiendrez si vous importez le fichier JDL
dans les deux applications :

  - Dans 'firstMS', les entités `A` et `C` seront générées.
  - Dans 'secondMS', les entités `B` et `C` seront générées.

`C` est généré dans les deux cas car s'il n'y a pas d'option de microservice spécifiant où cette entité doit être générée, elle
sera générée partout.

Si vous décidez d'importer ce JDL dans une application monolithique, chaque entité sera générée (les monolithes n'ont pas de restrictions d'options dans le JDL).

_Remarque : si vous voulez que le même entité soit générée dans deux microservices différents, vous pouvez écrire deux fichiers JDL
au lieu de mettre à jour le fichier JDL. À chaque fois._

L'exemple précédent n'aurait pas pu être écrit comme ceci :
```
entity A
entity B
entity C
microservice * except B with firstMS
microservice * except A with secondMS
```

Voici le résultat :
  - Dans 'firstMS', seule l'entité `C` sera générée.
  - Dans 'secondMS', les entités `B` et `C` seront générées.

Cela est dû au fait qu'au moment de l'analyse, si une option entre en conflit avec une autre, cette dernière prend le dessus.
Vous pouvez également créer une pile complète de microservices en utilisant JDL, [consultez cet article de blog](https://medium.com/@deepu105/create-full-microservice-stack-using-jhipster-domain-language-under-30-minutes-ecc6e7fc3f77) par exemple

---

### Options de configuration d'application disponibles

Voici les options d'application prises en charge dans le JDL :

_Pas ce que vous recherchez ? Consultez les [options régulières](/jdl/options#options-disponible)._

<table class="table table-striped table-responsive">
  <tr>
      <th>Nom de l'option JDL</th>
      <th>Valeur par défaut</th>
      <th>Valeurs possibles</th>
      <th>Commentaire</th>
  </tr>

  <tr>
    <td>applicationType</td>
    <td>monolith</td>
    <td>monolith, microservice, gateway</td>
    <td></td>
  </tr>
  <tr>
    <td>authenticationType</td>
    <td>jwt</td>
    <td>jwt, session, oauth2</td>
    <td>jwt</td>
  </tr>
  <tr>
    <td>baseName</td>
    <td>jhipster</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td><s>blueprint</s></td>
    <td>DEPRECATED</td>
    <td><s>Name of an additional blueprint</s></td>
    <td>See <a href="#blueprints">blueprints</a></td>
  </tr>
  <tr>
      <td id="blueprints">blueprints</td>
      <td>[]</td>
      <td>Noms des blueprints supplémentaires. Voir <a href="https://www.jhipster.tech/modules/marketplace/#/list">Marketplace</a>, y compris les blueprints personnalisés publiés en interne.</td>
      <td>Tableau des blueprints à utiliser, par exemple, <code>[blueprint1, blueprint2]</code></td>
  </tr>
  <tr>
    <td>buildTool</td>
    <td>maven</td>
    <td>maven, gradle</td>
    <td></td>
  </tr>
  <tr>
    <td>cacheProvider</td>
    <td>ehcache or hazelcast</td>
    <td>caffeine, ehcache, hazelcast, infinispan, memcached, redis, no</td>
    <td>ehcache pour les monoliths et les gateways, hazelcast pour les microservices</td>
  </tr>
  <tr>
    <td>clientFramework</td>
    <td>angularX</td>
    <td>angularX, angular, react, vue, svelte, no</td>
    <td></td>
  </tr>
  <tr>
    <td>clientPackageManager</td>
    <td>npm</td>
    <td>npm</td>
    <td></td>
  </tr>
  <tr>
      <td>clientTheme</td>
      <td>none</td>
      <td>Quelque chose ou none</td>
      <td>Vous pouvez mettre n'importe quelle valeur que vous voulez, à condition de savoir qu'elle fonctionnera (comme yeti).</td>
  </tr>
  <tr>
      <td>clientThemeVariant</td>
      <td></td>
      <td>Quelque chose ou primary</td>
      <td>Vous pouvez mettre n'importe quelle valeur que vous voulez, à condition de savoir qu'elle fonctionnera (comme dark, ou light), peut également être vide</td>
  </tr>

  <tr>
    <td>databaseType</td>
    <td>sql</td>
    <td>sql, mongodb, cassandra, couchbase, no</td>
    <td></td>
  </tr>
  <tr>
    <td>devDatabaseType</td>
    <td>h2Disk</td>
    <td>h2Disk, h2Memory, *</td>
    <td>* + Valeur par défaut + type de base de données de production</td>
  </tr>
  <tr>
    <td>dtoSuffix</td>
    <td>DTO</td>
    <td></td>
    <td>Suffixe pour les DTO. Faux pour une chaîne vide.</td>
  </tr>
  <tr>
    <td>enableHibernateCache</td>
    <td>true</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>enableSwaggerCodegen</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>enableTranslation</td>
    <td>true</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>entitySuffix</td>
    <td></td>
    <td></td>
    <td>Suffixe pour les entites. Faux pour une chaîne vide.</td>
  </tr>
  <tr>
    <td>jhiPrefix</td>
    <td>jhi</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>languages</td>
    <td>[en, fr]</td>
    <td>Languages available in JHipster</td>
    <td>Les crochets sont obligatoires</td>
  </tr>
  <tr>
    <td>messageBroker</td>
    <td>no</td>
    <td>kafka, pulsar, no</td>
    <td></td>
  </tr>
  <tr>
    <td>nativeLanguage</td>
    <td>en</td>
    <td>Toutes les langues prises en charge par JHipster</td>
    <td></td>
  </tr>
  <tr>
    <td>packageName</td>
    <td>com.mycompany.myapp</td>
    <td></td>
    <td>Définit l'option packageFolder</td>
  </tr>
  <tr>
    <td>prodDatabaseType</td>
    <td>mysql</td>
    <td>mysql, mariadb, mssql, postgresql, oracle, no</td>
    <td></td>
  </tr>
  <tr>
    <td>reactive</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>searchEngine</td>
    <td>no</td>
    <td>elasticsearch, couchbase, no</td>
    <td></td>
  </tr>
  <tr>
    <td>serverPort</td>
    <td>8080, 8081 or 9999</td>
    <td></td>
    <td>Dépend du type d'application</td>
  </tr>
  <tr>
    <td>serviceDiscoveryType</td>
    <td>no</td>
    <td>consul, eureka, no</td>
    <td></td>
  </tr>
  <tr>
    <td>skipClient</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>skipServer</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>skipUserManagement</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>testFrameworks</td>
    <td>[]</td>
    <td>cypress, protractor, cucumber, gatling</td>
    <td>Les crochets sont obligatoires</td>
  </tr>
  <tr>
    <td>websocket</td>
    <td>no</td>
    <td>spring-websocket, no</td>
    <td></td>
  </tr>
</table>

---

### Voir aussi

Les options régulières sont disponibles [ici](/jdl/options)
