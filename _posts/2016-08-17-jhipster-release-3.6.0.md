---
layout: default
title: Release 3.6.0
---

JHipster release 3.6.0
==================

What's new
----------

This is a very big release, with some important changes (but which don't break too much code, so this isn't a major release), some incredible new features, and the usual bug fixes and upgrades. In total, this is [121 closed tickets and PRs](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.6.0+is%3Aclosed), which is  better than most commerical vendors do in the middle of August!

Important change: DTOs refactoring
------------

DTOs where refactored, see [#3175](https://github.com/jhipster/generator-jhipster/issues/3175). This also solved [Hibernate lazy-loading issues](https://github.com/jhipster/generator-jhipster/issues/3790).

Please remember that DTOs were in BETA, and are still in BETA (but should be "stable" pretty soon now), so it's normal that we modify them.

We have refactored the generated application in the following ways:

- DTOs and mappers, which were in the `web/rest` package, are now located in the `service` package. This means the service layer is the true boundary to our domain objects (which is normal, the REST layer is just a view layer), solves lazy-loading issues (as the service layer is transactional, and the Web layer shouldn't be transactional - that was an error in some parts of JHipster), and removes some awful package tangling (we had the service layer calling the Web layer - another mistake from our part!).
- We do still have some view objects in the `web/rest` package, which are not DTOs: we have decided to call them "View Models" or `vm`, which is the same naming convention that we have in AngularJS (and that other technologies use, like .NET).

In order to migrate your application:

- JHipster will not delete your old DTOs or mappers, so the migration is not forced if you don't want to do it. But you will have some duplicate objects, which isn't a good idea in the long run.
- If you want to refactor your code, two types of refactoring can occur: if your objects are real DTOs (= mapped on entities), those DTOs and their mappers must be refactored to the `service` package. If those objects are just used to send data to the view, they are just "View Models" and should be refactored to the `rest/vm` package.

Some usual questions and answers on those changes:

- JHipster only generates DTOs, not VMs. This might change in the future, of course, this is just a first release.
- You can have entities/DTOs/VMs of the same object, but that's because you have a complex model. By default JHipster just generates a REST endpoints directly using entities, but if your business cases are complex, you will find this is not enough: you will then find the need to introduce a service+DTO layer, or a view model, or both.
- You can have DTOs without a service class, and a service class without a DTO. JHipster allows you to do both, but the normal use case would be to have a DTO and a service class working together: the idea is that your service layer transforms your entities into DTOs, and applies business logic on them.

Important change: Fluent setters
------------

After much discussion, JHipster now [generates fluent setters on your entities](https://github.com/jhipster/generator-jhipster/pull/3751).

As you can check in the ticket linked above, this was validated by the Hibernate team, and we did a public vote where the choice for fluent setters was very clear.

You won't have to refactor your current application as we still generate the "normal" setters for entities, but if you re-generate your entities you will have those new "fluent" methods which should help you write a better, easier-to-read code.

Kubernetes support
-------------

This is probably our biggest new feature, [Kubernetes support has been merged](https://github.com/jhipster/generator-jhipster/pull/3747)! We already have some [initial documentation]({{ site.url }}/kubernetes/), but this is still a very early release: don't hesitate to test, submit bugs, help documenting...

New "info" sub-generator
-------------

If you need complete information on your JHipster setup, you can run the new "info" sub-generator:

    yo jhipster:info

Remember to use it when submiting a bug the project!

Upgrades
-------------

- Upgrade to Spring Boot 1.4 [#3900](https://github.com/jhipster/generator-jhipster/pull/3900), which also upgraded the project to the latest Tomcat release (and caused issue [#3995](https://github.com/jhipster/generator-jhipster/issues/3995))
- Upgrade to the latest NPM and Bower dependencies [#3888](https://github.com/jhipster/generator-jhipster/pull/3888)

Closed tickets
------------
As always, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.6.0+is%3Aclosed)__.

How to upgrade
------------

For an automatic upgrade, starting with JHipster v3.4.0, use the [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) on an existing application:

```
yo jhipster:upgrade
```

For a manual upgrade, first upgrade your version of JHipster with:

```
npm update -g generator-jhipster
```

If you have an existing project, it will still use the JHipster version with which it was generated.
To upgrade your project, you must first delete its `node_modules` folder and then run:

```
yo jhipster
```

You can also update your project and all its entities by running

```
yo jhipster --with-entities
```

You can also update your entities one-by-one by running again the entity sub-generator, for example if your entity is named _Foo_

```
yo jhipster:entity Foo
```

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

If the issue you have is an urgent bug or security issue, please:

- Contact [@java_hipster](https://twitter.com/java_hipster) on Twitter
