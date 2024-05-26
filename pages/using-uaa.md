---
layout: default
title: Utilisation de JHipster UAA pour la sécurité des microservices
permalink: /using-uaa/
sitemap:
    priority: 0.7
    lastmod: 2016-08-25T00:00:00-00:00
---
# <i class="fa fa-lock"></i> Utilisation de JHipster UAA pour la sécurité des microservices

JHipster UAA est un service de comptabilité et d'autorisation des utilisateurs pour sécuriser les microservices JHipster en utilisant le protocole d'autorisation OAuth2.

Pour distinguer JHipster UAA des autres "UAA" tels que [Cloudfoundry UAA](https://github.com/cloudfoundry/uaa), JHipster UAA est un serveur d'autorisation OAuth2 entièrement configuré avec les points de terminaison des utilisateurs et des rôles à l'intérieur, enveloppé dans une application JHipster habituelle. Cela permet au développeur de configurer en profondeur chaque aspect du domaine utilisateur, sans restrictions sur les politiques par d'autres UAAs prêts à l'emploi.

## Sommaire

1. [Diagramme d'architecture](#diagramme_d_architecture)
2. [Revendications de sécurité de l'architecture microservices](#revendications)
3. [Compréhension d'OAuth2 dans ce contexte](#oauth2)
4. [Utilisation de JHipster UAA](#jhipster-uaa)
  * Configuration de base
  * Compréhension des composants
  * Jetons de rafraîchissement
  * Erreurs courantes
5. [Sécurisation de la communication entre services à l'aide de clients Feign](#communication-entre-services)
  * Utilisation d'Eureka, Ribbon, Hystrix et Feign
  * Utilisation de `@AuthorizedFeignClients`
6. [Test des applications UAA](#testing)
  * Stubbage des clients Feign
  * Émulation de l'authentification OAuth2

<h2 id="diagramme_d_architecture">Diagramme d'architecture</h2>

<img src="{{ site.url }}/images/microservices_architecture_detail.002.png" alt="Diagramme" style="width: 800; height: 600" class="img-responsive"/>

<h2 id="revendications">1. Revendications de sécurité de l'architecture microservices</h2>

Avant d'aborder OAuth2 et son application sur les microservices JHipster, il est important de clarifier les revendications d'une solution de sécurité solide.

### 1. Authentification centralisée

Comme les microservices consistent à construire principalement des applications indépendantes et autonomes, nous voulons avoir une expérience d'authentification cohérente, de sorte que les utilisateurs ne remarquent pas que leurs demandes sont traitées par différentes applications avec éventuellement une configuration de sécurité individuelle.

### 2. Stateless

Le principal avantage de la construction de microservices est la scalabilité. La solution de sécurité choisie ne doit donc pas affecter cela. Maintenir l'état de session des utilisateurs sur le serveur devient une tâche délicate, donc une solution sans état est fortement préférée dans ce scénario.

### 3. Distinction entre l'accès utilisateur/machine

Il est nécessaire de faire une distinction claire entre les différents utilisateurs, mais aussi entre les différentes machines. L'utilisation de l'architecture microservices conduit à la construction d'un grand centre de données multi-usages de différents domaines et ressources, il est donc nécessaire de restreindre l'accès à différents clients, tels que les applications natives, les applications monopages multiples, etc.

### 4. Contrôle d'accès détaillé

Tout en maintenant des rôles centralisés, il est nécessaire de configurer des politiques de contrôle d'accès détaillées dans chaque microservice. Un microservice ne doit pas être conscient de la responsabilité de reconnaître les utilisateurs et doit autoriser les demandes entrantes.

### 5. Protégé contre les attaques

Peu importe le nombre de problèmes qu'une solution de sécurité peut résoudre, elle doit être forte contre les vulnérabilités autant que possible.

### 6. Scalabilité

L'utilisation de protocoles sans état n'est pas une garantie de la scalabilité de la solution de sécurité. En fin de compte, il ne devrait pas y avoir de point de défaillance unique. Un contre-exemple est une base de données d'authentification partagée ou une seule instance de serveur d'authentification, qui est sollicitée une fois par demande.

<h2 id="oauth2">2. Compréhension d'OAuth2 dans ce contexte</h2>

L'utilisation du protocole OAuth2 (note : c'est un **protocole**, pas un framework, pas une application) satisfait toutes les 6 revendications. Il suit des normes strictes, ce qui rend cette solution compatible avec d'autres microservices ainsi qu'avec des systèmes distants. JHipster propose plusieurs solutions, basées sur la conception de sécurité suivante :

![Architecture JHipster UAA]({{ site.url }}/images/jhipster_uaa.png)

* Chaque requête vers n'importe quel point de terminaison de l'architecture est effectuée via un "client"
* Un "client" est un terme abstrait pour des choses comme "client Angular $http", un "client REST", "curl", ou toute autre chose capable d'effectuer des requêtes.
* Un "client" peut également être utilisé en conjonction avec l'authentification utilisateur, comme Angular $http dans l'application client frontend
* Chaque microservice servant des ressources sur des points de terminaison (y compris l'UAA), sont des serveurs de ressources
* Les flèches bleues montrent les clients s'authentifiant sur un serveur d'autorisation Oauth
* Les flèches vertes montrent les requêtes sur les serveurs de ressources effectuées par le client
* Le serveur UAA est une combinaison de serveur d'autorisation et de serveur de ressources
* Le serveur UAA est le propriétaire de toutes les données à l'intérieur des applications de microservice (il approuve automatiquement l'accès aux serveurs de ressources)
* Les clients accédant aux ressources avec une authentification utilisateur, sont authentifiés en utilisant le "password grant" avec l'identifiant client et le secret stockés en toute sécurité dans les fichiers de configuration de la passerelle
* Les clients accédant aux ressources sans utilisateur, sont authentifiés en utilisant le "client credentials grant"
* Chaque client est défini à l'intérieur de l'UAA (application web, interne, ...)

Cette conception peut être appliquée à n'importe quelle architecture de microservice indépendamment du langage ou du framework.

En complément, les règles suivantes peuvent être appliquées pour le contrôle d'accès :

* L'accès utilisateur est configuré à l'aide de "rôles" et de [RBAC][]
* L'accès des machines est configuré à l'aide de "scopes" et de [RBAC][]
* La configuration d'accès complexe est exprimée à l'aide de [ABAC][], en utilisant des expressions booléennes sur les "rôles" et les "scopes"
  * exemple : hasRole("ADMIN") and hasScope("shop-manager.read", "shop-manager.write")

<h2 id="jhipster-uaa">3. Utilisation de JHipster UAA</h2>

Lors de la génération d'un microservice JHipster, vous pouvez choisir les options UAA au lieu de l'authentification JWT.

**Remarque** : la solution UAA utilise également JWT, qui peut être configuré de manière personnalisée ainsi que JWT, en utilisant la sécurité par défaut de Spring Cloud.

### Configuration de base

La configuration de base se compose de :

1. Un serveur JHipster UAA (en tant que type d'application)
2. Au moins un autre microservice (utilisant l'authentification UAA)
3. Une passerelle JHipster (utilisant l'authentification UAA)

C'est l'ordre dans lequel il doit être généré.

En plus du type d'authentification, l'emplacement de l'UAA doit être fourni.

Pour une utilisation très basique, cette configuration fonctionne de la même manière que pour le type d'authentification JWT, mais avec un service supplémentaire.

### Compréhension des composants

Le serveur JHipster UAA fait trois choses par défaut :

* Il sert le domaine utilisateur JHipster par défaut, contenant les ressources utilisateur et compte (cela est fait par la passerelle dans l'authentification JWT)
* Il implémente `AuthorizationServerConfigurerAdapter` pour OAuth2 et définit des clients de base ("web_app" et "internal")
* Il sert la clé publique JWT sur `/oauth/token_key`, qui doit être consommée par tous les autres microservices

Les choix d'une base de données, d'une solution de cache, d'un moteur de recherche, d'outils de build et d'autres options JHipster sont ouverts au développeur.

Lorsqu'un microservice démarre, il s'attend généralement à ce que le serveur UAA soit déjà en place pour partager sa clé publique. Le service appelle d'abord `/oauth/token_key` pour récupérer la clé publique et la configure pour la signature des clés (`JwtAccessTokenConverter`).

Si l'UAA n'est pas en place, l'application continuera de démarrer et de récupérer la clé publique ultérieurement. Il existe deux propriétés - `uaa.signature-verification.ttl` contrôle la durée de vie de la clé avant qu'elle ne soit récupérée à nouveau, `uaa.signature-verification.public-key-refresh-rate-limit` limite les requêtes à l'UAA pour éviter de le spammer. Ces valeurs sont généralement laissées à leurs valeurs par défaut. Dans tous les cas, si la vérification échoue, alors le microservice vérifiera s'il y a une nouvelle clé. De cette façon, les clés peuvent être remplacées sur l'UAA et les services seront à jour.

À partir de ce point, deux cas d'utilisation peuvent se produire dans cette configuration de base : les appels utilisateur et les appels machine.

Pour les appels utilisateur, une requête de connexion est envoyée au point de terminaison `/auth/login` de la passerelle. Ce point de terminaison utilise `OAuth2TokenEndpointClientAdapter` pour envoyer une requête à l'UAA en s'authentifiant avec le "password grant". Comme cette requête se produit sur la passerelle, l'identifiant client et le secret ne sont pas stockés dans le code côté client et sont inaccessibles aux utilisateurs. La passerelle renvoie un nouveau cookie contenant le jeton, et ce cookie est envoyé avec chaque requête effectuée par le client vers le backend JHipster.

Pour les appels machine, la machine doit s'authentifier en tant que UAA en utilisant le "client credentials grant". JHipster fournit une solution standard, décrite dans [communication sécurisée entre services utilisant des clients Feign](#inter-service-communication).

### Jetons de rafraîchissement

Le flux général pour le rafraîchissement des jetons d'accès se produit sur la passerelle et est le suivant :

- L'authentification est effectuée via `AuthResource` appelant `OAuth2AuthenticationService`'s authenticate qui définira les cookies.
- Pour chaque requête, le `RefreshTokenFilter` (installé par `RefreshTokenFilterConfigurer`) vérifie si le jeton d'accès est expiré et s'il a un jeton de rafraîchissement valide.
- Si oui, il déclenche le processus de rafraîchissement via `OAuth2AuthenticationService` refreshToken.
- Cela utilise l'interface `OAuth2TokenEndpointClient` pour envoyer une requête de jeton de rafraîchissement au serveur OAuth2 de choix, dans notre cas UAA (via `UaaTokenEndpointClient`).
- Le résultat de la requête de rafraîchissement est ensuite utilisé en aval comme nouveaux cookies et défini en amont (vers le navigateur) comme nouveaux cookies.

### Erreurs courantes

Voici une brève liste des principales erreurs qu'un développeur doit connaître.

#### ***Utiliser la même clé de signature pour la production et la mise en scène***

Il est strictement recommandé d'utiliser des clés de signature différentes autant que possible. Une fois qu'une clé de signature tombe entre de mauvaises mains, il est possible de générer une clé d'accès complet sans connaître les identifiants de connexion de tout utilisateur.

#### ***Ne pas utiliser TLS***

Si des attaquants parviennent à intercepter un jeton d'accès, ils obtiendront tous les droits autorisés par ce jeton, jusqu'à l'expiration du jeton. Il existe de nombreuses façons d'y parvenir, en particulier lorsqu'il n'y a pas de chiffrement TLS. Ce n'était pas un problème à l'époque de la version 1 d'OAuth, car le chiffrement au niveau du protocole était imposé.

#### ***Utiliser des jetons d'accès dans l'URL***

Selon les normes, les jetons d'accès peuvent être passés soit par URL, dans les en-têtes, ou dans un cookie. Du point de vue TLS, les trois méthodes sont sécurisées. En pratique, passer des jetons via l'URL est moins sécurisé, car il existe plusieurs moyens d'obtenir l'URL à partir des enregistrements.

#### ***Passer aux clés de signature symétriques***

RSA n'est pas requis pour la signature JWT, et Spring Security fournit également la signature de jeton symétrique. Cela résout également certains problèmes qui rendent le développement plus difficile. Mais cela n'est pas sécurisé, car un attaquant doit accéder à un seul microservice pour pouvoir générer ses propres jetons JWT.

<h2 id="inter-service-communication">4. Communication sécurisée entre services utilisant des clients Feign</h2>

Actuellement, seul JHipster UAA offre une approche évolutive de la communication sécurisée entre services.

Utiliser l'authentification JWT sans transférer manuellement les JWT de la requête à la requête interne oblige les microservices à appeler d'autres microservices via la passerelle, ce qui implique des requêtes internes supplémentaires par une requête principale. Mais même avec le transfert, il n'est pas possible de séparer proprement l'authentification utilisateur et machine.

Étant donné que JHipster UAA est basé sur OAuth2, tous ces problèmes sont résolus par la définition du protocole.

Ce chapitre explique comment commencer avec cela.

### Utiliser Eureka, Ribbon, Hystrix et Feign

Lorsqu'un service souhaite demander des données à un autre, ces quatre acteurs entrent finalement en jeu. Il est donc important de savoir brièvement de quoi chacun est responsable :

* Eureka : c'est là que les services s'inscrivent ou se désinscrivent, vous pouvez donc demander "foo-service" et obtenir un ensemble d'IP des instances du foo-service, enregistrées dans Eureka.
* Ribbon : lorsqu'on demande "foo-service" et qu'on a déjà récupéré un ensemble d'IP, Ribbon fait l'équilibrage de charge sur ces IP.

Pour résumer, lorsqu'on obtient une URL comme "http://uaa/oauth/token/" avec 2 instances du serveur JHipster UAA fonctionnant sur 10.10.10.1:9999 et 10.10.10.2:9999, on peut utiliser Eureka et Ribbon pour transformer rapidement cette URL soit en "http://10.10.10.1:9999/oauth/token" soit en "http://10.10.10.2:9999/oauth/token" en utilisant un algorithme Round Robin.

* Hystrix : un système de disjoncteur résolvant les scénarios de repli en cas de défaillance du service
* Feign : utiliser tout cela de manière déclarative


Dans le monde réel, il n'y a aucune garantie que toutes les instances de tous les services soient opérationnelles. Ainsi, Hystrix fonctionne comme un disjoncteur pour gérer les scénarios de défaillance de manière bien définie, en utilisant des solutions de repli.

Mais connecter et coder toutes ces choses manuellement représente beaucoup de travail : Feign offre la possibilité d'écrire des clients REST équilibrés par ***Ribbon*** pour des points de terminaison enregistrés dans ***Eureka***, avec des implémentations de repli contrôlées à l'aide de ***Hystrix***, en utilisant rien de plus que des interfaces Java avec quelques annotations.

Pour la communication inter-service, les clients Feign sont très utiles. Lorsqu'un service a besoin d'un client REST pour accéder à un "autre-service", qui fournit des "autres-ressources", il est possible de déclarer une interface comme :

``` java
@FeignClient(name = "other-service")
interface OtherServiceClient {
  @RequestMapping(value = "/api/other-resources")
  List<OtherResource> getResourcesFromOtherService();
}
```

Et ensuite, l'utiliser via l'injection de dépendances, comme :

``` java
@Service
class SomeService {
  private OtherServiceClient otherServiceClient;

  @Inject
  public SomeService(OtherServiceClient otherServiceClient) {
    this.otherServiceClient = otherServiceClient;
  }
}
```

Comme avec Spring Data JPA, il n'est pas nécessaire d'implémenter cette interface. Cependant, si vous utilisez Hystrix, vous pouvez fournir des implémentations de repli. Les classes implémentées des interfaces clients Feign agissent comme des implémentations de repli.

Un problème ouvert est de sécuriser cette communication en utilisant UAA. Pour cela, il devrait y avoir un intercepteur de requêtes pour Feign, qui implémente le flux d'identifiants clients d'OAuth, pour autoriser le service actuel à demander un autre service. Dans JHipster, vous utilisez `@AuthorizedFeignClients` à la place. Il s'agit d'une annotation fournie par JHipster, qui fait exactement cela.

### Utilisation de `@AuthorizedFeignClients`

Si le client Feign ci-dessus doit être utilisé pour un "autre-service", qui
fournit des ressources protégées, l'interface doit être annotée comme ceci :

``` java
@AuthorizedFeignClient(name = "other-service")
interface OtherServiceClient {
  @RequestMapping(value = "/api/other-resources")
  List<OtherResource> getResourcesFromOtherService();
}
```

**Note** : En raison d'un bug dans Spring Cloud, il n'est actuellement pas possible d'utiliser une notation différente pour le nom du service, comme

``` java
@AuthorizedFeignClient("other-service")
```

ou

``` java
@AuthorizedFeignClient(value = "other-service")
```

Le client REST est automatiquement autorisé avec votre serveur UAA lorsqu'il n'y a pas de jeton d'accès valide stocké en mémoire.

Cette approche traite d'un scénario où les requêtes de machine s'exécutent via un client OAuth séparé ne se référant pas à une session utilisateur. Cela est important, en particulier lorsque l'audit des entités est utilisé sur une requête, émise par une autre requête dans un autre service. Comme alternative, le jeton d'accès de la requête initiale peut être transmis aux appels suivants. Actuellement, il n'y a pas de "solution par défaut" fournie par JHipster.

<h2 id="testing">5. Tester les applications UAA</h2>

### Mocking des clients Feign

Les composants travaillant avec des clients Feign doivent être testables. Utiliser Feign dans les tests de la même manière qu'en production obligerait le JHipster Registry et le serveur UAA à être opérationnels et accessibles depuis la même machine où les tests sont exécutés. Mais dans la plupart des cas, vous ne voulez pas tester que Feign fonctionne (il fonctionne généralement), mais vos composants utilisant les clients Feign.

Pour tester les composants utilisant des clients Feign, il est possible d'utiliser `@MockBean`, qui fait partie de Spring Boot depuis la version 1.4.0.

Voici un exemple, testant que `SomeService` fonctionne comme prévu, avec des valeurs simulées pour le client :

``` java
@RunWith(SpringRunner.class)
@SpringBootTest(App.class)
public class SomeServiceTest {

    @MockBean
    private OtherServiceClient otherServiceClient;

    @Inject
    private SomeService someService;

    @Test
    public void testSomeService() {
        given(otherServiceClient.getResourcesFromOtherService())
        .willReturn(Arrays.asList(new OtherResource(...)));

        someService.performActionWhichInkvokesTheAboveMentionedMethod();

        //assert that your application is in the desired state
    }
}
```

-
Avec cette technologie, vous simulez le comportement de l'autre service et fournissez l'entité de ressource attendue, qui proviendrait de l'origine. Tous les Beans injectant un client se comporteront comme simulés, vous pouvez donc vous concentrer sur la logique de ces Beans.

### Émulation de l'authentification OAuth2

L'utilisation des tests d'intégration Spring contre les contrôleurs REST contourne généralement la configuration de sécurité, car cela rendrait les tests difficiles lorsque l'intention est simplement de prouver que le contrôleur fonctionne comme il se doit. Cependant, parfois, tester le comportement de sécurité d'un contrôleur fait également partie des tests.

Pour ce cas d'utilisation, JHipster fournit un composant appelé `OAuth2TokenMockUtil`, qui peut émuler une authentification valide sans forcer l'existence de l'utilisateur ou du client.

Pour utiliser cette fonctionnalité, deux choses doivent être faites :

#### 1. Activer la sécurité dans le contexte mock Spring MVC et injecter l'outil de simulation

``` java
@Inject
private OAuth2TokenMockUtil tokenUtil;

@PostConstruct
public void setup() {
    this.restMockMvc = MockMvcBuilders
        .webAppContextSetup(context)
        .apply(springSecurity())
        .build();
}
```

***Dans ce test, aucune instance unique du contrôleur ne doit être simulée, mais le `WebApplicationContext` de l'application***

#### 2. Utilisation de `OAuth2TokenMockUtil`

L'outil propose une méthode "oaut2authentication", utilisable avec la notation "with" de MockMvc. Actuellement, il peut être configuré pour simuler une authentification avec les champs suivants :

* username
* roles (Set<String>)
* scope (Set<String>)

Voici un exemple :

``` java
@Test
public void testInsufficientRoles() {
    restMockMvc.perform(
        get("url/requiring/ADMIN/role")
        .with(tokenUtil.oauth2Authentication("unprivileged.user@example.com", Sets.newSet("some-scope"), Sets.newSet("ROLE_USER")))
    ).andExpect(status().isForbidden());
}
```

[RBAC]: https://de.wikipedia.org/wiki/Role_Based_Access_Control
[ABAC]: https://en.wikipedia.org/wiki/Attribute-Based_Access_Control