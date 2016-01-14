---
layout: default
title: Release 2.19.0
---

JHipster release 2.19.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

What's new
----------

This is a big summer release, with a lot of bug fixes and new features.

The biggest news is that we now have an official "board of developers". Many thanks to all of the team, who made this release possible while [Julien Dubois](https://twitter.com/juliendubois) was on holidays! The [team page](/team.html) is available for more information on this subject.

The new [notification feature](http://jhipster.github.io/using_angularjs.html#notification-system) is still a bit young, but is going to help a lot of people: you now have "alerts" that alarm you when a user action is done in the entities (like creating, editing or deleting). They are also useful when an error happens during that action.

We have new data types for the entity sub-generator, for [float and double](https://github.com/jhipster/generator-jhipster/pull/1692).

We also have a new [AWS sub-generator](https://github.com/jhipster/generator-jhipster/pull/1686), with more people being ready to help us [test Amazon Beanstalk](https://github.com/jhipster/generator-jhipster/issues/1779), which is really cool.

And as always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.19.0+is%3Aclosed)__.

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
