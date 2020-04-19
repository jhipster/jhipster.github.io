---
layout: default
title: JHipster Domain Language - Options
permalink: /jdl/options
sitemap:
    priority: 0.5
    lastmod: 2019-11-02T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster Domain Language (JDL) - Options

## Summary

In JHipster, you can specify options for your entities such as pagination or DTO.
You can do the same with the JDL, either with annotations on the entity, or with the following syntax:

    entity A {
      name String required
    }
    entity B
    entity C

    dto A, B with mapstruct

    paginate A with infinite-scroll
    paginate B with pagination
    paginate C with pager  // pager is only available in AngularJS

    service A with serviceClass
    service C with serviceImpl

The complete list of available options is [here](#available-options).

1. [How to](#how-to)
1. [Syntax](#syntax)
1. [Examples](#examples)
   1. [Basic unary example](#basic-unary-example)
   1. [Basic binary example](#basic-binary-example)
   1. [all, * example](#all--example)
   1. [all, * example with exclusions (unary)](#all--example-with-exclusions-unary)
   1. [all, * example with exclusions (binary)](#all--example-with-exclusions-binary)
   1. [Option with custom values](#option-with-custom-values)
   1. [Mixed example](#mixed-example)
1. [About services](#about-services)
1. [Microservice-related options](#microservice-related-options)
1. [Custom annotations](#custom-annotations)
1. [Available options](#available-options)

---

### How to

There are two kinds of options:
  - unary (without option value)
  - binary (with value)

And two way of applying options to entities:
  - using the option name (`dto`, `readOnly`, etc.), see examples
  - using annotations

Mixing them is not recommended as it reduces readability.

---

### Syntax

For the regular form:
```
<option name> <option entity list>

or

<option name> <option entity list> with <option value>

or

<option name> <option entity list> with <option value> except <option excluded entity list>

or 

<option name> <option entity list> except <option excluded entity list>
```

  - For unary options:
    - the option name and the list is needed
    - the excluded entities are optional with the `except` keyword (see below for more details)
  - For binary options:
    - the entity list precedes the `with` keyword and the option value
    - again, the excluded entities are in the end with the `except` keyword

For annotations:
```
@<option name>
entity <entity name>

or

@<option name>(<option value>)
```

  - Similar to Java, annotations may take values in parenthesises
    - depending on the option, values may or may not be optional

---

### Examples

Each example will have two forms:
  - the regular one
  - the annotation-based one

---

#### Basic unary example

Regular:
```jdl
entity A

readOnly A
```

Annotation-based:
```jdl
@readOnly
entity A
```

---

#### Basic binary example

Regular:
```jdl
entity A

dto A with mapstruct
```

Annotation-based:
```jdl
@dto(mapstruct)
entity A
```

---

#### all, * example

`all` and `*` are aliases.

Regular:
```jdl
entity A
entity B

dto all with mapstruct
```

Annotation-based:
```jdl
@dto(mapstruct)
entity A

@dto(mapstruct)
entity B
```

---

#### all, * example with exclusions (unary)

Regular:
```jdl
entity A
entity B

skipClient * except A
```

Annotation-based:
```jdl
entity A

@skipClient
entity B
```

---

#### all, * example with exclusions (binary)

Regular:
```jdl
entity A
entity B

dto all with mapstruct except A
```

Annotation-based:
```jdl
entity A

@dto(mapstruct)
entity B
```

---

#### Option with custom values

```jdl
entity A
entity B

microservice all with mySuperMS
```

---

#### Mixed example

Regular:
```jdl
entity A
entity B
entity C

readOnly B, C
dto * with mapstruct except C
service * with serviceClass except C
search A with elasticsearch
```

Annotation-based:
```jdl
@dto(mapstruct)
@search(elastisearch)
@service(serviceClass)
entity A

@readOnly
@dto(mapstruct)
@service(serviceClass)
entity B

@readOnly
entity C
```

---

### About services

No services specified will create a resource class which will call the repository interface directly. This is the
default and simplest option, see A.

`service with serviceClass` (see B) will make the resource call the service class which will call the repository interface.
`service with serviceImpl` (see C) will make a service interface which will be used by the resource class.

The interface is implemented by a concrete class which will call the repository interface.

Using no service unless sure is the simplest option and good for CRUD. Use service with a Class if you will have a lot
of business logic which will use multiple repositories making it ideal for a service class. JHipsters are not fan of
unnecessary Interfaces but if you like them go for service with impl.

    entity A
    entity B
    entity C

    // no service for A
    service B with serviceClass
    service C with serviceImpl

---

### Microservice-related options

As of JHipster v3, microservices can be created. You can specify some options to generate your entities in the JDL:
the microservice's name and the search engine.

Here is how you can specify your microservice's name (the JHipster app's name):

```
entity A
entity B
entity C
microservice * with mysuperjhipsterapp except C
microservice C with myotherjhipsterapp
search * with elasticsearch except C
```

The first option is used to tell JHipster that you want your microservice to deal with your entities, whereas the second
specifies how and if you want your entities searched.

---

### Custom annotations

Custom annotations are possible in the JDL, for instance:

```jdl
@customAnnotation(customValue)
entity A
```

The main use case for this is for blueprints: sometimes, you need have custom options for entities, or even fields.
For regular options (`dto`, `pagination`, etc.), these options will be generated in the JSON like in the CLI.
However, for custom options, they will be generated under and `options` key in the dumped JSON.

---

### Available options

Here are the entity options supported in the JDL:

<table class="table table-striped table-responsive">
  <tr>
    <th>JDL option name</th>
    <th>Option type</th>
    <th>Default value</th>
    <th>Possible values</th>
    <th>Comment</th>
  </tr>
  <tr>
    <td>skipClient</td>
    <td>unary</td>
    <td>false</td>
    <td></td>
    <td>This will make the client code generation to be skipped</td>
  </tr>
  <tr>
    <td>skipServer</td>
    <td>unary</td>
    <td>false</td>
    <td></td>
    <td>This will make the server code generation to be skipped</td>
  </tr>
  <tr>
    <td>noFluentMethod</td>
    <td>unary</td>
    <td>false</td>
    <td></td>
    <td>
      See <a href="https://www.jhipster.tech/2016/08/17/jhipster-release-3.6.0.html#important-change-fluent-setters">this note</a>
      for more information
    </td>
  </tr>
  <tr>
    <td>filter</td>
    <td>unary</td>
    <td>false</td>
    <td></td>
    <td>
      See <a href="https://www.jhipster.tech/entities-filtering/">filtering</a> for more details; if an entity is filtered
      but doesn't have a service then 'serviceClass' will be used
    </td>
  </tr>
  <tr>
    <td>readOnly</td>
    <td>unary</td>
    <td>false</td>
    <td></td>
    <td>
      Adding this option will make an entity readOnly, see
      <a href="https://www.jhipster.tech/2019/10/10/jhipster-release-6.4.0.html#jhipster-release-v640">this release note</a>
      for more details
     </td>
  </tr>
  <tr>
    <td>dto</td>
    <td>binary</td>
    <td>no</td>
    <td>mapstruct, no</td>
    <td>Whether to create DTOs for your entities, if an entity has a DTO but no service, then 'serviceClass will be used'</td>
  </tr>
  <tr>
    <td>service</td>
    <td>binary</td>
    <td>no</td>
    <td>serviceClass, serviceImpl, no</td>
    <td></td>
  </tr>
  <tr>
    <td>paginate</td>
    <td>binary</td>
    <td>no</td>
    <td>pagination, infinite-scroll, no</td>
    <td>Pagination is forbidden when the application uses Cassandra</td>
  </tr>
  <tr>
    <td>search</td>
    <td>binary</td>
    <td>no</td>
    <td>elasticsearch, no</td>
    <td>Requires the application to have the searchEngine option enabled</td>
  </tr>
  <tr>
    <td>microservice</td>
    <td>binary</td>
    <td></td>
    <td>custom value</td>
    <td>Will be automatically added for every entity declared inside a microservice application</td>
  </tr>
  <tr>
    <td>angularSuffix</td>
    <td>binary</td>
    <td></td>
    <td>custom value</td>
    <td></td>
  </tr>
  <tr>
    <td>clientRootFolder</td>
    <td>binary</td>
    <td></td>
    <td>custom value</td>
    <td></td>
  </tr>
</table>
