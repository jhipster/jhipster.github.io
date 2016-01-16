(function () {
    'use-strict';

    angular.module('jhipster.service', [])
        .factory('GHService', GHService)
        .factory('NpmService', NpmService)
        .factory('ModuleService', ModuleService);

    GHService.$inject = ['$http'];
    NpmService.$inject = ['$http'];
    ModuleService.$inject = ['$http'];

    function GHService($http) {
        return {
            
            getGithubConfig: function (author, name) {
                return $http.get('https://api.github.com/repos/' + author + '/' + name).success(function (resp) {
                    return resp;
                });
            },
            getGithubContributors: function(author, name, page) {
                return $http.get('https://api.github.com/repos/' + author + '/' + name + '/contributors?page=' + page).success(function (resp) {
                    return resp;
                });
            }
        }
    }

    function NpmService($http) {
        return {
            getNpmDownloadsLastMonth: function (name) {
                return $http.get('https://api.npmjs.org/downloads/point/last-month/' + name).success(function (resp) {
                    return resp;
                });
            },
            
            getNpmDownloadsRangeLastMonth: function (name) {
                return $http.get('https://api.npmjs.org/downloads/range/last-month/' + name).success(function (resp) {
                    return resp;
                });
            },

            getNpmInfo: function (npmPackageName) {
                return $http.get('https://cors-anywhere.herokuapp.com/registry.npmjs.org/' + npmPackageName + '/latest').success(function (resp) {
                    return resp;
                });
            }
        }
    }
    
    function ModuleService($http) {
        return {
            getModules: function () {
                return $http.get('/modules/marketplace/data/modules.json').success(function (resp) {
                    return resp;
                });
            }
        }
    }


})();
