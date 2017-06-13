---
layout: default
title: Customizing Bootstrap 4
permalink: /customizing-bootstrap-4/
sitemap:
    priority: 0.7
    lastmod: 2017-02-09:40:00-00:00
---

# <i class="fa fa-css3"></i> Customizing Bootstrap 4

**Please note** that this section refers to Angular 2+ with Bootstrap 4. If you are using AngularJS 1.x with Bootstrap 3, please go to the [Bootstrap 3 documentation]({{ site.url }}/customizing-bootstrap-3/).

## Basic customisation

_Pro tip: don't forget to run `yarn start` to get immediate feedback of your changes!_

The simplest way to customize how your JHipster application looks like is by
overriding CSS styles in `src/main/webapp/content/css/global.css`, or if you selected the Sass option, the `src/main/webapp/scss/global.scss` file.

If you want to use Bootstrap [partials](http://sass-lang.com/guide) in your own `scss` files then import it like below in the beginning of your `scss` file.
For example to use the border-radius mixin:

```
@import "node_modules/bootstrap/scss/variables";
@import "node_modules/bootstrap/scss/mixins/border-radius";
```
Make sure you import only partials and not main sass files, otherwise you will end up generating duplicate css which might cause issues

Please refer official [Bootstrap](https://v4-alpha.getbootstrap.com/getting-started/options/) documentation for more details on customizations
