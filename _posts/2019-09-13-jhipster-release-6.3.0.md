---
layout: default
title: Release 6.3.0
---

JHipster release v6.3.0
==================

This release fixes an **important security vulnerability**:

- Please read the [security advisory here](https://github.com/jhipster/generator-jhipster/security/advisories/GHSA-mwp6-j9wf-968c).
- **Are you vulnerable?** if you use JWT, session or UAA authentication, and more importantly if you use our system to send a link to reset passwords, then you are affected. The algorithm used isn't cryptographically secure, which means that an attacker could guess a reset link, and hence take over any account in the system.
- **How to fix the issue** you probably don't need to upgrade JHipster, as this just affects a few generated files, so this can be done manually. The issue is in the generated `RandomUtil` class. [Here is this class in our sample application generated with JHipster v6.2.0](https://github.com/jhipster/jhipster-sample-app/blob/v6.2.0/src/main/java/io/github/jhipster/sample/service/util/RandomUtil.java) and [here is the updated version, using JHipster v6.3.0](https://github.com/jhipster/jhipster-sample-app/blob/v6.3.0/src/main/java/io/github/jhipster/sample/service/util/RandomUtil.java). So all you need to do is copy the new file, which uses `SecureRandom`, and replace the older file.
- **How this issue was handled** This issue was found by [Jonathan Leitschuh](https://github.com/JLLeitschuh), and was fixed in the next couple of hours by [Frederik Hahne](https://github.com/atomfrede). Please note that we gave a [$500 bug bounty to Jonathan](https://github.com/jhipster/generator-jhipster/issues/10401) as well as a [$300 bug bounty to Frederik](https://github.com/jhipster/generator-jhipster/issues/10402). For obvious security reasons, only the [JHipster core dev team](https://www.jhipster.tech/team/) knew about this issue during that period. We then waited one day in order to inform everyone, including doing [an advisory on our Twitter account](https://twitter.com/java_hipster/status/1172387424715988994) so that our users are not caught up with a surprise emergency release.
- **What will happen next** This is the first time we used the "security advisory" feature from GitHub. We certainly learned a lot, and we will provide in the very near future a clear path to report security advisories to the team.

**What's new in this release**

Apart from the security vulnerability, this is a minor release of JHipster v6 with [247 closed tickets and merged pull requests](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.3.0+is%3Aclosed).

Here are the most significant ones:

- Upgrade to Spring Boot 2.1.8 and Spring Cloud Greenwich SR3
- All Docker images have been upgraded to their latest versions
- Migration from Tslint to Eslint ([#10187](https://github.com/jhipster/generator-jhipster/pull/10187) and [#10213](https://github.com/jhipster/generator-jhipster/pull/10213)). The JHipster ESlint configuration is now externalized in a new repository at https://github.com/jhipster/eslint-config-jhipster [#10358](https://github.com/jhipster/generator-jhipster/pull/10358)
- Created Jar is now non executable by default [#10282](https://github.com/jhipster/generator-jhipster/pull/10282)
- Enforce architecture constraints with ArchUnit [#10274](https://github.com/jhipster/generator-jhipster/pull/10274)
- Add a new Feign Client sub-generator based on OpenAPIGenerator [#9548](https://github.com/jhipster/generator-jhipster/issues/9548)
- Liquibase can use different credentials than the one in the application (so the running application cannot change the current schema)
- Add support for Caffeine Cache [#10303](https://github.com/jhipster/generator-jhipster/pull/10303)
- Enhance Google App Engine generator with Java 11, Jar support and more ([#10284](https://github.com/jhipster/generator-jhipster/pull/10284) and [#10336](https://github.com/jhipster/generator-jhipster/pull/10336))
- Fix the AWS generator monolith flow [#10376](https://github.com/jhipster/generator-jhipster/pull/10376)
- Fix admin logs screen in Angular [jhipster/ng-jhipster#97](https://github.com/jhipster/ng-jhipster/pull/97)
- Fix interactions between main generator and blueprint when one is installed globally and the other locally [#10257](https://github.com/jhipster/generator-jhipster/issues/10257)
- Fix issues with Istio URLs [#10135](https://github.com/jhipster/generator-jhipster/issues/10135)

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A6.3.0+is%3Aclosed)__.

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
