---
layout: default
title: Release 2.11.0
---

JHipster release 2.11.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

What's new
----------

This new release comes with many small bug fixes, and one big new feature: we now have official [Heroku](https://www.heroku.com/home) support, provided by [Joe Kutner](https://twitter.com/codefinger) from Heroku.

Joe also did an [Heroku official sample application](https://github.com/kissaten/jhipster-example) and updated [our documentation](http://jhipster.github.io/heroku.html) accordingly!

We just keep the **beta** tag on this sub-generator for this release, the time for us to have some external feedback, and then we will remove it.

And as always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.11.0+is%3Aclosed)__.

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
