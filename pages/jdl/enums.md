---
layout: default
title: JHipster Domain Language - Enums
permalink: /jdl/enums
sitemap:
    priority: 0.5
    lastmod: 2019-10-27T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster Domain Language (JDL) - Enums

## Summary

1. [Syntax](#syntax)
1. [Examples](#examples)
   1. [Basic example](#basic-example)
   1. [With values](#with-values)
   1. [Commenting](#commenting)

---

### Syntax

Enumeration declaration is done as follows:

```
enum [<enum name>] {
  <ENUM KEY> ([<enum value>])
}
```

  - Enumeration entry values are mandatory
    - And uppercase keys must be used
  - Enumeration entry values are optional, and must be wrapped inside parenthesises

---

### Examples

#### Basic example

```jdl
enum Country {
  BELGIUM,
  FRANCE,
  ITALY
}
```

And its use:

```jdl
enum Country {}

entity A {
  country Country
}
```

---

#### With values

Starting from JHipster Core v6, enum values can have explicit values:

```jdl
enum Country {
  BELGIUM (Belgium),
  FRANCE (France),
  ITALY (Italy)
}
```

---

#### Commenting

Just like relationships, entities and fields, commenting is possible for enums, with the same rules.

Comments will later be added as Javadoc comments by JHipster. The JDL possesses its own kind of comment:
  - // an ignored comment
  - /** not an ignored comment */

Therefore, anything that starts with `//` is considered an internal comment for JDL, and will not be counted as Javadoc.
Please note that the JDL Studio directives that start with `#` will be ignored during parsing.

```jdl
/** This comment will be taken into account */
enum Country {
  // But not this one!
  FRANCE
}
```
