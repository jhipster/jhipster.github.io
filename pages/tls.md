---
layout: default
title: Utilisation de TLS et HTTP/2
permalink: /tls/
sitemap:
    priority: 0.7
    lastmod: 2018-10-04T00:00:00-00:00
---

# <i class="fa fa-lock"></i> Utilisation de TLS et HTTP/2 en développement

## Introduction

Cette page concerne l'utilisation de TLS et HTTP/2 en développement (principalement à des fins de test). Pour la configuration en production, veuillez consulter la [section sécurité de la documentation de production]({{ site.url }}/production/#security).

TLS est le protocole utilisé lorsque l'URL commence par `https://`, et il est nécessaire pour utiliser HTTP/2 sur les navigateurs modernes.

Il est utile d'utiliser ces protocoles lors du test d'une application, principalement pour des raisons de performance.

## Utilisation de TLS et HTTP/2 avec Spring Boot

JHipster dispose d'une configuration spécifique pour configurer à la fois TLS et HTTP/2 (voir la [documentation des propriétés d'application communes]({{ site.url }}/common-application-properties/)), et afin de simplifier davantage les choses :

- JHipster génère un certificat auto-signé lors de la génération de l'application
- Un profil spécifique `tls` est fourni (voir la [documentation des profils]({{ site.url }}/profiles/))

Pour exécuter JHipster avec le certificat auto-signé fourni, avec TLS et HTTP/2 activés, vous devez utiliser le profil `tls` :

*   avec Maven : `./mvnw -Pdev,tls`
*   avec Gradle : `./gradlew -Ptls`

L'application sera disponible sur `https://localhost:8080/`.

Comme le certificat est auto-signé, votre navigateur émettra un avertissement, et vous devrez l'ignorer (ou l'importer) pour accéder à l'application.

## Utilisation de TLS et HTTP/2 avec Angular, React ou Vue.js

Au lieu d'utiliser `npm start` pour exécuter le front-end (avec Webpack et BrowserSync), exécutez `npm run start-tls`, et il se connectera au back-end fonctionnant sur `https://localhost:8080/`.

Tout devrait alors fonctionner de la même manière qu'avec TLS et HTTP/2.