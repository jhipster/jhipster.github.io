---
layout: default
title: JHipster Domain Language - Entities
permalink: /jdl/entities
sitemap:
    priority: 0.5
    lastmod: 2019-10-27T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster Domain Language (JDL)

## Entities

1. [Examples](#examples)
   1. [Basic example](#basic-example)
   1. [With a custom table name](#with-a-custom-table-name)
   1. [With fields](#with-fields)

---

### Examples

#### Basic example

```jdl
/**
 * This will be used as documentation.
 */
entity A
```

This is equivalent to:

```jdl
/**
 * This will be used as documentation.
 */
entity A(a) {}
```

The former is just the simpler form, without specifying a "body" (braces for fields) and a table name.

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
