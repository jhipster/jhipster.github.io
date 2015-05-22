---
layout: default
title: Release 2.12.0
---

JHipster release 2.12.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

What's new
----------

This is a bug-fixing release. The biggest changes come from those two issues:

- [#1479](https://github.com/jhipster/generator-jhipster/issues/1479): we now have a new question in the entity sub-generator so you can do two relationships between the same two entities.
- [#1468](https://github.com/jhipster/generator-jhipster/issues/1468): one-to-one mappings now have a @JsonIgnore annotation so we don't have a circular reference in our JSON views.

And as always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.12.0+is%3Aclosed)__.

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
