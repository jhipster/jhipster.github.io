---
layout: default
title: Déploiement sur Heroku
permalink: /heroku/
redirect_from:
  - /heroku.html
sitemap:
    priority: 0.7
    lastmod: 2023-12-19T00:00:00-00:00
---


# Déploiement sur Heroku

Ce sous-générateur permet le déploiement de votre application JHipster sur le [cloud Heroku](https://www.heroku.com/).

[![]({{ site.url }}/images/logo/logo-heroku.png)](https://www.heroku.com/)


## Exécution du sous-générateur

Avant d'exécuter le sous-générateur, vous devez installer le [Heroku CLI](https://cli.heroku.com/).

Vous devez également [créer un compte Heroku](http://signup.heroku.com/) et vous connecter avec la CLI en exécutant la commande suivante :

**$ heroku login**
Entrez vos identifiants Heroku.
E-mail : VOTRE_EMAIL
Mot de passe (la saisie sera masquée) : VOTRE_MOT_DE_PASSE
Authentification réussie.


<div class="alert alert-warning"><i class="fa fa-money" aria-hidden="true"></i>
Depuis <a href="https://blog.heroku.com/next-chapter" target="_blank" rel="noopener">novembre 2022, Heroku ne propose plus de niveau totalement gratuit</a>.
Cela signifie que vous aurez besoin d'un compte Heroku correctement <a href="https://devcenter.heroku.com/articles/account-verification" target="_blank" rel="noopener">vérifié</a>
et que le déploiement d'une application avec les options de dyno les plus petites et la taille de base de données la plus petite vous coûtera environ <b>12 $ par mois</b>.
</div>

Le sous-générateur Heroku crée une application en utilisant des [dynos gratuits](https://devcenter.heroku.com/articles/dyno-types){:target="_blank" rel="noopener"} avec des add-ons correspondant à votre configuration sélectionnée.

Nous prenons en charge les add-ons suivants :

* [Heroku Postgres](https://www.heroku.com/postgres){:target="_blank" rel="noopener"} lors de l'utilisation de PostgreSQL
* [JawsDB](https://elements.heroku.com/addons/jawsdb){:target="_blank" rel="noopener"} lors de l'utilisation de MySQL ou MariaDB
* [Heroku Redis](https://elements.heroku.com/addons/heroku-redis){:target="_blank" rel="noopener"} lors de l'utilisation de [Redis](/using-cache/#caching-with-redis)
* [MemCachier](https://elements.heroku.com/addons/memcachier){:target="_blank" rel="noopener"} lors de l'utilisation de [Memcached](/using-cache/#caching-with-memcached)
* [Bonsai Elasticsearch](https://elements.heroku.com/addons/bonsai){:target="_blank" rel="noopener"} lors de l'utilisation d'[Elasticsearch](/using-elasticsearch/)
* [Okta](https://elements.heroku.com/addons/okta){:target="_blank" rel="noopener"} lors de l'utilisation d'OAuth2/OIDC (facultatif) (/security/#oauth2)

Pour déployer votre application sur Heroku, exécutez cette commande :

`jhipster heroku`

Cela devrait empaqueter votre application en mode "production", créer une application Heroku avec une base de données, télécharger votre code et démarrer l'application.

<div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i>
Notez que si votre application est une microservice, vous serez invité à fournir une URL de registre. Faites défiler vers le bas pour apprendre comment faire cela.
</div>

<div class="alert alert-warning"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>
Veuillez noter que votre application doit démarrer en moins de 90 secondes, sinon elle sera arrêtée.
En fonction de la charge de la plateforme, le démarrage en moins de 90 secondes n'est pas garanti !
</div>

## Modification de la version Java

Vous pouvez sélectionner la version Java lors de l'exécution du sous-générateur Heroku.
Par défaut, il s'agira de Java 11.
Vous pouvez trouver toutes les versions Java prises en charge par Heroku dans la [documentation officielle](https://devcenter.heroku.com/articles/java-support#supported-java-versions){:target="_blank" rel="noopener"}.

Si vous souhaitez changer la version Java, par exemple de `11` à `14`, plus tard, vous devez le faire dans `system.properties` dans le dossier racine de votre projet :


java.runtime.version=14


Lorsque vous redéployez votre application, elle utilisera Java 14.

## Déploiement de votre application

Par défaut, l'application sera [déployée via git](https://devcenter.heroku.com/articles/git){:target="_blank" rel="noopener"}.
Cela signifie que vous poussez votre code et Heroku le construit et le déploie sur leurs serveurs.
Si vous ne pouvez pas ou ne voulez pas pousser de code sur le serveur de quelqu'un d'autre, vous pouvez utiliser l'option jar et [déployer un jar exécutable](https://devcenter.heroku.com/articles/deploying-executable-jar-files){:target="_blank" rel="noopener"}.
Heroku prend également en charge [le déploiement d'une image Docker](https://devcenter.heroku.com/articles/container-registry-and-runtime){:target="_blank" rel="noopener"}, mais le sous-générateur ne prend pas encore en charge cette option.

### Mise à jour de votre application déployée

#### Utilisation de l'option git

Lorsque vous déployez via git, un nouveau remote appelé heroku a été créé.
Pour déployer un nouveau code, vous devez pousser les modifications vers le remote heroku :

`git push heroku master`

<div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i>
Cela suppose que vous avez exécuté le générateur sur la machine à partir de laquelle vous exécutez cette commande.
Si ce n'est pas le cas, vous devrez suivre les <a href="https://devcenter.heroku.com/articles/git#for-an-existing-heroku-app" target="_blank" rel="noopener">instructions pour créer un remote Heroku</a>.
</div>

#### Utilisation de l'option jar

Lorsque vous avez sélectionné le déploiement d'un jar exécutable, vous devez créer le jar mis à jour et déployer le nouveau fichier sur Heroku.


##### Préparation d'un nouveau jar

Lorsque votre application est déjà déployée, vous pouvez préparer un nouveau déploiement avec :

`./mvnw package -Pprod -DskipTests`

Ou avec Gradle :

`./gradlew -Pprod bootJar -x test`

##### Déploiement en production

<div class="alert alert-info"><i class="fa fa-info-circle" aria-hidden="true"></i>
Cela suppose que vous avez exécuté le générateur sur la machine à partir de laquelle vous exécutez cette commande.
Si ce n'est pas le cas, vous devrez suivre les instructions pour installer le <a href="https://devcenter.heroku.com/articles/deploying-executable-jar-files" target="_blank" rel="noopener">CLI Java Heroku</a>.
</div>

Pour déployer en production, tapez :

`heroku deploy:jar target/*.jar`

Ou avec Gradle :

`heroku deploy:jar build/libs/*jar`

## Déploiement de Docker sur Heroku

Vous pouvez déployer votre application en tant que conteneur Docker sur Heroku également. Bien que cela fonctionne, aucune configuration Heroku n'est effectuée automatiquement, vous devez donc le faire manuellement. Cette documentation suppose que vous avez déjà exécuté `jhipster heroku` pour déployer votre application et utilise donc l'intégration et la configuration que ce processus effectue.

**NOTE** : Si vous utilisez une version de JHipster antérieure à v6.10.2, vous devrez ajouter ce qui suit à `src/main/resources/config/application-heroku.yml` :

yaml
server:
  port: ${PORT:8080}


Construisez votre image Docker :


./mvnw package -Pprod verify jib:dockerBuild


Si vous utilisez Gradle :


./gradlew -Pprod bootJar jibDockerBuild


Vous pouvez le tester localement en utilisant Docker Compose.

shell
docker-compose -f src/main/docker/app.yml up


Une fois que vous avez confirmé que tout fonctionne, créez une nouvelle application sur Heroku et ajoutez-la en tant que remote.

```
shell
heroku apps:create
git remote add docker https://git.heroku.com/<your-new-app>.git
```

Ensuite, exécutez les commandes ci-dessous pour déployer votre application JHipster en tant qu'image Docker. Assurez-vous de remplacer les espaces réservés `<...>` par le nom de votre application Heroku. Si vous ne connaissez pas le nom de votre application, exécutez `heroku apps`.

```
shell
heroku container:login
docker tag space registry.heroku.com/<heroku-app>/web
docker push registry.heroku.com/<heroku-app>/web
```

Par exemple :

```
shell
heroku container:login
docker tag space registry.heroku.com/fast-peak-70014/web
docker push registry.heroku.com/fast-peak-70014/web
```

À ce stade, vous pouvez utiliser les add-ons PostgreSQL et Okta que vous avez déjà configurés. Exécutez la commande suivante pour obtenir les identifiants des add-ons à partir du remote `heroku` sur lequel vous avez d'abord déployé.

```
shell
heroku addons --remote heroku
```

Ensuite, vous pouvez attacher ces instances à votre nouvelle application.

```
shell
heroku addons:attach <postgresql-addon-name> --remote docker
heroku addons:attach <okta-addon-name> --remote docker
```


Lorsque vous utilisez `jhipster heroku` pour déployer votre application, il configure correctement la base de données pour vous. Cependant, lorsque vous le déployez en tant que conteneur Docker, rien de tout cela ne se produit. Par conséquent, vous devez définir quelques variables de configuration pour que votre conteneur Docker puisse communiquer avec PostgreSQL. Tout d'abord, exécutez la commande suivante pour obtenir l'URL PostgreSQL.

```
heroku config:get DATABASE_URL --remote docker
```

Cette commande récupérera une valeur avec la syntaxe suivante :

```
postgres://username:password@address
```

Ensuite, définissez les variables d'environnement de la base de données pour correspondre aux clés qui se trouvent dans `application-heroku.yml` :
```
shell
heroku config:set JDBC_DATABASE_URL=jdbc:postgresql://<address> --remote docker
heroku config:set JDBC_DATABASE_USERNAME=<username> --remote docker
heroku config:set JDBC_DATABASE_PASSWORD=<password> --remote docker
```

Définissez la quantité maximale de mémoire Java à utiliser et spécifiez les profils Spring.
```
shell
heroku config:set JAVA_OPTS=-Xmx256m
heroku config:set SPRING_PROFILES_ACTIVE=prod,heroku
```

Exécutez la commande ci-dessous pour ouvrir votre navigateur et accéder à votre application.

```
heroku open --remote docker
```

Copiez l'URL de votre application et connectez-vous à votre compte développeur Okta. Allez à **Applications** > **Web** > **Général** et ajoutez l'URL aux URI de redirection de connexion et de déconnexion. Assurez-vous que l'URI de redirection de connexion se termine par `/login/oauth2/code/oidc`.

Maintenant, vous devriez pouvoir libérer votre conteneur et démarrer l'application.

```
heroku container:release web --remote docker
```

Vous pouvez regarder les journaux pour voir si votre conteneur a démarré avec succès.

```
heroku logs --tail --remote docker
```

Maintenant, vous devriez pouvoir ouvrir votre application, cliquer sur le lien **se connecter** et vous authentifier !

```
heroku open --remote docker
```

**REMARQUE** : Vous ne pourrez **PAS** vous connecter à votre application JHipster en utilisant le compte administrateur fourni par l'add-on Okta. Pour vous assurer de ne pas être connecté avec ce compte, nous vous suggérons d'utiliser une nouvelle fenêtre privée pour vous connecter.

Si vous testez votre application JHipster Dockerisée sur [securityheaders.com](https://securityheaders.com), vous verrez qu'elle obtient un **A** !

## Déploiement de Microservices

Les microservices JHipster nécessitent Consul ou JHipster Registry comme décrit dans la [documentation sur les microservices avec JHipster](/microservices-architecture/). Vous pouvez déployer un registre JHipster sur Heroku en cliquant sur ce bouton :

[![Déployer sur Heroku](https://camo.githubusercontent.com/c0824806f5221ebb7d25e559568582dd39dd1170/68747470733a2f2f7777772e6865726f6b7563646e2e636f6d2f6465706c6f792f627574746f6e2e706e67)](https://dashboard.heroku.com/new?&template=https%3A%2F%2Fgithub.com%2Fjhipster%2Fjhipster-registry)

Une fois le registre déployé, vous pouvez exécuter la commande `jhipster heroku` sur votre microservice ou passerelle. Le sous-générateur Heroku vous demandera l'URL de votre registre, qui sera sous la forme `https://[appname].herokuapp.com`.

Un registre fonctionnant sur Heroku présente quelques limitations, notamment :

*   Le registre ne fonctionnera qu'avec une configuration native (et non pas Git config).
*   Le service de registre ne peut pas être mis à l'échelle vers plusieurs dynos pour fournir de la redondance. Vous devez déployer plusieurs applications (c'est-à-dire cliquer sur le bouton plusieurs fois). Cela est dû au fait qu'Eureka nécessite des URL distinctes pour synchroniser l'état en mémoire entre les instances.

### Utilisation de la sécurité avec votre registre JHipster sur Heroku

Pour obtenir le mot de passe administrateur généré automatiquement sur le registre JHipster, tapez :

`heroku config:get JHIPSTER_PASSWORD`

Pour utiliser ce mot de passe, mettez à jour tous vos microservices et votre passerelle pour utiliser les identifiants du registre en exécutant cette commande :

`heroku config:set JHIPSTER_REGISTRY_URL="https://admin:[password]@[appname].herokuapp.com"`

## Dépannage

Si votre application est arrêtée par Heroku lorsque votre changelog Liquibase est appliqué, votre base de données sera marquée comme "verrouillée" par Liquibase. Vous devrez nettoyer manuellement la table de verrouillage. Sur Postgres, assurez-vous d'avoir un [client Postgres local installé](https://devcenter.heroku.com/articles/heroku-postgresql#local-setup) et exécutez la commande suivante :

`heroku pg:psql -c "update databasechangeloglock set locked=false;"`

Heroku a une limite de temps de démarrage par défaut de 90 secondes. Si votre application prend plus de temps que cela, Heroku arrêtera le processus, ce qui peut laisser la base de données dans un état verrouillé. Si le problème persiste, essayez de contacter [le support Heroku](http://help.heroku.com) pour demander une limite de démarrage plus longue pour votre application.


### Utilisation d'Elasticsearch

L'addon Bonsai utilisé avec le plan gratuit sandbox ne [prend en charge que Elasticsearch 7.10.x](https://docs.bonsai.io/article/139-which-versions-bonsai-supports){:target="_blank" rel="noopener"}.
Cela pourrait entraîner [des incompatibilités](https://github.com/jhipster/generator-jhipster/issues/10003){:target="_blank" rel="noopener"} en fonction des versions de Spring Data et [de JHipster que vous utilisez](https://github.com/jhipster/generator-jhipster/issues/18650){:target="_blank" rel="noopener"}. 
JHipster [impose des dépendances Elasticsearch compatibles avec Bonsai](https://github.com/jhipster/generator-jhipster/pull/18774){:target="_blank" rel="noopener"} (par exemple, clients) lors du déploiement sur Heroku. 

<div class="alert alert-warning"><i class="fa fa-money" aria-hidden="true"></i>
Si vous êtes prêt à utiliser un addon <b>payant</b>, vous pouvez utiliser l' <a href="https://devcenter.heroku.com/articles/foundelasticsearch" target="_blank" rel="noopener">intégration officielle Elastic Cloud</a> pour accéder à la dernière version et aux fonctionnalités d'Elasticsearch.
</div>

## Plus d'informations

*   [Application exemple](https://github.com/kissaten/jhipster-example){:target="_blank" rel="noopener"}
*   [Documentation Spring Boot Heroku](https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html#cloud-deployment-heroku){:target="_blank" rel="noopener"}
*   [Documentation sur les dynos gratuits Heroku](https://devcenter.heroku.com/articles/free-dyno-hours){:target="_blank" rel="noopener"}
*   [Documentation sur le support Java Heroku](https://devcenter.heroku.com/articles/java-support#supported-java-versions){:target="_blank" rel="noopener"}