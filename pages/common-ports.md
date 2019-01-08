---
layout: default
title: Common ports
permalink: /common-ports/
sitemap:
    priority: 0.7
    lastmod: 2018-10-15T10:20:00-00:00
---

# <i class="fa fa-plug"></i> Common ports

JHipster configures many tools and services, and each of them will likely use one or several ports. Here is a documentation to help understand what each port does, and help in case of a port conflict.

Please note that as per the JHipster [Policy 1]({{ site.url }}/policies/), the standard port for each technology is used, unless that causes a problem (that should be explained here).

The ports here are listed in order, but the most common questions are for ports `8080`, `9000` and `9060`.

<table class="table table-striped table-responsive">
  <tr>
    <th>Port</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>80</td>
    <td>Traefik HTTP entrypoint</td>
  </tr>
  <tr>
    <td>2181</td>
    <td>Zookeeper (used with Kafka)</td>
  </tr>
  <tr>
    <td>3000</td>
    <td>Grafana</td>
  </tr>
  <tr>
    <td>3306</td>
    <td>MySQL and MariaDB</td>
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
    <td>5601</td>
    <td>JHipster Console (based on Kibana)</td>
  </tr>
  <tr>
    <td>5701</td>
    <td>Hazelcast</td>
  </tr>
  <tr>
    <td>8080</td>
    <td>JHipster application back-end development port (Spring Boot server)</td>
  </tr>
  <tr>
    <td>8081</td>
    <td>JHipster microservice default port</td>
  </tr>
  <tr>
    <td>8091</td>
    <td>Couchbase - Web administration port</td>
  </tr>
  <tr>
    <td>8092</td>
    <td>Couchbase - API port</td>
  </tr>
  <tr>
    <td>8093</td>
    <td>Couchbase - used by query services for REST/HTTP traffic</td>
  </tr>
  <tr>
    <td>8180</td>
    <td>Hazelcast management center</td>
  </tr>
  <tr>
    <td>8301</td>
    <td>Consul - serflan-tcp and serflan-udp</td>
  </tr>
  <tr>
    <td>8302</td>
    <td>Consul - serfwan-tcp and serfwan-udp</td>
  </tr>
  <tr>
    <td>8300</td>
    <td>Consul - server</td>
  </tr>
  <tr>
    <td>8400</td>
    <td>Consul - RPC</td>
  </tr>
  <tr>
    <td>8500</td>
    <td>Consul - HTTP port with the Web UI</td>
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
    <td>JHipster front-end development port with BrowserSync</td>
  </tr>
  <tr>
    <td>9042</td>
    <td>Cassandra - CQL</td>
  </tr>
  <tr>
    <td>9060</td>
    <td>JHipster front-end development port with Webpack hot-reload</td>
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
    <td>Prometheus alert manager</td>
  </tr>
  <tr>
    <td>9160</td>
    <td>Cassandra - Thrift</td>
  </tr>
  <tr>
    <td>9200</td>
    <td>Elasticsearch - HTTP connections (REST API)</td>
  </tr>
  <tr>
    <td>9300</td>
    <td>Elasticsearch - transport connections (native API)</td>
  </tr>
  <tr>
    <td>9411</td>
    <td>Zipkin</td>
  </tr>
  <tr>
    <td>11210</td>
    <td>Couchbase - Internal/external bucket port</td>
  </tr>
  <tr>
    <td>18080</td>
    <td>H2 (embedded database) running inside a monolith. Default port is normally 9092 but this would cause a conflict with Kafka, so it is fixed as "1" + "Spring Boot port"</td>
  </tr>
  <tr>
    <td>18081</td>
    <td>H2 (embedded database) running inside a microservice. See line above for more information</td>
  </tr>
  <tr>
    <td>27017</td>
    <td>MongoDB</td>
  </tr>
  <tr>
    <td>28080</td>
    <td>Traefik admin UI</td>
  </tr>
</table>
