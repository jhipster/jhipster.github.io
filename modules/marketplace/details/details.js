angular.module('marketplace.details', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/details/:npmPackageName', {
    templateUrl: 'marketplace/details/details.html',
    controller: 'ModuleDetailsCtrl'
  });
}])

marketplaceApp.controller('ModuleDetailsCtrl', function ($scope, $routeParams, $http) {
    $scope.npmPackageName = $routeParams.npmPackageName;

    $http.get('https://api.npmjs.org/downloads/range/last-month/generator-jhipster-fortune').success(function(data) {
      $scope.downloads = data.downloads;
      var chart = c3.generate({
        bindto: '#chart',
        data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250]
        ]
    }
});
    });
});
