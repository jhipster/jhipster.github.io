---
layout: default
title: Release 0.3.0
---

JHipster release 0.3.0
==================

*JHipster gives you Yeoman + Maven + Spring + AngularJS all working together in one handy generator.*

What's new
----------

- JDK 7 is now a required minimum (if you use JDK 6, don't call yourself a hipster!)
- Spring configuration is now XML-less! The only XML configuration file we have left belongs to Spring Security. We need to wait until the next version of Spring Security to replace this file.
- The connection pool has changed: we now use [HikariCP](https://github.com/brettwooldridge/HikariCP)
- For users who have chosen to use Spring 4, updated the application to Spring 4.0.0.RC2


How to upgrade
------------

Update your version of JHipster with:

```
npm update -g generator-jhipster
```

You can suppress the now useless XML files:

- src/main/resources/META-INF/persistence.xml
- src/main/resources/META-INF/spring/applicationContext-database.xml
- src/test/resources/META-INF/spring/applicationContext-database.xml

And then you can update your project when you run again

```
yo jhipster
```

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Contact [@java_hipster](https://twitter.com/java_hipster) on Twitter
- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
