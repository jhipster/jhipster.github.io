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
        $scope.total = 0;
        $scope.loaded = false;
        var PAGE_SIZE = 15;
        function getModules () {
            ModuleService.getAllModules(0,PAGE_SIZE).success(function (res) {
                if(res.total > PAGE_SIZE){
                    PAGE_SIZE = res.total;
                    getModules();
                } else {
                    var modulesList = [];
                    $scope.total = res.total;
                    $scope.moduleConfig = {}
                    ModuleService.getModulesConfig().success(function (moduleConfig) {
                        $scope.moduleConfig = moduleConfig;

                        $scope.modules = []
                        angular.forEach(res.results, function(module, key) {
                            if(!($scope.moduleConfig.blacklistedModules && $scope.moduleConfig.blacklistedModules[module.name[0]])){
                                $scope.modules.push(module);
                                modulesList.push(module.name[0]);
                            }
                            
                        });            
                        
                        $scope.loaded = true;

                        NpmService.getNpmDownloadsLastMonth(modulesList.join(',')).success(function (data) {
                            angular.forEach($scope.modules, function(module, key) {
                                var npmstats = data[module.name[0]];
                                if (npmstats != undefined) {
                                    module.downloads = npmstats.downloads;
                                } else {
                                    module.downloads = 0;
                                }
                            });
                        });
                    });
                }
            });
        }
        getModules();

        $scope.details = function (module) {
            ModuleService.setCurrent(module);
            $location.path('/details/' + module.name[0]);
        };
        
        $scope.isVerified = function (module) {
            return $scope.moduleConfig.verifiedModules && $scope.moduleConfig.verifiedModules[module.name[0]];
        };
    }
})();