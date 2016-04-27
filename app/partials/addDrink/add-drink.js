'use strict';

var addDrink = angular.module('myApp.addDrink', ['ngRoute'])

addDrink.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/addDrink', {
        templateUrl: 'partials/addDrink/add-drink.html',
        controller: 'AddDrinkCtrl'
    });
}]);

addDrink.controller('AddDrinkCtrl', ['$scope', '$http', '$routeParams', 'localStorageService',
    function ($scope, $http, $routeParams, localStorageService) {
        $http.get('json/drinks.json').success(function (data) {
            $scope.drinks = data;
        });


        //gets local storage of current cabinet (may be null, thats okay, we check for that later)
        var drinkRecInStore = localStorageService.get('drinkRecipes');



        $scope.newDrink = {
            name: '',
            cost: '',
            ingredients: [
                { name: '' }
            ]
        }

        $scope.addIngRow = function() {
            $scope.newDrink.ingredients.push({ name: '' });
        };

        //todo: allow removing a row

        $scope.removeBlankIng = function() {
            for(var i = 0; i < $scope.newDrink.ingredients.length; i++) {
                if($scope.newDrink.ingredients[i].name == '') {
                    $scope.newDrink.ingredients.splice(i, 1);
                    $scope.removeBlankIng();
                }
            }
        }

        $scope.submitFinalDrink = function() {
            if($scope.newDrink.name == '' || $scope.newDrink.cost == '') {
                //todo: do something about it
                alert("NOT called");
            } else {
                $scope.removeBlankIng();
                $scope.drinks.push($scope.newDrink);


                //todo: add to local storage

                //localStorageService.set('drinkRecipes', $scope.drinks);


                //todo: make changes to local storage
                    //if ingredient, write new ls.cabinet; if drink recipe, write new completely
                    //todo: make other pages pulling drinks.json check for local storage override, including this page!
                        //dont overload old custom recipes with new ones here

                //todo: create new details json file for new drink




                //window.localStorage['drinks'] = JSON.stringify(drinks);
                //$scope.newList = JSON.parse(window.localStorage['drinks']);
                //$http.post('json/drinks.json', $scope.drinks);
            }
        };



    }
]);
