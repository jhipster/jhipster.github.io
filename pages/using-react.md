---
layout: default
title: Utilisation de React
permalink: /using-react/
sitemap:
    priority: 0.7
    lastmod: 2018-04-02T23:41:00-00:00
---

# <i class="fa fa-html5"></i> Utilisation de React (avec Redux)

Cette section concerne la bibliothèque JavaScript **React** utilisée avec **Redux**.

## Structure du projet

Le code client de JHipster se trouve sous `src/main/webapp` et suit étroitement le [guide de style React de Piotr Witek](https://github.com/piotrwitek/react-redux-typescript-guide/blob/master/README.md).

Veuillez lire ce guide en premier si vous avez des questions sur la structure de notre application, les noms de fichiers, les conventions TypeScript...

Pour les routes React, nous suivons une convention de nommage en kebab case afin que les URL soient propres et cohérentes.
Lorsque vous générez une entité, les noms de route, les URL de route et les URL de point de terminaison de l'API REST sont générés selon cette convention, et les noms d'entité sont automatiquement pluriels lorsque nécessaire.

Voici la structure principale du projet :

```plaintext
webapp
├── app                             - Votre application
│   ├── config                      - Configuration générale (store Redux, middleware, etc.)
│   ├── entities                    - Entités générées
│   ├── modules                     - Répertoire principal des composants
│   │   ├── account                 - Composants liés au compte
│   │   ├── administration          - Composants liés à l'administration
│   │   ├── home                    - Page d'accueil de l'application
│   │   └── login                   - Composants liés à la connexion
│   ├── shared                      - Éléments partagés tels que votre en-tête, pied de page, réducteurs, modèles et classes utilitaires
│   ├── app.scss                    - Votre feuille de style globale de l'application si vous avez choisi l'option Sass
│   ├── app.css                     - Votre feuille de style globale de l'application
│   ├── app.tsx                     - La classe principale de l'application
│   ├── index.tsx                   - Script d'index
│   ├── routes.tsx                  - Routes principales de l'application
│   └── typings.d.ts                -
├── i18n                            - Fichiers de traduction
├── static                          - Contient vos fichiers statiques tels que des images et des polices
├── swagger-ui                      - Interface utilisateur Swagger
├── 404.html                        - Page 404
├── favicon.ico                     - Icône de favori
├── index.html                      - Page d'index
├── manifest.webapp                 - Manifeste de l'application
└── robots.txt                      - Configuration pour les robots et les robots d'indexation Web
```


En utilisant le [sous-générateur d'entités]({{ site.url }}/creating-an-entity/) pour créer une nouvelle entité appelée `Foo`, les fichiers frontaux suivants sont générés sous  `src/main/webapp`:

```
webapp
webapp
├── app                                        
│   └── entities
│       ├── foo                           - Interface utilisateur CRUD pour l'entité Foo
│       │   ├── foo-delete-dialog.tsx     - Composant de boîte de dialogue de suppression
│       │   ├── foo-detail.tsx            - Composant de page de détails
│       │   ├── foo-dialog.tsx            - Composant de boîte de dialogue de création
│       │   ├── foo.reducer.ts            - Réducteur de l'entité Foo
│       │   ├── foo.tsx                   - Composant principal de l'entité
│       │   └── index.tsx                 - Routes principales de l'entité
│       └── index.tsx                     - Routes des entités    
└── i18n                                  - Fichiers de traduction
     ├── en                               - Traductions en anglais
     │   ├── foo.json                     - Traduction anglaise du nom de Foo, des champs, ...
     └── fr                               - Traductions en français
         └── foo.json                     - Traduction française du nom de Foo, des champs, ...
```

Veuillez noter que les traductions par défaut seraient basées sur ce que vous avez choisi lors de la génération de l'application. 'en' et 'fr' sont affichés ici uniquement à des fins de démonstration.

## Redux

[Redux](https://redux.js.org/) est un conteneur d'état prévisible pour JavaScript. Il est utilisé avec React pour gérer l'état de vos composants React.

Redux fournit un objet **store** utilisé pour stocker l'intégralité de l'état de votre application. Pour accéder à ce magasin et donc mettre à jour vos composants d'état, le seul moyen est de dispatcher **actions** qui décrivent le fait qu'une mise à jour est demandée, puis les **reducers** définiront comment l'état est mis à jour en réponse à ces actions.

Voici un exemple de réducteur :

```typescript
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

Pour accéder à votre magasin et mettre à jour l'état de l'application actuelle, vous devez envoyer des actions au magasin comme mqui correspond aux données que vous voulez passer au magasin.

Voici une action pour accéder au magasin :

``` typescript
const apiUrl = SERVER_API_URL + '/api/foos';

// Action
export const getFoos = () => ({
  type: ACTION_TYPES.FETCH_FOOS,
  payload: axios.get(apiUrl)
});
```

markdown

layout: default
title: Utilisation de React
permalink: /utilisation-de-react/
sitemap:
    priority: 0.7
    lastmod: 2018-04-02T23:41:00-00:00
---
Veuillez noter que les traductions par défaut seraient basées sur ce que vous avez choisi lors de la génération de l'application. 'en' et 'fr' sont affichés ici uniquement à des fins de démonstration.

## Redux

[Redux](https://redux.js.org/) est un conteneur d'état prévisible pour JavaScript. Il est utilisé avec React pour gérer l'état de vos composants React.

Redux fournit un objet **store** utilisé pour stocker l'intégralité de l'état de votre application. Pour accéder à ce magasin et donc mettre à jour vos composants d'état, le seul moyen est de dispatcher **actions** qui décrivent le fait qu'une mise à jour est demandée, puis les **reducers** définiront comment l'état est mis à jour en réponse à ces actions.

Voici un exemple de réducteur :

```typescript
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

Pour accéder à votre magasin et mettre à jour l'état de l'application actuelle, vous devez envoyer des actions au magasin comme mentionné précédemment. Les actions sont des objets JavaScript et doivent avoir un type, qui décrit ce que l'action va effectuer et généralement elles ont aussi un payload qui correspond aux données que vous voulez passer au magasin.

Voici une action pour accéder au magasin :

typescript

const apiUrl = SERVER_API_URL + '/api/foos';

// Action
export const getFoos = () => ({
  type: ACTION_TYPES.FETCH_FOOS,
  payload: axios.get(apiUrl)
});

L'action décrite ci-dessus indique que nous voulons récupérer tous les objets Foo en envoyant une requête GET. Le type d'action correspondra. Notez que le mot-clé export est utilisé pour permettre au composant connecté d'utiliser cette action lorsque nécessaire (par exemple, à chaque mise à jour du composant).

## Autorisations

JHipster utilise [React router](https://github.com/ReactTraining/react-router) pour organiser les différentes parties de votre application.

En ce qui concerne les routes nécessitant une authentification, le composant `PrivateRoute` généré est utilisé. Ce composant empêchera tout utilisateur non authentifié d'accéder à une route.

Voici un exemple d'utilisation de PrivateRoute :

``` typescript
const Routes = () => (
  <div className="view-routes">
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <PrivateRoute path="/account" component={Account} />
  </div>
);
```

Comme vous pouvez le voir, l'utilisateur non authentifié peut accéder à `/` et `/login` mais l'accès à `/account` nécessite d'être connecté.

Veuillez noter que PrivateRoute utilise la valeur de magasin `authentication.isAuthenticated` pour savoir si l'utilisateur est authentifié.

## Système de notification

JHipster utilise des alertes [react-toastify](https://github.com/fkhadra/react-toastify) pour le système de notification. Par défaut, JHipster affichera des notifications de réussite chaque fois qu'une entité est créée/mise à jour/supprimée et des notifications d'erreur lorsqu'une erreur est capturée dans la réponse.

## Bibliothèque React JHipster

La librairie [react-jhipster](https://github.com/jhipster/react-jhipster) fournit des utilitaires et des services génériques pour une application générée. Elle gère également i18n.