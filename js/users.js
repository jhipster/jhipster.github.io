(function () {
    'use strict';
    angular
        .module('jhipster.users', [])
        .config(['$interpolateProvider', function ($interpolateProvider) {
            return $interpolateProvider.startSymbol('{(').endSymbol(')}');
          }
        ])
        .controller('UsersCtrl', UsersCtrl);

    UsersCtrl.$inject = ['$http', '$scope'];

    function UsersCtrl($http, $scope) {
        $scope.users = [];
        $scope.showFeatured = true;
        loadUsers();

        function loadUsers() {
            $http.get('/companies-using-jhipster/users.json').then(function(response) {
                $scope.users = response.data.users;
            });
        }
     }
})();
