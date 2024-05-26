---
layout: default
title: Using MS SQL Server
sitemap:
    priority: 0.1
    lastmod: 2016-12-01T00:00:00-00:00
---

# Comment utiliser JHipster avec MS SQL Server

__Conseil soumis par [@Zyst](https://github.com/Zyst)__

#### La prise en charge de MSSQL a été ajoutée au générateur depuis cette [pull request #4589](https://github.com/jhipster/generator-jhipster/pull/4589), donc vous n'avez plus besoin de faire de configuration spécifique !

_Objectif :_ À la fin de ce tutoriel, vous aurez l'application JHipster par défaut fonctionnant sur votre SQL Server, avec tout fonctionnel.

Commencez par exécuter JHipster normalement avec `jhipster`, sélectionnez les options pour utiliser l'authentification basée sur le token, SQL, MySQL comme base de données de développement, MySQL comme base de données de production, Oui avec ehcache, Non Elasticsearch, Non HTTP clusterisé, Non Websockets, Maven, Grunt, et pas de Sass.

Nous ajoutons ensuite la dépendance JDBC MS SQL Server au fichier `pom.xml` du projet.

_pom.xml_

    [...]
    <!-- JDBC Microsoft -->
    <dependency>
        <groupId>com.microsoft.sqlserver</groupId>
        <artifactId>sqljdbc41</artifactId>
        <version>4.1</version>
    </dependency>
    <!-- Extensions Liquibase MS SQL Server -->
    <dependency>
        <groupId>com.github.sabomichal</groupId>
        <artifactId>liquibase-mssql</artifactId>
        <version>1.4</version>
    </dependency>
    [...]

J'utilise Sql JDBC 4.1, et je l'ai déjà installé dans mon dépôt personnel, mais si vous ne l'avez pas, cela ne fonctionnera pas sans une configuration supplémentaire, consultez [cette](https://stackoverflow.com/questions/30207842/add-external-library-jar-to-spring-boot-jar-internal-lib) question stackoverflow pour plus de références.

L'extension Liquibase MS SQL Server vous permet de faire des choses intéressantes que nous utiliserons plus tard dans ce tutoriel.

## Modification de la base de données

Allez dans `src\main\resources\config\application-dev.yml` et changez votre application pour utiliser la nouvelle source de données, et votre configuration Hibernate pour utiliser le dialecte SQL Server comme ci-dessous :

_application-dev.yml_

    spring:
        profiles:
            active: dev
        datasource:
            driver-class-name: com.microsoft.sqlserver.jdbc.SQLServerDataSource
            url: jdbc:sqlserver://localhost:1433;databaseName=test
            databaseName:
            serverName:
            username: myuser
            password: supersecretpassword
            cachePrepStmts: true
            prepStmtCacheSize: 250
            prepStmtCacheSqlLimit: 2048
            useServerPrepStmts: true

        jpa:
            database-platform: org.hibernate.dialect.SQLServerDialect
            database: SQL_SERVER
            openInView: false
            show_sql: true
            generate-ddl: false
            [...]

Cela suppose que votre base de données s'appelle `test`, changez votre URL de connexion si nécessaire.

Maintenant, allez dans `*\src\main\resources\config\liquibase\changelog\00000000000000_initial_schema.xml` et en haut du fichier, changez les propriétés suivantes :

_00000000000000_initial_schema.xml_

    <databaseChangeLog
        xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
        xmlns:ext="http://www.liquibase.org/xml/ns/dbchangelog-ext"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.1.xsd
        http://www.liquibase.org/xml/ns/dbchangelog-ext http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-ext.xsd">

        <property name="now" value="now()" dbms="mysql,h2"/>
        <property name="now" value="current_timestamp" dbms="postgresql"/>
        <property name="now" value="GETDATE()" dbms="mssql"/>

        <changeSet id="00000000000000" author="jhipster" dbms="postgresql">
            <createSequence sequenceName="hibernate_sequence" startValue="1000" incrementBy="1"/>
        </changeSet>
        [...]

Assurez-vous d'avoir modifié la propriété xml databaseChangeLog pour inclure ext. Maintenant, à l'intérieur de `src\main\resources\config\liquibase\changelog\00000000000000_initial_schema.xml`, trouvez les entrées de données et changez-les :

_00000000000000_initial_schema.xml_

    <ext:loadData encoding="UTF-8"
              file="config/liquibase/users.csv"
              separator=";"
              tableName="JHI_USER" identityInsertEnabled="true">
        <column name="activated" type="boolean"/>
        <column name="created_date" type="timestamp"/>
    </ext:loadData>
    <dropDefaultValue tableName="JHI_USER" columnName="created_date" columnDataType="datetime"/>

    <ext:loadData encoding="UTF-8"
                  file="config/liquibase/authorities.csv"
                  separator=";"
                  tableName="JHI_AUTHORITY"
                  identityInsertEnabled="true" />

    <ext:loadData encoding="UTF-8"
                  file="config/liquibase/users_authorities.csv"
                  separator=";"
                  tableName="JHI_USER_AUTHORITY"
                  identityInsertEnabled="true" />

Ajouter `identityInsertEnabled="true"` est la même chose que d'envelopper vos Inserts avec `IDENTITY_INSERT ON` et `IDENTITY_INSERT OFF` ce qui vous permettra d'insérer directement les identités générées par le projet. C'est pourquoi nous utilisons Liquibase MS SQL Server.

Maintenant, essayez de lancer votre application ! Tout devrait fonctionner et vous devriez être sur la bonne voie pour continuer à utiliser votre application JHipster avec SQL Server.