---
layout: default
title: Release 0.7.0
---

JHipster release 0.7.0
==================

*JHipster gives you Yeoman + Maven + Spring + AngularJS all working together in one handy generator.*

What's new
----------

- JHipster now supports Websocket, for the new "real-time Web", thanks to the great [Atmosphere framework](http://async-io.org/). After studying carefully both Atmosphere and the new Spring Websocket support, we found Atmosphere to be a better tool for our needs. But of course, if you disagree, there is still the possibility to make this an option in the Yeoman generator.
- We now have a usable [Docker](https://www.docker.io/) configuration, which is fully documentated on our [updated installation page](/installation.html).
- We updated all Maven/NPM/Bower dependencies, so that your generated application stays on the cutting edge!

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
