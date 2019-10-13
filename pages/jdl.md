---
layout: default
title: JHipster Domain Language
permalink: /jdl/
sitemap:
    priority: 0.5
    lastmod: 2019-08-17T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster Domain Language (JDL)


The JDL is a JHipster specific domain language where you can describe all your applications, deployments, entities and their relationships in a single file (or more than one) with a simple and user-friendly syntax.

You can use our online [JDL-Studio](https://start.jhipster.tech/jdl-studio/) or one of the [JHipster IDE](https://www.jhipster.tech/jhipster-ide/) plugins/extensions, wich are available for [Eclipse](https://marketplace.eclipse.org/content/jhipster-ide), [VS Code](https://marketplace.visualstudio.com/items?itemName=jhipster-ide.jdl) and [Atom](https://atom.io/packages/ide-jhipster), to create a JDL file and its UML visualization. You can create and export or share the URL of your JDL model as well.

You can generate applications, deployments and entities from a JDL file using the `import-jdl` sub-generator, by running `jhipster import-jdl your-jdl-file.jdl`.

If you have an existing project (either created with `jhipster import-jdl` or generated with `jhipster` command line), you can generate entities for the project by running `jhipster import-jdl your-jdl-file.jdl`. Make sure to execute this command under your JHipster project.

You can also generate applications, entities and export them as a JDL file using [JHipster UML]({{ site.url }}/jhipster-uml/), by running `jhipster-uml your-xmi-file.xmi --to-jdl` from the root of the generated JHipster application. To learn more about JHipster UML, and install it, go to the [JHipster UML documentation]({{ site.url }}/jhipster-uml/).

This can be used as a replacement to using the [entity sub-generator]({{ site.url }}/creating-an-entity/) and is the recommended approach. The idea is that it is much easier to [manage relationships]({{ site.url }}/managing-relationships/) using a visual tool than with the classical Yeoman questions and answers.

The JDL project is [available on GitHub](https://github.com/jhipster/jhipster-core/), it is an Open Source project like JHipster (Apache 2.0 License). It can also be used as a node library to do JDL parsing.

_If you like the [JHipster Domain Language](https://github.com/jhipster/jhipster-core/), the [JDL Studio](https://github.com/jhipster/jdl-studio/) or the [JHipster IDE](https://github.com/jhipster/jhipster-ide/) don't forget to give them a star on [GitHub](https://github.com/jhipster/) - thanks_!

***

Here is the JDL documentation:

1. [JDL Sample](#sample)
1. [How to use it](#howtojdl)
   1. [Importing a JDL file](#importingjdl)
   1. [Exporting to a JDL file](#exportingjdl)
1. [The language](#jdllanguage)
   1. [Application Declaration](#applicationdeclaration)
   1. [Entity Declaration](#entitydeclaration)
   1. [Relationship Declaration](#relationshipdeclaration)
   1. [Enumerations](#enumerationdeclaration)
   1. [Blobs](#blobdeclaration)
   1. [Entity options declaration](#entityoptiondeclaration)
   1. [Entity annotations](#annotations)
   1. [Microservice-related options](#microserviceoptions)
   1. [Deployment declaration](#deploymentdeclaration)
1. [Commenting](#commentingjdl)
1. [All the relationships](#jdlrelationships)
1. [Constants](#constants)
1. [Workflows](#workflows)
1. [Annexes](#annexes)
   1. [Available application options](#application_options)
   1. [Available deployment options](#deployment_options)
   1. [Available field types and constraints](#types_and_constraints)
   1. [Available entity options](#entity_options)
1. [Troubleshooting](#troubleshooting)
1. [Issues and bugs](#issues)

***

## <a name="sample"></a> JDL Sample

The Oracle "Human Resources" sample application has been translated into JDL, and is available [here](https://github.com/jhipster/jdl-samples/blob/master/Oracle-Human-Resources-sample.jdl).
The same application is loaded by default in [JDL-Studio](https://start.jhipster.tech/jdl-studio/) and [JHipster IDE](https://www.jhipster.tech/jhipster-ide/) as well.

If you're looking for more samples, there is a repository for that right [here](https://github.com/jhipster/jdl-samples).

## <a name="howtojdl"></a> How to use it

###  <a name="importingjdl"></a> Importing a JDL file
You can then use JDL files to generate entities:
  - Simply create a file with the extension '.jh' or '.jdl',
  - Declare your applications, deployments, entities and relationships or create and download the file with [JDL-Studio](https://start.jhipster.tech/jdl-studio/) or [JHipster IDE](https://www.jhipster.tech/jhipster-ide/),
  - If you are creating only entities in then run `jhipster import-jdl my_file.jdl` in your JHipster application's root folder.
  - If you are creating applications then just run `jhipster import-jdl my_file.jdl` in a folder.

and *Voilà*, you are done!

If you work in a team, perhaps you would like to have multiple files instead of one.
We added this option so that you don't manually concatenate all the files into one,
you just have to run.

    jhipster import-jdl my_file1.jdl my_file2.jdl

If you do not want to regenerate your entities while importing a JDL, you can use the `--json-only` flag to skip the
entity creation part and create only the json files in `.jhipster` folder.

    jhipster import-jdl ./my-jdl-file.jdl --json-only

By default `import-jdl` regenerates only entities that have changed, if you want all your entities to be regenerated
then pass in the `--force`  flag.
Please note that this will overwrite all your local changes to the entity files

    jhipster import-jdl ./my-jdl-file.jdl --force

If you want to use it in your project, you can add do so by doing:
  - NPM: `npm install jhipster-core --save`
  - Yarn: `yarn add jhipster-core`

to install it locally, and save it in your `package.json` file.

###  <a name="exportingjdl"></a> Exporting to a JDL file

If you already have entities in your application and wish to have a JDL file, fear not! You don't have
to write it from scratch as there's a sub-generator that does that for you.

Simply do `jhipster export-jdl <FILE_NAME>` in your app's root folder and you'll have all your entities,
relationships and options exporting in a single JDL file.
Note: you can also not provide a file name to the sub-generation, a default one will be chosen.

---

## <a name="jdllanguage"></a> The language
We tried to keep the syntax as friendly as we can for developers.
You can do these things with it:
  - Declare applications with their options and entities,
  - Declare entities with their attributes,
  - Declare the relationships between them,
  - And declare some JHipster specific options.

If you wish to view the JDL's grammar, there is an HTML file available
[here](https://github.com/jhipster/jhipster-core/blob/master/lib/dsl/gen/grammar.html).


### <a name="applicationdeclaration"></a> Application declaration

As of v2.0.0, application declaration is possible (compatible with JHipster v5).

_To import one or several applications, you needn't be in a JHipster application folder._

The most basic declaration is done as follows:

```
application {
  config {}
}
```

A JHipster application has a config with default values and using the previous syntax will
ensure your application use the default values (as if you didn't make any specific choice).
The resulting application will have:
  - baseName: `jhipster`
  - applicationType: `monolith`
  - databaseType: `sql`
  - etc.

Now, if you want some custom options:

```
application {
  config {
    baseName myapp
    applicationType microservice
    prodDatabaseType postgresql
    buildTool gradle
  }
}
```

Those options are only a sample of what's available in the JDL.
The complete list of options is available in the annexes, [here](#annexes).

If you want more than one application, here's how you do it:

```
application { // will be generated under the 'myFirstApp' folder
  config {
    baseName myFirstApp
  }
}

application { // will be generated under the 'mySecondApp' folder
  config {
    baseName mySecondApp
    applicationType microservice
  }
}
```

You can have as many application as you want in as many file as you wish: there's no limitation.

Declaring entities is the most basic thing available and now you can set what entity should be generated
in the applications you want.

Let's improve the previous example:

```
application {
  config {
    baseName myMonolith
    applicationType monolith
  }
  entities * except C, D
}

application {
  config {
    baseName myGateway
    applicationType gateway
    serverPort 9042
  }
  entities * except A, B
}

application {
  config {
    baseName microserviceA
    applicationType microservice
  }
  entities C
}

application {
  config {
    baseName microserviceB
    applicationType microservice
    serverPort 8082
  }
  entities D
}

entity A
entity B
entity C
entity D

dto * with mapstruct
service * with serviceClass
paginate D with pager
```

Now, several things will happen when generating these applications and folders:
  - Four applications will be created:
    - myMonolith in `./myMonolith`, with the server port `8080`
    - myGateway in `./myGateway`, with the server port `9042`
    - microserviceA in `./microserviceA`, with the server port `8081`
      - Even though we didn't specify a server port, JHipster sets one by default.
      - For microservices, the default one is `8081`
      - For gateways and monoliths, it's `8080`
      - For UAA apps, it's `9999`
    - microserviceB in `./microserviceB` with the server port `8082`
  - Four entities will be generated
    - `A` and `B` in the monolith
    - `C` and `D` both in the gateway
      - `C` in the first microservice
      - `D` in the second microservice
  - The `microservice` option is implicit for `C` and `D`
    - Because they get generated on the two microservices, this option will be set by default.
  - Options work the same way as before

Note that the generator sets default values if they aren't present (like the `databaseType`).
JHipster Core does the exact same things.

### <a name="entitydeclaration"></a> Entity declaration

The entity declaration is done as follows:

    [<entity javadoc>]
    [<entity annotation>*]
    entity <entity name> [(<table name>)] {
      [<field javadoc>]
      [<field annotation>*]
      <field name> <field type> [<validation>*]
    }

  - `<entity name>` the name of the entity,
  - `<field name>` the name of one field of the entity,
  - `<field type>` the JHipster supported type of the field,
  - and as an option:
    - `<entity javadoc>` the documentation of the entity,
    - `<entity annotation>` the options for the entity,
    - `<table name>` the database table name (if you want to specify something different that the name automatically computed from the entity name),
    - `<field javadoc>` the documentation of the field,
    - `<validation>` the validations for the field.


The possible options, field types and validations are those described [here](#annexes).

**An important note**: as of v6.4.0 of JHipster (v5.0.0 of JHipster-core), comments **must always** be defined before annotations.
An issue was filled about this [here](https://github.com/jhipster/jhipster-core/issues/369).

Here's an example of a JDL code:

```
entity A
entity B
entity C

/** Documentation of entity D */
@noFluentMethod
entity D {
  /** Full name */
  name String required
  address String required maxlength(100)
  age Integer required min(18)
}
```

Because the JDL was made to be simple to use and read, if your entity is empty (no field), you can just declare an
entity with `entity A` or `entity A {}`.

Note that JHipster adds a default `id` field so that you needn't worry about it.


#### Regular expressions

Regexes are a bit special as they are used like this (from v1.3.6):
```
entity A {
  myString String required minlength(1) maxlength(42) pattern(/[A-Z]+/)
}
```

Note that you needn't escape anti-slash characters.
```
entity A {
  myString String pattern(/\S+/)
}
```
A single `\` char is enough.

### <a name="relationshipdeclaration"></a> Relationship declaration

The relationships declaration is done as follows:

    relationship (OneToMany | ManyToOne | OneToOne | ManyToMany) {
      <from entity>[{<relationship name>[(<display field>)]}] to <to entity>[{<relationship name>[(<display field>)]}]
    }

  - `(OneToMany | ManyToOne| OneToOne | ManyToMany)` is the type of your relationship,
  - `<from entity>` is the name of the entity owner of the relationship: the source,
  - `<to entity>` is the name of the entity where the relationship goes to: the destination,
  - `<relationship name>` is the name of the field having the other end as type,
  - `<display field>` is the name of the field that should show up in select boxes (default: `id`),
  - `required` whether the injected field is required.
  - `with jpaDerivedIdentifier` whether `@MapsId` is used for the association (applicable only for one-to-one)

Here's a simple example:

    entity Book
    entity Author

    relationship ManyToOne {
      Book to Author
    }

Declaring an injected field is optional, as one (or both) is set by default as needed.
The previous example is equivalent to this one:

    entity Book
    entity Author

    relationship ManyToOne {
      Book{author} to Author
    }

Let's make it more complex.
A Book has one required Author, an Author has several Books.

    entity Book
    entity Author {
      name String required
    }

    relationship OneToMany {
      Author{book} to Book{writer(name) required}
    }

Here, the `Book` class will have a **required** field named `writer` that will be linked through the `name` field of `Author`.

Of course, in real cases, you'd have a lot of relationships and always writing the same three lines could be tedious.
That's why you can declare something like:

```
entity A
entity B
entity C
entity D

relationship OneToOne {
  A{b} to B{a}
  B{c} to C
}
relationship ManyToMany {
  A{d} to D{a}
  C{d} to D{c}
}
```

The join is always done using the `id` field which is also the default field shown when editing a relation in the
front-end. If another field should be shown instead, you can specify it like this:

```
entity A {
  name String required
}
entity B


relationship OneToOne {
  A{b} to B{a(name)}
}
```

JPA Derived Identifier - @MapsId can be declared as following which is currently only supported for one-to-one:

```
entity A {
  name String required
}
entity B


relationship OneToOne {
  A{b} to B{a(name)} with jpaDerivedIdentifier
}
```


This makes JHipster generate a REST resource that returns both the `id` and `name` of the linked entity to the front-end,
so the name can be shown to the user instead.

### <a name="enumerationdeclaration"></a> Enumerations

To make Enums with JDL just do as follows:

- Declare an Enum where you want in the file:

        enum Language {
          FRENCH, ENGLISH, SPANISH
        }

- In an entity, add fields with the Enum as a type:

        entity Book {
          title String required,
          description String,
          language Language
        }


### <a name="blobdeclaration"></a> Blob (byte[])
JHipster gives a great choice as one can choose between an image type or any binary type. JDL lets you do the same.
Just create a custom type (see DataType) with the editor, name it according to these conventions:
  - `AnyBlob` or just `Blob` to create a field of the "any" binary type;
  - `ImageBlob` to create a field meant to be an image.
  - `TextBlob` to create a field for a CLOB (long text).

And you can create as many DataTypes as you like.


### <a name="entityoptiondeclaration"></a> Entity option declaration

In JHipster, you can specify options for your entities such as pagination or DTO.
You can do the same with the JDL, either with [annotations](#annotations) on the entity, or with the following syntax:

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

The keywords `dto`, `paginate`, `service` and `with` were added to the grammar to support these changes.
If a wrong option is specified, JDL will inform you of that with a nice, red message and will just ignore it so as not
to corrupt JHipster's JSON files.
The complete list of available options is [here](#entity_options).

#### Service option

No services specified will create a resource class which will call the repository interface directly. This is the
default and simplest option, see A.
Service with serviceClass (see B) will make the resource call the service class which will call the repository interface.
Service with serviceImpl (see C) will make a service interface which will be used by the resource class.
The interface is implemented by an concrete class which will call the repository interface.

Using no service unless sure is the simplest option and good for CRUD. Use service with a Class if you will have a lot
of business logic which will use multiple repositories making it ideal for a service class. Jhipsters are not fan of
unnecessary Interfaces but if you like them go for service with impl.

    entity A
    entity B
    entity C

    // no service for A
    service B with serviceClass
    service C with serviceImpl


JDL also supports mass-option setting. it is possible to do:

    entity A
    entity B
    ...
    entity Z

    dto * with mapstruct
    service all with serviceImpl
    paginate C with pagination

Note that `*` and `all` are equivalent.
Latest version introduces exclusions (which is quite a powerful option when setting options for every entity):

    entity A
    entity B
    ...
    entity Z

    dto * with mapstruct except A
    service all with serviceImpl except A, B, C
    paginate C with pagination


With JHipster, you can also tell whether you don't want any client code, or server code.
Even if you want to add a suffix to Angular-related files, you can do that in JHipster.
[
Filtering](https://www.jhipster.tech/entities-filtering/) options can be activated on a per entity basis: filter `<entity name>` or for all entities: filter `*`.
In your JDL file, simply add these lines to do the same:

```
entity A
entity B
entity C

skipClient A
skipServer B
angularSuffix * with mySuperEntities
filter C
```

Finally, table names can also be specified (the entity's name will be used by default):

```
entity A // A is the table's name here
entity B (the_best_entity) // the_best_entity is the table's name
```

### <a name="annotations"></a> Annotations

Annotations are available since JHipster v5. Similarly to what's possible in Java, annotations work the same way so that
you annotate your entities with annotations options.

Take this JDL code for instance:
```
entity A
entity B
entity C

dto C with mapstruct
paginate * with pager except C
search A with elasticsearch
```

Here's its equivalent with annotations:

```
@paginate(pager)
@search(elasticsearch)
entity A

@paginate(pager)
entity B

@dto(mapstruct)
entity C
```

While this adds more code than it actually removes, it's actually useful when using multiple JDL files
(with microservices for instance).


### <a name="microserviceoptions"></a> Microservice-related options

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


### <a name="deploymentdeclaration"></a> Deployment declaration

As of v3.6.0, deployment declaration is possible (compatible with JHipster v5.7 or above).

_To import one or several deployments, you need not be in a JHipster application folder._

The most basic declaration is done as follows:

```
deployment {
  deploymentType docker-compose
  appsFolders [foo, bar]
  dockerRepositoryName "yourDockerLoginName"
}
```

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

```
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
The complete list of options is available in the annexes, [here](#annexes).

If you want more than one deployment, here's how you do it:

```
// will be created under 'docker-compose' folder
deployment {
  deploymentType docker-compose
  appsFolders [foo, bar]
  dockerRepositoryName "yourDockerLoginName"
}

// will be created under 'kubernetes' folder
deployment {
  deploymentType kubernetes
  appsFolders [foo, bar]
  dockerRepositoryName "yourDockerLoginName"
}
```

You can have one deployment per deploymentType. The applications defined in `appsFolders` should be in the same folder where you are creating deployments or in the folder defined in `directoryPath`. For example for above you need to have a folder structure like this

```
.
├── yourJdlFile.jdl
├── foo
├── bar
├── kubernetes // will created by the JDL
└── docker-compose // will created by the JDL
```

## <a name="commentingjdl"></a> Commenting & Javadoc
It is possible to add Javadoc & comments to JDL files.  
Just like in Java, this example demonstrates how to add Javadoc comments:

    /**
     * Class comments.
     * @author The JHipster team.
     */
    entity MyEntity { // another form of comment
      /** A required attribute */
      myField String required
      mySecondField String // another form of comment
    }

    /**
     * Second entity.
     */
    entity MySecondEntity {}

    relationship OneToMany {
      /** This is possible too! */
      MyEntity{mySecondEntity}
      to
      /**
       * And this too!
       */
      MySecondEntity{myEntity}
    }

These comments will later be added as Javadoc comments by JHipster.

JDL possesses its own kind of comment:

    // an ignored comment
    /** not an ignored comment */

Therefore, anything that starts with `//` is considered an internal comment for JDL, and will not be counted as Javadoc.

Please note that the JDL Studio directives that start with `#` will be ignored during parsing.

Another form of comments are the following comments:
```
entity A {
  name String /** My super field */
  count Integer /** My other super field */
}
```
Here A's name will be commented with `My super field`, B with `My other super field`.
Yes, commas are not mandatory but it's wiser to have them so as not to make mistakes in the code.
If you want to mix commas and following comments, beware!
```
entity A {
  name String, /** My comment */
  count Integer
}
```
A's name won't have the comment, because the count will.


## <a name="jdlrelationships"></a>All the relationships

Explanation on how to create relationships with JDL.


### One-to-One

A bidirectional relationship where the Car has a Driver, and the Driver has a Car.

    entity Driver
    entity Car
    relationship OneToOne {
      Car{driver} to Driver{car}
    }

A Unidirectional example where a Citizen has a Passport, but the Passport has no access to sole its owner.

    entity Citizen
    entity Passport
    relationship OneToOne {
      Citizen to Passport
    }

    // using @MapsId
    relationship OneToOne {
          Citizen to Passport with jpaDerivedIdentifier
    }

### One-to-Many

A bidirectional relationship where the Owner has none, one or more Car objects, and the Car knows its owner.

    entity Owner
    entity Car
    relationship OneToMany {
      Owner{car} to Car{owner}
    }

Unidirectional versions for this relationship are not supported by JHipster, but it would look like this:

    entity Owner
    entity Car
    relationship OneToMany {
      Owner to Car
    }


### Many-to-One

The reciprocal version of One-to-Many relationships is the same as previously.
The unidirectional version where the Car knows its owners:

    entity Owner
    entity Car
    relationship ManyToOne {
      Car to Owner
    }


### Many-to-Many

Finally, in this example we have the Car that knows of its drivers, and the Driver object can access its cars.

    entity Driver
    entity Car
    relationship ManyToMany {
      Car{driver} to Driver{car}
    }

Please note that the owning side of the relationship has to be on the left side

## <a name="constants"></a>Constants

As of JHipster Core v1.2.7, the JDL supports numerical constants.
Here is an example:

```
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

## <a name="workflows"></a>Workflows

## <a name="workflow_monolith"></a>Monolith workflow

There's no special workflow here:
  - Create your application
  - Create your JDL file
  - Import it

## <a name="workflow_microservice"></a>Microservice workflow

Dealing with microservices is a bit trickier, but the JDL gives you some options to handle your entities as you see fit.

With the `microservice <ENTITIES> with <MICROSERVICE_APP_NAME>` you can specify which entity gets generated in which microservice.
Take this setup for instance:
```
entity A
entity B
entity C

microservice A with firstMS
microservice B with secondMS
```
Given two JHipster applications ('firstMS' and 'secondMS'), here's what you're going to get if you import the JDL file
in the two applications:
  - In 'firstMS', entities `A` and `C` will be generated.
  - In 'secondMS', entities `B` and `C` will be generated.

`C` gets generated in both because if there's no microservice option specifying where this entity gets generated, it
will be generated everywhere.
If you decide to import this JDL in a monolith app, every entity will be generated (monoliths don't have restriction
options in the JDL).

Note: if you want to make the same entity be generated in two different microservices, you can write two JDL files
instead of updating the JDL file. everytime.

The previous example couldn't have been written like this:
```
entity A
entity B
entity C

microservice * except B with firstMS
microservice * except A with secondMS
```
Here's the result:
  - In 'firstMS', only the entity `C` will be generated
  - In 'secondMS', entities `B` and `C` will be generated.
It's because, at parsing-time, if an option overlaps with another, the latter takes precedence.

You can also create entire microservice stack using JDL, [see this blog post](https://medium.com/@deepu105/create-full-microservice-stack-using-jhipster-domain-language-under-30-minutes-ecc6e7fc3f77) for example

---

## <a name="annexes"></a>Annexes

## <a name="application_options">Available application options

Here are the application options supported in the JDL:

<table class="table table-striped table-responsive">
  <tr>
    <th>JDL option name</th>
    <th>Default value</th>
    <th>Possible values</th>
    <th>Comment</th>
  </tr>
  <tr>
    <td>applicationType</td>
    <td>monolith</td>
    <td>monolith, microservice, gateway, uaa</td>
    <td></td>
  </tr>
  <tr>
    <td>authenticationType</td>
    <td>jwt or uaa</td>
    <td>jwt, session, uaa, oauth2</td>
    <td>uaa for UAA apps, jwt otherwise</td>
  </tr>
  <tr>
    <td>baseName</td>
    <td>jhipster</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>buildTool</td>
    <td>maven</td>
    <td>maven, gradle</td>
    <td></td>
  </tr>
  <tr>
    <td>cacheProvider</td>
    <td>ehcache or hazelcast</td>
    <td>caffeine, ehcache, hazelcast, infinispan, memcached, redis, no</td>
    <td>ehcache for monoliths and gateways, hazelcast otherwise</td>
  </tr>
  <tr>
    <td>clientFramework</td>
    <td>angularX</td>
    <td>angularX, react</td>
    <td></td>
  </tr>
  <tr>
    <td>clientPackageManager</td>
    <td>npm</td>
    <td>npm, yarn</td>
    <td></td>
  </tr>
  <tr>
    <td>clientTheme</td>
    <td>none</td>
    <td>Something or none</td>
    <td>You can put whatever value you want, provided you know it will work (like yeti).</td>
  </tr>
  <tr>
    <td>clientThemeVariant</td>
    <td></td>
    <td>Something or primary</td>
    <td>You can put whatever value you want, provided you know it will work (like dark, or light), can also be empty</td>
  </tr>
  <tr>
    <td>databaseType</td>
    <td>sql</td>
    <td>sql, mongodb, cassandra, couchbase, no</td>
    <td></td>
  </tr>
  <tr>
    <td>devDatabaseType</td>
    <td>h2Disk</td>
    <td>h2Disk, h2Memory, *</td>
    <td>* + the prod database type</td>
  </tr>
  <tr>
    <td>dtoSuffix</td>
    <td>DTO</td>
    <td></td>
    <td>Suffix for DTOs. false for empty string.</td>
  </tr>
  <tr>
    <td>enableHibernateCache</td>
    <td>true</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>enableSwaggerCodegen</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>enableTranslation</td>
    <td>true</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>entitySuffix</td>
    <td></td>
    <td></td>
    <td>Suffix for entities. false for empty string.</td>
  </tr>
  <tr>
    <td>jhiPrefix</td>
    <td>jhi</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>languages</td>
    <td>[en, fr]</td>
    <td>Languages available in JHipster</td>
    <td>Braces are mandatory</td>
  </tr>
  <tr>
    <td>messageBroker</td>
    <td>false</td>
    <td>kafka, false</td>
    <td></td>
  </tr>
  <tr>
    <td>nativeLanguage</td>
    <td>en</td>
    <td>Any language supported by JHipster</td>
    <td></td>
  </tr>
  <tr>
    <td>packageName</td>
    <td>com.mycompany.myapp</td>
    <td></td>
    <td>Sets the packageFolder option</td>
  </tr>
  <tr>
    <td>prodDatabaseType</td>
    <td>mysql</td>
    <td>mysql, mariadb, mssql, postgresql, oracle, no</td>
    <td></td>
  </tr>
  <tr>
    <td>reactive</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>searchEngine</td>
    <td>false</td>
    <td>elasticsearch, false</td>
    <td></td>
  </tr>
  <tr>
    <td>serverPort</td>
    <td>8080, 8081 or 9999</td>
    <td></td>
    <td>Depends on the app type</td>
  </tr>
  <tr>
    <td>serviceDiscoveryType</td>
    <td>false</td>
    <td>eureka, consul, no</td>
    <td></td>
  </tr>
  <tr>
    <td>skipClient</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>skipServer</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>skipUserManagement</td>
    <td>true</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>testFrameworks</td>
    <td>[]</td>
    <td>protractor, cucumber, gatling</td>
    <td>Braces mandatory</td>
  </tr>
  <tr>
    <td>uaaBaseName</td>
    <td></td>
    <td></td>
    <td>Mandatory for gateway and microservices if auth type is uaa, must be between double-quotes</td>
  </tr>
  <tr>
    <td>useSass</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>websocket</td>
    <td>false</td>
    <td>spring-websocket, false</td>
    <td></td>
  </tr>
</table>

---

## <a name="deployment_options">Available deployment options

Here are the application options supported in the JDL:

<table class="table table-striped table-responsive">
  <tr>
    <th>JDL option name</th>
    <th>Default value</th>
    <th>Possible values</th>
    <th>Comment</th>
  </tr>
  <tr>
    <td>deploymentType</td>
    <td>docker-compose</td>
    <td>docker-compose, kubernetes, openshift</td>
    <td></td>
  </tr>
  <tr>
    <td>directoryPath</td>
    <td>"../"</td>
    <td></td>
    <td>Relative path. Must be in double quotes</td>
  </tr>
  <tr>
    <td>appsFolders</td>
    <td>[]</td>
    <td></td>
    <td>Directory names for the applications separated by comma. Must be a list, example [foo, bar]</td>
  </tr>
  <tr>
    <td>clusteredDbApps</td>
    <td>[]</td>
    <td></td>
    <td>Directory names for the applications with clustered DB separated by comma. Must be a list, example [foo, bar]</td>
  </tr>
  <tr>
    <td>gatewayType</td>
    <td>zuul</td>
    <td>zuul, traefik</td>
    <td>Value is ignored when serviceDiscoveryType is `no`</td>
  </tr>
  <tr>
    <td>monitoring</td>
    <td>no</td>
    <td>no, elk, prometheus</td>
    <td></td>
  </tr>
  <tr>
    <td>consoleOptions</td>
    <td>[]</td>
    <td>[curator, zipkin]</td>
    <td>Must be a list</td>
  </tr>
  <tr>
    <td>serviceDiscoveryType</td>
    <td>eureka</td>
    <td>eureka, consul, no</td>
    <td></td>
  </tr>
  <tr>
    <td>dockerRepositoryName</td>
    <td></td>
    <td></td>
    <td>The name or URL of the docker repository. Must be in double quotes</td>
  </tr>
  <tr>
    <td>dockerPushCommand</td>
    <td>"docker push"</td>
    <td></td>
    <td>The docker push command to use. Must be in double quotes</td>
  </tr>
  <tr>
    <td>kubernetesNamespace</td>
    <td>default</td>
    <td></td>
    <td>Applicable only when deploymentType is kubernetes</td>
  </tr>
  <tr>
    <td>kubernetesServiceType</td>
    <td>LoadBalancer</td>
    <td>LoadBalancer, NodePort, Ingress</td>
    <td>Applicable only when deploymentType is kubernetes</td>
  </tr>
  <tr>
    <td>ingressDomain</td>
    <td></td>
    <td></td>
    <td>The domain for Ingress when kubernetesServiceType is `Ingress`. Must be in double quotes. Applicable only when deploymentType is kubernetes</td>
  </tr>
  <tr>
    <td>istio</td>
    <td>no</td>
    <td>no, manualInjection, autoInjection</td>
    <td>Applicable only when deploymentType is kubernetes</td>
  </tr>
  <tr>
    <td>openshiftNamespace</td>
    <td>default</td>
    <td></td>
    <td>Applicable only when deploymentType is openshift</td>
  </tr>
  <tr>
    <td>storageType</td>
    <td>ephemeral</td>
    <td>ephemeral, persistent</td>
    <td>Applicable only when deploymentType is openshift</td>
  </tr>
</table>

## <a name="types_and_constraints"></a>Available field types and constraints

Here are the types supported in the JDL:

Common databases:
  - PostgreSQL
  - MySQL
  - MariaDB
  - Oracle
  - MsSQL
  - MongoDB
  - Couchbase

<table class="table table-striped table-responsive">
  <tr>
    <th>Common databases</th>
    <th>Cassandra</th>
    <th>Validations</th>
  </tr>
  <tr>
    <td>String</td>
    <td>String</td>
    <td><dfn>required, minlength, maxlength, pattern, unique</dfn></td>
  </tr>
  <tr>
    <td>Integer</td>
    <td>Integer</td>
    <td><dfn>required, min, max, unique</dfn></td>
  </tr>
  <tr>
    <td>Long</td>
    <td>Long</td>
    <td><dfn>required, min, max, unique</dfn></td>
  </tr>
  <tr>
    <td>BigDecimal</td>
    <td>BigDecimal</td>
    <td><dfn>required, min, max, unique</dfn></td>
  </tr>
  <tr>
    <td>Float</td>
    <td>Float</td>
    <td><dfn>required, min, max, unique</dfn></td>
  </tr>
  <tr>
    <td>Double</td>
    <td>Double</td>
    <td><dfn>required, min, max, unique</dfn></td>
  </tr>
  <tr>
    <td>Enum</td>
    <td></td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>Boolean</td>
    <td>Boolean</td>
    <td>required, unique</td>
  </tr>
  <tr>
    <td>LocalDate</td>
    <td></td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td></td>
    <td>Date</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>ZonedDateTime</td>
    <td></td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>Duration</td>
    <td></td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>UUID</td>
    <td>UUID</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>Blob</td>
    <td></td>
    <td><dfn>required, minbytes, maxbytes, unique</dfn></td>
  </tr>
  <tr>
    <td>AnyBlob</td>
    <td></td>
    <td><dfn>required, minbytes, maxbytes, unique</dfn></td>
  </tr>
  <tr>
    <td>ImageBlob</td>
    <td></td>
    <td><dfn>required, minbytes, maxbytes, unique</dfn></td>
  </tr>
  <tr>
    <td>TextBlob</td>
    <td></td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>Instant</td>
    <td>Instant</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
</table>

---

## <a name="entity_options"></a> Available entity options

Unary options can be used like this: 
  - `<OPTION> <ENTITIES | * | all> except? <ENTITIES>`
  - `@<OPTION> entity <ENTITY>`

Binary options can be used like this: 
  - `<OPTION> <ENTITIES | * | all> with <VALUE> except? <ENTITIES>`
  - `@<OPTION>(<VALUE>) entity <ENTITY>`

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
    <td></td>
  </tr>
  <tr>
    <td>skipServer</td>
    <td>unary</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>noFluentMethod</td>
    <td>unary</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>filter</td>
    <td>unary</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>readOnly</td>
    <td>unary</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>dto</td>
    <td>binary</td>
    <td>no</td>
    <td>mapstruct, no</td>
    <td></td>
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
    <td>pagination, infinite-scroll, pager, no</td>
    <td>pager is only available in AngularJS</td>
  </tr>
  <tr>
    <td>search</td>
    <td>binary</td>
    <td>no</td>
    <td>elasticsearch, no</td>
    <td></td>
  </tr>
  <tr>
    <td>microservice</td>
    <td>binary</td>
    <td></td>
    <td>custom value</td>
    <td></td>
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

---

## <a name="troubleshooting"></a>Troubleshooting

### The JDL import only finds one entity when matching MS baseName

This is a known issue regarding the parsing system and fixing it is tricky.
The obvious workaround is to use different names for the microservice and the entities inside.

See [JHipster Core issue #308](https://github.com/jhipster/jhipster-core/issues/308) for more information.

---

## <a name="issues"></a>Issues and bugs

JDL is [available on GitHub](https://github.com/jhipster/jhipster-core), and follows the same
[contributing guidelines as JHipster]( https://github.com/jhipster/generator-jhipster/blob/master/CONTRIBUTING.md).

Please use our project for submitting issues and Pull Requests concerning the library itself.

- [JDL issue tracker](https://github.com/jhipster/jhipster-core/issues)
- [JDL Pull Requests](https://github.com/jhipster/jhipster-core/pulls)

When submitting anything, you must be as precise as possible:  
  - **One posted issue must only have one problem** (or one demand/question);  
  - Pull requests are welcome, but the commits must be 'atomic' to really be understandable.  
