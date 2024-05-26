---
layout: default
title: Utilisation de Oh-My-Zsh
permalink: /oh-my-zsh/
redirect_from:
  - /oh-my-zsh.html
sitemap:
    priority: 0.7
    lastmod: 2016-07-25T18:40:00-00:00
---

# <i class="fa fa-terminal"></i> Utilisation de Oh-My-Zsh

Si vous utilisez Linux ou Mac OS X, [Oh-My-Zsh](http://ohmyz.sh/) est un excellent outil pour gérer votre configuration ZSH.

La plupart de l'équipe de développement de JHipster utilise Oh-My-Zsh, et si vous voyez des raccourcis dans leur terminal, c'est grâce à cela !

## Plugin Oh-My-Zsh JHipster

Le plugin Oh-My-Zsh JHipster est disponible sur GitHub à l'adresse [https://github.com/jhipster/jhipster-oh-my-zsh-plugin](https://github.com/jhipster/jhipster-oh-my-zsh-plugin).

Actuellement, il n'ajoute que des raccourcis (liste complète [ici](https://github.com/jhipster/jhipster-oh-my-zsh-plugin/blob/main/jhipster.plugin.zsh)), mais nous accueillons les contributions pour avoir une meilleure auto-complétion !

Il ne fait pas (encore) partie de la liste officielle des plugins, donc vous devez l'installer manuellement :

1. Modifiez votre `~/.zshrc` et ajoutez `jhipster` à la liste des plugins à activer :

    `plugins=( ... jhipster )`

2. En ligne de commande, changez vers le répertoire de plugins personnalisé d'_oh-my-zsh_ et clonez le dépôt :

    `cd ~/.oh-my-zsh/custom/plugins && git clone https://github.com/jhipster/jhipster-oh-my-zsh-plugin.git jhipster && cd && . ~/.zshrc`

## Plugins recommandés

Les plugins `git`, `docker` et `docker-compose` sont généralement utiles avec JHipster.

Ainsi, la section de vos plugins dans votre fichier `.zshrc` serait :

    plugins=(git docker docker-compose jhipster)

## Autres méthodes d'installation

### Antigen

Si vous utilisez [Antigen](https://github.com/zsh-users/antigen) :

1. Ajoutez `antigen bundle jhipster/jhipster-oh-my-zsh-plugin` à votre fichier `.zshrc` où vous avez listé vos autres plugins.
2. Fermez et rouvrez votre fenêtre Terminal/iTerm pour **rafraîchir le contexte** et utiliser le plugin. Alternativement, vous pouvez exécuter `antigen bundle jhipster/jhipster-oh-my-zsh-plugin` dans un shell en cours d'exécution pour que antigen clone et charge *jhipster*.

### zgen

Si vous utilisez [zgen](https://github.com/tarjoilija/zgen) :

1. Ajoutez `zgen load jhipster/jhipster-oh-my-zsh-plugin` à votre fichier `.zshrc` avec vos autres commandes `zgen load`.
2. `rm ${ZGEN_INIT}/init.zsh && zgen save`