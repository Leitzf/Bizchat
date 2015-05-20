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
			$http.get('/data/Users.json').success(function(data, status, headers, config) {
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
	}
]);