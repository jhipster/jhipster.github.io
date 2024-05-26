---
layout: default
title: Configure Redis leader follower(master-slave) replication
sitemap:
priority: 0.1
lastmod: 2020-03-23T12:30:00-00:00
---

# Configurer la réplication maître-esclave (leader follower) Redis

**Astuce soumise par [@zhx828](https://github.com/zhx828)**

Dans le dernier générateur JHipster, il fournit un paramétrage de cluster Redis pour le déploiement en production. Mais souvent, cela peut être excessif pour de petits projets. Ce document fournit une solution pour configurer la réplication maître-esclave Redis. Pour plus d'informations sur la réplication Redis, veuillez consulter [ici](https://redis.io/topics/replication).

Les changements suivants sont basés sur ma propre configuration de projet. Je suppose que vous avez modifié vos propriétés d'application pour configurer le mot de passe Redis, vous pouvez donc ajuster le vôtre en conséquence.


## Étape 1

Ajoutez le fichier `RedisProperties.java` :

```
public class RedisProperties {
    String type;
    String password;
    MasterSlaveRedisCache masterSlaveCache;
    SingleRedisCache singleCache;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public MasterSlaveRedisCache getMasterSlaveCache() {
        return masterSlaveCache;
    }

    public void setMasterSlaveCache(MasterSlaveRedisCache masterSlaveCache) {
        this.masterSlaveCache = masterSlaveCache;
    }

    public SingleRedisCache getSingleCache() {
        return singleCache;
    }

    public void setSingleCache(SingleRedisCache singleCache) {
        this.singleCache = singleCache;
    }
}
```

## Étape 2

Mettez à jour le fichier  `ApplicationProperties.java`
```
public class ApplicationProperties {
    ...

    private RedisProperties redis;
    
    public RedisProperties getRedis() {
        return redis;
    }

    public void setRedis(RedisProperties redis) {
        this.redis = redis;
    }
    ...
}
```

## Étape 3
Mettez à jour la méthode jcacheConfiguration dans CacheConfiguration.java. Ces modifications doivent être combinées avec la configuration actuelle du cluster.

```
if (applicationProperties.getRedis().getType().equals(RedisType.SINGLE.getType())) {
    config.useSingleServer()
        .setAddress(applicationProperties.getRedis().getSingleCache().getAddress())
        .setPassword(applicationProperties.getRedis().getPassword());
} else if (applicationProperties.getRedis().getType().equals(RedisType.MASTER_SLAVE.getType())) {
    config.useMasterSlaveServers()
        .setMasterAddress(applicationProperties.getRedis().getMasterSlaveCache().getMasterAddress())
        .addSlaveAddress(applicationProperties.getRedis().getMasterSlaveCache().getSlaveAddress())
        .setPassword(applicationProperties.getRedis().getPassword());
} else {
    throw new Exception("The redis type " + applicationProperties.getRedis().getType() + " is not supported. Only single and master-slave are supported.");
}
```

## Étape 4
Mettez à jour application-dev.yml pour utiliser un serveur unique

```
application:
  profile: dev
  redis:
    type: 'single'
    password: 'public-redis-password'
    single-cache:
      address: 'redis://localhost:6379'

```

## Étape 5
Mettez à jour application-prod.yml pour utiliser des serveurs maître-esclave
```
application:
  profile: prod
  redis:
    type: 'master-slave'
    password: 'public-redis-password'
    master-slave-cache:
      master-address: 'redis://redis-master:6379'
      slave-address: 'redis://redis-slave:6379'

```
