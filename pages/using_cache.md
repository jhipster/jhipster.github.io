---
layout: default
title: Using a cache
permalink: /using-cache/
sitemap:
    priority: 0.7
    lastmod: 2017-02-10T18:40:00-00:00
---

# <i class="fa fa-line-chart"></i> Using a cache

A cache can be used at three levels in JHipster:

- As an Hibernate 2nd-level cache, a caching solution can give a huge performance boost to your application. This is what people usually do with JHipster, and it is only available for SQL databases.
- With the Spring caching abstraction, using the `@EnableCaching` annotation, which is enabled by default if you selected Ehcache/Hazelcast/Infinispan. This needs to be tuned according to your specific business needs, and works at a higher level than the Hibernate 2nd-level cache. However, we do not recommend to use both the Spring caching abstraction and the Hibernate 2nd-level cache, as this will make cache invalidation issues even more complex.
- For clustered HTTP sessions, a caching solution will replicate users' HTTP sessions over several nodes, allowing the application to scale horizontally. This solution is available with Hazelcast. This is only useful if you have a stateful application, which is not the default in JHipster, and which isn't recommended. You will also need a front-end load-balancer in front of your application nodes.

## Common configuration

Caches are configured in the `CacheConfiguration` class, and can also be tuned using the JHipster [common application properties]({{ site.url }}/common-application-properties/).

## Caching with Ehcache

[Ehcache](http://www.ehcache.org/) is the default cache with monoliths in JHipster. Ehcache is simple to setup and configure, and starts up very fast, so it's a perfect solution for "normal" monoliths.

With JHipster, Ehcache has two limitations:

- It cannot be used for HTTP sessions clustering
- It cannot work as a distributed cache, as it doesn't have an API allowing to add new nodes programmatically

Ehcache has a specific XML configuration, which is located at `src/main/resources/config/ehcache/ehcache-dev.xml` for "dev" mode, and `src/main/resources/config/ehcache/ehcache-prod.xml` for "prod" mode. By default, the "dev" mode uses caches with 100 entries, and the "prod" uses caches with 1,000 entries. Those caches should be tuned depending on your specific business needs, and the JHipster monitoring screen can help you better understand cache usage in your application. Please refer to the Ehcache documentation to fine-tune those caches.

## Caching with Hazelcast

[Hazelcast](https://hazelcast.com/) can work as a local cache (like Ehcache), but can also work as a distributed cache. As a result:

- It can be used for HTTP sessions clustering
- It is the default option for microservices, as we expect microservices to scale
- When used in a a monolith, Hazelcast needs to have the [JHipster Registry]({{ site.url }}/jhipster-registry/) option in order to scale

For scaling both monoliths and microservices, Hazelcast will use the configured service discovery in order to find new nodes, and scale horizontally. With microservices, this will work both with the JHipster Registry and Consul, and for monoliths this will only work with the JHipster Registry.

When a new node is added, it will register itself to the service discovery (for instance, it will be available in the JHipster Registry), and look for other nodes of the same type. If it finds one or several nodes of the same type, it will create a clustered cache with them: you should see in the logs of each node a message, like in the following example:

    [172.18.0.10]:5701 [dev] [3.7]
    Members [4] {
    Member [172.18.0.10]:5701 - 3cbddfcd-0229-4cd5-be55-4611927a9071 this
    Member [172.18.0.5]:5701 - 204d457d-f6fe-43f2-8e8d-497e96b3f08e
    Member [172.18.0.14]:5701 - 7804d535-86fb-46be-b2a5-d7801dc6a4df
    Member [172.18.0.11]:5701 - 6114ae28-56cd-4840-a575-4d73a6003744
    }

## Caching with Infinispan

[Infinispan](http://infinispan.org/) is a highly performant caching solution that can work as an in-memory local cache as well as clustered cache. It offers support for multiple cache modes,
  - [local](http://infinispan.org/docs/stable/user_guide/user_guide.html#local_mode)
  - [invalidation](http://infinispan.org/docs/stable/user_guide/user_guide.html#invalidation_mode)
  - [distributed](http://infinispan.org/docs/stable/user_guide/user_guide.html#replicated_mode)
  - [replicated](http://infinispan.org/docs/stable/user_guide/user_guide.html#distribution_mode).

With JHipster, Infinispan can be used for

- Hibernate L2 cache
- Application cache in any of the aforesaid mode by making use of jcache[@CacheResult]/spring[@Cacheable] caching abstractions

Following is the pre-configured default configuration:

- Entities operate in invalidation cache mode
- For application specific caching, three caching configurations are pre defined
  - **local-app-data** for caching data local to the nodes
  - **dist-app-data** for distributed caching of data across nodes (number of copies determined by the distributed replica count)
  - **repl-app-data** for replicating data across nodes

Eviction, time-to-live and max-entries for each of the individual operation mode in the cache and the replica count for the distributed mode can be fine-tuned using the JHipster [common application properties]({{ site.url }}/common-application-properties/). Fine tune the properties in *jhipster.cache.infinispan* for application specific caching and *spring.jpa.properties.[hibernate.cache.x]* for L2 specific caching.

If the JHipster Registry is enabled, then the host list will be populated from the registry. If the JHipster Registry is not enabled, host discovery will be based on the default transport settings defined in the 'config-file' packaged within the Infinispan Jar. Infinispan supports discovery natively for most of the platforms like Kubernets/OpenShift, AWS, Azure and Google

Though Infinispan 9.0.0.Final GA and later releases added support to run Infinispan embedded caching applications on Kubernetes and OpenShift by making use of native KUBE_PING discovery, Hibernate dependency is not yet updated to 9.x releases and hence native discovery is not supported on Kubernetes and OpenShift. However you can run the applications by making use of JHipster Registry for instances discovery.
