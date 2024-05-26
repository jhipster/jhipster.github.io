---
layout: default
title: Exécuter les tests e2e Protractor dans IntelliJ IDEA
sitemap:
priority: 0.1
lastmod: 2018-04-14T03:57:00-00:00
---

# Exécuter les tests e2e Protractor dans IntelliJ IDEA

**Astuce proposée par [@SudharakaP](https://github.com/SudharakaP) et [@yelhouti](https://github.com/yelhouti)**

TCette astuce s'applique à JHipster v6.8.0 ou supérieur. Par défaut, un projet JHipster aura la fonction `beforeLanuch` 
suivante dans le fichier de configuration Protractor (`src/test/javascript/protractor.conf.js`). 

```js
beforeLaunch: function() {
    require('ts-node').register({
        project: 'tsconfig.e2e.json'
    });
}
``` 

Cela fonctionnera correctement si les tests Protractor sont exécutés en exécutant `npm run e2e` dans le dossier racine du projet.

Cependant, IntelliJ Ultimate prend également en charge [l'exécution de tests Protractor dans l'IDE](https://www.jetbrains.com/help/idea/protractor.html#ws_protractor_running). 
Si vous souhaitez utiliser cette méthode, vous devrez modifier la fonction `beforeLanuch` comme indiqué ci-dessous :

```js
beforeLaunch: function() {
    require('ts-node').register({
        project: '../../../tsconfig.e2e.json'
    });
}
``` 
afin qu'IntelliJ sache où trouver le fichier `tsconfig.e2e.json`. 

Notez qu'après avoir modifié le fichier`protractor.conf.js` comme indiqué ci-dessus, la commande, `npm run e2e` ne fonctionnera plus. Vous devrez donc annuler les modifications si vous prévoyez d'utiliser à nouveau les tests e2e via npm.