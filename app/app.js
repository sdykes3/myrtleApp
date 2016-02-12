'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'mgcrea.ngStrap',
  'mgcrea.ngStrap.modal',
  'mgcrea.ngStrap.aside',
  'mgcrea.ngStrap.tooltip',
  'ngAnimate',
  'ui.bootstrap',
  'myApp.index',
  'myApp.view1',
  'myApp.view2',
  'myApp.drinkDetails',
  'myApp.addDrink',
  'myApp.cabinet',
  'myApp.version'
]).config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);



app.directive("fruit", function() {
  return {
    restrict: "E",
    templateUrl: "partials/cabinet/fruit.html"
  };
});



var index = angular.module('myApp.index', ['ngRoute']);
index.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {

  $scope.aside = {
    "title": "Title",
    "content": "Hello Aside<br />This is a multiline message!"
  };

}]);
