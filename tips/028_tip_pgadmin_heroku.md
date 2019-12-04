---
layout: default
title: How to connect PGAdmin (PostgreSQL) to Heroku
sitemap:
priority: 0.1
lastmod: 2018-10-15T18:20:00-00:00
---
# How to connect PGAdmin (PostgreSQL) to Heroku

__Tip submitted by [@Tonterias](https://github.com/Tonterias)__

May be you need to use PGAdmin to load your Heroku database with test data.

Follow the steps:

First, use the data from your Database Credentials at your Heroku Account to fill the Create a New Server PGAdmin's form:

![Example documentation](../images/028_tip_pgadmin_heroku_01.png)

![Example documentation](../images/028_tip_pgadmin_heroku_02.png)

Then, you will have to configure that information in your application-prod.yml:

/src/main/resources/config/application-prod.yml

    spring:
        devtools:
            restart:
                enabled: false
            livereload:
                enabled: false
        datasource:
            type: com.zaxxer.hikari.HikariDataSource
            url: jdbc:postgresql://@ec2-50-17-250-38.compute-1.amazonaws.com:5432/d5u8osf3cgtlg
            username: seejtnnivrl???
            password: e9ed17c73da7ec36bf6eead010968106439debe16ed3df9039be0a9aef??????
            hikari:
                auto-commit: false

You will get the data from the Database Credentials of your Heroku Account (as in this other example):

    Host : ec2-50-17-250-38.compute-1.amazonaws.com
    Database : d5u8osf3cgtlg
    User : seejtnnivrlcdw
    Port : 5432
    Password : e9ed17c73da7ec36bf6eead010968106439debe16ed3df9039be?????
    URI : postgres://seejtnnivrlcdw:e9ed17c73da7ec36bf6eead010968106439debe16ed3df9039b???????
    @ec2-50-17-250-38.compute-1.amazonaws.com:5432/d5u8osf3cgtlg
    Heroku CLI : heroku pg:psql postgresql-trapezoidal-20780 --app jhipster-press-08

You just have to connect to your database and test it with a sql command at the PGAdmin query window.

NOTE: Here is a video that shows this process: https://www.youtube.com/watch?v=GAHsl0AfK-0