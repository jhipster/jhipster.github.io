---
layout: default
title: Using a cache
permalink: /using-cache/
sitemap:
    priority: 0.7
    lastmod: 2017-02-10T18:40:00-00:00
---

# <i class="fa fa-line-chart"></i> Using a cache

A cache can be used at two levels in JHipster:

- With the Spring Cache abstraction, which is a specific question when your application is generated, and which uses the Spring Boot `@EnableCaching` annotation. This needs to be tuned according to your specific business needs, and works at a higher level than the Hibernate 2nd-level cache.
- As an Hibernate 2nd-level cache, a caching solution can give a huge performance boost to your application, and this is what people usually do with JHipster. Please note that this option is only available for SQL databases, and if you have selected to use Spring Cache.

Spring Cache and the Hibernate 2nd-level cache will use the same caching solution, but do not work at the same level: we do not recommend to use both for the same objects, as this will make cache invalidation issues even more complex. Instead, we recommend you use:

- Spring Cache for higher-level or aggregate objects, like you typically have with DTOs
- The Hibernate 2nd-level cache for entities mapped to the database, in order to reduce the number of SQL requests

JHipster supports 5 caches implementations: Ehcache, Caffeine, Hazelcast, Infinispan and Memcached. They are all detailed below.

## Common configuration

Caches are configured in the `CacheConfiguration` class, and can also be tuned using the JHipster [common application properties]({{ site.url }}/common-application-properties/).

## Caching with Ehcache

