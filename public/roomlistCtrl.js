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
		
		$scope.getRoomList = function() {
			$http.get('/rooms/').success(function(data, status, headers, config) {
			   
				var userID = 1; //Obtain current user's ID
			   	var roomlist = [];
			   	for (var i = 0; i < data.length; i++) {
			   		var newRoom = { 
			   			"Name": data[i].Name,
			   			"Description": data[i].Description,
			   			"DateDestroy": data[i].DateDestroy, 
			   			"RoomID" : data[i].RoomID,
						"AllowedUsers": data[i].AllowedUsers
			   		};	
				   	if (data[i].UserID == userID){
					   	roomlist.push(newRoom);
			   		}
					for(var j = 0; j < data[i].AllowedUsers.length; j++){
						if(data[i].AllowedUsers[j] == userID){
							roomlist.push(newRoom);
						}
					}
					
			   }
			   $rootScope.roomlist = roomlist;

			}).error(function(data, status, headers, config) {
	  			console.log("Error acquiring Room data");
	  			return;
			});
		};

		$scope.getUserRoomList = function() {
			$http.get('/:userId/rooms/').success(function(data, status, headers, config) {
			   
				var userID = 1; //Obtain current user's ID

			   	var roomlist = data;
				
			   	$rootScope.roomlist = roomlist;

			}).error(function(data, status, headers, config) {
	  			console.log("Error acquiring Room data");
	  			return;
			});
		};

	}
]);