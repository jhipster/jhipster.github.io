---
layout: default
title: Creating an entity
permalink: /creating-an-entity/
redirect_from:
  - /creating_an_entity.html
sitemap:
    priority: 0.7
    lastmod: 2018-09-04T00:00:00-00:00
---

# <i class="fa fa-bolt"></i> Creating an entity

_**Please check our [video tutorial]({{ site.url }}/video-tutorial/) on creating a new JHipster application!**_

**Important** if you want to have "live reload" of your JavaScript/TypeScript code, you will need to run `npm start` or `yarn start`. You can go to the [Using JHipster in development]({{ site.url }}/development/) page for more information.

## Introduction

Once you have created your application, you will want to create _entities_. For example, you might want to create an _Author_ and a _Book_ entity. For each entity, you will need:

*   A database table
*   A Liquibase change set
*   A JPA Entity
*   A Spring Data JPA Repository
*   A Spring MVC REST Controller, which has the basic CRUD operations
*   An Angular router, a component and a service
*   An HTML view
*   Integration tests, to validate everything works as expected
*   Performance tests, to see if everything works smoothly

If you have several entities, you will likely want to have relationships between them. For this, you will need:

*   A database foreign key
*   Specific JavaScript and HTML code for managing this relationship

The "entity" sub-generator will create all the necessary files, and provide a CRUD front-end for each entity (see [Angular project structure]({{ site.url }}/using-angular/) and [React project structure]({{ site.url }}/using-react/)). The sub generator can be invoked by running `jhipster entity <entityName> --[options]`. Reference for those options can be found by typing `jhipster entity --help`

Below are the supported options.

*   `--table-name <table_name>` - By default JHipster will generate a table name based on your entity name, if you would like to have a different table name you can do so by passing this option.
*   `--angular-suffix <suffix>` - If you want all your Angular routes to have a custom suffix you can pass that using this option.
*   `--client-root-folder <folder-name>` - Use a root folder name for entities on the client side. By default it's empty for monoliths and the name of the microservice for gateways.
*   `--regenerate` - This will regenerate an existing entity without asking any questions.
*   `--skip-server` - This will skip the server-side code and will generate only the client-side code.
*   `--skip-client` - This will skip the client-side code and will generate only the server-side code.
*   `--skip-db-changelog` - This will skip generation of database changelog (using Liquibase for SQL databases).
*   `--db` - Specify the database when skipping server side generation, has no effect otherwise.

<div class="alert alert-warning"><i>Warning: </i>

Don't choose a short name for your entity (see <a href="https://github.com/jhipster/generator-jhipster/issues/8446" target="_blank">this ticket</a>).

</div>

## JHipster UML and JDL Studio

This page describes how to create entities with JHipster using the standard command-line interface. If you want to create many entities, you might prefer to use a graphical tool.

In that case, two options are available:

