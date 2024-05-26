---
layout: default
title: Version 0.2.0 publiée
---

Sortie de JHipster version 0.2.0
==================

*JHipster vous offre Yeoman + Maven + Spring + AngularJS, tout fonctionnant ensemble dans un générateur pratique.*

Quelques jours après notre sortie v0.1.0, nous publions déjà JHipster v0.2.0 !

Cette version contient plusieurs corrections de bugs et petites améliorations, mais la grande nouvelle est le support complet de l'internationalisation dans AngularJS, ce qui constitue un changement majeur dans l'application générée.

- Toutes les vues AngularJS sont désormais entièrement internationalisées !
- Nous utilisons la superbe bibliothèque ["Angular Translate"](https://github.com/PascalPrecht/angular-translate)
- Bien sûr, l'utilisation de l'i18n est documentée sur ce site Web, dans la section ["développement"](//development/)

Nous n'avons pas vu cela mis en œuvre dans d'autres générateurs Yeoman, donc une fois de plus, JHipster est en avance sur le peloton en matière de fonctionnalités "entreprise" !

*Ce qui reste à faire* : en mode "production", nous n'avons pas trouvé de moyen de minimiser et de mettre en cache les fichiers JSON localisés. La seule solution pour le moment serait d'utiliser les ETags (avec le filtre ShallowEtagHeaderFilter de Spring), mais ce n'est pas une solution optimale. Si vous avez une idée, n'hésitez pas à nous rejoindre !

Un grand merci à [Jerome Mirc](https://twitter.com/JeromeMirc) qui a eu l'idée et a codé tout cela.
