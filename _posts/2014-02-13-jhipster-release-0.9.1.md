---
layout: default
title: Release 0.9.1
---

JHipster release 0.9.1
==================

*JHipster gives you Yeoman + Maven + Spring + AngularJS all working together in one handy generator.*

What's new
----------

* Our "hot reload" features are getting better and better: we now support hot reloading Spring Beans (in *most* cases) as well as Jackson beans (the Jackson serializer and deserializer caches get flushed on reload). We are now focusing on hot reloading JPA entities.
* We have upgraded to the latest Spring Boot 1.0.0.RC2. This causes a [warning when running the executable WAR](https://github.com/spring-projects/spring-boot/issues/348)
* We updated the generator dependencies version, as we had some issues running the generator on Mac OS X

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