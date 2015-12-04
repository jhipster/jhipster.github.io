---
layout: default
title: Release 2.25.0
---

JHipster release 2.25.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

What's new
----------

### JHipster "needles"

People following our development efforts know that we are preparing a "module" system. Modules will be external Yeoman generators, that anybody can create, and that will have access to the JHipster variables and functions.

This will allow anyone to create his own "sub-generator", like those provided by the JHipster team.

This forces us to update and clarify our API, and for this we needed to update our "needles": there are currently only 6 needles in JHipster (but more will come), and they allow the generator to add lines of code in certain parts of a generated project.

We have updated those needles, so they are now called something like "jhipster-needle-001" with some comment next to it. To update you current project, you will need to run your updated generator and replace your old needles by the new ones, as prompted by the generator.

### User creation and deletion in the user management view

Pull Request [#2385](https://github.com/jhipster/generator-jhipster/pull/2385) improves the user management screen, so you can now create and delete users directly from this screen.

### Protractor tests

Initial support for [Protractor](https://github.com/angular/protractor) has been added as a non-default option in the main generator.

### Entities sorting

Pull Request [#2314](https://github.com/jhipster/generator-jhipster/pull/2314) adds the possibility to sort each paginated entity tables, on each of its attributes. Pagination and sorting are done on the server-side, so they work correctly when you have a lot of data.

### UI Bootstrap pagination

Thanks to Pull Request [#2402](https://github.com/jhipster/generator-jhipster/pull/2402) entity pagination is now done with UI Bootstrap, and not with a custom generated code.

### Optional service layer for entities

When generating an entity, a new question is now available, which will ask you if you want to generate a specific service layer between your repository and Web layers. This is for advanced usage, when your controller will do more than just querying one entity.

### Improved logging

Logging now inherits the Spring Boot default logging configuration, so it looks much better.

Closed tickets
------------

As always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.25.0+is%3Aclosed)__.

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
