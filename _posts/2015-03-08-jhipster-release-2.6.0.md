---
layout: default
title: Release 2.6.0
---

JHipster release 2.6.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

What's new
----------

The __big__ news is that we added validation support in JHipster!

By validation, we mean we have new options when generating an entity, that allows to configure validation for:

- HTML views, using the AngularJS validation mechanism
- Java domain objects, using Bean Validation
- Spring MVC REST controllers
- Hibernate (well, that's automatic, we didn't do anything on this one!)

Also noteworthy is that database columns are correctly generated, depending on the validation options (for a required field, its column is marked non-nullable, for example).

More information is available in our [entity sub-generator documentation](http://jhipster.github.io/creating_an_entity.html).

And as always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.6.0+is%3Aclosed)__.

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
