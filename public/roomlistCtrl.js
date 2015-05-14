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
.controller('RoomListCtrl', function ($scope, $http) {
 	/*
 	$http.get('publicroomlist.json').success(function(data) {
 		console.log("Successfully acquired room data");
		$scope.roomlist = data;
	});
	*/
	$scope.getRoomList = function() {
		$http.get('/data/roomlist.json').success(function(data, status, headers, config) {
			console.og("Success Roomlist acquired");
		   $scope.results = data;
		   var roomlist = [];
		   for (var i = 0; i < data.length; i++) {
			   roomlist[i] = { 
			   		"Name": data[i].Name,
			   		"Description": data[i].Description,
			   		"DateDestroy": data[i].DateDestroy 
			   	};
		   }
		   $rootScope.roomlist = roomlist;
		}).error(function(data, status, headers, config) {
  			console.log("Error acquiring Room data");
  			return;
		});
	};
});