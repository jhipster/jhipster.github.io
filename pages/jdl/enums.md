---
layout: default
title: JHipster Domain Language - Enums
permalink: /jdl/enums
sitemap:
    priority: 0.5
    lastmod: 2019-10-27T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster Domain Language (JDL)

## Enums

1. [Examples](#examples)
   1. [Basic example](#basic-example)
   1. [With values](#with-values)

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
