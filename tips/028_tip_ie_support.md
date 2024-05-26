---
layout: default
title: Fournir un support pour Internet Explorer
sitemap:
priority: 0.1
lastmod: 2019-03-05T18:20:00-00:00
---

# Fournir un support pour Internet Explorer

**Conseil soumis par [@wmarques](https://github.com/wmarques)** & [@anthony-o](https://github.com/anthony-o)

JHipster prend en charge uniquement les navigateurs "evergreen".
Cependant, vous pouvez toujours prendre en charge facilement certains navigateurs plus anciens comme Internet Explorer.

Pour ce faire, vous devez :

1. Définir la cible sur `es5` dans votre `tsconfig`.
2. Ensuite, vous avez deux options :
   1. Ajoutez les polyfills corrects de 'core-js'. Si vous ne savez pas lequel utiliser, consultez le projet Angular CLI et leurs polyfills.
   2. Ou utilisez Babel + [Babel preset-env](https://babeljs.io/docs/en/babel-preset-env#usebuiltins) pour importer automatiquement les polyfills core-js corrects en fonction d'un fichier browserslist.

## Astuce complète utilisant Babel

D'abord, ajoutez ces dépendances `package.json` : `@babel/core`, `@babel/preset-env` et `babel-loader`. Exemple avec `npm`:
```bash
npm install @babel/core @babel/preset-env babel-loader --save-dev
```
(testé avec les versions suivantes pour une version IE11 fonctionnelle sur une application générée JHipster v6.3.1:
```json
    "@babel/core": "7.6.4",
    "@babel/preset-env": "7.6.3",
    "babel-loader": "8.0.6",
```
)

Ensuite, ajoutez les lignes suivantes en haut de `src/main/webapp/app/polyfills.ts`:
```ts
import 'core-js/stable';
import 'regenerator-runtime/runtime';
```

Dans `webpack/webpack.common.js`, après
```js
            {
                test: /manifest.webapp$/,
                loader: 'file-loader',
                options: {
                    name: 'manifest.webapp'
                }
            },
```
ajoutez les lignes suivantes:

```js
            {
                test: /\.js/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    "presets": [
                      [
                        "@babel/preset-env",
                        {
                          "targets": {
                            "firefox": "60",
                            "ie": "11"
                          },
                          "useBuiltIns": "entry",
                          "corejs": 3
                        }
                      ]
                    ]
                  }
                },
                exclude: /@babel(?:\/|\\{1,2})runtime|core-js/,
              },
```

Et enfin, changez `target` en `es5` dans `tsconfig.json` & `tsconfig-aot.json`.

Consultez ce [problème GitHub](https://github.com/jhipster/generator-jhipster/issues/10184#issuecomment-541650501) et [cette réponse sur SO](https://stackoverflow.com/a/58377002/535203) pour plus de détails.