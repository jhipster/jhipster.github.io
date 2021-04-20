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

# Deploying to Clever Cloud
[Clever cloud](https://www.clever-cloud.com/){:target="_blank" rel="noopener"} is an IT Automation platform

[<img src="{{ site.url }}/images/logo/logo_clever_cloud.png" alt="Clever cloud logo" width="300px" />](https://www.clever-cloud.com/){:target="_blank" rel="noopener"}

## Before you start

You must install the [Clever cloud CLI](https://www.clever-cloud.com/doc/clever-tools/getting_started/){:target="_blank" rel="noopener"}.

You must also [create a Clever Cloud account](https://api.clever-cloud.com/v2/sessions/signup){:target="_blank" rel="noopener"} and log in with the CLI by running the following command `clever login`
<pre>
Opening https://console.clever-cloud.com/cli-oauth?cli_version=2.7.1&cli_token=XXX in your browser to log you in…
Login successful as ...
</pre>


## Create your Clever Cloud application

1. If you are using maven `clever create --type maven [your application name]` or using gradle `clever create --type gradle [your application name]`

2. Add a database addon to your application `clever addon create [addon provider] [your addon name] --link [your application name]`

    List supported addon providers `clever addon providers`
    <pre>
    cellar-addon      Cellar S3 storage       S3-like online file storage web service
    config-provider   Configuration provider  Expose configuration to your applications  (via environment variables)
    es-addon          Elastic Stack           Elasticsearch with Kibana and APM server as options
    fs-bucket         FS Buckets              Persistent file system for your application
    mongodb-addon     MongoDB                 A noSQL document-oriented database
    mysql-addon       MySQL                   An open source relational database management system
    postgresql-addon  PostgreSQL              A powerful, open source object-relational database system
    redis-addon       Redis                   Redis by Clever Cloud is an in-memory key-value data store, powered by Clever Cloud
    </pre>

    [see supported addons](https://www.clever-cloud.com/doc/addons/clever-cloud-addons/#available-add-ons)

3. Setup env var `clever env set CC_PRE_RUN_HOOK "cp ./clevercloud/application-clevercloud.yml ./application-prod.yml"`

4. Enable dedicated build `clever scale --build-flavor M`

    [see dedicated build](https://www.clever-cloud.com/doc/admin-console/apps-management/#dedicated-build)


## Configure your JHipster application
1. Add a `clevercloud/` folder in your project.

2. create `clevercloud/application-clevercloud.yml` for using predefined clever cloud addon env var

    For PostgreSQL
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

    For MySQL
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

    For MongoDB
    <pre>
    spring:
      data:
        mongodb:
          uri: ${MONGODB_ADDON_URI}
          database: ${MONGODB_ADDON_DB}
    </pre>



3. add a json file that contain the goal field to indicate how to start your application

    For maven
    create `clevercloud/maven.json` file and using your pom.xml **artifactId**
    
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

    For gradle
    create `clevercloud/gradle.json` file  and using gradle.properties **rootProject.name**

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

## Deploy your application
### Using CLI
You must commit before deploy

`git commit -m "Clever deploy"`

then run :

`clever deploy`

### Using gitlab CI

define `$CLEVER_TOKEN` and `CLEVER_SECRET` to gitlab CI/CD environment variables

add this stage to your `.gitlab-ci.yml`
<pre>
deploy-to-clever-env:
  stage: deploy
  variables:
    APP_NAME: [clever cloud app name]
    APP_ID: [clever cloud app id]
  script:
    - wget https://clever-tools.cellar.services.clever-cloud.com/releases/latest/clever-tools-latest_linux.tar.gz
    - tar xvzf clever-tools-latest_linux.tar.gz
    - ./clever-tools-latest_linux/clever login --token $CLEVER_TOKEN --secret $CLEVER_SECRET
    - ./clever-tools-latest_linux/clever link ${APP_ID}
    - ./clever-tools-latest_linux/clever deploy -a ${APP_NAME}
  environment:
    name: [env name]
    url: https://${APP_NAME}.cleverapps.io
</pre>

## Using Github Action

define `$CLEVER_TOKEN` and `CLEVER_SECRET` to gitlab CI/CD environment variables

add this step to your `.github-action.yml`
<pre>
- uses: actions/checkout@v2
- name: Deploy on cc
  env:
    APP_NAME:[clever cloud app name]
    APP_ID: [clever cloud app id]
  run: |
    git fetch --prune --unshallow
    wget https://clever-tools.cellar.services.clever-cloud.com/releases/latest/clever-tools-latest_linux.tar.gz
    tar xvzf clever-tools-latest_linux.tar.gz
    ./clever-tools-latest_linux/clever login --token ${{ secrets.CLEVER_TOKEN }} --secret ${{ secrets.CLEVER_SECRET }}
    ./clever-tools-latest_linux/clever link ${{ env.APP_ID }}
    ./clever-tools-latest_linux/clever deploy -f -a ${{ env.APP_NAME }}
</pre>

## Changing the Java version

You can select the Java version (Java 11 by default)
```
clever env set CC_JAVA_VERSION 12
```

## More information

*   [Clever Cloud documentation](https://www.clever-cloud.com/doc/)
*   [Clever Cloud Java maven deployment](https://www.clever-cloud.com/doc/java/java-maven/)
*   [Clever Cloud Java gradle deployment](https://www.clever-cloud.com/doc/java/java-gradle/)
