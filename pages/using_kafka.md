---
layout: default
title: Utilisation de Kafka
permalink: /using-kafka/
redirect_from:
  - /using_kafka.html
sitemap:
    priority: 0.7
    lastmod: 2019-10-30T00:00:00-00:00
---

# <i class="fa fa-envelope"></i> Utilisation de Kafka

## Fonctionnalités

[Kafka](http://kafka.apache.org/) est un système de messagerie de type publier-souscrire très populaire. JHipster propose un support optionnel pour Kafka, qui va :

- Configurer les [clients Kafka](https://docs.confluent.io/5.3.1/clients/consumer.html#java-client) avec JHipster.
- Ajouter la configuration nécessaire dans les fichiers `application-*.yml`.
- Générer un fichier de configuration Docker Compose, afin que Kafka soit utilisable en tapant `docker-compose -f src/main/docker/kafka.yml up -d`.

## Prérequis

Générez une nouvelle application et assurez-vous de sélectionner `Asynchronous messages using Apache Kafka` lorsque vous êtes invité à choisir les technologies que vous souhaitez utiliser. Un fichier de configuration Docker Compose est généré et vous pouvez démarrer Kafka avec la commande :

`docker-compose -f src/main/docker/kafka.yml up -d`

## Consommateur et Producteur

Un consommateur (classe `<nomApplication>KafkaConsumer`) est en cours d'exécution et peut être adapté à vos besoins.

Un producteur (classe `<nomApplication>KafkaProducer`) est également disponible et peut être appelé via un point de terminaison REST (classe `<nomApplication>KafkaResource`).

## Exécution de l'application

Autorisez l'accès au point de terminaison dans `SecurityConfiguration.java` :

`.antMatchers("/api/<nomApplication>-kafka/publish").permitAll()`

Si vous invoquez le point de terminaison `http://localhost:8080/api/<nomApplication>-kafka/publish?message=...`, vous devriez voir le message enregistré dans la console.
