---
layout: default
title: JHipster v7 upgrade tips
sitemap:
priority: 0.1
lastmod: 2020-12-19T08:30:00-00:00
---

# JHipster v7 upgrade tips

**Tip submitted by [@kaidohallik](https://github.com/kaidohallik)**

## **Prettier for HTML**

We have enabled Prettier for HTML. You can run Prettier with html enabled before upgrading and commit changes to Git to see real changes in HTML files after upgrade.

## **Files renamed in Angular client**

In Angular client a lot of files renamed and tests moved next to files they are testing.

In [manual upgrade]({{ site.url }}/upgrading-an-application/#manual_upgrade) instructions page is section **Hints about renamed files** - this can help in upgrading.

If the previous hint did not give a satisfactory result then you can do before upgrade:
* move renamed files to their final location
* commit changes after that

### Helper node script for moving entity files
```node
const fs = require('fs');
const path = require('path');

moveEntityFilesToV7Location = function (appDir) {
  const entityConfigDir = path.join(appDir, '.jhipster');
  fs
    .readdirSync(entityConfigDir)
    .filter(fn => fn.endsWith('.json'))
    .forEach(fn => {
      console.log(`\nProcessing ${fn}`);
      const entity = JSON.parse(fs.readFileSync(path.join(entityConfigDir, fn), 'utf8'));
      let entityFileName = kebabCase(entity.name);
      const entityClientRootFolder = entity.clientRootFolder || '';
      if (entity.angularJSSuffix) {
        entityFileName = `${entityFileName}-${kebabCase(entity.angularJSSuffix)}`;
      }
      const entityFolder = path.join(appDir, 'src/main/webapp/app/entities', entityClientRootFolder, entityFileName);
      const entityTestFolder = path.join(appDir, 'src/test/javascript/spec/app/entities', entityClientRootFolder, entityFileName);
      const entityModelFolder = path.join(appDir, 'src/main/webapp/app/shared/model', entityClientRootFolder);
      // move main files
      renameFile(entityFolder, `${entityFileName}.component.ts`, 'list');
      renameFile(entityFolder, `${entityFileName}.component.html`, 'list');
      renameFile(entityFolder, `${entityFileName}-delete-dialog.component.ts`, 'delete');
      renameFile(entityFolder, `${entityFileName}-delete-dialog.component.html`, 'delete');
      renameFile(entityFolder, `${entityFileName}-detail.component.ts`, 'detail');
      renameFile(entityFolder, `${entityFileName}-detail.component.html`, 'detail');
      renameFile(entityFolder, `${entityFileName}-update.component.ts`, 'update');
      renameFile(entityFolder, `${entityFileName}-update.component.html`, 'update');
      renameFile(entityFolder, `${entityFileName}.service.ts`, 'service');
      // route folder and file name both changed
      renameFile(entityFolder, `${entityFileName}.route.ts`, 'route', undefined, `${entityFileName}-routing.module.ts`);
      // model is moved from shared
      renameFile(entityFolder, `${entityFileName}.model.ts`, '', entityModelFolder);
      // move test files
      renameFile(entityFolder, `${entityFileName}.component.spec.ts`, 'list', entityTestFolder);
      renameFile(entityFolder, `${entityFileName}-delete-dialog.component.spec.ts`, 'delete', entityTestFolder);
      renameFile(entityFolder, `${entityFileName}-detail.component.spec.ts`, 'detail', entityTestFolder);
      renameFile(entityFolder, `${entityFileName}-update.component.spec.ts`, 'update', entityTestFolder);
      renameFile(entityFolder, `${entityFileName}.service.spec.ts`, 'service', entityTestFolder);
    });
}

renameFile = function (entityFolder, fileName, destinationFolderName, entityFromFolder, newFileName) {
  const oldFile = path.join(entityFromFolder || entityFolder, fileName);
  console.log(oldFile);
  if (fs.existsSync(oldFile)) {
    const destinationFolder = path.join(entityFolder, destinationFolderName);
    if (!fs.existsSync(destinationFolder)) {
      console.log(`creating folder ${destinationFolder}`);
      fs.mkdirSync(destinationFolder);
    }
    const newFile = path.join(destinationFolder, newFileName || fileName);
    console.log(`moving ${oldFile} to ${newFile}`);
    fs.renameSync(oldFile, newFile);
  }
}

kebabCase = function (str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// change 'appPath' to your application path
moveEntityFilesToV7Location('appPath');

// alternative usage with commandline parameter: node move-angular-entity-files-to-jhipster-v7-location.js appPath
// const folder = process.argv[2];
// console.log(`Processing folder ${folder}`);
// moveEntityFilesToV7Location(folder);
```

### Helper script to copy tests next to files they test

```node
const fs = require('fs');
const path = require('path');

moveTestsNextToFilesTheyTest = function(appDir) {
  copyFiles(path.join(appDir, 'src/test/javascript/spec/app'), path.join(appDir, 'src/main/webapp/app'));
}

copyFiles = function(sourceDir, destinationDir) {
  fs.readdirSync(sourceDir).forEach(function(file) {
    const sourceFileWithPath = path.join(sourceDir, file);
    const destinationFileWithPath = path.join(destinationDir, file);
    if (fs.statSync(sourceFileWithPath).isDirectory()) {
      copyFiles(sourceFileWithPath, destinationFileWithPath);
    } else {
      fs.copyFile(sourceFileWithPath, destinationFileWithPath, (err) => {
        if (err) {
          throw err;
        }
        console.log(`${sourceFileWithPath} was copied to ${destinationFileWithPath}`);
      });
    }
  });
};

// change 'appPath' to your application path
moveTestsNextToFilesTheyTest('appPath');

// alternative usage with commandline parameter: node move-tests-next-to-files-they-test.js appPath
// const folder = process.argv[2];
// console.log(`Processing folder ${folder}`);
// moveTestsNextToFilesTheyTest(folder);
```
