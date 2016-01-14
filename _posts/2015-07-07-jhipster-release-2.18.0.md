---
layout: default
title: Release 2.18.0
---

JHipster release 2.18.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

What's new
----------

Lots of new features and bug fixes in this new release!

Our biggest news is the new AngularJS code for our entities, thanks to [gzsombor](https://github.com/gzsombor) in PR  [#1372](https://github.com/jhipster/generator-jhipster/pull/1372)). Entities have now an easier-to-read code and better URLs. This can of course still be improved, don't hesitate to send us feedback!

One long-standing and really annoying issue with Jadira (see [#1626](https://github.com/jhipster/generator-jhipster/issues/1626)) is finally fixed: many thanks to [@chrisphe](https://twitter.com/chrisphe), the Jadira lead developer, who did the 4.0.0.GA release just for us, only a few hours after we asked it on Twitter!

We upgraded to Swagger 2, now called "SpringFox", see [#1508](https://github.com/jhipster/generator-jhipster/issues/1508), and this allowed us to solve another long-standing issue with date handling in swagger, see [#1515](https://github.com/jhipster/generator-jhipster/issues/1515).

Last but not least, we also upgraded to Spring Boot 1.2.5 (highly recommended upgrade as there is a security fix), Cassandra 2.1.7 (which fixes also a number of bugs) and Gatling 2.1.6.

And as always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.18.0+is%3Aclosed)__.

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