[Ehcache](http://www.ehcache.org/) is the default cache with monoliths in JHipster. Ehcache is simple to setup and configure, and starts up very fast, so it's a perfect solution for "normal" monoliths.

With JHipster, Ehcache cannot work as a distributed cache, as it doesn't have an API allowing to add new nodes programmatically

Ehcache is configured in the `CacheConfiguration` Spring configuration bean, which defines 2 properties (`time-to-live-seconds` and `max-entries`) in the JHipster [common application properties]({{ site.url }}/common-application-properties/). More properties can be added in your application's specific `ApplicationProperties` Spring configuration bean.

By default, `time-to-live-seconds` has a default value of 3600 seconds (1 hour) both in `dev` and in `prod` mode, and `max-entries` has a default value of 100 entries in `dev` mode and 1,000 entries in `prod` mode.

Those values should be tuned depending on your specific business needs, and the JHipster monitoring screen can help you better understand cache usage in your application. Please also refer to the Ehcache documentation to fine-tune those values.

## Caching with Caffeine

[Caffeine](https://github.com/ben-manes/caffeine) is a [high performance](https://github.com/ben-manes/caffeine/wiki/Benchmarks), [near optimal](https://github.com/ben-manes/caffeine/wiki/Efficiency) caching library and is an alternative to Ehcache for use with monoliths in JHipster. 

Similar to Ehcache, Caffeine cannot work as a distributed cache.

Jhipster generates a default configuration for Caffeine which is identical to Ehcache. However you may wish to add additional options to fine tune it to your needs. Caffeine cache configuration is done in `CacheConfiguration` Spring configuration bean whereas your application specific properties can be added to `ApplicationProperties` bean. You might find the following three files useful in defining your own Caffeine configuration.

- We use the [`CaffeineConfiguration`](https://github.com/ben-manes/caffeine/blob/master/jcache/src/main/java/com/github/benmanes/caffeine/jcache/configuration/CaffeineConfiguration.java) class within the `CacheConfiguration` bean to add Caffeine properties.

- You might find [`TypesafeConfigurator`](https://github.com/ben-manes/caffeine/blob/master/jcache/src/main/java/com/github/benmanes/caffeine/jcache/configuration/TypesafeConfigurator.java) along with [`reference.conf`](https://github.com/ben-manes/caffeine/blob/master/jcache/src/main/resources/reference.conf) as a reference to all supported Caffeine properties.

## Caching with Hazelcast

[Hazelcast](https://hazelcast.com/) can work as a local cache (like Ehcache), but can also work as a distributed cache. As a result:

- It is the default option for microservices, as we expect microservices to scale
- It is the default option for gateways, as we expect them to scale, and as Hazelcast is used to distribute the [gateway rate-limiting information]({{ site.url }}/api-gateway/#rate_limiting)
- When used within a monolith, Hazelcast needs to have the [JHipster Registry]({{ site.url }}/jhipster-registry/) option in order to scale

For scaling applications, Hazelcast will use the configured service discovery in order to find new nodes, and scale horizontally. With microservices and gateways, this will work both with the JHipster Registry and Consul, and for monoliths this will only work with the JHipster Registry.

When a new node is added, it will register itself to the service discovery (for instance, it will be available in the JHipster Registry), and look for other nodes of the same type. If it finds one or several nodes of the same type, it will create a clustered cache with them: you should see in the logs of each node a message, like in the following example:

    [172.18.0.10]:5701 [dev] [3.7]
    Members [4] {
    Member [172.18.0.10]:5701 - 3cbddfcd-0229-4cd5-be55-4611927a9071 this
    Member [172.18.0.5]:5701 - 204d457d-f6fe-43f2-8e8d-497e96b3f08e
    Member [172.18.0.14]:5701 - 7804d535-86fb-46be-b2a5-d7801dc6a4df
    Member [172.18.0.11]:5701 - 6114ae28-56cd-4840-a575-4d73a6003744
    }

To work better with Hazelcast, JHipster includes support for the Hazelcast Management Center:

- Please note that you can only monitor 2 nodes for free, as this is a proprietary product. But that's already enough for testing your application.
- It is configured using JHipster [common application properties]({{ site.url }}/common-application-properties/), using the key `jhipster.cache.hazelcast.management-center`, in your `application-dev.yml` and `application-prod.yml` files. Please note that it is disabled by default.
- JHipster generates a Docker Compose configuration to run easily the Hazelcast Management Center. Please read our [Docker Compose documentation]({{ site.url }}/docker-compose/), and run the application using `docker-compose -f src/main/docker/hazelcast-management-center.yml up -d`.

## Caching with Infinispan

[Infinispan](http://infinispan.org/) is a highly performant caching solution that can work as an in-memory local cache as well as clustered cache. It offers support for multiple cache modes,
  - [local](http://infinispan.org/docs/stable/user_guide/user_guide.html#local_mode)
  - [invalidation](http://infinispan.org/docs/stable/user_guide/user_guide.html#invalidation_mode)
  - [distributed](http://infinispan.org/docs/stable/user_guide/user_guide.html#replicated_mode)
  - [replicated](http://infinispan.org/docs/stable/user_guide/user_guide.html#distribution_mode)

With JHipster, Infinispan can be used:

- As an implementation of the Spring Cache abstraction
- As an Hibernate 2nd level cache

Following is the pre-configured default configuration:

- Entities operate in invalidation cache mode
- For application-specific caching, three caching configurations are pre-defined
  - **local-app-data** for caching data local to the nodes
  - **dist-app-data** for distributed caching of data across nodes (number of copies determined by the distributed replica count)
  - **repl-app-data** for replicating data across nodes

Eviction, time-to-live and max-entries for each of the individual operation mode in the cache and the replica count for the distributed mode can be fine-tuned using the JHipster [common application properties]({{ site.url }}/common-application-properties/). Fine tune the properties in `jhipster.cache.infinispan` for application-specific caching and `spring.jpa.properties` for Hibernate's 2nd level cache.

If the JHipster Registry is enabled, then the host list will be populated from the registry. If the JHipster Registry is not enabled, host discovery will be based on the default transport settings defined in the `config-file` packaged within the Infinispan Jar. Infinispan supports discovery natively for most of the platforms like Kubernets/OpenShift, AWS, Azure and Google.

Though Infinispan 9.0.0.Final GA and later releases added support to run Infinispan embedded caching applications on Kubernetes and OpenShift by making use of native KUBE_PING discovery, Hibernate dependency is not yet updated to 9.x releases and hence native discovery is not supported on Kubernetes and OpenShift. However you can run the applications by making use of JHipster Registry for instances discovery.

## Caching with Memcached

[Memcached](https://memcached.org/) is an Open Source distributed cache. It is quite different from the other cache implementations supported by JHipster:

- Memcached cannot work as an Hibernate 2nd level cache, it only supports the Spring Cache abstraction.
- Memcached only works with a remote server, there is no local cache. As such, your objects are always serialized/deserialized and go through the network, which means it is probably less efficient if you have a small set of objects that could easily fit in memory.
- It is very easy to scale, and cheap to host. Most big cloud providers like Heroku, GCP or AWS have support for Memcached. As such, it is a lot easier to have a distributed (and cheap) Memcached cluster, than with the other caching implementations.

JHipster uses the popular [Xmemcached](https://github.com/killme2008/xmemcached) Java client for Memcached, and configures its most important properties using the usual JHipster [common application properties]({{ site.url }}/common-application-properties/).

Please note that each cache must be configured as a specific Spring bean inside the `CacheConfiguration` configuration bean.

As Memcached needs to serialize/deserialize objects in its classloader, it doesn't work when using the Spring Boot devtools (which uses a specific classloader to do hot reload of application classes). This is why Memcached is disabled by default in dev mode.

As always with JHipster, a Docker Compose configuration is provided so you can easily start a Memcached server on your machine. In order to use it, please run `docker-compose -f src/main/docker/memcached.yml up -d`.

## Caching with Redis

[Redis](https://redis.io/) is an Open Source, in-memory data struture store that can be used as a performant caching solution. It is currently implemented in the generator JHipster as a single server node but can also work as a distributed cache.

JHipster uses [Redisson](https://redisson.org/) as the redis Java client mainly for 2 reasons:
- It is highly recommended by Redis
- It offers a JCache (JSR-107) implementation

It allows both to stay consistent with the other caches since we are using JCache implementation when available and to share the same redis connection between Spring cache and the Hibernate 2nd level cache.
