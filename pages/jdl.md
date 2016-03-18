---
layout: default
title: JHipster Domain Language
permalink: /jdl/
sitemap:
    priority: 0.5
    lastmod: 2016-03-13T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster Domain Language (JDL)


JDL is a JHipster specific domain language where we have added the possibility to describe all your entities and their relationships in a single file with a simple and user-friendly syntax.

You can use our online [JDL-Studio]({{ site.url }}/jdl-studio/) IDE to create JDL and its UML visualization. You can create and export or share URL of your JDL as well.

You can generate entities from a JDL file using the [import-jdl]({{ site.url }}/importing-jdl/) sub generator. Simply run `yo jhipster:import-jdl yourJdlFilePath.jh` from the root of the generated JHipster application.

- this can be used as a replacement to using the [entity sub-generator]({{ site.url }}/creating-an-entity/). The idea is that it is much easier to [manage relationships]({{ site.url }}/managing-relationships/) using a visual tool than with the classical Yeoman questions and answers.

The JDL project is [available on Github](https://github.com/jhipster/jhipster-domain-language/), it is an Open Source project like JHipster (Apache 2.0 licence). This can be used a node library to do JDL parsing. If you like this project, don't forget to give us a star on GitHub!

Here's what's covered on this page:

1. [JDL Sample](#sample)
2. [How to use it](#howtojdl)  
3. [The language](#jdllanguage)  
4. [Commenting](#commentingjdl)  
5. [Adding JHipster's options](#options)  
6. [All the relationships](#jdlrelationships)  
7. [Annexes](#annexes)
8. [Issues and bugs](#issues)  

***

# <a name="sample"></a> JDL Sample

The Oracle example has been translated into JDL, and is available [here](https://github.com/jhipster/jhipster-uml/blob/master/test/jh/oracle.jh). The same is loaded by default in [JDL-Studio]({{ site.url }}/jdl-studio/) as well.

## <a name="howtojdl"></a> How to use it
You can use it by:

  - simply creating a file with the extension '.jh',
  - declare your entities and relationships or create and download the file with [JDL-Studio]({{ site.url }}/jdl-studio/),
  - in your JHipster application's root folder, simply run `jhipster:import-jdl yourfile.jh`.

and *Voilà*, you are done!

## <a name="jdllanguage"></a> The language
We tried to keep the syntax as friendly as we can for Java developers.
You can do three things with it: declare entities with their attributes, declare the relationships between them and declare some JHipster specific options.


The entity declaration is done as follows:

    entity <entity name> {
      <field name> <type> [<validation>*]
    }

- `<entity name>` is the name of the entity,

- `<field name>` the name of one field of the entity,

- `<type>` the JHipster supported type of the field,

- and as an option `<validation>` the validations for the field.

The possible types and validations are those described [here](#annexes), if the validation requires a value, simply add `(<value>)` right after the name of the validation.

Here's an example of a field declaration with validations:

    email String required maxlength(30) minlength(5) pattern("[\\w]*@[a-zA-Z]*.com"),

The relationships declaration is done as follows:

    relationship (OneToMany | ManyToOne | OneToOne | ManyToMany) {
      <from entity>[{<relationship name>}] to <to entity>[{<relationship name>}]
    }

- `(OneToMany | ManyToOne| OneToOne | ManyToMany)` is the type of your relationship,

- `<from entity>` is the name of the entity owner of the relationship,

- `<to entity>` is the name of the entity where the relationship goes to,

- `<relationship name>` is the name of the relationship in the entity.


Here's a simple example:

A Book has one Author, an Author has several Books.

    entity Book {
      title String required,
      description String required minlength(5) maxlength(50),
      publicationDate LocalDate,
      price BigDecimal
    }
    entity Author {
      name String required,
      birthDate LocalDate
    }
    relationship OneToMany {
      Author{book} to Book{writer(name)}
    }

### Relationships
The relationship OneToMany A to B is equivalent to the relationship ManyToOne B to A, you only need make one of them.

The field used to represent a relationship is, by default, `id`. This can be modifed with the following syntax for the `<relationship name>` token above: `<relationship field>(<display field>)`.

### Enum
To make Enums with JDL just do as follows:

- Declare an Enum where you want in the file:

        enum Language {
          FRENCH, ENGLISH, SPANISH
        }

- In an entity, add field with the Enum as a type:

        entity Book {
          title String required,
          description String,
          language Language
        }

### Blob (byte[])
JHipster gives a great choice as one can choose between an image type or any binary type. JDL lets you do the same: just create a custom type (see DataType) with the editor, name it according to these conventions:

  - `AnyBlob` or just `Blob` to create a field of the "any" binary type;

  - `ImageBlob` to create a field meant to be an image.

And you can create as many DataTypes as you like.



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


## <a name="options"></a>Using JHipster's options

JDL can add options to your entities (DTOs, paginations and services).

    entity A {
      name String required
    }

    entity B {}

    entity C {}

    dto A, B with mapstruct

    paginate A, C with infinite-scroll
    paginate B with pager

    service A with serviceClass
    service C with serviceImpl

The keywords `dto`, `paginate`, `service` and `with` were added to the grammar to support these changes.
If a wrong option is specified, JDL will inform you of that with a nice, red message and will just ignore it so as not to corrupt JHipster's JSON files.

JDL also supports mass-option setting. it is possible to do:

    entity A
    entity B
    ...
    entity Z

    dto * with mapstruct
    service all with serviceImpl
    paginate C, with pager

Note that `*` and `all` are equivalent.
Latest version introduces exclusions (which is quite a powerful option when setting options for every entity):

    entity A
    entity B
    ...
    entity Z

    dto * with mapstruct except A
    service all with serviceImpl except A, B, C
    paginate C, with pager


## <a name="jdlrelationships"></a>All the relationships

Explanation on how to create relationships with JDL.


### One-to-One

A bidirectional relationship where the Car has a Driver, and the Driver has a Car.

    entity Driver {}
    entity Car {}
    relationship OneToOne {
      Car{driver} to Driver{car}
    }

A Unidirectional example where a Citizen has a Passport, but the Passport has no access to sole its owner.

    entity Citizen {}
    entity Passport {}
    relationship OneToOne {
      Citizen{passport} to Passport
    }


### One-to-Many

A bidirectional relationship where the Owner has none, one or more Car objects, and the Car knows its owner.

    entity Owner {}
    entity Car {}
    relationship OneToMany {
      Owner{car} to Car{owner}
    }

Unidirectional versions for this relationship are not supported by JHipster, but it would look like this:

    entity Owner {}
    entity Car {}
    relationship OneToMany {
      Owner{car} to Car
    }


### Many-to-One

The reciprocal version of One-to-Many relationships is the same as previously.
The unidirectional version where the Car knows its owners:

    entity Owner {}
    entity Car {}
    relationship ManyToOne {
      Car{owner} to Owner
    }


### Many-to-Many

Finally, in this example we have the Car that knows of its drivers, and the Driver object can access its cars.

    entity Driver {}
    entity Car {}
    relationship ManyToMany {
      Car{driver} to Driver{car}
    }

Please note that the owning side of the relationship has to be on the left side

# <a name="annexes"></a>Annexes

Here is the types supported by JDL:

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
</table>

# <a name="issues"></a>Issues and bugs

JDL is [available on Github](https://github.com/jhipster/jhipster-domain-language), and follows the same [contributing guidelines as JHipster]( https://github.com/jhipster/generator-jhipster/blob/master/CONTRIBUTING.md).

Please use our project for submitting issues and Pull Requests concerning the library itself.

- [JDL issue tracker](https://github.com/jhipster/jhipster-domain-language/issues)
- [JDL Pull Requests](https://github.com/jhipster/jhipster-domain-language/pulls)

When submitting anything, you must be as precise as possible:
  - **One posted issue must only have one problem** (or one demand/question);
  - Pull requests are welcome, but the commits must be 'atomic' to really be understandable.
