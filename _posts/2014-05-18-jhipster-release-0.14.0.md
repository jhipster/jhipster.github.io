---
layout: default
title: Release 0.14.0
---

JHipster release 0.14.0
==================

*JHipster gives you Yeoman + Maven + Spring + AngularJS all working together in one handy generator.*

What's new
----------

JHipster 0.14.0 has an incredibly huge number of new features, thanks to our very active community which has provided a lot of pull requests.

You can find the complete list of closed tickets and PR [here](https://github.com/jhipster/generator-jhipster/issues?milestone=3&page=1&state=closed)

Most importantly, we have:

- MongoDB support! If you don't like SQL databases or JPA, you can have a full NoSQL application.
- OAuth2 support, which allows us to have stateless webapps.
- Gulp.js support, as an optional replacement to Grunt.js. It basically does the same, but its configuration file is smaller and easier to learn. And of course it's supposed to be cooler.
- Increased support for Java 8: this support should now be complete, if you are interested in the new Java 8 features you should definitely have a look at what we provide. Unfortunately Java 8 is still not very well supported by Spring Loaded (we have some causes where lambdas cause the hot reloading to fail), so it is not yet our default Java version. Expect it to be our default version in the near future.
- Russian translation
- Many bug fixes and small improvements

The number of questions asked by the generator has thus increased, and we have a huge number of possible outputs depending on your choices. Hopefully all of them will work :-)

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
