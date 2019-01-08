---
layout: default
title: Using Oh-My-Zsh
permalink: /oh-my-zsh/
redirect_from:
  - /oh-my-zsh.html
sitemap:
    priority: 0.7
    lastmod: 2016-07-25T18:40:00-00:00
---

# <i class="fa fa-terminal"></i> Using Oh-My-Zsh

If you are using Linux or Mac OS X, [Oh-My-Zsh](http://ohmyz.sh/) is a great tool to manage your ZSH configuration.

Most of the JHipster development team uses Oh-My-Zsh, and if you see people using shortcuts in their terminal, the magic comes from here!

## Oh-My-Zsh JHipster plugin

The JHipster Oh-My-Zsh plugin is available on GitHub at [https://github.com/jhipster/jhipster-oh-my-zsh-plugin](https://github.com/jhipster/jhipster-oh-my-zsh-plugin).

Currently it only adds shortcuts (full list [here](https://github.com/jhipster/jhipster-oh-my-zsh-plugin/blob/master/jhipster.plugin.zsh)), but we welcome contributions to have better auto-completion!

It is not part (yet) of the official plugin list, so you need to install it manually:

1. Edit your `~/.zshrc` and add `jhipster` to the list of plugins to enable:

    `plugins=( ... jhipster )`

2. In the command line, change to _oh-my-zsh_'s custom plugin directory and clone the repository:

    `cd ~/.oh-my-zsh/custom/plugins && git clone https://github.com/jhipster/jhipster-oh-my-zsh-plugin.git jhipster && cd && . ~/.zshrc`

## Recommended plugins

The `git`, `docker` and `docker-compose` plugins are usually useful with JHipster.

So your plugins section in your `.zshrc` file would be:

    plugins=(git docker docker-compose jhipster)

## Other installation methods

### Antigen

If you're using [Antigen](https://github.com/zsh-users/antigen):

1. Add `antigen bundle jhipster/jhipster-oh-my-zsh-plugin` to your `.zshrc` where you've listed your other plugins.
2. Close and reopen your Terminal/iTerm window to **refresh context** and use the plugin. Alternatively, you can run `antigen bundle jhipster/jhipster-oh-my-zsh-plugin` in a running shell to have antigen clone and load *jhipster*.

### zgen

If you're using [zgen](https://github.com/tarjoilija/zgen):

1. Add `zgen load jhipster/jhipster-oh-my-zsh-plugin` to your `.zshrc` along with your other `zgen load` commands.
2. `rm ${ZGEN_INIT}/init.zsh && zgen save`
