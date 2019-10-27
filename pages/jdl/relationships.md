---
layout: default
title: JHipster Domain Language - Relationships
permalink: /jdl/relationships
sitemap:
    priority: 0.5
    lastmod: 2019-10-27T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster Domain Language (JDL)

## Relationships

1. [Relationship types](#relationship-types)
1. [Relationship methods](#relationship-methods)
1. [Examples](#examples)
   1. [Basic example](#basic-example)
   1. [With injected fields](#with-injected-fields)
   1. [With joint fields](#with-joint-fields)
   1. [With methods](#with-methods)
   1. [With required sides](#with-required-sides)
   1. [Reflexive relationships](#reflexive-relationships)

---

### Relationship types

Mentioned after the `relationship` keyword.

There are four relationship types:
  - `OneToOne`
  - `OneToMany`
  - `ManyToOne`
  - `ManyToMany`

To know more about relationships and what's possible to achieve, you can head
to [the dedicated page](/managing_relationships).

A note on plural names: JHipster handles them so that you don't have to in your relationships.

---

### Relationship methods

Mentioned after the source and destination entity, used with the `with` keyword.

Supported methods:
  - `jpaDerivedIdentifier`: `@MapsId` is used for the association (**applicable only for OneToOne**)

---

### Examples

#### Basic example

```jdl
relationship OneToOne {
  A to B
}
```

Note that this example is the same as:
```jdl
relationship OneToOne {
  A{b} to B
}
```

Not specifying an injected field is just the simple form of using having an unidirectional relationship.

---

#### With injected fields

```jdl
relationship ManyToMany {
  A{b} to B{a}
}
```

This is a bidirectional relationship, meaning that both entities will be generated with an "instance" of the other
entity.

---

#### With joint fields

Used to specify which column in the entities are used for the join (default to `id`).

```jdl
relationship OneToOne {
  A{b(name)} to B{a(name)}
}
```

It roughly translates to SQL: `JOIN B b with a.name = b.name`

---

#### With methods

```jdl
relationship OneToOne {
  A to B with jpaDerivedIdentifier
}
```

---

#### With required sides

Used to make at least one relationship side required.

```jdl
relationship ManyToMany {
  A{b required} to B{a}
}

// or

relationship ManyToMany {
  A{b} to B{a required}
}

or

relationship ManyToMany {
  A{b(name) required} to B{a required}
}
```

---

#### Reflexive relationships

A reflexive relationship is a relationship whose source & destination entities are the same.

```jdl
relationship ManyToMany {
  A{parent required} to A{child}
}
```
