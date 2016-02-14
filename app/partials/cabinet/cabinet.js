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

            //todo: sort by in stock, then alphabetically (add to it alphabetically???)
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
            ing.inStock = !ing.inStock;
            for(var i=0;i<$scope.cabinet.length;i++) {
                if($scope.cabinet[i].ing == ing) {
                    $scope.cabinet[i].ing.inStock = !$scope.cabinet[i].ing.inStock;
                }
            }

            console.log(ing);

            //todo: now write that to the json file


            






            //$http.post('json/cabinet.json', $scope.cabinet).then(function(data) {
            //    $scope.msg = 'Data saved';
            //    console.log($scope.msg);
            //});
            //
            //$http({
            //    method: 'POST',
            //    url: 'json/cabinet.json',
            //    data: "cabinet" + cabinet,
            //    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            //}).then(function(data) {
            //    $scope.msg = 'Data saved';
            //    console.log($scope.msg);
            //});


        }

        //local storage webapp with nice mobile interface for now
            //future: use server to hold what is/isnt at myrtle bar, sync to everyone


    }
]);
