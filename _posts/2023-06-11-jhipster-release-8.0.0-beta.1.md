---
layout: default
title: Release 8.0.0-beta.1
---

JHipster release v8.0.0-beta.1
==================

This is our first beta release for JHipster v8.

It includes more than [2777 closed tickets and pull requests on the main project](https://github.com/jhipster/generator-jhipster/issues?q=is:closed+milestone:8.0.0-beta.1).

_It is not available through the usual channels as this is a beta release, please read below for more information!_


What's new?
------------

### :gem: Features & Enhancements
- Consul as default [#19300](https://github.com/jhipster/generator-jhipster/issues/19300)
- Rename angularX configuration option to angular [#19361](https://github.com/jhipster/generator-jhipster/issues/19361)
- Drop upgrade-config generator [#19655](https://github.com/jhipster/generator-jhipster/issues/19655)
- Bump node dependency to 16 lts [#19648](https://github.com/jhipster/generator-jhipster/pull/19648)

### :beetle: Bug Fixes
- Prevent leakage of user information via api [#22373](https://github.com/jhipster/generator-jhipster/pull/22373)

### :computer: Frontend
- Upgrade to angular 16 [#22182](https://github.com/jhipster/generator-jhipster/pull/22182)
- Convert to vue 3 [#22232](https://github.com/jhipster/generator-jhipster/pull/22232)

### :unlock: Authentication/Security
- Prevent leakage of user information via api [#22373](https://github.com/jhipster/generator-jhipster/pull/22373)

### :paw_prints: JDL/Internals/Blueprints
- Add relationshipSideconcept to jdl relationships [#22481](https://github.com/jhipster/generator-jhipster/pull/22481)

### :scroll: Others
- Many improvements
- Many libraries upgrades
- Many bug fixes


Closed tickets and merged pull requests
------------
As always, __[you can check all closed tickets and merged pull requests here](https://github.com/jhipster/generator-jhipster/issues?q=is:closed+milestone:8.0.0-beta.1)__.


How to install
------------

This is a beta release, so it is not available on our usual "stable" release channel.

To install JHipster v8.0.0-beta.1 using using NPM:

    npm install -g generator-jhipster@beta

It is also available using the JHipster Docker image, as it is automatically built from our source code.

However, as this is a BETA release it will not be available using our other usual channels like:

- [JHipster Online](https://start.jhipster.tech)
- [JHipster Devbox](https://github.com/jhipster/jhipster-devbox)

You also won’t be able to use the `jhipster upgrade` sub-generator, as it won’t “see” the BETA release, which is distributed through a specific beta channel on NPM.


Help and bugs
--------------

If you find any issue with this release, don't hesitate to:

- Add a bug on our [bug tracker](https://github.com/jhipster/generator-jhipster/issues?state=open)
- Post a question on [Stack Overflow](http://stackoverflow.com/tags/jhipster/info)

If the issue you have is an urgent bug or security issue, please:

- Contact [@jhipster](https://twitter.com/jhipster) on Twitter
