 'use strict';
/**
 * @ngdoc overview
 * @name To Do App
 * @description
 * # To do Application
 *
 * Main module of the application.
 */
angular
.module('BizchatApp')
.controller('ProfileCtrl', ['$scope', '$rootScope', '$http',
	function($scope,  $rootScope, $http) {
		$scope.getProfile = function() {
			/*
			console.log ("Getting Profile");
			$http.get('../data/json').success(function(data, status, headers, config) {
			$scope.user = data;
			});
			*/
			$scope.Fname = "Genenenenene";
			$scope.Lname = "Parmeeeeeesian";
			$scope.Picture = " Pictures";
			$scope.EmailAddr = "noob@example.com";
		};
	}
]);

