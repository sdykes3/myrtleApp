'use strict';

var view2 = angular.module('myApp.view2', ['ngRoute'])

view2.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view2', {
        templateUrl: 'partials/view2/view2.html',
        controller: 'View2Ctrl'
    });
}])

view2.controller('View2Ctrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('json/drinks.json').success(function (data) {
        $scope.drinks = data;
    });
}]);
