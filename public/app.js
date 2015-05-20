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
  $routeProvider
  .when('/', {
    templateUrl: '/welcome.html'
  })
  .when('/main', {
    templateUrl: '/mainpageview.html',
          controller: 'ProfileCtrl'
        })
  .when('/roomlist/', { //:userID
    templateUrl: '/roomlistview.html',
          controller: 'RoomListCtrl'
        })
  .when('/roomlist/edit/:roomID', {
    templateUrl: '/roomeditview.html',
          controller: 'RoomEditCtrl'
        })
  .when('/mainchat', {
    templateUrl: '/mainchatview.html',
          //controller: 'MainChatCtrl'
        })
  .when('/roomlist/createroom/', {
	 templateUrl: '/createroomview.html',
		  controller: 'UserCtrl',
		})
  .otherwise({
    redirectTo: '/'
  });
});

