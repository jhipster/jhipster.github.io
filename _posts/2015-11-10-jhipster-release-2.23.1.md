---
layout: default
title: Release 2.23.1
---

JHipster release 2.23.1
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

What's new
----------

This is a bug-fix release, which solves a number of issues from version 2.23.0 and updates a few libraries.

Most important bug fixes
---------

### OAuth2 authentication

OAuth2 authentication was broken when the new Spring Boot 1.3.0 devtools were selected (issue [#2291](https://github.com/jhipster/generator-jhipster/issues/2291)). So we have removed, for the moment, our `CustomUserDetails` class, which was causing the issue: discussion is still under way on how we will solve this in the long term.

### CloudFoundry deployment

Deployment to CloudFoundry was broken (issue [#2225](https://github.com/jhipster/generator-jhipster/issues/2225)), as there is an incompatibility between Spring Boot 1.3.0 and CloudFoundry (see the CloudFoundry issue [here](https://github.com/cloudfoundry/cli/issues/411)). For the moment we have removed the "executable" flag on our generated WAR files, and have updated the documentation accordingly (you can't run the WAR files directly with `./my_application.war`, you need to do `java -jar my_application.war`instead).

### Wrong HTTP cache headers in production

Our HTTP cache headers where wrong in production (issue [#2239](https://github.com/jhipster/generator-jhipster/issues/2239)). We have corrected then, and have now excellent performance in production back again!

Closed tickets
------------

As always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.23.1+is%3Aclosed)__.

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
