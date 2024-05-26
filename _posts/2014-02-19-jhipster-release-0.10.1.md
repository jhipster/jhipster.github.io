---
layout: default
title: Release 0.10.1
---

JHipster release 0.10.1
==================

*JHipster gives you Yeoman + Maven + Spring + AngularJS all working together in one handy generator.*

What's new
----------

This version corrects a bug when generating the application without a cache, see [#137](https://github.com/jhipster/generator-jhipster/issues/137).
One interesting side effect is that we noted that the application is much quicker to boot if no cache is used: we are of course investigating this curious result!

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