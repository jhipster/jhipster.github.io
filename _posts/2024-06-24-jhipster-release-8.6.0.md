---
layout: default
title: Release 8.6.0
---

# JHipster release v8.6.0

This is a minor release for JHipster v8. 

It includes [216 closed issues and pull requests on the main branch](https://github.com/jhipster/generator-jhipster/issues?q=is:closed+milestone:8.6.0) after the 8.5.0 release.

## What's new?

* Upgrade to Spring Boot 3.3.1 ([#26490](https://github.com/jhipster/generator-jhipster/pull/26490))
* Upgrade to Angular 18 ([#26213](https://github.com/jhipster/generator-jhipster/pull/26213))
* Add Java 22 support ([#25645](https://github.com/jhipster/generator-jhipster/pull/25645) and [#26495]((https://github.com/jhipster/generator-jhipster/pull/26495)))
* Upgrade to Maven v3.9.8 ([#26452](https://github.com/jhipster/generator-jhipster/pull/26452))
* Upgrade to Gradle v8.8 ([#26329](https://github.com/jhipster/generator-jhipster/pull/26329))
* Upgrade to Node v20.15.0 ([#26494](https://github.com/jhipster/generator-jhipster/pull/26494))
* Upgrade to Keycloak 25.0.0 ([#26420](https://github.com/jhipster/generator-jhipster/pull/26420))
* Fix Gatling: remove deprecated plugin configuration option ([#26493](https://github.com/jhipster/generator-jhipster/pull/26493))
* Unnecessary `npmw` variables ([#26436](https://github.com/jhipster/generator-jhipster/pull/26436))
* Docker Compose version is obsolete ([#26438](https://github.com/jhipster/generator-jhipster/pull/26438))
* Always add `ci:server:await` script ([#26393](https://github.com/jhipster/generator-jhipster/pull/26393))
* Fix MySQL 8.4.0 so it starts in Docker ([#26359](https://github.com/jhipster/generator-jhipster/pull/26359))
* Don't add annotations to inner classes. ([#26345](https://github.com/jhipster/generator-jhipster/pull/26345))
* Upgrade to MariaDB 11.4.2 ([#26346](https://github.com/jhipster/generator-jhipster/pull/26346))
* Sonar: UserDTO overrides `equals()` and should therefore also override `hashCode()` ([#26325]https://github.com/jhipster/generator-jhipster/pull/26325))
* Loggers should be 'private static final' ([#26532](https://github.com/jhipster/generator-jhipster/pull/26532))

### :computer: Frontend

* [Angular] Fix deprecated signature for `tableRow.injector.get` ([#26516](https://github.com/jhipster/generator-jhipster/pull/26516) and [#26529](https://github.com/jhipster/generator-jhipster/pull/26529))
* [Angular] Sonar: Fields that are only assigned in the constructor should be readonly ([#26514](https://github.com/jhipster/generator-jhipster/pull/26514))
* [Angular] `throwError()` function is deprecated ([#26515](https://github.com/jhipster/generator-jhipster/pull/26515))
* [Angular] Rename Jhipster to JHipster ([#26512](https://github.com/jhipster/generator-jhipster/pull/26512))
* [Angular] HttpClientTestingModule is deprecated ([#26511](https://github.com/jhipster/generator-jhipster/pull/26511))
* [Angular] Fix input fields style on Bootswatch Quartz theme ([#26507](https://github.com/jhipster/generator-jhipster/pull/26507))
* [Angular] Sonar: InfiniteScrollModule is deprecated ([#26465](https://github.com/jhipster/generator-jhipster/pull/26465))
* [Angular] Sonar: HttpClientModule is deprecated ([#26464](https://github.com/jhipster/generator-jhipster/pull/26464))
* [Angular] Fix deprecated RxJS method (throwError) ([#26336](https://github.com/jhipster/generator-jhipster/pull/26336))
* [Angular] Fix deprecated method (angular/core/testing) ([#26335](https://github.com/jhipster/generator-jhipster/pull/26335))
* [Angular] Use signal contentChild ([#26334](https://github.com/jhipster/generator-jhipster/pull/26334))
* [React] Fix OAuth2 login and logout issues ([#26384](https://github.com/jhipster/generator-jhipster/pull/26384))
* The documentation should recommend using `./npmw` instead of requiring Node be installed ([#26437](https://github.com/jhipster/generator-jhipster/pull/26437))
* Fix initial text direction setting ([#26406](https://github.com/jhipster/generator-jhipster/pull/26406))
* Avoid filtering out relationships where entities support filtering ([#26357](https://github.com/jhipster/generator-jhipster/pull/26357))
* Cleanup `.eslintignore` ([#26453](https://github.com/jhipster/generator-jhipster/pull/26453))

### :scroll: Others

- Several internal improvements and blueprint optimizations

## Closed tickets and merged pull requests

See the [GitHub 8.6.0 release notes](https://github.com/jhipster/generator-jhipster/releases/tag/v8.6.0) for more details.

As always, **[you can view all closed tickets and merged pull requests](https://github.com/jhipster/generator-jhipster/issues?q=is:closed+milestone:8.6.0)**.

## How to install

To install JHipster v8.6.0:

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
