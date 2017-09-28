---
layout: default
title: Release 3.2.0
---

JHipster release 3.2.0
==================

What's new
----------

This is an upgrade and a bug-fix version for JHipster 3.1.0, with some major new features, so we recommend you read the following most important changes:

- Migrated from [maven-yeoman-plugin](https://github.com/trecloux/yeoman-maven-plugin) to [frontend-maven-plugin](https://github.com/eirslett/frontend-maven-plugin) for the Maven build: this new plugin is far more popular and provides a lot more options, but works a little bit differently, so feedback is highly welcome!
- New JHipster Registry v2.0.0 release! This is a major new release, with a brand new UI, we're waiting for your feedback on it! There is one breaking change: it is now secured, so now you will need to log in to use it, using the usual default admin/admin user.
- Spring Boot Actuator endpoints are now secured behind the new "/management" URL prefix. This makes it easier to secure them, but if you rely on those URLs, you will need to update your code.
- Migration from [Mongeez](https://github.com/mongeez/mongeez) to [Mongobee](https://github.com/mongobee/mongobee) for MongoDB: now you can use MongoDB on Heroku and Cloud Foundry!
- Migration from [gulp wiredep](https://github.com/taptapship/wiredep) to [gulp inject](https://github.com/klei/gulp-inject) for bower dependency injection, checkout the generated gulpfile!
- Migration to Spring Cloud Brixton.RC2
- A new [BETA] option to generate a dedicated UAA server for microservices, so you can already try using OAuth2 with microservices!
- Support for required validation for relationships
- New Blob support for Cassandra
- JHipster Console v1.2.0 released, with some bug fixes for alerting
- Many small UI improvements and bug corrections

Closed tickets
------------
As always, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.2.0+is%3Aclosed)__.

How to upgrade
------------

Update your version of JHipster with:

```
npm update -g generator-jhipster
```

And then you can update your project when you run again

```
yo jhipster
```

You can also update your project and all its entities by running

```
yo jhipster --with-entities
```

You can also update your entities by running again the entity sub-generator, for example if your entity is named _Foo_

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
