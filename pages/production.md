---
layout: default
title:  Utiliser JHipster en production
permalink: /production/
redirect_from:
  - /production.html
sitemap:
    priority: 0.7
    lastmod: 2021-03-08T12:00:00-00:00
---

# <i class="fa fa-play-circle"></i> Utiliser JHipster en production

JHipster génère une application entièrement prête pour la production, optimisée et sécurisée. Cette section décrit les options les plus importantes - si vous êtes pressé, exécutez une construction de production normale, mais n'oubliez pas de lire la section sur la sécurité !

1. [Construction d'un package de production](#build)
2. [Exécution en production](#run)
3. [Optimisations des performances](#performance)
4. [Sécurité](#security)
5. [Surveillance](#monitoring)

<h2 id="build">Construction d'un package de production</h2>

### Tester une construction de production

Cela permet de tester une construction de production à partir de Maven, sans construire un package réel.

Pour utiliser JHipster en mode "production", utilisez le profil préconfiguré `prod`. Avec Maven, veuillez exécuter :

`./mvnw -Pprod`

Lorsque vous utilisez Gradle, veuillez exécuter :

`./gradlew -Pprod`

Ce profil compilera, testera et emballera votre application avec tous les paramètres de production.

Si vous souhaitez plus d'informations sur les profils disponibles, veuillez consulter la section intitulée "[Profils de développement et de production]({{ site.url }}/profiles/)".

### Construction d'un fichier JAR / WAR exécutable

#### Avec Maven

- Pour empaqueter l'application en tant que JAR "production", veuillez taper :

    `./mvnw -Pprod clean verify`

    Cela générera un fichier `target/jhipster-0.0.1-SNAPSHOT.jar` (si votre application s'appelle "jhipster").

- Pour empaqueter l'application en tant que WAR "production" :

    - Modifiez le `pom.xml` pour changer l'emballage de l'application en `war` comme suit :

    ```diff
    -    <packaging>jar</packaging>
    +    <packaging>war</packaging>
    ``` 
    
    - Modifiez le `pom.xml` pour changer la portée de la dépendance `spring-boot-starter-undertow` en `provided` comme suit :

    ```diff
        <id>prod</id>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-undertow</artifactId>
    +           <scope>provided</scope>
            </dependency>
        </dependencies>
    ``` 
    - Pour générer un `war` exécutable avec le `war` d'origine, tapez la commande : 
    
    ```bash
    ./mvnw -Pprod clean verify
    ```
  - Cela générera ces fichiers (si votre application s'appelle "jhipster"): 
   
    * `target/jhipster-0.0.1-SNAPSHOT.war`
    * `target/jhipster-0.0.1-SNAPSHOT.war.original` 

**Veuillez noter** que lors de la construction d'un fichier JAR ou WAR avec le profil `prod`, l'archive générée n'inclura pas les ressources `dev`.


#### Avec Gradle
Pour empaqueter l'application en tant que JAR "production", veuillez taper :

`./gradlew -Pprod clean bootJar`

Cela générera un fichier `build/libs/jhipster-0.0.1-SNAPSHOT.jar` (si votre application s'appelle "jhipster").


Pour empaqueter l'application en tant que WAR "production", veuillez taper :

`./gradlew -Pprod -Pwar clean bootWar`


<h2 id="run">Exécution en production</h2>

### Exécution du fichier JAR sans serveur d'application

Au lieu de déployer sur un serveur d'application, beaucoup de gens trouvent plus facile d'avoir un seul fichier JAR exécutable.

Avec le fichier JAR généré à l'étape précédente, vous pouvez l'exécuter en mode "production" en tapant (sur Mac OS X ou Linux) :

`./jhipster-0.0.1-SNAPSHOT.jar`

Si vous êtes sous Windows, utilisez :

`java -jar jhipster-0.0.1-SNAPSHOT.jar`

**Veuillez noter** que ce fichier JAR utilise le profil que nous avons sélectionné lors de sa construction. Comme il a été construit avec le fichier `prod` dans la section précédente, il fonctionnera donc avec le profil `prod`.

### Exécution de l'application dans un conteneur Docker

JHipster offre une prise en charge de premier ordre pour Docker : il regroupe votre fichier JAR exécutable dans une image Docker et l'exécute à l'intérieur de Docker.

Pour apprendre à empaqueter votre application avec Docker, veuillez lire notre [documentation Docker Compose]({{ site.url }}/docker-compose/).

### Exécution en tant que service

Il est également possible d'exécuter le Jar en tant que service Linux, et vous pouvez vouloir forcer dans votre fichier `pom.xml` avant l'emballage. Pour ce faire, ajoutez la propriété suivante à l'intérieur de `<configuration>` du plugin `spring-boot-maven-plugin`.

```
<embeddedLaunchScriptProperties>
    <mode>service</mode>
</embeddedLaunchScriptProperties>
```

Ensuite, configurez votre init.d avec : 

`ln -s jhipster-0.0.1-SNAPSHOT.jar /etc/init.d/jhipster`

Sécurisez votre application avec :

`chown jhuser:jhuser jhipster-0.0.1-SNAPSHOT.jar
sudo chattr +i your-app.jar`

Considérant `jhuser` un compte OS non-root qui exécutera l'application, alors l'application peut être exécutée de cette manière :

`service jhipster start|stop|restart`

Il existe de nombreuses autres options que vous pouvez trouver dans la [documentation Spring Boot](https://docs.spring.io/spring-boot/docs/current/reference/html/deployment-install.html), y compris plus d'étapes de sécurité et de service Windows.

<h2 id="performance">Optimisations des performances</h2>

### Optimisation du cache

Si vous avez sélectionné un fournisseur de cache lors de la génération de votre application, il a été automatiquement configuré pour vous par JHipster.

Cependant, les valeurs par défaut du cache sont assez basses, de sorte que l'application peut s'exécuter sur un matériel modeste, et ces valeurs doivent être ajustées en fonction des besoins spécifiques de votre application.

Veuillez lire :

- [La documentation JHipster "utilisation du cache"]({{ site.url }}/using-cache/) pour en savoir plus sur le fournisseur de cache que vous avez sélectionné, et comment il peut être ajusté
- La [dernière section sur la surveillance](#monitoring), pour pouvoir ajuster votre cache en fonction de l'utilisation réelle de votre application

### Support HTTP/2

JHipster prend en charge HTTP/2 en utilisant la propriété `jhipster.http.version`, qui est configurée dans le fichier `application-prod.yml`.

Pour activer HTTP/2, vous devez :

- Définir `jhipster.http.version: V_2_0`
- Configurer HTTPS (voir la [section sécurité](#security) de cette documentation), car les navigateurs imposent l'utilisation de HTTPS avec HTTP/2

### Compression GZip

Dans un fichier JAR exécutable, qui utilise le profil `prod`, JHipster configure la compression GZip sur vos ressources Web.

Par défaut, la compression fonctionnera sur toutes les ressources statiques (HTML, CSS, JavaScript) et sur toutes les requêtes REST. Vous pouvez obtenir plus d'informations sur cette configuration en consultant les clés `server.compression.*` dans les propriétés de l'application Spring Boot, configurées dans le fichier `application-prod.yml`.

**Veuillez noter** que la compression GZip est effectuée par le serveur d'application, donc cette section s'applique uniquement si vous utilisez l'option "JAR exécutable" décrite ci-dessus. Si vous exécutez votre application dans un serveur d'application externe, vous devrez le configurer séparément.

### En-têtes de cache

Avec le profil `prod`, JHipster configure un filtre Servlet qui place des en-têtes de cache HTTP spécifiques sur vos ressources statiques (JavaScript, CSS, polices...) afin qu'elles soient mises en cache par les navigateurs et les proxies.

### Génération d'une application JavaScript optimisée avec Webpack

Cette étape est automatiquement déclenchée lors de la construction de votre projet avec le profil `prod`. Si vous voulez l'exécuter sans lancer une construction Maven, veuillez exécuter :

`npm run build`

Cela utilisera [Webpack](https://webpack.github.io/) pour traiter toutes vos ressources statiques (CSS, TypeScript, HTML, JavaScript, images...) afin de générer une application côté client optimisée.

Pendant ce processus, Webpack compilera le code TypeScript en code JavaScript, et générera également des cartes source, afin que l'application côté client puisse toujours être déboguée.

Ces ressources optimisées seront générées dans `target/classes/static` pour Maven ou `build/resources/main/static` pour Gradle, et seront incluses dans votre fichier JAR de production final.

Ce code sera servi lorsque vous exécutez l'application avec le profil `prod`.

<h2 id="security">Sécurité</h2>

### Sécurisation des comptes utilisateur et administrateur par défaut

JHipster est livré avec certains utilisateurs par défaut générés pour vous. En production, vous **devriez** changer ces mots de passe par défaut !

Veuillez suivre notre [documentation sur la sécurité]({{ site.url }}/security/) pour apprendre comment changer ces mots de passe, et sécuriser votre application.

### Support HTTPS

HTTPS peut être configuré directement dans votre application JHipster, ou en utilisant un proxy frontal spécifique.

#### Configuration HTTPS avec JHipster

HTTPS est configuré en utilisant les clés de configuration `server.ssl` standard de Spring Security dans votre fichier `application-prod.yml`.

Pour activer SSL, générez un certificat en utilisant :

    keytool -genkey -alias <votre-application> -storetype PKCS12 -keyalg RSA -keysize 2048 -keystore keystore.p12 -validity 3650

Vous pouvez également utiliser Let's Encrypt en suivant [ce tutoriel](https://community.letsencrypt.org/t/tutorial-java-keystores-jks-with-lets-encrypt/34754).

Ensuite, modifiez les propriétés `server.ssl` pour que votre configuration `application-prod.yml` ressemble à :

    server:
        port: 443
        ssl:
            key-store: keystore.p12
            key-store-password: <votre-mot-de-passe>
            keyStoreType: PKCS12
            keyAlias: <votre-application>
            ciphers: TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256, TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384, TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA, TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA, TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256, TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384, TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256, TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384, TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA, TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA, TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256, TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384, TLS_DHE_RSA_WITH_AES_128_GCM_SHA256, TLS_DHE_RSA_WITH_AES_256_GCM_SHA384, TLS_DHE_RSA_WITH_AES_128_CBC_SHA, TLS_DHE_RSA_WITH_AES_256_CBC_SHA, TLS_DHE_RSA_WITH_AES_128_CBC_SHA256, TLS_DHE_RSA_WITH_AES_256_CBC_SHA256
            enabled-protocols: TLSv1.2

La suite de chiffrement renforce la sécurité en désactivant certains anciens chiffrements SSL obsolètes, cette liste a été testée avec [SSL Labs](https://www.ssllabs.com/ssltest/)

Une fois que la propriété `server.ssl.ciphers` est activée, JHipster forcera l'ordre sur Undertow avec cette propriété (vrai par défaut) : `jhipster.http.useUndertowUserCipherSuitesOrder`

Les `enabled-protocols` désactivent les anciens protocoles SSL.

Ensuite, la touche finale pour atteindre le secret parfait. Ajoutez le drapeau suivant au démarrage de la JVM :

    -Djdk.tls.ephemeralDHKeySize=2048

Pour tester votre configuration, vous pouvez aller sur [SSL Labs](https://www.ssllabs.com/ssltest/).

Si tout est OK, vous obtiendrez un A+

#### Configuration HTTPS avec un proxy frontal

Il existe de nombreuses solutions pour configurer un proxy frontal HTTPS devant une application JHipster.

L'une des solutions les plus courantes consiste à utiliser le serveur Apache HTTP, que vous pouvez configurer avec Let's Encrypt :

- Installer Apache et Let's Encrypt : `apt-get install -y apache2 python-certbot-apache`
- Configurer Let's Encrypt : `certbot --apache -d <votre-domaine.com> --agree-tos -m <votre-email> --redirect`
- Configurer le renouvellement automatique des certificats SSL : ajoutez `10 3 * * * /usr/bin/certbot renew --quiet` dans votre crontab

### Chemin de contexte personnalisé

Vous pouvez spécifier un chemin de contexte pour votre backend Spring Boot en passant un paramètre `server.servlet.context-path` et une valeur :

```bash
java -jar jhipster.jar --server.servlet.context-path=/jhipster/
```

Ou, vous pouvez ajouter cette configuration à `application.yml` :

```
---
server:
  servlet:
    context-path: /jhipster/
```

Pour les bundlers frontend, le chemin de contexte est une configuration de construction.

Les frontaux **Angular** peuvent être configurés en utilisant :
- `angular.json` : `projects -> * nom de votre projet -> architect -> build -> options -> baseHref : '/jhipster/'`
- `ng build --base-href '/jhipster/'`
- Utilisez [APP_BASE_HREF](https://angular.io/api/common/APP_BASE_HREF)

Pour les frontaux **Webpack-based**, vous pouvez configurer en utilisant :

- Fichier de configuration Webpack :
```
new HtmlWebpackPlugin({
    ...
    base: '/jhipster/'
})
```

D'autres modifications peuvent être nécessaires, comme la configuration de votre serveur de développement et l'ajustement des iframes dans des pages comme swagger-ui.

**Veuillez noter** qu'utiliser un chemin de base relatif comme `./` est possible, mais vous devez ajuster d'autres configurations pour être compatible avec cela.

<h2 id="monitoring">Surveillance</h2>

JHipster est livré avec une prise en charge complète de la surveillance avec [Micrometer](https://micrometer.io/).

En développement, les données de métriques seront disponibles via JMX : lancez votre JConsole et vous pourrez y accéder

En production, votre application expose ses données de métriques sur un point de terminaison qu'un [serveur Prometheus](https://prometheus.io/docs/introduction/overview/) peut scraper à intervalles réguliers, en fonction de ce que vous avez configuré.
