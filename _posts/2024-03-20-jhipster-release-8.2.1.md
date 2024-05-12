---
layout: default
title: Release 8.2.1
---

# JHipster release v8.2.1

This is our minor release for JHipster v8. Please note that 8.2.1 is a patch release for 8.2.0, as 8.2.0 is deprecated due to a compilation error bug.

It includes [1104 closed issues and pull requests on the main project](https://github.com/jhipster/generator-jhipster/issues?q=is:closed+milestone:8.2.1) after the 8.1.0 release.

## What's new?

### :computer: Frontend

- Upgrade to Prettier 3.2.4
- [Angular] Upgrade to Angular 17.1.0
- [Angular] Use Signals [#24875](https://github.com/jhipster/generator-jhipster/pull/24875)
- [Vue] Switch Vite to ESM build [#24759](https://github.com/jhipster/generator-jhipster/pull/24759)
- [Vue] Upgrade to Vue 3.4 [#24728](https://github.com/jhipster/generator-jhipster/pull/24728)

### :gem: Features & Enhancements

- Add Liquibase header partial template [#25125](https://github.com/jhipster/generator-jhipster/pull/25125)
- Add UserManagement entity [#25069](https://github.com/jhipster/generator-jhipster/pull/25069)

### :scroll: Others

- Many improvements
- Many libraries upgrades
- Many bug fixes

## Closed tickets and merged pull requests

As always, **[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=is:closed+milestone:8.2.1)**.

## How to install

To install JHipster v8.2.1 using using NPM:

    npm install -g generator-jhipster

It is also available using the JHipster Docker image, as it is automatically built from our source code.

- [JHipster Online](https://start.jhipster.tech)
- [JHipster Devbox](https://github.com/jhipster/jhipster-devbox)

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

- Contact [@jhipster](https://twitter.com/jhipster) on X
