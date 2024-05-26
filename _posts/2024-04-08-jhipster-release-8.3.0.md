---
layout: default
title: Release 8.3.0
---

# JHipster release v8.3.0

This is a minor release for JHipster v8. 

It includes [210 closed issues and pull requests on the main branch](https://github.com/jhipster/generator-jhipster/issues?q=is:closed+milestone:8.3.0) after the 8.2.1 release.

## What's new?

- Upgrade to Spring Boot 3.2.4 ([#25593](https://github.com/jhipster/generator-jhipster/pull/25593))
- Drop `jhipster-dependencies` in favor of Spring Boot's dependency management ([#25602](https://github.com/jhipster/generator-jhipster/pull/25602))
- Add `--experimental` support for Spring Cloud Gateway MVC ([#25768](https://github.com/jhipster/generator-jhipster/pull/25768)). 
- Improve Spring context caching during tests ([#25642](https://github.com/jhipster/generator-jhipster/pull/25642))
- Upgrade to Gradle 8.7 ([#25681](https://github.com/jhipster/generator-jhipster/pull/25681))
- Keycloak fixes so user registration works ([#25680](https://github.com/jhipster/generator-jhipster/pull/25680), [#25679](https://github.com/jhipster/generator-jhipster/pull/25679))

### :computer: Frontend

- [Vue] Fixed Vue with WebSocket ([#25566](https://github.com/jhipster/generator-jhipster/pull/25566))
- [Angular] Migrate Input to Signal Input [#25690](https://github.com/jhipster/generator-jhipster/pull/25690) and [#25691](https://github.com/jhipster/generator-jhipster/pull/25691)
- [Node] Upgrade to Node 20.12.0 ([#25632](https://github.com/jhipster/generator-jhipster/pull/25632))

### :scroll: Others

- Several improvements, library upgrades, and bug fixes

## Closed tickets and merged pull requests

As always, **[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=is:closed+milestone:8.3.0)**.

## How to install

To install JHipster v8.3.0:

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

## Aide et bugs

Si vous rencontrez un problème avec cette version, n'hésitez pas à :

- Ajouter un bug sur notre [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Poser une question sur [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)
- Créer une nouvelle discussion sur [GitHub](https://github.com/jhipster/generator-jhipster/discussions)

Si le problème que vous avez est un bug urgent ou un problème de sécurité, veuillez :

- Contacter [@jhipster](https://twitter.com/jhipster) sur Twitter