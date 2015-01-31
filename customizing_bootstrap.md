---
layout: default
title: Customizing Bootstrap
sitemap:
priority: 0.7
lastmod: 2015-01-30T18:40:00-00:00
---

# <span class="bs-docs-booticon bs-docs-booticon-lg bs-docs-booticon-outline">B</span> Customizing Bootstrap

## With normal CSS

The simplest way to customize how your JHipster application looks like is by overriding CSS styles in `src/main/webapp/assets/images/styles/main.css`.

## With Compass

If you use Compass, you must modify your `src/main/scss/main.scss` file.

You can go even further by combining Bootstrap-sass mixins to create your own classes: for this you must import bootstrap-sass files into your `src/main/scss/main.scss`. Bower has installed them into `src/main/webapp/bower_components/bootstrap-sass/assets/stylesheets/bootstrap`:

~~~
// bower:scss

@import "bootstrap-sass/assets/stylesheets/bootstrap/bootstrap"

// endbower
~~~

This line imports `src/main/webapp/bower_components/bootstrap-sass/assets/stylesheets/bootstrap/_bootstrap.scss`, pay attention to the fact that the `@import` statement does not specify the leading underscore nor the `.scss` suffix, this is what SASS calls partials. It is enclosed with Bower comments used by the `wiredep` task.

If you want to go further into Bootstrap customization by excluding some components, adding new ones or replacing standard ones with yours, copy `src/main/webapp/bower_components/bootstrap-sass/assets/stylesheets/bootstrap/_bootstrap.scss` to `src/main/scss/_custom-bootstrap.scss` then import it into your `main.scss` and don't forget to remove all other bootstrap imports you may previously have imported:

~~~
@import "custom-bootstrap"
~~~

Then you should edit your `src/main/scss/_custom-bootstrap.scss` to point all `@import` statements to your `bower_components` directory and to enclose them within Bower comments used by the `wiredep` task:

`_custom-bootstrap.scss`

~~~
// bower:scss

// Core variables and mixins
@import "bootstrap-sass/assets/stylesheets/bootstrap/variables";
@import "bootstrap-sass/assets/stylesheets/bootstrap/mixins";

...

// endbower
~~~

Test that your project still builds your stylesheets by running `grunt build` (or keep `grunt serve` running to get immediate feedback).

It's very likely that you will want to replace some values in the bootstrap variables, in that case just copy `src/main/webapp/bower_components/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss` to `src/main/scss/_custom-variables.scss` and change the variables values you want as well as the related import statement in `_custom-bootstrap.scss`:

~~~
// bower:scss

// Core variables and mixins
@import "custom-variables";
@import "bootstrap-sass/assets/stylesheets/bootstrap/mixins";

...

// endbower
~~~

You can follow the same procedure and naming conventions for any other file you want to customize, as this will make it easier to integrate bootstrap-sass updates.

You can also comment out some `@import` lines in  `_custom-boostrap.scss` to exclude some components you don't need to optimize the download size. It's also safer to comment out rather than deleting, as it will make it easier to integrate bootstrap-sass updates.

Each time you make a change, test it with grunt or better use `grunt serve` to get immediate feedback.
