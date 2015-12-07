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
  });

  $scope.details = function(npmPackageName) {
    $location.path('/details/' + npmPackageName);
  };
});
