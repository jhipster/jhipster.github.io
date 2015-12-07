angular.module('marketplace.list', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list', {
    templateUrl: 'marketplace/list/list.html',
    controller: 'ModuleListCtrl'
  });
}])

marketplaceApp.controller('ModuleListCtrl', function ($scope, $http, $location) {
  $http.get('marketplace/data/modules.json').success(function(data) {
    $scope.modules = data;
    var modulesList= '';
    for (var i = 0; i < data.length; i++) {
        modulesList += data[i].npmPackageName + ',';
    }
    $http.get('https://api.npmjs.org/downloads/point/last-month/' + modulesList).success(function(data) {
        // TODO print download stats
    });
  });

  $scope.details = function(npmPackageName) {
    $location.path('/details/' + npmPackageName);
  };
});
