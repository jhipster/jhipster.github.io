---
layout: default
title: Variables d'environnement dynamiques dans le front-end
sitemap:
priority: 0.1
lastmod: 2020-07-01T10:50:00-00:00
---
# Variables d'environnement dynamiques dans le front-end

**Astuce soumise par [@yelhouti](https://github.com/yelhouti)**

Imaginons que vous deviez mettre à jour la valeur d'une variable dans le front-end après que votre code a été compilé (par exemple, l'URL de votre IdP, l'email à utiliser pour les contacts...).

Une manière de faire est de l'avoir comme partie de votre `application.yml` et de faire en sorte que le backend la renvoie au front-end via un nouveau point de terminaison personnalisé, de la même manière que nous le faisons dans `AuthInfoResource.java` lorsque nous utilisons OAuth2.

Une autre méthode, qui élimine le besoin de ce point de terminaison et offre une meilleure flexibilité et moins de code, est d'avoir un nouveau fichier appelé `env.js` qui ressemble à ceci :

```javascript
window.__env = window.__env || {};
window.__env.myDynamicVariable = 'http://127.0.0.1:8090';
```

Le code ci-dessus crée une variable globale `__env`  si elle n'est pas déjà déclarée.

Elle peut être accessible dans vos fichiers Angular, mais nous recommandons de l'exposer via `constants.ts` comme ceci 

```typescript
@ts-ignore
export const MY_DYNAMIC_VARIABLE = window.__env.myDynamicVariable;
```
Lors de l'utilisation de Kubernetes, un fichier avec ce format peut être monté en tant que configMap, c'est pourquoi nous conservons une syntaxe de clé-valeur aussi simple.

Maintenant, nous devons nous assurer que `index.html` le charge en ajoutant la balise script dans la `<head>` comme ceci :

```html
    ...
    <!-- jhipster-needle-add-resources-to-root - JHipster will add new resources here -->
    <script src="env.js"></script>
```
Et nous disons à webpack de le copier tel quel avec le code packagé :

```javascript
// jhipster-needle-add-assets-to-webpack - JHipster will add/remove third-party resources in this array
{ from: './<%= MAIN_SRC_DIR %>env.js', to: 'env.js' },
```

Nous recommandons d'ajouter le fichier à  `.eslintignore.ejs` pour une syntaxe propre :
```
src/main/webapp/env.js
```

La prochaine étape consiste à travailler sur un blueprint qui fait tout cela.
