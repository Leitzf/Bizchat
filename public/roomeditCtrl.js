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

 		//Obtains Room data of an individual Room by RoomId
		$scope.getRoomData = function() { 
			$scope.roomID = $route.current.params.roomID;

			//console.log("Room ID " + $scope.roomID);
			
			var userID = 1; //Obtain current user's ID

			$http.get('/rooms/'+ $scope.roomID ).success(function(data, status, headers, config) {

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
			$scope.roomID = $route.current.params.roomID;
			
			$http({
				url: '/editroom/'+ $scope.roomID ,
				method: "PUT",
				data:  JSON.stringify($scope.room),
				headers: {'Content-Type': 'application/json'}
			}).success(function (data, status, headers, config) {
				console.log("Room updated = " + JSON.stringify($scope.room.Name) );
			}).error(function (data, status, headers, config) {
				console.log("Update failed");
			});	
		};


		//Delete a Room
		$scope.deleteRoomData = function() { //@TODO
			console.log("Attempting Room Delete (Controller)");
			$scope.roomID = $route.current.params.roomID;
			
			$http({
				url: '/deleteroom/'+ $scope.roomID ,
				method: "DELETE",
			}).success(function (data, status, headers, config) {
				console.log("Room deleted = " + JSON.stringify($scope.room.Name) );
				$scope.roomDeleted = true;
			}).error(function (data, status, headers, config) {
				console.log("Delete failed");
			});	
		};


	}
])