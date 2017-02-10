---
layout: default
title: Using JHipster in production
permalink: /production/
redirect_from:
  - /production.html
sitemap:
    priority: 0.7
    lastmod: 2014-02-17T00:00:00-00:00
---

# Using JHipster in production

## Configuration

If you want to use JHipster with the "production" profile, use the pre-configured "prod" Maven profile:

`./mvnw -Pprod`

Or when using Gradle:

`./gradlew -Pprod`

This profile will compile, test and package your application with all productions settings.

If you want more information on the available profiles, please go the section titled "[Development and Production profiles]({{ site.url }}/profiles/)".

## Generating a WAR file

To package the application as a "production" WAR, type:

`./mvnw -Pprod package`

Or when using Gradle:

`./gradlew -Pprod bootRepackage`

This will generate two files (if your application is called "jhipster"):

*   `target/jhipster-0.0.1-SNAPSHOT.war`
*   `target/jhipster-0.0.1-SNAPSHOT.war.original`

The first one is an executable WAR file (see next section to run it). It can also be deployed on an application server, but as it includes runtime librairies, we recommend you use the second, `.original` file if you want to deploy JHipster on an application server like Tomcat, Weblogic or Websphere.

**Please note** that when building a WAR file with the `prod` profile, the generated archive will not include the `dev` assets.

## Executing the WAR file without an application server

Instead of deploying to an application server, many people find it easier to just have an exectuable WAR file.

The first WAR file generated in the previous step is such a WAR, so you can run it in "production" mode by typing (on Mac OS X or Linux):

`./jhipster-0.0.1-SNAPSHOT.war`

If you are on Windows, use:

`java -jar jhipster-0.0.1-SNAPSHOT.war`

**Please note** that this WAR file uses the profile we selected when building it. As it was built using the `prod` file in the previous section, it will therefore run with the `prod` profile.

## (only for AngularJS 1.x) Generating an optimized JavaScript application with Gulp

This step is automatically triggered when you build your project with the `prod` profile. If you want to run it without launching a Maven build, just run:

`gulp build`

This will process all your static resources (CSS, JavaScript, HTML, JavaScript, images...) in order to generate an optimized client-side application.

Those optimized assets will be generated in `target/www` for Maven or `build/www` for Gradle, and will be included in your final production WAR.

This code will be served when you run the application with the `prod` profile.

**Please note** That you will still be able to debug your JavaScript application as JHipster generates [source maps](https://developers.google.com/web/tools/chrome-devtools/debug/readability/source-maps).

**If you have some images missing** after the minification process, this is most likely because you are using some third-party Bower packages that do not correctly reference their images in their `bower.json` configuration. The easiest way to correct this is to add those images yourself in your `src/main/webapp/content/images` folder and change the references to those images to point there.

## (only for Angular 2+) Generating an optimized JavaScript application with Webpack

This step is automatically triggered when you build your project with the `prod` profile. If you want to run it without launching a Maven build, just run:

`yarn run webpack:build`

This will use [Webpack](https://webpack.github.io/) to process all your static resources (CSS, TypeScript, HTML, JavaScript, images...) in order to generate an optimized client-side application.

During this process, Webpack will compile the TypeScript code into JavaScript code, and will also generate source maps, so the client-side application can still be debugged.

Those optimized assets will be generated in `target/www` for Maven or `build/www` for Gradle, and will be included in your final production WAR.

This code will be served when you run the application with the `prod` profile.

## GZipping

Within an executable WAR file, which uses the `prod` profile, JHipster configures GZip compression on your Web resources.

By default, compression will work on all static resources (HTML, CSS, JavaScript) and on all REST requests. You can have more information on this configuration by looking at the `server.compression.*` keys in the Spring Boot application properties.

**Please note** that GZipping is done by the application server, so this section only applies if you use the "executable WAR" option described above. If you run your application in an external application server, you will need to configure it separately.

## Cache headers

With the `prod` profile, JHipster configures a Servlet filter that puts specific HTTP cache headers on your static resources (JavaScript, CSS, fonts...) so they are cached by browsers and proxies.

## Monitoring

JHipster comes with full monitoring support from [Metrics](http://metrics.codahale.com/).

In development, Metrics data will be available through JMX: launch your JConsole and you will be able to access it

In production, your application will try to send this data to an [ELK or JHipster Console server]({{ site.url }}/monitoring/) or to a [Graphite server](http://graphite.wikidot.com/), depending on what you have configured in your `application-prod.yml` configuration file.

## Security

JHipster comes with some default users generated for you. In production, you probably want to change their passwords: the easiest way to achieve this is to run the application a first time, and then use the generated "change password" form to modify those passwords.

Here are the provided user accounts:

*   "admin" is an admin user, with the "ROLE_USER" and "ROLE_ADMIN" authorizations.
*   "system" is used for auditing purposes, when an action is done automatically (the action is done by the system, not by a user). You should not be able to login with this user. It has the "ROLE_USER" and "ROLE_ADMIN" authorizations.
*   "user" is a standard user, with the "ROLE_USER" authorization.
*   "anonymousUser" is for non-authenticated users, so it doesn't have any authorization. This user can be useful for some Spring Security configurations, but we don't use it by default.
