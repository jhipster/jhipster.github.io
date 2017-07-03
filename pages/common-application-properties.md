---
layout: default
title: Common application properties
permalink: /common-application-properties/
sitemap:
    priority: 0.7
    lastmod: 2016-12-29T00:00:00-00:00
---

# <i class="fa fa-flask"></i> Common application properties

JHipster generates a Spring Boot application, and can be configured using the standard Spring Boot properties mechanism.

Those properties are configured at generation-time by JHipster, and often have different values in development and production modes: learn more about this in our [Profiles documentation]({{ site.url }}/profiles/).

In a JHipster application, there are three kinds of properties:

1. [Spring Boot standard application properties](#1)
2. [JHipster application properties](#2)
3. [Application-specific properties](#3)

## <a name="1"></a> Spring Boot standard application properties

Like any Spring Boot application, JHipster allows you to configure any standard [Spring Boot application property](http://docs.spring.io/spring-boot/docs/current/reference/html/common-application-properties.html).

## <a name="2"></a> JHipster application properties

JHipster provides specific application properties, which come from the [JHipster server-side library](https://github.com/jhipster/jhipster). Those properties are standard for all JHipster projects, but some of them only work depending on what you selected when you built your application: for example the `jhipster.cache.hazelcast` key only works if you selected Hazelcast as your 2nd-level Hibernate cache.

Those properties are configured using the `io.github.jhipster.config.JHipsterProperties` class.

Here is a documentation for those properties:

    jhipster:

        # Thread pool that will be used for asynchronous method calls in JHipster
        async:
            core-pool-size: 2 # Initial pool size
            max-pool-size: 50 # Maximum pool size
            queue-capacity: 10000 # Queue capacity of the pool

        # HTTP configuration
        http:
            # V_1_1 for HTTP/1.1 or V_2_0 for HTTP/2.
            # To use HTTP/2 you will need SSL support (see the Spring Boot "server.ssl" configuration)
            version: V_1_1
            cache: # Used by io.github.jhipster.web.filter.CachingHttpHeadersFilter
                timeToLiveInDays: 1461 # Static assets are cached for 4 years by default

        # Hibernate 2nd level cache, used by CacheConfiguration
        cache:
            hazelcast: # Hazelcast configuration
                time-to-live-seconds: 3600 # By default objects stay 1 hour in the cache
                backup-count: 1 # Number of objects backups
            ehcache: # Ehcache configuration
                time-to-live-seconds: 3600 # By default objects stay 1 hour in the cache
                max-entries: 100 # Number of objects in each cache entry
            infinispan: #Infinispan configuration
                config-file: default-configs/default-jgroups-tcp.xml
                # local app cache
                local:
                    time-to-live-seconds: 60 # By default objects stay 1 hour (in minutes) in the cache
                    max-entries: 100 # Number of objects in each cache entry
                #distributed app cache
                distributed:
                    time-to-live-seconds: 60 # By default objects stay 1 hour (in minutes) in the cache
                    max-entries: 100 # Number of objects in each cache entry
                    instance-count: 1
                #replicated app cache
                replicated:
                    time-to-live-seconds: 60 # By default objects stay 1 hour (in minutes) in the cache
                    max-entries: 100 # Number of objects in each cache entry

        # E-mail properties
        mail:
            from: jhipster@localhost # The default "from" address for e-mails
            base-url: http://127.0.0.1:8080 # URL to the application, used inside e-mails

        # Spring Security specific configuration
        security:
            remember-me: # JHipster secure implementation of the remember-me mechanism, for session-based authentication
                # security key (this key should be unique for your application, and kept secret)
                key: 0b32a651e6a65d5731e869dc136fb301b0a8c0e4
            client-authorization: # Used with JHipster UAA authentication
                access-token-uri: # URL of the JHipster UAA server OAuth tokens
                token-service-id: # ID of the current application
                client-id: # OAuth client ID
                client-secret: # OAuth client secret
            authentication:
                jwt: # JHipster specific JWT implementation
                    secret: # JWT secret key
                    token-validity-in-seconds: 86400 # Token is valid 24 hours
                    token-validity-in-seconds-for-remember-me: 2592000 # Remember me token is valid 30 days
                oauth: # Used by the JHipster OAuth 2 MongoDB specific implementation
                    client-id: # OAuth client ID
                    client-secret: # OAuth client secret
                    token-validity-in-seconds: 1800 # Token is valid 30 minutes

        # Swagger configuration
        swagger:
            default-include-pattern: /api/.*
            title: JHipster API
            description: JHipster API documentation
            version: 0.0.1
            terms-of-service-url:
            contact-name:
            contact-url:
            contact-email:
            license:
            license-url:

        # DropWizard Metrics configuration, used by MetricsConfiguration
        metrics:
            jmx: # Export metrics as JMX beans
                enabled: true # JMX is enabled by default
            # Send metrics to a Graphite server
            # Use the "graphite" Maven profile to have the Graphite dependencies
            graphite:
                enabled: false # Graphite is disabled by default
                host: localhost
                port: 2003
                prefix: jhipster
            # Send metrics to a Prometheus server
            # Use the "prometheus" Maven profile to have the Prometheus dependencies
            prometheus:
                enabled: false # Prometheus is disabled by default
                endpoint: /prometheusMetrics
            logs: # Reports Dropwizard metrics in the logs
                enabled: false
                reportFrequency: 60 # frequency of reports in seconds

        # Logging configuration, used by LoggingConfiguration
        logging:
            logstash: # Forward logs to Logstash over a socket
                enabled: false # Logstash is disabled by default
                host: localhost # Logstash server URL
                port: 5000 # Logstash server port
                queue-size: 512 # Queue for buffering logs
            spectator-metrics: # Reports Netflix Spectator metrics in the logs
                enabled: false # Spectator is disabled by default

        # Spring Social specific configuration, for Twitter/Facebook/Google authentication
        social:
            redirect-after-sign-in: "/#/home" # Redirect URL after successful authentication

        # By default cross-origin resource sharing (CORS) is disabled. Uncomment to enable.
        # Configure a standard org.springframework.web.cors.CorsConfiguration
        cors:
            allowed-origins: "*"
            allowed-methods: GET, PUT, POST, DELETE, OPTIONS
            allowed-headers: "*"
            exposed-headers:
            allow-credentials: true
            max-age: 1800

        # Ribbon displayed on the top left-hand side of JHipster applications
        ribbon:
            # Comma-separated list of profiles that display a ribbon
            display-on-active-profiles: dev

## <a name="3"></a> Application-specific properties

Your generated application can also have its own Spring Boot properties. This is highly recommended, as it allows type-safe configuration of the application, as well as auto-completion and documentation within an IDE.

JHipster has generated a `ApplicationProperties` class in the `config` package, which is already preconfigured, and it is already documented at the bottom the `application.yml`, `application-dev.yml` and `application-prod.yml` files. All you need to do is code your own specific properties.
