---
layout: default
title: Gestion des erreurs serveur
permalink: /managing-server-errors/
sitemap:
    priority: 0.7
    lastmod: 2018-03-07T00:00:00-00:00
---

# <i class="fa fa-fire-extinguisher"></i> Gestion des erreurs serveur

JHipster offre une prise en charge de premier ordre pour la gestion des erreurs : il fournit des pages d'erreur et des mécanismes personnalisés pour gérer à la fois les erreurs métier et techniques côté serveur.

## Pages d'erreur

JHipster génère une application à page unique (SPA), mais il nécessite toujours des pages d'erreur personnalisées pour les personnes qui n'ont pas (ou ne peuvent pas) accéder à l'application.

### Pages d'erreur dynamiques

JHipster fournit une page d'erreur générique, qui est un modèle Thymeleaf, situé à `src/main/resources/templates/error.html`.

Cette page affichera le message d'erreur côté serveur, par exemple si l'utilisateur a essayé d'accéder à une page qui n'existe pas, elle affichera une erreur 404, indiquant à l'utilisateur que la page n'a pas été trouvée.

### Page d'erreur 404 statique

JHipster fournit une page d'erreur 404 spécifique et statique située à `src/main/webapp/404.html`. Par défaut, cette page n'est pas utilisée par JHipster : elle est là pour les projets utilisant un proxy avant JHipster (Apache/NGinx/etc.), afin que le proxy puisse également afficher une page d'erreur 404, même si l'application JHipster n'est pas disponible.

Elle doit être spécifiquement configurée sur le proxy frontal.

## Erreurs d'API

Pour gérer les erreurs REST Spring MVC, JHipster utilise la bibliothèque [Zalando's Problem Spring Web](https://github.com/zalando/problem-spring-web), afin de fournir des messages d'erreur riches basés sur JSON.

Pour aider l'utilisateur final, pour chaque problème connu, cette bibliothèque fournira un lien vers une page d'erreur spécifique, qui donnera plus de détails. Ces liens sont configurés dans la classe `ErrorConstants`, et pointent par défaut vers ce site web. Dans votre application, vous devez personnaliser ces liens, et les pointer vers votre propre documentation API.

Voici les liens d'erreur disponibles :

- [Problème avec un message]({{ site.url }}/problem/problem-with-message)
- [Violation de contrainte]({{ site.url }}/problem/constraint-violation)
- [Problème avec un message paramétré]({{ site.url }}/problem/parameterized)
- [Entité non trouvée]({{ site.url }}/problem/entity-not-found)
- [Mot de passe invalide]({{ site.url }}/problem/invalid-password)
- [E-mail déjà utilisé]({{ site.url }}/problem/email-already-used)
- [Login déjà utilisé]({{ site.url }}/problem/login-already-used)
- [E-mail non trouvé]({{ site.url }}/problem/email-not-found)