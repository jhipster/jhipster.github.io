---
layout: default
title: Comment connecter PGAdmin (PostgreSQL) à Heroku
sitemap:
priority: 0.1
lastmod: 2018-10-15T18:20:00-00:00
---
# Comment connecter PGAdmin (PostgreSQL) à Heroku

__Astuce soumise par [@Tonterias](https://github.com/Tonterias)__

Vous aurez peut-être besoin d'utiliser PGAdmin pour charger votre base de données Heroku avec des données de test.

Suivez les étapes :

Tout d'abord, utilisez les données de vos identifiants de base de données dans votre compte Heroku pour remplir le formulaire Créer un nouveau serveur de PGAdmin :

![Exemple de documentation](../images/028_tip_pgadmin_heroku_01.png)

![Exemple de documentation](../images/028_tip_pgadmin_heroku_02.png)

Ensuite, vous devrez configurer ces informations dans votre fichier application-prod.yml :

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

Vous obtiendrez les données des identifiants de base de données de votre compte Heroku (comme dans cet autre exemple) :

    Host : ec2-50-17-250-38.compute-1.amazonaws.com
    Database : d5u8osf3cgtlg
    User : seejtnnivrlcdw
    Port : 5432
    Password : e9ed17c73da7ec36bf6eead010968106439debe16ed3df9039be?????
    URI : postgres://seejtnnivrlcdw:e9ed17c73da7ec36bf6eead010968106439debe16ed3df9039b???????
    @ec2-50-17-250-38.compute-1.amazonaws.com:5432/d5u8osf3cgtlg
    Heroku CLI : heroku pg:psql postgresql-trapezoidal-20780 --app jhipster-press-08

Il vous suffit de vous connecter à votre base de données et de la tester avec une commande SQL dans la fenêtre de requête de PGAdmin.

REMARQUE : Voici une vidéo qui montre ce processus : https://www.youtube.com/watch?v=GAHsl0AfK-0