---
layout: default
title: Using Angular
permalink: /using-angular/
sitemap:
    priority: 0.7
    lastmod: 2015-01-29T23:41:00-00:00
---

# <i class="fa fa-html5"></i> Using Angular

**Please note** that this section refers to Angular 2+. If you are using AngularJS 1.x, please go to the [using AngularJS documentation]({{ site.url }}/using-angularjs/).

## Tooling

Angular 2+ is using TypeScript instead of JavaScript, and as a result some specific tooling is necessary to work efficiently with it.

- When running [the application in "development" mode]({{ site.url }}/development/), Webpack and BrowserSync will take care of compiling your TypeScript code, and automatically reload your browser
- To work on your code in your browser, we recommend using [Angular Augury](https://augury.angular.io/), so you can visualize your routes and debug your code easily

## Project Structure

The JHipster client code can be found under `src/main/webapp`, and follows closely the  [John Papa Angular 2 style guide](https://github.com/johnpapa/angular-styleguide/blob/master/a2/README.md). Please read this guide first if you have any question on our application structure, file names, TypeScript conventions...

This style guide is endorsed by the Angular team, and provides best practices that every Angular project should follow.

For Angular routes we follow a dash cased naming convention so that the URLs are clean and consistent.
When you generate an entity the route names, route URLs and REST API endpoint URLs are generated according to this convention, also entity names are automatically pluralized where required.

Here is the main project structure:

    webapp
    ├── app                               - Your application
    │   ├── account                       - User account management UI
    │   ├── admin                         - Administration UI
    │   ├── blocks                        - Common building blocks like configuration and interceptors
    │   ├── entities                      - Generated entities (more information below)
    │   ├── home                          - Home page
    │   ├── layouts                       - Common page layouts like navigation bar and error pages
    │   ├── shared                        - Common services like authentication and internationalization
    │   ├── app.main.ts                   - Main application class
    │   ├── app.module.js                 - Application modules configuration
    │   ├── app.route.js                  - Main application router
    ├── content                           - Static content
    │   ├── css                           - CSS stylesheets
    │   ├── images                        - Images
    ├── i18n                              - Translation files
    ├── scss                              - Sass style sheet files will be here if you choose the option
    ├── swagger-ui                        - Swagger UI front-end
    ├── 404.html                          - 404 page
    ├── favicon.ico                       - Fav icon
    ├── index.html                        - Index page
    ├── robots.txt                        - Configuration for bots and Web crawlers

Using the [entity sub-generator]({{ site.url }}/creating-an-entity/) to create a new entity called `Foo` generates the following front-end files under `src/main/webapp`:

    webapp
    ├── app
    │   ├── entities
    │       ├── foo                                    - CRUD front-end for the Foo entity
    │           ├── foo.component.html                 - HTML view for the list page
    │           ├── foo.component.ts                   - Controller for the list page
    │           ├── foo.model.ts                       - Model representing the Foo entity
    │           ├── foo.module.ts                      - Angular module for the Foo entity
    │           ├── foo.route.ts                       - Angular Router configuration
    │           ├── foo.service.ts                     - Service which access the Foo REST resource
    │           ├── foo-delete-dialog.component.html   - HTML view for deleting a Foo
    │           ├── foo-delete-dialog.component.ts     - Controller for deleting a Foo
    │           ├── foo-detail.component.html          - HTML view for displaying a Foo
    │           ├── foo-detail.component.ts            - Controller or displaying a Foo
    │           ├── foo-dialog.component.html          - HTML view for editing a Foo
    │           ├── foo-dialog.component.ts            - Controller for editing a Foo
    │           ├── foo-popup.service.ts               - Service for handling the create/update dialog pop-up
    │           ├── index.ts                           - Barrel for exporting everything
    ├── i18n                                           - Translation files
    │   ├── en                                         - English translations
    │   │   ├── foo.json                               - English translation of Foo name, fields, ...
    │   ├── fr                                         - French translations
    │   │   ├── foo.json                               - French translation of Foo name, fields, ...

Please note that the default language translations would be based on what you have choosen during app generation. 'en' and 'fr' are shown here only for demonstration.

## Authorizations

JHipster uses [the Angular router](https://angular.io/docs/ts/latest/guide/router.html) to organize the different parts of your client application.

For each state, the required authorities are listed in the state's data, and when the authority list is empty it means that the state can be accessed anonymously.

The authorities are also defined on the server-side in the class `AuthoritiesConstants.java`, and logically the client and server-side authorities should be the same.

In the example below, the 'sessions' state is designed to be accessed only by authenticated users who have `ROLE_USER` authority:

    export const sessionsRoute: Route = {
        path: 'sessions',
        component: SessionsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.account.sessions'
        },
        canActivate: [UserRouteAccessService]
    };

Once those authorities are defined in the router, they can be used through two directives:

- `jhiHasAuthority` that only displays the HTML component if the user has the required authority
- `jhiHasAnyAuthority` that only displays the HTML component if the user has one of the listed authorities

For example, the following text will only be displayed to users having the `ROLE_ADMIN` authority:

    <h1 jhiHasAuthority="ROLE_ADMIN">Hello, admin user</h1>

*Please note* that those directives only show or hide HTML components on the client-side, and that you also need to secure your code on the server-side!

## The ng-jhipster library

The ng-jhipster library is free and OSS, and available on [https://github.com/jhipster/ng-jhipster](https://github.com/jhipster/ng-jhipster).

The ng-jhipster library contains utility functions and common components that are used by Angular 2+ applications. They include:

- Validation directives
- Internationalization components
- Commonly-used pipes like capitalization, ordering and word truncation
- Base64, date and pagination handling services
- A notification system (see below)

### Notification System

JHipster uses a custom notification system to send events from the server-side to the client-side, and has i18n-capable `JhiAlertComponent` and `JhiAlertErrorComponent` components which can be used throughout the generated applications.

By default JHipster will show error notifications when there is an error caught from an HTTP response.

To show a custom notification or alert, use the below methods after injecting the `AlertService` to your controller, directive or service.

The shorthand methods `success`, `info`, `warning` and `error` will have a default timeout of 5 seconds, which can be configured:

    this.alerts.push(
        this.alertService.addAlert(
            {
                type: 'danger',
                msg: 'you should not have pressed this button!',
                timeout: 5000,
                toast: false,
                scoped: true
            },
            this.alerts
        )
    );
