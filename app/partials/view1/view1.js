'use strict';

var view1 = angular.module('myApp.view1', ['ngRoute']);

view1.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
        templateUrl: 'partials/view1/view1.html',
        controller: 'View1Ctrl'
    });
}]);

view1.controller('View1Ctrl', ['$scope', '$http', function ($scope, $http) {

    $scope.aside = {
        "title": "Title",
        "content": "Hello this is in ng-view!"
    };

}]);