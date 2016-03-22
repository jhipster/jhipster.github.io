---
layout: default
title: Customizing Bootstrap
permalink: /customizing-bootstrap/
redirect_from:
  - /customizing_bootstrap.html
sitemap:
    priority: 0.7
    lastmod: 2015-01-30T18:40:00-00:00
---

# <i class="fa fa-css3"></i> Customizing Bootstrap

_Pro tip: don't forget to run `gulp` to get immediate feedback of your changes!_

## Basic customisation

The simplest way to customize how your JHipster application looks like is by
overriding CSS styles in `src/main/webapp/content/css/main.css` if you don't use
Sass or in `src/main/webapp/scss/main.scss` if you do.

With Sass you can go further by combining Bootstrap-sass mixins to create your own classes.

If you have selected Sass when generating your application, JHipster has already imported bootstrap-sass main file into your `src/main/scss/vendor.scss` and has installed them in `src/main/webapp/bower_components/bootstrap-sass/assets/stylesheets`.

If you add any library using `bower install` then running `gulp wiredep` task will add reference of any sass files present to `src/main/scss/vendor.scss` and the `gulp sass` task will compile this to CSS and will copy any fonts included in the libs `fonts` folder into the `src/main/webapp/content/fonts` folder. If you had `gulp` or `gulp serve` running then this is done automatically for you.

vendor.scss

    /* Sass bower components will be injected here */
    // bower:scss
    @import "../bower_components/bootstrap-sass/assets/stylesheets/_bootstrap.scss";
    // endbower

This import statement has been inserted by the wiredep task because it is enclosed by bower comments, it
imports `src/main/webapp/bower_components/bootstrap-sass/assets/stylesheets/bootstrap/_bootstrap.scss`.

## Advanced customisation

If you want to go further into Bootstrap customisation by excluding some components, adding new ones or replacing standard ones with yours, you must exclude the standard Bootstrap SASS files from the
wiredep task in `gulpfile.js` so that your custom one is picked up instead:

gulpfile.js

	gulp.task('wiredep:app', function () {
	    ...
        return es.merge(stream, gulp.src(config.sassSrc)
            ...
            .pipe(wiredep({
                ignorePath: /\.\.\/webapp\/bower_components\//, // remove ../webapp/bower_components/ from paths of injected sass files
                exclude: [/bootstrap-sass\/assets\/stylesheets/],
            }))
            ...
        ...
    });


Copy `src/main/webapp/bower_components/bootstrap-sass/assets/stylesheets/_bootstrap.scss` to `src/main/webapp/scss/_custom-bootstrap.scss`

Edit your `_custom-bootstrap.scss` file to add "bootstrap-sass/assets/stylesheets/" to all import statements so that they point to the `bower_components` directory.

	// Core variables and mixins
	@import "bootstrap-sass/assets/stylesheets/bootstrap/variables";
	@import "bootstrap-sass/assets/stylesheets/bootstrap/mixins";

Import it into your `main.scss` file:

	@import "custom-bootstrap";

	...


Pay attention to the fact that the `@import` statements do not specify the leading underscore nor the `.scss` filename extension, this is what SASS calls partials.

Test that your project still builds your stylesheets by running `gulp sass`.

It's very likely that you will want to replace some values in the bootstrap variables, just copy `src/main/webapp/bower_components/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss` to `src/main/webapp/scss/_custom-variables.scss` and change the variables values you want and change related import statement in `_custom-bootstrap.scss`:

	// Core variables and mixins
	@import "custom-variables";
	@import "bootstrap-sass/assets/stylesheets/bootstrap/mixins";

You can follow same procedure and naming convention ('_custom-*.css`) for any other partial you want to customise, this will make easier to integrate bootstrap-sass updates.

You can also comment out some `@import` lines in  `_custom-boostrap.scss` to exclude some components you don't need, it's safer to comment out rather than deleting also to make easier to integrate bootstrap-sass updates.

Each time you make a change, test it with `gulp sass` or `gulp` to get immediate feedback.
