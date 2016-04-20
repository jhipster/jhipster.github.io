---
layout: default
title: Release 3.1.0
---

JHipster release 3.1.0
==================

What's new
----------

This is an upgrade and a bug-fix version for JHipster 3.0.0, with 161 closed tickets and PRs! Those are too long to list, here are the main changes:

- We have migrated to Spring Cloud Brixton.RC1 (yes, RC2 was released yesterday, that will be in the next release)
- JHipster Registry 1.1.0 has been released to match Spring Cloud Brixton.RC1, and has an easier configuration for JWT as well as some bug corrections
- JHipster Console 1.1.0 has also been released to match Spring Cloud Brixton.RC1, with some new and improved dashboards
- The Heroku sub-generator has had many improvements, in particular if you use it with the JHipster Registry
- Many small UI improvements and bug corrections

Closed tickets
------------
As always, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.1.0+is%3Aclosed)__.

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

You can also update your project and all its entities by running

```
yo jhipster --with-entities
```

You can also update your entities by running again the entity sub-generator, for example if your entity is named _Foo_

```
yo jhipster:entity Foo
```

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

If the issue you have is an urgent bug or security issue, please:

- Contact [@java_hipster](https://twitter.com/java_hipster) on Twitter
