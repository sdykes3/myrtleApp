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

    }
]);
