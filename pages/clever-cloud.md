---
layout: default
title: Deploying to Cloud
permalink: /clever-cloud/
redirect_from:
  - /clever-cloud.html
sitemap:
    priority: 0.7
    lastmod: 2020-10-09T00:00:00-00:00
---

# Déploiement sur Clever Cloud
[Clever cloud](https://www.clever-cloud.com/){:target="_blank" rel="noopener"} est une plateforme d'automatisation informatique.

[<img src="{{ site.url }}/images/logo/logo_clever_cloud.png" alt="Logo de Clever Cloud" width="300px" />](https://www.clever-cloud.com/){:target="_blank" rel="noopener"}

## Avant de commencer

Vous devez installer le [CLI Clever cloud](https://www.clever-cloud.com/doc/clever-tools/getting_started/){:target="_blank" rel="noopener"}.

Vous devez également [créer un compte Clever Cloud](https://api.clever-cloud.com/v2/sessions/signup){:target="_blank" rel="noopener"} et vous connecter avec le CLI en exécutant la commande suivante `clever login`
<pre>
Ouverture de https://console.clever-cloud.com/cli-oauth?cli_version=2.7.1&cli_token=XXX dans votre navigateur pour vous connecter…
Connexion réussie en tant que ...
</pre>


## Créer votre application Clever Cloud

1. Si vous utilisez maven `clever create --type maven [nom de votre application]` ou en utilisant gradle `clever create --type gradle [nom de votre application]`

2. Ajoutez un addon de base de données à votre application `clever addon create [fournisseur d'addon] [nom de votre addon] --link [nom de votre application]`

    Liste des fournisseurs d'addon pris en charge `clever addon providers`
    <pre>
    cellar-addon      Stockage S3 Cellar       Service de stockage de fichiers en ligne similaire à S3
    config-provider   Fournisseur de configuration  Exposer la configuration à vos applications (via des variables d'environnement)
    es-addon          Elastic Stack           Elasticsearch avec Kibana et APM server comme options
    fs-bucket         FS Buckets              Système de fichiers persistant pour votre application
    mongodb-addon     MongoDB                 Base de données orientée documents noSQL
    mysql-addon       MySQL                   Système de gestion de base de données relationnelle open source
    postgresql-addon  PostgreSQL              Système de gestion de base de données relationnelle objet puissant et open source
    redis-addon       Redis                   Redis by Clever Cloud est un magasin de données clé-valeur en mémoire, propulsé par Clever Cloud
    </pre>

    [voir les addons pris en charge](https://www.clever-cloud.com/doc/addons/clever-cloud-addons/#available-add-ons)

3. Configurer la variable d'environnement `clever env set CC_PRE_RUN_HOOK "cp ./clevercloud/application-clevercloud.yml ./application-prod.yml"`

4. Activer la construction dédiée `clever scale --build-flavor M`

    [voir la construction dédiée](https://www.clever-cloud.com/doc/admin-console/apps-management/#dedicated-build)


## Configurer votre application JHipster
1. Ajoutez un dossier `clevercloud/` dans votre projet.

2. créez `clevercloud/application-clevercloud.yml` pour utiliser les variables d'environnement d'addon Clever Cloud prédéfinies

    Pour PostgreSQL
    <pre>
    spring:
        datasource:
            type: com.zaxxer.hikari.HikariDataSource        
            url: jdbc:postgresql://${POSTGRESQL_ADDON_HOST}:${POSTGRESQL_ADDON_PORT}/${POSTGRESQL_ADDON_DB}?useUnicode=true&characterEncoding=utf8&useSSL=false
            username: ${POSTGRESQL_ADDON_USER}
            password: ${POSTGRESQL_ADDON_PASSWORD}
            hikari:
                maximumPoolSize: 2
    </pre>

    Pour MySQL
    <pre>
    spring:
        datasource:
            type: com.zaxxer.hikari.HikariDataSource        
            url: jdbc:mysql://${MYSQL_ADDON_HOST}:${MYSQL_ADDON_PORT}/${MYSQL_ADDON_DB}?useUnicode=true&characterEncoding=utf8&useSSL=false
            username: ${MYSQL_ADDON_USER}
            password: ${MYSQL_ADDON_PASSWORD}
            hikari:
                maximumPoolSize: 2
    </pre>

    Pour MongoDB
    <pre>
    spring:
      data:
        mongodb:
          uri: ${MONGODB_ADDON_URI}
          database: ${MONGODB_ADDON_DB}
    </pre>



3. ajoutez un fichier json contenant le champ goal pour indiquer comment démarrer votre application

    Pour maven
    créez le fichier `clevercloud/maven.json` et utilisez votre pom.xml **artifactId**
    
    <pre>
    {
        "build": {
            "type": "maven",
            "goal": "-Pprod package -DskipTests"
        },
        "deploy": {
            "jarName": "./target/[REPLACE BY ARTIFACTID]-0.0.1-SNAPSHOT.jar"
        }
    }
    </pre>

    Pour gradle
    créez le fichier `clevercloud/gradle.json` et utilisez gradle.properties **rootProject.name**

    <pre>
    {
        "build": {
            "type": "gradle",
            "goal": "-Pprod bootJar -x test"
        },
        "deploy": {
            "jarName": "./build/libs/[REPLACE BY rootProject.name]-0.0.1-SNAPSHOT.jar"
        }
    }
    </pre>

## Déployer votre application
### Utilisation de l'interface en ligne de commande (CLI)
Vous devez d'abord effectuer une validation avant de déployer :

`git commit -m "Clever deploy"`

Ensuite, exécutez :

`clever deploy`

### Utilisation de GitLab CI

Définissez `$CLEVER_TOKEN` et `CLEVER_SECRET` comme variables d'environnement dans GitLab CI/CD.

Ajoutez cette étape à votre fichier  `.gitlab-ci.yml`
<pre>
deploy-to-clever-env:
  stage: deploy
  variables:
    APP_NAME: [nom de l'application sur Clever Cloud]
    APP_ID: [identifiant de l'application sur Clever Cloud]
  script:
    - wget https://clever-tools.cellar.services.clever-cloud.com/releases/latest/clever-tools-latest_linux.tar.gz
    - tar xvzf clever-tools-latest_linux.tar.gz
    - ./clever-tools-latest_linux/clever login --token $CLEVER_TOKEN --secret $CLEVER_SECRET
    - ./clever-tools-latest_linux/clever link ${APP_ID}
    - ./clever-tools-latest_linux/clever deploy -a ${APP_NAME}
  environment:
    name: [nom de l'environnement]
    url: https://${APP_NAME}.cleverapps.io

</pre>

## Utilisation de l'action GitHub

Définissez `CLEVER_TOKEN` et `CLEVER_SECRET` comme secrets dans GitHub (Paramètres > Secrets).

Ajoutez cette étape à votre fichier `.github-action.yml`
<pre>
- uses: actions/checkout@v2
- name: Déploiement sur CC
  env:
    APP_NAME:[nom de l'application sur Clever Cloud]
    APP_ID: [identifiant de l'application sur Clever Cloud]
  run: |
    git fetch --prune --unshallow
    wget https://clever-tools.cellar.services.clever-cloud.com/releases/latest/clever-tools-latest_linux.tar.gz
    tar xvzf clever-tools-latest_linux.tar.gz
    ./clever-tools-latest_linux/clever login --token ${{ secrets.CLEVER_TOKEN }} --secret ${{ secrets.CLEVER_SECRET }}
    ./clever-tools-latest_linux/clever link ${{ env.APP_ID }}
    ./clever-tools-latest_linux/clever deploy -f -a ${{ env.APP_NAME }}

</pre>

## Changer la version de Java

Vous pouvez sélectionner la version de Java (Java 17 par défaut) :
```
clever env set CC_JAVA_VERSION 21
```

## Plus d'informations

*   [Documentation Clever Cloud](https://www.clever-cloud.com/doc/)
*   [Déploiement Java avec Maven sur Clever Cloud](https://www.clever-cloud.com/doc/java/java-maven/)
*   [Déploiement Java avec Gradle sur Clever Cloud](https://www.clever-cloud.com/doc/java/java-gradle/)
