---
layout: default
title: Release 2.23.0
---

JHipster release 2.23.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

What's new
----------

This is a **huge** release, with 95 closed tickets, and a lot of code changed, be warned!

## We have moved to Spring Boot 1.3.0.RC1

- A lot of code has been removed as it's now included in Spring Boot
- We have followed the [Spring Boot 1.3 migration guide](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-1.3.0-RC1-Release-Notes), so if you are upgrading from an older JHipster version, it's a good idea to have a look at it, in order to understand what we did
- Spring Boot devtools are now running by default in "dev" mode: you now have hot-reload of your application (without restarting the JVM). This is an incredible improvement, as you will quickly notice!

## We have removed Java 7

This is following last release's deprecation of Java 7.

This allowed us to remove Joda Time and use instead Java 8's new Date and Time API.

## Social login

A long-awaited addition is the possibility to use "social login", such as Google, Facebook or Twitter.

## H2 disk-based support

You can now use H2's disk-persistence mechanism. This is not yet fully working with Windows and with liquibase-hibernate, but this is a good step forward.

## BDD support

Initial support for Behavior-driven development using Cucumber is now available at application generation.

Closed tickets
------------

As always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.23.0+is%3Aclosed)__.

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
