---
layout: default
title:  Mise à jour d'une application
permalink: /upgrading-an-application/
sitemap:
    priority: 0.7
    lastmod: 2024-04-08T00:00:00-00:00
gitgraph: http://jsfiddle.net/lordlothar99/tqp9gyu3
---

# <i class="fa fa-refresh"></i> Mise à jour d'une application

## Sommaire

1. [Option 1 - mise à jour automatique](#automatic_upgrade)
2. [Option 2 - mise à jour manuelle](#manual_upgrade)

<h2 id="automatic_upgrade">Option 1 - mise à jour automatique</h2>

Lorsqu'une nouvelle version de JHipster est publiée, le sous-générateur de mise à jour de JHipster permet de mettre à jour une application existante vers cette nouvelle version, sans effacer vos modifications.

Cela est utile pour :

- Avoir les dernières fonctionnalités de JHipster dans une application existante
- Obtenir les modifications lorsqu'il y a une correction de bogue importante ou une mise à jour de sécurité
- Conserver vos modifications dans votre base de code et les fusionner avec le nouveau code généré

_Veuillez lire attentivement cette page avant de procéder à une mise à jour, pour comprendre comment fonctionne le processus de mise à jour_

### Exigences

Pour que ce sous-générateur fonctionne, vous devez avoir `git` installé à partir de [http://git-scm.com](http://git-scm.com/).

### Exécution du sous-générateur de mise à jour

Accédez au répertoire racine de l'application :

`cd monapplication/`

Pour mettre à jour votre application, saisissez :

`npx generator-jhipster@latest upgrade`

Une alternative est d'utiliser l'installation globale :

```
npm install -g generator-jhipster@latest
jhipster upgrade
```

Voici les options que vous pouvez passer :

* `--skip-checks` - Désactive les vérifications lors de la régénération du projet
* `--silent` - Masque la sortie du processus de génération

### Mise à niveau depuis JHipster 7 et les versions précédentes

Le [blueprint de migration](https://github.com/jhipster/generator-jhipster-migrate) est une version avancée du sous-générateur de mise à jour. Si vous devez mettre à niveau une application JHipster 7, il est recommandé d'utiliser le blueprint de migration. Par exemple, supposons que vous ayez une application 7.9.3.

Exécutez `jhipster-migrate` pour passer à la dernière version. Résolvez les conflits, validez et célébrez !

Pour un exemple concret, consultez les demandes de tirage suivantes du projet 21-Points Health.

- [Mise à jour vers JHipster 7.9.4](https://github.com/mraible/21-points/pull/248)
- [Mise à jour vers JHipster 8.2.1](https://github.com/mraible/21-points/pull/249)

### Vue graphique du processus de mise à jour

Voici comment fonctionne le processus de mise à jour graphiquement (lisez les sections ci-dessous pour avoir une explication textuelle) :

![GitGraph]({{ site.url }}/images/upgrade_gitgraph.png)

(cette image provient de [JSFiddle](http://jsfiddle.net/lordlothar99/tqp9gyu3/) )

Veuillez noter que la branche `jhipster_upgrade` sera créée orpheline sur votre projet, bien qu'elle ne s'affiche pas correctement sur le graphique ci-dessus.

### Explication étape par étape du processus de mise à jour

Voici les étapes traitées par le sous-générateur de mise à jour de JHipster :

1. Vérifier s'il existe une nouvelle version de JHipster disponible (non applicable si vous utilisez `--force`).
2. Vérifier si l'application est déjà initialisée en tant que dépôt `git`, sinon JHipster en initialisera un pour vous et validera la base de code actuelle sur la branche principale.
3. Vérifier pour s'assurer qu'il n'y a pas de modifications locales non validées dans le dépôt. Le processus se terminera si des modifications non validées sont trouvées.
4. Vérifier si une branche `jhipster_upgrade` existe. Si ce n'est pas le cas, une branche est créée : des détails sur cette étape sont fournis dans la section "Étapes spécifiques lors de la première mise à jour".
5. Vérifier la branche `jhipster_upgrade`.
6. Mettre à jour JHipster vers la dernière version disponible globalement.
7. Nettoyer le répertoire du projet actuel.
8. Régénérer l'application en utilisant la commande `jhipster --force`.
9. Valider le code généré sur la branche `jhipster_upgrade`.
10. Fusionner la branche `jhipster_upgrade` avec la branche d'origine à partir de laquelle la commande `npx jhipster upgrade` a été lancée.
11. Vous devez maintenant procéder à la résolution des conflits de fusion s'il y en a.

Félicitations, votre application est désormais mise à jour avec la dernière version de JHipster !

### Étapes spécifiques lors de la première mise à jour


Lors du premier lancement du sous-générateur de mise à jour de JHipster, afin d'éviter d'effacer toutes vos modifications, quelques étapes supplémentaires sont exécutées :

1. Une branche `jhipster_upgrade` est créée orpheline (elle n'a pas de parent).
2. L'ensemble de l'application est généré (en utilisant votre version actuelle de JHipster).
3. Un commit de fusion de bloc est effectué sur la branche `master` : aucune altération n'est apportée à votre base de code sur la branche `master`; il s'agit d'une manière pratique d'enregistrer dans Git que HEAD de `master` est à jour avec la version actuelle de JHipster.

#### Conseil

- Ne commitez rien sur la branche `jhipster_upgrade`. Cette branche est dédiée au sous-générateur de mise à jour de JHipster : à chaque fois que le sous-générateur est exécuté, un nouveau commit sera créé.

- Si vous mettez à jour à partir d'une version très ancienne (par exemple de 5.0.0 à la dernière version), nous vous recommandons de procéder progressivement entre chaque version mineure/patch et de réaliser des tests pour vous assurer que l'application fonctionne comme prévu.

- Il existe quelques approches utiles de la communauté JHipster pour concevoir l'application de manière à rendre le processus de mise à jour plus facile et à réduire le nombre de conflits de fusion. Nous recommandons d'utiliser [l'approche côte à côte de JHipster](https://www.youtube.com/watch?v=Gg5CYoBdpVo).

<h2 id="manual_upgrade">Option 2 - mise à jour manuelle</h2>

Pour une mise à jour manuelle, commencez par mettre à jour votre version de JHipster avec :

```
npm install -g generator-jhipster
```

Supprimez le dossier `node_modules` de votre projet, puis exécutez :

```
jhipster
```

Vous pouvez également mettre à jour votre projet et toutes ses entités en exécutant

```
jhipster --force
```

Vous pouvez également mettre à jour vos entités une par une en exécutant à nouveau le sous-générateur d'entité, par exemple si votre entité s'appelle _Foo_

```
jhipster entity Foo
```

### Conseils sur les fichiers renommés

Parfois, des fichiers peuvent être renommés dans le générateur. Si vous souhaitez voir le résultat de la détection de renommage de Git, vous pouvez exécuter `git add` (`git add .` met en stage tout) et afficher les modifications après avec votre client Git préféré.

Si de nombreux fichiers sont renommés, vous voudrez peut-être augmenter `diff.renameLimit` dans la configuration Git pour que la détection de renommage de Git fonctionne comme prévu. Par exemple `git config --replace-all diff.renameLimit 10000`.

Par défaut, la détection de renommage de Git utilise un seuil de similarité de 50%. Pour voir les fichiers moins similaires comme renommés, vous pouvez utiliser l'option `--find-renames=<n>` dans les commandes Git. Par exemple `git diff --staged --find-renames=30`.

### Voir vos propres modifications

Si vous souhaitez voir les modifications que vous avez apportées après la génération du projet, vous pouvez suivre les étapes décrites ci-dessous.

Clonez votre projet dans le nouveau dossier avec `git clone`.

Supprimez tous les fichiers et dossiers du projet cloné sauf `.git`, `.jhipster` et `.yo-rc.json`.

Découvrez quelle version de JHipster vous avez utilisée la dernière fois pour générer votre projet : regardez le `.yo-rc.json` dans le dossier racine du projet, découvrez la valeur de `jhipsterVersion`.

Installez la version de JHipster que vous avez utilisée la dernière fois pour générer votre projet :

```
npm install -g generator-jhipster@jhipsterVersionYouUsedLastTime
```

Regénérez votre projet :

```
jhipster --force --skip-install
```

Avec `git diff`, vous pouvez maintenant voir toutes vos modifications comme annulées. Si vous souhaitez voir toutes vos modifications comme ajoutées, vous pouvez tout valider dans Git, puis annuler le dernier commit.

### Voir les modifications de JHipster

Si vous souhaitez voir les modifications apportées par JHipster, vous pouvez suivre les étapes décrites ci-dessous.

Générez le projet avec la version de JHipster que vous avez utilisée la dernière fois pour générer votre projet :
* créez un nouveau dossier
* copiez le fichier `.yo-rc.json` de votre projet et le dossier `.jhipster` dans ce nouveau dossier
* installez la dernière version de JHipster : `npm install -g generator-jhipster`
* dans le dossier créé, exécutez : `jhipster --skip-install`

Comparez ces 2 dossiers avec votre outil de comparaison de fichiers et de dossiers préféré pour voir les modifications apportées par JHipster.