---
layout: default
title: Using MS SQL Server
sitemap:
    priority: 0.1
    lastmod: 2016-12-01T00:00:00-00:00
---
# How to use JHipster with MS SQL Server

__Tip submitted by [@Zyst](https://github.com/Zyst)__

#### MSSQL Support has been added to the generator since this [pull request #4589](https://github.com/jhipster/generator-jhipster/pull/4589), so you don't need to do any specific configuration anymore!

_Goal:_ By the end of this tutorial you will have the default JHipster application running on your SQL Server, with everything being functional.

Start by running JHipster normally with `jhipster`, select the options to use token based authentication, SQL, MySQL as the dev. database, MySQL as the prod. database, Yes with ehcache, No Elasticsearch, No clustered HTTP, No Websockets, Maven, Grunt, and no Sass.

We then add the MS SQL Server JDBC dependency to the project `pom.xml` file.

_pom.xml_

    [...]
    <!-- Microsoft JDBC -->
    <dependency>
        <groupId>com.microsoft.sqlserver</groupId>
        <artifactId>sqljdbc41</artifactId>
        <version>4.1</version>
    </dependency>
    <!-- Liquibase MS SQL Server extensions -->
    <dependency>
        <groupId>com.github.sabomichal</groupId>
        <artifactId>liquibase-mssql</artifactId>
        <version>1.4</version>
    </dependency>
    [...]

I am using Sql JDBC 4.1, and already have it installed to my personal repository, but if you do not this will not work without some further configuration, check out [this](https://stackoverflow.com/questions/30207842/add-external-library-jar-to-spring-boot-jar-internal-lib) stackoverflow question for further reference.

The Liquibase MS SQL Server extension allows you to do some neat stuff we will be using later on in this tutorial.

##Database modification

Go into `src\main\resources\config\application-dev.yml` and change your application to use the new datasource, and your Hibernate configuration to use the SQL Server dialect as seen below:

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

This assuming your database is called `test`, change your connection url as necessary.

Now go into `*\src\main\resources\config\liquibase\changelog\00000000000000_initial_schema.xml` and at the top of the file change the following properties:

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

First, make sure you changed your xml databaseChangeLog property to include the ext. Now inside `src\main\resources\config\liquibase\changelog\00000000000000_initial_schema.xml` find the data entries and change them:

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

Adding the `identityInsertEnabled="true"` is the same as wrapping your Inserts with `IDENTITY_INSERT ON` and `IDENTITY_INSERT OFF` which will allow you to insert the project autogenerated identities directly. This is why we are using the MS SQL Server Liquibase for.

Now try running your application! Everything should be working and you should be on your way to continue using your JHipster application with SQL Server.
