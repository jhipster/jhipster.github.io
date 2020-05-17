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
*   Bulgarian
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
*   Sinhala 
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

Note that you will need to regenerate your entities if you would like to have them translated in the language you added right now.

## How to add a new language that is not supported?

All languages are saved in the folder `src/main/webapp/i18n` (client side) and `src/main/resources/i18n` (server side)

Here are the steps to install a new language called `new_lang`:

1.  Duplicate the `src/main/webapp/i18/en` folder to `src/main/webapp/i18/new_lang` (this is where all the front-end translations are stored)
2.  Translate all files under the folder `src/main/webapp/i18/new_lang`
3.  Add the language code `new_lang` to the `languages` variable defined in `src/main/webapp/app/shared/language/find-language-from-key-pipe.ts`

        private languages: { [key: string]: { name: string; rtl?: boolean } } = {
            en: { name: 'English' },
            new_lang: { name: 'New Language' }
            // jhipster-needle-i18n-language-key-pipe - JHipster will add/remove languages in this object
        };

4.  In the `src/main/resources/i18n` folder, copy the `messages_en.properties` file to `messages_new_lang.properties` (this is where the server-side translations are stored)
5.  Translate all keys in the `messages_new_lang.properties` file
6.  Add the new language bundling to `webpack/webpack.common.js`

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

If you would like to contribute a new language to the generator follow steps below;

- Add the language to the `LANGUAGES` constant in [`generators/gnerator-constants.js`](https://github.com/jhipster/generator-jhipster/blob/master/generators/generator-constants.js)

        { name: 'New Language', dispName: 'New Language', value: 'nl' }

- Duplicate the file [`generators/languages/templates/src/main/resources/i18n/messages_en.properties.ejs`](https://github.com/jhipster/generator-jhipster/blob/master/generators/languages/templates/src/main/resources/i18n/messages_en.properties.ejs) to `generators/languages/templates/src/main/resources/i18n/messages_nl.properties.ejs` and translate all the values to the new language.   

- Duplicate the folder [`generators/languages/templates/src/main/webapp/i18n/en`](https://github.com/jhipster/generator-jhipster/tree/master/generators/languages/templates/src/main/webapp/i18n/en) to `generators/languages/templates/src/main/webapp/i18n/nl` and translate all the files inside it. 

- Duplicate the file [`generators/entity-i18n/templates/i18n/entity_en.json.ejs`](https://github.com/jhipster/generator-jhipster/blob/master/generators/entity-i18n/templates/i18n/entity_en.json.ejs) to `generators/entity-i18n/templates/i18n/entity_nl.json.ejs` and translate all the values within it.

- Duplicate the file [`generators/languages/templates/src/test/resources/i18n/messages_en.properties.ejs`](https://github.com/jhipster/generator-jhipster/blob/master/generators/server/templates/src/test/resources/i18n/messages_en.properties.ejs) to `generators/languages/templates/src/test/resources/i18n/messages_nl.properties.ejs` and translate all the values within it.

- Add the language value `nl` to the `language` array in [`test/templates/all-languages/.yo-rc.json`](https://github.com/jhipster/generator-jhipster/blob/master/test/templates/all-languages/.yo-rc.json).

Submit a PR with all these changes.

## How to remove an existing language?

Here are the steps to remove a language called `old_lang`:

1.  Remove the language folder from `src/main/webapp/i18/old_lang`
2.  Remove the constant entry in `src/main/webapp/app/shared/language/language.constants.ts` and `webpack/webpack.common.js`
3.  Remove the `src/main/resources/i18n/messages_old_lang.properties` file
