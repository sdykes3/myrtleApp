'use strict';

var addDrink = angular.module('myApp.addDrink', ['ngRoute'])

addDrink.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/addDrink', {
        templateUrl: 'partials/addDrink/add-drink.html',
        controller: 'AddDrinkCtrl'
    });
}]);

addDrink.controller('AddDrinkCtrl', ['$scope', '$http', '$routeParams',
    function ($scope, $http, $routeParams) {
        $http.get('json/drinks.json').success(function (data) {
            $scope.drinks = data;
        });

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
                window.localStorage['drinks'] = JSON.stringify(drinks);
                $scope.newList = JSON.parse(window.localStorage['drinks']);

                //todo: make changes to json file or add to local storage
                //todo: create new details json file for new drink

                //todo: at start, check if have local storage. if not, put defaults in. if so, use that

                //$http.post('json/drinks.json', $scope.drinks);
            }
        };



    }
]);
