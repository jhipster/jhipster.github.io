---
layout: default
title: Release 0.6.0
---

JHipster release 0.6.0
==================

*JHipster gives you Yeoman + Maven + Spring + AngularJS all working together in one handy generator.*

What's new
----------

- Upgrade to Spring Security 3.2, and moved the Spring Security configuration from XML to Java Config thanks to the great work of [Jerome Mirc](https://twitter.com/JeromeMirc)
- The whole Spring Configuration is now XML-less. The last XML configuration file is web.xml (Java EE always loved XML!!).
- We have a new "service" sub-generator, for generating business services. You can find its new and up-to-date documentation [here]({{ site.url }}/creating_a_service.html).

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
