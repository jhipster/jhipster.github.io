---
layout: default
title: Deploying to AWS with CloudCaptain
permalink: /cloudcaptain/
redirect_from:
  - /cloudcaptain.html
  - /boxfuse.html
  - /boxfuse/
sitemap:
    priority: 0.7
    lastmod: 2022-01-21T00:00:00-00:00
---

## Déploiement sur AWS avec CloudCaptain

Ce guide montre comment déployer votre application JHipster sur AWS en utilisant [CloudCaptain](https://cloudcaptain.sh/).

[![Logo CloudCaptain]({{ site.url }}/images/logo/logo-cloudcaptain.png)](https://cloudcaptain.sh/)

CloudCaptain offre un **support de premier ordre pour JHipster** et fonctionne en créant des images de machine minimales et immuables pour votre application, qui peuvent ensuite être déployées soit sur VirtualBox soit sur AWS.

<div class="alert alert-info"><i>Conseil : </i>

En alternative à CloudCaptain, vous pouvez également déployer votre application JHipster sur AWS en utilisant <a href="{{ site.url }}/aws/">Elastic Beanstalk</a>.

</div>

## Prérequis

Pour pouvoir déployer, vous devez d'abord [créer un compte CloudCaptain](https://console.cloudcaptain.sh) et installer le [Client CloudCaptain](https://cloudcaptain.sh/getstarted/download).

Vous devrez également connecter votre compte AWS dans la [Console CloudCaptain](https://console.cloudcaptain.sh).

## Préparation du déploiement

Lorsque votre application est prête, vous pouvez la préparer pour le déploiement en tapant :

`./mvnw package -Pprod -DskipTests`

Ou lorsque vous utilisez Gradle :

`./gradlew -Pprod bootJar -x test`

## Déploiement sur AWS

Pour déployer votre application sur AWS, tapez :

`boxfuse run -env=prod`

CloudCaptain analysera alors votre application, fusionnera une image minimale pour elle et provisionnera automatiquement, configurera et sécurisera toute l'infrastructure AWS nécessaire (instances, groupes de sécurité, IPs élastiques, ELBs, bases de données RDS MySQL ou PostgreSQL, ...)

<pre>plaintext
Création de jhipster ...
Mapping jhipster-dev-myuser.boxfuse.io vers 127.0.0.1 ...
App créée jhipster (single-instance / postgresql)
Fusion de l'image pour jhipster-1.0.war (JHipster) ...
Image fusionnée en 00:05.036s (96301 Ko) -> myuser/jhipster:1.0
Poussée de myuser/jhipster:1.0 ...
Vérification de myuser/jhipster:1.0 ...
Création du groupe de sécurité boxsg-db-myuser-prod-jhipster ...
Création de la base de données RDS PostgreSQL (db.t2.micro / 5 Go / single-az) => boxdb-myuser-prod-jhipster (cette action unique peut prendre jusqu'à 10 minutes pour se terminer) ...
En attente de la création d'une AMI AWS pour myuser/jhipster:1.0 dans eu-central-1 (cela peut prendre jusqu'à 50 secondes) ...
AMI créée en 00:35.564s dans eu-central-1 -> ami-35fa0b5a
En attente de la disponibilité de la base de données RDS boxdb-myuser-prod-jhipster ...
DB boxdb-myuser-prod-jhipster [création]
DB boxdb-myuser-prod-jhipster [sauvegarde]
DB boxdb-myuser-prod-jhipster [disponible]
Création du groupe de sécurité boxsg-myuser-prod-jhipster ...
Création d'une IP élastique ...
Mapping jhipster-myuser.boxfuse.io vers 52.29.78.197 ...
Création du groupe de sécurité boxsg-myuser-prod-jhipster-1.0 ...
Lancement de l'instance t2.micro de myuser/jhipster:1.0 (ami-35fa0b5a) dans prod (eu-central-1) ...
Instance lancée en 00:20.687s -> i-95d15028
Création d'une alarme Cloud Watch pour le redémarrage automatique de l'instance -> i-95d15028-auto-recovery-alarm
En attente du démarrage de l'instance i-95d15028 et du démarrage de la charge utile à l'adresse http://54.93.63.207:8080/ ...
Charge utile démarrée en 01:29.685s -> http://54.93.63.207:8080/
Remappage de l'IP élastique 52.29.78.197 vers i-95d15028 ...
Attente de 15s pour que AWS termine la transition sans interruption de l'IP élastique ...
Déploiement terminé avec succès. myuser/jhipster:1.0 est opérationnel et accessible à http://jhipster-myuser.boxfuse.io:8080/ </pre>

Notez que vous n'avez pas besoin de spécifier explicitement des éléments comme les ports, les URLs de vérification de l'état ou les types de base de données. Par défaut, CloudCaptain les découvre automatiquement à partir de votre fichier `application-prod.yml` JHipster et des jars inclus. Vous pouvez remplacer ces paramètres découverts automatiquement si vous le souhaitez, mais dans la plupart des cas, ce ne sera pas nécessaire.

## Déploiement de mises à jour

Pour déployer une mise à jour vers une application existante, suivez les étapes de préparation et de déploiement décrites ci-dessus. Toutes les mises à jour sont effectuées comme des déploiements bleu-vert sans interruption.

## Plus d'informations

*   [Commencez avec CloudCaptain et JHipster](https://cloudcaptain.sh/getstarted/jhipster)
*   [Documentation CloudCaptain JHipster](https://cloudcaptain.sh/docs/payloads/jhipster)
