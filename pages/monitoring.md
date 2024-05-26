---
layout: default
title: Surveillance de vos applications JHipster
permalink: /monitoring/
sitemap:
    priority: 0.7
    lastmod: 2023-07-12T00:00:00-00:00
---
# <i class="fa fa-line-chart"></i> Surveillance de vos applications JHipster

JHipster offre plusieurs options pour surveiller vos applications en temps réel.

## Sommaire

1. [Tableaux de bord générés](#tableaux-de-bord-générés)
2. [Métriques de sécurité](#métriques-de-sécurité)
3. [Registre JHipster](#registre-jhipster)
4. [ELK](#elk)
5. [Transfert des métriques vers un système de surveillance tiers pris en charge](#configuration-du-transfert-des-métriques)
6. [Zipkin](#zipkin)

## Tableaux de bord générés

Pour les monolithes et les passerelles, JHipster génère plusieurs tableaux de bord pour surveiller chaque application. 
Ces tableaux de bord sont disponibles en temps réel et constituent le moyen le plus simple de surveiller vos applications.

![Page de métriques JHipster][page-de-métriques-jhipster]

### Le tableau de bord des métriques

Le tableau de bord des métriques utilise Micrometer pour donner une vue détaillée des performances de l'application.

Il fournit des métriques sur :

- la JVM
- les requêtes HTTP
- l'utilisation du cache
- le pool de connexions de base de données

En cliquant sur le bouton d'expansion à côté des métriques des threads JVM, vous obtiendrez un vidage de threads de l'application en cours d'exécution, ce qui est très utile pour identifier les threads bloqués.

### Le tableau de bord de la santé

Le tableau de bord de la santé utilise l'endpoint de santé de Spring Boot Actuator pour fournir des informations de santé sur différentes parties de l'application. De nombreux contrôles de santé sont fournis par défaut par Spring Boot Actuator, et vous pouvez ajouter des contrôles de santé spécifiques à l'application.

### Le tableau de bord des journaux

Le tableau de bord des journaux permet de gérer en temps réel la configuration Logback de l'application en cours d'exécution. 
Vous pouvez modifier le niveau de journalisation d'un package Java en cliquant sur un bouton, ce qui est très pratique tant en développement qu'en production.

## Métriques de sécurité

JHipster suit les métriques de sécurité liées à JWT dans les projets qui utilisent le type d'authentification JWT.

En particulier, JHipster suit le nombre d'erreurs de validation de jetons (c'est-à-dire le nombre de jetons invalides) en tant que compteur personnalisé nommé `security.authentication.invalid-tokens`, et les causes de ces erreurs de validation avec les étiquettes de compteur suivantes :
- `invalid-signature` : la vérification de la signature JWT a échoué ;
- `expired` : le JWT a expiré ;
- `unsupported` : le format JWT ne correspond pas au format attendu par l'application ;
- `malformed` : le JWT n'était pas correctement construit.

Ces métriques ne sont pas disponibles dans les tableaux de bord générés, mais elles sont exposées en tant que métriques d'application et peuvent être [transférées à un système de surveillance tiers](#configuration-du-transfert-des-métriques) pour la visualisation.

## Registre JHipster

Le [Registre JHipster a sa propre page de documentation ici]({{ site.url }}/jhipster-registry/).

Il fournit principalement les mêmes tableaux de bord de surveillance que dans la section précédente, mais il fonctionne sur un serveur distinct. En tant que tel, il est un peu plus complexe à configurer, mais il est fortement recommandé d'avoir des tableaux de bord fonctionnant en dehors de l'application en cours d'exécution : sinon, ils ne seront pas disponibles en cas d'erreur de l'application.

<h2 id="elk">Stack ELK (Elasticsearch, Logstash, Kibana)</h2>

La stack ELK est souvent utilisée pour l'agrégation et la recherche de journaux, elle se compose des composants suivants :


- [Elasticsearch](https://www.elastic.co/products/elasticsearch) pour l'indexation des données (journaux et métriques)
- [Logstash](https://www.elastic.co/products/logstash) pour gérer et traiter les journaux reçus des applications
- [Kibana](https://www.elastic.co/products/kibana) pour visualiser les journaux avec une interface agréable

<div class="alert alert-warning"><i> Attention : </i>
JHipster prend en charge le transfert des journaux vers Logstash, cependant, à partir de la version JHipster 7, nous ne fournissons pas de déploiement Docker de la stack ELK et de tableaux de bord prêts à l'emploi. Cela faisait partie du sous-projet <a href="https://github.com/jhipster/jhipster-console">JHipster Console</a> qui n'est plus maintenu. Nous conseillons aux utilisateurs existants de migrer vers une autre solution ELK.</div>


### Transfert des journaux vers Logstash

Pour configurer une application JHipster pour transférer ses journaux vers Logstash, activez l'enregistrement de Logstash dans leur `application-dev.yml` ou `application-prod.yml` :

    jhipster:
        logging:
            logstash:
                enabled: true
                host: localhost
                port: 5000
                queueSize: 512

Pour collecter ces journaux, du côté de Logstash, un simple fichier `logstash.conf` peut être fourni :

    input {
        tcp {
            port => "5000"
            type => syslog
            codec => json_lines
        }
    }

    output {
        elasticsearch {
                hosts => ["${ELASTICSEARCH_HOST}:${ELASTICSEARCH_PORT}"]
                index => "logs-%{+YYYY.MM.dd}"
            }
        }
    }

Pour plus d'informations sur la configuration de la stack ELK, veuillez vous référer à la [documentation officielle d'Elastic](https://www.elastic.co/guide/en/elastic-stack/current/index.html).

<h2 id="configuration-du-transfert-des-métriques">Transfert des métriques vers un système de surveillance tiers pris en charge (JMX, Prometheus)</h2>

JHipster expose les métriques de l'application au format [Prometheus](https://prometheus.io/) par défaut.
Il est exposé sous `management/prometheus`.
Le transfert des métriques vers des systèmes alternatifs est également pris en charge via [spring boot actuator](https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-features.html#production-ready-metrics).

Si vous souhaitez désactiver l'exposition de l'endpoint des métriques, vous pouvez le désactiver dans `src/main/resources/application.yml`.

    management:
        prometheus:
            export:
                enabled: false


L'endpoint prometheus n'est pas protégé par défaut. Si vous souhaitez le protéger via spring security, vous pouvez le faire en ajoutant une authentification de base à l'endpoint prometheus
car prometheus peut fonctionner avec un endpoint de scraping protégé par une authentification de base.

Créez un nouveau fichier de configuration (par exemple `BasicAuthConfiguration.java`).

    @Configuration
    @Order(1)
    @ConditionalOnProperty(prefix = "management", name = "metrics.export.prometheus.enabled")
    public class BasicAuthConfiguration {

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
            http
                .antMatcher("/management/prometheus/**")
                .authorizeRequests()
                .anyRequest().hasAuthority(AuthoritiesConstants.ADMIN)
                .and()
                .httpBasic().realmName("jhipster")
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and().csrf().disable();
            return http.build();
        }
    }


Vous pouvez vous connecter avec les identifiants par défaut `admin/admin`. Vous devez ajouter la configuration suivante à votre configuration prometheus afin que prometheus puisse toujours scraper votre application.

    basic_auth:
        username: "admin"
        password: "admin"

Vous pouvez démarrer une instance préconfigurée de Grafana et Prometheus sur votre machine locale via `docker-compose -f src/main/docker/monitoring.yml up -d` pour consulter le
tableau de bord [jvm/micrometer](https://grafana.com/grafana/dashboards/4701) fourni.

![Grafana Micrometer Dashboard][grafana-micrometer-dashboard]

Remarque : Contrairement aux versions précédentes de JHipster, le reporting des métriques de JHipster 5.8 ne prend en charge que JMX et Prometheus par défaut. Veuillez consulter la documentation officielle des métriques pour savoir comment configurer d'autres reporters comme [Graphite](https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-features.html#production-ready-metrics-export-graphite).

## Zipkin

Les applications JHipster peuvent s'intégrer à [Zipkin](http://zipkin.io/) via [Spring Boot Actuator Tracing](https://github.com/spring-projects/spring-boot/blob/main/spring-boot-project/spring-boot-docs/src/docs/asciidoc/actuator/tracing.adoc) pour fournir une traçabilité distribuée pour votre architecture de microservices. Pour activer la traçabilité Zipkin, conditionnez votre application avec le profil maven/gradle `zipkin`. Cela déclenchera le reporting des spans vers le serveur Zipkin et ajoutera également des IDs de corrélation (TraceId, SpanId et ParentId) aux en-têtes de requête et aux journaux.

Zipkin fournit également une fonctionnalité de graphique des dépendances de service qui vous permet de visualiser les dépendances entre les microservices au fil du temps.

Pour plus d'informations sur la configuration de votre application pour reporter des traces à Zipkin, consultez la [documentation Spring Boot Production-ready Features](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html#actuator.micrometer-tracing).

[jhipster-metrics-page]: {{ site.url }}/images/jhipster_metrics_page.png "Page des métriques JHipster"
[grafana-micrometer-dashboard]: {{ site.url }}/images/monitoring_grafana_micrometer.png "Tableau de bord Grafana Micrometer"