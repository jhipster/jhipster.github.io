---
layout: default
title: Release 4.9.0
---

JHipster release 4.9.0
==================

What's new
----------

This new release has [66 closed tickets and merged pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.9.0+is%3Aclosed), here are the most important news:

- Traefik support was added last week, see [#6397](https://github.com/jhipster/generator-jhipster/issues/6397). It is still in BETA, but adds an interesting alternative in our microservice architecture. [Full documentation on using Traefik with JHipster is available here]({{ site.url }}/traefik/).
- Major improvement on JHipster UAA: [Access/Refresh Token Handling for UAA Authentication #5752](https://github.com/jhipster/generator-jhipster/issues/5752)
- Front-end tests will now use Chromium headless, which is a huge change: [Replace PhantomJS by chromiumHeadless and puppeteer #6377](https://github.com/jhipster/generator-jhipster/pull/6377)
- The Gradle Wrapper is now using the latest Gradle 4.2 release: see [#6392](https://github.com/jhipster/generator-jhipster/pull/6392)
- Karma tests now have source maps: this will make them a bit slower, but a lot easier to debug - see [#6400](https://github.com/jhipster/generator-jhipster/pull/6400)
- Issues with our AWS sub-generator should at least be fixed thanks to [#6408](https://github.com/jhipster/generator-jhipster/pull/6408)
- A new polyfill has been added to add IE 11 support, see [#6337](https://github.com/jhipster/generator-jhipster/issues/6337)
- Upgrades to Yarn, NodeJS, NPM have been made in [#6424](https://github.com/jhipster/generator-jhipster/pull/6424)

As a result of those latest changes and bug fixes, we have removed the BETA tag on JHipster UAA and on our Kafka support option.

**Warning** Big changes in the OAuth2 support will happen in the next release, see [#6361](https://github.com/jhipster/generator-jhipster/pull/6361):

- We will migrate from our current home-made OAuth2 support (based on Spring Security OAuth2) to use OpenID Connect
- As a result, JHipster will work with OpenID Connect providers like [Keycloak](http://www.keycloak.org/) or [Okta](https://www.okta.com)
- This will remove a lot of code, and provide better quality and features
- As the current OAuth2 code is used by less than 1% of projects, we feel that this change will not affect many people

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.9.0+is%3Aclosed)__.

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
