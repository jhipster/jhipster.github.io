---
layout: default
title: Ports communs
permalink: /common-ports/
sitemap:
    priority: 0.7
    lastmod: 2021-03-08T12:00:00-00:00
---

# <i class="fa fa-plug"></i> Ports communs

JHipster configure de nombreux outils et services, et chacun d'eux utilisera probablement un ou plusieurs ports. Voici une documentation pour aider à comprendre à quoi sert chaque port et aider en cas de conflit de ports.

Veuillez noter que selon la [politique 1]({{ site.url }}/policies/) de JHipster, le port standard pour chaque technologie est utilisé, sauf si cela pose un problème (qui devrait être expliqué ici).

Les ports sont listés ici dans l'ordre, mais les questions les plus courantes concernent les ports `8080`, `9000` et `9060`.

<table class="table table-striped table-responsive">
  <tr>
    <th>Port</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>2181</td>
    <td>Zookeeper (utilisé avec Kafka)</td>
  </tr>
  <tr>
    <td>3000</td>
    <td>Grafana</td>
  </tr>
  <tr>
    <td>3306</td>
    <td>MySQL et MariaDB</td>
  </tr>
  <tr>
    <td>5000</td>
    <td>Logstash</td>
  </tr>
  <tr>
    <td>5432</td>
    <td>PostgreSQL</td>
  </tr>
  <tr>
    <td>5701</td>
    <td>Hazelcast</td>
  </tr>
  <tr>
    <td>6650</td>
    <td>Pulsar - Port du service</td>
  </tr>
  <tr>
    <td>7742</td>
    <td>Swagger Editor</td>
  </tr>
  <tr>
    <td>8080</td>
    <td>Port de développement du back-end de l'application JHipster (serveur Spring Boot)</td>
  </tr>
  <tr>
    <td>8081</td>
    <td>Port par défaut du microservice JHipster</td>
  </tr>
  <tr>
    <td>8091</td>
    <td>Couchbase - Port d'administration web</td>
  </tr>
  <tr>
    <td>8092</td>
    <td>Couchbase - Port de l'API</td>
  </tr>
  <tr>
    <td>8093</td>
    <td>Couchbase - Utilisé par les services de requête pour le trafic REST/HTTP</td>
  </tr>
  <tr>
    <td>8180</td>
    <td>Centre de gestion Hazelcast</td>
  </tr>
  <tr>
    <td>8301</td>
    <td>Consul - serflan-tcp et serflan-udp</td>
  </tr>
  <tr>
    <td>8302</td>
    <td>Consul - serfwan-tcp et serfwan-udp</td>
  </tr>
  <tr>
    <td>8300</td>
    <td>Consul - serveur</td>
  </tr>
  <tr>
    <td>8400</td>
    <td>Consul - RPC</td>
  </tr>
  <tr>
    <td>8500</td>
    <td>Consul - Port HTTP avec l'interface web</td>
  </tr>
  <tr>
    <td>8600</td>
    <td>Consul - DNS</td>
  </tr>
  <tr>
    <td>8761</td>
    <td>JHipster Registry (Netflix Eureka)</td>
  </tr>
  <tr>
    <td>9000</td>
    <td>Port de développement du front-end JHipster avec BrowserSync</td>
  </tr>
  <tr>
    <td>9001</td>
    <td>SonarQube</td>
  </tr>
  <tr>
    <td>9042</td>
    <td>Cassandra - CQL</td>
  </tr>
  <tr>
    <td>9060</td>
    <td>Port de développement du front-end JHipster avec Webpack hot-reload</td>
  </tr>
  <tr>
    <td>9090</td>
    <td>Prometheus</td>
  </tr>
  <tr>
    <td>9092</td>
    <td>Kafka</td>
  </tr>
  <tr>
    <td>9093</td>
    <td>Gestionnaire d'alertes Prometheus</td>
  </tr>
  <tr>
    <td>9160</td>
    <td>Cassandra - Thrift</td>
  </tr>
  <tr>
    <td>9200</td>
    <td>Elasticsearch - Connexions HTTP (API REST)</td>
  </tr>
  <tr>
    <td>9300</td>
    <td>Elasticsearch - Connexions de transport (API native)</td>
  </tr>
  <tr>
    <td>9411</td>
    <td>Zipkin</td>
  </tr>
  <tr>
    <td>11210</td>
    <td>Couchbase - Port de bucket interne/externe</td>
  </tr>
  <tr>
    <td>18080</td>
    <td>H2 (base de données intégrée) fonctionnant à l'intérieur d'un monolithe. Le port par défaut est normalement 9092, mais cela causerait un conflit avec Kafka, donc il est fixé comme "1" + "port Spring Boot"</td>
  </tr>
  <tr>
    <td>18081</td>
    <td>H2 (base de données intégrée) fonctionnant à l'intérieur d'un microservice. Voir la ligne ci-dessus pour plus d'informations</td>
  </tr>
  <tr>
    <td>27017</td>
    <td>MongoDB</td>
  </tr>
</table>
