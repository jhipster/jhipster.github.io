---
layout: default
title:  Principes de base des Blueprint
permalink: /modules/extending-and-customizing/
redirect_from:
  - /extending_and_customizing.html
  - /modules/extending_and_customizing.html
sitemap:
    priority: 0.7
    lastmod: 2015-12-05T18:40:00-00:00
---

# <i class="fa fa-cube"></i> Principes de base des Blueprint

JHipster prend en charge les `plugins`, que nous appelons `blueprints` et `modules`.

Avant la version 7.9.0 de JHipster, les `modules` étaient des générateurs Yeoman exécutés à l'aide de `yo`, étendaient la classe `generator-base` de `generators-jhipster`, et enregistraient des hooks pour s'intégrer dans le flux de travail de JHipster.

Depuis la version 7.9.0 de JHipster, les `modules` sont des `blueprints` avec des générateurs autonomes (non blueprintés) et une CLI personnalisée.
Nous les désignerons désormais sous le nom de blueprints autonomes (ou simplement blueprints).

## Règles de base pour un blueprint JHipster

Les blueprints JHipster :

- sont des packages NPM et des générateurs Yeoman.
- suivent une extension des règles de Yeoman répertoriées à [https://yeoman.io/authoring/index.html](https://yeoman.io/authoring/index.html). Au lieu d'être préfixés par `generator-`, ils sont préfixés par `generator-jhipster-`, et au lieu d'avoir seulement le mot-clé `yeoman-generator`, ils doivent avoir 2 mots-clés, `yeoman-generator` et `jhipster-blueprint`.

## Utilisation

Pour utiliser un blueprint, exécutez la commande ci-dessous

```bash
jhipster --blueprints <nom du blueprint>
```

Ou utilisez la CLI fournie personnalisée :

```bash
jhipster-my-blueprint
```

## Exemples

JHipster propose de nombreux blueprints officiels, voici quelques exemples :

- Backend
  - Le blueprint [JHipster Kotlin](https://github.com/jhipster/jhipster-kotlin)  replaces most of the server side Java code with equivalent Kotlin code.
  - Le blueprint [JHipster.NET](https://github.com/jhipster/jhipster-dotnetcore)  replaces the entire server side with .NET implementation.
  - Le blueprint [JHipster NodeJS](https://github.com/jhipster/generator-jhipster-nodejs)  replaces the entire server side with NestJS implementation.
- Backend Customization
  - Le blueprint [JHipster Native](https://github.com/jhipster/generator-jhipster-native)  customizes JHipster applications with Spring Native compatibility.
- Frontend
  - Le blueprint [Svelte Hipster](https://github.com/jhipster/generator-jhipster-svelte)  replaces the entire client side with Svelte implementation.
- Mobile
  - Le blueprint [JHipster Ionic](https://github.com/jhipster/generator-jhipster-ionic)  generates an Ionic application.

## Blueprint côte-à-côte

Chaque générateur peut être un blueprint côte-à-côte (SBS). Un blueprint SBS ne modifie pas le comportement du générateur original, mais peut personnaliser le comportement et le résultat.
Un blueprint SBS facilite la prise en charge de plusieurs versions de JHipster et la portabilité vers une nouvelle version de JHipster.

Pour rendre le générateur côte-à-côte, ajoutez ceci au constructeur :

```js
this.sbsBlueprint = true;
```

Exemple: [générateur serveur au blueprint Native](https://github.com/jhipster/generator-jhipster-native/blob/bb9c042f6bc70a26ba8037e951c93dc1d1820983/generators/server/generator.mjs#L17).
Dans l'exemple, le générateur [personnalise package.json](https://github.com/jhipster/generator-jhipster-native/blob/bb9c042f6bc70a26ba8037e951c93dc1d1820983/generators/server/generator.mjs#L26-L35), [supprime des fichiers](https://github.com/jhipster/generator-jhipster-native/blob/bb9c042f6bc70a26ba8037e951c93dc1d1820983/generators/server/generator.mjs#L37-L40), [personnalise pom.xml](https://github.com/jhipster/generator-jhipster-native/blob/bb9c042f6bc70a26ba8037e951c93dc1d1820983/generators/server/generator.mjs#L42-L186), [personnalise les fichiers Java](https://github.com/jhipster/generator-jhipster-native/blob/bb9c042f6bc70a26ba8037e951c93dc1d1820983/generators/server/generator.mjs#L211-L307), [personnalise Cypress](https://github.com/jhipster/generator-jhipster-native/blob/bb9c042f6bc70a26ba8037e951c93dc1d1820983/generators/server/generator.mjs#L321-L329), et ainsi de suite.

Un blueprint côte-à-côte peut être utilisé pour créer des hooks et aider à migrer un module existant. Cela est couvert dans [Création d'un module](/modules/creating-a-module).

## CLI personnalisée

Les blueprints autonomes peuvent être exécutés à l'aide de `yo`, mais `yo` est agressif dans la découverte des générateurs, ce qui peut être lent, et il manque certaines améliorations. La CLI JHipster fournit de l'aide et une intégration à JHipster.
Par conséquent, nous recommandons d'utiliser la CLI `jhipster` ou de créer une CLI personnalisée basée sur `generator-jhipster`.

La commande `jhipster` exécute la version `generator-jhipster` que vous avez installée globalement. Une CLI personnalisée exécutera le `generator-jhipster` dépendant et s'assurera d'utiliser la version `generator-jhipster` prise en charge.

Une CLI personnalisée vous permet d'exécuter un générateur personnalisé et est couverte dans [Création d'un module](/modules/creating-a-module).

## Blueprint local

Une application peut être maintenue plus facilement à jour lorsque les personnalisations sont générées par JHipster. Un blueprint local est implémenté dans ce but.

Le blueprint entier est implémenté à l'intérieur du répertoire `.blueprint` de l'application.

Certains avantages :
- évite ou réduit les conflits lors de la régénération et de la mise à niveau.
- permet de modifier en masse les fichiers d'entités.
- n'a pas besoin d'être publié dans un dépôt npm.
- contrôle total du flux de travail de JHipster.
- facilement généré avec une seule commande.

## Développement et API publique

Nous manquons toujours de documentation API JSDoc publiée, vous devrez donc vous référer au code source.

## Configuration de l'application :

La configuration de JHipster suit le modèle de [configuration Yeoman](https://yeoman.io/authoring/storage.html) et fournit un support supplémentaire pour la configuration des blueprints.

Les propriétés `config` et `jhipsterConfig` stockent la configuration commune et écrivent dans la clé `generator-jhipster` du fichier `.yo-rc.json`.
Les propriétés `blueprintStorage` et `blueprintConfig` stockent la configuration spécifique au blueprint et écrivent dans la clé `generator-jhipster-(mon-blueprint)` du fichier `.yo-rc.json`.

Les `config` et `blueprintStorage` sont des [instances de Stockage](https://yeoman.github.io/generator/Storage.html), tandis que `jhipsterConfig` et `blueprintConfig` sont des [objets proxy](https://yeoman.github.io/generator/Storage.html#createProxy) pour les stockages `config` et `blueprintStorage` pour plus de commodité.

## Constantes :

Vous pouvez utiliser des constantes dans [`generator-constants.js`](https://github.com/jhipster/generator-jhipster/blob/main/generators/generator-constants.js):

```javascript
const javaDir = `${jhipsterConstants.SERVER_MAIN_SRC_DIR + this.packageFolder}/`;
const resourceDir = jhipsterConstants.SERVER_MAIN_RES_DIR;
const webappDir = jhipsterConstants.CLIENT_MAIN_SRC_DIR;
```

## Fonctions:

Vous pouvez utiliser toutes les fonctions dans [generator-base.js](https://github.com/jhipster/generator-jhipster/blob/main/generators/generator-base.js):

## Exécution d'un blueprint localement pour le développement

Lors du développement d'un blueprint, veuillez noter les étapes ci-dessous. Elles sont très importantes.

1. Lier votre blueprint globalement

    Remarque: Si vous ne souhaitez pas lier le blueprint (étape 3) à chaque projet créé.

    ```bash
    cd generator-jhipster-my-blueprint
    npm link
    ```

1. Lier une version de développement de JHipster à votre blueprint. Remarque : nécessaire uniquement si vous souhaitez utiliser une version de JHipster non publiée, comme la branche  `main` ou votre propre fork personnalisé)

    ```bash
    cd generator-jhipster
    npm link

    cd generator-jhipster-my-blueprint
    npm link generator-jhipster
    ```

    Or install `generator-jhipster` from git:

    ```bash
    cd generator-jhipster-my-blueprint
    npm install jhipster/generator-jhipster
    ```

1. Créez un nouveau dossier pour l'application à générer, et exécutez JHipster en ignorant les dépendances de JHipster (sinon, une version publiée sera installée à chaque fois que `npm install/ci` est appelé)

    ```bash
    mkdir my-app && cd my-app

    jhipster --blueprints my-blueprint --skip-jhipster-dependencies
    ```

1. Une fois que le blueprint/générateur JHipster est publié, réajoutez les dépendances de JHipster pour la reproductibilité

    ```bash
    jhipster --no-skip-jhipster-dependencies
    ```

## Enregistrement d'un blueprint sur le marché JHipster

Pour rendre votre blueprint disponible dans [le marché JHipster]({{ site.url }}/modules/marketplace/), vous devez vous assurer d'avoir les deux mots-clés `yeoman-generator` et `jhipster-blueprint` dans votre `package.json` npm publié.
Si vous trouvez une entrée sur le marché qui n'est pas un module ou blueprint JHipster, vous pouvez contribuer à la mettre sur liste noire en l'ajoutant à la section `blacklistedModules` du fichier [`modules-config.json`](https://github.com/jhipster/jhipster.github.io/blob/main/modules/marketplace/data/modules-config.json) en faisant une Pull Request vers le [projet jhipster/jhipster.github.io](https://github.com/jhipster/jhipster.github.io).


Une fois que vous avez publié votre blueprint sur NPM, il deviendra disponible dans notre marché.
