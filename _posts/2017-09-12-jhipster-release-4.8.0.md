---
layout: default
title: Release 4.8.0
---

JHipster release 4.8.0
==================

What's new
----------

- The exception handling mechanism has been totally refactored to follow [RFC 7807](https://tools.ietf.org/html/rfc7807), using [Zalando's problem-spring-web library](https://github.com/zalando/problem-spring-web). Default error pages are also available on this site, see ["Error - problem with a message"]({{ site.url }}/problem/problem-with-message/), ["Error - parameterized"]({{ site.url }}/problem/parameterized/) and ["Error: constraint violation"]({{ site.url }}/problem/constraint-violation/). Those error pages can be customized in each application's `ErrorConstants` class. See ticket [#6328](https://github.com/jhipster/generator-jhipster/pull/6328) for more detailed information.
- There is now a Spring Cache configuration to store Spring Security users. See ticket [#6105](https://github.com/jhipster/generator-jhipster/issues/6105) for some background information. This will improve the performance of all applications using an Hibernate L2 cache (as the user is loaded by its login, and not its ID, the Hibernate L2 cache doesn't work), but can lead to a few errors if you customized this part of the code. If you encounter a `LazyInitializationException`, this is because you get a `User` instance from  Spring Cache, and not from Hibernate, hence it is not an Hibernate managed object anymore (you can solve this by re-attaching the object, or by disabling the Spring Cache configuration and going back to the older configuration).
- New features and better documentation to separate the front-end and the back-end parts of a JHipster application. See ticket [#5754](https://github.com/jhipster/generator-jhipster/issues/5754) and the ["Separating the front-end and the API server" documentation]({{ site.url }}/separating-front-end-and-api/). And don't forget you can improve the documentation by doing a PR on [jhipster/jhipster.github.io](https://github.com/jhipster/jhipster.github.io)!
- Use the new Spotify `dockerfile-maven-plugin`, see ticket [#6194](https://github.com/jhipster/generator-jhipster/issues/6194). The main issue you will encounter is that the Maven plugin is `dockerfile` and not `docker` anymore - for example, you will now build your Docker image by running `./mvnw package -Pprod dockerfile:build`. The documentation, as well as our [oh-my-zsh plugin](https://github.com/jhipster/jhipster-oh-my-zsh-plugin), have been updated.

In total, 72 tickets and PR have been closed, so there are also many minor issues which have been fixed.

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.8.0+is%3Aclosed)__.

How to upgrade
------------

**Automatic upgrade**

WARNING [this has been fixed recently](https://github.com/jhipster/generator-jhipster/pull/5966), so if you have trouble with this:

- You can still do a "manual upgrade" (see below)
- If you find anything helpful for us, please send us comments on ticket [#5883](https://github.com/jhipster/generator-jhipster/issues/5883)
- If you have time and want to help, don't hesitate to contribute on this part!

For an automatic upgrade, use the [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) on an existing application:

Upgrade your version of JHipster:

```
yarn global upgrade generator-jhipster
```

And then run the upgrade sub-generator:

```
jhipster upgrade
```

**Manual upgrades**

For a manual upgrade, first upgrade your version of JHipster with:

```
yarn global upgrade generator-jhipster
```

If you have an existing project, it will still use the JHipster version with which it was generated.
To upgrade your project, you must first delete its `node_modules` folder and then run:

```
jhipster
```

You can also update your project and all its entities by running

```
jhipster --with-entities
```

You can also update your entities one-by-one by running again the entity sub-generator, for example if your entity is named _Foo_

```
jhipster entity Foo
```

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

If the issue you have is an urgent bug or security issue, please:

- Contact [@java_hipster](https://twitter.com/java_hipster) on Twitter
