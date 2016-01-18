(function () {
    'use strict';
    angular.module('marketplace.details', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/details/:npmPackageName', {
                templateUrl: '/modules/marketplace/details/details.html',
                controller: 'ModuleDetailsCtrl'
            });
        }])
        .controller('ModuleDetailsCtrl', ModuleDetailsCtrl);
    
    ModuleDetailsCtrl.$inject = ['$scope', '$routeParams', '$location', 'ModuleService', 'NpmService'];

    function ModuleDetailsCtrl($scope, $routeParams, $location, ModuleService, NpmService) {
        $scope.npmPackageName = $routeParams.npmPackageName;

        ModuleService.getModules().success(function (data) {
            for (var i = 0; i < data.length; i++) {
                var module = data[i];
                if (module.npmPackageName == $scope.npmPackageName) {
                    $scope.module = module;
                    NpmService.getNpmInfo(module.npmPackageName).success(function (npminfo) {
                        $scope.module.npminfo = npminfo;
                    });
                }
            }
        });

        NpmService.getNpmDownloadsRangeLastMonth($scope.npmPackageName).success(function (data) {
            var dates = ['date'];
            var downloads = ['downloads'];
            for (var i = 0; i < data.downloads.length; i++) {
                var download = data.downloads[i];
                dates.push(download.day);
                downloads.push(download.downloads);
            }
            var chart = c3.generate({
                bindto: '#chart',
                data: {
                    x: 'date',
                    xFormat: '%Y-%m-%d',
                    columns: [
                        dates,
                        downloads
                    ]
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            format: "%e %b %y" // https://github.com/mbostock/d3/wiki/Time-Formatting#wiki-format
                        }
                    }
                }
            });
        });

        $scope.list = function () {
            $location.path('/list');
        };
    }
})();