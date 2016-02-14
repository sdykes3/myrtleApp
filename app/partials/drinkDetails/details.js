'use strict';

var drinkDetails = angular.module('myApp.drinkDetails', ['ngRoute'])

drinkDetails.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/drinks/:drinkId', {
        templateUrl: 'partials/drinkDetails/drink-detail.html',
        controller: 'DrinkDetailsCtrl'
    });
}]);

drinkDetails.controller('DrinkDetailsCtrl', ['$scope', '$http', '$routeParams',
    function ($scope, $http, $routeParams) {
        var drinkID = $routeParams.drinkId;
        var url = 'json/' + drinkID + '.json';
        $http.get(url).success(function (data) {
            $scope.drink = data;
            console.log($scope.drink);
        });
        $scope.drinkId = $routeParams.drinkId;
    }
]);
