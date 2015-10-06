---
layout: default
title: Release 2.22.0
---

JHipster release 2.22.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

What's new
----------

## Breaking change: tables names are now lower-case

Issue [#2018](https://github.com/jhipster/generator-jhipster/issues/2018) is a problem using MySQL (our most popular database option, 67% of all production builds last month!) on Linux, as our tables were case-sensitive.

Thankfully we had a very good bug report (to everyone submitting incomplete bug reports: please use our [guidelines](https://github.com/jhipster/generator-jhipster/blob/master/CONTRIBUTING.md#submit)!), we have decided to make all our table names lower-case. This means changing their configuration in JPA as well as in Liquibase.

This is a breaking change for existing applications, but if you didn't have the problem, you can safely ignore this.

## Breaking change: YAML configuration

Our YAML configuration files have been cleaned up, so they:

- use the correct Spring Boot property names
- use the 'jhipster' prefix when they are specific to JHipster
- are much better documented

## Cool new feature: type-safe Spring Boot configuration

As our YAML configuration files have been cleaned up, we were able to add the new `JHipsterProperties` class in the `conf` package, which allows to have type-safe usage of the JHipster specific properties (the ones using the 'jhipster' prefix from the previous point).

This should also allow you to have automatic completion of the JHipster properties in your IDE, although this only seems to work on STS and not on Intellij IDEA.

## Cool new feature: Docker Compose

[Pascal Grimaud](https://twitter.com/pascalgrimaud) has added support for [Docker Compose](https://docs.docker.com/compose/), which should be of great help for setting up both development and production environments.

Our [documentation page]({{ site.url }}/docker_compose.html) is already available so you can start using this new feature straight away, but as this is very new it still has the __BETA__ tag, and we are awaiting your feedback.

## Cool new feature: Liquibase async start-up

In development mode, Liquibase will now start asynchronously, in a different thread than the main application. This should make your application start a lot faster, up to 40% on our test systems.

This is definitely cool, but of course you can have an edge case when your application has started but the database isn't fully updated yet. In our experience, this isn't very annoying (and you will have a log message to warn you), but please send feedback if you notice any issue!

Once this feature is ironed out, we will continue to improve Liquibase start-up: we will add options to remove locks, disable it on some conditions, etc.

## Java 7 deprecation!

As Java 7 usage has been steadily declining during the last months, and is now at less than 10% of the generated projects, we are deprecating it.

We will have a great work to remove all Java 7 code in the near future, which should allow us to:

- Clean up our code, and probably even improve the Java 8 code
- Migrate to the new date/time API, which everybody seems to be waiting for

Closed tickets
------------

As always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.22.0+is%3Aclosed)__.

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

You can also update your entities by running again the entity sub-generator, for example if your entity is named _Foo_

```
yo jhipster:entity Foo
```

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Contact [@java_hipster](https://twitter.com/java_hipster) on Twitter
- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)
