---
layout: default
title: Installation de nouvelles langues
permalink: /installing-new-languages/
redirect_from:
  - /installing_new_languages.html
sitemap:
    priority: 0.7
    lastmod: 2014-12-10T00:00:00-00:00
---

# <i class="fa fa-flag"></i> Internationalisation

## Introduction

Lors de la génération d'un nouveau projet, vous serez invité à activer ou non la prise en charge de l'internationalisation.

Si vous l'activez, vous devrez sélectionner la langue native de votre application. Ensuite, vous pourrez choisir les langues supplémentaires que vous souhaitez installer. Si vous ne souhaitez pas prendre en charge d'autres langues dès le départ, vous pouvez toujours ajouter des langues ultérieurement en exécutant le sous-générateur de langue.

Si vous êtes sûr de ne jamais traduire cette application dans une autre langue, vous ne devez pas activer l'internationalisation.

## Langues prises en charge

Voici les langues actuellement prises en charge

*   Albanais
*   Arabe (Libye)
*   Arménien
*   Biélorusse
*   Bengali
*   Bulgare
*   Catalan
*   Chinois (Simplifié)
*   Chinois (Traditionnel)
*   Tchèque 
*   Danois 
*   Néerlandais 
*   Anglais 
*   Estonien 
*   Persan
*   Finnois 
*   Français 
*   Galicien 
*   Allemand 
*   Grec 
*   Hindi 
*   Hongrois 
*   Indonésien
*   Italien 
*   Japonais 
*   Coréen 
*   Marathi 
*   Birman 
*   Polonais 
*   Portugais (Brésilien)
*   Portugais 
*   Pendjabi
*   Roumain 
*   Russe 
*   Slovaque 
*   Serbe
*   Cinghalais 
*   Espagnol 
*   Suédois 
*   Turc 
*   Tamoul 
*   Télougou 
*   Thaï 
*   Ukrainien
*   Ouzbek (Cyrillique)
*   Ouzbek (Latin)
*   Vietnamien 

_Votre langue est absente de JHipster ? Aidez-nous à améliorer le projet avec une pull request (PR) !_

## Comment ajouter des langues après la génération du projet ?

Pour ce faire, vous pouvez exécuter le sous-générateur de langues avec :

`jhipster languages`

![]({{ site.url }}/images/install_new_languages.png)

Notez que vous devrez régénérer vos entités si vous souhaitez les traduire dans la langue que vous avez ajoutée.

## Comment ajouter une nouvelle langue qui n'est pas prise en charge ?

Toutes les langues sont enregistrées dans le dossier `src/main/webapp/i18n` (côté client) et `src/main/resources/i18n` (côté serveur)

Voici les étapes pour installer une nouvelle langue appelée `new_lang` :

1.  Dupliquez le dossier `src/main/webapp/i18/en` vers `src/main/webapp/i18/new_lang` (c'est là que toutes les traductions côté client sont stockées)
2.  Traduisez tous les fichiers sous le dossier `src/main/webapp/i18/new_lang`
3.  Ajoutez le code de langue `new_lang` à la variable `languages` définie dans `src/main/webapp/app/shared/language/find-language-from-key-pipe.ts`

        private languages: { [key: string]: { name: string; rtl?: boolean } } = {
            en: { name: 'English' },
            new_lang: { name: 'New Language' }
            // jhipster-needle-i18n-language-key-pipe - JHipster ajoutera/supprimera des langues dans cet objet
        };

4.  Dans le dossier `src/main/resources/i18n`, copiez le fichier `messages_en.properties` vers `messages_new_lang.properties` (c'est là que les traductions côté serveur sont stockées)
5.  Traduisez toutes les clés dans le fichier `messages_new_lang.properties`
6.  Ajoutez le regroupement de la nouvelle langue à `webpack/webpack.common.js`

        new MergeJsonWebpackPlugin({
            output: {
                groupBy: [
                    { pattern: "./src/main/webapp/i18n/en/*.json", fileName: "./i18n/en.json" },
                    { pattern: "./src/main/webapp/i18n/new_lang/*.json", fileName: "./i18n/new_lang.json" }
                    // jhipster-needle-i18n-language-webpack - JHipster ajoutera/supprimera des langues dans ce tableau
                ]
            }
        })

La nouvelle langue `new_lang` est désormais disponible dans le menu des langues, et elle est disponible à la fois dans l'application Angular côté client et dans l'application Spring côté serveur.

### Contribution de la langue au générateur JHipster

Si vous souhaitez contribuer une nouvelle langue au générateur, suivez les étapes ci-dessous :

- Ajoutez la langue à la constante `LANGUAGES` dans [`generators/generator-constants.js`](https://github.com/jhipster/generator-jhipster/blob/main/generators/generator-constants.js)

        { name: 'New Language', dispName: 'New Language', value: 'nl' }

- Dupliquez le fichier [`generators/languages/templates/src/main/resources/i18n/messages_en.properties.ejs`](https://github.com/jhipster/generator-jhipster/blob/main/generators/languages/templates/src/main/resources/i18n/messages_en.properties.ejs) vers `generators/languages/templates/src/main/resources/i18n/messages_nl.properties.ejs` et traduisez toutes les valeurs vers la nouvelle langue.   

- Dupliquez le dossier [`generators/languages/templates/src/main/webapp/i18n/en`](https://github.com/jhipster/generator-jhipster/tree/main/generators/languages/templates/src/main/webapp/i18n/en) vers `generators/languages/templates/src/main/webapp/i18n/nl` et traduisez tous les fichiers à l'intérieur.

- Dupliquez le fichier [`generators/entity-i18n/templates/i18n/entity_en.json.ejs`](https://github.com/jhipster/generator-jhipster/blob/main/generators/entity-i18n/templates/i18n/entity_en.json.ejs) vers `generators/entity-i18n/templates/i18n/entity_nl.json.ejs` et traduisez toutes les valeurs à l'intérieur.

- Dupliquez le fichier [`generators/languages/templates/src/test/resources/i18n/messages_en.properties.ejs`](https://github.com/jhipster/generator-jhipster/blob/main/generators/server/templates/src/test/resources/i18n/messages_en.properties.ejs) vers `generators/languages/templates/src/test/resources/i18n/messages_nl.properties.ejs` et traduisez toutes les valeurs à l'intérieur.

- Ajoutez la valeur de langue `nl` au tableau `language` dans [`test/templates/all-languages/.yo-rc.json`](https://github.com/jhipster/generator-jhipster/blob/main/test/templates/all-languages/.yo-rc.json).

Soumettez une PR avec toutes ces modifications.

## Comment supprimer une langue existante ?

Voici les étapes pour supprimer une langue appelée `old_lang` :

1.  Supprimez le dossier de langue entier de `src/main/webapp/i18/old_lang`
2.  Supprimez l'entrée constante pour `LANGUAGES` dans `src/main/webapp/app/core/language/language.constants.ts`
3.  Supprimez l'entrée constante pour `languages` dans `src/main/webapp/app/shared/language/find-language-from-key.pipe.ts`
4.  Supprimez l'entrée constante pour `localesToKeep` dans `webpack/webpack.prod.js` 
5.  Supprimez le modèle pour `MergeJsonWebpackPlugin` dans `webpack/webpack.common.js` 
6.  Supprimez le fichier `src/main/resources/i18n/messages_old_lang.properties`
7.  Supprimez le fichier `src/test/resources/i18n/messages_old_lang.properties`
