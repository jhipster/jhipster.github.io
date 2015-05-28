---
layout: default
title: Release 2.13.0
---

JHipster release 2.13.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

What's new
----------

Huge news with this release, as we now have _BETA_ support for Data Transfer Objects (DTOs)!

DTO support is done with [MapStruct](http://mapstruct.org/) and is [fully documented here]({{ site.url }}/using_dtos.html). It is still considered of _BETA_ quality has it involves a lot of change in the code. As always, we follow our "release early, release often" motto, and will gather feedback during the next weeks before removing the _BETA_ tag.

Other noteworthy news are:

- Support for Liquibase contexts [#1511](https://github.com/jhipster/generator-jhipster/pull/1511)
- Cleaned up translations to use directives everywhere [#1537](https://github.com/jhipster/generator-jhipster/pull/1537)


And as always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.13.0+is%3Aclosed)__.

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
