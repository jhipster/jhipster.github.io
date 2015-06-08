---
layout: default
title: Using Oracle
sitemap:
priority: 0.7
lastmod: 2015-06-08T18:40:00-00:00
---

# <i class="icon-archive"></i> Using Oracle

When using JPA, you have the option to use the Oracle database.

As Oracle is a proprietary database, we cannot give it the same level of support that we do for our other options:

- Its driver is proprietary, so we cannot bundle it with JHipster
- We cannot give it the same level of test, as it is not available on Mac OS X (the final JHipster builds and tests are made on a Macbook Pro)

When using Oracle with JHipster, you will need to install the Oracle JDBC driver manually:

- Download the driver (ojdbc7.jar) from the Oracle website
- Copy it to your application's `lib/oracle/ojdbc/7/` folder
- You will need to rename your driver, from `ojdbc7.jar` to `ojdbc-7.jar`, in order to follow Maven's naming conventions.
