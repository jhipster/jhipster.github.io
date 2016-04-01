---
layout: default
title: Using MariaDB
sitemap:
priority: 0.5
lastmod: 2016-04-01T18:20:00-00:00
---
# How to use JHipster with MariaDB

__Tip submitted by [@flanciskinho](https://github.com/flanciskinho)__

_Goal:_ By the end of this tutorial you will have the default JHipster application running on your MariaDB, with everything being functional.

Start by running JHipster normally with `yo jhipster`, select the options to use token based authentication, SQL, MySQL as the dev. database, MySQL as the prod. database, Yes with ehcache, No Elasticsearch, No clustered HTTP, No Websockets, Maven, Grunt, and no Sass.

We then add the MariaDB JDBC dependency to the project `pom.xml` file.

_pom.xml_

    [...]
    <!-- MariaDB JDBC -->
    <dependency>
        <groupId>org.mariadb.jdbc</groupId>
        <artifactId>mariadb-java-client</artifactId>
        <version>1.3.7</version>
    </dependency>
    [...]

You can see the last MariaDB JDBC driver version on  [https://mariadb.com/kb/en/mariadb/about-mariadb-connector-j/](https://mariadb.com/kb/en/mariadb/about-mariadb-connector-j/).


##Database modification

Go into `src\main\resources\config\application-dev.yml` and `src\main\resources\config\application-dev.yml` and change your application to use the new datasource, and your Hibernate configuration to use the MariaDB dialect as seen below:

_application-dev.yml_

        datasource:
            url: jdbc:mariadb://localhost:3306/dbname
            [...]

        jpa:
            database-platform: org.hibernate.dialect.MySQL5InnoDBDialect
            [...]

This assuming your database is called `dbname`, change your connection url as necessary.

Now try running your application! Everything should be working and you should be on your way to continue using your JHipster application with MariaDB.
