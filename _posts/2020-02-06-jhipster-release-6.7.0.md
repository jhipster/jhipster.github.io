---
layout: default
title: Release 6.7.0
---

JHipster release v6.7.0
==================

This is the 1st release in 2020, with [206 closed tickets and merged pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.7.0+is%3Aclosed).

Here are the most significant ones:

- Upgrade to Spring Boot 2.2.4.RELEASE - [#11155](https://github.com/jhipster/generator-jhipster/pull/11155) [#10955](https://github.com/jhipster/generator-jhipster/pull/10955) and [jhipster#546](https://github.com/jhipster/jhipster/pull/546)
- JHipster Regisry v6.1.1, using Spring Boot 2.2.4.RELEASE and Spring Cloud Hoxton - [jhipster-registry#408](https://github.com/jhipster/jhipster-registry/pull/408)
- Reactive with OAuth2 - [#11117](https://github.com/jhipster/generator-jhipster/pull/11117)
- Kubernetes Knative - [#10695](https://github.com/jhipster/generator-jhipster/issues/10695)
- UAA without Eureka - [#11033](https://github.com/jhipster/generator-jhipster/pull/11033)
- Many libraries upgrades

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.7.0+is%3Aclosed)__.

Backward Compatibility Issues
------------

- **v6.5.x and beyond** 

    - **MongoDB**: PersistentAuditEvent Documents not found after upgrading ([#11290](https://github.com/jhipster/generator-jhipster/issues/11290)). 
    
        - `jhipster upgrade` will remove `@Field("event_id")` annotation on `PersistentAuditEvent#id` domain class.
        
        - The goal is identifying Documents properly by    `_id` field instead, using Spring Data `@Id` annotation. But: when querying pre-upgrade stored documents, the query won't look for `event_id`, thus those won't be found.
        
        - Such specific case should not impact regular applications behaviour.
        
        - Domain backwards compatibility can be restored by adding `@Field(value = "event_id", targetType = FieldType.OBJECT_ID)` annotation to `PersistentAuditEvent#id` in combination with `@Id`.


How to upgrade
------------

**Automatic upgrade**

For an automatic upgrade, use the [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) on an existing application:

Upgrade your version of JHipster:

```
npm update -g generator-jhipster
```

And then run the upgrade sub-generator:

```
jhipster upgrade
```

**Manual upgrades**

For a manual upgrade, first upgrade your version of JHipster with:

```
npm update -g generator-jhipster
```

If you have an existing project, it will still use the JHipster version with which it was generated.
To upgrade your project, you must first delete its `node_modules` folder and then run:

```
jhipster
```

You can also update your project and all its entities by running

```
jhipster --with-entities
```

You can also update your entities one-by-one by running again the entity sub-generator, for example if your entity is named _Foo_

```
jhipster entity Foo
```

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

If the issue you have is an urgent bug or security issue, please:

- Contact [@jhipster](https://twitter.com/jhipster) on Twitter
