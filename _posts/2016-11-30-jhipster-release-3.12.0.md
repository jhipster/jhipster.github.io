---
layout: default
title: Release 3.12.0
---

JHipster release 3.12.0
==================

What's new
----------

111 closed tickets and merged PRs in this release!

The biggest news is a complete update of our Hibernate/Liquibase/Ehcache/Hazelcast code. The most incredible thing is that most of the work was done by Software AG, the company making Ehcache, with some help from people from Hazelcast and Liquibase. That's a lot of companies helping JHipster, working together (when they can be competitors outside), and giving us code directly from the core developers of each project!

Here are some details on this update:

- We now support Hibernate 5.2, which has a lot of improvements and new features over our old Hibernate 4 support
- This forced us to upgrade Liquibase, in fact support for Hibernate 5 in Liquibase was done for us!!
- This allowed us to upgrade to Ehcache 3, the new version of Ehcache
- This also triggered an upgrade in our Hazelcast code
- Most of the work was done in [#4454](https://github.com/jhipster/generator-jhipster/pull/4454) by [Henri Tremblay](https://twitter.com/henri_tremblay).

Other important features and bug fixes are:

- Upgrade Spring Cloud to Brixton SR7 [#4576](https://github.com/jhipster/generator-jhipster/pull/4576)
- Upgrade to Hibernate Validator 5.3.3.Final [#4541](https://github.com/jhipster/generator-jhipster/pull/4541)
- Upgrade to MapStruct 1.1.0.Final [#4539](https://github.com/jhipster/generator-jhipster/pull/4539)
- Remove jhipster from the URL under the management part [#4477](https://github.com/jhipster/generator-jhipster/pull/4477)
- Vietnamese [#4486](https://github.com/jhipster/generator-jhipster/pull/4486) and Serbian [#4572](https://github.com/jhipster/generator-jhipster/pull/4572) languages support
- Only use the JHipsterProperties to generate the baseURL for sending emails [#4507](https://github.com/jhipster/generator-jhipster/issues/4507)
- Get microservice alert and error headers from gateway [#4522](https://github.com/jhipster/generator-jhipster/pull/4522)
- Jenkinsfile: report tests results [#4484](https://github.com/jhipster/generator-jhipster/pull/4484)
- Search thrash button doesn't show when entity doesn't have pagination [#4480](https://github.com/jhipster/generator-jhipster/issues/4480)
- Support for long file names on Windows with Gradle - [#4323](https://github.com/jhipster/generator-jhipster/issues/4323)


Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.12.0+is%3Aclosed)__.

How to upgrade
------------

For an automatic upgrade, starting with JHipster v3.4.0, use the [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) on an existing application:

```
yo jhipster:upgrade
```

For a manual upgrade, first upgrade your version of JHipster with:

```
npm update -g generator-jhipster
```

If you have an existing project, it will still use the JHipster version with which it was generated.
To upgrade your project, you must first delete its `node_modules` folder and then run:

```
yo jhipster
```

You can also update your project and all its entities by running

```
yo jhipster --with-entities
```

You can also update your entities one-by-one by running again the entity sub-generator, for example if your entity is named _Foo_

```
yo jhipster:entity Foo
```

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

If the issue you have is an urgent bug or security issue, please:

- Contact [@java_hipster](https://twitter.com/java_hipster) on Twitter
