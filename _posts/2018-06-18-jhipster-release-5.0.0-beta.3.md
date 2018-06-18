---
layout: default
title: Release 5.0.0-beta.3
---

JHipster release v5.0.0-beta.3
==================

This is a specific security release on top of our v5.0.0-beta.2 release from last week, as 2 important security issues have been fixed on Spring Boot 2.0.3.

Please note that Spring Boot 2.0.3 also breaks the way Ehcache works with JHipster: many thanks to [Henri Tremblay](https://github.com/henri-tremblay) from the Ehcache team who did an incredible job in fixing the issue during the week-end!

More information on this Spring Boot 2.0.3 upgrade (including the Ehcache issue) is available on [#7783](https://github.com/jhipster/generator-jhipster/issues/7783).

_This BETA version is not available through the usual channels as this is a beta release, please read below for more information!_

Do you want to know more?
------------

JHipster 5 will be showcased at the upcoming [JHipster Conf](https://jhipster-conf.github.io/) where most of the core development team will present their work. Join us in Paris on June, 21st!

How to install
------------

As this a beta version, we are using a `beta` tag on NPM.

To install JHipster v5.0.0-beta.3 using Yarn, please type:

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

Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=milestone%3A5.0.0-beta.3+is%3Aclosed)__.

Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

If the issue you have is an urgent bug or security issue, please:

- Contact [@java_hipster](https://twitter.com/java_hipster) on Twitter
