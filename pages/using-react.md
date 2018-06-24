---
layout: default
title: Using React
permalink: /using-react/
sitemap:
    priority: 0.7
    lastmod: 2018-04-02T23:41:00-00:00
---

# <i class="fa fa-html5"></i> Using React (with Redux)
This section refers to the JavaScript library **React** used with **Redux**.

## Project Structure

The JHipster client code can be found under `src/main/webapp`, and follows closely the [Piotr Witek React style guide](https://github.com/piotrwitek/react-redux-typescript-guide/blob/master/README.md).

 Please read this guide first if you have any question on our application structure, file names, TypeScript conventions...

For React routes we follow a dash cased naming convention so that the URLs are clean and consistent.
When you generate an entity the route names, route URLs and REST API endpoint URLs are generated according to this convention, also entity names are automatically pluralized where required.

Here is the main project structure:

```
webapp
├── app                             - Your application
│   ├── config                      - General configuration (redux store, middleware, etc.)
│   ├── entities                    - Generated entities
│   ├── modules                     - Main components directory
│   │   ├── account                 - Account related components
│   │   ├── administration          - Administration related components
│   │   ├── home                    - Application homepage
│   │   └── login                   - Login related components
│   ├── shared                      - Shared elements such as your header, footer, reducers, models and util classes
│   ├── app.scss                    - Your global application stylesheet if you choose the Sass option
│   ├── app.css                     - Your global application stylesheet
│   ├── app.tsx                     - The application main class
│   ├── index.tsx                   - Index script
│   ├── routes.tsx                  - Application main routes
│   └── typings.d.ts                -
├── i18n                            - Translation files
├── static                          - Contains your static files such as images and fonts
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
│   └── entities
│       ├── foo                           - CRUD front-end for the Foo entity
│       │   ├── foo-delete-dialog.tsx     - Delete dialog component
│       │   ├── foo-detail.tsx            - Detail page component
│       │   ├── foo-dialog.tsx            - Creation dialog component
│       │   ├── foo.reducer.ts            - Foo entity reducer
│       │   ├── foo.tsx                   - Entity main component
│       │   └── index.tsx                 - Entity main routes
│       └── index.tsx                     - Entities routes    
└── i18n                                  - Translation files
     ├── en                               - English translations
     │   ├── foo.json                     - English translation of Foo name, fields, ...
     └── fr                               - French translations
         └── foo.json                     - French translation of Foo name, fields, ...
```

Please note that the default language translations would be based on what you have choosen during app generation. 'en' and 'fr' are shown here only for demonstration.

## Redux

[Redux](https://redux.js.org/) is a predictable state container for JavaScript. It is used
together with React to manage the state of your React components.

Basically, Redux provide an object **store** used to store the whole state of your application.
To access this store and therefore update your state components, the only way is to dispatch
**actions** which describe the fact that an update is requested, then the **reducers** will
define how the state is updated in response to these actions.

Here is an example of a reducer:

``` typescript
export const ACTION_TYPES = {
  FETCH_FOOS: 'foo/FETCH_FOOS',
};

const initialState = {
  loading: false,
  foos: [],
  updateSuccess: false,
  updateFailure: false
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FOOS):
      return {
        ...state,
        updateSuccess: false,
        updateFailure: false,
        loading: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FOOS):
      return {
        ...state,
        loading: false,
        updateSuccess: false,
        updateFailure: true
      };
    case SUCCESS(ACTION_TYPES.FETCH_FOOS):
      return {
        ...state,
        loading: false,
        updateSuccess: true,
        updateFailure: false,
        foos: action.payload.data
      };
    default:
      return state;
  }
};
```

In order to access your store and update the current application state, you need to dispatch
actions to the store as mentioned previously. Actions are simple JavaScript objects and must have a **type**, which describe what
the action is going to perform and a usually they have also a **payload** which corresponds to
data you want to pass to the store.

Here is an action to access the store:

``` typescript
const apiUrl = SERVER_API_URL + '/api/foos';

// Action
export const getFoos = () => ({
  type: ACTION_TYPES.FETCH_FOOS,
  payload: axios.get(apiUrl)
});
```

The action described above indicates that we want to retrieve all the Foo objects by
sending a GET request. The action type will match
Notice that the **export** keyword is used to able the connected component to use that action
when necessary (for instance, everytime the component is updated).

## Authorizations

Jhipster uses the [React router](https://github.com/ReactTraining/react-router) to organize the differents parts of your application.

When it comes to routes that require authentication, the `PrivateRoute` component generated is used. This component will simply prevent any unauthenticated user from accessing a route.

Here is an example of PrivateRoute usage:

``` typescript
const Routes = () => (
  <div className="view-routes">
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <PrivateRoute path="/account" component={Account} />
  </div>
);
```

As you can see, unauthenticated user can access `/` and `/login` but accessing `/account` requires to be logged in.

Please note that PrivateRoute uses the `authentication.isAuthenticated` store value to know if the user is authenticated.

## Notification System

JHipster uses [react-toastify](https://github.com/fkhadra/react-toastify) alerts for the notification system.

By default JHipster will show success notifications whenever an entity is created/updated/deleted
and error notifications when there is an error caught from the response.

## React JHipster library

The [react-jhipster](https://github.com/jhipster/react-jhipster) lib provides utilities and generic services for a generated application. It handles i18n as well.