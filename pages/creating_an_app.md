---
layout: default
title: Créer une application
permalink: /creating-an-app/
redirect_from:
  - /creating_an_app.html
sitemap:
    priority: 0.7
    lastmod: 2018-03-18T18:20:00-00:00
---

# <i class="fa fa-rocket"></i> Créer une application

_**Veuillez consulter notre [tutoriel vidéo]({{ site.url }}/video-tutorial/) sur la création d'une nouvelle application JHipster !**_

1. [Démarrage rapide](#1)
2. [Questions posées lors de la génération d'une application](#2)
3. [Utilisation d'un blueprint](#5)
4. [Options en ligne de commande](#3)
5. [Astuces](#4)

<h2 id="1">Démarrage rapide</h2>

Tout d'abord, créez un répertoire vide dans lequel vous créerez votre application :

`mkdir monapplication`

Allez dans ce répertoire :

`cd monapplication/`

Pour générer votre application, tapez :

`jhipster`

Répondez aux questions posées par le générateur pour créer une application adaptée à vos besoins. Ces options sont décrites dans [la section suivante](#2).

Une fois l'application générée, vous pouvez la lancer en utilisant Maven (`./mvnw` sur Linux/MacOS/Windows PowerShell, `mvnw` sur Windows Cmd) ou Gradle (`./gradlew` sur Linux/MacOS/Windows PowerShell, `gradlew` sur Windows Cmd).

**Remarque** si vous utilisez Maven et que vous avez modifié des fichiers front-end après le premier lancement de la commande `./mvnw`, vous devez exécuter `./mvnw -Pwebapp` pour voir la dernière version front-end (Gradle détecte automatiquement les modifications front-end et recompile le front-end si nécessaire).

L'application sera disponible sur [http://localhost:8080](http://localhost:8080)

**Important** si vous souhaitez avoir un "rechargement à chaud" de votre code JavaScript/TypeScript, vous devrez exécuter `npm start`. Vous pouvez consulter la page [Utilisation de JHipster en développement]({{ site.url }}/development/) pour plus d'informations.

Si vous utilisez le "rechargement à chaud", vous pouvez accélérer le démarrage du serveur en excluant les tâches côté client avec `./mvnw -P-webapp` ou `./gradlew -x webapp`. Cela accélère surtout Gradle.

<h2 id="2">Questions posées lors de la génération d'une application</h2>

_Certaines questions changent en fonction des choix précédents. Par exemple, vous n'aurez pas besoin de configurer un cache Hibernate si vous n'avez pas sélectionné une base de données SQL._

### Quel _type_ d'application souhaitez-vous créer ?

Le type de votre application dépend de si vous souhaitez utiliser une architecture microservices ou non. Une explication complète sur les microservices est [disponible ici]({{ site.url }}/microservices-architecture/), si vous n'êtes pas sûr, utilisez l'option par défaut "Application monolithique".

Vous pouvez choisir :

*   Application monolithique : c'est une application classique, tout-en-un. Elle est plus facile à utiliser et à développer, et c'est notre recommandation par défaut.
*   Application microservice : dans une architecture microservices, c'est l'un des services.
*   Passerelle microservice : dans une architecture microservices, c'est un serveur de bord qui route et sécurise les requêtes.

### Quel est le nom de base de votre application ?

C'est le nom de votre application.

### Quel est votre package Java par défaut ?

Votre application Java utilisera ceci comme package racine. Cette valeur est stockée par Yeoman de sorte que la prochaine fois que vous exécuterez le générateur, la dernière valeur deviendra la valeur par défaut. 
Vous pouvez la remplacer en fournissant une nouvelle valeur.

### Quel _type_ d'authentification souhaitez-vous utiliser ?

Voici toutes les options possibles :

*   Authentification JWT : utilisez un [JSON Web Token (JWT)](https://jwt.io/), qui est le choix par défaut et ce que la plupart des gens utilisent.
*   Authentification OAuth 2.0 / OIDC : utilise un serveur OpenID Connect, comme [Keycloak](https://www.keycloak.org/), [Auth0](https://developer.auth0.com), ou [Okta](https://developer.okta.com), qui gère l'authentification en dehors de l'application. C'est plus sécurisé que JWT, mais cela nécessite de configurer un serveur OpenID Connect, donc c'est un peu plus complexe. Veuillez noter que par défaut JHipster synchronisera les données utilisateur du serveur OpenID Connect, et pour cela, il aura besoin d'une base de données.
*   Authentification par session HTTP : le mécanisme classique d'authentification basé sur la session, qui est ce que les gens font habituellement avec [Spring Security](http://docs.spring.io/spring-security/site/index.html).

Vous pouvez trouver plus d'informations sur notre page [sécuriser votre application]({{ site.url }}/security/).

### Quel _type_ de base de données souhaitez-vous utiliser ?

Vous pouvez choisir entre :

- Une base de données SQL (H2, MySQL, MariaDB, PostgreSQL, MSSQL, Oracle), que vous accéderez avec Spring Data JPA
- [MongoDB]({{ site.url }}/using-mongodb/)
- [Cassandra]({{ site.url }}/using-cassandra/)
- [Couchbase]({{ site.url }}/using-couchbase/)
- [Neo4j]({{ site.url }}/using-neo4j/)
- Pas de base de données (disponible uniquement lors de l'utilisation d'une [application microservice]({{ site.url }}/microservices-architecture/) avec authentification JWT)

### Quelle base de données _de production_ souhaitez-vous utiliser ?

C'est la base de données que vous utiliserez avec votre profil "production". Pour la configurer, veuillez modifier votre fichier `src/main/resources/config/application-prod.yml`.

Si vous souhaitez utiliser Oracle, vous devrez peut-être être au courant des limitations actuelles lors de l'[utilisation de la base de données Oracle]({{ site.url }}/using-oracle/).

### Quelle base de données _de développement_ souhaitez-vous utiliser ?

C'est la base de données que vous utiliserez avec votre profil "développement". Vous pouvez soit utiliser :

*   H2, fonctionnant en mémoire. C'est le moyen le plus simple d'utiliser JHipster, mais vos données seront perdues lorsque vous redémarrerez votre serveur.
*   H2, avec ses données stockées sur disque. C'est une meilleure option que de fonctionner en mémoire, car vous ne perdrez pas vos données lors du redémarrage de l'application.
*   La même base de données que celle que vous avez choisie pour la production : c'est un peu plus complexe à configurer, mais il devrait être mieux à la fin de travailler sur la même base de données que celle que vous utiliserez en production. C'est également le meilleur moyen d'utiliser liquibase-hibernate comme décrit dans [le guide de développement]({{ site.url }}/development/).

Pour la configurer, veuillez modifier votre fichier `src/main/resources/config/application-dev.yml`.

### Souhaitez-vous utiliser l'abstraction de cache Spring ?

L'abstraction de cache Spring permet d'utiliser différentes implémentations de cache : vous pouvez utiliser [ehcache](http://ehcache.org/) (cache local), [Caffeine](https://github.com/ben-manes/caffeine) (cache local), [Hazelcast](http://www.hazelcast.com/) (cache distribué), [Infinispan](http://infinispan.org/) (cache distribué), [Memcached](https://memcached.org/) (un autre cache distribué) ou [Redis](https://redis.io/) (configuré en tant que cache serveur unique). Cela peut avoir un impact très positif sur les performances de votre application, et c'est donc une option recommandée.

### Souhaitez-vous utiliser le cache de deuxième niveau de Hibernate ?

Cette option ne sera disponible que si vous avez sélectionné d'utiliser une base de données SQL (car JHipster utilisera Spring Data JPA pour y accéder) et sélectionné un fournisseur de cache à la question précédente.

[Hibernate](http://hibernate.org/) est le fournisseur JPA utilisé par JHipster, et il peut utiliser un fournisseur de cache pour améliorer considérablement ses performances. Par conséquent, nous vous recommandons vivement d'utiliser cette option et de régler votre implémentation de cache en fonction des besoins de votre application.

### Souhaitez-vous utiliser Maven ou Gradle ?

Vous pouvez construire votre application Java générée soit avec [Maven](http://maven.apache.org/) soit avec [Gradle](http://www.gradle.org/). Maven est plus stable et plus mature. Gradle est plus flexible, plus facile à étendre, et plus moderne.

### Quelles autres technologies souhaitez-vous utiliser ?

C'est une réponse à choix multiples, pour ajouter une ou plusieurs autres technologies à l'application. Les technologies disponibles sont :

#### Développement API d'abord en utilisant swagger-codegen

Cette option vous permet de faire du [développement API-first]({{ site.url }}/doing-api-first-development) pour votre application en intégrant le [Swagger-Codegen](https://github.com/swagger-api/swagger-codegen) dans la construction.


#### Moteur de recherche utilisant Elasticsearch

[Elasticsearch](https://github.com/elastic/elasticsearch) sera configuré en utilisant Spring Data Elasticsearch. Vous pouvez trouver plus d'informations sur notre [guide Elasticsearch]({{ site.url }}/using-elasticsearch/).

#### Sessions HTTP en cluster utilisant Hazelcast

Par défaut, JHipster utilise une session HTTP uniquement pour stocker les informations d'authentification et d'autorisation de [Spring Security](http://docs.spring.io/spring-security/site/index.html). Vous pouvez choisir de mettre plus de données dans vos sessions HTTP.
L'utilisation de sessions HTTP posera des problèmes si vous exécutez dans un cluster, surtout si vous n'utilisez pas de répartiteur de charge avec des "sessions persistantes".
Si vous souhaitez répliquer vos sessions à l'intérieur de votre cluster, choisissez cette option pour avoir [Hazelcast](http://www.hazelcast.com/) configuré.

#### WebSockets utilisant Spring Websocket

Les Websockets peuvent être activés en utilisant Spring Websocket. Nous fournissons également un exemple complet pour vous montrer comment utiliser efficacement le framework.

#### Messages asynchrones en utilisant Apache Kafka

Utilisez [Apache Kafka]({{ site.url }}/using-kafka/) comme courtier de messagerie publish/subscribe.

#### Messages asynchrones en utilisant Apache Pulsar

Utilisez [Apache Pulsar]({{ site.url }}/using-pulsar/) comme courtier de messagerie publish/subscribe.

### Quel _Framework_ souhaitez-vous utiliser pour le client ?

Le framework côté client à utiliser.

Vous pouvez choisir entre :

*   Angular
*   React
*   Vue

### Souhaitez-vous utiliser un thème Bootswatch ?

Le thème client à utiliser.

Vous pouvez utiliser n'importe quel thème de [Bootswatch](https://bootswatch.com/) ou conserver celui par défaut.

### Souhaitez-vous utiliser le préprocesseur de feuilles de style Sass pour votre CSS ?

[Sass](https://sass-lang.com/) est une excellente solution pour simplifier la conception CSS. Pour être utilisé efficacement, vous devrez exécuter un serveur de développement [Webpack](https://webpack.js.org), qui sera configuré automatiquement.

### Souhaitez-vous activer le support de l'internationalisation ?

Par défaut, JHipster offre un excellent support de l'internationalisation, à la fois côté client et côté serveur. Cependant, l'internationalisation ajoute un léger surcoût et est un peu plus complexe à gérer, vous pouvez donc choisir de ne pas installer cette fonctionnalité.

Veuillez noter que JHipster couvre uniquement l'internationalisation de l'interface utilisateur. Pour l'internationalisation des données, vous devrez la coder vous-même dans la couche JPA/Hibernate.

### Quels frameworks de tests souhaitez-vous utiliser ?

Par défaut, JHipster fournit des tests unitaires/intégration Java (en utilisant le support JUnit de Spring) et des tests unitaires JavaScript (en utilisant Jest). En option, vous pouvez également ajouter le support pour :

*   Tests de performances en utilisant Gatling
*   Tests de comportement en utilisant Cucumber
*   Tests d'intégration Angular avec Protractor

Vous pouvez trouver plus d'informations dans notre [guide "Exécution des tests"]({{ site.url }}/running-tests/).

### Souhaitez-vous utiliser des changelogs Liquibase incrémentiels ?

JHipster crée en option des changelogs incrémentiels pour vous, vous n'avez donc pas besoin de recréer la base de données ou de générer manuellement un diff Liquibase.

Exécutez JHipster en utilisant l'option `--incremental-changelog` à tout moment pour l'activer.

Lors de l'exécution de JHipster, les entités contiennent deux états :

*   L'ancien état qui est déjà enregistré sur le disque
*   Le nouvel état, qui est en mémoire (généré à partir de jdl ou de prompts)

Un diff est généré entre eux et des changelogs sont créés.

Fonctionnalités prises en charge :

*   Créer/supprimer des champs
*   Créer/supprimer des relations
*   JDL et invites

Ne prend pas en charge les modifications d'attributs comme le type et les contraintes.

Conflits avec :

*   L'option `--fork`, car elle enregistre sur le disque en écrasant l'ancien état.


### Souhaitez-vous installer d'autres générateurs depuis le JHipster Marketplace?

Le [JHipster Marketplace]({{ site.url }}/modules/marketplace/) est l'endroit où vous pouvez installer des modules supplémentaires, écrits par des développeurs tiers, pour ajouter des fonctionnalités non officielles à votre projet.

<h2 id="5">Utilisation d'un modèle</h2>

JHipster 5 introduit le concept d'un modèle. Les modèles sont des modules JHipster qui peuvent fournir des modèles personnalisés côté client/serveur qui remplaceront ceux de JHipster. Par exemple, le [modèle Kotlin](https://github.com/jhipster/jhipster-kotlin) remplace la plupart du code côté serveur Java par du Kotlin.

Par exemple, pour utiliser le modèle Kotlin, passez le nom du modèle comme ci-dessous lors de la génération d'une application.

```bash
jhipster --blueprint kotlin
```


Le nom du modèle est enregistré dans le fichier `.yo-rc.json` et sera automatiquement utilisé lors de l'exécution des sous-générateurs comme `entity`, `spring-controller` et `spring-service`.

Si un modèle n'implémente pas un sous-générateur spécifique, il sera ignoré et les modèles JHipster pour le même sous-générateur seront utilisés.

**Remarque :** Une application ne peut utiliser qu'un seul modèle, les modèles multiples ne sont pas encore pris en charge.

<h2 id="3">Options en ligne de commande</h2>

Vous pouvez également exécuter JHipster avec certaines options en ligne de commande facultatives. La référence pour ces options peut être trouvée en tapant `jhipster app --help`.

Voici les options que vous pouvez passer :

* `--help` - Affiche les options et l'utilisation du générateur
* `--blueprint` - Spécifie un modèle à utiliser. Par exemple `jhipster --blueprint kotlin`
* `--skip-cache` - Ne pas se souvenir des réponses aux invites (Par défaut : false)
* `--skip-git` - Ne pas ajouter le projet généré à Git automatiquement (Par défaut : false)
* `--skip-install` - Ne pas installer automatiquement les dépendances (Par défaut : false)
* `--skip-client` - Ignorer la génération de l'application côté client, vous n'aurez donc que le code back-end Spring Boot généré (Par défaut : false).
* `--skip-server` - Ignorer la génération de l'application côté serveur, vous n'aurez donc que le code front-end généré (Par défaut : false).
* `--skip-user-management` - Ignorer la génération de la gestion des utilisateurs, à la fois côté back-end et côté front-end (Par défaut : false)
* `--i18n` - Activer ou désactiver l'internationalisation lors de l'ignorance de la génération côté client, sans effet autrement (Par défaut : true)
* `--auth` - Spécifier le type d'authentification lors de l'ignorance de la génération côté serveur, sans effet autrement mais obligatoire lors de l'utilisation de `skip-server`
* `--db` - Spécifier la base de données lors de l'ignorance de la génération côté serveur, sans effet autrement mais obligatoire lors de l'utilisation de `skip-server`
* `--skip-checks` - Ignorer la vérification des outils requis (Par défaut : false)
* `--jhi-prefix` - Ajouter un préfixe avant les services, composants et noms d'état/route (Par défaut : jhi)
* `--entity-suffix` - Ajouter un suffixe après les noms de classe des entités (Par défaut : chaîne vide)
* `--dto-suffix` - Ajouter un suffixe après les noms de classe des DTO (Par défaut : DTO)
* `--prettier-java` - Utiliser [prettier-java](https://github.com/jhipster/prettier-java) pour le formatage de toutes les classes Java (Par défaut : false)
* `--experimental` - Activer les fonctionnalités expérimentales. Veuillez noter que ces fonctionnalités peuvent être instables et peuvent subir des changements majeurs à tout moment
* `--skip-fake-data` - Ignorer la génération de données factices pour le développement
* `--creation-timestamp` - Définir un horodatage pour une construction reproductible. L'horodatage doit être une date JavaScript analysable, par exemple 2019-01-01. Doit être utilisé avec --with-entities ou import-jdl (generator-jhipster > 6.5.1)

<h2 id="4">Conseils</h2>

Vous pouvez également utiliser les options en ligne de commande Yeoman, comme `--force` pour écraser automatiquement les fichiers existants. Donc, si vous voulez régénérer toute votre application, y compris ses entités, vous pouvez exécuter `jhipster --force`.