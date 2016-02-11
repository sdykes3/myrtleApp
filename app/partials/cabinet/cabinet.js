'use strict';

var cabinet = angular.module('myApp.cabinet', ['ngRoute'])
2
cabinet.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/cabinet', {
        templateUrl: 'partials/cabinet/cabinet.html',
        controller: 'CabinetCtrl'
    });
}]);

cabinet.controller('CabinetCtrl', ['$scope', '$http', '$routeParams',
    function ($scope, $http, $routeParams) {
        $http.get('json/cabinet.json').success(function (data) {
            $scope.cabinet = data;
        });

        //todo: add tabs to switch mixers/liquor lists

        $scope.tabs = [
            {title:'Home', content: 'Raw denim you probably haven\'t heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica.'},
            {title:'Profile', content: 'Food truck fixie locavore, accusamus mcsweeney\'s marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee.'},
            {title:'About', content: 'Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney\'s organic lomo retro fanny pack lo-fi farm-to-table readymade.'}
        ];

        $scope.tabs.activeTab = 1;

        $scope.pushTab = function() {
            $scope.tabs.push({title: 'Contact', content: 'Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid.'});
        };


        //todo: add back navigation button to header

        //todo: toggle selections, save state for entire app

        //local storage webapp with nice mobile interface for now
            //future: use server to hold what is/isnt at myrtle bar, sync to everyone


    }
]);
