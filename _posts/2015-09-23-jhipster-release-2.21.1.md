---
layout: default
title: Release 2.21.1
---

JHipster release 2.21.1
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

What's new
----------

This is a bug fixing release, which mainly:

- Upgrades many libraries to their latest versions: Spring Boot, BrowserSync...
- Fixes issue [#1991](https://github.com/jhipster/generator-jhipster/issues/1991) : grunt tests where failing when both OAuth2 and WebSockets where selected
- Fixes issue [#2026](https://github.com/jhipster/generator-jhipster/issues/2026) : Cassandra support was broken because of the new user management system
- Fixes issue [#2030](https://github.com/jhipster/generator-jhipster/issues/2030) : when the "no i18n" option was selected, user management was broken

And as always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.21.1+is%3Aclosed)__.

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
