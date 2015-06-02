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
			$http.get('/users/').success(function(data, status, headers, config) {
			   
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
			"RoomID": "NaNbread",
			"Name": "",
			"UserID": "1",
			"Description": "",
			"DateDestroy":"",
			"PrivacyEnabled": "True", //case is important, views use True and False
			"AllowedUsers": [],
			"Messages": []
		};

		$scope.postRoom = function() {
			console.log("Attempting to Create Room");

			console.log("Data to post" + JSON.stringify($scope.newRoom) );

			$http({
				url: '/addroom/',
				method: "POST",
				data:  JSON.stringify($scope.newRoom),
				headers: {'Content-Type': 'application/json'}
			}).success(function (data, status, headers, config) {
				console.log("Data sent = " + JSON.stringify($scope.newRoom) );
			}).error(function (data, status, headers, config) {
				console.log("Data failed");
			});	

		};
	}
]);