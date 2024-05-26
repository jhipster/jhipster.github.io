---
layout: default
title: Utilisation d'un cache
permalink: /using-cache/
sitemap:
    priority: 0.7
    lastmod: 2017-02-10T18:40:00-00:00
---

# <i class="fa fa-line-chart"></i> Utilisation d'un cache

Un cache peut être utilisé à deux niveaux dans JHipster :

- Avec l'abstraction Spring Cache, qui est une question spécifique lors de la génération de votre application, et qui utilise l'annotation Spring Boot `@EnableCaching`. Cela doit être ajusté en fonction de vos besoins métier spécifiques, et fonctionne à un niveau supérieur que le cache de deuxième niveau Hibernate.
- Comme un cache de deuxième niveau Hibernate, une solution de mise en cache peut donner un énorme coup de pouce aux performances de votre application, et c'est ce que font généralement les gens avec JHipster. Veuillez noter que cette option n'est disponible que pour les bases de données SQL, et si vous avez sélectionné l'utilisation de Spring Cache.

Spring Cache et le cache de deuxième niveau Hibernate utiliseront la même solution de mise en cache, mais ne fonctionnent pas au même niveau : nous ne recommandons pas d'utiliser les deux pour les mêmes objets, car cela rendra les problèmes d'invalidation de cache encore plus complexes. Au lieu de cela, nous vous recommandons d'utiliser :

- Spring Cache pour les objets de niveau supérieur ou agrégés, comme vous en avez généralement avec les DTO
- Le cache de deuxième niveau Hibernate pour les entités mappées à la base de données, afin de réduire le nombre de requêtes SQL

JHipster prend en charge les implémentations de cache suivantes :
1. Ehcache,
2. Caffeine,
3. Hazelcast,
4. Infinispan,
5. Memcached,
6. Redis.

Ils sont tous détaillés ci-dessous.

## Configuration commune

