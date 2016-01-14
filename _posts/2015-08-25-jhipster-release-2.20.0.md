---
layout: default
title: Release 2.20.0
---

JHipster release 2.20.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

What's new
----------

Like last month, this new release was largely done by [the new dev team](http://jhipster.github.io/team.html), so kudos to all of you guys!

The new and noteworthy features are:

- Migration to Node-Sass instead of Compass (see [#1527](https://github.com/jhipster/generator-jhipster/issues/1527) ). This is a big breaking change for people using Compass, for more information [here is the Node Sass website](https://www.npmjs.com/package/node-sass), and of course our documentation is already updated.
- Many improvements in the AngularJS side of the entity relationships. You will see new links between entities, which will bring you a much better user experience
- Library updates (Java and JavaScript sides), including for Sonar, SpringFox and Yeoman itself ( [#1698](https://github.com/jhipster/generator-jhipster/issues/1698) )
- Corrections on the DTO option (with MapStruct), which should go out of beta in the next release
- Many, many minor bugs corrected (83 issues closed in total!)

And as always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.20.0+is%3Aclosed)__.

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
