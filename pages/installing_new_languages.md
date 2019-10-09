---
layout: default
title: Installing new languages
permalink: /installing-new-languages/
redirect_from:
  - /installing_new_languages.html
sitemap:
    priority: 0.7
    lastmod: 2014-12-10T00:00:00-00:00
---

# <i class="fa fa-flag"></i> Internationalization

## Introduction

During the generation of a new project you will be asked whether or not you want to enable internationalization support.

If enabling it you will need to select the native language of your application. After that you can choose the additional languages you would like to install. If you don't want to support any additional languages from start you can always add languages later when needed by running the language sub-generator.

If you are sure you will never translate this application into another language you should not enable the internationalization.

## Supported languages

These are the currently supported languages

*   Albanian
*   Arabic (Libya)
*   Armenian
*   Belarusian
*   Bengali
*   Catalan
*   Chinese (Simplified)
*   Chinese (Traditional)
*   Czech 
*   Danish 
*   Dutch 
*   English 
*   Estonian 
*   Farsi
*   Finnish 
*   French 
*   Galician 
*   German 
*   Greek 
*   Hindi 
*   Hungarian 
*   Indonesian
*   Italian 
*   Japanese 
*   Korean 
*   Marathi 
*   Myanmar 
*   Polish 
*   Portuguese (Brazilian)
*   Portuguese 
*   Romanian 
*   Russian 
*   Slovak 
*   Serbian 
*   Spanish 
*   Swedish 
*   Turkish 
*   Tamil 
*   Telugu 
*   Thai 
*   Ukrainian
*   Uzbek (Cyrillic)
*   Uzbek (Latin)
*   Vietnamese 

_Your language is missing in JHipster? Help us improve the project with a PR!_

## How to add languages after project generation?

To do this you can run the languages sub-generator with:

`jhipster languages`

![]({{ site.url }}/images/install_new_languages.png)

Note that you will need to regenerate your entities if you would like to have them translated in the language you just added.

## How to add a new language that is not supported?

All languages are saved in the folder `src/main/webapp/i18n` (client side) and `src/main/resources/i18n` (server side)

Here are the steps to install a new language called `new_lang`:

1.  Duplicate the `src/main/webapp/i18/en` folder to `src/main/webapp/i18/new_lang` (this is where all the front-end translations are stored)
2.  Translate all files under the folder `src/main/webapp/i18/new_lang`
3.  For AngularJS 1 add the language code `new_lang` to the `LANGUAGES` constant defined in `src/main/webapp/app/components/language/language.constants.js`

        .constant('LANGUAGES', [
            'en',
            'fr',
            'new_lang'
            // jhipster-needle-i18n-language-constant - JHipster will add/remove languages in this array
        ]

    For Angular 2+ add the language code `new_lang` to the `LANGUAGES` constant defined in `src/main/webapp/app/shared/language/language.constants.ts`

        export const LANGUAGES: string[] = [
            'en',
            'fr',
            'new_lang'
            // jhipster-needle-i18n-language-constant - JHipster will add/remove languages in this array
        ];

4.  In the `src/main/resources/i18n` folder, copy the `messages_en.properties` file to `messages_new_lang.properties` (this is where the server-side translations are stored)
5.  Translate all keys in the `messages_new_lang.properties` file
6.  For AngularJS 1 add the new language's name in the function of `filter('findLanguageFromKey')` in the `src/main/webapp/app/components/language/language.filter.js` file. For Angular 2+ add the new language's name in the `languages` variable of `FindLanguageFromKeyPipe` in the `src/main/webapp/app/shared/language/find-language-from-key.pipe.ts`
7.  For Angular 2+ add the new language bundling to `webpack.common.js`

        new MergeJsonWebpackPlugin({
            output: {
                groupBy: [
                    { pattern: "./src/main/webapp/i18n/en/*.json", fileName: "./i18n/en.json" },
                    { pattern: "./src/main/webapp/i18n/new_lang/*.json", fileName: "./i18n/new_lang.json" }
                    // jhipster-needle-i18n-language-webpack - JHipster will add/remove languages in this array
                ]
            }
        })


The new language `new_lang` is now available in the language menu, and it is available both in the front-end Angular application and in the back-end Spring application.

### Contributing the language to generator-jhipster

If you would like to contribute a new language to the generator follow steps 1, 2, 4 and 5 from above. Add an entry for the new language to the `LANGUAGES` constant in `generators/generator-constants.js` and add the language to `test/templates/all-languages/.yo-rc.json` in the `generator-jhipster` project. Submit a PR with all these changes.

## How to remove an existing language?

Here are the steps to remove a language called `old_lang`:

1.  Remove the language folder from `src/main/webapp/i18/old_lang`
2.  Remove the constant entry in `src/main/webapp/app/components/language/language.constants.js` or `src/main/webapp/app/shared/language/language.constants.ts` and `webpack.common.js`
3.  Remove the `src/main/resources/i18n/messages_old_lang.properties` file
