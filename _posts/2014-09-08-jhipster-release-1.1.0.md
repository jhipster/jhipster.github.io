---
layout: default
title: Release 1.1.0
---

JHipster release 1.1.0
==================

*JHipster gives you Yeoman + Maven + Spring + AngularJS all working together in one handy generator.*

What's new
----------

This release comes with [several enhancements and bug fixes](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A1.1+is%3Aclosed).

Most importantly:

- We have early support for deploying a JHipster application to the cloud in one command! We currently support [Heroku]({{ site.url }}/heroku.html) and [Openshift]({{ site.url }}/openshift.html). Please give them a try, but remember, this is an early release!
- We updated the Liquibase/JPA configuration so that they now match 100%. We even run the Hibernate schema validation tool when running the tests ("mvn test"). However, this will probably break existing Liquibase configuration, or be too strict for most users: please notify us, and we will remove this check in future releases if it is too strict!


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
