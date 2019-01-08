(function () {
    'use strict';
    angular.module('marketplace.details', ['ngRoute', 'btford.markdown'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/details/:npmPackageName', {
                templateUrl: '/modules/marketplace/details/details.html',
                controller: 'ModuleDetailsCtrl'
            });
        }])
        .controller('ModuleDetailsCtrl', ModuleDetailsCtrl);

    ModuleDetailsCtrl.$inject = ['$scope', '$routeParams', '$location', 'ModuleService', 'NpmService','GHService'];

    function ModuleDetailsCtrl($scope, $routeParams, $location, ModuleService, NpmService, GHService) {
        $scope.npmPackageName = $routeParams.npmPackageName;
        ga('send', 'event', 'Module details', $scope.npmPackageName);
        var module = ModuleService.getCurrent();
        $scope.module = module || { package: {name: $scope.npmPackageName} };
        NpmService.getNpmInfo($scope.npmPackageName).success(function (npminfo) {
            $scope.module.npminfo = npminfo;
            try {
                var repository = npminfo.repository;
                var repoUrl = repository && repository.url ? repository.url : repository;
                // we will look only for github repo pattern assuming all modules will be in github
                var repoUrl = repoUrl ? repoUrl.replace(/((git)?\+?(https?)?){1}:\/\/github.com\//gi,'') : false;
                var author = repoUrl ? repoUrl.split('/')[0] : false;
                var repo = repoUrl ? repoUrl.split('/')[1].replace('.git','') : npminfo.name;
                if( author && repo) {
                    GHService.getReadme(author, repo, 'v' + npminfo.version).success(function(file) {
                        $scope.readmeFile = file;
                    }).error(function() {
                        GHService.getReadme(author, repo, npminfo.version).success(function(file) {
                            $scope.readmeFile = file;
                        }).error(function() {
                            GHService.getReadme(author, repo, 'master').success(function(file) {
                                $scope.readmeFile = file;
                            });
                        });
                    });
                }
            } catch (err){
                console.log('Could not read Readme file :' + err);
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
