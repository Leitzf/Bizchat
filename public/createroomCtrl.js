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
.controller('UserCtrl', ['$scope', '$rootScope', '$http',
	function($scope,  $rootScope, $http) {

		$scope.getUserList = function() {
			$http.get('/data/users.json').success(function(data, status, headers, config) {
				//Note: Data cannot be acquired if formatted incorrectly. Check the commas
			   $scope.results = data;
			   
			   var userlist = [];
			   for (var i = 0; i < data.length; i++) {
				   userlist[i] = { 
						"userID": data[i].userID,
				   		"Fname": data[i].Fname,
						"Lname": data[i].Lname,
						"Picture": data[i].Picture
				   	};
			   }
			   $rootScope.userlist = userlist;

			}).error(function(data, status, headers, config) {
	  			console.log("Error acquiring Room data");
	  			return;
			});
		};

		$scope.newRoom = {
			"RoomID": 6,
			"Name": "",
			"UserID": 5,
			"Description": "",
			"DateDestroy":"2020-5-15",
			"PrivacyEnabled": "True",
			"AllowedUsers": [],
			"Messages": []
		};

		$scope.postRoom = function() {
			console.log("POST ROom");
			$http.get('/data/createRoom.json').success(function(data, status, headers, config) {
				console.log("got data" + JSON.stringify(data));
			   	$rootScope.roomlist = data;
			}).error(function(data, status, headers, config) {
	  			console.log("Error acquiring Room data");
	  			return;
			});

			//Sample declaration of a room
			$scope.newRoom = {
				"RoomID": 6,
				"Name": "SWEEDISH CHEF",
				"UserID": 5,
				"Description": "bork",
				"DateDestroy":"2015-5-15",
				"PrivacyEnabled": "True",
				"AllowedUsers": [],
				"Messages": []
			};
			console.log("Data to post");

			$rootScope.roomlist.push(newRoom);

			$http.post('/data/room1.json', $rootScope.roomlist).then(function(data) {
				//$scope.msg = 'Data saved';
				console.log("Data saved");
			});
			//$scope.msg = 'Data sent: '+ JSON.stringify($scope.newRoom);
			console.log('Data sent: '+ JSON.stringify($rootScope.roomlist)); 
			



		};
		

	}
]);