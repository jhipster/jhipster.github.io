// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function () {
    $('body').on('click', '.page-scroll a', function (event) {
        var $anchor = $($(this).attr('href')).offset().top;
        $('html, body').stop().animate({
            scrollTop: $anchor
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function () {
    $('.navbar-toggle:visible').click();
});

// Angular JS code
(function () {
    'use-strict';

    angular.module('jhipster.home', ['jhipster.service', 'marketplace.list', 'jhipster.users'])
        .config([
          '$interpolateProvider',
            function ($interpolateProvider) {
                return $interpolateProvider.startSymbol('{(').endSymbol(')}');
          }
        ])
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'GHService', 'NpmService'];

    function HomeController($scope, GHService, NpmService) {
        GHService.getGitHubConfig('jhipster', 'generator-jhipster').success(function (data) {
            $scope.gitConfig = data;
        });
        $scope.gitContributors = '500+';
        /*
        // Commented out as this isn't efficient now we have 400+ contributors
        var page = 0;
        var noOfContributors = 0;
        function getContributors(){

            GHService.getGitHubContributors('jhipster', 'generator-jhipster', page).success(function (data) {
                if(data.length != 0){
                    noOfContributors += data.length;
                    page ++;
                    getContributors();
                } else {
                    // some how there seems to be losing 39 to actual number, so dirty hack
                    $scope.gitContributors = noOfContributors + 39;
                }
            });
        }

        getContributors();
        */

        NpmService.getNpmDownloadsLastMonth('generator-jhipster').success(function (data) {
            $scope.npmDownloads = data.downloads;
        });

    }

})();
