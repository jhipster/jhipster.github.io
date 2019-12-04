---
layout: default
title: Using Oracle
permalink: /using-oracle/
redirect_from:
  - /using_oracle.html
sitemap:
    priority: 0.7
    lastmod: 2015-06-08T18:40:00-00:00
---

# <i class="fa fa-database"></i> Using Oracle

When using JPA, you have the option to use the Oracle database.

_This option is only supported with Oracle 12c and upwards._

When using Oracle with JHipster, the following limitations will be applicable

- Entity names cannot be more than 26 characters, this is due to Oracle's 30 character limitation for object names, and we reserve 4 characters to generate primary key sequence for the generated tables.
- Entity field names cannot be more than 30 characters.
- When doing relationships, foreign key names cannot be more than 30 characters, so they will be truncated if they are too long.
- When doing many-to-many relationships, the join table name will follow the JPA specification (in the form "firstTable_secondTable"): if it is more than 30 characters long, it will be truncated.
- Oracle reserved keywords cannot be used as Entity names or Field names.
- We do not provide an Oracle database Docker image, like we do for other databases, as Oracle does not allow to have public Docker images.