*   [JHipster UML]({{ site.url }}/jhipster-uml/), which allows you to use an UML editor.
*   [JDL Studio](https://start.jhipster.tech/jdl-studio/), our online tool to create entities and relationships using our domain-specific language [JDL]({{ site.url }}/jdl/).

If you used the JDL Studio:

*   You can generate entities from a JDL file using the `import-jdl` sub-generator, by running `jhipster import-jdl your-jdl-file.jh`.

    * If you do not want to regenerate your entities, while importing a JDL, you can use the `--json-only` flag to skip entity creation part and create only the json files in `.jhipster` folder.

    ```
    jhipster import-jdl ./my-jdl-file.jdl --json-only
    ```

    * By default `import-jdl` regenerates only entities which have changed, if you want all your entities to be regenerated then pass in the `--force`  flag. Please note that this will overwrite all your local changes to the entity files

    ```
    jhipster import-jdl ./my-jdl-file.jdl --force
    ```

*   If you want to use JHipster UML instead of the `import-jdl` sub-generator, you need to install it by running `npm install -g jhipster-uml`, and then run `jhipster-uml yourFileName.jh`.

## Entity fields

For each entity, you can add as many fields as you want. You will need to input the field names and their types, and JHipster will generate for you all the required code and configuration, from the Angular HTML view to the Liquibase changelog.

Those fields cannot contain reserved keywords in the technologies you are using. For example, if you use MySQL:

*   You cannot use Java reserved keywords (as your code will not compile)
*   You cannot use MySQL reserved keywords (as your database schema update will fail)

## Field types

JHipster supports many field types. This support depends on your database backend, so we use Java types to describe them: a Java `String` will be stored differently in Oracle or Cassandra, and it is one of JHipster's strengths to generate the correct database access code for you.

*   `String`: A Java String. Its default size depends on the underlying backend (if you use JPA, it's 255 by default), but you can change it using the validation rules (putting a `max` size of 1024, for example).
*   `Integer`: A Java Integer.
*   `Long`: A Java Long.
*   `Float`: A Java Float.
*   `Double`: A Java Double.
*   `BigDecimal`: A [java.math.BigDecimal](https://docs.oracle.com/javase/8/docs/api/java/math/BigDecimal.html) object, used when you want exact mathematic calculations (often used for financial operations).
*   `LocalDate`: A [java.time.LocalDate](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDate.html) object, used to correctly manage dates in Java.
*   `Instant`: A [java.time.Instant](https://docs.oracle.com/javase/8/docs/api/java/time/Instant.html) object, used to represent a timestamp, an instantaneous point on the time-line.
*   `ZonedDateTime`: A [java.time.ZonedDateTime](https://docs.oracle.com/javase/8/docs/api/java/time/ZonedDateTime.html) object, used to represent a local date-time in a given timezone (typically a calendar appointment). Note that time zones are neither supported by the REST nor by the persistence layers so you should most probably use `Instant` instead.
*   `Duration`: A [java.time.Duration](https://docs.oracle.com/javase/8/docs/api/java/time/Duration.html) object, used to represent an amount of time.
*   `UUID`: A [java.util.UUID](https://docs.oracle.com/javase/8/docs/api/java/util/UUID.html).
*   `Boolean`: A Java Boolean.
*   `Enumeration`: A Java Enumeration object. When this type is selected, the sub-generator will ask you what values you want in your enumeration, and it will create a specific `enum` class to store them.
*   `Blob`: A Blob object, used to store some binary data. When this type is selected, the sub-generator will ask you if you want to store generic binary data, an image object, or a CLOB (long text). Images will be handled specifically on the Angular side, so they can be displayed to the end-user.

## Validation

Validation can be set up for each field. Depending on the field type, different validation options will be available.

Validation will be automatically generated on:

*   the HTML views, using the Angular or React or Vue validation mechanism
*   the Java domain objects, using [Bean Validation](http://beanvalidation.org/)

Bean validation will then be used to automatically validate domain objects when they are used in:

*   Spring MVC REST controllers (using the `@Valid` annotation)
*   Hibernate/JPA (entities are automatically validated before being saved)

Validation information will also be used to generate more precise database column metadata:

*   Required fields will be marked non-nullable
*   Unique fields will create a unique constraint
*   Fields which have a maximum length will have the same column length

Validation has a few limitations:

*   We don't support all validation options from Angular, React and Bean Validation, as we only support those which are common to both client and server APIs
*   Regular Expression patterns don't work the same in JavaScript and in Java, so if you configure one, you might need to tweak one of the generated patterns
*   JHipster generates unit tests that work for generic entities, without knowing your validation rules: it is possible that the generated tests do not pass the validation rules. In that case, you will need to update the sample values used in your unit tests, so that they pass the validation rules.

## Entity relationships

Entity relationships are only available for SQL databases. It is a fairly complex subject, which has its own documentation page: [Managing relationships]({{ site.url }}/managing-relationships/).

## Generating a separate service class for your business logic

Having a separate service class allows to have more complex logic that just using a Spring REST Controller directly. Having a service layer (with or without an interface) will allow you to use DTOs (see next section).

This is the same logic as using the [Spring service sub-generator]({{ site.url }}/creating-a-spring-service/), so we recommend to read its documentation to have more information.

## Data Transfer Objects (DTOs)

By default JHipster entities do not use DTOs, but they are available as an option, if you choose to have a service layer (see previous section). Here is the documentation: [Using DTOs]({{ site.url }}/using-dtos/).

## Filtering

Optionally, entities stored in SQL databases can be filtered using JPA. Here is the documentation: [Filtering your entities]({{ site.url }}/entities-filtering/).

## Pagination

Please note that pagination is not available if you created your application with [Cassandra]({{ site.url }}/using-cassandra/). Of course this will be added in a future release.

Pagination uses [the Link header](http://tools.ietf.org/html/rfc5988), as in the [GitHub API](https://developer.github.com/v3/#pagination). JHipster provides a custom implementation of this specification on both the server (Spring MVC REST) and client (Angular/React) sides.

When the entity is generated, JHipster provides 4 pagination options:

*   No pagination (in that case, the back-end won't be paginated)
*   A simple pager, based on [the Bootstrap pager](http://getbootstrap.com/components/#pagination-pager)
*   A complete pagination system, based on [the Bootstrap pagination component](http://getbootstrap.com/components/#pagination)
*   An infinite scroll system, based on [the infinite scroll directive](http://sroze.github.io/ngInfiniteScroll/)

## Updating an existing entity

The entity configuration is saved in a specific `.json` file, in the `.jhipster` directory. So if you run the sub-generator again, using an existing entity name, you can update or regenerate the entity.

When you run the entity sub-generator for an existing entity, you will be asked a question 'Do you want to update the entity? This will replace the existing files for this entity, all your custom code will be overwritten' with following options:

*   `Yes, re generate the entity` - This will just regenerate your entity. Tip: This can be forced by passing a `--regenerate` flag when running the sub-generator
*   `Yes, add more fields and relationships` - This will give you questions to add more fields and relationships
*   `Yes, remove fields and relationships` - This will give you questions to remove existing fields and relationships from the entity
*   `No, exit` - This will exist the sub-generator without changing anything

You might want to update your entity for the following reasons:

*   You want to add/remove fields and relationships to an existing entity
*   You want to reset your entity code to its original state
*   You have updated JHipster, and would like to have your entity generated with the new templates
*   You have modified the `.json` configuration file (the format is quite close to the questions asked by the generator, so it's not very complicated), so you can have a new version of your entity
*   You have copy/pasted the `.json` file, and want a new entity that is very close to the copied entity

TIP: to regenerate all your entities at once, you can use the following commands (remove the `--force` to have questions asked when files have changed).

*   Linux & Mac: ``for f in `ls .jhipster`; do jhipster entity ${f%.*} --force ; done``
*   Windows: `for %f in (.jhipster/*) do jhipster entity %~nf --force`

## Tutorial

This is a short tutorial on creating two entities (a Author and a Book) which have a one-to-many relationship.

**Important** if you want to have "live reload" of your JavaScript/TypeScript code, you will need run `npm start` or `yarn start`. You can go to the [Using JHipster in development]({{ site.url }}/development/) page for more information.

### Generate the "Author" entity

As we want to have a one-to-many relationship between Authors and Books (one author can write many books), we need to create the Author first. At the database level, JHipster will then be able to add a foreign key on the Book table, linking to the Author table.

`jhipster entity author`

Answer the next questions concerning the fields of this entity, the author has:

*   a "name" of type "String"
*   a "birthDate" of type "LocalDate"

Then answer the questions concerning the relationships, the author has:

*   A one-to-many relationship with the "book" entity (which doesn't exist yet)

### Generate the "Book" entity

`jhipster entity book`

Answer the next questions concerning the fields of this entity, the book has:

*   a "title", of type "String"
*   a "description", of type "String"
*   a "publicationDate", of type "LocalDate"
*   a "price", of type "BigDecimal"

Then answer the questions concerning the relationships, the book:

*   Has many-to-one relationship with the "author" entity
*   And this relationship uses the "name" field (from the Author entity) to be displayed

### Check the generated code

Run the generated test suite, with `mvn test`, which will test the Author entity and the Book entity.

Launch the application (for example with `mvn`), log in and select the "Author" and "Book" entities in the "entities" menu.

Check the database tables, to see if your data is correctly inserted.

### Improve the generated code

The generated files contain all the basic CRUD operations, and don't need to be modified if your needs are simple.

If you want to modify the generated code or the database schema, you should follow our [development guide]({{ site.url }}/development/)

If you want some more complex business behaviors, you might need to add a Spring `@Service` class, using the [service sub-generator]({{ site.url }}/creating-a-service/).

### You're done!

Your generated CRUD page should look like this:

![]({{ site.url }}/images/screenshot_5.png)
