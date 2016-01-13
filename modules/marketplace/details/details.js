angular.module('marketplace.details', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/details/:npmPackageName', {
    templateUrl: 'marketplace/details/details.html',
    controller: 'ModuleDetailsCtrl'
  });
}])

marketplaceApp.controller('ModuleDetailsCtrl', function ($scope, $routeParams, $http, $location) {
  $scope.npmPackageName = $routeParams.npmPackageName;

  $http.get('marketplace/data/modules.json').success(function(data) {
      for (var i = 0; i < data.length; i++) {
          var module = data[i];
          if (module.npmPackageName == $scope.npmPackageName) {
              $scope.module = module;
              if (module.jhiVersionRequired == undefined) {
                  module.jhiVersionRequired = 'no version configured';
              }
          }
      }
    });

  $http.get('https://api.npmjs.org/downloads/range/last-month/' + $scope.npmPackageName).success(function(data) {
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
          x : 'date',
          xFormat : '%Y-%m-%d',
          columns: [
            dates,
            downloads
          ]
        },
        axis : {
          x : {
            type : 'timeseries',
            tick : {
              format : "%e %b %y" // https://github.com/mbostock/d3/wiki/Time-Formatting#wiki-format
            }
          }
        }
      });
    });

  $scope.list = function() {
    $location.path('/list');
  };
});
