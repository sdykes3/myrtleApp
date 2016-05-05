'use strict';

var serverurl = "http://myrtleapi.prismo.biz/";
var view2 = angular.module('myApp.view2', ['ngRoute'])

view2.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view2', {
        templateUrl: 'partials/view2/view2.html',
        controller: 'View2Ctrl'
    });
}]);


view2.controller('View2Ctrl', ['$scope', '$http', '$q', 'localStorageService', function ($scope, $http, $q, localStorageService) {


    //gets local storage of current cabinet (may be null, thats okay, we check for that later)
    var cabInStore = localStorageService.get('cabinet');

    //gets local storage of current available drinks (may be null, thats okay, we check for that later)
    var drinksAvailable = localStorageService.get('drinksAvailable');
    $scope.$watch('drinksAvailable', function () {
        localStorageService.set('drinksAvailable', $scope.drinksAvail);
    }, true);

    //only decide new drinks available if cabinet has changed from last time
    var cabinetChanged = localStorageService.get('cabinetChanged');
    cabinetChanged = true;


    console.log("drinks avail: " + drinksAvailable);
    console.log(cabinetChanged);
    if(drinksAvailable == null || cabinetChanged) {

        var httpDrinks = $http.get('json/drinks.json').success(function (data) {
            $scope.drinks = data;
        });
        var httpCabinet = $http.get(serverurl + "checkIngredients").success(function (data) {
            $scope.cabinet = data; //uses local storage if its there, otherwise just the json result
            //console.log("1");
            //console.log($scope.drinks);
            //console.log("111");

        });

        $q.all([httpDrinks, httpCabinet]).then(function() {
            var numAvail = 0;
            //$scope.drinksAvail = $scope.drinks;
            $scope.drinksAvail = [];
            //console.log("2");

            for(var i = 0; i < $scope.drinks.length; i++) { //go through all drinks
                //console.log("all drinks 4");
                var addedAlready = false;
                var somethingMissing = false;
                for (var j = 0; j < $scope.drinks[i].ingredients.length; j++) { //go through all ingredients in each drink
                    //console.log("all ing 5");
                    var ing = $scope.drinks[i].ingredients[j].id;
                    for (var k = 0; k < $scope.cabinet.length; k++) { //go through all ingredients in each drink
                        //console.log("all cabinet 6");
                        //if this drink hasnt been added to drinksAvail yet
                        if (!addedAlready && ($scope.cabinet[k].id == ing)) { //if ingredient is in cabinet
                            //console.log("all true 7");
                            if (!($scope.cabinet[k].inStock)) { //if ingred is in stock
                                //console.log("true 8");

                                somethingMissing = true;
                            }
                        }
                    }
                }

                //if wasnt missing anything, add to list
                if (!somethingMissing) {
                    $scope.drinksAvail[numAvail] = $scope.drinks[i];
                    numAvail ++;
                    addedAlready = true;
                    //console.log($scope.drinksAvail);
                    localStorageService.set('drinksAvailable', $scope.drinksAvail);
                    //console.log("set drinks available");

                }

            }
        });


        //reset cabinet changed, since drinks available listing and it are now in sync
        localStorageService.set('cabinetChanged', false);
        //console.log("set cab change to false");
        //console.log("3");

    } else {
        console.log("nothing changed or drinks available listing is null");
        $scope.drinksAvail = drinksAvailable;
    }



}]);
