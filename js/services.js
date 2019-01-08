(function () {
    'use-strict';

    angular.module('jhipster.service', [])
        .factory('GHService', GHService)
        .factory('NpmService', NpmService)
        .factory('ModuleService', ModuleService)
        .filter('jhiModuleFilter', jhiModuleFilter)
        .filter('jhiAuthorFilter', jhiAuthorFilter);

    GHService.$inject = ['$http'];
    NpmService.$inject = ['$http'];
    ModuleService.$inject = ['$http'];

    function GHService($http) {
        return {

            getGitHubConfig: function (author, name) {
                return $http.get('https://api.github.com/repos/' + author + '/' + name).success(function (resp) {
                    return resp;
                });
            },
            getGitHubContributors: function(author, name, page) {
                return $http.get('https://api.github.com/repos/' + author + '/' + name + '/contributors?page=' + page).success(function (resp) {
                    return resp;
                });
            },

            getReadme: function(author, repo, version) {
                return $http.get('https://raw.githubusercontent.com/' + author + '/' + repo + '/' + version +'/README.md').success(function (resp) {
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
        var currentModule;
        return {
            getModulesConfig: function () {
                return $http.get('/modules/marketplace/data/modules-config.json').success(function (resp) {
                    return resp;
                });
            },
            getAllModules: function (start, size) {
                /* Get all Jhipster modules */
                return $http.get('https://api.npms.io/v2/search?q=keywords%3Ajhipster-module%2Cjhipster-blueprint&from=' + start + '&size=' + size).success(function (resp) {
                    return resp;
                });
            },
            setCurrent: function(module) {
                currentModule = module;
            },
            getCurrent: function(module) {
                return currentModule;
            }
        }
    }

    function jhiModuleFilter () {
        return function(input) {
            return input.replace('generator-jhipster-','').replace(/(?:^|[\s\-\_\.])\S/g, function(a) {
                return a.replace(/[\-\_\.]/,' ').toUpperCase();
            });
        };
    }

    function jhiAuthorFilter() {
        return function(input) {
            var authors = [];
            angular.forEach(input, function(author) {
                authors.push(author.username? author.username : author.name);
            });
            return authors.join(', ');
        };
    }

})();
