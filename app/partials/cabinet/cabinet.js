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

        $scope.tabs = [
            { title:"Apple", content:[] , isLoaded:false , active:true},
            {  title:"Pear", content:[] , isLoaded:false }
        ];

        $scope.getContent=function(index){
            alert("calling");
            /* see if we have data already */
            if($scope.tabs.isLoaded){
                alert("loaded");
                return;
            }
            /* or make request for data delayed to show Loading... */
            $timeout(function(){
                alert("not loaded");
                var jsonFile='data1.json'
                $http.get(jsonFile).then(function(res){
                    $scope.tabs.content=res.data[0].fruit;
                    console.log(res.data[0].fruit);
                    $scope.tabs.isLoaded=true;
                });

            },100)

        };



        //$scope.tabs = [
        //    {title:'Apple', template: 'fruit.html'},
        //    {title:'Pear', content: 'Food truck fixie locavore, accusamus mcsweeney\'s marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee.'},
        //
        //];

        $scope.tabs.activeTab = 0;

        $scope.pushTab = function() {
            $scope.tabs.push({title: 'Contact', content: 'Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid.'});
        };


        //todo: add back navigation button to header

        //todo: toggle selections, save state for entire app

        //local storage webapp with nice mobile interface for now
            //future: use server to hold what is/isnt at myrtle bar, sync to everyone


    }
]);
