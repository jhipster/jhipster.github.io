---
layout: default
title: JHipster Domain Language - Options
permalink: /jdl/options
sitemap:
    priority: 0.5
    lastmod: 2019-10-27T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster Domain Language (JDL)

## Options

1. [How to](#how-to)
1. [Examples](#examples)
   1. [Basic unary example](#basic-unary-example)
   1. [Basic binary example](#basic-binary-example)
   1. [all, * example](#all--example)
   1. [all, * example with exclusions (unary)](#all--example-with-exclusions-unary)
   1. [all, * example with exclusions (binary)](#all--example-with-exclusions-binary)
   1. [Option with custom values](#option-with-custom-values)
   1. [Mixed example](#mixed-example)
1. [Available options](#options)

---

### How to

There are two kinds of options:
  - unary (without option value)
  - binary (with value)

And two way of applying options to entities:
  - using the option name (`dto`, `readOnly`, etc.), see examples
  - using annotations

Mixing them is not recommended as it reduces readability.

---

### Examples

Each example will have two forms:
  - the regular one
  - the annotation-based one

---

#### Basic unary example

Regular:
```jdl
entity A

readOnly A
```

Annotation-based:
```jdl
@readOnly
entity A
```

---

#### Basic binary example

Regular:
```jdl
entity A

dto A with mapstruct
```

Annotation-based:
```jdl
@dto(mapstruct)
entity A
```

---

#### all, * example

`all` and `*` are aliases.

Regular:
```jdl
entity A
entity B

dto all with mapstruct
```

Annotation-based:
```jdl
@dto(mapstruct)
entity A

@dto(mapstruct)
entity B
```

---

#### all, * example with exclusions (unary)

Regular:
```jdl
entity A
entity B

skipClient * except A
```

Annotation-based:
```jdl
entity A

@skipClient
entity B
```

---

#### all, * example with exclusions (binary)

Regular:
```jdl
entity A
entity B

dto all with mapstruct except A
```

Annotation-based:
```jdl
entity A

@dto(mapstruct)
entity B
```

---

#### Option with custom values

```jdl
entity A
entity B

microservice all with mySuperMS
```

---

#### Mixed example

Regular:
```jdl
entity A
entity B
entity C

readOnly B, C
dto * with mapstruct except C
service * with serviceClass except C
search A with elasticsearch
```

Annotation-based:
```jdl
@dto(mapstruct)
@search(elastisearch)
@service(serviceClass)
entity A

@readOnly
@dto(mapstruct)
@service(serviceClass)
entity B

@readOnly
entity C
```

---

### Available options

Here are the entity options supported in the JDL:

<table class="table table-striped table-responsive">
  <tr>
    <th>JDL option name</th>
    <th>Option type</th>
    <th>Default value</th>
    <th>Possible values</th>
    <th>Comment</th>
  </tr>
  <tr>
    <td>skipClient</td>
    <td>unary</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>skipServer</td>
    <td>unary</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>noFluentMethod</td>
    <td>unary</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>filter</td>
    <td>unary</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>readOnly</td>
    <td>unary</td>
    <td>false</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>dto</td>
    <td>binary</td>
    <td>no</td>
    <td>mapstruct, no</td>
    <td></td>
  </tr>
  <tr>
    <td>service</td>
    <td>binary</td>
    <td>no</td>
    <td>serviceClass, serviceImpl, no</td>
    <td></td>
  </tr>
  <tr>
    <td>paginate</td>
    <td>binary</td>
    <td>no</td>
    <td>pagination, infinite-scroll, pager, no</td>
    <td>pager is only available in AngularJS</td>
  </tr>
  <tr>
    <td>search</td>
    <td>binary</td>
    <td>no</td>
    <td>elasticsearch, no</td>
    <td></td>
  </tr>
  <tr>
    <td>microservice</td>
    <td>binary</td>
    <td></td>
    <td>custom value</td>
    <td></td>
  </tr>
  <tr>
    <td>angularSuffix</td>
    <td>binary</td>
    <td></td>
    <td>custom value</td>
    <td></td>
  </tr>
  <tr>
    <td>clientRootFolder</td>
    <td>binary</td>
    <td></td>
    <td>custom value</td>
    <td></td>
  </tr>
</table>
