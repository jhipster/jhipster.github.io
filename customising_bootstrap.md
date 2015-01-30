---
layout: default
title: Customising Bootstrap
sitemap:
priority: 0.7
lastmod: 2015-01-30T18:40:00-00:00
---

# <span class="bs-docs-booticon bs-docs-booticon-lg bs-docs-booticon-outline">B</span> Customising Bootstrap

The simplest way to customize how your JHipster Bootstrap application looks like is by
overriding CSS styles in `src/main/webapp/assets/images/styles/main.css` if you don't use 
Compass or in `src/main/scss/main.scss` if you do.

With Compass you can go further by combining Bootstrap-sass mixins to create your own classes.

For this you must import bootstrap-sass files into your `src/main/scss/main.scss`, bower has installed them into `src/main/webapp/bower_components/bootstrap-sass/assets/stylesheets/bootstrap`.

main.scss

~~~
// bower:scss

@import "bootstrap-sass/assets/stylesheets/bootstrap/bootstrap"

// endbower
~~~

This line imports `src/main/webapp/bower_components/bootstrap-sass/assets/stylesheets/bootstrap/_bootstrap.scss`, pay attention to the fact that the `@import` statement does not specify the leading underscore nor the `.scss` suffix, this is what SASS calls partials. It is enclosed with bower comments used by wiredep task.

If you want to go further into Bootstrap customisation by excluding some components, adding new ones or replacing standard ones with yours, copy `src/main/webapp/bower_components/bootstrap-sass/assets/stylesheets/bootstrap/_bootstrap.scss` to `src/main/scss/_custom-bootstrap.scss` then import it into your `main.scss` and don't forget to remove all other bootstrap imports you may previously have imported:

main.scss

~~~
@import "custom-bootstrap"
~~~

Then you should edit your `src/main/scss/_custom-bootstrap.scss` to point all @import statements to your bower_components directory and to enclose them within bower comments for wiredep task:

_custom-bootstrap.scss

~~~
// bower:scss

// Core variables and mixins
@import "bootstrap-sass/assets/stylesheets/bootstrap/variables";
@import "bootstrap-sass/assets/stylesheets/bootstrap/mixins";

...

// endbower
~~~

Test that your project still builds your stylesheets by running `grunt build`.

It's very likely that you will want to replace some values in the bootstrap variables, just copy `src/main/webapp/bower_components/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss` to `src/main/scss/_custom-variables.scss` and change the variables values you want and change related import statement in `_custom-bootstrap.scss`:

~~~
// bower:scss

// Core variables and mixins
@import "custom-variables";
@import "bootstrap-sass/assets/stylesheets/bootstrap/mixins";

...

// endbower
~~~

You can follow same procedure and naming convention for any other files you want to customise, this will make easier to integrate bootstrap-sass updates.

You can also comment out some `@import` lines in  `_custom-boostrap.scss` to exclude some components you don't need to optimize download size, it's safer to comment out rather than deleting also to make easier to integrate bootstrap-sass updates.

Each time you make a change, test it with grunt or better use `grunt serve` to get immediate feedback.