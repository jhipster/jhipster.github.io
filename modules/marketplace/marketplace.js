'use strict';

var marketplaceApp = angular.module('marketplaceApp', []);

marketplaceApp.config([
  '$interpolateProvider', function($interpolateProvider) {
    return $interpolateProvider.startSymbol('{(').endSymbol(')}');
  }
]);

marketplaceApp.controller('ModuleListCtrl', function ($scope, $http) {
  $http.get('marketplace/data/modules.json').success(function(data) {
    $scope.modules = data;
  });

});
