---
layout: default
title: Filtering
permalink: /entities-filtering/
sitemap:
    priority: 0.7
    lastmod: 2017-08-22T00:00:00-00:00
---

# <i class="fa fa-filter"></i> Filtering your entities

## Introduction

After the basic CRUD functionalities are implemented for an entity, there is a very common request to create various filters for the attributes of the entity,
so the server could be used more effectively. These filters should be sent as the request parameters, so any client - and any browser - could use it easily.
Additionally, these filters should follow a sane, and concise pattern, and they must be allowed combining them freely.

## Public interface

For every entity, you can enable filtering in the entity generator, and after, you can call your `/api/my-entity` GET endpoint with the following parameters :

* For every *xyz* field
    * *xyz.equals=someValue*
        - To list all the entities, where xyz equals to 'someValue'
    * *xyz.equals=someValue,otherValue*
        - To list all the entities, where xyz equals to 'someValue' or 'otherValue'
    * *xyz.specified=true*
        - To list all the entities, where xyz is not null, specified.
    * *xyz.specified=false*
        - To list all the entities, where xyz is null, unspecified.
* If *xyz*'s type is string:
    * *xyz.contains=something*
        - To list all the entities, where xyz contains 'something'.
* If *xyz*'s is either any of the number types, or the date types.
    * *xyz.greaterThan=someValue*
        - To list all the entities, where xyz is greater than 'someValue'.
    * *xyz.lessThan=someValue*
        - To list all the entities, where xyz is less than 'someValue'.
    * *xyz.greaterOrEqualThan=someValue*
        - To list all the entities, where xyz is greater than or equal to 'someValue'.
    * *xyz.lessOrEqualThan=someValue*
        - To list all the entities, where xyz is less than or equal to 'someValue'.

Of course, they can be combined freely.

## Implementation

When this feature is enabled, a new service named as `EntityQueryService` and an `EntityCriteria` is generated. Spring will convert the request parameters into the fields of the `EntityCriteria` class.

In the `EntityQueryService`, we convert the criteria object into a static, and type safe, JPA query object. For this, it is **required** that the **static metamodel generation is enabled** in the build.

To prove that the generated criteria is working, and Spring is well configured, the `EntityResourceIntTest` is extended with lots of test cases, one for each individual filter.

## Limitations

Currently only SQL databases (with JPA) is supported, with the separate service or separate service implementation/interface combination.
