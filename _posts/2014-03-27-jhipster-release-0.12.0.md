---
layout: default
title: Release 0.12.0
---

JHipster release 0.12.0
==================

*JHipster gives you Yeoman + Maven + Spring + AngularJS all working together in one handy generator.*

What's new
----------

JHipster 0.12 comes with a lot of bug fixes and new features, which we have listed [here](https://github.com/jhipster/generator-jhipster/issues?milestone=1&page=1&state=closed).

Most importantly, we have now moved "JHipster-Loaded", which allows us to have hot reload of Java code, to a specific project: [https://github.com/jhipster/jhipster-loaded](https://github.com/jhipster/jhipster-loaded).

This means 3 things:

- your JHipster project has now fewer classes, 
- our Java Agent has changed, you now need to use "-javaagent:spring_loaded/springloaded-jhipster.jar -noverify -Dspringloaded=plugins=io.github.jhipster.loaded.instrument.JHipsterLoadtimeInstrumentationPlugin"
- and that you can use JHipster-Loaded in other, non-jhipster projects

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