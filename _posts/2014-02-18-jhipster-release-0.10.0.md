---
layout: default
title: Release 0.10.0
---

JHipster release 0.10.0
==================

*JHipster gives you Yeoman + Maven + Spring + AngularJS all working together in one handy generator.*

What's new
----------

* Thymeleaf support! For those cases when a single Web page application is not enough, we've added the Thymeleaf template engine to JHipster. Have a look at the new src/main/resources/templates/error.html file, which now serves correctly your 404 and 500 errors!
* Implementation of Spring Boot Actuator's security auditing repositories. Look for the new "security audits" section in the administration menu!
* __WARNING__ the point above has made us add some new tables and indexes! So if you re-generate your application on an existing database, you will get errors! Have a look at the changes in the db-changelog.xml file, we added 2 tables and 2 indexes. If you find this really annoying, please contact [@jhipster](https://twitter.com/jhipster) on Twitter: would you rather have a clean db-changelog.xml for your new projects, or would you rather have new changesets in your db-changelog.xml for new tables/indexes/FKs ?
* All Bower dependencies are now hard-coded in the generated bower.json file. This means we stop trusting other projects when they publish a so-called "updatable" dependency, as this has caused far too many issues. Now everybody using JHipster will have the same Bower dependencies, unless you choose to do a "bower update" yourself, of course!
* Several minor bug corrections, reformatting and improvements

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