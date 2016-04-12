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
  'LocalStorageModule',
  'mm.foundation.offcanvas',
  'myApp.index',
  'myApp.view1',
  'myApp.view2',
  'myApp.drinkDetails',
  'myApp.addDrink',
  'myApp.cabinet',
  'myApp.version'
]).config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view2'});
}]).config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('ls');
}]);



// For cabinet
app.directive("fruit", function() {
  return {
    restrict: "E",
    templateUrl: "partials/cabinet/tabs.html"
  };
});



//For all http get calls
app.service('myService', function($http) {

  var getData = function(url) {

    return $http({method:"GET", url:url}).then(function(result){
      return result.data;
    });
  };
  return { getData: getData };
});



//Main controller for index page
var index = angular.module('myApp.index', ['ngRoute']);

index.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {

  $scope.aside = {
    "title": "Title!!!",
    "content": "Hello Aside!!!!<br/>This is a multiline message!"
  };

}]);
