'use strict';

var marketplaceApp = angular.module('marketplaceApp', ['ngRoute', 'marketplace.list', 'marketplace.details']);

marketplaceApp.config([
  '$interpolateProvider', function($interpolateProvider) {
    return $interpolateProvider.startSymbol('{(').endSymbol(')}');
  }
]);

marketplaceApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/list'});
}]);
