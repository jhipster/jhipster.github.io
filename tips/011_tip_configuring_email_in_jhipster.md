---
layout: default
title: Configuring Email with - Gmail and more
sitemap:
priority: 0.5
lastmod: 2015-12-23T22:40:00-00:00
---
# Configuring Email with - Gmail and more...

__Tip submitted by [@RawSanj](https://github.com/RawSanj)__

_Goal:_ By the using below mail settings you will have the default JHipster application configured to send emails from Gmail, Outlook or Yahoo.

Start by running JHipster with `yo jhipster` to create a new application or use an existing JHipster generated application.

## Choose any of below Email Service for your Application : 

### 1. Email Config - Gmail

Go into `src\main\resources\config\application-dev.yml` and change your application to use the below Gmail configuration:

_application-dev.yml_

    spring:
        profiles:
            active: dev
        mail:
            host: smtp.gmail.com
            port: 587
            username: gmailuserid@gmail.com  #Replace this field with your Gmail username.
            password: ************           #Replace this field with your Gmail password.
            protocol: smtp
            tls: true
            properties.mail.smtp:
                auth: true
                starttls.enable: true
                ssl.trust: smtp.gmail.com
            [...]


### 2. Email Config - Outlook.com

Go into `src\main\resources\config\application-dev.yml` and change your application to use the below Outlook configuration:

_application-dev.yml_

    spring:
        profiles:
            active: dev
        mail:
            host: smtp-mail.outlook.com
            port: 587
            username: outlookuserid@outlook.com  #Replace this field with your Outlook username.
            password: ************               #Replace this field with your Outlook password.
            protocol: smtp
            tls: true
            properties.mail.smtp:
                auth: true
                starttls.enable: true
                ssl.trust: smtp-mail.outlook.com
            [...]
__Note__ : If you want to send Email from a Corporate Outlook account then set `host` as the Microsoft Exchange Server of your company, for e.g. `emea.mycompany.com`. Also set `username` as Standard Id of the system provided by the company (Domain/Username) and `password` as your system password.

___Tip___ : To find your `Microsoft Exchange Server` : Open Outlook > Click Tools > Click Account Settings... > Double Click on Microsoft Exchange (under Email tab) and copy the Microsoft Exchange Server address.


### 3. Email Config - Yahoo

Go into `src\main\resources\config\application-dev.yml` and change your application to use the below Yahoo configuration:

_application-dev.yml_

    spring:
        profiles:
            active: dev
        mail:
            host: smtp.mail.yahoo.com
            port: 587
            username: yahoouserid@yahoo.com  #Replace this field with your Yahoo username.
            password: ************           #Replace this field with your Yahoo password.
            protocol: smtp
            tls: true
            properties.mail.smtp:
                auth: true
                starttls.enable: true
                ssl.trust: smtp.mail.yahoo.com
            [...]

    jhipster:       
        mail: 
            from: yahoouserid@gmail.com  #Replace this field with your Gmail username.
            [...]
__Note__ : For Yahoo Mail, `username` property in **spring.mail** must match the `from` property in **jhipster.mail**.


### 4. Email Config - Zoho

Go into `src\main\resources\config\application-dev.yml` and change your application to use the below Zoho configuration:

_application-dev.yml_

    spring:
        profiles:
            active: dev
        mail:
            host: smtp.zoho.com
            port: 587
            username: zohouserid@zoho.com   #Replace this field with your Zoho username.
            password: ************          #Replace this field with your Zoho password.
            protocol: smtp
            tls: true
            properties.mail.smtp:
                auth: true
                starttls.enable: true
                ssl.trust: smtp.zoho.com
            [...]


*Similarly you can configure any other email service. Just check the SMTP Mail Server and Server Port of your Email Service and change the above fields accordingly*

___Now run your application! Go to Register Page, submit the form with a valid Email addrees and you should receive an Activation Email from the above configured Email Address.___

__Note__ : You can try sending test Emails with your credentials using [these examples](https://github.com/RawSanj/java-mail-clients).
