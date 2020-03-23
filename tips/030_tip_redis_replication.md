---
layout: default
title: Configure Redis leader follower(master-slave) replication
sitemap:
priority: 0.1
lastmod: 2020-03-23T12:30:00-00:00
---

# Configure Redis leader follower(master-slave) replication

**Tip submitted by [@zhx828](https://github.com/zhx828)**

In the latest JHipster generator, it provides a redis cluster setting for production deployment. But oftentimes, that might be overkill for small projects. This document provides a solution to configure Redis leader follower (master-slave) replication. For more information about Redis Replication, please see [**here**](https://redis.io/topics/replication).

The following changes are based on my own project set up. I assume you have modified your application properties to setup Redis password, so you can adjust your own accordingly.


## Step 1

Add file `RedisProperties.java`:
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

## Step 2
Add RedisProperties to `ApplicationProperties.java`
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

## Step 3
Update the file `CacheConfiguration.java`, method `jcacheConfiguration`. These changes have to be combined with the current cluster setup.

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

## Step 4
Update `application-dev.yml` to use single server
```
application:
  profile: dev
  redis:
    type: 'single'
    password: 'public-redis-password'
    single-cache:
      address: 'redis://localhost:6379'

```

## Step 5
Update `application-prod.yml` to use master-slave servers
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
