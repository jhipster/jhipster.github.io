---
layout: default
title:  Améliorer l'expérience des développeurs en ouvrant uniquement le front-end dans l'IDE
sitemap:
priority: 0.1
lastmod: 2019-10-14T12:35:00-00:00
---

# Améliorer l'expérience des développeurs en ouvrant uniquement le front-end dans l'IDE

**Astuce soumise par [@kaidohallik](https://github.com/kaidohallik)**

Le comportement suivant se produit au moins dans Visual Studio Code.

Si vous générez une application full stack (sans ignorer le serveur ni le client) et que le développeur front-end veut voir le moins de fichiers possible et ouvre uniquement le dossier `src/main/webapp/app` dans l'IDE, alors l'IDE ne reconnaît pas les imports commençant par `app`. Ces imports sont en rouge et le développeur ne peut pas voir le contenu de ces classes importées et ne peut pas y accéder en un clic. Le chemin `app` est défini dans le fichier `tsconfig.json` qui se trouve dans le dossier racine de l'application générée et donc cette information manque si on ouvre un sous-dossier.

## Solution possible 1

Ajoutez le fichier `src/main/webapp/app/tsconfig.json` avec le contenu suivant :

```
{
    "extends": "../../../../tsconfig.json"
}
```
Et pour les tests, ajoutez le fichier `src/test/javascript/spec/tsconfig.json` avec le même contenu :
```
{
    "extends": "../../../../tsconfig.json"
}
```
Après cela, Visual Studio Code résout le chemin `app`  si vous ouvrez uniquement le dossier  `src/main/webapp/app` ou `src/test/javascript/spec`.

## Solution possible 2

* Ajoutez un script node `remove-import-alias.js` au dossier racine de l'application qui remplace les alias d'importation par des chemins relatifs :

```
const fs = require('fs');

removeImportAlias = function(dir, level, additionalPath) {
  fs.readdirSync(dir).forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory()) {
      removeImportAlias(dir + file + '/', level + 1, additionalPath);
    } else if (file.endsWith('.ts')) {
      fs.readFile(dir + file, 'utf8', function (err, content) {
        if (err) {
          console.log(err);
        } else {
          let path = '../'.repeat(level);
          if (additionalPath) {
            path += additionalPath;
          }
          if (!path) {
            path = './';
          }
          const newContent = content.replace(/import \{ (.*) \} from 'app\/(.*)';/g, `import { $1 } from '${path}$2';`);
          fs.writeFile(dir + file, newContent, 'utf8', function (err) {
            if (err) {
              console.log(err);
            }
          });
        }
      });
    }
  });
};

removeImportAlias(`./src/main/webapp/app/`, 0);
removeImportAlias(`./src/test/javascript/spec/`, 0, '../../../main/webapp/app/');
```

* Ajoutez `remove-import-alias.js` à `.eslintignore`

* Exécutez le script ajouté : `node remove-import-alias.js`

* Supprimez `app/*` du fichier `tsconfig.json` de la section  `compilerOptions.paths`
