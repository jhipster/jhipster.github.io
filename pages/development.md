---
layout: default
title: Utilisation de JHipster en développement
permalink: /development/
redirect_from:
  - /development.html
sitemap:
    priority: 0.7
    lastmod: 2023-01-05T00:00:00-00:00
---

# <i class="fa fa-code"></i> Utilisation de JHipster en développement

_**Veuillez consulter notre [tutoriel vidéo]({{ site.url }}/video-tutorial/) sur la création d'une nouvelle application JHipster !**_

## Sommaire

1.  [Configuration générale](#configuration-generale)
2.  [Exécution du serveur Java](#execution-du-serveur-java)
3.  [Travailler avec Angular/React](#travailler-avec-angular-react)
4.  [Utilisation d'une base de données](#utilisation-d-une-base-de-donnees)
5.  [Internationalisation](#internationalisation)

<h2 id="configuration-generale">Configuration générale</h2>

### Configuration de l'IDE

Si vous n'avez pas encore configuré votre IDE, veuillez consulter la page [Configurer votre IDE]({{ site.url }}/configuring-ide/).

### Configuration de l'application

Par défaut, JHipster utilise le profil "development", vous n'avez donc rien à configurer.

Si vous souhaitez obtenir plus d'informations sur les profils disponibles, consultez la section intitulée "[Profils]({{ site.url }}/profiles/)".

Si vous souhaitez configurer certaines propriétés spécifiques de JHipster, consultez la page [propriétés communes de l'application]({{ site.url }}/common-application-properties/).

<h2 id="execution-du-serveur-java">Exécution du serveur Java</h2>

### En tant que classe Java "main"

Depuis votre IDE, faites un clic droit sur la classe "Application" à la racine de la hiérarchie de votre package Java, et exécutez-la directement. Vous devriez également pouvoir la déboguer depuis votre IDE.

L'application sera disponible sur [http://localhost:8080](http://localhost:8080).

Cette application aura le "hot reload" activé par défaut, donc si vous compilez une classe, le contexte de l'application Spring devrait se rafraîchir automatiquement, sans avoir besoin de redémarrer le serveur.

### En tant que projet Maven

Vous pouvez lancer le serveur Java avec Maven. JHipster fournit un wrapper Maven, donc vous n'avez pas besoin d'installer Maven, et vous avez la garantie que tous les utilisateurs du projet ont la même version de Maven :

`./mvnw` (sur Mac OS X/Linux) ou `mvnw` (sur Windows)

(cela exécutera notre tâche Maven par défaut, `spring-boot:run`)

L'application sera disponible sur [http://localhost:8080](http://localhost:8080).

Si vous utilisez le rechargement en direct avec `npm start`, vous pouvez accélérer le démarrage du serveur en excluant les tâches webpack :

`./mvnw -P-webapp`

Alternativement, si vous avez installé Maven, vous pouvez lancer le serveur Java avec Maven :

`mvn`

Pour plus d'informations sur l'utilisation de Maven, veuillez consulter [http://maven.apache.org](http://maven.apache.org)

### (Optionnel) En tant que projet Gradle

Si vous avez sélectionné l'option Gradle, JHipster fournit un wrapper Gradle, donc vous n'avez pas besoin d'installer Gradle, et vous avez la garantie que tous les utilisateurs du projet ont la même version de Gradle :

`./gradlew` (sur Mac OS X/Linux) ou `gradlew` (sur Windows)

(cela exécutera notre tâche Gradle par défaut, `bootRun`)

L'application sera disponible sur [http://localhost:8080](http://localhost:8080).

Si vous utilisez le rechargement en direct avec `npm start`, vous pouvez accélérer le démarrage du serveur en excluant les tâches webpack :

`./gradlew -x webapp`

Alternativement, si vous avez installé Gradle, vous pouvez lancer le serveur Java avec Gradle :

`gradle`

Pour plus d'informations sur l'utilisation de Gradle, veuillez consulter [https://gradle.org](https://gradle.org)

<h2 id="travailler-avec-angular-react">Travailler avec Angular/React</h2>

### Exécution de Webpack

_Cette étape est nécessaire pour voir les changements dans votre code TypeScript et avoir le rechargement en direct de votre code côté client._

L'exécution de Webpack est la tâche par défaut dans le fichier `package.json`, il suffit donc de lancer :

`npm start`

Cela offre des fonctionnalités très impressionnantes :

*   Dès que vous modifiez un de vos fichiers HTML/CSS/TypeScript, votre navigateur se rafraîchit automatiquement
*   Lorsque vous testez votre application sur plusieurs navigateurs ou appareils différents, tous vos clics/défilements/saisies doivent être automatiquement synchronisés sur tous les écrans

Cela lancera :

- Une tâche Webpack qui compilera automatiquement le code TypeScript en JavaScript
- Un serveur Webpack "hot module reload" qui fonctionnera sur [http://localhost:9060/](http://localhost:9060/) (et dispose d'un proxy vers [http://127.0.0.1:8080/api](http://127.0.0.1:8080/api) pour accéder au back-end Java)
- Une tâche BrowserSync qui fonctionnera sur [http://localhost:9000/](http://localhost:9000/), qui a un proxy vers [http://localhost:9060/](http://localhost:9060/) (le serveur Webpack "hot module reload"), et qui synchronisera les clics/défilements/saisies de l'utilisateur
- L'interface utilisateur de BrowserSync, qui sera disponible sur [http://localhost:3001/](http://localhost:3001/)

**REMARQUE :** BrowserSync active par défaut le [ghostMode](https://browsersync.io/docs/options#option-ghostMode), ce qui peut créer de la confusion
surtout [lors de l'utilisation de plusieurs onglets de navigateur](https://github.com/jhipster/generator-jhipster/issues/11116#issuecomment-589362814). Pour éviter
cela, vous pouvez toujours désactiver ghostMode. Du code commenté est fourni dans `webpack.dev.js` pour désactiver facilement ghostMode.

### Exécution de NPM

Les dépendances directes du projet sont configurées dans `package.json`, mais les dépendances transitives sont définies dans le fichier `package-lock.json`, qui est généré lorsque `npm install` est exécuté.

Il est conseillé de vérifier [`package-lock.json`](https://docs.npmjs.com/files/package-lock.json) dans le contrôle de version, afin que tous les membres de l'équipe d'un projet aient les mêmes versions de toutes les dépendances. L'exécution de `npm install` à nouveau régénérera le `package-lock.json` avec les dernières versions des dépendances transitives.

### Autres tâches NPM

Quelques commandes `npm` utilisées en exemple.

- `npm run lint` : vérifie les problèmes de style de code dans le code TypeScript
- `npm run lint:fix` : tente de corriger automatiquement les problèmes de lint TypeScript
- `npm run tsc` : compile le code TypeScript
- `npm run test` : exécute les tests unitaires avec Jest
- `npm run test:watch` : garde les tests unitaires Jest en cours d'exécution, pour un retour en direct lorsque le code est modifié
- `npm run e2e` : exécute les tests "end to end" avec Protractor (fonctionne uniquement si l'option Protractor a été sélectionnée lors de la génération du projet)

<h2 id="utilisation-d-une-base-de-donnees">Utilisation d'une base de données</h2>

### Exécution d'une base de données

Si vous utilisez une base de données non embarquée, comme MySQL, MariaDB, PostgreSQL, MSSQL, MongoDB, Cassandra ou Couchbase, vous devrez installer et configurer cette base de données.

La méthode la plus simple et recommandée avec JHipster est d'utiliser Docker Compose. [Suivez notre guide Docker Compose ici.]({{ site.url }}/docker-compose/)

Si vous préférez installer et configurer votre base de données manuellement, vous devez créer le schéma et son utilisateur car Liquibase ne crée que les objets (tables, index, ...) dans un schéma existant. Ensuite, n'oubliez pas de configurer vos propriétés Spring Boot en conséquence dans vos fichiers `src/main/resources/config/application-*.yml` (par exemple votre URL de base de données, identifiant et mot de passe).

### Utilisation de la base de données H2 en développement

Si vous choisissez la base de données H2, vous aurez une base de données en mémoire fonctionnant à l'intérieur de votre application, et vous pouvez accéder à sa console à [http://localhost:8080/h2-console](http://localhost:8080/h2-console) par défaut.

Pour vous connecter à la base de données, sélectionnez les options préconfigurées :

*   Classe de pilote : org.h2.Driver
*   URL JDBC : jdbc:h2:mem:jhipster
*   Nom d'utilisateur : <vide>
*   Mot de passe : <vide>

![]({{ site.url }}/images/h2.png)

### Utilisation de MySQL, MariaDB ou PostgreSQL en développement

Cette option est un peu plus complexe que l'utilisation de H2, mais elle offre des avantages importants :

*   Vos données sont conservées lors des redémarrages de l'application
*   Votre application démarre un peu plus rapidement
*   Vous pouvez utiliser le grand objectif `./mvnw liquibase:diff` (voir ci-dessous)

**Remarque** : pour MySQL, vous devrez probablement démarrer votre base de données avec ces options :

*   `--lower_case_table_names=1` : voir la documentation [MySQL Schema Object Names](https://dev.mysql.com/doc/refman/8.0/en/identifier-case-sensitivity.html)
*   `--skip-ssl` : voir la documentation [MySQL Server Options](https://dev.mysql.com/doc/refman/8.0/en/server-options.html#option_mysqld_ssl)
*   `--character_set_server=utf8` : voir la documentation [MySQL Server System Variables](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_character_set_server)
*   `--explicit_defaults_for_timestamp` : voir la documentation [MySQL Server System Variables](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_explicit_defaults_for_timestamp)

La commande est :

    mysqld --lower_case_table_names=1 --skip-ssl --character_set_server=utf8 --explicit_defaults_for_timestamp

## Mises à jour de la base de données

Si vous ajoutez ou modifiez une entité JPA, vous devrez mettre à jour le schéma de votre base de données.

JHipster utilise [Liquibase](http://www.liquibase.org) pour gérer les mises à jour de la base de données, et stocke sa configuration dans le répertoire `/src/main/resources/config/liquibase/`.

Il existe 3 façons de travailler avec Liquibase :
*   utiliser le sous-générateur d'entité
*   utiliser le plugin liquibase
*   mettre à jour les fichiers de configuration manuellement

### Mises à jour de la base de données avec le sous-générateur d'entité

Si vous utilisez le [sous-générateur d'entité]({{ site.url }}/creating-an-entity/), voici le flux de développement :

*   Exécutez le [sous-générateur d'entité]({{ site.url }}/creating-an-entity/)
*   Un nouveau "change log" est créé dans votre répertoire `src/main/resources/config/liquibase/changelog`, et a été automatiquement ajouté à votre fichier `src/main/resources/config/liquibase/master.xml`
*   Révisez ce change log, il sera appliqué la prochaine fois que vous exécuterez votre application

### Mises à jour de la base de données avec le plugin liquibase

Si vous avez choisi d'utiliser H2, MySQL, MariaDB ou PostgreSQL en développement, vous pouvez suivre cette section pour générer automatiquement un changelog.

*Remarque : Si vous exécutez H2 avec une persistance en mémoire, vous devez démarrer votre application avant d'exécuter les commandes liquibase.*

#### Maven

[Liquibase Hibernate](https://github.com/liquibase/liquibase-hibernate) est un plugin Maven configuré dans votre `pom.xml`, et est indépendant de votre fichier Spring `application.yml`, donc si vous avez modifié les paramètres par défaut (par exemple, changé le mot de passe de la base de données), vous devez modifier les deux fichiers.

Voici le flux de développement :

1.   Modifiez votre entité JPA (ajoutez un champ, une relation, etc.)
2.   Ignorez les modifications dans le fichier liquibase régénéré pour cette entité `config/liquibase/changelog/DATE_added_entity_ENTITY_NAME.xml` pour éviter les conflits avec le fichier de changelog qui sera bientôt généré ci-dessous
3.   Compilez votre application (cela fonctionne sur le code Java compilé, donc n'oubliez pas de compiler !)
4.   Exécutez `./mvnw liquibase:diff` (ou `./mvnw compile liquibase:diff` pour compiler avant)
5.   Un nouveau "change log" est créé dans votre répertoire `src/main/resources/config/liquibase/changelog`
6.   Révisez ce change log et ajoutez-le à votre fichier `src/main/resources/config/liquibase/master.xml`, afin qu'il soit appliqué la prochaine fois que vous exécuterez votre application

#### Gradle

[Liquibase gradle plugin](https://github.com/liquibase/liquibase-gradle-plugin) est un plugin Gradle configuré dans votre `build.gradle`, et est indépendant de votre fichier Spring `application.yml`, donc si vous avez modifié les paramètres par défaut (par exemple, changé le mot de passe de la base de données), vous devez modifier les deux fichiers.

Vous pouvez utiliser le même flux de travail que pour Maven, sauf pour la 4ème étape où vous devez exécuter `./gradlew liquibaseDiffChangelog -PrunList=diffLog`.

### Mises à jour de la base de données en modifiant manuellement le change log

Si vous préférez (ou devez) effectuer une mise à jour de la base de données manuellement, voici le flux de développement :

*   Modifiez votre entité JPA (ajoutez un champ, une relation, etc.)
*   Créez un nouveau "change log" dans votre répertoire `src/main/resources/config/liquibase/changelog`. Les fichiers de ce répertoire sont préfixés par leur date de création (au format yyyyMMddHHmmss), puis ont un titre décrivant ce qu'ils font. Par exemple, `20141006152300_added_price_to_product.xml` est un bon nom.
*   Ajoutez ce fichier "change log" dans votre fichier `src/main/resources/config/liquibase/master.xml`, afin qu'il soit appliqué la prochaine fois que vous exécuterez votre application

Si vous souhaitez plus d'informations sur l'utilisation de Liquibase, veuillez consulter [http://www.liquibase.org](http://www.liquibase.org).

<h2 id="internationalisation">Internationalisation</h2>

L'internationalisation (ou i18n) est un élément de premier ordre dans JHipster, car nous pensons qu'elle doit être mise en place dès le début de votre projet (et non après coup).

L'utilisation est la suivante :

- Avec Angular, grâce à [NG2 translate](https://github.com/ocombe/ng2-translate) et à un composant JHipster spécifique, qui utilise des fichiers JSON pour la traduction
- Avec React, grâce à un composant JHipster spécifique, qui fonctionne de la même manière que le composant Angular, et utilise les mêmes fichiers

Par exemple, pour ajouter une traduction au champ "First Name", ajoutez un attribut "translate" avec une clé : `<label jhiTranslate="settings.form.firstname">First Name</label>`

Cette clé référence un document JSON, qui renverra la chaîne traduite. Angular/React remplacera alors la chaîne "First Name" par la version traduite.

Si vous souhaitez plus d'informations sur l'utilisation des langues, lisez notre documentation [Installation de nouvelles langues]({{ site.url }}/installing-new-languages/).