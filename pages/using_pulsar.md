---
layout: default
title: Utilisation de Pulsar
permalink: /using-pulsar/
redirect_from:
  - /using_pulsar.html
sitemap:
    priority: 0.7
    lastmod: 2019-10-30T00:00:00-00:00
---

# <i class="fa fa-envelope"></i> Utilisation de Pulsar

## Fonctionnalités

[Pulsar](http://pulsar.apache.org/) est un système de messagerie pub-sub populaire qui prend en charge à la fois les cas d'utilisation en streaming et en file d'attente. JHipster prend en charge de manière facultative Pulsar, ce qui permet de :

- Configurer les [clients Pulsar](https://pulsar.apache.org/docs/2.11.x/client-libraries-java/) avec JHipster.
- Générer un fichier de configuration Docker Compose, de sorte que Pulsar soit utilisable en tapant `docker-compose -f src/main/docker/pulsar.yml up -d`.
- Générer un test d'intégration en utilisant le binder Pulsar de [Spring Cloud Stream](https://docs.spring.io/spring-cloud-stream/docs/current/reference/html/) et [Testcontainers](https://www.testcontainers.org/).

## Prérequis

Générez une nouvelle application et assurez-vous de sélectionner `Messages asynchrones en utilisant Apache Pulsar` lorsqu'on vous demande les technologies que vous souhaitez utiliser. Un fichier de configuration Docker Compose est généré et vous pouvez démarrer Pulsar avec la commande suivante :

```sh
docker-compose -f src/main/docker/pulsar.yml up -d
```

## Utilisation

Consultez la [documentation Spring pour Apache Pulsar](https://docs.spring.io/spring-pulsar/docs/current/reference/html/) (préférez le lien vers la documentation pulsar versionnée généré dans le fichier README.md de votre application) pour savoir comment utiliser Pulsar dans JHipster.
Il existe plusieurs façons d'interagir avec Pulsar, du plus bas au plus haut niveau d'abstraction :
* Générer des producteurs/consommateurs/lecteurs à partir respectivement de PulsarProducerFactory/PulsarConsumerFactory/PulsarReaderFactory
* Injecter PulsarTemplate et créer des beans PulsarListener
* Configurer les binders Spring Cloud Streams dans `application.yml` et les beans Supplier/Consumer/Function (consultez le test généré pour un exemple).