---
layout: default
title: Release 8.4.0
---

# JHipster release v8.4.0

This is a minor release for JHipster v8. 

It includes [224 closed issues and pull requests on the main branch](https://github.com/jhipster/generator-jhipster/issues?q=is:closed+milestone:8.4.0) after the 8.3.0 release.

## What's new?

- Upgrade to Spring Boot 3.2.5 ([#25902](https://github.com/jhipster/generator-jhipster/pull/25902))
- Update Codec for Redis to fix `LazyInitializationException` ([#25988](https://github.com/jhipster/generator-jhipster/pull/25988))
- Use custom CSRF handler to provide BREACH protection ([#25907](https://github.com/jhipster/generator-jhipster/pull/25907))
- Fix Spring Boot profiles to inherit from Spring Boot parent ([#25980](https://github.com/jhipster/generator-jhipster/pull/25980))
- Remove `LocaleConfiguration` that's no longer needed ([#23818](https://github.com/jhipster/generator-jhipster/pull/23818))
- Add support for homepage customizations in blueprints ([#25943](https://github.com/jhipster/generator-jhipster/pull/25943))

### :computer: Frontend

- [Node] Upgrade to Node 20.12.2 ([#25801](https://github.com/jhipster/generator-jhipster/pull/25801))

### :scroll: Others

- Several improvements, library upgrades, and bug fixes

## Closed tickets and merged pull requests

As always, **[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=is:closed+milestone:8.4.0)**.

## How to install

To install JHipster v8.4.0:

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

You can also use the [migrate blueprint](https://github.com/jhipster/generator-jhipster-migrate) for more advanced upgrade features. 

```
npm i -g generator-jhipster-migrate
jhipster-migrate
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

Since JHipster 8.0, this command will update your project and all its entities. 

You can also update your entities one-by-one by running again the entity sub-generator, for example if your entity is named _Foo_, use:

```
jhipster entity Foo
```

## Help and bugs

If you find any issue with this release, don't hesitate to:

- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)
- Create a new discussion on [GitHub](https://github.com/jhipster/generator-jhipster/discussions)

If the issue you have is an urgent bug or security issue, please:

- Contact [@jhipster](https://twitter.com/jhipster) on Twitter
