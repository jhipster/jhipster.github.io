---
layout: default
title: Customizing Bootstrap 3
permalink: /customizing-bootstrap-3/
redirect_from:
  - /customizing_bootstrap.html
  - /customizing-bootstrap/
sitemap:
    priority: 0.7
    lastmod: 2015-01-30T18:40:00-00:00
---

# <i class="fa fa-css3"></i> Customizing Bootstrap 3

**Please note** that this section refers to AngularJS 1.x with Bootstrap 3. If you are using Angular 2+ with Bootstrap 4, please go to the [Bootstrap 4 documentation]({{ site.url }}/customizing-bootstrap-4/).

## Basic customisation

_Pro tip: don't forget to run `gulp` to get immediate feedback of your changes!_

The simplest way to customize how your JHipster application looks like is by
overriding CSS styles in `src/main/webapp/content/css/main.css` if you don't use
Sass or in `src/main/webapp/scss/main.scss` if you do.

With Sass you can go further by combining Bootstrap-sass mixins to create your own classes.

If you have selected Sass when generating your application, JHipster has already imported bootstrap-sass main file into your `src/main/scss/vendor.scss` and has installed them in `src/main/webapp/bower_components/bootstrap-sass/assets/stylesheets`.

If you add any library using `bower install` then running `gulp inject:dep` task will add reference of any sass files present to `src/main/scss/vendor.scss` and the `gulp sass` task will compile this to CSS and will copy any fonts included in the libs `fonts` folder into the `src/main/webapp/content/fonts` folder. If you had `gulp` or `gulp serve` running then this is done automatically for you.

vendor.scss

    /* Sass bower components will be injected here */
    /* bower:scss */
    @import "../bower_components/bootstrap-sass/assets/stylesheets/_bootstrap.scss";
    /* endinject */

This import statement has been inserted by the inject task because it is enclosed by bower inject comments, it
imports `src/main/webapp/bower_components/bootstrap-sass/assets/stylesheets/bootstrap/_bootstrap.scss`.

## Advanced customisation

If you want to go further into Bootstrap customisation by excluding some components, adding new ones or replacing standard ones with yours, you must exclude the standard Bootstrap SASS files from the
gulp `inject` task so that your custom one is picked up instead:

gulp/inject.js

    function vendor() {
    ...

    return es.merge(stream, gulp.src(config.sassVendor)
        ...
        .pipe(inject(gulp.src(bowerFiles({filter:['**/*.{scss,sass}', '!/bootstrap-sass/assets/stylesheets/']}), {read: false}), {
           ...
        }))
        ...
}


Copy `src/main/webapp/bower_components/bootstrap-sass/assets/stylesheets/_bootstrap.scss` to `src/main/webapp/scss/_custom-bootstrap.scss`

Edit your `_custom-bootstrap.scss` file to add "../bower_components/bootstrap-sass/assets/stylesheets/" to all import statements so that they point to the `bower_components/bootstrap-sass` directory.

	// Core variables and mixins
	@import "../bower_components/bootstrap-sass/assets/stylesheets/bootstrap/variables";
	@import "../bower_components/bootstrap-sass/assets/stylesheets/bootstrap/mixins";

Import `_custom-bootstrap.scss` into your `main.scss` file:

	@import "custom-bootstrap";

	...


Pay attention to the fact that the `@import` statements do not specify the leading underscore nor the `.scss` filename extension, this is what SASS calls partials.

Test that your project still builds your stylesheets by running `gulp sass`.

It's very likely that you will want to replace some values in the bootstrap variables, just copy `src/main/webapp/bower_components/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss` to `src/main/webapp/scss/_custom-variables.scss` and change the variables values you want and change related import statement in `_custom-bootstrap.scss`:

	// Core variables and mixins
	@import "custom-variables";
	@import "../bower_components/bootstrap-sass/assets/stylesheets/bootstrap/mixins";

You can follow same procedure and naming convention ('_custom-*.css`) for any other partial you want to customize, this will make easier to integrate bootstrap-sass updates.

You can also comment out some `@import` lines in  `_custom-boostrap.scss` to exclude some components you don't need, it's safer to comment out rather than deleting also to make easier to integrate bootstrap-sass updates.

Each time you make a change, test it with `gulp sass` or `gulp` to get immediate feedback.
