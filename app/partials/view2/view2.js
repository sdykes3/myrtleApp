'use strict';

var view2 = angular.module('myApp.view2', ['ngRoute'])

view2.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view2', {
        templateUrl: 'partials/view2/view2.html',
        controller: 'View2Ctrl'
    });
}])


view2.controller('View2Ctrl', ['$scope', '$http', '$q', function ($scope, $http, $q) {

    var httpDrinks = $http.get('json/drinks.json').success(function (data) {
        $scope.drinks = data;
    });
    var httpCabinet = $http.get('json/cabinet.json').success(function (data) {
        $scope.cabinet = data;
        console.log("1");
        console.log("11");
        console.log("111");

    });

    $q.all([httpDrinks, httpCabinet]).then(function() {
        var numAvail = 0;
        //$scope.drinksAvail = $scope.drinks;
        $scope.drinksAvail = [];
        console.log("2");

        for(var i = 0; i < $scope.drinks.length; i++) { //go through all drinks
            console.log("all drinks 4");
            var addedAlready = false;
            var somethingMissing = false;
            for (var j = 0; j < $scope.drinks[i].ingredients.length; j++) { //go through all ingredients in each drink
                console.log("all ing 5");
                var ing = $scope.drinks[i].ingredients[j].id;
                for (var k = 0; k < $scope.cabinet.length; k++) { //go through all ingredients in each drink
                    console.log("all cabinet 6");
                    //if this drink hasnt been added to drinksAvail yet
                    if (!addedAlready && ($scope.cabinet[k].id == ing)) { //if ingredient is in cabinet
                        console.log("all true 7");
                        if (!($scope.cabinet[k].inStock == "true")) { //if ingred is in stock
                            console.log("true 8");

                            somethingMissing = true;


                            //if not already added to drinksAvail
                            //var isAlreadyThere = false;
                            //for (var m = 0; m < $scope.drinksAvail; m++) {
                            //    if($scope.drinksAvail[m].id = $scope.drinks[i].id) {
                            //        console.log("alreadyAdded 9");
                            //        isAlreadyThere = true;
                            //    }
                            //}
                            //
                            //if(!isAlreadyThere) {
                            //    console.log("ADDING 10");
                            //    $scope.drinksAvail[numAvail] = $scope.drinks[i];
                            //    numAvail ++;
                            //    console.log($scope.drinksAvail);
                            //}


                            //$scope.drinksAvail.splice(i,1);


                        }
                    }
                }
            }

            //if wasnt missing anything, add to list
            if (!somethingMissing) {
                $scope.drinksAvail[numAvail] = $scope.drinks[i];
                numAvail ++;
                addedAlready = true;
                console.log($scope.drinksAvail);
            }

        }
    });



    console.log("3");

    //$scope.$apply(function () {
    //    for(var i = 0; i < $scope.drinks[i].length; i++) { //go through all drinks
    //        console.log("all drinks 4");
    //        for(var j = 0; j < $scope.drinks[i].ingredients.length; j++) { //go through all ingredients in each drink
    //            var ing = $scope.drinks[i].ingredients.id;
    //
    //            //is this ingredient in the cabinet and in stock?
    //            for(var k = 0; k < $scope.cabinet.length; k++) { //go through all ingredients in each drink
    //                if ($scope.cabinet[k].id == ing) {
    //                    if (($scope.cabinet[k].inStock)) { //if found and in stock
    //                        $scope.drinksAvail.add($scope.drinks[i]);
    //                        console.log($scope.drinksAvail);
    //                    }
    //                }
    //            }
    //        }
    //    }
    //});

}]);
