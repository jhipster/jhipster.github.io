---
layout: default
title: Utilisation des WebSockets
permalink: /using-websockets/
redirect_from:
  - /using_websockets.html
sitemap:
    priority: 0.7
    lastmod: 2015-08-31T18:40:00-00:00
---

# <i class="fa fa-envelope"></i> Utilisation des WebSockets

Les WebSockets sont utiles pour avoir une application très dynamique, où les données sont partagées en quasi temps réel entre le serveur et ses clients.

Actuellement, JHipster utilise Spring WebSockets comme implémentation, vous trouverez donc beaucoup plus d'informations sur cette fonctionnalité sur le [site Web de Spring WebSockets](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/websocket.html).

Cette option présente quelques limitations :

- Par défaut, nous utilisons le dispatcher fourni par Spring Websockets, qui est une implémentation en mémoire. Il ne sera pas mis à l'échelle si vous voulez utiliser plusieurs serveurs. Si tel est le cas, consultez la [documentation de Spring WebSockets](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/websocket.html) qui explique comment configurer un courtier externe.

## L'exemple "Tracker"

JHipster fournit un exemple de "tracker" prêt à l'emploi. Situé dans le menu `admin`, il suivra le comportement des autres utilisateurs : vous verrez leur login et IP, ainsi que la page qu'ils consultent actuellement.

- Ceci est fourni comme exemple pour vous aider à démarrer l'utilisation des WebSockets, et non comme un tracker d'utilisateurs "prêt pour la production", mais cela fonctionne assez bien.
- Il vous montrera comment intégrer les WebSockets avec Spring Security, ce qui est un sujet assez complexe.
- Cela fonctionne car JHipster est une application Web monopage, donc les connexions WebSocket ne sont pas réinitialisées entre chaque page : c'est là que vous obtenez l'un des grands avantages de l'architecture de JHipster.