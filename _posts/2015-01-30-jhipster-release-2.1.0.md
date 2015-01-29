---
layout: default
title: Release 2.1.0
---

JHipster release 2.1.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

What's new
----------

Our v2.0.0 has been a great success, with only very minor bugs, that's why we are releasing a v2.1.0 version with some cool new features.

The most important parts concern the security:

- We have a new "token" security mechanism, that is stateless and does not require a data store. This is a specific JHipster mechanism, close to what you will find in the node.js community.
- If you use the more classical "session" security, which is the default Spring Security mechanism, we now have a successful CSRF protection. This is quite unique, as most people think that as both Spring Security and AngularJS provide CSRF protection, they should be safe. In fact, as both technologies don't use the same tokens, it just doesn't work! This has been a very complex work.
- As all this is quite complicated, we now have a new documentation page explaning our security options

__WARNING__ As our security mechanisms have changed, your .yo-rc.json files need to be changed! The "authenticationType" property is now different, and you need to upgrade it: the easiest way is to delete it and answer the questions again.

Concerning our roadmap, we hope to have soon a working Cassandra implementation. This should be a very interesting option!

And as always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.1.0+is%3Aclosed)__.

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

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Contact [@java_hipster](https://twitter.com/java_hipster) on Twitter
- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)
