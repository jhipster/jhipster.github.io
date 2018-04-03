---
layout: default
title: Release 5.0.0-beta.0
---

JHipster release v5.0.0-beta.0
==================

This is our first beta release for JHipster v5.

Its main features are Spring Boot 2 support and React support (in addition to an improved Angular support!).

It has [350 closed tickets and pull requests on the main project](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.0.0-beta.0+is%3Aclosed), so it is really a huge work.

_It is not available through the usual channels as this is a beta release, please read below for more information!_

What's new?
----------

- Spring Boot 2.0.0 support [#7061](https://github.com/jhipster/generator-jhipster/pull/7061)
    - All Spring libraries have been upgraded, including Spring Data, Spring Security and Spring Cloud
    - The Spring Boot configuration has also been upgraded
- Reactive support
    - New generator option to enable Spring Webflux support
    - Support for Spring Webflux in the Spring controller sub-generator
- React support [#6044](https://github.com/jhipster/generator-jhipster/issues/6044) (out of experimental status)
    - Same features as our Angular support (including updates mentioned below regarding dialogs and entity folder structure)
    - Uses Redux for state management
    - Uses React Router v4 for routing
    - Written in Typescript
    - Webpack 4 is used for builds and is very similar to our Angular Webpack setup
    - Karma + Mocha + Chai unit tests with good coverage
- Improved Angular support
    - This includes a migration to Webpack 4, which gives a nice performance boost (it varies depending on your situation, but you can expect a noticeable positive impact) [#7186](https://github.com/jhipster/generator-jhipster/pull/7186)
    - Lazy loading support for the admin modules [#7235](https://github.com/jhipster/generator-jhipster/pull/7235)
    - Reworked entity create/edit screens, they are normal pages now instead of popup dialogs [#7368](https://github.com/jhipster/generator-jhipster/pull/7368)
    - Improved AOT setup
    - The folder structure of entities have been improved, especially for microservices as now they are grouped by services. There is a `--skip-ui-grouping` flag to retain the old behaviour [#7079](https://github.com/jhipster/generator-jhipster/pull/7079)
- Prettier support [#6906](https://github.com/jhipster/generator-jhipster/pull/6906)
    - Both Angular and React now uses Prettier to format code.
    - This also adds [Husky](https://github.com/typicode/husky) and list-staged to enable pre-commit hooks
    - Please use the `skip-commit-hook` flag to disable the pre-commit hooks when generating the application
- JDL v2 with application generation support [#7339](https://github.com/jhipster/generator-jhipster/pull/7339)
    - As a result, the language evolved dramatically, and you can now build full applications using the JDL, and not just entities. This is a huge news if you want to share and reuse your JHipster configuration.
- New JHipster blueprints (still a work-in-progress)
    - The blueprints system allows to easily extends and/or replace JHipster templates. This is how the new [JHipster Kotlin](https://github.com/jhipster/jhipster-kotlin) works. This isn’t well-documented yet, but JHipster Kotlin already gives a nice working example.
- Migration from PhantomJS to Puppeteer : as PhantomJS is not developed anymore [see the latest announcement from the maintainer](https://github.com/ariya/phantomjs/issues/15344) we have migrated our frontend tests to use the Headless Chromium browser provided by [Puppeteer](https://github.com/GoogleChrome/puppeteer). If you encounter problems puppeteer, refer to their [troubleshooting documentation](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md)
- New Sub-generator to deploy to AWS containers [#7035](https://github.com/jhipster/generator-jhipster/pull/7035)
- Removed AngularJS support
    - As we now focus on Angular 5+, we have removed our support for the older AngularJS 1.x
    - As a side effect support for Bower and Gulp also have been removed

Documentation
------------

We have started to merge the JHipster v5 documentation on the main website:

- It is not yet complete, please don’t hesitate to help if you find issues
- If you are using JHipster v4, don’t forget we have [the full versioned archives available here]({{ site.url }}/documentation-archive/).

What’s missing
------------

- We’re mostly waiting for Spring Cloud to have a stable release compatible with Spring Boot 2.0.0. This is why this release depends on the Maven Spring milestone repository. If you are not using microservices (and so not using Spring Cloud), you’re not concerned by this.
- A lot more tests, as we have changed many things. For Angular users: we have modified the project layout, but otherwise this shouldn’t be a big upgrade for you, and you should be pretty safe with this beta release.

How to install
------------

This is the first time we use a BETA tag on NPM, so please note this is new for everyone!

To install JHipster v5.0.0-beta.0 using Yarn, please type:

    yarn global add generator-jhipster@beta

If you are using NPM:

    npm install -g generator-jhipster@beta

It is also available using the JHipster Docker image, as it is automatically built from our source code.

However, as this is a BETA release it will not be available using our other usual channels like:

- [JHipster Online](https://start.jhipster.tech)
- Homebrew
- Chocolatey
- [JHipster Devbox](https://github.com/jhipster/jhipster-devbox)

You also won’t be able to use the `jhipster upgrade` sub-generator, as it won’t “see” the BETA release, which is distributed through a specific beta channel on NPM.

How you can help
------------

If you find any issue, please [open a ticket](https://github.com/jhipster/generator-jhipster/issues) and follow our [guidelines](https://github.com/jhipster/generator-jhipster/blob/master/CONTRIBUTING.md).

We are expecting to do a stable release in the next 2 weeks, but please remember that most people on the team are doing this on their free time. So if your company is benefiting from JHipster, you can also help by telling your boss to [sponsor the project]({{ site.url }}/sponsors/) - that money will be used to reward contributors, and help us to release even better versions, more quickly!

Do you want to know more?
------------

All those new features will be showcased at the upcoming [JHipster Conf](https://jhipster-conf.github.io/) where most of the core development team will present their work. Join us in Paris on June, 21st!

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.0.0-beta.0+is%3Aclosed)__.

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

If the issue you have is an urgent bug or security issue, please:

- Contact [@java_hipster](https://twitter.com/java_hipster) on Twitter
