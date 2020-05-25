---
layout: default
title: JHipster Domain Language - Entities & fields
permalink: /jdl/entities-fields
sitemap:
    priority: 0.5
    lastmod: 2019-10-27T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster Domain Language (JDL) - Entities

## Summary

1. [Syntax](#syntax)
1. [Examples](#examples)
   1. [Basic example](#basic-example)
   1. [With a custom table name](#with-a-custom-table-name)
   1. [With fields](#with-fields)
   1. [With field validations](#with-field-validations)
   1. [Blob declaration](#blob-declaration)
   1. [Regular expressions](#regular-expressions)
   1. [Commenting](#commenting)
1. [Field types and validations](#field-types-and-validations)

---

### Syntax

The entity declaration is done as follows:
```
[<entity javadoc>]
[<entity annotation>*]
entity <entity name> [(<table name>)] {
  [<field javadoc>]
  [<field annotation>*]
  <field name> <field type> [<validation>*]
}
```

  - `<entity name>` the name of the entity,
  - `<field name>` the name of one field of the entity,
  - `<field type>` the JHipster supported type of the field,
  - and as an option:
    - `<entity javadoc>` the documentation of the entity,
    - `<entity annotation>` the options for the entity (see [Options][] for a complete list of available options),
    - `<table name>` the database table name (if you want to specify something different that the name automatically computed from the entity name),
    - `<field javadoc>` the documentation of the field,
    - `<field annotation>` the options for the field,
    - `<validation>` the validations for the field.

---

### Examples

#### Basic example

```jdl
entity A
```

This is equivalent to:

```jdl
entity A(a) {}
```

The former the simpler form, without specifying a "body" (braces for fields) and a table name.

---

#### With a custom table name

Specifying a custom table name is possible too:

```jdl
 entity A(my_super_entity)
```

---

#### With fields

```jdl
entity A {
  name String required
  age Integer
}
```

---

#### With field validations

```jdl
entity A {
  name String required
  age Integer min(42) max(42)
}
```

---

#### Blob declaration

JHipster gives a great choice as one can choose between an image type or any binary type. JDL lets you do the same.
Create a custom type (see DataType) with the editor, name it according to these conventions:
  - `AnyBlob` or `Blob` to create a field of the "any" binary type;
  - `ImageBlob` to create a field meant to be an image.
  - `TextBlob` to create a field for a CLOB (long text).

And you can create as many DataTypes as you like.

---

#### Regular expressions

This is a certain validation (only available to String types), and its syntax is:

```jdl
entity A {
  name String pattern(/^[A-Z][a-z]+\d$/)
}
```

Let's break it down:
  - `pattern` is the keyword to declare a regex validation (with the normal parenthesises)
  - `/.../` the pattern is declared inside two slashes
  - `\` anti-slashes needn't be escaped

---

#### Commenting

Commenting is possible in the JDL for entities and fields, and will generate documentation (Javadoc or JSDoc, depending
on the backend).

```jdl
/**
 * This is a comment
 * about a class
 * @author Someone
 */
entity A {
  /**
   * This comment will also be used!
   * @type...
   */
   name String
   age Integer // this is yet another comment
}
```

These comments will later be added as Javadoc comments by JHipster. The JDL possesses its own kind of comment:
  - // an ignored comment
  - /** not an ignored comment */

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
**If you want to mix commas and following comments, beware!**
```
entity A {
  name String, /** My comment */
  count Integer
}
```
A's name won't have the comment, because the count will.

---

### Field types and validations

The field types depend on the database type, and each field type has its own validation list:

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
    <td>ZonedDateTime</td>
    <td><dfn>required, unique</dfn></td>
  </tr>
  <tr>
    <td>Instant</td>
    <td>Instant</td>
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
    <td></td>
    <td>ByteBuffer</td>
    <td><dfn>required, minbytes, maxbytes, unique</dfn></td>
  </tr>
</table>

[Options]: options#available-options "Options"
