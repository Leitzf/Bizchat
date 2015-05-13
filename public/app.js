'use strict';

/**
 * @ngdoc overview
 * @name To Do App
 * @description
 * # To do Application
 *
 * Main module of the application.
 */
 angular.module('BizchatApp', [
  'ngAnimate',
  'ngAria',
  'ngCookies',
  'ngMessages',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch'
  ])
 .config(function ($routeProvider) {

  console.log("What the fuck");
  $routeProvider
  .when('/', {
    templateUrl: '/welcome.html'
  })
  .when('/main', {
    templateUrl: '/mainpageview.html',
          //controller: 'MainCtrl'
        })
  .when('/roomlist/:userId', {
    templateUrl: '/userroomlistview.html',
          //controller: 'RoomsCtrl'
        })
  .when('/roomlist/:userId/edit/:roomID', {
    templateUrl: '/roomeditview.html',
          //controller: 'RoomsCtrl'
        })
  .when('/mainchat', {
    templateUrl: '/mainchatview.html',
          //controller: 'RoomsCtrl'
        })
  .otherwise({
    redirectTo: '/'
  });
});

