---
layout: default
title: Using Vue
permalink: /using-vue/
sitemap:
    priority: 0.7
    lastmod: 2019-03-27T23:41:00-00:00
---

# <i class="fa fa-html5"></i> Using Vue
This section refers to the JavaScript library **Vue.js**.

## Project Structure

The JHipster client code can be found under `src/main/webapp`.

Please read this guide first if you have any question on our application structure, file names, TypeScript conventions...

Note that we use TypeScript in our generated Vue application following [vue-class-component](https://github.com/vuejs/vue-class-component) style and guidelines.

For Vue routes we follow a dash cased naming convention so that the URLs are clean and consistent.
When you generate an entity the route names, route URLs and REST API endpoint URLs are generated according to this convention, also entity names are automatically pluralized where required.

Here is the main project structure:

```
webapp
├── app                             - Your application
│   ├── account                     - Account related components
│   ├── admin                       - Administration related components
│   ├── core                        - Main components such as Home, navbar, ...
│   ├── entities                    - Generated entities
│   ├── locale                      - I18n / translation related components
│   ├── router                      - Routing configuration
│   ├── shared                      - Shared elements such as your config, models and util classes
│   ├── app.component.ts            - The application main class
│   ├── app.vue                     - The application main SFC component
│   ├── constants.ts                - Global application constants
│   ├── main.ts                     - Index script, application entrypoint
│   └── shims-vue.d.ts
├── content                         - Contains your static files such as images and fonts
├── i18n                            - Translation files
├── swagger-ui                      - Swagger UI front-end
├── 404.html                        - 404 page
├── favicon.ico                     - Fav icon
├── index.html                      - Index page
├── manifest.webapp                 - Application manifest
└── robots.txt                      - Configuration for bots and Web crawlers
```

Using the [entity sub-generator]({{ site.url }}/creating-an-entity/) to create a new entity called `Foo` generates the following front-end files under `src/main/webapp`:

```
webapp
├── app                                        
│   ├── entities
│   │   └── foo                           - CRUD front-end for the Foo entity
│   │       ├── foo-details.vue           - Details SFC component
│   │       ├── foo-detail.component.ts   - Details page component
│   │       ├── foo-update.vue            - Creation / Update SFC component
│   │       ├── foo-update.component.ts   - Creation / Update component class
│   │       ├── foo.vue                   - Entity main SFC component
│   │       ├── foo.component.ts          - Entity main component class
│   │       └── foo.service.ts            - Foo entity service
│   ├── router
│   │   └── index.ts                      - Entity main routes configuration
│   └── shared
│       └── model
│           └── foo.model.ts              - Entity model class
└── i18n                                  - Translation files
     ├── en                               - English translations
     │   ├── foo.json                     - English translation of Foo name, fields, ...
     └── fr                               - French translations
         └── foo.json                     - French translation of Foo name, fields, ...
```

Please note that the default language translations would be based on what you have choosen during app generation. 'en' and 'fr' are shown here only for demonstration.

## Store using VuexStore

Application will use a store [VuexStore](https://vuex.vuejs.org/guide/state.html) to maintain state within the application.

This store is configured at startup in `app/config/config.ts:initVueXStore`. Please refer to Vuex documentation to add new states or mutations.

The application will use the store to maintain:

* User authentication information
* Language and translation 
* Notification and alert information
* Active profiles data

## Authorizations

JHipster uses the [Vue router](https://router.vuejs.org/) to organize the differents parts of your application.

When it comes to routes that require authentication, the meta `authorities` is used on desired route. This component will prevent any unauthenticated or unauthorized user from accessing a route.

Here is an example of PrivateRoute usage:

``` typescript
const Routes = () => [{
      path: '/public',
      name: 'public',
      component: Public
    },
    {
      path: '/private',
      name: 'Private',
      component: Private,
      meta: { authorities: ['ROLE_USER'] }
    }];
```

As you can see, unauthenticated user can access `/public` but accessing `/private` requires at least to be logged in.

Please note that the interceptor uses the `$store.getters.authenticated` store value to know if the user is authenticated.

## Validation system

In order to perform form validation, we use [Vuelidate](https://vuelidate.netlify.com/) library. Besides adding validation constraints, several filters are already furnished and enable a full validation on form. Custom validation can be added as such:

```typescript
import { required } from 'vuelidate/lib/validators';

const mustBeCool = (value) => value.indexOf('cool') >= 0;
const validations = {
  foo: {
    required,
    mustBeCool
  }
};
@Component({
  validations
})
export default class FooComponent extends Vue {
  foo: string = null;
}
```

## Bootswatch theme

Theming Bootstrap can be done directly using [Bootswatch](https://bootswatch.com) themes. We now provide questions during generation to pick one of the many themes served by Bootswatch.
