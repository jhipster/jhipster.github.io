---
layout: default
title: Création d'un blueprint
permalink: /modules/creating-a-blueprint/
redirect_from:
  - /creating_a_blueprint.html
  - /modules/creating_a_blueprint.html
sitemap:
    priority: 0.7
    lastmod: 2015-12-05T18:40:00-00:00
---

# <i class="fa fa-cube"></i> Création d'un blueprint

Un blueprint JHipster est un générateur Yeoman qui est [composé](http://yeoman.io/authoring/composability.html) à partir d'un sous-générateur spécifique de JHipster pour étendre les fonctionnalités de ce sous-générateur. Le blueprint peut remplacer n'importe quel getter défini du sous-générateur et fournir ses propres modèles et fonctionnalités.

Les blueprints JHipster sont répertoriés sur le [marché JHipster](/modules/marketplace/) avec l'étiquette `jhipster-blueprint`.

Cela permet de créer des blueprints tiers qui peuvent remplacer une partie spécifique de JHipster, disons par exemple seulement les modèles côté client.

## Utilisation d'un blueprint

Pour utiliser un blueprint, exécutez la commande ci-dessous

```bash
jhipster --blueprints <blueprint name>
```

## Génération du blueprint

Nous recommandons d'utiliser le générateur intégré  `generate-blueprint` pour démarrer votre blueprint

```bash
mkdir my-blueprint && cd my-blueprint

jhipster generate-blueprint
```
Un blueprint JHipster doit avoir `generator-jhipster` comme dépendance et doit importer le sous-générateur approprié pour le remplacer.

```javascript
import chalk from 'chalk';
import ClientGenerator from 'generator-jhipster/generators/client';

export default class extends ClientGenerator {
  constructor(args, opts, features) {
    super(args, opts, features);

    if (this.options.help) return;

    if (!this.options.jhipsterContext) {
      throw new Error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints myBlueprint')}`);
    }
  }

  get [ClientGenerator.INITIALIZING]() {
    return {
      // async preInitializingTemplateTask() {},
      ...super._initializing(),
      // async postInitializingTemplateTask() {},
    };
  }

  // Others priorities omitted for brevity
}
```

## Blueprints locaux

Un blueprint local est implémenté à l'intérieur du répertoire  `.blueprint` de votre projet. Il est détecté et utilisé par défaut.

Démarrer en utilisant [Génération du blueprint](#generating-the-blueprint) ou exécutez :

```
jhipster generate-blueprint --local-blueprint --sub-generators app --all-priorities
```

Plusieurs sous-générateurs sont utiles pour organiser plusieurs fonctionnalités. Les blueprints locaux ont une portée limitée (l'application), donc un seul sous-générateur, le principal, est probablement suffisant pour personnaliser votre application (côté client et côté serveur).


## Développement

### Priorités

Il existe plusieurs façons de personnaliser une priorité de JHipster.

1) Laisser JHipster gérer la priorité, le blueprint ne remplace rien.

```javascript
    get [Generator.INITIALIZING]() {
        return super.initializing;
    }
```

2) Remplacer entièrement la priorité, c'est lorsque le blueprint prend le contrôle d'une priorité.

```javascript
  get [Generator.INITIALIZING]() {
    return {
      myCustomInitPriorityStep() {
        // Do all your stuff here
      },
      myAnotherCustomInitPriorityStep(){
        // Do all your stuff here
      }
    };
  }
```

3) Remplacer partiellement une priorité, c'est lorsque le blueprint obtient la priorité de JHipster et la personnalise.

```javascript
    get [Generator.INITIALIZING]() {
        return {
            ...super._initializing(),
            displayLogo() {
                // override the displayLogo method from the initializing priority of JHipster
            },
            myCustomInitPriorityStep() {
                // Do all your stuff here
            },
        };
    }
```

4) Décorer une priorité, c'est lorsque le blueprint exécute des étapes personnalisées avant ou après la priorité provenant de JHipster.

C'est utile pour personnaliser les propriétés qui seront utilisées pendant la priorité pour générer des propriétés dérivées.

```javascript
    // Run the blueprint steps before and/or after any parent steps
    get initializing() {
        return {
            myCustomPreInitStep() {
                // Stuff to do BEFORE the JHipster steps
                // Eg: set name that will generate nameCapitalized, nameLowercase, etc.
            }
            ...super._initializing(),
            myCustomPostInitStep() {
                // Stuff to do AFTER the JHipster steps
            }
        };
    }
```
