---
layout: default
title: Provide Internet Explorer support
sitemap:
priority: 0.1
lastmod: 2019-03-05T18:20:00-00:00
---

# Provide Internet Explorer support

**Tip submitted by [@wmarques](https://github.com/wmarques)**

JHipster supports only evergreen browsers.
However you can still easily support some older browsers like Internet Explorer.

In order to do that you have to:

1. Set target to `es5` in your `tsconfig`
2. Then you have two options:
   1. Add the correct polyfills from 'core-js', if you don't know which one you should use, check the Angular CLI project and their polyfills.
   2. Or use babel + [Babel preset-env](https://babeljs.io/docs/en/babel-preset-env#usebuiltins) to automatically import the correct core-js polyfills based on a browserslist file.
