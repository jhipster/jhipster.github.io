---
layout: default
title: Release 0.9.0
---

JHipster release 0.9.0
==================

*JHipster gives you Yeoman + Maven + Spring + AngularJS all working together in one handy generator.*

What's new
----------

- Full "hot reload" of Java classes is working a lot better, thanks to [@andy_clement](https://twitter.com/andy_clement) who corrected our issues. However, we still have an annoying [bug](https://github.com/spring-projects/spring-loaded/issues/39)
- [@JeromeMirc](https://twitter.com/JeromeMirc) added a default second user, and greatly improved the way we manage user authorizations
- We greatly improved the generated WAR files, especially for using them in production
- We updated to the latest Spring 4.0.1 version, which corrects a number of issues. If you had issues with wrong stacktraces with *org.springframework.scheduling.annotation.SchedulingConfiguration.setBeanFactory*, that should now be solved
- The whole documentation has been updated to reflect those changes

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
