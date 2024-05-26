---
layout: default
title: Configuration du mode HTML 5
sitemap:
priority: 0.5
lastmod: 2016-03-07T23:23:00-00:00
---

# Configuration du mode HTML 5

__Conseil proposé par [@brevleq](https://github.com/brevleq) et mis à jour par [@wmarques](https://github.com/wmarques)__

#### Le mode HTML 5 a été ajouté au générateur depuis ce [pull request #9098](https://github.com/jhipster/generator-jhipster/pull/9098), vous n'avez donc plus besoin de faire de configuration spécifique !

Comme vous l'avez peut-être remarqué, AngularJS utilise un "#" dans ses URLs. Le mode HTML5 d'AngularJS supprime ces "#" de l'URL.

## Activer le mode HTML 5

Créez le fichier `html5.mode.config.js` dans le répertoire `webapp/app/blocks/config/` :

    (function() {
      'use strict';

      angular
        .module('<YourAppName>')
        .config(html5ModeConfig);

      html5ModeConfig.$inject = ['$locationProvider'];

      function html5ModeConfig($locationProvider) {
        $locationProvider.html5Mode({ enabled: true, requireBase: true });
      }
    })();

Ensuite, ouvrez `index.html` et ajoutez cette ligne dans la balise `head`:

    <base href="/">

##Filtre de redirection    

Maintenant, pour que les liens avec des chemins relatifs fonctionnent correctement (par exemple, le lien d'activation envoyé par e-mail à un utilisateur), nous allons créer un contrôleur pour rediriger l'URI vers index.html :

    @Controller
    public class AngularJsForwardController {
        @RequestMapping(value = "/**/{[path:[^\\.]*}")
        public String redirect() {
            return "forward:/";
        }
    }

Veuillez noter que cela peut entraîner des conflits avec les [URLs des actuateurs Spring](https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-endpoints.html).

C'est pourquoi vous devez modifier les URLs des fichiers `metric.js` et `health.js`. Tout d'abord, ouvrez `webapp\app\admin\health\health.js` et changez:

    url: '/health' -> url: '/apphealth'

Ensuite, faites de même avec `webapp\app\admin\metrics\metrics.js`:

    url: '/metrics' -> url: '/appmetrics'

Ensuite, si vous utilisez gulp, vous devez modifier le fichier `gulp\serve.js` et remplacer la variable `proxyRoutes` par:

    var proxyRoutes = [
        '/'
    ];

Enfin, pour que le lien d'accueil dans la barre de navigation fonctionne, ouvrez `webapp\app\layouts\navbar\navbar.html` et changez :

    <a class="navbar-brand" href="#/"> -> <a class="navbar-brand" href="/">
