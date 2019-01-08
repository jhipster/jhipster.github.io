---
layout: default
title: Using Fisher
permalink: /fisher/
redirect_from:
  - /fisher.html
sitemap:
    priority: 0.7
    lastmod: 2018-10-20T18:40:00-00:00
---

# <i class="fa fa-terminal"></i> Using Fisher 

If you are using Linux or Mac OS X, [fisher](https://github.com/jorgebucaran/fisher) is a great tool to manage your [fish shell](http://fishshell.com/) configuration.

Some of the JHipster development team use fish shell with Fisherman, and if you see people using shortcuts in their terminal, the magic comes from here!

## Fisherman JHipster plugin

The JHipster Fisherman plugin is available on GitHub at [https://github.com/jhipster/jhipster-fisher-plugin](https://github.com/jhipster/jhipster-fisher-plugin).

Currently it only adds shortcuts (full list [here](https://github.com/jhipster/jhipster-fisher-plugin/blob/master/conf.d/jhipster.aliases.fish)), but we welcome contributions to have better auto-completion!

It is not part (yet) of the official plugin list, so you need to install it manually:

1. Clone the plugin repository:

    `git clone git@github.com:jhipster/jhipster-fisher-plugin.git`

2. Install it via ``fisher`` command from local directory:

    `fisher add ~/path/to/cloned/repository`

For more details about [Fisher](https://github.com/jorgebucaran/fisher) have a look at their [usage](https://github.com/jorgebucaran/fisher#usage) section.
