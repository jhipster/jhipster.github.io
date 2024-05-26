---
layout: default
title:  Travailler avec des microservices avec JHipster
permalink: /microservices-architecture/
sitemap:
    priority: 0.7
    lastmod: 2021-03-08T12:00:00-00:00
---

# <i class="fa fa-sitemap"></i> Travailler avec des microservices avec JHipster

<h2 id="microservices_vs_monolithic">Architecture microservices vs monolithique</h2>

La première question que JHipster vous posera concerne le type d'application que vous souhaitez générer. Vous avez le choix entre deux styles d'architecture :

- Une architecture "monolithique" utilise une seule application, une taille unique pour tous, qui contient à la fois le code front-end et le code back-end Spring Boot.
- Une architecture "microservices" divise le front-end et le back-end, ce qui rend plus facile à votre application de s'adapter à l'échelle et de survivre aux problèmes d'infrastructure.

Une application "monolithique" est beaucoup plus facile à travailler, donc si vous n'avez pas de besoins spécifiques, c'est l'option que nous recommandons, et notre option par défaut.

<h2 id="overview">Aperçu de l'architecture microservices</h2>

L'architecture microservices de JHipster fonctionne de la manière suivante :

 * Une [passerelle]({{ site.url }}/api-gateway/) est une application générée par JHipster (en utilisant le type d'application `microservice gateway` lorsque vous la générez) qui gère le trafic Web et sert une application Angular/React/VueJs. Il peut y avoir plusieurs passerelles différentes, si vous souhaitez suivre le [patron Backends for Frontends](https://www.thoughtworks.com/insights/blog/bff-soundcloud), mais ce n'est pas obligatoire.
 * [Consul]({{ site.url }}/consul/) est un service de découverte de service, ainsi qu'un magasin de clés/valeurs.
 * Le [Registre JHipster]({{ site.url }}/jhipster-registry/) est une application en cours d'exécution sur laquelle toutes les applications s'inscrivent et obtiennent leur configuration. Il fournit également des tableaux de bord de surveillance en temps réel. Il peut être utilisé comme une alternative à Consul.
 * [Microservices]({{ site.url }}/creating-microservices/) sont des applications générées par JHipster (en utilisant le type d'application `microservice application` lorsque vous les générez) qui gèrent les demandes REST. Ils sont sans état, et plusieurs instances d'entre eux peuvent être lancées en parallèle pour gérer des charges lourdes.

Dans le diagramme ci-dessous, les composants verts sont spécifiques à votre application et les composants bleus fournissent son infrastructure sous-jacente.

<img src="{{ site.url }}/images/microservices_architecture_2.png" alt="Diagramme" style="width: 930px; height: 558px"/>