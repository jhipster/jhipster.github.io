---
layout: default
title: Propriétés communes de l'application
permalink: /common-application-properties/
sitemap:
    priority: 0.7
    lastmod: 2018-03-18T18:20:00-00:00
---

# <i class="fa fa-flask"></i> Propriétés communes de l'application

JHipster génère une application Spring Boot, qui peut être configurée en utilisant le mécanisme standard des propriétés Spring Boot.

Ces propriétés sont configurées lors de la génération par JHipster et ont souvent des valeurs différentes en mode développement et en mode production : en savoir plus à ce sujet dans notre [documentation sur les profils]({{ site.url }}/profiles/).

Dans une application JHipster, il existe trois types de propriétés :

1. [Propriétés standard des applications Spring Boot](#1)
2. [Propriétés des applications JHipster](#2)
3. [Propriétés spécifiques à l'application](#3)

<h2 id="1">Propriétés standard des applications Spring Boot</h2>

Comme toute application Spring Boot, JHipster vous permet de configurer n'importe quelle propriété standard des [applications Spring Boot](http://docs.spring.io/spring-boot/docs/current/reference/html/common-application-properties.html).

<h2 id="2">Propriétés des applications JHipster</h2>

JHipster fournit des propriétés d'application spécifiques, qui proviennent de la [bibliothèque côté serveur JHipster](https://github.com/jhipster/jhipster). Ces propriétés sont standard pour tous les projets JHipster, mais certaines ne fonctionnent que selon ce que vous avez sélectionné lors de la création de votre application : par exemple, la clé `jhipster.cache.hazelcast` ne fonctionne que si vous avez sélectionné Hazelcast comme cache Hibernate de 2ème niveau.

Ces propriétés sont configurées à l'aide de la classe `io.github.jhipster.config.JHipsterProperties`.

Voici une documentation pour ces propriétés :

```YAML
    jhipster:

        # Pool de threads utilisé pour les appels de méthodes asynchrones dans JHipster
        async:
            core-pool-size: 2 # Taille initiale du pool
            max-pool-size: 50 # Taille maximale du pool
            queue-capacity: 10000 # Capacité de la file d'attente du pool

        # Configuration spécifique pour les passerelles JHipster
        # Voir https://www.jhipster.tech/api-gateway/ pour plus d'informations sur les passerelles JHipster
        gateway:
            rate-limiting:
                enabled: false # Le contrôle de débit est désactivé par défaut
                limit: 100_000L # Par défaut, nous autorisons 100 000 appels API
                duration-in-seconds: 3_600 # Par défaut, le contrôle de débit est réinitialisé toutes les heures
            authorized-microservices-endpoints: # Politique de contrôle d'accès, si laissée vide pour une route, tous les points de terminaison seront accessibles
                app1: /api # Configuration recommandée en prod, elle permet l'accès à tous les appels API du microservice "app1"

        # Configuration HTTP
        http:
            cache: # Utilisé par io.github.jhipster.web.filter.CachingHttpHeadersFilter
                timeToLiveInDays: 1461 # Les ressources statiques sont mises en cache pendant 4 ans par défaut

        # Cache de 2ème niveau Hibernate, utilisé par CacheConfiguration
        cache:
            hazelcast: # Configuration Hazelcast
                time-to-live-seconds: 3600 # Par défaut, les objets restent 1 heure dans le cache
                backup-count: 1 # Nombre de sauvegardes des objets
                # Configurer le centre de gestion Hazelcast
                # La référence complète est disponible à : http://docs.hazelcast.org/docs/management-center/3.9/manual/html/Deploying_and_Starting.html
                management-center:
                    enabled: false # Le centre de gestion Hazelcast est désactivé par défaut
                    update-interval: 3 # Les mises à jour sont envoyées au centre de gestion Hazelcast toutes les 3 secondes par défaut
                    # URL par défaut pour le centre de gestion Hazelcast lors de l'utilisation de la configuration Docker Compose de JHipster
                    # Voir src/main/docker/hazelcast-management-center.yml
                    # Attention, le port par défaut est 8180 car le port 8080 est déjà utilisé par JHipster
                    url: http://localhost:8180/mancenter
            ehcache: # Configuration Ehcache
                time-to-live-seconds: 3600 # Par défaut, les objets restent 1 heure dans le cache
                max-entries: 100 # Nombre d'objets dans chaque entrée de cache
            caffeine: # Configuration Caffeine
                time-to-live-seconds: 3600 # Par défaut, les objets restent 1 heure dans le cache
                max-entries: 100 # Nombre d'objets dans chaque entrée de cache    
            infinispan: # Configuration Infinispan
                config-file: default-configs/default-jgroups-tcp.xml
                # Cache local de l'application
                local:
                    time-to-live-seconds: 60 # Par défaut, les objets restent 1 heure (en minutes) dans le cache
                    max-entries: 100 # Nombre d'objets dans chaque entrée de cache
                # Cache distribué de l'application
                distributed:
                    time-to-live-seconds: 60 # Par défaut, les objets restent 1 heure (en minutes) dans le cache
                    max-entries: 100 # Nombre d'objets dans chaque entrée de cache
                    instance-count: 1
                # Cache répliqué de l'application
                replicated:
                    time-to-live-seconds: 60 # Par défaut, les objets restent 1 heure (en minutes) dans le cache
                    max-entries: 100 # Nombre d'objets dans chaque entrée de cache
            # Configuration Memcached
            # Utilise la bibliothèque Xmemcached, voir https://github.com/killme2008/xmemcached
            memcached:
                # Désactivé par défaut en mode dev, car il ne fonctionne pas avec Spring Boot devtools
                enabled: true
                servers: localhost:11211 # Liste des adresses des serveurs, séparées par des virgules ou des espaces
                expiration: 300 # Temps d'expiration (en secondes) du cache
                use-binary-protocol: true # Le protocole binaire est recommandé pour les performances (et la sécurité)
                authentication: # Si l'authentification est requise, vous pouvez la configurer avec ces paramètres. Désactivé par défaut
                    enabled: false,
                    # username: non défini par défaut
                    # password: non défini par défaut
            redis: # Configuration Redis
                expiration: 3600 # Par défaut, les objets restent 1 heure (en secondes) dans le cache
                server: redis://localhost:6379 # Adresse du serveur
                cluster: false
                connectionPoolSize: 64,
                connectionMinimumIdleSize: 24,
                subscriptionConnectionPoolSize: 50,
                subscriptionConnectionMinimumIdleSize: 1

        # Propriétés de l'e-mail
        mail:
            enabled: false # Si l'envoi d'e-mails est activé. Les clés standard `spring.mail` devront être configurées
            from: jhipster@localhost # Adresse "from" par défaut pour les e-mails
            base-url: http://127.0.0.1:8080 # URL de l'application, utilisée dans les e-mails

        # Configuration spécifique à Spring Security
        security:
            remember-me: # Implémentation sécurisée du mécanisme de remember-me de JHipster, pour l'authentification basée sur les sessions
                # clé de sécurité (cette clé doit être unique pour votre application et gardée secrète)
                key: 0b32a651e6a65d5731e869dc136fb301b0a8c0e4
            authentication:
                jwt: # Implémentation spécifique JWT de JHipster
                    # Le token secret doit être encodé en Base64 (vous pouvez taper `echo 'secret-key'|base64` dans votre terminal).
                    # Si les deux propriétés sont configurées, la propriété `secret` a une priorité plus élevée que la propriété `base64-secret`.
                    secret: # Clé secrète JWT en clair (non recommandé)
                    base64-secret:  # Clé secrète JWT encodée en Base64 (recommandé)
                    token-validity-in-seconds: 86400 # Le token est valide 24 heures
                    token-validity-in-seconds-for-remember-me: 2592000 # Le token remember me est valide 30 jours

        # Configuration Swagger
        swagger:
            default-include-pattern: /api/.*
            title: JHipster API
            description: Documentation de l'API JHipster
            version: 0.0.1
            terms-of-service-url:
            contact-name:
            contact-url:
            contact-email:
            license:
            license-url:
            host:
            protocols:

        # Configuration DropWizard Metrics, utilisée par MetricsConfiguration
        metrics:
            jmx: # Exporter les métriques en tant que beans JMX
                enabled: true # JMX est activé par défaut
            # Envoyer les métriques à un serveur Graphite
            # Utilisez le profil Maven "graphite" pour avoir les dépendances Graphite
            graphite:
                enabled: false # Graphite est désactivé par défaut
                host: localhost
                port: 2003
                prefix: jhipster
            # Envoyer les métriques à un serveur Prometheus
            prometheus:
                enabled: false # Prometheus est désactivé par défaut
                endpoint: /prometheusMetrics
            logs: # Rapporter les métriques Dropwizard dans les logs
                enabled: false
                reportFrequency: 60 # Fréquence des rapports en secondes

        # Configuration de la journalisation, utilisée par LoggingConfiguration
        logging:
            logstash: # Transférer les logs à Logstash via une socket
                enabled: false # Logstash est désactivé par défaut
                host: localhost # URL du serveur Logstash
                port: 5000 # Port du serveur Logstash
                queue-size: 512 # File d'attente pour la mise en mémoire tampon des logs
            spectator-metrics: # Rapporter les métriques Netflix Spectator dans les logs
                enabled: false # Spectator est désactivé par défaut

        # Par défaut, le partage de ressources cross-origin (CORS) est activé en mode "dev" pour
        # les monolithes et les passerelles.
        # Il est désactivé par défaut en mode "prod" pour des raisons de sécurité, et pour les microservices
        # (car vous êtes censé utiliser une passerelle pour y accéder).
        # Ceci configure un standard org.springframework.web.cors.CorsConfiguration
        # Notez que "exposed-headers" est obligatoire pour la sécurité basée sur JWT, qui utilise
        # l'en-tête "Authorization", qui n'est pas un en-tête exposé par défaut.
        cors:
            allowed-origins: "*"
            allowed-methods: "*"
            allowed-headers: "*"
            exposed-headers: "Authorization"
            allow-credentials: true
            max-age: 1800

        # Ruban affiché en haut à gauche des applications JHipster
        ribbon:
            # Liste de profils séparés par des virgules qui affichent un ruban
            display-on-active-profiles: dev

```

<h2 id="3">Propriétés spécifiques à l'applications</h2>

Votre application générée peut également avoir ses propres propriétés Spring Boot. Ceci est fortement recommandé, car cela permet une configuration type-safe de l'application, ainsi que l'auto-complétion et la documentation au sein d'un IDE.

JHipster a généré une classe `ApplicationProperties`  dans le package `config`, qui est déjà préconfigurée et documentée en bas des fichiers  `application.yml`, `application-dev.yml` et `application-prod.yml` . Il vous suffit de coder vos propres propriétés spécifiques.
