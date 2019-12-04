---
layout: default
title: Provide Internet Explorer support
sitemap:
priority: 0.1
lastmod: 2019-03-05T18:20:00-00:00
---

# Provide Internet Explorer support

**Tip submitted by [@wmarques](https://github.com/wmarques)** & [@anthony-o](https://github.com/anthony-o)

JHipster supports only evergreen browsers.
However you can still easily support some older browsers like Internet Explorer.

In order to do that you have to:

1. Set target to `es5` in your `tsconfig`
2. Then you have two options:
   1. Add the correct polyfills from 'core-js', if you don't know which one you should use, check the Angular CLI project and their polyfills.
   2. Or use babel + [Babel preset-env](https://babeljs.io/docs/en/babel-preset-env#usebuiltins) to automatically import the correct core-js polyfills based on a browserslist file.

## Full tip using Babel

First, add those `package.json` dependencies: `@babel/core`, `@babel/preset-env` and `babel-loader`. Example with `yarn`:
```bash
yarn add @babel/core @babel/preset-env babel-loader --exact --dev
```
(tested with the following versions for a working IE11 version on a JHipster v6.3.1 generated application:
```json
    "@babel/core": "7.6.4",
    "@babel/preset-env": "7.6.3",
    "babel-loader": "8.0.6",
```
)

Now add the following lines at the top of `src/main/webapp/app/polyfills.ts`:
```ts
import 'core-js/stable';
import 'regenerator-runtime/runtime';
```

In `webpack/webpack.common.js`, after
```js
            {
                test: /manifest.webapp$/,
                loader: 'file-loader',
                options: {
                    name: 'manifest.webapp'
                }
            },
```
add the following lines:
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

And finally, change `target` to `es5` in `tsconfig.json` & `tsconfig-aot.json`.

See this [GitHub issue](https://github.com/jhipster/generator-jhipster/issues/10184#issuecomment-541650501) & [this SO answer](https://stackoverflow.com/a/58377002/535203) for more details.
