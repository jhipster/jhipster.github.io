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
- We now have a usable [Docker](https://www.docker.io/) configuration, which is fully documentated on our [updated installation page](/installation/).
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

Aide et bugs
--------------

Si vous rencontrez un problème avec cette version, n'hésitez pas à :

- Contacter [@jhipster](https://twitter.com/jhipster) sur Twitter
- Ajouter un bug sur notre [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Poser une question sur [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)