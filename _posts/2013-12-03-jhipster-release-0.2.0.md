---
layout: default
title: Release 0.2.0
---

JHipster release 0.2.0
==================

*JHipster gives you Yeoman + Maven + Spring + AngularJS all working together in one handy generator.*

A few days after our v0.1.0 release, we are already releasing JHipster v0.2.0!

This release contains several bug fixes and small improvements, but the really big news is the full internationalization support in AngularJS, which is a major change in the generated application.

- All AngularJS views are now fully internationalized!
- We use the great ["Angular Translate"](https://github.com/PascalPrecht/angular-translate) library
- Of course, usage of i18n is documented on this Website, in the ["development" section](/development.html)

We haven't seen this implemented in other Yeoman generators, so once again JHipster is ahead of the pack in "enterprise" features!

*What still needs to be done*: in "production" mode we haven't find a way to minimize and cache the localized JSON files. The only solution at the moment would be to use ETags (with Spring's ShallowEtagHeaderFilter), but this is not an optimal solution. If you have any idea, feel free to join us!

Many thanks to [Jerome Mirc](https://twitter.com/JeromeMirc) who had the idea and coded everything.
