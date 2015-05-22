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
			$scope.roomId = $route.current.params.roomID;
			console.log("Room ID " + $scope.roomID);

			$http.get('/room/:roomId').success(function(data, status, headers, config) {
				//data is an array of rooms, id the room by RoomID and return that data
				$scope.results = data;
				
				//var i = RoomID;
				var i = $scope.roomID;
				var room = {
					"Name": data[i].Name,
				   	"Description": data[i].Description,
				   	"DateDestroy": data[i].DateDestroy, 
				   	"RoomID" : data[i].RoomID,
				   	"PrivacyEnabled":data[i].PrivacyEnabled
				};
				//@TODO Implement showing user list for a given room
			   $rootScope.room = room;
			   $scope.room = room; 

			}).error(function(data, status, headers, config) {
	  			console.log("Error acquiring Room data");
	  			return;
			});
		};
	}
]);