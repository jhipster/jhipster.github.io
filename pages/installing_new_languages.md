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

*   Catalan
*   Chinese (Simplified)
*   Chinese (Traditional)
*   Danish
*   English
*   French
*   Galician
*   German
*   Greek
*   Hindi
*   Italian
*   Japanese
*   Hindi
*   Hungarian
*   Korean
*   Marathi
*   Netherlands
*   Polish
*   Portuguese
*   Portuguese (Brazilian)
*   Russian
*   Romanian
*   Serbian
*   Spanish
*   Swedish
*   Tamil
*   Turkish
*   Vietnamese

_Your language is missing in JHipster? Help us improve the project with a PR!_

## How to add languages after project generation?

To do this you can run the languages sub-generator with:

`yo jhipster:languages`

![]({{ site.url }}/images/install_new_languages.png)

Note that you will need to regenerate your entities if you would like to have them translated in the language you just added.

## How to add a new language that is not supported?

All languages are saved in the folder `src/main/webapp/i18n` (client side) and `src/main/resources/i18n` (server side)

Here are the steps to install a new language called `new_lang`:

1.  Duplicate the `src/main/webapp/i18/en` folder to `src/main/webapp/i18/new_lang` (this is where all the front-end translations are stored)
2.  Translate all files under the folder `src/main/webapp/i18/new_lang`
3.  Add the languege code `new_lang` to the `LANGUAGES` constant defined in `src/main/webapp/app/components/language/language.constants.js`

        .constant('LANGUAGES', [
            'en',
            'fr',
            'new_lang'
            // jhipster-needle-i18n-language-constant - JHipster will add/remove languages in this array
        ]

4.  In the `src/main/resources/i18n` folder, copy the `messages_en.properties` file to `messages_new_lang.properties` (this is where the server-side translations are stored)
5.  Translate all keys in the `messages_new_lang.properties` file
6.  Add the new language's name in the function of `filter('findLanguageFromKey')` in the `src/main/webapp/app/components/language/language.filter.js` file

        function findLanguageFromKeyFilter(lang) {
            return {
                'ca': 'Català',
                'da': 'Dansk',
                'de': 'Deutsch',
                'el': 'Ελληνικά',
                'en': 'English',
                'es': 'Español',
                'fr': 'Français',
                'gl': 'Galego',
                'hu': 'Magyar',
                'hi': 'हिंदी',
                'it': 'Italiano',
                'ja': '日本語',
                'ko': '한국어',
                'mr': 'मराठी',
                'nl': 'Nederlands',
                'pl': 'Polski',
                'pt-br': 'Português (Brasil)',
                'pt-pt': 'Português',
                'ro': 'Română',
                'ru': 'Русский',
                'sk': 'Slovenský',
                'sr': 'Srpski',
                'sv': 'Svenska',
                'ta': 'தமிழ்',
                'tr': 'Türkçe',
                'vi': 'Tiếng Việt',
                'zh-cn': '中文（简体）',
                'zh-tw': '繁體中文'
            }[lang];
        }

The new language `new_lang` is now available in the language menu, and it is available both in the front-end Angular application and in the back-end Spring application.

## How to remove an existing language?

Here are the steps to remove a language called `old_lang`:

1.  Remove the language folder from `src/main/webapp/i18/old_lang`
2.  Remove the constant entry in `src/main/webapp/app/components/language/language.constants.js`
3.  Remove the `src/main/resources/i18n/messages_old_lang.properties` file
