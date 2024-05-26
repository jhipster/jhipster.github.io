---
layout: default
title: Configuration de l'e-mail avec - Gmail et plus encore
sitemap:
priority: 0.5
lastmod: 2021-03-18T19:48:00-00:00
---
# Configuration de l'e-mail avec - Gmail et plus...

__Conseil proposé par [@RawSanj](https://github.com/RawSanj)__

_Objectif:_ En utilisant les paramètres de messagerie ci-dessous, vous aurez l'application JHipster par défaut configurée pour envoyer des e-mails depuis Gmail, Outlook ou Yahoo.

Commencez par exécuter JHipster avec `jhipster` pour créer une nouvelle application ou utilisez une application JHipster existante générée.

## Configurer l'adresse 'from'

Ouvrez `src\main\resources\config\application.yml`, éditez la propriété `jhipster.mail.from` :

_application.yml_
    
    jhipster:
        [...]
        mail:
            from: username@service_provider #Remplacez ce champ par la valeur qui sera utilisée pour spring.mail.username
        [...]

Omettre cette étape risque de faire en sorte que votre e-mail soit marqué comme spam.

## Choisissez l'un des services de messagerie ci-dessous pour votre application :

### 1. Configuration de messagerie - Gmail

Allez dans `src\main\resources\config\application-dev.yml` et configurez votre application pour utiliser la configuration Gmail ci-dessous :

_application-dev.yml_

    spring:
        profiles:
            active: dev
        mail:
            host: smtp.gmail.com
            port: 587
            username: gmailuserid@gmail.com  #Remplacez ce champ par votre nom d'utilisateur Gmail.
            password: ************           #Remplacez ce champ par votre mot de passe Gmail/mot de passe d'application.
            protocol: smtp
            tls: true
            properties.mail.smtp:
                auth: true
                starttls.enable: true
                ssl.trust: smtp.gmail.com
            [...]

Si vous utilisez la configuration ci-dessus avec votre mot de passe Gmail, vous devrez peut-être [autoriser les applications moins sécurisées](https://support.google.com/accounts/answer/6010255?hl=fr). 
La configuration est plus simple mais moins sécurisée. De plus, en autorisant les applications moins sécurisées, vous ne pourrez pas utiliser l'authentification à deux facteurs
avec Gmail. 

Nous vous recommandons donc vivement d'utiliser un mot de passe d'application au lieu du mot de passe Gmail. Veuillez vous référer au document de configuration Gmail suivant
pour plus d'informations sur la configuration de cela. 

[https://support.google.com/accounts/answer/185833](https://support.google.com/accounts/answer/185833)

De cette manière, vous pourrez utiliser l'authentification à deux facteurs ainsi que garder l'option "autoriser les applications moins sécurisées" désactivée. Vous pouvez également 
utiliser OAuth2 avec Gmail et la méthode de configuration est mise en évidence dans le document suivant.

[https://javaee.github.io/javamail/OAuth2](https://javaee.github.io/javamail/OAuth2)     

### 2. Configuration de messagerie - Outlook.com

Allez dans `src\main\resources\config\application-dev.yml` et configurez votre application pour utiliser la configuration Outlook ci-dessous :

_application-dev.yml_

    spring:
        profiles:
            active: dev
        mail:
            host: smtp-mail.outlook.com
            port: 587
            username: outlookuserid@outlook.com  #Remplacez ce champ par votre nom d'utilisateur Outlook.
            password: ************               #Remplacez ce champ par votre mot de passe Outlook.
            protocol: smtp
            tls: true
            properties.mail.smtp:
                auth: true
                starttls.enable: true
                ssl.trust: smtp-mail.outlook.com
            [...]
__Note__ : Si vous souhaitez envoyer des e-mails depuis un compte professionnel Outlook, définissez `host` comme le serveur Microsoft Exchange de votre entreprise, par exemple `emea.monentreprise.com`. Définissez également `username` comme l'identifiant standard du système fourni par l'entreprise (Domaine/Identifiant) et `password` comme votre mot de passe système.
Pour Outlook professionnel, la propriété `username` dans **spring.mail** doit correspondre à la propriété `from` dans **jhipster.mail**.

___Conseil___ : Pour trouver votre `serveur Microsoft Exchange` : Ouvrez Outlook > Cliquez sur Outils > Cliquez sur Paramètres du compte... > Double-cliquez sur Microsoft Exchange (sous l'onglet Courrier) et copiez l'adresse du serveur Microsoft Exchange.


### 3. Configuration de messagerie - Yahoo

Allez dans `src\main\resources\config\application-dev.yml` et configurez votre application pour utiliser la configuration Yahoo ci-dessous :

_application-dev.yml_

    spring:
        profiles:
            active: dev
        mail:
            host: smtp.mail.yahoo.com
            port: 587
            username: yahoouserid@yahoo.com  #Remplacez ce champ par votre nom d'utilisateur Yahoo.
            password: ************           #Remplacez ce champ par votre mot de passe Yahoo.
            protocol: smtp
            tls: true
            properties.mail.smtp:
                auth: true
                starttls.enable: true
                ssl.trust: smtp.mail.yahoo.com
            [...]

    jhipster:       
        mail:
            from: yahoouserid@gmail.com  #Remplacez ce champ par votre nom d'utilisateur Gmail.
            [...]
__Note__ : Pour Yahoo Mail, la propriété `username` dans **spring.mail** doit correspondre à la propriété `from` dans **jhipster.mail**.


### 4. Configuration de messagerie - Zoho

Allez dans `src\main\resources\config\application-dev.yml` et configurez votre application pour utiliser la configuration Zoho ci-dessous :

_application-dev.yml_

    spring:
        profiles:
            active: dev
        mail:
            host: smtp.zoho.eu
            port: 587
            username: zohouserid@zoho.com   #Remplacez ce champ par votre nom d'utilisateur Zoho.
            password: ************          #Remplacez ce champ par votre mot de passe Zoho.
            protocol: smtp
            tls: true
            properties.mail.smtp:
                auth: true
                starttls.enable: true
                ssl.trust: smtp.zoho.eu
            [...]

### 4. Configuration de messagerie - AWS SES

Allez dans `src\main\resources\config\application-dev.yml` et configurez votre application pour utiliser la configuration AWS SES ci-dessous :

_application-dev.yml_

    spring:
        profiles:
            active: dev
        mail:
            host: email-smtp.us-east-1.amazonaws.com
            port: 465
            username: ********************
            password: ********************************************
            protocol: smtps
            debug: true
            properties.mail.smtp:
                starttls.enable: true
                starttls.required: true
                ssl.enable: true
            properties.mail.smtps:
                auth: true


*De la même manière, vous pouvez configurer n'importe quel autre service de messagerie. Il vous suffit de vérifier le serveur de messagerie SMTP et le port de serveur de votre service de messagerie, puis de modifier les champs ci-dessus en conséquence.*

___Exécutez maintenant votre application ! Accédez à la page d'inscription, soumettez le formulaire avec une adresse e-mail valide et vous devriez recevoir un e-mail d'activation de l'adresse e-mail configurée ci-dessus.___

__Remarque__ : Vous pouvez essayer d'envoyer des e-mails de test avec vos identifiants en utilisant [ces exemples](https://github.com/RawSanj/java-mail-clients).
