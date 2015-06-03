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


 		//Get Room data
 		$scope.room = {
 			"_id":"",
			"RoomID": "NaNbread",
			"Name": "",
			"UserID": "1",
			"Description": "",
			"DateDestroy":"",
			"PrivacyEnabled": "False", //case is important, views use True and False
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


		$scope.getSubbedUsers = function(){
			//@TODO get list of subscribed users currently in room
			var subbedUserList = [];
			var AllowedUsers = $scope.room.AllowedUsers;
			console.log("Acquiring subbed users " + JSON.stringify($scope.room.AllowedUsers));
		   	for (var i = 0; i < AllowedUsers.length; i++) {
		   		//get user data (Owner name)
                console.log("UserID "+ AllowedUsers[i]);
               	var Fname;
               	var Lname;
               	var Picture; 

                $http.get('/user/'+ AllowedUsers[i] ).success(function(data, status, headers, config) {
                    Fname = data.Fname;
                    Lname = data.Lname;
                    Picture = data.Picture;
                    console.log("Allowed User: " + $scope.Fname);
			    }).error(function(data, status, headers, config) {
				    console.log("Error acquiring User "+ AllowedUsers[i]);
				    return;
			    });
			   subbedUserList.push( {
					"userID": AllowedUsers[i],
			   		"Fname": Fname,
					"Lname": Lname,
					"Picture": Picture
			   	});
		   	}
			$rootScope.subbedUsers = subbedUserList;
		}


		//Get User list
		$scope.getAllUserList = function() {
			var AllowedUsers = $scope.room.AllowedUsers;
			$http.get('/users/').success(function(data, status, headers, config) {
			   /* //prototype code for excluded already subscribed users
			   var userlist = [];
			   for (var i = 0; i < data.length; i++) {
			   		if( data.userID ){
					   	userlist.push(
						   	{ 
								"userID": data[i].userID,
						   		"Fname": data[i].Fname,
								"Lname": data[i].Lname,
								"Picture": data[i].Picture
						   	}
					   	);
					}
			   }
			   $rootScope.userlist = userlist;
			   */
			   $rootScope.userlist = data;
			}).error(function(data, status, headers, config) {
	  			console.log("Error acquiring User data");
			});
		};





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