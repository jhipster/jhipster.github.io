---
layout: default
title: Release 2.21.0
---

JHipster release 2.21.0
==================

*JHipster gives you Spring Boot + AngularJS working together in one handy Yeoman generator.*

What's new
----------

__Great new feature: the user management page__

Our coolest new feature is the new user management page. In the admin menu, you now have a new entry, and this new page allows you to see the current users, manage their settings, change their login, enable/disable them, and manage their authorities.

This was requested by a lot of people, we hope you will enjoy it!

Some improvements will need to be added in the future, like:

- Adding and deleting users
- Managing authorities (they are currently hard-coded)

__WARNING, breaking change 1: table names are now in SNAKE_CASE__

The SQL table names generated now follows the default Spring naming strategy i.e, `SNAKE_CASE` instead of all `UPPERCASE` names. We have also made `SpringNamingStrategy` as the Hibernate default.

This means more readable table and relationship names. The change applies to foreign key names and many-to-many mapping tables as well.

For Oracle users we have some workaround to overcome the table name length restrictions (what, your database can't handle more than 30 characters?). We now shorten the mapping table names and add the suffix `_mapping` for long entity names.

For existing users you may want to take note of those tips:

* For new entities without any relationship to your old entities this
should work without any issue
* For your existing entities you may want to change the foreign key column
names to the new snake case name
* If your new entity has a relationship to an old entity you may want to
manually update the old entity table name in the entity Java file,
Liquibase changelog and of course in the database.

__WARNING, breaking change 2: Spring Security's authorizations__

For historic reasons we had a mix of `authorities` and `roles` when naming Spring Security's authorities. For example, in the back-end we mostly had `authorities` (and sometimes `roles`), and in the front-end we had `roles`.

This lead to many questions and confusion, of course. And this needed to be refactored for our cool new user management page.

So from now on, `authorities` are called `authorities` everywhere.

If you have some existing code, you need to be careful in migrating your AngularJS routers, as their state used to have a `data.roles` attribute which is now `data.authorities`. This would lead to have some unsecured AngularJS views, but remember those are just the views: the REST endpoints are still correct (and compiled!), so the worst use-case is just a user who could see an unsecured page, but could not access any data (so the page will be empty).

__Roadmap__

In October we hope to be able to move to Spring Boot 1.3, which is close to being stable. The new dev tools should be a great addition to what we currently provide, so we are expecting a much enhanced development workflow.

__Closed tickets__

We had nearly 50 tickets closed in this release, so a lot of bugs have been fixed, and many smaller enhancements have been added.

As always, __[you can check all the closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A2.21.0+is%3Aclosed)__.

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

You can also update your entities by running again the entity sub-generator, for example if your entity is named _Foo_

```
yo jhipster:entity Foo
```

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Contact [@java_hipster](https://twitter.com/java_hipster) on Twitter
- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)
