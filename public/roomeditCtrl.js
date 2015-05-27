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

				$scope.room = data; 

				console.log("Rooms successfully obtained " + JSON.stringify($scope.room.Name));

			}).error(function(data, status, headers, config) {
				console.log("Error acquiring Room data");
				return;
			});
		};

		//Update the room data with the currently entered form data
		$scope.updateRoomData = function() { //@TODO
			$http({
				url: '/editroom/',
				method: "PUT",
				data:  JSON.stringify($scope.room),
				headers: {'Content-Type': 'application/json'}
			}).success(function (data, status, headers, config) {
				console.log("Room updated = " + JSON.stringify($scope.room.Name) );
			}).error(function (data, status, headers, config) {
				console.log("Update failed");
			});	
		};

	}
])