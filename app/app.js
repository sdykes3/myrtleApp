'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'mgcrea.ngStrap',
  'mgcrea.ngStrap.modal',
  'mgcrea.ngStrap.aside',
  'mgcrea.ngStrap.tooltip',
  'myApp.view1',
  'myApp.view2',
  'myApp.drinkDetails',
  'myApp.addDrink',
  'myApp.cabinet',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
