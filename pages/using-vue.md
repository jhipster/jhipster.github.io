---
layout: default
title: Utiliser Vue
permalink: /using-vue/
sitemap:
    priority: 0.7
    lastmod: 2019-03-27T23:41:00-00:00
---

# <i class="fa fa-html5"></i> Utiliser Vue
Cette section se réfère à la bibliothèque JavaScript **Vue.js**.

## Structure du projet

Le code client de JHipster se trouve sous `src/main/webapp`.

Veuillez lire ce guide en premier si vous avez des questions sur la structure de notre application, les noms de fichiers, les conventions TypeScript...

Notez que nous utilisons TypeScript dans notre application Vue générée en suivant le style et les directives de [vue-class-component](https://github.com/vuejs/vue-class-component).

Pour les routes Vue, nous suivons une convention de dénomination en tirets pour que les URLs soient propres et cohérentes. Lorsque vous générez une entité, les noms de routes, les URLs de routes et les URLs des points de terminaison de l'API REST sont générés selon cette convention. Les noms d'entités sont également automatiquement mis au pluriel lorsque nécessaire.

Voici la structure principale du projet :

<pre>
webapp
├── app                             - Votre application
│   ├── account                     - Composants liés au compte
│   ├── admin                       - Composants liés à l'administration
│   ├── core                        - Composants principaux tels que Home, navbar, ...
│   ├── entities                    - Entités générées
│   ├── locale                      - Composants liés à l'I18n / traduction
│   ├── router                      - Configuration de routage
│   ├── shared                      - Éléments partagés tels que votre configuration, vos modèles et classes utilitaires
│   ├── app.component.ts            - La classe principale de l'application
│   ├── app.vue                     - Le composant principal SFC de l'application
│   ├── constants.ts                - Constantes globales de l'application
│   ├── main.ts                     - Script d'index, point d'entrée de l'application
│   └── shims-vue.d.ts
├── content                         - Contient vos fichiers statiques tels que les images et les polices
├── i18n                            - Fichiers de traduction
├── swagger-ui                      - Interface utilisateur Swagger
├── 404.html                        - Page 404
├── favicon.ico                     - Icône Favori
├── index.html                      - Page d'index
├── manifest.webapp                 - Manifeste de l'application
└── robots.txt                      - Configuration pour les bots et les crawlers Web
</pre>

L'utilisation du [sous-générateur d'entités]({{ site.url }}/creating-an-entity/) pour créer une nouvelle entité appelée `Foo` génère les fichiers front-end suivants sous `src/main/webapp` :

<pre>
webapp
├── app                                        
│   ├── entities
│   │   └── foo                           - CRUD front-end pour l'entité Foo
│   │       ├── foo-details.vue           - Composant SFC de détails
│   │       ├── foo-detail.component.ts   - Composant de page de détails
│   │       ├── foo-update.vue            - Composant SFC de création / mise à jour
│   │       ├── foo-update.component.ts   - Classe du composant de création / mise à jour
│   │       ├── foo.vue                   - Composant SFC principal de l'entité
│   │       ├── foo.component.ts          - Classe du composant principal de l'entité
│   │       └── foo.service.ts            - Service de l'entité Foo
│   ├── router
│   │   └── index.ts                      - Configuration des routes principales de l'entité
│   └── shared
│       └── model
│           └── foo.model.ts              - Classe modèle de l'entité
└── i18n                                  - Fichiers de traduction
     ├── en                               - Traductions en anglais
     │   ├── foo.json                     - Traduction anglaise du nom, des champs, etc. de Foo
     └── fr                               - Traductions en français
         └── foo.json                     - Traduction française du nom, des champs, etc. de Foo
</pre>

Veuillez noter que les traductions par défaut dépendent de ce que vous avez choisi lors de la génération de l'application. 'en' et 'fr' sont montrés ici uniquement à titre d'exemple.

## Utilisation de VuexStore

L'application utilise un store [VuexStore](https://vuex.vuejs.org/guide/state.html) pour maintenir l'état au sein de l'application.

Ce store est configuré au démarrage dans `app/config/config.ts:initVueXStore`. Veuillez consulter la documentation de Vuex pour ajouter de nouveaux états ou mutations.

L'application utilise le store pour maintenir :

* Informations d'authentification de l'utilisateur
* Langue et traduction
* Informations de notification et d'alerte
* Données de profils actifs

## Autorisations

JHipster utilise le [routeur Vue](https://router.vuejs.org/) pour organiser les différentes parties de votre application.

Pour les routes nécessitant une authentification, le méta `authorities` est utilisé sur la route désirée. Ce composant empêchera tout utilisateur non authentifié ou non autorisé d'accéder à une route.

Voici un exemple d'utilisation de PrivateRoute :

<pre>typescript
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
</pre>

Comme vous pouvez le voir, un utilisateur non authentifié peut accéder à `/public` mais l'accès à `/private` nécessite au moins d'être connecté.

Veuillez noter que l'intercepteur utilise la valeur `$store.getters.authenticated` du store pour savoir si l'utilisateur est authentifié.

## Système de validation

Afin de réaliser la validation des formulaires, nous utilisons la bibliothèque [Vuelidate](https://vuelidate.netlify.com/). En plus d'ajouter des contraintes de validation, plusieurs filtres sont déjà fournis et permettent une validation complète du formulaire. Une validation personnalisée peut être ajoutée ainsi :

<pre>typescript
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
</pre>

## Thème Bootswatch

La personnalisation de Bootstrap peut être effectuée directement en utilisant les thèmes [Bootswatch](https://bootswatch.com). Nous proposons désormais des questions lors de la génération pour choisir l'un des nombreux thèmes fournis par Bootswatch.