 'use strict';
/**
 * @ngdoc overview
 * @name BischatApp
 * @description
 * # This is the Controller for the room list page of a given user
 *
 * Main module of the application.
 */
angular
.module('BizchatApp')
.controller('RoomListCtrl', ['$scope', '$rootScope', '$http',
	function($scope,  $rootScope, $http) {
		$scope.getProfile = function() {
			console.log("Calling getProfile");
			$scope.user = {
				Fname : "Genenenenene",
				Lname : "Purmishurn",
				Picture : "http://www.firefoods.co.uk/wp-content/uploads/2013/03/SwedishChef.jpg",
				EmailAddr : "borkbork@example.com",
				userID: 1
			}
			/*
			$http.get('/publicuser.json').success(function(data) {
				console.log("Successfully found user data");
   				 $scope.user = data;
			});*/
			var img = new Image();
			//img.src = $scope.user.Picture;
		};
	}
]);

