---
layout: default
title: Conseils de mise à niveau vers JHipster v7
sitemap:
priority: 0.1
lastmod: 2020-12-19T08:30:00-00:00
---

# Conseils de mise à niveau vers JHipster v7

**Astuce soumise par [@kaidohallik](https://github.com/kaidohallik)**

## **Prettier pour HTML**

Nous avons activé Prettier pour HTML. Vous pouvez exécuter Prettier avec HTML activé avant de mettre à niveau et valider les modifications dans Git pour voir les véritables changements dans les fichiers HTML après la mise à niveau.

## **Changement de directive de traduction dans le client Angular**

Nous avons déplacé la directive `jhiTranslate` de [ng-jhipster](https://github.com/jhipster/ng-jhipster/blob/main/src/language/jhi-translate.directive.ts) vers l'application générée. Si vous avez un `jhiPrefix` différent de `jhi`, vous pouvez remplacer tous les `jhiTranslate` par `yourprefixTranslate` et valider les changements dans Git avant la mise à niveau pour réduire les modifications affichées après la mise à niveau.

## **Fichiers renommés dans le client Angular**

Dans le client Angular, de nombreux fichiers ont été renommés et les tests ont été déplacés à côté des fichiers qu'ils testent.

Dans la page des instructions de [mise à niveau manuelle]({{ site.url }}/upgrading-an-application/#manual_upgrade), il y a une section **Conseils sur les fichiers renommés** - cela peut aider à la mise à niveau.

Si le conseil précédent n'a pas donné un résultat satisfaisant, vous pouvez effectuer les étapes suivantes avant la mise à niveau :
* Déplacer les fichiers renommés vers leur emplacement final
* Valider les modifications après cela


### Script NodeJS d'aide pour déplacer les fichiers d'entité
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

### Script NodeJS d'aide pour déplacer les fichiers principaux
```node
const fs = require('fs');
const path = require('path');

// from test files only jest.conf is included in this files move script
moveMainFilesToV7Location = function (appDir) {
  this.appDir = appDir;
  renameFile('account/password/password-strength-bar.component.ts', 'account/password/password-strength-bar/password-strength-bar.component.ts');
  renameFile('account/password/password-strength-bar.scss', 'account/password/password-strength-bar/password-strength-bar.component.scss');
  renameFile('admin/docs/docs.scss', 'admin/docs/docs.component.scss');
  renameFile('admin/health/health-modal.component.ts', 'admin/health/modal/health-modal.component.ts');
  renameFile('admin/health/health-modal.component.html', 'admin/health/modal/health-modal.component.html');
  renameFile('admin/user-management/user-management-delete-dialog.component.ts', 'admin/user-management/delete/user-management-delete-dialog.component.ts');
  renameFile('admin/user-management/user-management-delete-dialog.component.html', 'admin/user-management/delete/user-management-delete-dialog.component.html');
  renameFile('admin/user-management/user-management-detail.component.ts', 'admin/user-management/detail/user-management-detail.component.ts');
  renameFile('admin/user-management/user-management-detail.component.html', 'admin/user-management/detail/user-management-detail.component.html');
  renameFile('admin/user-management/user-management-update.component.ts', 'admin/user-management/update/user-management-update.component.ts');
  renameFile('admin/user-management/user-management-update.component.html', 'admin/user-management/update/user-management-update.component.html');
  renameFile('admin/user-management/user-management.component.ts', 'admin/user-management/list/user-management.component.ts');
  renameFile('admin/user-management/user-management.component.html', 'admin/user-management/list/user-management.component.html');
  renameFile('blocks/config/uib-pagination.config.ts', 'config/uib-pagination.config.ts');
  renameFile('blocks/interceptor/auth-expired.interceptor.ts', 'core/interceptor/auth-expired.interceptor.ts');
  renameFile('blocks/interceptor/auth.interceptor.ts', 'core/interceptor/auth.interceptor.ts');
  renameFile('blocks/interceptor/errorhandler.interceptor.ts', 'core/interceptor/error-handler.interceptor.ts');
  renameFile('blocks/interceptor/notification.interceptor.ts', 'core/interceptor/notification.interceptor.ts');
  renameFile('core/auth/user-route-access-service.ts', 'core/auth/user-route-access.service.ts');
  renameFile('core/icons/font-awesome-icons.ts', 'config/font-awesome-icons.ts');
  renameFile('core/login/login.model.ts', 'login/login.model.ts');
  renameFile('core/login/login.service.ts', 'login/login.service.ts');
  renameFile('core/login/logout.model.ts', 'login/logout.model.ts');
  renameFile('core/language/language.constants.ts', 'config/language.constants.ts');
  renameFile('entities/entity.module.ts', 'entities/entity-routing.module.ts');
  renameFile('home/home.scss', 'home/home.component.scss');
  renameFile('layouts/navbar/navbar.scss', 'layouts/navbar/navbar.component.scss');
  renameFile('layouts/profiles/page-ribbon.scss', 'layouts/profiles/page-ribbon.component.scss');
  renameFile('shared/constants/authority.constants.ts', 'config/authority.constants.ts');
  renameFile('shared/constants/error.constants.ts', 'config/error.constants.ts');
  renameFile('shared/constants/input.constants.ts', 'config/input.constants.ts');
  renameFile('shared/constants/pagination.constants.ts', 'config/pagination.constants.ts');
  renameFile('shared/login/login.component.ts', 'login/login.component.ts');
  renameFile('shared/login/login.component.html', 'login/login.component.html');
  renameFile('shared/util/datepicker-adapter.ts', 'config/datepicker-adapter.ts');
  renameFile('shared/util/request-util.ts', 'core/request/request-util.ts');
  renameFile('app.main.ts', '../main.ts')
  renameFile('polyfills.ts', '../polyfills.ts')
  renameFile('../../../test/javascript/jest.conf.js', '../../../../jest.conf.js');

  // if you are using version greater than 7.0.0-beta.0 (generator-jhipster main branch or newer release)
  // then you may want to uncomment lines below
  //renameFile('core/user/account.model.ts', 'core/auth/account.model.ts');
  //renameFile('core/user/user.model.ts', 'entities/user/user.model.ts', true);
  //renameFile('core/user/user.service.ts', 'entities/user/user.service.ts', true);
  //renameFile('core/user/user.model.ts', 'admin/user-management/user-management.model.ts');
  //renameFile('core/user/user.service.ts', 'admin/user-management/service/user-management.service.ts');
}

renameFile = function (source, destination, copyOnly) {
  const srcDir = 'src/main/webapp/app';
  const oldFile = path.join(this.appDir, srcDir, source);
  if (fs.existsSync(oldFile)) {
    const newFile = path.join(this.appDir, srcDir, destination);
    const destinationFolder = path.dirname(newFile);
    if (!fs.existsSync(destinationFolder)) {
      console.log(`creating folder ${destinationFolder}`);
      fs.mkdirSync(destinationFolder);
    }
    if (copyOnly) {
      console.log(`copying ${oldFile} to ${newFile}`);
      fs.copyFileSync(oldFile, newFile);
    } else {
      console.log(`moving ${oldFile} to ${newFile}`);
      fs.renameSync(oldFile, newFile);
    }
  }
}

// change 'appPath' to your application path
moveMainFilesToV7Location('appPath');

// alternative usage with commandline parameter: node move-angular-main-files-to-jhipster-v7-location.js 'appPath'
// const folder = process.argv[2];
// console.log(`Processing folder ${folder}`);
// moveMainFilesToV7Location(folder);
```

### Script d'aide pour copier les tests à côté des fichiers qu'ils testent

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
        // if destination folder doesn't exist in sources folder then throw error
        // those cases need to be handled manually
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
