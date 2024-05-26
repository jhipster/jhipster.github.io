---
layout: default
title: Release 0.5.0
---

JHipster release 0.5.0
==================

*JHipster gives you Yeoman + Maven + Spring + AngularJS all working together in one handy generator.*

What's new
----------

- The "entity" sub-generator is now in ready to use. A full documentation is available [here](/creating-an-entity/)
- You can now create a single executable JAR file of the application, for easy deployment. It is documented in the [production section](/production/)
- Several bug fixes and minor improvements, and updated documentation

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

As we have changed the Liquibase changeSet, to include the "HIBERNATE_SEQUENCES" table, you might need to drop your existing schema, or add this table manually.

Aide et bugs
--------------

Si vous rencontrez un problème avec cette version, n'hésitez pas à :

- Contacter [@jhipster](https://twitter.com/jhipster) sur Twitter
- Ajouter un bug sur notre [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Poser une question sur [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)ost a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)
