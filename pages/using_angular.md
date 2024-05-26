---
layout: default
title: Utilisation d'Angular
permalink: /using-angular/
sitemap:
    priority: 0.7
    lastmod: 2015-01-29T23:41:00-00:00
---

# <i class="fa fa-html5"></i> Utilisation d'Angular

## Outils

Angular utilise TypeScript au lieu de JavaScript, et par conséquent certains outils spécifiques sont nécessaires pour travailler efficacement avec lui. Notre [flux de travail de développement]({{ site.url }}/development/) pour une application Angular 2+ est le suivant.

1. Lorsque vous générez une application, les fichiers sont créés et à la fin de la génération la tâche `npm install` est déclenchée.
2. Une fois `npm install` terminé, il appelle le script `postInstall` dans `package.json`, cette étape déclenche la tâche `webapp:build`.
3. Maintenant, vous devriez avoir tous les fichiers générés et compilés dans le dossier `www` à l'intérieur du dossier `target` ou `build` en fonction de l'outil de construction (Maven ou Gradle) sélectionné.
4. Maintenant, exécutez `./mvnw` ou `./gradlew` pour lancer le serveur d'application et il devrait être disponible à [localhost:8080](localhost:8080), cela sert également le code côté client compilé à partir des étapes ci-dessus.
5. Maintenant, exécutez `npm start` dans un nouveau terminal pour lancer le serveur de développement Webpack avec BrowserSync. Cela se chargera de compiler votre code TypeScript et de recharger automatiquement votre navigateur.

Si vous commencez à apporter des modifications au code côté client sans avoir `npm start` en cours d'exécution, rien ne sera reflété car les modifications ne sont pas compilées, vous devez donc soit exécuter `npm run webapp:build` manuellement après les modifications, soit avoir `npm start` en cours d'exécution.

Vous pouvez également forcer Maven à exécuter la tâche `webapp:dev` lors du démarrage en passant le profil `webapp` comme `./mvnw -Pdev,webapp`.

**Note** Gradle lance automatiquement la compilation webpack en profil `dev` si le front-end a changé (uniquement au démarrage, pour le rechargement en direct utilisez `npm start`).

D'autres commandes npm disponibles peuvent être trouvées dans la section `scripts` du fichier `package.json` de votre projet.

- Pour travailler sur votre code dans votre navigateur, nous recommandons d'utiliser [Angular DevTools](https://angular.io/guide/devtools). Angular DevTools est une extension de navigateur qui fournit des capacités de débogage et de profilage pour les applications Angular (**Note** Angular DevTools prend en charge Angular v12 et ultérieur).

## Structure du projet

