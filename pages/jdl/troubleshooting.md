---
layout: default
title: JHipster Domain Language - Troubleshooting
permalink: /jdl/troubleshooting
sitemap:
    priority: 0.5
    lastmod: 2019-10-27T12:00:00-00:00
---

# <i class="fa fa-star"></i> JHipster Domain Language (JDL)

## Troubleshooting

We tried to keep the syntax as friendly as we can for developers.
You can do these things with it:
  - Declare applications with their options and entities,
  - Declare entities with their attributes,
  - Declare the relationships between them,
  - And declare some JHipster specific options.

If you wish to view the JDL's grammar, there is an HTML file available
[here](https://github.com/jhipster/jhipster-core/blob/master/lib/dsl/gen/grammar.html).

---

### The JDL import only finds one entity when matching MS baseName

This is a known issue regarding the parsing system and fixing it is tricky.
A workaround is to use different names for the microservice and the entities inside.

See [JHipster Core issue #308](https://github.com/jhipster/jhipster-core/issues/308) for more information.

---

## <a name="issues"></a>Issues and bugs

The JDL is [available on GitHub](https://github.com/jhipster/jhipster-core), and follows the same
[contributing guidelines as JHipster]( https://github.com/jhipster/generator-jhipster/blob/master/CONTRIBUTING.md).

Please use our project for submitting issues and Pull Requests concerning the library itself.

- [JDL issue tracker](https://github.com/jhipster/jhipster-core/issues)
- [JDL Pull Requests](https://github.com/jhipster/jhipster-core/pulls)

When submitting anything, you must be as precise as possible:  
  - **One posted issue must only have one problem** (or one demand/question);  
  - Pull requests are welcome, but the commits must be 'atomic' to really be understandable.  
