---
layout: default
title: Release 0.8.0
---

JHipster release 0.8.0
==================

*JHipster gives you Yeoman + Maven + Spring + AngularJS all working together in one handy generator.*

What's new
----------

This is our biggest release ever.

We have migrated everything to use [Spring Boot](http://projects.spring.io/spring-boot/) instead of "normal" Spring. This has caused a big number of changes:

- To run the application you can either run the "Application" class from your IDE, or execute "mvn spring-boot:run". This runs Tomcat behind-the-scenes.
- The configuration Java package has been renamed from "conf" to "config"
- The configuration property files are now in Yaml format
- The liquibase configuration is now in the src/main/resources/config/liquibase directory

And of course we updated all libraries to their latest versions!

As Spring Boot is really new, we expect you have a few questions about this upgrade:

### What's good?

- Running the application from an IDE without Maven. It's faster (no need to launch Maven) and it's easier to run with a debugger
- Less lines of configuration. It's complicated to compare as we also improved a lot of things, but we probably gained 200-300 lines of code
- The Yaml configuration is much more easy to read and use
- Spring Boot Actuator gives us a lot of new features, we plan to use more of them in the next releases

### What's bad?

- We lose 2 seconds at start-up with Tomcat (no problem with Jetty): this looks like an issue with Tomcat, when no web.xml file exists


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

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Contact [@java_hipster](https://twitter.com/java_hipster) on Twitter
- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)
