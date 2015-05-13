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
			console.log("Calling getProfile");
			$scope.user = {
				Fname : "Genenenenene",
				Lname : "Purmishurn",
				Picture : "http://www.firefoods.co.uk/wp-content/uploads/2013/03/SwedishChef.jpg",
				EmailAddr : "borkbork@example.com"
			}
			var img = new Image();
			img.src = $scope.user.Picture;
		};
	}
]);

