---
layout: default
title: Release 5.3.2
---

JHipster release v5.3.2
==================

JHipster v5.3.2 is a patch release, with [134 tickets and pull requests closed](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.3.2+is%3Aclosed), so if you had any bugs in JHipster v5.3.1, this update will hopefully solve them!

This release is the first one where we used extensively our [bug bounty program](https://www.jhipster.tech/bug-bounties/), and this worked remarquably well, with [$1,100 in paid bounties](https://github.com/jhipster/generator-jhipster/issues?q=is%3Aissue+milestone%3A5.3.2+is%3Aclosed+label%3A%24100) - and which also explains why this release has so many fixed bugs! As this has been a great success, we will continue to push this program forward: if you or your company benefit from JHipster, please consider [sponsoring the project](https://www.jhipster.tech/sponsors/), as the sponsor money fuels the bug bounty program.

Here are the most important bug fixes and enhancements from this release:

- Full microservice stack generation using import-jdl [#8335](https://github.com/jhipster/generator-jhipster/pull/8335/)
- Add a TLS profile (back and front) to run the development server in HTTPS [#8138](https://github.com/jhipster/generator-jhipster/pull/8138)
- Angular: Use Mocha+Chai for end to end tests [#8197](https://github.com/jhipster/generator-jhipster/pull/8197)
- Remove non-free and unused dependency to org.json:json [#8206](https://github.com/jhipster/generator-jhipster/issues/8206)
- Heroku: move Liquibase migrations to release phase [#8229](https://github.com/jhipster/generator-jhipster/pull/8229)
- New languages: Bengali [#8255](https://github.com/jhipster/generator-jhipster/pull/8255) and Myanmar [#8317](https://github.com/jhipster/generator-jhipster/pull/8317)
- Update spring-boot to 2.0.5 and dependencies [#8273](https://github.com/jhipster/generator-jhipster/pull/8273)

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.3.2+is%3Aclosed)__.

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