Le code client JHipster se trouve sous `src/main/webapp` et suit étroitement le [guide de style Angular](https://angular.io/guide/styleguide). Veuillez lire ce guide d'abord si vous avez des questions sur notre structure d'application, les noms de fichiers, les conventions TypeScript...

Ce guide de style est approuvé par l'équipe Angular et fournit les meilleures pratiques que chaque projet Angular devrait suivre.

Pour les routes Angular, nous suivons une convention de nommage en tiret pour que les URL soient propres et cohérentes.
Lorsque vous générez une entité, les noms de route, les URL des routes et les URL des points de terminaison de l'API REST sont générés selon cette convention, également les noms d'entité sont automatiquement mis au pluriel si nécessaire.

Voici la structure principale du projet :

    webapp
    ├── app                               - Votre application
    │   ├── account                       - Interface utilisateur de gestion du compte utilisateur
    │   ├── admin                         - Interface utilisateur d'administration
    │   ├── config                        - Certains fichiers utilitaires
    │   ├── core                          - Blocs de construction communs comme la configuration et les intercepteurs
    │   ├── entities                      - Entités générées (plus d'informations ci-dessous)
    │   ├── home                          - Page d'accueil
    │   ├── layouts                       - Mises en page de pages communes comme la barre de navigation et les pages d'erreur
    │       ├── main                      - Page principale
    │           ├── main.component.ts     - Classe d'application principale
    │   ├── login                         - Page de connexion
    │   ├── shared                        - Services communs comme l'authentification et l'internationalisation
    │   ├── app.module.ts                 - Configuration des modules d'application
    │   ├── app-routing.module.ts         - Routeur principal de l'application
    ├── content                           - Contenu statique
    │   ├── css                           - Feuilles de style CSS
    │   ├── images                        - Images
    │   ├── scss                          - Les fichiers de feuilles de style Sass seront ici si vous choisissez l'option
    ├── i18n                              - Fichiers de traduction
    ├── swagger-ui                        - Interface utilisateur Swagger UI
    ├── 404.html                          - Page 404
    ├── favicon.ico                       - Icône de favori
    ├── index.html                        - Page d'index
    ├── robots.txt                        - Configuration pour les robots et les robots d'exploration Web


En utilisant le [sous-générateur d'entité]({{ site.url }}/creating-an-entity/) pour créer une nouvelle entité appelée `Foo`, les fichiers frontaux suivants sont générés sous `src/main/webapp` :

    webapp
    ├── app
    │   ├── entities
    │       ├── foo                                    - CRUD frontal pour l'entité Foo
    │           ├── foo.component.html                 - Vue HTML pour la page de liste
    │           ├── foo.component.ts                   - Contrôleur pour la page de liste
    │           ├── foo.model.ts                       - Modèle représentant l'entité Foo
    │           ├── foo.module.ts                      - Module Angular pour l'entité Foo
    │           ├── foo.route.ts                       - Configuration du routeur Angular
    │           ├── foo.service.ts                     - Service qui accède à la ressource REST de Foo
    │           ├── foo-delete-dialog.component.html   - Vue HTML pour supprimer un Foo
    │           ├── foo-delete-dialog.component.ts     - Contrôleur pour supprimer un Foo
    │           ├── foo-detail.component.html          - Vue HTML pour afficher un Foo
    │           ├── foo-detail.component.ts            - Contrôleur pour afficher un Foo
    │           ├── foo-dialog.component.html          - Vue HTML pour éditer un Foo
    │           ├── foo-dialog.component.ts            - Contrôleur pour éditer un Foo
    │           ├── foo-popup.service.ts               - Service pour gérer la fenêtre contextuelle de création/mise à jour
    │           ├── index.ts                           - Baril pour exporter tout
    ├── i18n                                           - Fichiers de traduction
    │   ├── en                                         - Traductions en anglais
    │   │   ├── foo.json                               - Traduction en anglais du nom de Foo, des champs, ...
    │   ├── fr                                         - Traductions en français
    │   │   ├── foo.json                               - Traduction en français du nom de Foo, des champs, ...

Veuillez noter que les traductions par défaut seraient basées sur ce que vous avez choisi lors de la génération de l'application. 'en' et 'fr' sont indiqués ici uniquement à titre de démonstration.

## Autorisations

JHipster utilise [le routeur Angular](https://angular.io/docs/ts/latest/guide/router.html) pour organiser les différentes parties de votre application cliente.

Pour chaque état, les autorisations requises sont répertoriées dans les données de l'état, et lorsque la liste des autorisations est vide, cela signifie que l'état peut être accédé anonymement.

Les autorisations sont également définies côté serveur dans la classe `AuthoritiesConstants.java`, et logiquement les autorisations côté client et côté serveur doivent être les mêmes.

Dans l'exemple ci-dessous, l'état 'settings' est conçu pour être accessible uniquement par les utilisateurs authentifiés ayant l'autorité `ROLE_ADMIN` :

    export const settingsRoute: Route = {
        path: 'sessions',
        component: SettingsComponent,
        title: 'global.menu.account.settings',
        data: {
            authorities: ['ROLE_ADMIN'],
        },
        canActivate: [UserRouteAccessService]
    };

Une fois que ces autorisations sont définies dans le routeur, elles peuvent être utilisées via la directive `jhiHasAnyAuthority` dans ses 2 variantes basées sur le type d'argument :

- pour une chaîne unique, la directive affiche uniquement le composant HTML si l'utilisateur a l'autorité requise
- pour un tableau de chaînes, la directive affiche le composant HTML si l'utilisateur a l'une des autorités répertoriées

Par exemple, le texte suivant ne sera affiché qu'aux utilisateurs ayant l'autorité `ROLE_ADMIN` :

    <h1 *jhiHasAnyAuthority="'ROLE_ADMIN'">Bonjour, utilisateur administrateur</h1>

Par exemple, le texte suivant ne sera affiché qu'aux utilisateurs ayant l'une des autorités `ROLE_ADMIN` ou `ROLE_USER` :

    <h1 *jhiHasAnyAuthority="['ROLE_ADMIN', 'ROLE_USER']">Bonjour, cher utilisateur</h1>

*Veuillez noter* que ces directives ne montrent ou ne cachent que des composants HTML côté client, et que vous devez également sécuriser votre code côté serveur !

## La bibliothèque ng-jhipster

La bibliothèque ng-jhipster est gratuite et open source, et disponible sur [https://github.com/jhipster/ng-jhipster](https://github.com/jhipster/ng-jhipster).

La bibliothèque ng-jhipster contient des fonctions utilitaires et des composants courants utilisés par les applications Angular 2+. Ils comprennent :

- Directives de validation
- Composants d'internationalisation
- Pipes couramment utilisés comme la capitalisation, le tri et la troncation de mots
- Services de gestion de base64, de date et de pagination
- Un système de notification (voir ci-dessous)

### Système de notification

JHipster utilise un système de notification personnalisé pour envoyer des événements du côté serveur au côté client, et dispose de composants `JhiAlertComponent` et `JhiAlertErrorComponent` capables d'être internationalisés et utilisés dans les applications générées.

Par défaut, JHipster affiche des notifications d'erreur lorsqu'une erreur est détectée dans une réponse HTTP.

Pour afficher une notification ou une alerte personnalisée, utilisez les méthodes ci-dessous après avoir injecté le `AlertService` dans votre contrôleur, directive ou service.

Les méthodes abrégées `success`, `info`, `warning` et `error` auront un délai d'expiration par défaut de 5 secondes, qui peut être configuré :

    this.alerts.push(
        this.alertService.addAlert(
            {
                type: 'danger',
                msg: 'vous ne devriez pas avoir appuyé sur ce bouton !',
                timeout: 5000,
                toast: false,
                scoped: true
            },
            this.alerts
        )
    );

## Utilisation d'Angular CLI

Angular CLI est utilisé pour construire et tester les applications JHipster.
Cependant, nous avons ajouté un fichier de configuration webpack personnalisé afin d'améliorer l'expérience de développement en ajoutant BrowserSync, ESLint (Angular CLI utilise toujours TSLint pour le moment), la fusion des fichiers de traduction JSON et des notifications lorsque la construction est terminée ou a échoué.

### Aperçu

[Angular CLI](https://cli.angular.io/) est un outil pour développer, générer et maintenir des applications Angular. JHipster génère le fichier de configuration Angular CLI, donc les flux de travail Angular CLI fonctionnent avec JHipster.

Cette intégration est réalisée en générant un fichier `angular.json` dans le dossier racine de l'application et en ajoutant ses dépendances dans le fichier `package.json`.

### Utilisation

```bash
ng help
```

### Construction

Vous pouvez utiliser `ng build` pour construire votre front-end, mais nous recommandons toujours d'utiliser les scripts NPM fournis tels que `npm start`, `npm run build`, etc. Consultez notre [documentation sur l'utilisation en développement]({{ site.url }}/development/) et notre [documentation sur l'utilisation en production]({{ site.url }}/production/).

### Génération de composants, directives, pipes et services

Vous pouvez utiliser la commande `ng generate` (ou `ng g`) pour générer des composants Angular :

```bash
ng generate component my-new-component
ng g component my-new-component # en utilisant l'alias

# Les composants supportent la génération de chemin relatif
# Allez dans src/app/feature/ et exécutez
ng g component new-cmp
# votre composant sera généré dans src/app/feature/new-cmp
# mais si vous deviez exécuter
ng g component ../newer-cmp
# votre composant sera généré dans src/app/newer-cmp
```
Vous pouvez trouver tous les blueprints possibles dans le tableau ci-dessous :

Scaffold  | Utilisation
---       | ---
[Component](https://github.com/angular/angular-cli/wiki/generate-component) | `ng g component my-new-component`
[Directive](https://github.com/angular/angular-cli/wiki/generate-directive) | `ng g directive my-new-directive`
[Pipe](https://github.com/angular/angular-cli/wiki/generate-pipe)           | `ng g pipe my-new-pipe`
[Service](https://github.com/angular/angular-cli/wiki/generate-service)     | `ng g service my-new-service`
[Class](https://github.com/angular/angular-cli/wiki/generate-class)         | `ng g class my-new-class`
[Guard](https://github.com/angular/angular-cli/wiki/generate-guard)         | `ng g guard my-new-guard`
[Interface](https://github.com/angular/angular-cli/wiki/generate-interface) | `ng g interface my-new-interface`
[Enum](https://github.com/angular/angular-cli/wiki/generate-enum)           | `ng g enum my-new-enum`
[Module](https://github.com/angular/angular-cli/wiki/generate-module)       | `ng g module my-module`


### Test

Pour des raisons de cohérence sur l'application JHipster, les tests sont disponibles via la commande `npm` :

```bash
npm test
```

### i18n

JHipster utilise la dépendance `ngx-translate` pour la traduction. L'i18n d'Angular CLI est basé sur le support d'i18n par défaut d'Angular, qui est incompatible avec JHipster.

### Lancement du serveur

Si vous préférez utiliser Angular CLI pour développer votre application, vous pouvez exécuter votre serveur directement en utilisant sa commande dédiée.

```bash
ng serve
```

### Conclusion

Pour plus d'informations sur Angular CLI, veuillez visiter le site officiel [https://cli.angular.io/](https://cli.angular.io/)