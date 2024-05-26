---
layout: default
title: Sécurité
permalink: /security/
redirect_from:
  - /security.html
sitemap:
    priority: 0.7
    lastmod: 2023-12-01T18:00:00-00:00
---

# <i class="fa fa-lock"></i> Sécurisation de votre application

Pour utiliser Spring Security avec une application à page unique, comme celles générées par JHipster, vous avez besoin de vues de connexion/déconnexion/erreur XHR. Nous avons configuré Spring Security afin d'utiliser correctement ces vues, et nous générons tout le code JavaScript et HTML pour vous.

Par défaut, JHipster vient avec deux utilisateurs différents :

*   "user", qui est un utilisateur normal avec l'autorisation "ROLE_USER". Le mot de passe par défaut est "user".
*   "admin", qui est un utilisateur administrateur avec les autorisations "ROLE_USER" et "ROLE_ADMIN". Le mot de passe par défaut est "admin".

Les deux autorisations "ROLE_USER" et "ROLE_ADMIN" fournissent le même accès aux entités, ce qui signifie qu'un "user" est autorisé à effectuer les mêmes opérations CRUD qu'un "admin". Ce comportement peut poser problème lorsque l'application passe en production, car un "user" peut, par exemple, supprimer n'importe quelle entité. Plus de détails sur l'amélioration du contrôle d'accès peuvent être trouvés dans ce [billet de blog](https://blog.ippon.tech/improving-the-access-control-of-a-jhipster-application/).

Pour des raisons de sécurité, vous devriez changer ces mots de passe par défaut en production.

JHipster fournit trois principaux mécanismes de sécurité :

1. [Jetons Web JSON (JWT)](#jwt)
2. [Authentification basée sur la session](#session)
3. [OAuth 2.0 et OpenID Connect](#oauth2)
   - [Keycloak](#keycloak)
   - [Auth0](#auth0)
   - [Okta](#okta)

<h2 id="jwt">Jetons Web JSON (JWT)</h2>

L'authentification par [Jetons Web JSON (JWT)](https://jwt.io/) est un mécanisme de sécurité sans état, donc c'est une bonne option si vous voulez mettre à l'échelle votre application sur plusieurs serveurs différents.

Veuillez noter que c'est l'option par défaut lors de l'utilisation d'une [architecture de microservices](/microservices-architecture/).

Ce mécanisme d'authentification n'existe pas par défaut avec Spring Security, c'est une intégration spécifique à JHipster du [projet Java JWT](https://github.com/jwtk/jjwt).

Cette solution utilise un jeton sécurisé qui contient le nom de connexion de l'utilisateur et ses autorisations. Comme le jeton est signé, il ne peut pas être modifié par un utilisateur.

JHipster suit automatiquement les JWT invalides en tant que métrique d'application personnalisée, consultez la [documentation sur la surveillance](/monitoring/#security-metrics).

### Sécurisation des JWT

- JHipster utilise une clé secrète, qui peut être configurée à l'aide de deux propriétés Spring Boot : `jhipster.security.authentication.jwt.secret` et `jhipster.security.authentication.jwt.base64-secret`. La deuxième option utilise une chaîne encodée en Base64, donc elle est considérée comme plus sécurisée et il est donc recommandé de l'utiliser. Si les deux propriétés sont configurées, la propriété `secret` (moins sécurisée) sera utilisée, pour des raisons de compatibilité héritée. Un avertissement sera affiché au démarrage de l'application si vous n'utilisez pas la propriété Base64.
- Ces clés doivent avoir une longueur minimale de 512 bits : si elles ne sont pas assez longues, vous ne pourrez pas les utiliser pour vous connecter. Si cela se produit, un avertissement clair sera affiché à la console pour expliquer ce problème.
- Les clés secrètes sont configurées dans les fichiers `application-*.yml`. Comme ces clés doivent être gardées secrètes, vous **devriez** les stocker de manière sécurisée pour votre profil de production. Cela peut être configuré en utilisant la configuration habituelle des propriétés Spring Boot : en utilisant un serveur de configuration Spring Cloud comme le [Registre JHipster](/registre-jhipster/), en utilisant une variable d'environnement, ou même un fichier `application-prod.yml` spécifique qui est SCP'd par un sysadmin dans le même répertoire que le fichier WAR exécutable de votre application.
- Vous **devriez** changer les mots de passe par défaut "user" et "admin". La façon la plus simple de le faire est de déployer votre application, de vous connecter en tant que "user/user" puis "admin/admin", et pour chacun d'eux utiliser le menu "Compte > Mot de passe" pour changer le mot de passe.

<h2 id="session">Authentification basée sur la session</h2>

Il s'agit du mécanisme d'authentification Spring Security "classique", mais nous l'avons considérablement amélioré. Il utilise la session HTTP, donc c'est un mécanisme étatique : si vous prévoyez de mettre à l'échelle votre application sur plusieurs serveurs, vous devez avoir un répartiteur de charge avec des sessions collantes afin que chaque utilisateur reste sur le même serveur ou envisager d'ajouter [Spring Session](https://spring.io/projects/spring-session) pour stocker les sessions dans une base de données plutôt que dans la mémoire.

### Sécurisation de l'authentification basée sur la session

- Pour l'authentification "se souvenir de moi", la clé de "se souvenir de moi" est configurée dans les fichiers `application-dev.yml` et `application-prod.yml`, en tant que propriété `jhipster.security.remember-me.key`. Comme cette clé doit être gardée secrète, vous **devriez** la stocker de manière sécurisée pour votre profil de production. Elle peut être configurée en utilisant la configuration habituelle des propriétés Spring Boot : en utilisant un serveur de configuration Spring Cloud comme le [Registre JHipster](/registre-jhipster/), en utilisant une variable d'environnement, ou même un fichier `application-prod.yml` spécifique qui est SCP'd par un sysadmin dans le même répertoire que le fichier WAR exécutable de votre application.
- Vous **devriez** changer les mots de passe par défaut "user" et "admin". La façon la plus simple de le faire est de déployer votre application, de vous connecter en tant que "user/user" puis "admin/admin", et pour chacun d'eux utiliser le menu "Compte > Mot de passe" pour changer le mot de passe.

### Mécanisme "se souvenir de moi" amélioré

Nous avons modifié le mécanisme "se souvenir de moi" de Spring Security afin que vous disposiez d'un jeton unique, qui est stocké dans votre base de données (base de données SQL ou NoSQL, selon votre choix lors de la génération !). Nous stockons également plus d'informations que l'implémentation standard, afin que vous ayez une meilleure compréhension de l'origine de ces jetons : adresse IP, navigateur, date... Et nous générons un écran d'administration complet, afin que vous puissiez invalider des sessions, par exemple si vous avez oublié de vous déconnecter sur un autre ordinateur.

### Protection contre le vol de cookies

Nous avons ajouté un mécanisme de protection très complet contre le vol de cookies : nous stockons vos informations de sécurité dans un cookie, ainsi que dans la base de données, et à chaque fois qu'un utilisateur se connecte, nous modifions ces valeurs et vérifions si elles ont été modifiées. De cette manière, si quelqu'un vole votre cookie, il ne pourra l'utiliser qu'une seule fois, au maximum.

<h2 id="oauth2">OAuth 2.0 et OpenID Connect</h2>

OAuth est un mécanisme de sécurité étatique, comme la session HTTP. Spring Security fournit un excellent support OAuth 2.0 et OIDC, et cela est exploité par JHipster. Si vous n'êtes pas sûr de ce qu'est OAuth et OpenID Connect (OIDC), veuillez consulter [Qu'est-ce que diable est OAuth ?](https://developer.okta.com/blog/2017/06/21/what-the-heck-is-oauth)

### Keycloak

[Keycloak](https://www.keycloak.org) est le serveur OpenID Connect par défaut configuré avec JHipster.

Pour vous connecter à votre application, vous aurez besoin d'avoir [Keycloak](https://www.keycloak.org) en cours d'exécution. L'équipe JHipster a créé un conteneur Docker pour vous avec les utilisateurs et les rôles par défaut. Démarrez Keycloak en utilisant la commande suivante.

```shell
docker-compose -f src/main/docker/keycloak.yml up
```
Alternativement, vous pouvez utiliser `npm` comme suit :

```shell
npm run docker:keycloak:up
```

Si vous voulez utiliser Keycloak avec Docker Compose, assurez-vous de lire notre [documentation sur Docker Compose](/docker-compose/), et configurez correctement votre `/etc/hosts` pour Keycloak.

> <i class="fa fa-info-circle"></i> **Note pour JHipster 7.8.1 et Keycloak 16.1.0 sur Apple Silicon (M1)**
> 
> Keycloak avant la version 18 peut avoir des problèmes sur Apple Silicon en mode de compatibilité et la solution n'est pas évidente. Vous pouvez construire l'image Keycloak localement pour résoudre le problème :
> 
> ```
> git clone git@github.com:keycloak/keycloak-containers.git
> cd keycloak-containers/server
> git checkout 16.1.0
> docker build -t jboss/keycloak:16.1.0 .
> ```

Les paramètres de sécurité dans `src/main/resources/config/application.yml` sont configurés pour cette image. Voir la note ci-dessus sur `/etc/hosts` et prendre note que `issuer-uri` peut avoir besoin de changer

```yaml
spring:
  ...
  security:
    oauth2:
      client:
        provider:
          oidc:
            issuer-uri: http://localhost:9080/auth/realms/jhipster
            # localhost sera lié à l'invité (conteneur), pas à l'hôte
            # pour exécuter Keycloak en tant que démon, c'est-à-dire npm run docker:keycloak:up, /etc/hosts doit être édité
            # et l'uri-émetteur devrait être comme suit :
            # issuer-uri: http://keycloak:9080/auth/realms/jhipster
        registration:
          oidc:
            client-id: web_app
            client-secret: web_app
            scope: openid,profile,email
```

Keycloak utilise une base de données H2 intégrée par défaut, donc vous perdrez les utilisateurs créés si vous redémarrez votre conteneur Docker. Pour conserver vos données, veuillez lire la [documentation Docker de Keycloak](https://hub.docker.com/r/jboss/keycloak/). Une solution, en conservant la base de données H2, est de faire ce qui suit :

- Ajoutez un volume qui sera persisté : `./keycloak-db:/opt/jboss/keycloak/standalone/data`

- Changez la stratégie de migration de `OVERWRITE_EXISTING` à `IGNORE_EXISTING` (dans la section de commande).

En production, il est requis par Keycloak que vous utilisiez HTTPS. Il existe plusieurs façons d'y parvenir, notamment en utilisant un proxy inverse ou un répartiteur de charge qui gérera HTTPS. Nous vous recommandons de lire la [documentation HTTPS de Keycloak](https://www.keycloak.org/docs/latest/server_installation/index.html#setting-up-https-ssl) pour en savoir plus sur ce sujet.

### Auth0

Si vous souhaitez utiliser [Auth0](https://auth0.com/) au lieu de Keycloak, suivez les étapes de configuration ci-dessous :

#### Créer une application OIDC en utilisant le tableau de bord administrateur d'Auth0

- Créez un compte de développeur gratuit sur <https://auth0.com/signup>. Après l'inscription réussie, votre compte sera associé à un domaine unique comme `dev-xxx.us.auth0.com`.
- Créez une nouvelle application de type `Applications Web Ordinaires`. Basculez sur l'onglet `Paramètres`, et configurez les paramètres de votre application comme suit :
    - URL de rappel autorisées : `http://localhost:8080/login/oauth2/code/oidc`
    - URLs de déconnexion autorisées : `http://localhost:8080/`
    - NOTE : Si vous utilisez Consul, ajoutez des URL pour le port 8500 également.
    - NOTE : Si vous utilisez le Registre JHipster, ajoutez des URL pour le port 8761 également.
- Accédez à **Gestion des Utilisateurs** > **Rôles** et créez de nouveaux rôles nommés `ROLE_ADMIN` et `ROLE_USER`.
- Accédez à **Gestion des Utilisateurs** > **Utilisateurs** et créez un nouveau compte utilisateur. Cliquez sur l'onglet **Rôle** pour attribuer des rôles au nouveau compte utilisateur créé.
- Accédez à **Actions** > **Flux** et sélectionnez **Connexion**. Créez une nouvelle action nommée `Ajouter des Rôles` et utilisez le déclencheur et l'exécution par défaut. Modifiez le gestionnaire `onExecutePostLogin` comme suit :

  ```js
  exports.onExecutePostLogin = async (event, api) => {
    const namespace = 'https://www.jhipster.tech';
    if (event.authorization) {
      api.idToken.setCustomClaim('preferred_username', event.user.email);
      api.idToken.setCustomClaim(`${namespace}/roles`, event.authorization.roles);
      api.accessToken.setCustomClaim(`${namespace}/roles`, event.authorization.roles);
    }
  }
  ```
- Sélectionnez **Déployer** et faites glisser l'action `Ajouter des Rôles` dans votre flux de connexion.

_Si vous souhaitez que toutes ces étapes soient automatisées pour vous, ajoutez un 👍 à [issue #351](https://github.com/auth0/auth0-cli/issues/351) dans le projet Auth0 CLI._

#### Configurer l'application JHipster pour utiliser Auth0 comme fournisseur OIDC

Dans votre application `JHipster`, modifiez `src/main/resources/config/application.yml` pour utiliser vos paramètres Auth0 :

```yaml
spring:
  ...
  security:
    oauth2:
      client:
        provider:
          oidc:
            # assurez-vous d'inclure le slash final !
            issuer-uri: https://{votre-domaine-auth0}/
        registration:
          oidc:
            client-id: {clientId}
            client-secret: {clientSecret}
            scope: openid,profile,email,offline_access
jhipster:
  security:
    oauth2:
      audience: https://{votre-domaine-auth0}/api/v2/
```

Si vous avez un doute sur la valeur de `issuer-uri`, alors, vous pouvez obtenir la valeur à partir de **Applications** > **{Votre Application}** > **Paramètres** > **Paramètres Avancés** > **Points de Terminaison** > **Configuration OpenID**. Supprimez le suffixe `.well-known/openid-configuration` car cela sera ajouté par Spring Security.

Vous pouvez utiliser la valeur d'audience `Auth0 Management API` par défaut à partir du champ **Applications** > **API** > **Audience de l'API**. Vous pouvez également définir votre propre API personnalisée et utiliser l'identifiant comme audience de l'API.

- Avant d'exécuter les tests `Cypress`, spécifiez les détails de l'utilisateur `Auth0` en remplaçant les variables d'environnement `CYPRESS_E2E_USERNAME` et `CYPRESS_E2E_PASSWORD`. Référez-vous à la [documentation Cypress](https://docs.cypress.io/guides/guides/environment-variables#Setting) pour plus de détails.

```shell
export CYPRESS_E2E_USERNAME=<votre-nom-utilisateur>
export CYPRESS_E2E_PASSWORD=<votre-mot-de-passe>
```

_Remarque_ : Auth0 exige qu'un utilisateur fournisse un consentement d'autorisation lors de la première connexion. Le flux de consentement n'est actuellement pas géré dans la suite de tests Cypress. Pour atténuer le problème, vous pouvez utiliser un compte utilisateur qui a déjà accordé son consentement pour autoriser l'accès à l'application via une connexion interactive.

#### Utiliser des Variables d'Environnement

Vous pouvez également utiliser des variables d'environnement pour remplacer les valeurs par défaut. Par exemple :

```bash
export SPRING_SECURITY_OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER_URI="https://{your-auth0-domain}/"
export SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_OIDC_CLIENT_ID="{client-id}"
export SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_OIDC_CLIENT_SECRET="{client-secret}"
export JHIPSTER_SECURITY_OAUTH2_AUDIENCE="https://{your-auth0-domain}/api/v2/"
```


Vous pouvez mettre ceci dans un fichier `~/.auth0.env` et exécuter `source ~/.auth0.env` pour remplacer les paramètres par défaut de Keycloak par Auth0 et démarrer votre application avec Maven ou Gradle. Vous devriez pouvoir vous connecter avec les identifiants que vous avez enregistrés.

_Remarque_: Si vous êtes sur `Windows`, vous devez installer [WSL](https://docs.microsoft.com/fr-fr/windows/wsl/install-win10) pour que la commande `source` fonctionne.

<a name="create-native-app-auth0"></a>
#### Créer une application native pour mobile sur Auth0

Si vous développez une application mobile avec les modèles [Ionic](https://github.com/jhipster/generator-jhipster-ionic) ou [React Native](https://github.com/jhipster/generator-jhipster-react-native) de JHipster, vous devrez créer une application native sur Auth0 si vous utilisez OIDC.

1. Créez une application **Native** et ajoutez les URLs de rappel autorisées suivantes :

    - Ionic : `http://localhost:8100/callback,dev.localhost.ionic:/callback`
    - React Native : `http://localhost:19006/,https://auth.expo.io/@<nom-utilisateur>/<nom-application>`

2. Définissez les URLs de déconnexion autorisées sur :

    - Ionic : `http://localhost:8100/logout,dev.localhost.ionic:/logout`
    - React : `http://localhost:19006/,https://auth.expo.io/@<nom-utilisateur>/<nom-application>`

3. Définissez les origines autorisées (CORS) :

    - Ionic : `http://localhost:8100,capacitor://localhost,http://localhost`
    - React Native : `http://localhost:19006`

#### Mettez à jour votre application Ionic

Mettez à jour `ionic/src/environments/environment.ts` pour utiliser l'ID client généré. La valeur de `server_host` sera recherchée dans votre application JHipster (à `/api/auth-info`), mais vous pouvez la définir comme valeur de secours. Vous devrez également spécifier l'audience. Par exemple :

```ts
const oidcConfig: IAuthConfig = {
  client_id: '<id-client-native>',
  server_host: 'https://<votre-domaine-auth0>/',
  ...
};

export const environment = {
  ...
  audience: 'https://<votre-domaine-auth0>/api/v2/',
  ...
};
```

Redémarrez votre application Ionic et connectez-vous avec Auth0 !

#### Mettez à jour votre application React Native

Copiez l'ID client dans `app/config/app-config.js`.

Mettez à jour l'audience dans `app/modules/login/login.utils.ts` :

```ts
audience: 'https://<votre-domaine-auth0>/api/v2/',
```

Redémarrez votre application React Native et connectez-vous avec Auth0 !

### Okta

Si vous souhaitez utiliser Okta au lieu de Keycloak, c'est assez rapide en utilisant le [Okta CLI](https://cli.okta.com/). Après l'avoir installé, exécutez :

```shell
okta register
```

Ensuite, dans le répertoire de votre application JHipster, exécutez `okta apps create jhipster`. Cela configurera une application Okta pour vous, créera les groupes `ROLE_ADMIN` et `ROLE_USER`, créera un fichier `.okta.env` avec vos paramètres Okta, et configurera une réclamation `groups` dans votre jeton d'identification.

Exécutez `source .okta.env` et démarrez votre application avec Maven ou Gradle. Vous devriez pouvoir vous connecter avec les identifiants que vous avez enregistrés.

Si vous êtes sur Windows, vous devez installer [WSL](https://docs.microsoft.com/fr-fr/windows/wsl/install-win10) pour que la commande `source` fonctionne.

Si vous souhaitez configurer les choses manuellement via la Console d'Administration Okta, voir les instructions ci-dessous.

#### Créer une application OIDC avec la Console d'Administration Okta

Tout d'abord, vous devrez créer un compte développeur gratuit sur <https://developer.okta.com/signup>. Après cela, vous obtiendrez votre propre domaine Okta, qui aura un nom comme `https://dev-123456.okta.com`.

Modifiez `src/main/resources/config/application.yml` pour utiliser vos paramètres Okta. Astuce : remplacez `{votreDomaineOkta}` par le nom de votre organisation (par exemple, `dev-123456.okta.com`).

```yaml
security:
  oauth2:
    client:
      provider:
        oidc:
          issuer-uri: https://{votreDomaineOkta}/oauth2/default
      registration:
        oidc:
          client-id: {id-client}
          client-secret: {secret-client}
          scope: openid,profile,email
```

Créez une application OIDC dans Okta pour obtenir un `{id-client}` et `{secret-client}`. Pour ce faire, connectez-vous à votre compte développeur Okta et accédez à **Applications** > **Applications** > **Add Application** > **Create New App**. Sélectionnez **Web**, **OpenID Connect**, et cliquez sur **Create**. Donnez un nom à l'application que vous vous souviendrez, et spécifiez `http://localhost:8080/login/oauth2/code/oidc` comme URI de redirection de connexion. Ajoutez `http://localhost:8080` comme URI de redirection de déconnexion et cliquez sur **Save**. Copiez l'ID client et le secret dans votre fichier `application.yml`.

Créez un groupe `ROLE_ADMIN` et `ROLE_USER` (**Directory** > **Groups** > **Add Group**) et ajoutez des utilisateurs à ceux-ci. Vous pouvez utiliser le compte avec lequel vous vous êtes inscrit, ou créer un nouvel utilisateur (**Directory** > **People** > **Add Person**). Accédez à **Security** > **API** > **Authorization Servers**, et cliquez sur le serveur `default`. Cliquez sur l'onglet **Claims** et **Add Claim**. Nommez-le `groups`, et incluez-le dans le jeton d'identification. Définissez le type de valeur sur `Groups` et définissez le filtre comme une expression régulière de `.*`. Cliquez sur **Create**.

<img src="/images/security-add-claim.png" alt="Add Claim" width="600" style="margin: 10px">

Après avoir apporté ces modifications, vous devriez être prêt à partir ! Si vous rencontrez des problèmes, veuillez les signaler sur [Stack Overflow](https://stackoverflow.com/questions/tagged/jhipster). Assurez-vous de taguer votre question avec "jhipster" et "okta".

Pour utiliser Okta lors de l'exécution des tests de bout en bout, vous pouvez définir des variables d'environnement.

```shell
export CYPRESS_E2E_USERNAME=<votre-nom-utilisateur>
export CYPRESS_E2E_PASSWORD=<votre-mot-de-passe>
```

Si vous utilisez Protractor, supprimez le préfixe `CYPRESS_`.

#### Utiliser des variables d'environnement

Vous pouvez également utiliser des variables d'environnement pour remplacer les valeurs par défaut. Par exemple :

```bash
export SPRING_SECURITY_OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER_URI="https://{votreDomaineOkta}/oauth2/default"
export SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_OIDC_CLIENT_ID="{id-client}"
export SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_OIDC_CLIENT_SECRET="{secret-client}"
```

Vous pouvez mettre ceci dans un fichier `~/.okta.env` et exécuter `source ~/.okta.env` pour remplacer Keycloak par Okta.

Vous pouvez ensuite définir ces propriétés lorsque vous déployez sur Heroku :

```bash
heroku config:set \
  SPRING_SECURITY_OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER_URI="$SPRING_SECURITY_OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER_URI" \
  SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_OIDC_CLIENT_ID="$SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_OIDC_CLIENT_ID" \
  SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_OIDC_CLIENT_SECRET="$SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_OIDC_CLIENT_SECRET"
```

<a name="create-native-app-okta"></a>
#### Créer une application native pour mobile sur Okta

Si vous développez une application mobile avec les modèles [Ionic](https://github.com/jhipster/generator-jhipster-ionic) ou [React Native](https://github.com/jhipster/generator-jhipster-react-native) de JHipster, vous devrez créer une application native sur Okta si vous utilisez OIDC.

En utilisant le [Okta CLI](https://cli.okta.com), exécutez `okta apps create`. Sélectionnez le nom d'application par défaut, ou changez-le comme vous le souhaitez. Choisissez **Native** et appuyez sur **Entrée**.

- **Ionic** : Modifiez l'URI de redirection en `[http://localhost:8100/callback,dev.localhost.ionic:/callback]` et l'URI de déconnexion en `[http://localhost:8100/logout,dev.localhost.ionic:/logout]`.
- **React Native** : Utilisez `[http://localhost:19006/,https://auth.expo.io/@<nom-utilisateur>/<nom-application>]` pour les URIs de redirection.

**REMARQUE :** `dev.localhost.ionic` est le schéma par défaut, mais vous pouvez également utiliser quelque chose de plus traditionnel comme `com.okta.dev-133337` (où `dev-133337.okta.com` est l'URL de votre organisation Okta). Si vous le changez, assurez-vous de mettre à jour le `scheme` dans le fichier `src/environments/environment.ts` de votre application Ionic.

Le Okta CLI créera une application OIDC dans votre organisation Okta. Il ajoutera les URIs de redirection que vous avez spécifiés et accordera l'accès au groupe Everyone.

```shell
Configuration de l'application Okta :
Émetteur :    https://dev-133337.okta.com/oauth2/default
ID client : 0oab8eb55Kb9jdMIr5d6
```

**REMARQUE :** Vous pouvez également utiliser la Console d'Administration Okta pour créer votre application. Consultez [Créer une application native](https://developer.okta.com/docs/guides/sign-into-mobile-app/create-okta-application/) pour plus d'informations.

#### Mettez à jour votre application Ionic

Ouvrez `ionic/src/environments/environment.ts` et ajoutez l'ID client de votre application Native. La valeur de `server_host` sera recherchée dans votre application JHipster (à `/api/auth-info`), mais vous pouvez la définir comme valeur de secours. Par exemple :

```ts
oidcConfig: {
  client_id: '<id-client-native>',
  server_host: 'https://<votre-domaine-okta>/oauth2/default',
  ...
}
```

Vous devrez également ajouter une origine de confiance pour `http://localhost:8100`. Dans votre Console d'Administration Okta, accédez à **Sécurité** > **API** > **Origines de confiance** > **Ajouter une origine**. Utilisez les valeurs suivantes :

- Nom : `http://localhost:8100`
- URL d'origine : `http://localhost:8100`
- Type : Cochez **les deux** CORS et Redirect

Cliquez sur **Enregistrer**.

Redémarrez votre application Ionic et connectez-vous avec Okta !

#### Mettez à jour votre application React Native

Copiez l'ID client dans `app/config/app-config.js`.

Redémarrez votre application Ionic et connectez-vous avec Okta !

#### Tutoriels OpenID Connect

Consultez [Utiliser le support OpenID Connect avec JHipster](https://developer.okta.com/blog/2017/10/20/oidc-with-jhipster) pour en savoir plus sur JHipster 5 et OIDC avec Okta.

Si vous utilisez JHipster 6, consultez [Meilleur, Plus Rapide, Plus Léger Java avec Java 12 et JHipster 6](https://developer.okta.com/blog/2019/04/04/java-11-java-12-jhipster-oidc). Si vous utilisez des microservices avec JHipster 6, consultez [Microservices Java avec Spring Cloud Config et JHipster](https://developer.okta.com/blog/2019/05/23/java-microservices-spring-cloud-config).

Pour JHipster 7, consultez [Microservices Java Réactifs avec Spring Boot et JHipster](https://developer.okta.com/blog/2021/01/20/reactive-java-microservices).

Le blog des développeurs d'Okta a également de l'amour pour Micronaut et Quarkus :

- [Construire une application sécurisée Micronaut et Angular avec JHipster](https://developer.okta.com/blog/2020/08/17/micronaut-jhipster-heroku)
- [Le Java Rapide Facile avec Quarkus et JHipster](https://developer.okta.com/blog/2021/03/08/jhipster-quarkus-oidc)

<h2 id="https">HTTPS</h2>

Vous pouvez forcer l'utilisation de HTTPS en ajoutant la configuration suivante à votre `SecurityConfiguration.java`.

```java
// Spring MVC
http.requiresChannel(channel -> channel
    .requestMatchers(r -> r.getHeader("X-Forwarded-Proto") != null).requiresSecure());
    
// WebFlux
http.redirectToHttps(redirect -> redirect
    .httpsRedirectWhen(e -> e.getRequest().getHeaders().containsKey("X-Forwarded-Proto")));
```

Consultez la documentation de Spring Security sur [Servlet](https://docs.spring.io/spring-security/site/docs/5.5.x/reference/html5/#servlet-http-redirect) et [WebFlux](https://docs.spring.io/spring-security/site/docs/5.5.x/reference/html5/#webflux-http-redirect) pour plus d'informations.

Cela a été testé et est connu pour fonctionner sur Heroku et Google Cloud. Pour plus de conseils de production sur Heroku, voir [Préparer une application Spring Boot pour la production sur Heroku](https://devcenter.heroku.com/articles/preparing-a-spring-boot-app-for-production-on-heroku).

<h2 id="implementation-details">Fuite de détails d'implémentation</h2>

Chaque échec/exception est associé à une [structure de données de problème](https://github.com/zalando/problem) et renvoyé au client.

```json
{  
  "type": "https://www.jhipster.tech/problem/problem-with-message",
  "title": "Service Indisponible",
  "status": 503,
  "detail": "Base de données non accessible"
}
```

Bien que JHipster n'inclut aucun stacktrace par défaut, le `detail` contient le `message` d'une exception qui pourrait [révéler des détails techniques](https://github.com/jhipster/generator-jhipster/issues/12051) que vous ne souhaitez pas exposer via l'API.

```json
{  
  "type": "https://www.jhipster.tech/problem/problem-with-message",
  "title": "Requête Incorrecte",
  "status": 400,
  "detail": "Erreur d'analyse JSON : Impossible de désérialiser l'instance de `java.util.LinkedHashMap<java.lang.Object,java.lang.Object>` à partir du jeton VALUE_NUMBER_INT ; l'exception imbriquée est com.fasterxml.jackson.databind.exc.MismatchedInputException: Impossible de désérialiser l'instance de `java.util.LinkedHashMap<java.lang.Object,java.lang.Object>` à partir du jeton VALUE_NUMBER_INT\n à [Source: (PushbackInputStream); ligne: 1, colonne: 1]"
}
```

Pour prévenir cela, JHipster fournit un mécanisme dédié pour atténuer la fuite de détails d'implémentation en

* vérifiant les exceptions bien connues et en remplaçant le message par un message générique (par exemple, `Impossible de convertir le message http`)
* vérifiant si le message contient des noms de package potentiels (par exemple, `java.` ou `.org`) et en remplaçant le message par un message générique (par exemple, `Exception d'exécution inattendue`)

Les journaux contiennent toujours l'exception détaillée afin que vous puissiez toujours identifier le véritable problème tandis qu'un attaquant de l'extérieur n'est pas en mesure de 
gagner des détails techniques précieux en utilisant abusivement votre API.

Dans le cas où vous devez modifier la logique (par exemple, le message contient toujours des détails techniques mais n'a pas été détecté), vous pouvez le faire en 
ajoutant la logique requise à la méthode `prepare` dans `ExceptionTranslator.java`.
