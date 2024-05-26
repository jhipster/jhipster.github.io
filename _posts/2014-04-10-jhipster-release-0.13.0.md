---
layout: default
title: Release 0.13.0
---

JHipster release 0.13.0
==================

*JHipster gives you Yeoman + Maven + Spring + AngularJS all working together in one handy generator.*

What's new
----------

JHipster 0.13.0 comes with a lot of bug fixes and new features, which we have listed [here](https://github.com/jhipster/generator-jhipster/issues?milestone=2&page=1&state=closed).

Most importantly, we have:

- Support for Java 8
- Support for Spring Boot 1.0
- Added Swagger integration for documenting our REST interfaces
- Danish translation

Warning: it looks like in "production" mode we have an issue in the "uglify" task, that doesn't minify correctly the JavaScript files in the index.html file. It seems to depend on the "uglify" task version, if you encounter that issue please do not hesitate to contact [@juliendubois](https://twitter.com/juliendubois) who is struggling to reproduce that issue.

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