---
layout: default
title: Bootswatch themes
sitemap:
priority: 0.5
lastmod: 2015-08-01T22:28:00-00:00
---

# Bootswatch Themes with Theme Switcher

__Tip submitted by [@deepu105](https://github.com/deepu105)__

To have [bootswatch](https://bootswatch.com/) themes instead of the default theme you just need to override the bootstrap css with the css from bootswatch theme. However if you want a cool them switcher to switch between bootswatch themes dynamically then follow this tip.

Make the following changes in the generated app

## Add Files

Add the below service as `bootswatch.service.js` under `webapp/components/util`

    'use strict';
    
    angular.module('yourApp')
        .factory('BootSwatchService', function ($http) {
            return {
                get: function() {
                    return $http.get('http://api.bootswatch.com/3/').then(function (response) {
                        return response.data.themes;
                    });
                }
            };
        });

Add the below directive as `bootswatch.directive.js` under `webapp/components/util`

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

Add the below controller as `bootswatch.controller.js` under `webapp/components/util`

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

Add the below to the index.html file after the CSS build task so that these are not minified and compacted by build task

    <!-- build:css assets/styles/main.css -->
    
    ...

    <!-- endbuild -->
    <!-- placeholder link to load bootswatch themes, title holds the current applied theme name-->
    <link rel="stylesheet" href="" id="bootswatch-css" title="Default">

Add the below in footer

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
                    <a href="" jh-switch-theme="theme">{{theme.name}}</a>
                </li>
            </ul>
        </div>
    </div>

# app.js (only for oAuth/xAuth)

Add exclusion to the bootswatch url in authInterceptor in `app.js` if you are using OAuth or XAuth

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

# Screenshots

![screen 1](https://cloud.githubusercontent.com/assets/1107223/7855692/449edd7a-0556-11e5-9788-5e7143e0316e.png)
![screen 2](https://cloud.githubusercontent.com/assets/1107223/7805499/192d671c-03a6-11e5-97d3-4a678d78cdb7.png)
![screen 3](https://cloud.githubusercontent.com/assets/1107223/7805512/580e0784-03a6-11e5-9668-a61778cce871.png)
![screen 4](https://cloud.githubusercontent.com/assets/1107223/7805522/79317e78-03a6-11e5-98cd-39d360f68550.png)
![screen 5](https://cloud.githubusercontent.com/assets/1107223/7805528/850731b6-03a6-11e5-87b5-569bb945c776.png)
![screen 6](https://cloud.githubusercontent.com/assets/1107223/7805530/8f3138e4-03a6-11e5-853a-e1081f7dd41b.png)