---
layout: default
title: Release 8.5.0
---

# JHipster release v8.5.0

This is a minor release for JHipster v8. 

It includes [309 closed issues and pull requests on the main branch](https://github.com/jhipster/generator-jhipster/issues?q=is:closed+milestone:8.5.0) after the 8.4.0 release.

## What's new?

- Upgrade to Spring Boot 3.3.0 ([#26242](https://github.com/jhipster/generator-jhipster/pull/26242))
- Accessibility improvements for Angular ([#26107](https://github.com/jhipster/generator-jhipster/pull/26107))
- Don't delete all in entities tests ([#26259](https://github.com/jhipster/generator-jhipster/pull/26259), [#26227](https://github.com/jhipster/generator-jhipster/pull/26227))
- Fix OIDC claims when `syncUserWithIdp` is false ([#26171](https://github.com/jhipster/generator-jhipster/pull/26171))
- Improve type safety ([#26096](https://github.com/jhipster/generator-jhipster/pull/26096), [#26110](https://github.com/jhipster/generator-jhipster/pull/26110), [#26111](https://github.com/jhipster/generator-jhipster/pull/26111),[#26269](https://github.com/jhipster/generator-jhipster/pull/26269),[#26115](https://github.com/jhipster/generator-jhipster/pull/26115), [#26133](https://github.com/jhipster/generator-jhipster/pull/26133), [#26156](https://github.com/jhipster/generator-jhipster/pull/26156))
- Sonar improvements ([#26302](https://github.com/jhipster/generator-jhipster/pull/26302), [#26272](https://github.com/jhipster/generator-jhipster/pull/26272), [#26270](https://github.com/jhipster/generator-jhipster/pull/26270), [#26268](https://github.com/jhipster/generator-jhipster/pull/26268), [#26264](https://github.com/jhipster/generator-jhipster/pull/26264), [#26246](https://github.com/jhipster/generator-jhipster/pull/26246), [#26241](https://github.com/jhipster/generator-jhipster/pull/26241), [#26210](https://github.com/jhipster/generator-jhipster/pull/26210), [#26225](https://github.com/jhipster/generator-jhipster/pull/26225))

### :computer: Frontend

- [Angular] Use input instead of @Input ([#26313](https://github.com/jhipster/generator-jhipster/pull/26313), [#26303](https://github.com/jhipster/generator-jhipster/pull/26303))
- [Angular] Use viewChild signal ([#26282](https://github.com/jhipster/generator-jhipster/pull/26282), [#26291](https://github.com/jhipster/generator-jhipster/pull/26291), [#26293](https://github.com/jhipster/generator-jhipster/pull/26293)) 
- [React] Rework React error handling ([#26059](https://github.com/jhipster/generator-jhipster/pull/26059))
- [Node] Upgrade to Node 20.14.0 ([#26292](https://github.com/jhipster/generator-jhipster/pull/26292))

### :scroll: Others

- Several improvements, library upgrades, and bug fixes 

## Closed tickets and merged pull requests

See the [GitHub 8.5.0 release notes](https://github.com/jhipster/generator-jhipster/releases/tag/v8.5.0) for more details.

As always, **[you can view all closed tickets and merged pull requests](https://github.com/jhipster/generator-jhipster/issues?q=is:closed+milestone:8.5.0)**.

## How to install

To install JHipster v8.5.0:

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
