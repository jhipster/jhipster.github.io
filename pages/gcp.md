---
layout: default
title: Déploiement sur Google Cloud Platform
permalink: /gcp/
sitemap:
    priority: 0.5
    lastmod: 2023-12-19T00:00:00-00:00
---

# <i class="fa fa-cloud-upload"></i> Déploiement sur Google Cloud Platform

[![Google Cloud Platform]({{ site.url }}/images/logo/logo-gcp.png)](https://cloud.google.com)

Vous pouvez déployer des applications JHipster sur la Google Cloud Platform et les exécuter sur :
- Des machines virtuelles avec [Google Compute Engine](https://cloud.google.com/compute/)
- Des conteneurs dans Kubernetes avec [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine/)
- Une plateforme en tant que service avec [Google App Engine](https://cloud.google.com/appengine/)

Vous pouvez obtenir un [essai gratuit de Google Cloud Platform](https://cloud.google.com/free) pour déployer vos applications. Veuillez consulter les niveaux [toujours gratuits](https://cloud.google.com/free/) pour des utilisations gratuites jusqu'aux limites spécifiées pendant et après l'essai gratuit.

## Avant de commencer

Installez et authentifiez-vous avec le SDK gcloud sur votre environnement local pour accéder à la CLI `gcloud`. Pour plus d'informations, visitez ce lien :

- [Installer le SDK gcloud](https://cloud.google.com/sdk/install)

## Déploiement sur Google Kubernetes Engine

Google Kubernetes Engine est un cluster Kubernetes entièrement géré en tant que service. Une fois provisionné, vous pouvez déployer vos conteneurs et applications JHipster en utilisant des commandes Kubernetes standard.

1. Activer l'API : `gcloud services enable container.googleapis.com containerregistry.googleapis.com`
1. Installez la CLI `kubectl` si elle n'est pas déjà installée : `gcloud components install kubectl`
1. Créez un nouveau cluster Google Kubernetes Engine : `gcloud container clusters create mycluster --zone us-central1-a --machine-type n1-standard-4`

_Voir les [zones](https://cloud.google.com/compute/docs/regions-zones/) et les [types de machines](https://cloud.google.com/compute/docs/machine-types/) de GCP pour d'autres options._

Une fois le cluster créé, vous pouvez utiliser le générateur Kubernetes de JHipster pour générer les descripteurs de déploiement.

1. Générer les fichiers de déploiement Kubernetes : `jhipster kubernetes`
1. Si vous souhaitez utiliser Google Container Registry pour publier des images de conteneur dans un registre privé :
  1. **Que devons-nous utiliser pour le nom de base du dépôt Docker** défini sur `gcr.io/VOTRE_ID_PROJET`

Construisez l'image du conteneur.

1. Si vous utilisez Google Container Registry, vous pouvez construire directement dans le registre sans démon Docker local : `./mvnw package -Pprod jib:build`
1. Sinon, construisez vers le démon Docker : `./mvnw package -Pprod jib:dockerBuild`

Déployez sur le cluster Kubernetes :

1. Appliquez les configurations Kubernetes : `./kubectl-apply.sh`

Pour toutes les fonctionnalités du générateur Kubernetes, voir [Déploiement sur Kubernetes](/kubernetes).

## Activer HTTPS

Pour activer HTTPS pour votre cluster, consultez la documentation de Ray Tsang sur [External Load Balancing docs](https://spring-gcp.saturnism.me/deployment/kubernetes/load-balancing/external-load-balancing).

Vous pouvez forcer l'utilisation de HTTPS en ajoutant la configuration suivante à votre `SecurityConfiguration.java`.

<pre>java
// Spring MVC
http.requiresChannel(channel -> channel
    .requestMatchers(r -> r.getHeader("X-Forwarded-Proto") != null).requiresSecure());

// WebFlux
http.redirectToHttps(redirect -> redirect
    .httpsRedirectWhen(e -> e.getRequest().getHeaders().containsKey("X-Forwarded-Proto")));
</pre>

Consultez la documentation de Spring Security pour [Servlet](https://docs.spring.io/spring-security/site/docs/5.5.x/reference/html5/#servlet-http-redirect) et pour [WebFlux](https://docs.spring.io/spring-security/site/docs/5.5.x/reference/html5/#webflux-http-redirect) pour plus d'informations.