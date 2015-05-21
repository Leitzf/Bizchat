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

		//Initial form data, corresponds to ng-model html data
		$scope.newRoom = {
			"RoomID": "6",
			"Name": "",
			"UserID": "5",
			"Description": "",
			"DateDestroy":"",
			"PrivacyEnabled": "True",
			"AllowedUsers": [],
			"Messages": []
		};

		$scope.postRoom = function() {
			
			console.log("POST Room");
			
			$http.get('/rooms').success(function(data, status, headers, config) {
				console.log("http.get finds the file");	
			}).error(function(data, status, headers, config) {
				console.log("no file found");
			});
			

			console.log("Data to post" + JSON.stringify($scope.newRoom) );

			//HTTP NOT FOUND ERROR
			$http({
				url: '/addroom',
				method: "POST",
				data: JSON.stringify($scope.newRoom),
				headers: {'Content-Type': 'application/json'}
			}).success(function (data, status, headers, config) {
				console.log("Data saved");
			}).error(function (data, status, headers, config) {
				console.log("Data failed");
			});	

		};
	}
]);