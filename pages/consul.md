---
layout: default
title: Consul
permalink: /consul/
sitemap:
    priority: 0.7
    lastmod: 2017-05-03T00:00:00-00:00
---

# <i class="fa fa-bullseye"></i> Consul

## Aperçu de Consul

[Consul](https://www.consul.io/) est utilisé comme solution par défaut pour le registre de services.
Comparé à Eureka, il présente plusieurs avantages :

- Il est plus facile à utiliser dans un cluster multi-nœuds qu'Eureka.
- Il favorise la cohérence par rapport à la disponibilité, de sorte que les changements dans l'état de votre cluster sont propagés plus rapidement.
- La découverte de services Consul peut interagir avec les applications existantes via son [interface DNS](https://www.consul.io/docs/agent/dns.html) ou son [API HTTP](https://www.consul.io/docs/agent/http.html).

## Diagramme d'architecture

<img src="{{ site.url }}/images/microservices_architecture_detail.003.png" alt="Diagramme" style="width: 800; height: 600" class="img-responsive"/>

## Commencer

Pour commencer à développer des applications qui reposent sur un registre Consul, vous pouvez démarrer une instance Consul dans un conteneur Docker :

- exécutez `docker-compose -f src/main/docker/consul.yml up` pour démarrer un serveur Consul en mode `dev`. Consul sera alors disponible sur le port `8500` de votre hôte Docker, donc s'il s'exécute sur votre machine, il devrait être accessible à [http://127.0.0.1:8500/](http://127.0.0.1:8500/).

Vous pouvez également utiliser le [sous-générateur Docker Compose]({{ site.url }}/docker-compose/#docker-compose-subgen) pour générer une configuration Docker pour plusieurs applications compatibles avec Consul.

## Configuration de l'application avec Consul

Si vous avez choisi l'option Consul lors de la génération de votre microservice ou application gateway JHipster, ils seront automatiquement configurés pour récupérer leur configuration à partir du **Key/Value store** de Consul.

Le Key/Value (K/V) store peut être modifié soit via son interface utilisateur disponible à [http://localhost:8500/v1/kv/](http://localhost:8500/v1/kv/) soit via son [API REST](https://www.consul.io/intro/getting-started/kv.html). Cependant, les modifications apportées de cette manière sont temporaires et seront perdues à l'arrêt du serveur/cluster Consul.
Ainsi, afin de vous aider à interagir avec le Key/Value store et gérer votre configuration sous forme de fichiers YAML, l'équipe JHipster a développé un petit outil : le [consul-config-loader](https://github.com/jhipster/consul-config-loader).
Le **consul-config-loader** est automatiquement configuré lors du démarrage de Consul à partir du fichier `consul.yml` docker-compose, mais il peut également être exécuté en tant qu'outil autonome.
Il peut être exécuté en deux modes :

- un mode **dev**, où les fichiers YAML du répertoire `central-server-config` sont automatiquement chargés dans Consul. De plus, toute modification apportée à ce répertoire sera immédiatement synchronisée avec Consul.
- un mode **prod**, qui utilise Git2Consul pour configurer les fichiers YAML contenus dans un dépôt Git comme source de configuration pour le Key/Value store.

Notez que, comme avec le JHipster Registry, vos fichiers de configuration devront être nommés `appname-profile.yml` où appname et profile correspondent au nom et au profil de l'application que vous souhaitez configurer. Par exemple, l'ajout de propriétés dans un fichier `consulapp-prod.yml` définira ces propriétés uniquement pour l'application nommée `consulapp` démarrée avec un profil `prod`. De plus, les propriétés définies dans `application.yml` seront définies pour toutes vos applications.