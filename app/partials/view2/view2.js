'use strict';

var view2 = angular.module('myApp.view2', ['ngRoute'])

view2.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view2', {
        templateUrl: 'partials/view2/view2.html',
        controller: 'View2Ctrl'
    });
}])

view2.controller('View2Ctrl', ['$scope', '$http', function ($scope, $http) {
    var drinkNum;
    $http.get('json/drinks.json').success(function (data) {
        $scope.drinks = data;
        drinkNum = data.length;
    });
    $http.get('json/cabinet.json').success(function (data) {
        $scope.cabinet = data;
    });

    //todo: cut down drinks to only those with ingredients that are inStock in cabinet

    $scope.drinksAvail = $scope.drinks;



    //$scope.$apply(function () {
        for(var i = 0; i < drinkNum; i++) { //go through all drinks
            for(var j = 0; j < $scope.drinks[j].ingredients.length; j++) { //go through all ingredients in each drink
                var ing = $scope.drinks[i].ingredients.id;

                //is this ingredient in the cabinet and in stock?
                for(var k = 0; k < $scope.cabinet.length; k++) { //go through all ingredients in each drink
                    if ($scope.cabinet[k].id == ing) {
                        if (($scope.cabinet[k].inStock)) { //if found and in stock
                            $scope.drinksAvail.add($scope.drinks[i]);
                        }
                    }
                }
            }
        }
    //});

}]);
