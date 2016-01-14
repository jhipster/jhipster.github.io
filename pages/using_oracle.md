---
layout: default
title: Using Oracle
sitemap:
priority: 0.7
lastmod: 2015-06-08T18:40:00-00:00
---

# <i class="fa fa-archive"></i> Using Oracle

When using JPA, you have the option to use the Oracle database.

As Oracle is a proprietary database, we cannot give it the same level of support that we do for our other options:

- Its driver is proprietary, so we cannot bundle it with JHipster
- We cannot give it the same level of test, as it is not available on Mac OS X (the final JHipster builds and tests are made on a Macbook Pro)

When using Oracle with JHipster, you will need to install the Oracle JDBC driver manually:

- Download the driver (ojdbc7.jar for Java 8) from the Oracle website
- Copy it to your application's `lib/oracle/ojdbc/7/` folder
- You will need to rename your driver, from `ojdbc7.jar` to `ojdbc-7.jar`, in order to follow Maven's naming conventions.

When using Oracle with JHipster, the following limitations will be applicable

- Entity names cannot be more than 26 characters, this is due to Oracle's 30 character limitation for object names, and we reserve 4 characters to generate primary key sequence for the generated tables.
- Entity field names cannot be more than 30 characters
- Oracle reserved keywords cannot be used as Entity names or Field names.
