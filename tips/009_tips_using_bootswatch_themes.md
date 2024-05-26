---
layout: default
title: Utiliser les thèmes Bootswatch
sitemap:
priority: 0.5
lastmod: 2015-08-01T22:28:00-00:00
---

# Utiliser les thèmes Bootswatch avec un sélecteur de thèmes

__Conseil proposé par [@deepu105](https://github.com/deepu105)__

Cela est désormais disponible sous forme de [module JHipster](https://github.com/deepu105/generator-jhipster-bootswatch) et nécessite une version JHipster supérieure à 2.26.2.

Pour utiliser des thèmes [Bootswatch](https://bootswatch.com/) à la place du thème par défaut, vous devez simplement remplacer le CSS de Bootstrap par le CSS du thème Bootswatch. Cependant, si vous souhaitez un sélecteur de thèmes dynamique pour basculer entre les thèmes Bootswatch, suivez ce conseil.

Effectuez les modifications suivantes dans l'application générée.

**Remarque :** Remplacez 'yourApp' par le nom généré de votre application.

## Ajouter des fichiers

Ajoutez le service suivant en tant que `bootswatch.service.js` sous `webapp/app/components/bootswatch`

    'use strict';

    angular.module('yourApp')
        .factory('BootSwatchService', function ($http) {
            return {
                get: function() {
                    return $http.get('http://bootswatch.com/api/3.json').then(function (response) {
                        return response.data.themes;
                    });
                }
            };
        });

Ajoutez la directive suivante en tant que `bootswatch.directive.js` sous `webapp/app/components/bootswatch`


    'use strict';

    angular.module('yourApp')
        .directive('jhSwitchTheme', function() {
            /*Directive binds to anchor to update the bootswatch theme selected*/
            return {
                restrict: 'A',
                scope: {
                    theme : '=jhSwitchTheme'
                },
                link: function (scope, element, attrs) {
                    var currentTheme = $("#bootswatch-css").attr('title');
                    if(scope.theme.name === currentTheme){
                        element.parent().addClass("active");
                    }

                    element.on('click',function(){
                        $("#bootswatch-css").attr("href", scope.theme.css);
                        $(".theme-link").removeClass("active");
                        element.parent().addClass("active");
                    });
                }
            };
        });

Ajoutez le contrôleur suivant en tant que `bootswatch.controller.js` sous `webapp/app/components/bootswatch`

    'use strict';

    angular.module('yourApp')
        .controller('BootswatchController', function ($scope, BootSwatchService) {
            /*Get the list of availabel bootswatch themes*/
            BootSwatchService.get().then(function(themes) {
                $scope.themes = themes;
                $scope.themes.unshift({name:'Default',css:''});
            });
        });

## index.html

Ajoutez ce qui suit dans le fichier  `index.html` après la tâche de construction CSS vendor.css pour éviter qu'ils ne soient minifiés et compactés par la tâche de construction

    <!-- build:css content/css/vendor.css -->

    ...

    <!-- endbuild -->
    <!-- placeholder link to load bootswatch themes, title holds the current applied theme name-->
    <link rel="stylesheet" href="" id="bootswatch-css" title="Default">
    <!-- build:css assets/styles/main.css -->

    ...

    <!-- endbuild -->


Ajoutez ceci dans le pied de page

    <div class="footer">
        <p translate="footer" class="pull-left">This is your footer</p>
        <div ng-controller="BootswatchController" class="dropup pull-right">
            <a class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                <span class="glyphicon glyphicon-adjust"></span>
                <span class="hidden-tablet" translate="global.menu.theme">Theme</span>
                <b class="caret"></b>
            </a>
            <ul class="dropdown-menu" role="menu">
                <li class="theme-link" ng-repeat="theme in themes">
                    {% raw %}
                    <a href="" jh-switch-theme="theme">{{theme.name}}</a>
                    {% endraw %}
                </li>
            </ul>
        </div>
    </div>

Ajoutez les balises de script dans votre fichier index.html manuellement si 'gulp inject' échoue et que vous recevez des erreurs angulaires
    <!-- build:js({.tmp,src/main/webapp}) scripts/app.js -->

    ...

    <script src="scripts/components/util/bootswatch.controller.js"></script>
    <script src="scripts/components/util/bootswatch.directive.js"></script>
    <script src="scripts/components/util/bootswatch.service.js"></script>

# app.js (uniquement pour    oAuth/xAuth)

Ajoutez l'exclusion de l'URL Bootswatch à l'intercepteur d'authentification dans`app/blocks/interceptor/auth.interceptor.js` si vous utilisez OAuth ou XAuth

    .factory('authInterceptor', function ($rootScope, $q, $location, localStorageService) {
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};
                // exclude bootswatch url
                if(config.url.indexOf('api.bootswatch.com') === -1){
                    var token = localStorageService.get('token');
                    ....
                }
                return config;
            }
        };

# Captures d'écran

![Capture d'écran 1](../images/009_tips_using_bootswatch_themes_01.png)

![Capture d'écran 2](../images/009_tips_using_bootswatch_themes_02.png)

![Capture d'écran 3](../images/009_tips_using_bootswatch_themes_03.png)

![Capture d'écran 4](../images/009_tips_using_bootswatch_themes_04.png)

![Capture d'écran 5](../images/009_tips_using_bootswatch_themes_05.png)

![Capture d'écran 6](../images/009_tips_using_bootswatch_themes_06.png)
