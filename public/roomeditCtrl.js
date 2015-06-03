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

 		$scope.room = {
 			"_id":"",
			"RoomID": "NaNbread",
			"Name": "",
			"UserID": "1",
			"Description": "",
			"DateDestroy":"",
			"PrivacyEnabled": "True", //case is important, views use True and False
			"AllowedUsers": [],
			"Messages": []
		};

		$scope.roomID = $route.current.params.roomID;

		$http.get('/rooms/'+ $scope.roomID ).success(function(data, status, headers, config) {
			$scope.room = data; 
			console.log("Edit Room "+ $scope.room.RoomID + " data successfully obtained")
		}).error(function(data, status, headers, config) {
			console.log("Error acquiring Edit Room data");
			return;
		});

		//Update the room data with the currently entered form data
		$scope.updateRoomData = function() { //@TODO

			console.log ("Editing "+ $scope.roomID +" room to have " + JSON.stringify($scope.room));

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