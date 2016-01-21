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

    angular.module('jhipster.home', ['jhipster.service', 'marketplace.list'])
        .config([
          '$interpolateProvider',
            function ($interpolateProvider) {
                return $interpolateProvider.startSymbol('{(').endSymbol(')}');
          }
        ])
        .controller('HomeController', HomeController);
    
    HomeController.$inject = ['$scope', 'GHService', 'NpmService'];

    function HomeController($scope, GHService, NpmService) {
        GHService.getGithubConfig('jhipster', 'generator-jhipster').success(function (data) {
            $scope.gitConfig = data;
        });
        var page = 0;
        $scope.gitConftributors = '...';
        var noOfContributors = 0;
        function getContributors(){
            
            GHService.getGithubContributors('jhipster', 'generator-jhipster', page).success(function (data) {
                if(data.length != 0){
                    noOfContributors += data.length;
                    page ++;
                    getContributors();
                } else {
                    // some how there seems to be additional 30 added to actual number, so dirty hack
                    $scope.gitConftributors = noOfContributors - 30;
                }
            });
        }

        getContributors();

        NpmService.getNpmDownloadsLastMonth('generator-jhipster').success(function (data) {
            $scope.npmDownloads = data.downloads;
        });

    }

})();
