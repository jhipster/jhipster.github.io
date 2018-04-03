---
layout: default
title: JHipster Domain Language
permalink: /jdl/
sitemap:
    priority: 0.5
    lastmod: 2018-03-18T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster Domain Language (JDL)


The JDL is a JHipster specific domain language where we have added the possibility to describe all your entities and their relationships in a single file (or more than one) with a simple and user-friendly syntax.

You can use our online [JDL-Studio](https://start.jhipster.tech/jdl-studio/) IDE to create JDL and its UML visualization. You can create and export or share the URL of your JDL model as well.

Once you have a generated project (either existing one or generated with `jhipster` command line), you can generate entities from a JDL file using the `import-jdl` sub-generator, by running `jhipster import-jdl your-jdl-file.jh` (make sure to execute this command under your JHipster project). You can also generate entities and export them as a JDL file using [JHipster UML]({{ site.url }}/jhipster-uml/), by running `jhipster-uml your-xmi-file.xmi --to-jdl` from the root of the generated JHipster application. To learn more about JHipster UML, and install it, go to the [JHipster UML documentation]({{ site.url }}/jhipster-uml/).

This can be used as a replacement to using the [entity sub-generator]({{ site.url }}/creating-an-entity/). The idea is that it is much easier to [manage relationships]({{ site.url }}/managing-relationships/) using a visual tool than with the classical Yeoman questions and answers.

The JDL project is [available on GitHub](https://github.com/jhipster/jhipster-core/), it is an Open Source project like JHipster (Apache 2.0 License). It can also be used as a node library to do JDL parsing.

_If you like the JHipster Domain Language, don't forget to give the project a star on [GitHub](https://github.com/jhipster/jhipster-core/)!_
_If you like the JDL Studio don't forget to give the project a star on [GitHub](https://github.com/jhipster/jdl-studio/)!_

Here is the JDL documentation:

1. [JDL Sample](#sample)
1. [How to use it](#howtojdl)
1. [The language](#jdllanguage)
   1. [Application Declaration](#applicationdeclaration)
   1. [Entity Declaration](#entitydeclaration)
   1. [Relationship Declaration](#relationshipdeclaration)
   1. [Enumerations](#enumerationdeclaration)
   1. [Blobs](#blobdeclaration)
   1. [Option declaration](#optiondeclaration)
   1. [Microservice-related options](#microserviceoptions)
1. [Commenting](#commentingjdl)
1. [All the relationships](#jdlrelationships)
1. [Constants](#constants)
1. [Workflows](#workflows)
1. [Annexes](#annexes)
   1. [Available application options](#application_options)
   1. [Available field types and constraints](#types_and_constraints)
   1. [Available options](#all_options)
1. [Issues and bugs](#issues)

***

# <a name="sample"></a> JDL Sample

The Oracle "Human Resources" sample application has been translated into JDL, and is available [here](https://github.com/jhipster/jhipster-core/blob/master/lib/dsl/example.jh). The same application is loaded by default in [JDL-Studio](https://start.jhipster.tech/jdl-studio/) as well.

## <a name="howtojdl"></a> How to use it

If you want to use JHipster UML instead of the `import-jdl` sub-generator you need to install it by running `npm install -g jhipster-uml`.

You can then use JDL files to generate entities:

  - simply create a file with the extension '.jh' or '.jdl',
  - declare your entities and relationships or create and download the file with [JDL-Studio](https://start.jhipster.tech/jdl-studio/),
  - in your JHipster application's root folder, run `jhipster import-jdl my_file.jdl` or `jhipster-uml my_file.jdl`.

and *Voilà*, you are done!

If you work in a team, perhaps you would like to have multiple files instead of one. We added this option so that you don't manually
concatenate all the files into one, you just have to run `jhipster import-jdl my_file1.jh my_file2.jh` or `jhipster-uml my_file1.jh my_file2.jh`.

If you do not want to regenerate your entities, while importing a JDL, you can use the `--json-only` flag to skip entity creation part and create only the json files in `.jhipster` folder.

    jhipster import-jdl ./my-jdl-file.jdl --json-only
    
By default `import-jdl` regenerates only entities which have changed, if you want all your entities to be regenerated then pass in the `--force`  flag. Please note that this will overwrite all your local changes to the entity files

    jhipster import-jdl ./my-jdl-file.jdl --force

If you want to use it in your project, you can add do so by doing `npm install jhipster-core --save` to install it locally, and save it in your `package.json` file.

---

## <a name="jdllanguage"></a> The language
We tried to keep the syntax as friendly as we can for developers.
You can do three things with it:
  - Declare entities with their attributes,
  - Declare the relationships between them,
  - And declare some JHipster specific options.


### <a name="applicationdeclaration"></a> Application declaration

As of v2.0.0, application declaration is possible (compatible with JHipster v5).
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
    baseName myapp,
    path "../", // the generated folder will be "../myapp"
    applicationType microservice,
    prodDatabaseType postgresql,
    buildTool gradle
  }
}
```

Those options are only a sample of what's available in the JDL.
The complete list of options is available in the annexes, [here](#annexes).

Note the non-standard `path` option. This one is used by the subgens to generate applications elsewhere than
the current folder.

If you want more than one application, here's how you do it:

```
application {
  config {
    baseName myFirstApp,
    path "../", // the generated folder will be "../myFirstApp"
  }
}

application {
  config {
    baseName mySecondApp,
    path "../",
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
    baseName myMonolith,
    path "../",
    applicationType monolith
  }
  entities * except C, D
}

application {
  config {
    baseName myGateway,
    path "../",
    applicationType gateway,
    serverPort 9042
  }
  entities * except A, B
}

application {
  config {
    baseName microserviceA,
    path "../",
    applicationType microservice
  }
  entities C
}

application {
  config {
    baseName microserviceB,
    path "../",
    applicationType microservice,
    serverPort 8082
  }
  entities D
}

entity A
entity B
entity C
entity D

dto * with mapstruct
paginate D with pager
```

Now, several things will happen when generating these applications and folders:
  - Four applications will be created:
    - myMonolith in `../myMonolith`, with the server port `8080`
    - myGateway in `../myGateway`, with the server port `9042`
    - microserviceA in `../microserviceA`, with the server port `8081`
      - Even though we didn't specify a server port, JHipster sets one by default.
      - For microservices, the default one is `8081`
      - For gateways and monoliths, it's `8080`
      - For UAA apps, it's `9999`
    - microserviceB in `../microserviceB` with the server port `8082`
  - Four entities will be generated
    - `A` and `B` in the monolith
    - `C` and `D` both in the gateway
      - `C` in the first microservice
      - `D` in the second microservice
  - The `microservice` option is implicit for `C` and `D`
    - Because they get generated on the two microservices, this option will be set by default.
  - Options work the same way as before 

Note that generator sets default values if they aren't present (like the `databaseType`).
JHipster Core does the exact same things.

### <a name="entitydeclaration"></a> Entity declaration

The entity declaration is done as follows:

    entity <entity name> {
      <field name> <type> [<validation>*]
    }

  - `<entity name>` is the name of the entity,
  - `<field name>` the name of one field of the entity,
  - `<type>` the JHipster supported type of the field,
  - and as an option `<validation>` the validations for the field.

The possible types and validations are those described [here](#annexes), if the validation requires a value, simply add `(<value>)` right after the name of the validation.


Here's an example of a JDL code:

```
entity A
entity B
entity C
entity D {
  name String required,
  address String required maxlength(100),
  age Integer required min(18)
}
```

Regexes are a bit special as they are used like this (from v1.3.6):
```
entity A {
  myString String required minlength(1) maxlength(42) pattern(/[A-Z]+/)
}
```
If you're using the generator prior to v4.9.X, you'd need to use patterns like this `pattern('[A-Z]+'`).

Because the JDL was made to be simple to use and read, if your entity is empty (no field), you can just declare an entity with `entity A` or `entity A {}`.

Note that JHipster adds a default `id` field so that you needn't worry about it.


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

Here's a simple example:

A Book has one, required, Author, an Author has several Books.

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
  A{b} to B{a},
  B{c} to C
}
relationship ManyToMany {
  A{d} to D{a},
  C{d} to D{c}
}
```

The join is always done using the `id` field which is also the default field shown when editing a relation in the front-end. If another field should be shown instead, you can specify it like this:

```
entity A {
  name String required
}
entity B


relationship OneToOne {
  A{b} to B{a(name)}
}
```

This makes JHipster generate a REST resource that returns both `id` and `name` of the linked entity to the front-end, so the name can be shown to the user instead.

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
JHipster gives a great choice as one can choose between an image type or any binary type. JDL lets you do the same: just create a custom type (see DataType) with the editor, name it according to these conventions:

  - `AnyBlob` or just `Blob` to create a field of the "any" binary type;
  - `ImageBlob` to create a field meant to be an image.
  - `TextBlob` to create a field for a CLOB (long text).

And you can create as many DataTypes as you like.


### <a name="optiondeclaration"></a> Option declaration

In JHipster, you can specify options for your entities such as pagination or DTO.
You can do the same with the JDL:

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
If a wrong option is specified, JDL will inform you of that with a nice, red message and will just ignore it so as not to corrupt JHipster's JSON files.

#### Service option

No services specified will create a resource class which will call the repository interface directly. This is the default and simplest option, see A.
Service with serviceClass (see B) will make the resource call the service class which will call the repository interface. Service with serviceImpl (see C) will make a service interface which will be used by the resource class. The interface is implemented by an impl class which will call the repository interface.

Use no service if not sure it's the simplest option and good for CRUD. Use service with a Class if you will have a lot of business logic which will use multiple repositories making it ideal for a service class. Jhipster's are not a fan of unnecessary Interfaces but if you like them go for service with impl.

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


With JHipster, you can also tell whether you don't want any client code, or server code. Even if you want to add a suffix to Angular-related files, you can do that in JHipster.
In your JDL file, simply add these lines to do the same:

```
entity A
entity B
entity C

skipClient for A
skipServer for B
angularSuffix * with mySuperEntities
```

Finally, table names can also be specified (the entity's name will be used by default):

```
entity A // A is the table's name here
entity B (the_best_entity) // the_best_entity is the table's name
```


### <a name="microserviceoptions"></a> Microservice-related options

As of JHipster v3, microservices can be created. You can specify some options to generate your entities in the JDL: the microservice's name and the search engine.

Here is how you can specify your microservice's name (the JHipster app's name):

```
entity A
entity B
entity C

microservice * with mysuperjhipsterapp except C
microservice C with myotherjhipsterapp
search * with elasticsearch except C
```

The first option is used to tell JHipster that you want your microservice to deal with your entities, whereas the second specifies how and if you want your entities searched.


## <a name="commentingjdl"></a> Commenting & Javadoc
It is possible to add Javadoc & comments to JDL files.  
Just like in Java, this example demonstrates how to add Javadoc comments:

    /**
     * Class comments.
     * @author The JHipster team.
     */
    entity MyEntity { // another form of comment
      /** A required attribute */
      myField String required,
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
      Citizen{passport} to Passport
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
      Owner{car} to Car
    }


### Many-to-One

The reciprocal version of One-to-Many relationships is the same as previously.
The unidirectional version where the Car knows its owners:

    entity Owner
    entity Car
    relationship ManyToOne {
      Car{owner} to Owner
    }


### Many-to-Many

Finally, in this example we have the Car that knows of its drivers, and the Driver object can access its cars.

    entity Driver
    entity Car
    relationship ManyToMany {
      Car{driver} to Driver{car}
    }

Please note that the owning side of the relationship has to be on the left side

# <a name="constants"></a>Constants

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
  content TextBlob minbytes(DEFAULT_MIN_BYTES) maxbytes(DEFAULT_MAX_BYTES)
  count Integer min(DEFAULT_MIN) max(DEFAULT_MAX)
}
```

# <a name="workflows"></a>Workflows

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
Given two JHipster applications ('firstMS' and 'secondMS'), here's what you're going to get if you import the JDL file in the two applications:
  - In 'firstMS', entities `A` and `C` will be generated.
  - In 'secondMS', entities `B` and `C` will be generated.

`C` gets generated in both because if there's no microservice option specifying where this entity gets generated, it will be generated everywhere.
If you decide to import this JDL in a monolith app, every entity will be generated (monoliths don't have restriction options in the JDL).

Note: if you want to make the same entity be generated in two different microservices, you can write two JDL files instead of updating the JDL file. everytime.

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

---


# <a name="annexes"></a>Annexes

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
    <td>ehcache, hazelcast, infinispan, no</td>
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
    <td>yarn</td>
    <td>yarn, npm</td>
    <td></td>
  </tr>
  <tr>
    <td>databaseType</td>
    <td>sql</td>
    <td>sql, mongodb, cassandra, couchbase</td>
    <td></td>
  </tr>
  <tr>
    <td>devDatabaseType</td>
    <td>h2Disk</td>
    <td>h2Disk, h2Memory, *</td>
    <td>* + the prod database type</td>
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
    <td>jhiPrefix</td>
    <td>jhi</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>jhipsterVersion</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>languages</td>
    <td>[en, fr]</td>
    <td>Languages available in JHipster</td>
    <td></td>
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
    <td>protactor, cucumber, gatling</td>
    <td></td>
  </tr>
  <tr>
    <td>uaaBaseName</td>
    <td></td>
    <td></td>
    <td>Mandatory for gateway and microservices if auth type is uaa</td>
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

## <a name="types_and_constraints"></a>Available field types and constraints

Here are the types supported in the JDL:

<table class="table table-striped table-responsive">
  <tr>
    <th>SQL</th>
    <th>MongoDB</th>
    <th>Cassandra</th>
    <th>Validations</th>
  </tr>
  <tr>
    <td>String</td>
    <td>String</td>
    <td>String</td>
    <td><dfn>required, minlength, maxlength, pattern</dfn></td>
  </tr>
  <tr>
    <td>Integer</td>
    <td>Integer</td>
    <td>Integer</td>
    <td><dfn>required, min, max</dfn></td>
  </tr>
  <tr>
    <td>Long</td>
    <td>Long</td>
    <td>Long</td>
    <td><dfn>required, min, max</dfn></td>
  </tr>
  <tr>
    <td>BigDecimal</td>
    <td>BigDecimal</td>
    <td>BigDecimal</td>
    <td><dfn>required, min, max</dfn></td>
  </tr>
  <tr>
    <td>Float</td>
    <td>Float</td>
    <td>Float</td>
    <td><dfn>required, min, max</dfn></td>
  </tr>
  <tr>
    <td>Double</td>
    <td>Double</td>
    <td>Double</td>
    <td><dfn>required, min, max</dfn></td>
  </tr>
  <tr>
    <td>Enum</td>
    <td>Enum</td>
    <td></td>
    <td><dfn>required</dfn></td>
  </tr>
  <tr>
    <td>Boolean</td>
    <td>Boolean</td>
    <td>Boolean</td>
    <td>required</td>
  </tr>
  <tr>
    <td>LocalDate</td>
    <td>LocalDate</td>
    <td></td>
    <td><dfn>required</dfn></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td>Date</td>
    <td><dfn>required</dfn></td>
  </tr>
  <tr>
    <td>ZonedDateTime</td>
    <td>ZonedDateTime</td>
    <td></td>
    <td><dfn>required</dfn></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td>UUID</td>
    <td><dfn>required</dfn></td>
  </tr>
  <tr>
    <td>Blob</td>
    <td>Blob</td>
    <td></td>
    <td><dfn>required, minbytes, maxbytes</dfn></td>
  </tr>
  <tr>
    <td>AnyBlob</td>
    <td>AnyBlob</td>
    <td></td>
    <td><dfn>required, minbytes, maxbytes</dfn></td>
  </tr>
  <tr>
    <td>ImageBlob</td>
    <td>ImageBlob</td>
    <td></td>
    <td><dfn>required, minbytes, maxbytes</dfn></td>
  </tr>
  <tr>
    <td>TextBlob</td>
    <td>TextBlob</td>
    <td></td>
    <td><dfn>required, minbytes, maxbytes</dfn></td>
  </tr>
  <tr>
    <td>Instant</td>
    <td>Instant</td>
    <td>Instant</td>
    <td><dfn>required</dfn></td>
  </tr>
</table>

## <a name="all_options"></a> Available options

### Unary options

These options don't have any value:
  - `skipClient`
  - `skipServer`
  - `noFluentMethod`
  - `filter`

They can be used like this: `<OPTION> <ENTITIES | * | all> except? <ENTITIES>`

### Binary options

These options take values:
  - `dto` (`mapstruct`)
  - `service` (`serviceClass`, `serviceImpl`)
  - `paginate` (`pager`, `pagination`, `infinite-scroll`)
  - `search` (`elasticsearch`)
  - `microservice` (custom value)
  - `angularSuffix` (custom value)
  - `clientRootFolder` (custom value)

# <a name="issues"></a>Issues and bugs

JDL is [available on GitHub](https://github.com/jhipster/jhipster-core), and follows the same [contributing guidelines as JHipster]( https://github.com/jhipster/generator-jhipster/blob/master/CONTRIBUTING.md).

Please use our project for submitting issues and Pull Requests concerning the library itself.

- [JDL issue tracker](https://github.com/jhipster/jhipster-core/issues)
- [JDL Pull Requests](https://github.com/jhipster/jhipster-core/pulls)

When submitting anything, you must be as precise as possible:  
  - **One posted issue must only have one problem** (or one demand/question);  
  - Pull requests are welcome, but the commits must be 'atomic' to really be understandable.  
