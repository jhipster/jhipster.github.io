---
layout: default
title: Speed up the generator-jhipster
sitemap:
priority: 0.5
lastmod: 2016-05-15T22:22:00-00:00
---

# Accélérer le générateur JHipster

__Conseil proposé par [@pascalgrimaud](https://github.com/pascalgrimaud)__

**Attention !** Ces conseils ne fonctionnent pas pour npm 3+ car il utilise des liens symboliques.

Lors de l'utilisation du générateur JHipster, la commande `npm install` peut prendre plusieurs minutes, en fonction de la vitesse de votre connexion.

Ce conseil peut être utilisé dans de nombreux cas :

- pour la démo de JHipster, afin d'améliorer votre expérience
- pour l'équipe de développement, pour régénérer plus rapidement un projet avec `.yo-rc.json`
- pour l'intégration continue

## Créer un nouveau projet pour les node_modules

Créez un répertoire qui contiendra toutes les bibliothèques `node_modules`, et allez-y :

```
mkdir jhipster-speedup
cd jhipster-speedup
```

Créez le répertoire `node_modules`:

```
mkdir -p node_modules
```

La structure du projet est la suivante :

    jhipster-speedup
    ├── node_modules


**Attention!** Utilisez la commande suivante uniquement si vous êtes un développeur sur JHipster. Elle permettra de lier votre projet de générateur-jhipster :

```
npm link generator-jhipster
```

## Génération de projets

Créez un répertoire qui contiendra votre nouveau projet JHipster, et allez-y :

```
mkdir jhipster
cd jhipster
```

Créez un lien vers le répertoire `node_modules` :

```
ln -s <votre chemin>/jhipster-speedup/node_modules
```


Générez un nouveau projet, et répondez à toutes les questions :


```
jhipster
```

La première fois, cela prendra plusieurs minutes.

Les fois suivantes, il utilisera le répertoire `node_modules` existant, donc npm ne téléchargera pas toutes les bibliothèques.

**Attention !** Si vous utilisez des bibliothèques spécifiques et que vous modifiez votre package.json, vous devriez copier les `node_modules`
de jhipster-speedup vers votre dossier de projet, au lieu d'utiliser un lien.
