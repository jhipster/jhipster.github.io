---
layout: default
title: Release 7.9.2
---

# JHipster release v7.9.1 & v7.9.2

This is the new patch release of JHipster v7 with [20 closed tickets and merged pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A7.9.1+is%3Aclosed). This release addresses the [issue with file permissions for `mvnw`, `gradlew` and `npmw`](https://github.com/jhipster/generator-jhipster/issues/19294)

## Most important new features and upgrades

- Fix Blog Url for Let's Encrypt Java JKS generation ([#19316](https://github.com/jhipster/generator-jhipster/pull/19316))
- Fix another test-integration sample ([#19305](https://github.com/jhipster/generator-jhipster/pull/19305))
- Adjust sample regex. ([#19303](https://github.com/jhipster/generator-jhipster/pull/19303))
- Sonar: Use concise character class syntax '\d' instead of '[0-9]' ([#19291](https://github.com/jhipster/generator-jhipster/pull/19291))
- Fix: replace invalid chars at fake data ([#19293](https://github.com/jhipster/generator-jhipster/pull/19293))

### 🖥️ Frontend

- [React] Switch to createroot ([#19317](https://github.com/jhipster/generator-jhipster/pull/19317))
- Many libraries upgrades

## Closed tickets and merged pull requests

As always, **[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A7.9.1+is%3Aclosed)**.

## How to upgrade

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

## Help and bugs

If you find any issue with this release, don't hesitate to:

- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

If the issue you have is an urgent bug or security issue, please:

- Contact [@jhipster](https://twitter.com/jhipster) on Twitter
