---
layout: default
title: JHipster Domain Language - Relationships
permalink: /jdl/relationships
sitemap:
    priority: 0.5
    lastmod: 2019-11-03T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster Domain Language (JDL) - Relationships

## Summary

1. [Relationship types](#relationship-types)
1. [Relationship methods](#relationship-methods)
1. [Multiple relationship bodies](#multiple-relationship-bodies)
1. [Syntax](#syntax)
1. [Examples](#examples)
   1. [Basic example](#basic-example)
   1. [With injected fields](#with-injected-fields)
   1. [With joint fields](#with-joint-fields)
   1. [With methods](#with-methods)
   1. [With required sides](#with-required-sides)
   1. [Reflexive relationships](#reflexive-relationships)
   1. [Commenting](#commenting)

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

### Multiple relationship bodies

If you're tired of having _n_ relationships of the same type in your JDL file, don't worry! There's a solution.

Take this JDL sample for instance:
```jdl
relationship OneToOne {
  A to B
}
relationship OneToOne {
  B to C
}
relationship OneToOne {
  C to D
}
relationship OneToOne {
  D to A
}
```

The solution consists in having every relationship body inside on relationship declaration, like this:
```jdl
relationship OneToOne {
  A to B,
  B to C,
  C to D,
  D to A
}
```

This syntax is really useful when:
  - You have lots of relationships of the same type,
  - You want to know what the relationships are,
  - You don't want to waste time looking for them in your JDL file(s)

---

### Syntax

Relationship declaration is done as follows:
```
relationship (OneToMany | ManyToOne | OneToOne | ManyToMany) {
  <from entity>[{<relationship name>[(<display field>)]}] to <to entity>[{<relationship name>[(<display field>)]}]+
}
```

  - `(OneToMany | ManyToOne| OneToOne | ManyToMany)` is the type of your relationship,
  - `<from entity>` is the name of the entity owner of the relationship: the source,
  - `<to entity>` is the name of the entity where the relationship goes to: the destination,
  - `<relationship name>` is the name of the field having the other end as type,
  - `<display field>` is the name of the field that should show up in select boxes (default: `id`),
  - `required` whether the injected field is required.
  - `with jpaDerivedIdentifier` whether `@MapsId` is used for the association (applicable only for one-to-one)
  - And you can have more than one relationship body
    - See the [Multiple relationship bodies](#multiple-relationship-bodies) section for more info!

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

Not specifying an injected field is the short form of using having an unidirectional relationship.

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

---

#### A note on required reflexive relationships

As noted [here](https://github.com/jhipster/generator-jhipster/issues/11495), required relationships to the same entity
are not supported. The issue is that a child must **always** have a parent, which in turn must have one too, etc.
A possible workaround is to have explicit root and children entities.

----

#### Commenting

Adding comments for relationships is possible:

```jdl
relationship OneToOne {
  /** This comment will be put before b in entity A*/
  A{b}
  to
  /** This comment will be put before a in entity B*/
  B{a}
}
```

The same commenting rules are applied here.
These comments will later be added as Javadoc comments by JHipster. The JDL possesses its own kind of comment:
  - // an ignored comment
  - /** not an ignored comment */

Therefore, anything that starts with `//` is considered an internal comment for JDL, and will not be counted as Javadoc.
Please note that the JDL Studio directives that start with `#` will be ignored during parsing.
