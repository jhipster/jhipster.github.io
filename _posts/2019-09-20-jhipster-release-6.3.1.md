---
layout: default
title: Release 6.3.1
---

JHipster release v6.3.1
==================

Warning, this release fixes an **important security vulnerabilities**:

- Our previous release had an important security vulnerability, please read [the v6.3.0 release notes]({{ site.url }}/2019/09/13/jhipster-release-6.3.0.html) for more information. It was announced that this vulnerability was only for users using JWT authentication: the issue is in fact wider, and affects people using session-based authentication and UAA authentication. Only people using OAuth2 authentication (with services like Keycloak or Okta) are safe. This was already fixed in the previous release, so there is nothing specific for this in this release.
- We have a [new vulnerability that affects Gradle users](https://github.com/jhipster/generator-jhipster/security/advisories/GHSA-mc84-xr9p-938r). The generated configuration file contained one Maven repository configured with HTTP, and not HTTPS, which could lead to man-in-the-middle attacks when doing a build. You will find all information in the security advisory, but to make a long story short: you should use HTTPS both in your Maven and Gradle build files.

**What's new in this release**

This release closes [48 tickets and pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.3.1+is%3Aclosed). It's a patch release, so those are mostly library upgrades, bug fixes, as well as a number of smaller feature enhancements.

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.3.1+is%3Aclosed)__.

How to upgrade
------------

**Automatic upgrade**

For an automatic upgrade, use the [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) on an existing application:

Upgrade your version of JHipster:

```
npm update -g generator-jhipster
```

And then run the upgrade sub-generator:

```
jhipster upgrade
```

**Manual upgrades**

For a manual upgrade, first upgrade your version of JHipster with:

```
npm update -g generator-jhipster
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
