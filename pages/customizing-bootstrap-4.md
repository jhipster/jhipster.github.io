---
layout: default
title: Personnalisation de Bootstrap 4
permalink: /customizing-bootstrap-4/
sitemap:
    priority: 0.7
    lastmod: 2017-12-08T00:00:00-00:00
---

# <i class="fa fa-css3"></i> Personnalisation de Bootstrap 4

## Personnalisation de base

_Astuce pro : n'oubliez pas d'exécuter `npm start` pour obtenir un retour immédiat de vos modifications !_

La manière la plus simple de personnaliser l'apparence de votre application JHipster est de remplacer les styles CSS dans le fichier `src/main/webapp/content/css/global.css`, ou si vous avez sélectionné l'option Sass, le fichier `src/main/webapp/content/scss/global.scss`.

L'utilisation de Sass est à la fois plus facile, plus concise et plus puissante que le CSS classique car Bootstrap est également écrit en Sass, veuillez consulter la [documentation officielle de Bootstrap sur le thème](https://getbootstrap.com/docs/4.0/getting-started/theming/).

Si vous souhaitez utiliser les [parties](http://sass-lang.com/guide) de Bootstrap dans vos propres fichiers `scss`, importez-les comme ci-dessous au début de votre fichier `scss`.
Par exemple, pour utiliser le mixin border-radius :

```
@import "node_modules/bootstrap/scss/variables";
@import "node_modules/bootstrap/scss/mixins/border-radius";
```

Assurez-vous d'importer uniquement les partis et non les fichiers Sass principaux, sinon vous risquez de générer du CSS en double, ce qui pourrait causer des problèmes.

TPour modifier les paramètres par défaut de Bootstrap tels que les couleurs, le border-radius, etc., ajoutez ou modifiez la valeur de la propriété dans le fichier partiel `src/main/webapp/content/scss/_bootstrap-variable.scss`

Toutes les valeurs définies dans [_variables.scss](https://github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss) de Bootstrap peuvent être écrasées ici.
