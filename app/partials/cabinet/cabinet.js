'use strict';

var cabinet = angular.module('myApp.cabinet', ['ngRoute'])

cabinet.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/cabinet', {
        templateUrl: 'partials/cabinet/cabinet.html',
        controller: 'CabinetCtrl'
    });
}]);

cabinet.controller('CabinetCtrl', ['$scope', '$http', '$routeParams', 'myService', 'localStorageService',
    function ($scope, $http, $routeParams, myService, localStorageService) {

        //gets local storage of current cabinet (may be null, thats okay, we check for that later)
        var cabInStore = localStorageService.get('cabinet');

        $scope.$watch('cabinet', function () {
            localStorageService.set('cabinet', $scope.cabinet); //sets local storage copy of cabinet
        }, true);

        $scope.$watch('cabinetChanged', function () {
            localStorageService.set('cabinetChanged', $scope.cabinetChanged); //sets local storage boolean of cabinet status
        }, true);


        var myDataPromise = myService.getData('json/cabinet.json');
        myDataPromise.then(function(result) {  // this is only run after $http completes
            $scope.cabinet = cabInStore || result; //uses local storage if its there, otherwise just the json result
            $scope.cabinetChanged = false; //just setting up this initially

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

            //sort by in stock
            $scope.inLiquor = [];
            $scope.outLiquor = [];
            var numIn = 0;
            var numOut = 0;
            for(var i=0;i<$scope.liquor.length;i++) {
                if($scope.liquor[i].inStock) {
                    $scope.inLiquor[numIn] = $scope.liquor[i];
                    numIn++;
                } else {
                    $scope.outLiquor[numOut] = $scope.liquor[i];
                    numOut++;
                }
            }

            $scope.inMixer = [];
            $scope.outMixer = [];
            numIn = 0;
            numOut = 0;
            for(var i=0;i<$scope.mixer.length;i++) {
                if($scope.mixer[i].inStock) {
                    $scope.inMixer[numIn] = $scope.mixer[i];
                    numIn++;
                } else {
                    $scope.outMixer[numOut] = $scope.mixer[i];
                    numOut++;
                }
            }

            $scope.inOther = [];
            $scope.outOther = [];
            numIn = 0;
            numOut = 0;
            for(var i=0;i<$scope.other.length;i++) {
                if($scope.other[i].inStock) {
                    $scope.inOther[numIn] = $scope.other[i];
                    numIn++;
                } else {
                    $scope.outOther[numOut] = $scope.other[i];
                    numOut++;
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

        $scope.toggleStock = function(ing) {
            console.log("called");
            $scope.cabinetChanged = true;
            ing.inStock = !ing.inStock;
            for(var i=0;i<$scope.cabinet.length;i++) {
                if($scope.cabinet[i].ing == ing) {
                    $scope.cabinet[i].ing.inStock = !$scope.cabinet[i].ing.inStock;
                }
            }
            console.log(ing);
            //console.log($scope.cabinetChanged);
        }

        //local storage webapp with nice mobile interface for now
            //future: use server to hold what is/isnt at myrtle bar, sync to everyone


    }
]);
