---
layout: default
title: Release 4.0.0
---

JHipster release 4.0.0
==================

This new major release is a huge step forward, after nearly one year of very hard work.

This would never have been possible without our wonderful [core dev team]({{ site.url }}/team/) and our incredible number of [contributors](https://github.com/jhipster/generator-jhipster/graphs/contributors)! Thank you so much, everyone!

Summary
------------

JHipster now support both AngularJS 1 and Angular 2.x, making it:

- The only available "full stack" generator for Angular 2.x
- The only generator that creates non-trivial Angular 2.x code, in particular using our [JDL Studio](https://start.jhipster.tech/jdl-studio/)

We have also removed a lot of our previous pain points, so that generation is easier, faster, and safer.

Angular 2 support
------------

This is the main big news, we now support Angular 2.x! To be more precise:

- AngularJS 1 is still our default option: you can use it perfectly fine with JHipster. This is our battle-tested, widely-use code, so if you want something very stable, that's your best option.
- Angular 2 is now marked "beta", even if we already know lots of projects are using it successfully. We have very little known bugs and very few limitations, so you can start using it on your project. The main issue is that this code is very new, so we expect to release a lot of patch releases in the next weeks, so you must be ready to update your project a few times.

Migration to Yarn
------------

While we still support NPM, our migration to [Yarn](https://github.com/yarnpkg/yarn) has been very successful: builds are much faster, and we have much less download issues. So we recommend everyone switches to Yarn, and we might drop official NPM at some point in the future.

If you use Angular 2 (our previous point), we have also replaced Bower by Yarn. That means we only have one package manager, which is much more performant and gives much better quality.

Migration to Webpack
------------

With Angular 2, we migrated from Gulp to [Webpack](https://webpack.github.io/).

Webpack is much more efficient for working with Angular 2, and it can also be run directly from Yarn. No need to install Gulp anymore!

**Yes, if you use Angular 2 + Yarn + Webpack, we removed all the installation pain points of JHipster 3.x !!!**

JHipster server-side library and NG JHipster library
------------

One of the usual complaints with JHipster is that we generated too much code. So with JHipster 4 we introduce 2 new libraries:

- The [JHipster server-side library](https://github.com/jhipster/jhipster) contains "utility" classes that were previously generated. You can still extend or override them if you don't like their default implementation, in those (unlikely) use cases where those classes don't suit you.
- The [NG JHipster library](https://github.com/jhipster/ng-jhipster) contains the same kind of "utility" code that was previously generated, but for Angular 2.x.

As a result, the generated code should be much simpler, and easier to understand.

Constructor-based injection
--------------

JHipster is a complete upgrade of Spring libraries, with some major refactoring. The most important one is our switch from field-based injection to constructor-based injection.

- Constructor-based injection is considered cleaner by many people, in particular as it eases testing
- JHipster now has constructor-based injection both in Spring and in Angular, making the code more homogeneous
- This removes the need for the `@Inject` annotations, so we have deleted the `javax.inject` dependency from the project

"AAA" ranking on Sonar
---------------

As a result of a lot of refactoring (including the previous point on constructor-based injection), we are happy to announce that our sample generated project has the highest "AAA" mark on Sonar.

The official Sonar report [can be viewed here](https://sonarqube.com/dashboard/?id=1054756), and is automatically generated after each commit on our master branch.

This means that a JHipster-generated project is of much higher quality than most "hand-crafted" projects!

What's next?
------------

As this is a 4.0.0 release, with a lot of changes, we expect to release regularly patch versions. Be sure to follow [@java_hipster](https://twitter.com/java_hipster) to be notified of those new versions!

Our documentation is not totally updated, as it is very big. If you see any issue, don't hesitate to create a ticket, and maybe even send a pull request, on our [documentation repository](https://github.com/jhipster/jhipster.github.io).

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A4.0.0+is%3Aclosed)__.

How to upgrade
------------

As this is a major upgrade, expect quite a lot of merges if you use our [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/) on an existing application.

Of course, it will work a lot better if you stay on AngularJS 1! Otherwise you will need to migrate your whole front-end manually.

To use our [JHipster upgrade sub-generator]({{ site.url }}/upgrading-an-application/), run:

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
