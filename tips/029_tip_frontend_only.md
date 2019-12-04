---
layout: default
title: Improve developer experience if opening only front end in the IDE
sitemap:
priority: 0.1
lastmod: 2019-10-14T12:35:00-00:00
---

# Improve developer experience if opening only front end in the IDE

**Tip submitted by [@kaidohallik](https://github.com/kaidohallik)**

The following behaviour occurs at least in Visual Studio Code.

If generating a full stack app (not skipping server nor client) and front end developer wants to see as few files as possible and opens only folder `src/main/webapp/app` in the IDE then IDE doesn't recognize imports starting with `app`. These imports are red and developer can't see these imported classes content and can't jump with one click into these imported classes. Path `app` is defined in the `tsconfig.json` file which is located in the root folder of the generated app and therefore this information is missing if opening some subfolder.

## Possible solution 1

Add file `src/main/webapp/app/tsconfig.json` with the following content:
```
{
    "extends": "../../../../tsconfig.json"
}
```
And for tests add file `src/test/javascript/spec/tsconfig.json` with the same content:
```
{
    "extends": "../../../../tsconfig.json"
}
```
After that Visual Studio Code resolves path `app` if opening only folder `src/main/webapp/app` or `src/test/javascript/spec`.

## Possible solution 2

* add node script `remove-import-alias.js` to app root folder which replaces import aliases with relative paths:

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

* add `remove-import-alias.js` to `.eslintignore`

* run added script: `node remove-import-alias.js`

* delete `app/*` from the file `tsconfig.json` from the section `compilerOptions.paths`
