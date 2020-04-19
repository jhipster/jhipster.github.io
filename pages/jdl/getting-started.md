---
layout: default
title: JHipster Domain Language - Getting Started
permalink: /jdl/getting-started
sitemap:
    priority: 0.5
    lastmod: 2019-10-27T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster Domain Language (JDL) - Getting Started


## Summary

In this page, you'll learn about the JDL and how to create applications and everything around them.

1. [Generating content](#generating-content)
   1. [Using files](#using-files)
   1. [Using an inline JDL](#using-an-inline-jdl)
1. [Applications](#generating-applications)
1. [Entities](#generating-entities)
1. [Fields](#generating-fields)
1. [Enums](#enumerations)
1. [Relationships](#adding-relationships)
1. [Options](#options)
1. [Deployments](#deployments)
1. [Constants](#constants)
1. [Exporting to a JDL file](#exporting-to-a-jdl-file)

---

## Generating content

### Using files

You can use JDL files to generate entities:
  - Create a file with the extension '.jh' or '.jdl',
  - Declare your applications, deployments, entities and relationships or create and download the file with [JDL-Studio](https://start.jhipster.tech/jdl-studio/) or [JHipster IDE](https://www.jhipster.tech/jhipster-ide/),
  - If you are creating only entities then run `jhipster import-jdl my_file.jdl` in your JHipster application's root folder.
  - If you are creating applications then run `jhipster import-jdl my_file.jdl` in a folder.

and *Voilà*, you are done!

If you work in a team, perhaps you would like to have multiple files instead of one.
We added this option so that you don't manually concatenate all the files into one, you have to run:

    jhipster import-jdl my_file1.jdl my_file2.jdl

If you do not want to regenerate your entities while importing a JDL, you can use the `--json-only` flag to skip the
entity creation part and create only the json files in `.jhipster` folder.

    jhipster import-jdl ./my-jdl-file.jdl --json-only

By default `import-jdl` regenerates only entities that have changed, if you want all your entities to be regenerated
then pass in the `--force`  flag.
Please note that this will overwrite all your local changes to the entity files:

    jhipster import-jdl ./my-jdl-file.jdl --force

If you want to use it in your project, you can add do so by doing:
  - NPM: `npm install jhipster-core --save`
  - Yarn: `yarn add jhipster-core`

to install it locally, and save it in your `package.json` file.

---

### Using an inline JDL

The other way to generate content is to pass a JDL code in your CLI, this way:
`jhipster import-jdl --inline "application { config { baseName jhipster, applicationType microservice } }"`.

This way of generating content is especially useful when generating entities.

---

For now, we'll start with small JDL content to get to know the various ways to generate content.
Explanations will be made in other sections about the syntax but focus is gonna be made on the generation here.

Here's the basic content we'll use:
```jdl
application {
  config {
    baseName jhipster
    applicationType microservice
  }
}
```

This is a very basic microservice application named "jhipster", and we'll see the various ways to generate a 
application from this sample.

You'll see that, with this little sample, you've managed to create an application from scratch.

---

## Generating applications

As we've seen in the previous example, generating applications is quite straightforward, let's take the previous example
and add more things to it:
```jdl
application {
  config {
    baseName jhipster
    applicationType microservice
    serverPort 4242
    buildTool gradle
  }
}
```
Let's break it down:
  - `application` is the keyword to say you want to declare an application
  - `config` to say that you want to specify the configuration
    - we'll later see that you can also declare entities in applications
  - `baseName`, `applicationType`, etc. are keywords to tweak the application

This is how you create an application using the JDL.
To see all supported application options, head to [this page](/jdl/applications).

---

## Generating entities

Generating entities is a bit less straightforward.
You can also go to the dedicated [entity page](/jdl/entities-fields) to know more about what you can do with entities.

### Generating a basic entity

```jdl
entity A
```

This entity doesn't have fields, or even an explicit table name (even though JHipster sets one for you from the entity's
name).
This is the simplest way possible to declare an entity.

Note that this form is equivalent to:
```jdl
entity A(a) {}
```

We've added a table name and braces.
By default, JHipster generates a table name based on the specified entity name.

The braces are needed when declaring fields.

### Adding comments

This is the way to add a comment to an entity:

```jdl
/**
 * This is a simple entity
 */
entity A
```

If the backend is in Java, this will add a Javadoc comment.

### Entities in applications

To only generate some entities in an application, the `entities` keyword can be used:

```jdl
application {
  config {}
  entities A, B
}

application {
  config {}
  entities C
}

entity A
entity B
entity C
```

This is especially useful in microservice architectures.

---

## Generating fields

Fields are declared in entities, by specifying a body to an entity:

```jdl
entity MyEntity {
  name String
  closed Boolean
}
```

There are more than these two types, check them out in the [entities & fields page](/jdl/entities-fields).

### Adding comments and validations

The same way we've added comments to entities, we can add comments to fields:

```jdl
entity MyEntity {
  /** My field */
  name String required minlength(2) maxlength(50)
}
```

Validations depend on the field type, and are also detailed in the [entities & fields page](/jdl/entities-fields).

---

## Enumerations

Enumerations are types with fixed values:

```jdl
enum Type {
  A,
  B(b)
}

entity E {
  name Type
}
```

Notice how enumeration's values are optional.

They only have one validation: `required`.

You can check the dedicated [enum page](/jdl/enums) for details about enums.

---

## Adding relationships

Relationships between entities are also available and are declared with the `relationship` keyword.

```jdl
entity A
entity B

relationship OneToOne {
  A{a} to B{b}
}
```

Here's what we can see:
  - `OneToOne` is the relationship type
    - there are also `OneToMany`, `ManyToMany` and `ManyToOne`
  - we declare the source and the destination of the relationship (from `A` to `B`)
  - we also declare the injected fields in each entity (`a` in `B`, and `b` in `A`)
    - this means the relationship is bidirectional

To know more about relationships, you can head to [the dedicated page](/managing_relationships).

### Unidirectional or bidirectional relationships?

Depending on how you design your models, you may want unidirectional relationships instead of bidirectional ones.
This is achieved by not specifying an injected field like this:

```jdl
relationship OneToOne {
  A{a} to B
}
```

You can also not specify them, and at least one will be injected by default (the source)

```jdl
relationship OneToOne {
  A to B
}
```

### Relationship comments & validations

Relationships also have comments, validations (only one: `required`):

```jdl
relationship OneToOne {
  A{a} to B{b required}
}
```

In this example we can see:
  - `required` to specify if a side of the relationship is required
    - instead of having 0..1, this One to One relationship requires 1 side not to be nil

To know more about relationships, you can go to the dedicated [relationship page](/jdl/relationships) 

---

## Options

The same way you can apply options to entities in the CLI, you can also do that in the JDL:

```jdl
entity A
entity B
entity C

readOnly A
dto * with mapstruct
service * with serviceImpl
paginate A, B with pager 
```

There a some interesting things happening here:
  - `dto`, `paginate` and `service` are binary options as they need an entity list and a value
    - `with` is used to specify the option value
    - note the `*` which means the option is to be applied to all the entities
  - `readOnly` is an unary option, that means that such options only take an entity list

There are more than one way to declare an entity list:
  - you can enumerate them one by one: `A, B, C`
  - you can select all of them: `*` or `all`
    - you can have exceptions to exclude entities: `service * with serviceImpl except A, B`

### Annotations

Annotations are another way to declare options, let's rewrite the previous example:

```jdl
@readOnly
@dto(mapstruct)
@service(serviceImpl)
@paginate(pager)
entity A

@dto(mapstruct)
@service(serviceImpl)
@paginate(pager)
entity B

@dto(mapstruct)
@service(serviceImpl)
entity C
```

Similar to Java, or Typescript, annotations are "decorators", options to entities.

This example and the previous are equivalent as they can be used to generate the same code.

To know more about options, you can go to the [option page](/jdl/options)

---

## Deployments

Finally, deployments can also be generated from a JDL file using the `deployment` keyword, compatible with JHipster 
v5.7 and above:

```jdl
deployment {
  deploymentType docker-compose
  appsFolders [foo, bar]
  dockerRepositoryName "yourDockerLoginName"
}
```

_To import one or several deployments, you need not be in a JHipster application folder._


Deployments are described in [their own page](/jdl/deployments).

A JHipster deployment has a config with default values for all other properties and using the previous syntax will
ensure your deployment will use the default values (as if you didn't make any specific choice).
The resulting deployment will have:
  - deploymentType: `docker-compose`
  - appsFolders: `foo, bar`
  - dockerRepositoryName: `yourDockerLoginName`
  - serviceDiscoveryType: `eureka`
  - gatewayType: `zuul`
  - directoryPath: `../`
  - etc.

Now, if you want some custom options:

```jdl
deployment {
  deploymentType kubernetes
  appsFolders [store, invoice, notification, product]
  dockerRepositoryName "yourDockerLoginName"
  serviceDiscoveryType no
  istio autoInjection
  kubernetesServiceType Ingress
  kubernetesNamespace jhipster
  ingressDomain "jhipster.192.168.99.100.nip.io"
}
```

Those options are only a sample of what's available in the JDL.
The complete list of options is available in the deployment page, [here](/jdl/deployments).

---

## Constants

The JDL supports numerical constants.
Here is an example:

```jdl
DEFAULT_MIN_LENGTH = 1
DEFAULT_MAX_LENGTH = 42
DEFAULT_MIN_BYTES = 20
DEFAULT_MAX_BYTES = 40
DEFAULT_MIN = 0
DEFAULT_MAX = 41

entity A {
  name String minlength(DEFAULT_MIN_LENGTH) maxlength(DEFAULT_MAX_LENGTH)
  content TextBlob required
  count Integer min(DEFAULT_MIN) max(DEFAULT_MAX)
}
```

---

## Exporting to a JDL file

If you already have entities in your application and wish to have a JDL file, don't worry! You don't have to write it from
scratch as there's a sub-generator that does that for you.

Run `jhipster export-jdl <FILE_NAME>` in your app's root folder and you'll have all your applications, entities,
relationships and options exporting in a single JDL file.

Note: you can also not provide a file name to the sub-generator, the exported JDL file will be named after the app's
base name. For instance, if your application's named 'mySuperApp' then your JDL file will be `mySuperApp.jdl`.
