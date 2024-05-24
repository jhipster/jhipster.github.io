---
layout: default
title: Passerelle API
permalink: /api-gateway/
sitemap:
    priority: 0.7
    lastmod: 2017-05-03T00:00:00-00:00
---

# <i class="fa fa-exchange"></i> La passerelle API JHipster

JHipster peut générer des passerelles API. Une passerelle (`gateway`) est une application JHipster normale, donc vous pouvez utiliser les options habituelles de JHipster et les flux de travail de développement sur ce projet, mais elle agit également comme l'entrée de vos microservices. Plus précisément, elle fournit le routage HTTP et l'équilibrage de charge, la qualité de service, la sécurité et la documentation API pour tous les microservices.

## Sommaire

1. [Diagramme d'architecture](#architecture_diagram)
2. [Routage HTTP](#http_routing)
3. [Sécurité](#security)
4. [Documentation automatique](#documentation)
5. [Limitation de débit](#rate_limiting)
6. [Politique de contrôle d'accès](#acl)

<h2 id="architecture_diagram">Diagramme d'architecture</h2>

<img src="{{ site.url }}/images/microservices_architecture_detail.003.png" alt="Diagram" style="width: 800; height: 600" class="img-responsive"/>

<h2 id="http_routing">Routage des requêtes HTTP via la passerelle</h2>

Lorsque les passerelles et les microservices sont lancés, ils s'enregistreront dans le registre de services Consul.

La passerelle proxyera automatiquement toutes les requêtes vers les microservices, en utilisant leur nom d'application : par exemple, lorsque le microservice `app1` est enregistré, il est disponible sur la passerelle à l'URL  `/services/app1`.

Par exemple, si votre passerelle fonctionne sur `localhost:8080`, vous pourriez pointer vers [http://localhost:8080/services/app1/api/foos](http://localhost:8080/services/app1/api/foos) Pour obtenir la `foos` ressource servie par le microservice `app1`. Si vous essayez de faire cela avec votre navigateur Web, n'oubliez pas que les ressources REST sont sécurisées par défaut dans JHipster, donc vous devez envoyer l'en-tête JWT correct (voir le point sur la sécurité ci-dessous), ou supprimer la sécurité sur ces URL dans la classe `MicroserviceSecurityConfiguration` du microservice.

S'il y a plusieurs instances du même service en cours d'exécution, la passerelle obtiendra ces instances du registre de services, et équilibrera les requêtes HTTP en utilisant [Consul](https://www.consul.io/use-cases/load-balancing).

Chaque passerelle a un menu spécifique "admin > gateway", où les routes HTTP ouvertes et les instances de microservices peuvent être surveillées.

## Sécurité

Les options de sécurité standard de JHipster sont détaillées sur [cette page de documentation sur la sécurité]({{ site.url }}/security/). Cependant, sécuriser une architecture de microservices nécessite quelques réglages spécifiques, qui sont détaillés ici.

### JWT (JSON Web Token)

JWT (JSON Web Token) est une méthode standard de l'industrie, facile à utiliser, pour sécuriser les applications dans une architecture de microservices.

JHipster utilise la bibliothèque [JJWT](https://github.com/jwtk/jjwt), fournie par Okta, pour implémenter JWT.

Les jetons sont générés par la passerelle et envoyés aux microservices sous-jacents : comme ils partagent une clé secrète commune, les microservices sont capables de valider le jeton et d'authentifier les utilisateurs en utilisant ce jeton.

Ces jetons sont auto-suffisants : ils contiennent des informations d'authentification et d'autorisation, donc les microservices n'ont pas besoin d'interroger une base de données ou un système externe. C'est important pour garantir une architecture évolutive.

Pour que la sécurité fonctionne, un jeton secret JWT doit être partagé entre toutes les applications.

- Pour chaque application, le jeton par défaut est unique et généré par JHipster. Il est stocké dans le fichier `.yo-rc.json`.
- Les jetons sont configurés avec la clé `jhipster.security.authentication.jwt.secret` dans le fichier `src/main/resources/config/application.yml`.
- Pour partager cette clé entre toutes vos applications, copiez la clé de votre passerelle à tous les microservices, ou partagez-la en utilisant [la configuration spécifique de JHipster du magasin Consul K/V]({{ site.url }}/consul/). C'est l'une des principales raisons pour lesquelles les gens utilisent ces serveurs de configuration centraux.
- Une bonne pratique est d'avoir une clé différente en développement et en production.


### OpenID Connect

JHipster propose un support OpenID Connect, comme détaillé [dans notre documentation OpenID Connect]({{ site.url }}/security/#oauth2).

En choisissant cette option, vous utiliserez Keycloak par défaut, et vous voudrez probablement exécuter votre architecture de microservices complète en utilisant Docker Compose : assurez-vous de lire notre [documentation Docker Compose]({{ site.url }}/docker-compose/), et configurez correctement votre `/etc/hosts` pour Keycloak.

Lors de l'utilisation d'OpenID Connect, la passerelle JHipster enverra des jetons OAuth2 aux microservices, qui accepteront ces jetons car ils sont également connectés à Keycloak.

Contrairement à JWT, ces jetons ne sont pas auto-suffisants et doivent être étatiques, ce qui pose les problèmes suivants :

- Un problème de performance dans les microservices : comme il est très courant de rechercher les informations de sécurité de l'utilisateur actuel (sinon nous n'utiliserions aucune option de sécurité dès le départ), chaque microservice appellera le serveur OpenID Connect pour obtenir ces données. Ainsi, dans une configuration normale, ces appels seront effectués par chaque microservice, à chaque fois qu'ils reçoivent une demande, et cela causera rapidement un problème de performance.
  - Si vous avez sélectionné une option de mise en cache ([voici la documentation sur "L'utilisation d'une mise en cache"]({{ site.url }}/using-cache/)) lors de la génération de votre microservice JHipster, un Bean Spring spécifique `CachedUserInfoTokenServices` sera généré, qui mettra en cache ces appels. Lorsqu'il est correctement réglé, cela résoudra le problème de performance.
  - Si vous souhaitez plus d'informations sur cette requête "user info", elle est configurée à l'aide de la clé de configuration standard de Spring Boot `security.oauth2.resource.userInfoUri` dans votre fichier de configuration `src/main/resources/application.yml`.

<h2 id="documentation">Documentation automatique</h2>

La passerelle expose les définitions de l'API Swagger des services qu'elle proxifie afin que vous puissiez bénéficier de tous les outils utiles comme Swagger UI et swagger-codegen.

Le menu "admin > API" d'une passerelle a une liste déroulante spécifique, montrant l'API de la passerelle et toutes les API des microservices enregistrés.

En utilisant cette liste déroulante, toutes les API des microservices sont automatiquement documentées et testables depuis la passerelle.

Lors de l'utilisation d'une API sécurisée, les jetons de sécurité sont automatiquement ajoutés à l'interface Swagger UI, de sorte que toutes les requêtes fonctionnent immédiatement.

<h2 id="rate_limiting">Limitation du débit</h2>

Il s'agit d'une fonctionnalité avancée qui utilise [Bucket4j](https://github.com/vladimir-bukhtoyarov/bucket4j) et [Hazelcast](https://hazelcast.com/) pour fournir une qualité de service sur les microservices.

Les passerelles fournissent des fonctionnalités de limitation du débit, de sorte que le nombre de requêtes REST peut être limité :

- par adresse IP (pour les utilisateurs anonymes)
- par connexion utilisateur (pour les utilisateurs connectés)


JHipster utilisera ensuite [Bucket4j](https://github.com/vladimir-bukhtoyarov/bucket4j) et [Hazelcast](https://hazelcast.com/) pour calculer le nombre de requêtes, et enverra des erreurs HTTP 429 (trop de requêtes) lorsque la limite est dépassée. La limite par défaut par utilisateur est de 100 000 appels d'API par heure.

Il s'agit d'une fonctionnalité importante pour protéger une architecture de microservices contre une saturation par les requêtes d'un utilisateur spécifique.

Comme la passerelle sécurise les points de terminaison REST, elle a un accès complet aux informations de sécurité de l'utilisateur, il est donc possible de l'étendre pour fournir des limites de débit spécifiques en fonction des rôles de sécurité de l'utilisateur.

Pour activer la limitation du débit, ouvrez le fichier `application-dev.yml` ou `application-prod.yml` et définissez `enabled` sur `true` :

    jhipster:
        gateway:
            rate-limiting:
                enabled: true

Les données sont stockées dans Hazelcast, il est donc possible de mettre à l'échelle les passerelles tant que le cache distribué Hazelcast est configuré, ce qui devrait fonctionner par défaut :

- Toutes les passerelles ont Hazelcast configuré par défaut

Si vous souhaitez ajouter d'autres règles ou modifier les règles existantes, vous devez les coder dans la classe `RateLimitingFilter`. Des exemples de modifications pourraient être :

- Réduire la limite des appels HTTP
- Ajouter des limites par minute ou par jour
- Supprimer toutes les limites pour les utilisateurs "admin"

<h2 id="acl">Politique de contrôle d'accès</h2>

Par défaut, tous les microservices enregistrés sont disponibles via la passerelle. Si vous souhaitez exclure une API spécifique de l'exposition via la passerelle, vous pouvez utiliser le filtre de politique de contrôle d'accès spécifique à la passerelle. Il est configurable à l'aide de la clé `jhipster.gateway.authorized-microservices-endpoints` dans les fichiers `application-*.yml` :

    jhipster:
        gateway:
            authorized-microservices-endpoints: # Politique de Contrôle d'Accès, si laissée vide pour une route, tous les points de terminaison seront accessibles
                app1: /api,/v2/api-docs # configuration de développement recommandée

Par exemple, si vous ne voulez que le point de terminaison `/api/foo` du microservice `bar` soit disponible :


    jhipster:
        gateway:
            authorized-microservices-endpoints:
                bar: /api/foo
