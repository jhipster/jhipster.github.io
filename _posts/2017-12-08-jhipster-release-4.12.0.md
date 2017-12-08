---
layout: default
title: Release 4.12.0
---

JHipster release 4.12.0
==================

What's new
----------

This is a huge release, with 105 closed tickets and bug requests (yes, the last 2 weeks have been pretty busy for the team!).

Here are the most important ones:

- Angular 5 support [#6789](https://github.com/jhipster/generator-jhipster/pull/6789)
- MongoDB users can now use the Elasticsearch option, like JPA users [#6595](https://github.com/jhipster/generator-jhipster/pull/6595)
- Gateways secured with OpenID Connect can now be generated without any database [#6763](https://github.com/jhipster/generator-jhipster/issues/6763)
- Several server-side libraries upgrades, including Spring Boot 1.5.9 [#6782](https://github.com/jhipster/generator-jhipster/pull/6782)

As announced in the previous release, React support is still under development: use the `--experimental` flag when running JHipster to enable the React option. Warning, this is not finished yet! Your contributions are of course welcome.

OpenCollective
----------

We have opened an [OpenCollective account](https://opencollective.com/generator-jhipster). If you find the project helpful, or if your company benefits from it, please consider becoming a backer or a sponsor.

This is very important to keep the project growing.

JHipster Online
----------

[JHipster Online](https://start.jhipster.tech) has a new release, which supports Continuous Deployment. You can now generate your application, design your entities, and test everything, all from a nice Web user interface.

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.12.0+is%3Aclosed)__.

How to upgrade
------------

**Automatic upgrade**

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
