---
layout: default
title: Registre JHipster
permalink: /jhipster-registry/
sitemap:
    priority: 0.7
    lastmod: 2019-02-01T00:00:00-00:00
---

# <i class="fa fa-dashboard"></i> Le registre JHipster (**obsolète** - Utilisez Consul à la place)

## Aperçu

Le registre JHipster est une application en cours d'exécution, fournie par l'équipe JHipster. Comme le générateur JHipster, c'est une application Open Source, sous licence Apache 2, et son code source est disponible sur GitHub sous l'organisation JHipster à l'adresse [jhipster/jhipster-registry](https://github.com/jhipster/jhipster-registry).

Le registre JHipster a trois objectifs principaux :

- Il s'agit d'un serveur [Eureka](https://cloud.spring.io/spring-cloud-netflix/spring-cloud-netflix.html) qui sert de serveur de découverte pour les applications. Ce serveur maintient et distribue une liste dynamique des instances d'application disponibles, utilisées ensuite par les microservices pour le routage des requêtes HTTP et l'équilibrage de charge.
- Il s'agit d'un serveur de configuration Spring Cloud Config, qui fournit une configuration à toutes les applications.
- Il s'agit d'un serveur d'administration, avec des tableaux de bord pour surveiller et gérer les applications.

Toutes ces fonctionnalités sont regroupées dans une application pratique avec une interface utilisateur moderne basée sur Angular.

![]({{ site.url }}/images/jhipster-registry-animation.gif)

## Sommaire

1. [Installation](#installation)
2. [Découverte de service avec Eureka](#eureka)
3. [Configuration d'application avec Spring Cloud Config](#spring-cloud-config)
4. [Tableaux de bord d'administration](#dashboards)
5. [Sécurisation du registre JHipster](#security)

<h2 id="installation">Installation</h2>

### Profils Spring

Le registre JHipster utilise les profils Spring `dev` et `prod` habituels, ainsi que le profil `composite` standard de Spring Cloud Config (Voir [documentation officielle](https://cloud.spring.io/spring-cloud-config/multi/multi__spring_cloud_config_server.html#composite-environment-repositories)).

En conséquence :

- L'utilisation du profil `dev` exécutera le registre JHipster avec les profils `dev` et `composite`. Le profil `dev` chargera la configuration Spring Cloud à partir du système de fichiers, en recherchant le répertoire `central-config`, qui est relatif au répertoire en cours d'exécution, défini dans le fichier `src/main/resources/config/bootstrap.yml`.
- L'utilisation du profil `prod` exécutera le registre JHipster avec les profils `prod` et `composite`. Le profil `prod` chargera la configuration Spring Cloud à partir d'un dépôt Git, qui est par défaut [https://github.com/jhipster/jhipster-registry-sample-config](https://github.com/jhipster/jhipster-registry-sample-config). Dans une utilisation réelle, ce dépôt devrait être modifié, soit en le reconfigurant dans le fichier `src/main/resources/config/bootstrap-prod.yml`, soit en reconfigurant la propriété Spring `spring.cloud.config.server.composite`.

Une fois le registre JHipster en cours d'exécution, vous pouvez vérifier sa configuration dans le menu `Configuration > Cloud Config`. Veuillez noter que si vous ne pouvez pas vous connecter, cela peut être dû à une configuration incorrecte de la clé de signature JWT, ce qui est un signe que votre configuration n'est pas bonne.

### Utilisation du fichier JAR pré-emballé

Le registre JHipster est disponible sous forme de fichier JAR exécutable sur notre [page des versions](https://github.com/jhipster/jhipster-registry/releases).

Téléchargez le fichier JAR et exécutez-le comme une application JHipster habituelle, en utilisant le profil que vous souhaitez utiliser (voir la section précédente sur les profils). Par exemple, pour l'exécuter en utilisant une configuration Spring Cloud Config stockée dans le répertoire `central-config` :

    java -jar jhipster-registry-<version>.jar --spring.security.user.password=admin --jhipster.security.authentication.jwt.secret=my-secret-key-which-should-be-changed-in-production-and-be-base64-encoded --spring.cloud.config.server.composite.0.type=native --spring.cloud.config.server.composite.0.search-locations=file:./central-config

Veuillez noter qu'il est important de fournir une clé secrète JWT au registre au démarrage, soit via la variable d'environnement `JHIPSTER_SECURITY_AUTHENTICATION_JWT_SECRET`, soit avec des arguments comme indiqué ci-dessus. Une autre façon possible est de définir cette valeur dans le fichier `application.yml` de votre source de configuration centralisée (qui est chargée au démarrage par toutes vos applications, y compris le registre).

Veuillez noter que depuis JHipster 5.3.0, nous avons une nouvelle propriété `jhipster.security.authentication.jwt.base64-secret`, qui est plus sécurisée, mais comme vous pourriez encore utiliser des versions plus anciennes
nous utilisons `jhipster.security.authentication.jwt.secret` dans cette documentation. Plus d'informations sur ces propriétés sont disponibles dans notre [documentation sur la sécurité]({{ site.url }}/security/).

De même, pour exécuter le registre avec le profil `prod`, adaptez les arguments à votre configuration, par exemple :

    java -jar jhipster-registry-<version>.jar --spring.profiles.active=prod --spring.security.user.password=admin --jhipster.security.authentication.jwt.secret=my-secret-key-which-should-be-changed-in-production-and-be-base64-encoded --spring.cloud.config.server.composite.0.type=git --spring.cloud.config.server.composite.0.uri=https://github.com/jhipster/jhipster-registry-sample-config

    java -jar jhipster-registry-<version>.jar --spring.profiles.active=prod --spring.security.user.password=admin --jhipster.security.authentication.jwt.secret=my-secret-key-which-should-be-changed-in-production-and-be-base64-encoded --spring.cloud.config.server.composite.0.type=git --spring.cloud.config.server.composite.0.uri=https://github.com/jhipster/jhipster-registry --spring.cloud.config.server.composite.0.search-paths=central-config

### Compilation à partir des sources

Le registre JHipster peut être cloné/forké/téléchargé directement depuis [jhipster/jhipster-registry](https://github.com/jhipster/jhipster-registry). Comme le registre JHipster est également une application générée par JHipster, vous pouvez l'exécuter comme n'importe quelle autre application JHipster :

- exécutez-le en développement avec `./mvnw` (pour le serveur Java) et `npm start` (pour gérer l'interface frontale), il utilisera par défaut le profil `dev` et sera disponible à [http://127.0.0.1:8761/](http://127.0.0.1:8761/).
- utilisez `./mvnw -Pprod package` pour le mettre en production et générer le fichier JAR exécutable JHipster habituel. Vous pouvez ensuite exécuter le fichier JAR en utilisant le profil Spring `dev` ou `prod`, par exemple : `java -jar jhipster-registry-<version>.jar --spring.profiles.active=prod`

Veuillez noter que pour utiliser les profils `dev` et `composite`, vous devez avoir un répertoire `central-config` avec votre configuration, donc si vous exécutez `java -jar jhipster-registry-<version>.jar --spring.profiles.active=dev`, vous devez avoir ce répertoire configuré.

### Utilisation de Docker

Si vous préférez exécuter le Registre JHipster à partir d'une image Docker, elle est disponible sur Docker Hub à [jhipster/jhipster-registry](https://hub.docker.com/r/jhipster/jhipster-registry/). Un fichier docker-compose pour exécuter cette image est déjà présent dans le répertoire `src/main/docker` de chaque microservice :

- exécutez `docker-compose -f src/main/docker/jhipster-registry.yml up` pour démarrer le Registre JHipster. Il sera disponible sur le port `8761` de votre hôte Docker, donc s'il s'exécute sur votre machine, il devrait être à [http://127.0.0.1:8761/](http://127.0.0.1:8761/).

Veuillez lire notre [documentation sur Docker Compose]({{ site.url }}/docker-compose/) pour plus d'informations sur l'utilisation du Registre JHipster avec Docker Compose.

### Exécution dans le cloud

Vous pouvez exécuter une instance du Registre JHipster dans le cloud. C'est obligatoire en production, mais cela peut également être utile en développement (il n'est pas nécessaire de l'exécuter sur votre ordinateur portable).

Veuillez lire [la documentation sur les "microservices en production"]({{ site.url }}/microservices-in-production/) pour apprendre comment déployer le Registre JHipster sur Cloud Foundry ou sur Heroku.

<h2 id="eureka">Découverte de services avec Eureka</h2>

![]({{ site.url }}/images/jhipster-registry-eureka.png)

Le Registre JHipster est un [serveur Eureka de Netflix](https://github.com/Netflix/eureka), qui fournit la découverte de services pour toutes les applications.

- Ceci est très utile pour les architectures de microservices : c'est ainsi que les passerelles savent quels microservices sont disponibles et quels sont les instances en cours
- Pour toutes les applications, y compris les monolithes, c'est ainsi que le cache distribué Hazelcast peut s'adapter automatiquement, voir [la documentation sur le cache Hazelcast]({{ site.url }}/using-cache/)

<h2 id="spring-cloud-config">Configuration d'application avec Spring Cloud Config</h2>

![]({{ site.url }}/images/jhipster-registry-spring-cloud-config.png)

Le Registre JHipster est un [Serveur de configuration Spring Config](http://cloud.spring.io/spring-cloud-config/spring-cloud-config.html) : lorsque les applications sont lancées, elles se connectent d'abord au Registre JHipster pour obtenir leur configuration. Cela est vrai à la fois pour les passerelles et les microservices.

Cette configuration est une configuration Spring Boot, comme celle trouvée dans les fichiers `application-*.yml` de JHipster, mais elle est stockée dans un serveur central, ce qui la rend plus facile à gérer.

Au démarrage, vos applications de passerelle et de microservices interrogeront le serveur de configuration du Registre et écraseront leurs propriétés locales par celles définies là-bas.

Deux types de sources de configuration sont disponibles (définies par la propriété `spring.cloud.config.server.composite`):

- Une configuration `native`, qui est utilisée par défaut en développement (en utilisant le profil `dev` de JHipster), et qui utilise le système de fichiers local.
- Une configuration `Git`, qui est utilisée par défaut en production (en utilisant le profil `prod` de JHipster), et qui stocke la configuration dans un serveur Git. Cela permet de marquer, brancher ou annuler les configurations en utilisant les outils Git habituels, qui sont très puissants dans ce cas d'utilisation.

Pour gérer votre configuration centralisée, vous devez ajouter des fichiers `appname-profile.yml` dans votre source de configuration où **appname** et **profile** correspondent au nom de l'application et au profil actuel du service que vous souhaitez configurer.
Par exemple, en ajoutant des propriétés dans un fichier `gateway-prod.yml` définira ces propriétés uniquement pour l'application nommée **gateway** démarrée avec un profil **prod**. De plus, les propriétés définies dans `application[-dev|prod].yml` seront définies pour toutes vos applications.

Comme les routes de la passerelle sont configurées à l'aide de Spring Boot, elles peuvent également être gérées à l'aide du Serveur de configuration Spring, par exemple vous pourriez mapper l'application `app1-v1` sur l'URL `/app1` dans votre branche `v1`, et mapper l'application `app1-v2` sur l'URL `/app1` dans votre branche `v2`. C'est une bonne façon de mettre à niveau les microservices sans aucune interruption pour les utilisateurs finaux.

<h2 id="encryption">Utilisation de valeurs de configuration chiffrées</h2>

Le Registre JHipster dispose d'une page spécifique de `configuration > encryption` pour permettre le chiffrement et le déchiffrement des valeurs de configuration.

Pour chiffrer les valeurs de configuration (par exemple, les mots de passe de base de données), vous devez :

- téléchargez le [JCE](http://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html) et installez-le en suivant les instructions figurant dans les fichiers téléchargés (ceci est uniquement nécessaire si vous utilisez le JDK Oracle).
- définissez la propriété `encrypt.key` dans `bootstrap.yml` (et non pas dans `application.yml`) ou utilisez la variable d'environnement `ENCRYPT_KEY` avec votre phrase secrète de clé symétrique.

Si tout est configuré correctement, vous devriez pouvoir utiliser la page spécifique `Configuration > Encryption` et également envoyer des requêtes POST aux points de terminaison `/config/encrypt` et `/config/decrypt` avec le texte que vous souhaitez manipuler dans le `corps` des requêtes.

Par exemple : `curl localhost:8761/config/encrypt -d mypassword`

Le texte chiffré doit être placé dans n'importe quel fichier de configuration `*.yml`, sous la forme `password= '{cipher}myciphertextafterencryotion'` et il sera déchiffré par le serveur de configuration avant d'être envoyé à ses clients. De cette façon, vos fichiers de configuration (stockés dans Git ou stockés "nativement" sur votre système de fichiers) n'auront pas de valeurs en texte brut.

Pour plus d'informations, veuillez vous référer à la [documentation sur le chiffrement et le déchiffrement](http://cloud.spring.io/spring-cloud-config/spring-cloud-config.html#_encryption_and_decryption) de Spring Cloud Config.

<h2 id="dashboards">Tableaux de bord d'administration</h2>

Le Registre JHipster fournit des tableaux de bord d'administration, qui sont utilisés pour tous les types d'applications. Dès qu'une application s'enregistre sur le serveur Eureka, elle devient disponible dans les tableaux de bord.

Pour accéder aux informations sensibles des applications, le Registre JHipster utilisera un jeton JWT (c'est pourquoi le Registre JHipster ne fonctionne que pour les applications utilisant JWT). La clé JWT utilisée pour signer la requête doit être la même pour les applications et le Registre JHipster : comme par défaut le Registre JHipster configure les applications via Spring Cloud Config, cela devrait fonctionner directement, car il enverra la même clé à toutes les applications.

### Le tableau de bord des métriques

![]({{ site.url }}/images/jhipster-registry-metrics.png)

Le tableau de bord des métriques utilise Micrometer pour donner une vue détaillée des performances de l'application.

Il fournit des métriques sur :

- le JVM
- les requêtes HTTP
- l'utilisation du cache
- le pool de connexions de base de données

En cliquant sur le bouton d'extension à côté des métriques des threads JVM, vous obtiendrez une trace de la pile de l'application en cours d'exécution, ce qui est très utile pour identifier les threads bloqués.

Remarque : Comme nous avons basculé le Registre JHipster pour surveiller les métriques provenant de Micrometer au lieu des métriques Dropwizard, cela implique que toutes les applications JHipster générées avec la version 5.7.2 ou antérieure doivent être migrées vers Micrometer pour être surveillées avec le Registre JHipster. Si vous ne souhaitez pas migrer vos applications, veuillez utiliser le Registre JHipster v4.0.6 ou une version antérieure.

Pour migrer vos applications, vous pouvez utiliser le [sous-générateur de mise à niveau de JHipster]({{ site.url }}/upgrading-an-application/).

### Le tableau de bord de santé

![]({{ site.url }}/images/jhipster-registry-health.png)

Le tableau de bord de santé utilise le point de terminaison de santé de Spring Boot Actuator pour fournir des informations sur l'état de santé de diverses parties de l'application. 
De nombreux contrôles de santé sont fournis en standard par Spring Boot Actuator, et vous pouvez ajouter des contrôles de santé spécifiques à l'application.

### Le tableau de bord de configuration

![]({{ site.url }}/images/jhipster-registry-configuration.png)

Le tableau de bord de configuration utilise le point de terminaison de configuration de Spring Boot Actuator pour donner une vue complète de la configuration Spring de l'application actuelle.

### Le tableau de bord des journaux

![]({{ site.url }}/images/jhipster-registry-logs.png)

Le tableau de bord des journaux permet de gérer à l'exécution la configuration Logback de l'application en cours d'exécution. 
Vous pouvez changer le niveau de journalisation du package Java en cliquant sur un bouton, ce qui est très pratique aussi bien en développement qu'en production.

<h2 id="security">Sécurisation du Registre JHipster</h2>

Le Registre JHipster est sécurisé par défaut. Vous pouvez vous connecter en utilisant les identifiants habituels "admin/admin" qui sont utilisés dans les applications JHipster normales.

Les applications se connectent également au Registre JHipster en utilisant le même utilisateur "admin", mais utilisent l'authentification de base HTTP. Donc si vos microservices ne peuvent pas accéder au registre et que vous voyez des messages d'erreur "401 authentication error", c'est parce que vous avez mal configuré ces applications.

Pour sécuriser votre Registre JHipster :

- Vous devez changer le mot de passe "admin" par défaut. Ce mot de passe est défini en utilisant la propriété standard de Spring Boot `spring.security.user.password`, donc vous pouvez utiliser les mécanismes standard de Spring Boot pour le modifier : vous pourriez modifier les fichiers `application-*.yml` du projet, ou ajouter une variable d'environnement `SPRING_SECURITY_USER_PASSWORD`. Le [sous-générateur de Docker Compose]({{ site.url }}/docker-compose/) utilise la méthode de la variable d'environnement.
- Comme vos applications se connecteront au registre en utilisant HTTP, il est très important de sécuriser ce canal de connexion. Il existe de nombreuses façons de le faire, et la plus simple est probablement d'utiliser HTTPS.
