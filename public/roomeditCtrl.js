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
.controller('RoomEditCtrl', ['$scope', '$rootScope', '$http', '$route',
	function($scope,  $rootScope, $http, $route) {
		$scope.getRoomData = function() { //@TODO
			$scope.roomID = $route.current.params.roomID;
			//console.log("Room ID " + $scope.roomID);

			var userID = 1; //Obtain current user's ID

			$http.get('/rooms/'+ $scope.roomID ).success(function(data, status, headers, config) {
				//data is an array of rooms, id the room by RoomID and return that data
				console.log("Room "+data.RoomID + " successfully obtained")
					
				//var i = RoomID;
				var i = $scope.roomID;
				/*
				var room = {
				   	"RoomID": data.RoomID,
				   	"Name": data.Name,
				   	"UserID": data.UserID,
				   	"Description": data.Description,
				   	"DateDestroy":data.DateDestroy,
				   	"PrivacyEnabled": data.PrivacyEnabled,
				   	"AllowedUsers": data.AllowedUsers,
				   	"Messages": data.Messages
				};
				*/

			   $rootScope.room = data;
			   $scope.room = data; 

				console.log("Rooms successfully obtained " + JSON.stringify($scope.room.Name));

			}).error(function(data, status, headers, config) {
	  			console.log("Error acquiring Room data");
	  			return;
			});
		};
	}
]);