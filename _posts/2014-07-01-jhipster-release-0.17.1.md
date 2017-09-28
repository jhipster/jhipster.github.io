---
layout: default
title: Release 0.17.1
---

JHipster release 0.17.1
==================

*JHipster gives you Yeoman + Maven + Spring + AngularJS all working together in one handy generator.*

What's new
----------

JHipster 0.17.1 is a bug-fixing release:

- We are having a very annoying, very hard to reproduce bug (at least [@juliendubois](https://twitter.com/juliendubois) can't reproduce it!) when generating a new entity, see [#404](https://github.com/jhipster/generator-jhipster/issues/404) for more information. Thanks for commenting the bug or notifying [@juliendubois](https://twitter.com/juliendubois) if you have the bug, and if you do NOT have the bug -> we are trying to find out which strange combinaison of node/npm/OS/whatever causes this issue. This is, of course, our top priority at the moment.
- We are migrating to Spring Boot 1.1.3 (which corrects some minor Spring Boot issues, see [the Spring blog](http://spring.io/blog/2014/06/27/spring-boot-1-1-3-available-now) for more information).

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
