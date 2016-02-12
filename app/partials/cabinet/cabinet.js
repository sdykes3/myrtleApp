'use strict';

var cabinet = angular.module('myApp.cabinet', ['ngRoute'])
2
cabinet.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/cabinet', {
        templateUrl: 'partials/cabinet/cabinet.html',
        controller: 'CabinetCtrl'
    });
}]);

cabinet.controller('CabinetCtrl', ['$scope', '$http', '$timeout', '$routeParams',
    function ($scope, $http, $routeParams) {
        $http.get('json/cabinet.json').success(function (data) {
            $scope.cabinet = data;
        });

        //todo: add tabs to switch mixers/liquor lists

        $scope.getContent=function(index){
            $scope.tabs.isLoaded=true;
        };
        $scope.tabs = [
            { title:'Liquor' },
            { title:'Mixer'},
            { title:'Other'}
        ];

        //todo: add back navigation button to header

        //todo: toggle selections, save state for entire app

        //local storage webapp with nice mobile interface for now
            //future: use server to hold what is/isnt at myrtle bar, sync to everyone


    }
]);
