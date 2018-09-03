---
layout: default
title: Release 5.3.0
---

JHipster release v5.3.0
==================

JHipster v5.3.0 is a huge release, with 114 closed tickets and pull requests, and several important changes that you should read before upgrading.

Important changes
-----------------

Those are very important changes that you should be aware of when upgrading from an older JHispter release. Nothing should break, and this is why this isn't a major release, but you need to be aware of them.

- Upgrade to JJWT [#8145](https://github.com/jhipster/generator-jhipster/pull/8145). This will probably affect many JWT users, as the JWT key should now have a minimal length of 512 bits. If your key is smaller, JJWT won't accept it, and your users won't be able to log in. Please note that is for your own good: if your key is too short, this is a high security risk. Also, we now have a new "base64-secret" property, where you can store your token in Base64 encoding. This is also much better for security, and we expect this new property to be the only one supported in our next major release. More information on [#8165](https://github.com/jhipster/generator-jhipster/issues/8165).
- NPM is now the default package manager, instead of Yarn. If you use Yarn, you shouldn't have any issue at the moment (it's just a change in the default option), but we expect to remove the option in our next major release. More information on [#8162](https://github.com/jhipster/generator-jhipster/issues/8162).
- Migration to Spring Data Jest. This is important for Elasticsearch users. As we discussed in [#7810](https://github.com/jhipster/generator-jhipster/issues/7810), cloud providers only support the Elasticsearch REST API, which isn't supported by Spring Data Elasticsearch. So why migrated to Spring Data Jest in [#8122](https://github.com/jhipster/generator-jhipster/pull/8122), and now use by default the Elasticsearch REST API. This should not change anything in your code, and Spring Data Elasticsearch is still available if needed. But this has two important benefits: working with cloud providers, and also allowing to run an embedded Elasticsearch server in "dev" mode. This last feature was lost with the latest Elasticsearch releases, and was requested by a lot of people, so we're very happy to have it back.
- When using an SQL database, connections are now configured not to be in auto-commit mode at the connection pool level, and not at the Hibernate level. As you can read on [Vlad Mihalcea's blog](https://vladmihalcea.com/why-you-should-always-use-hibernate-connection-provider_disables_autocommit-for-resource-local-jpa-transactions/) this gives a nice performance boost over the default Spring Boot configuration! More information on [#8146](https://github.com/jhipster/generator-jhipster/issues/8146).
- Migration to Maven Central for Gradle users. As discussed on [#8186](https://github.com/jhipster/generator-jhipster/issues/8186) this shouldn't change anything for JHipster users, and will remove synchronization issues between Maven Central and Bintray (please note that the last issue was caused by Maven Central). We will work in the near future with the JFrog team, which owns Bintray, to see how we can improve this.


Cool interesting fixes and features
-----------------------------------

- Cache statistics were broken in our last releases, they are now back again! [#8148](https://github.com/jhipster/generator-jhipster/issues/8148)
- Users registering to a JHipster application can now register again if they didn't get their activation e-mail [#8106](https://github.com/jhipster/generator-jhipster/issues/8106)
- JHipster now generates a self-signed TLS certificate for development [#8134](https://github.com/jhipster/generator-jhipster/issues/8134)
- We have a documentation page on deploying JHipster applications to Microsoft Azure [#7930](https://github.com/jhipster/generator-jhipster/issues/7930)
- More user friendly Angular's datepicker for local dates [#7699](https://github.com/jhipster/generator-jhipster/issues/7699)
- Angular now has a global datepicker minimum date [#8137](https://github.com/jhipster/generator-jhipster/pull/8137)

Bug bounties
-------------

Our [bug bounty program](https://www.jhipster.tech/bug-bounties/) worked well on this release, with $500 being given for fixing issues!


Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.3.0+is%3Aclosed)__.

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
