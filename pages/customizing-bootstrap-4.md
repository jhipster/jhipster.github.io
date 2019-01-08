---
layout: default
title: Customizing Bootstrap 4
permalink: /customizing-bootstrap-4/
sitemap:
    priority: 0.7
    lastmod: 2017-12-08T00:00:00-00:00
---

# <i class="fa fa-css3"></i> Customizing Bootstrap 4

## Basic customization

_Pro tip: don't forget to run `npm start` or `yarn start` to get immediate feedback of your changes!_

The simplest way to customize how your JHipster application looks like is by
overriding CSS styles in `src/main/webapp/content/css/global.css`, or if you selected the Sass option, the `src/main/webapp/content/scss/global.scss` file.

Using Sass is both easier, more concise and more powerful than plain CSS because Bootstrap is also written in Sass, please refer to Bootstrap's [official documentation about theming](https://getbootstrap.com/docs/4.0/getting-started/theming/) .

If you want to use Bootstrap [partials](http://sass-lang.com/guide) in your own `scss` files then import it like below at the beginning of your `scss` file.
For example to use the border-radius mixin:

```
@import "node_modules/bootstrap/scss/variables";
@import "node_modules/bootstrap/scss/mixins/border-radius";
```

Make sure you import only partials and not main Sass files, otherwise you will end up generating duplicate CSS which might cause issues.

To change the default Bootstrap settings like colors, border-radius, etc, add or change the value of the property in the partial file `src/main/webapp/content/scss/_bootstrap-variable.scss`

All values defined in Bootstrap [_variables.scss](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss) can be overwritten here.
