---
layout: default
title: JHipster Domain Language - Fields
permalink: /jdl/fields
sitemap:
    priority: 0.5
    lastmod: 2019-10-27T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster Domain Language (JDL)

## Fields

1. [Examples](#examples)
   1. [Basic example](#basic-example)
   1. [More than one field](#more-than-one-field)
   1. [With validations](#with-validations)
   1. [With regular expressions](#with-regular-expressions)
1. [Field types and validations](#field-types-and-validations)

---

### Examples

#### Basic example

```jdl
entity A {
  /**
   * This will be used as documentation.
   */
  name String
}
```

---

#### More than one field

```jdl
entity A {
  name String
  age Integer
}
```

---

#### With validations

```jdl
entity A {
  name String required
  age Integer min(42) max(42)
}
```

---

#### With regular expressions

This is a special validation (only available to String types), and its syntax is special:

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
