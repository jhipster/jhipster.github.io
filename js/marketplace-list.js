(function () {
    'use strict';
    
    angular.module('marketplace.list', ['ngRoute', 'jhipster.service'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/list', {
                templateUrl: '/modules/marketplace/list/list.html',
                controller: 'ModuleListCtrl'
            });
        }])
        .controller('ModuleListCtrl', ModuleListCtrl);
    
    ModuleListCtrl.$inject = ['$scope', '$location', '$filter', 'ModuleService', 'NpmService'];

    function ModuleListCtrl($scope, $location, $filter, ModuleService, NpmService) {
        ModuleService.getModules().success(function (data) {
            $scope.modules = data;
            var modulesList = '';
            var getInfo = function (module) {
                NpmService.getNpmInfo(module.npmPackageName).success(function (npminfo) {
                    module.npminfo = npminfo;
                });
            }

            for (var i = 0; i < $scope.modules.length; i++) {
                var module = $scope.modules[i];
                modulesList += module.npmPackageName + ',';
                getInfo(module);
            }
            NpmService.getNpmDownloadsLastMonth(modulesList).success(function (data) {
                for (var i = 0; i < $scope.modules.length; i++) {
                    var module = $scope.modules[i];
                    var npmstats = data[module.npmPackageName];
                    if (npmstats != undefined) {
                        module.downloads = npmstats.downloads;
                    } else {
                        module.downloads = 0;
                    }
                }
            });
        });

        $scope.details = function (npmPackageName) {
            $location.path('/details/' + npmPackageName);
        };
    }
})();