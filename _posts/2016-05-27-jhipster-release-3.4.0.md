---
layout: default
title: Release 3.4.0
---

JHipster release 3.4.0
==================

What's new
----------

Great new features:

- A new sub-generator to handle JHipster upgrades! See the issue at [#3594](https://github.com/jhipster/generator-jhipster/issues/3594). It is already documented
[here]({{ site.url }}/upgrading-an-application/), and you can start using it with this release. Of course, it won't be fully usable until the next release, as if you are upgrading from v3.3.0 it's not installed yet! Many thanks to [François Lecomte](https://github.com/lordlothar99) who had the original idea and coded the implementation!
- Spring profiles used to generate an application are now the default profile used when an application is run, see [#3587](https://github.com/jhipster/generator-jhipster/issues/3587). The most important change is that you don't need to run your "prod" app with `--spring.profiles.active=prod` anymore.
- [SonarSource](http://www.sonarsource.com/) is now providing us with a free Sonar instance to have automatic code quality analysis on generated projects. More information is available on our new [code quality documentation page]({{ site.url }}/code-quality/)
- A great new Cassandra migration tool, that acts like Liquibase (for JPA) or Mongobee (for MongoDB). This is a huge step forward in our Cassandra implementation. See the issue at [#3593](https://github.com/jhipster/generator-jhipster/issues/3593). Many thanks to [Raphaël Brugier](https://twitter.com/rbrugier) from [Ippon USA](http://www.ipponusa.com/) who coded this!!
- MariaDB support [#3600](https://github.com/jhipster/generator-jhipster/issues/3600)

Important bug fixes:

- Compilation failure with social sign-in and MongoDB [#3633](https://github.com/jhipster/generator-jhipster/issues/3633)
- robots.txt secured in gateway applications [#3626](https://github.com/jhipster/generator-jhipster/issues/3626)
- Error when starting a microservice app, using app.yml, with Docker Compose [#3607](https://github.com/jhipster/generator-jhipster/issues/3607)

Closed tickets
------------
As always, __[you can check all closed tickets here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A3.4.0+is%3Aclosed)__.

How to upgrade
------------

For an automatic upgrade, starting with JHipster v3.4.0, use the [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) on an existing application:

```
yo jhipster:upgrade
```

For a manual upgrade, first upgrade your version of JHipster with:

```
npm update -g generator-jhipster
```

If you have an existing project, it will still use the JHipster version with which it was generated.
To upgrade your project, you must first delete its `node_modules` folder and then run:

```
yo jhipster
```

You can also update your project and all its entities by running

```
yo jhipster --with-entities
```

You can also update your entities one-by-one by running again the entity sub-generator, for example if your entity is named _Foo_

```
yo jhipster:entity Foo
```

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

If the issue you have is an urgent bug or security issue, please:

- Contact [@java_hipster](https://twitter.com/java_hipster) on Twitter
