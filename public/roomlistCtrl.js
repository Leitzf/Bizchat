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

		var UserID;
		$http.get('/user/:userID' ).success(function(data, status, headers, config) {
            UserID = data.UserID;
            console.log("Obtained User ID: " + UserID);
	    }).error(function(data, status, headers, config) {
		    console.log("Error acquiring Joining User data");
		    return;
	    });



		$scope.getRoomList = function() {
			$http.get('/rooms/').success(function(data, status, headers, config) {
			   
				//var userID = 1; //Obtain current user's ID
			   	var roomlist = [];
			   	for (var i = 0; i < data.length; i++) {
			   		var newRoom = { 
			   			"Name": data[i].Name,
			   			"Description": data[i].Description,
			   			"DateDestroy": data[i].DateDestroy, 
			   			"RoomID" : data[i].RoomID,
						"AllowedUsers": data[i].AllowedUsers
			   		};
			   		roomlist.push(newRoom); // 
			   		/*	
			   		//@TODO future function, do not allow user to see rooms they are not involved in
				   	if (data[i].UserID == userID){
					   	
			   		}
					for(var j = 0; j < data[i].AllowedUsers.length; j++){
						if(data[i].AllowedUsers[j] == userID){
							roomlist.push(newRoom);
						}
					}
					*/
					
			   }
			   $rootScope.roomlist = roomlist;

			}).error(function(data, status, headers, config) {
	  			console.log("Error acquiring Room data");
	  			return;
			});
		};

		$scope.getUserRoomList = function() {
			$http.get('/rooms/:userID').success(function(data, status, headers, config) {
			   	var roomlist = data;
			   	$rootScope.roomlist = roomlist;
			}).error(function(data, status, headers, config) {
	  			console.log("Error acquiring Room data");
	  			return;
			});
		};

	}
]);