Les caches sont configurés dans la classe `CacheConfiguration`, et peuvent également être ajustés en utilisant les [propriétés d'application communes de JHipster]({{ site.url }}/propriétés-d-application-communes/).

## Mise en cache avec Ehcache

[Ehcache](http://www.ehcache.org/) est le cache par défaut avec les monolithes dans JHipster. Ehcache démarre très rapidement, c'est donc une solution parfaite pour les monolithes "normaux".

Avec JHipster, Ehcache ne peut pas fonctionner comme un cache distribué, car il n'a pas d'API permettant d'ajouter de nouveaux nœuds de manière programmatique.

Ehcache est configuré dans la configuration Spring `CacheConfiguration`, qui définit 2 propriétés (`time-to-live-seconds` et `max-entries`) dans les [propriétés d'application communes de JHipster]({{ site.url }}/propriétés-d-application-communes/). Plus de propriétés peuvent être ajoutées dans la configuration Spring spécifique de votre application `ApplicationProperties`.

Par défaut, `time-to-live-seconds` a une valeur par défaut de 3600 secondes (1 heure) à la fois en mode `dev` et en mode `prod`, et `max-entries` a une valeur par défaut de 100 entrées en mode `dev` et 1 000 entrées en mode `prod`.

Ces valeurs doivent être ajustées en fonction de vos besoins métier spécifiques, et l'écran de surveillance de JHipster peut vous aider à mieux comprendre l'utilisation du cache dans votre application. Veuillez également vous référer à la documentation Ehcache pour affiner ces valeurs.

## Mise en cache avec Caffeine

[Caffeine](https://github.com/ben-manes/caffeine) est une bibliothèque de mise en cache [hautes performances](https://github.com/ben-manes/caffeine/wiki/Benchmarks), [quasi optimale](https://github.com/ben-manes/caffeine/wiki/Efficiency) et est une alternative à Ehcache pour une utilisation avec des monolithes dans JHipster.

Tout comme Ehcache, Caffeine ne peut pas fonctionner comme un cache distribué.

Jhipster génère une configuration par défaut pour Caffeine qui est identique à Ehcache. Cependant, vous pouvez souhaiter ajouter des options supplémentaires pour l'ajuster à vos besoins. La configuration du cache Caffeine se fait dans la configuration Spring `CacheConfiguration`, tandis que vos propriétés spécifiques à l'application peuvent être ajoutées à la configuration Spring `ApplicationProperties`. Vous pourriez trouver les trois fichiers suivants utiles pour définir votre propre configuration Caffeine.

- Nous utilisons la classe [`CaffeineConfiguration`](https://github.com/benmanes/caffeine/blob/master/jcache/src/main/java/com/github/benmanes/caffeine/jcache/configuration/CaffeineConfiguration.java) dans le bean de configuration Spring `CacheConfiguration` pour ajouter des propriétés Caffeine.

- Vous pourriez trouver [`TypesafeConfigurator`](https://github.com/benmanes/caffeine/blob/master/jcache/src/main/java/com/github/benmanes/caffeine/jcache/configuration/TypesafeConfigurator.java) ainsi que [`reference.conf`](https://github.com/benmanes/caffeine/blob/master/jcache/src/main/resources/reference.conf) comme référence à toutes les propriétés Caffeine prises en charge.

## Mise en cache avec Hazelcast

[Hazelcast](https://hazelcast.com/) peut fonctionner comme un cache local (comme Ehcache), mais peut également fonctionner comme un cache distribué. En conséquence :

- C'est l'option par défaut pour les microservices, car nous nous attendons à ce que les microservices se mettent à l'échelle.
- C'est l'option par défaut pour les passerelles, car nous nous attendons à ce qu'elles se mettent à l'échelle, et comme Hazelcast est utilisé pour distribuer les informations de [limitation du débit de la passerelle]({{ site.url }}/api-gateway/#rate_limiting)
- Lorsqu'il est utilisé dans un monolithe, Hazelcast doit avoir le [JHipster Registry]({{ site.url }}/jhipster-registry/) configuré manuellement pour se mettre à l'échelle.

Pour les applications à mise à l'échelle, Hazelcast utilisera la découverte de services configurée pour trouver de nouveaux nœuds et se mettre à l'échelle horizontalement. Avec les microservices et les passerelles, cela fonctionnera à la fois avec le registre JHipster et Consul, et pour les monolithes, cela ne fonctionnera que lorsque vous configurerez manuellement le registre JHipster.

Lorsqu'un nouveau nœud est ajouté, il s'enregistre auprès de la découverte de service (par exemple, il est disponible dans le registre JHipster) et recherche d'autres nœuds du même type. S'il trouve un ou plusieurs nœuds du même type, il créera un cache clusterisé avec eux : vous devriez voir dans les journaux de chaque nœud un message, comme dans l'exemple suivant :

    [172.18.0.10]:5701 [dev] [3.7]
    Members [4] {
    Member [172.18.0.10]:5701 - 3cbddfcd-0229-4cd5-be55-4611927a9071 this
    Member [172.18.0.5]:5701 - 204d457d-f6fe-43f2-8e8d-497e96b3f08e
    Member [172.18.0.14]:5701 - 7804d535-86fb-46be-b2a5-d7801dc6a4df
    Member [172.18.0.11]:5701 - 6114ae28-56cd-4840-a575-4d73a6003744
    }

Pour mieux fonctionner avec Hazelcast, JHipster inclut le support du centre de gestion Hazelcast :

- Veuillez noter que vous ne pouvez surveiller que 2 nœuds gratuitement, car il s'agit d'un produit propriétaire. Mais c'est déjà suffisant pour tester votre application.
- Il est configuré en utilisant les [propriétés d'application communes de JHipster]({{ site.url }}/propriétés-d-application-communes/), en utilisant la clé `jhipster.cache.hazelcast.management-center`, dans vos fichiers `application-dev.yml` et `application-prod.yml`. Veuillez noter qu'il est désactivé par défaut.
- JHipster génère une configuration Docker Compose pour exécuter le centre de gestion Hazelcast. Veuillez lire notre [documentation Docker Compose]({{ site.url }}/docker-compose/) et exécuter l'application en utilisant `docker-compose -f src/main/docker/hazelcast-management-center.yml up -d`.

## Mise en cache avec Infinispan

[Infinispan](http://infinispan.org/) est une solution de mise en cache très performante qui peut fonctionner comme un cache local en mémoire ainsi qu'un cache clusterisé. Il offre une prise en charge de plusieurs modes de cache :
  - [Local](https://infinispan.org/docs/9.4.x/user_guide/user_guide.html#local_mode)
  - [Invalidation](http://infinispan.org/docs/9.4.x/user_guide/user_guide.html#invalidation_mode)
  - [Distribué](http://infinispan.org/docs/9.4.x/user_guide/user_guide.html#replicated_mode)
  - [Répliqué](http://infinispan.org/docs/9.4.x/user_guide/user_guide.html#distribution_mode)
  - [Dispersé](https://infinispan.org/docs/9.4.x/user_guide/user_guide.html#scattered_mode)

Avec JHipster, Infinispan peut être utilisé :

- Comme implémentation de l'abstraction Spring Cache
- Comme cache de deuxième niveau Hibernate

Voici la configuration par défaut préconfigurée :

- Les entités opèrent en mode de cache d'invalidation
- Pour la mise en cache spécifique à l'application, trois configurations de mise en cache sont prédéfinies
  - **local-app-data** pour la mise en cache de données locale aux nœuds
  - **dist-app-data** pour la mise en cache distribuée des données entre les nœuds (nombre de copies déterminé par le compteur de réplicas distribuées)
  - **repl-app-data** pour la réplication des données entre les nœuds

L'éviction, le temps de vie et le nombre maximal d'entrées pour chacun des modes d'opération individuels dans le cache et le nombre de réplicas pour le mode distribué peuvent être ajustés en utilisant les [propriétés d'application communes de JHipster]({{ site.url }}/propriétés-d-application-communes/). Ajustez les propriétés dans `jhipster.cache.infinispan` pour la mise en cache spécifique à l'application et `spring.jpa.properties` pour le cache de deuxième niveau Hibernate.

Si le registre JHipster est activé, la liste des nœuds sera remplie à partir du registre. Si le registre JHipster n'est pas activé, la découverte des nœuds se fera en fonction des paramètres de transport par défaut définis dans le `config-file` empaqueté dans le Jar Infinispan. Infinispan prend en charge la découverte de manière native pour la plupart des plates-formes comme Kubernets/OpenShift, AWS, Azure et Google.

Bien qu'Infinispan 9.0.0.Final GA et les versions ultérieures aient ajouté la prise en charge de l'exécution des applications de mise en cache embarquées Infinispan sur Kubernetes et OpenShift en utilisant la découverte native KUBE_PING, la dépendance Hibernate n'est pas encore mise à jour vers les versions 9.x et donc la découverte native n'est pas prise en charge sur Kubernetes et OpenShift. Cependant, vous pouvez exécuter les applications en utilisant le registre JHipster pour la découverte des instances.

## Mise en cache avec Memcached

[Memcached](https://memcached.org/) est un cache distribué Open Source. Il est assez différent des autres implémentations de cache prises en charge par JHipster :

- Memcached ne peut pas fonctionner comme un cache de deuxième niveau Hibernate, il prend uniquement en charge l'abstraction Spring Cache.
- Memcached fonctionne uniquement avec un serveur distant, il n'y a pas de cache local. En tant que tel, vos objets sont toujours sérialisés/désérialisés et passent par le réseau, ce qui signifie qu'il est probablement moins efficace si vous avez un petit ensemble d'objets qui pourraient tenir en mémoire.
- Il est scalable et peu coûteux à exploiter. La plupart des grands fournisseurs de cloud comme Heroku, GCP ou AWS prennent en charge Memcached. En tant que tel, il est beaucoup plus facile d'avoir un cluster Memcached distribué (et bon marché) qu'avec les autres implémentations de mise en cache.

JHipster utilise le client Java populaire [Xmemcached](https://github.com/killme2008/xmemcached) pour Memcached, et configure ses propriétés les plus importantes en utilisant les [propriétés d'application communes]({{ site.url }}/propriétés-d-application-communes) habituelles de JHipster.

Veuillez noter que chaque cache doit être configuré comme un bean Spring spécifique à l'intérieur du bean de configuration `CacheConfiguration`.

Comme Memcached doit sérialiser/désérialiser des objets dans son chargeur de classes, il ne fonctionne pas lors de l'utilisation des outils de développement Spring Boot (qui utilisent un chargeur de classes spécifique pour effectuer un rechargement à chaud des classes d'application). C'est pourquoi Memcached est désactivé par défaut en mode développement.

Comme toujours avec JHipster, une configuration Docker Compose est fournie afin que vous puissiez démarrer un serveur Memcached sur votre machine. Pour l'utiliser, veuillez exécuter `docker-compose -f src/main/docker/memcached.yml up -d`.

## Mise en cache avec Redis

[Redis](https://redis.io/) est un magasin de données en mémoire Open Source qui peut être utilisé comme une solution de mise en cache performante. Selon votre configuration, vous pouvez choisir d'utiliser Redis comme un nœud serveur unique ou comme un cache distribué.

JHipster utilise [Redisson](https://redisson.org/) comme client Java pour Redis principalement pour 2 raisons :
- Il est fortement recommandé par Redis
- Il offre une implémentation JCache (JSR-107)

Cela permet à la fois de rester cohérent avec les autres caches puisque nous utilisons l'implémentation JCache lorsque disponible et de partager la même connexion redis entre le cache Spring et le cache de deuxième niveau Hibernate.