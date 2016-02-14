'use strict';

var cabinet = angular.module('myApp.cabinet', ['ngRoute'])
2
cabinet.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/cabinet', {
        templateUrl: 'partials/cabinet/cabinet.html',
        controller: 'CabinetCtrl'
    });
}]);

cabinet.controller('CabinetCtrl', ['$scope', '$http', '$routeParams', 'myService',
    function ($scope, $http, $routeParams, myService) {
        //$http.get('json/cabinet.json').success(function (data, status, headers, config) {
        //    $scope.cabinet = data;
        //});


        var myDataPromise = myService.getData('json/cabinet.json');
        myDataPromise.then(function(result) {  // this is only run after $http completes
            $scope.cabinet = result;

            $scope.liquor = [];
            $scope.mixer = [];
            $scope.other = [];
            for(var i=0;i<$scope.cabinet.length;i++) {
                if($scope.cabinet[i].type == "liquor") {
                    $scope.liquor[i] = $scope.cabinet[i];
                } else if ($scope.cabinet[i].type == "mixer") {
                    $scope.mixer.push($scope.cabinet[i]);
                } else if ($scope.cabinet[i].type == "other") {
                    $scope.other.push($scope.cabinet[i]);
                }
            }
        });



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
