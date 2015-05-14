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
.controller('RoomEditCtrl', ['$scope', '$rootScope', '$http',
	function($scope,  $rootScope, $http) {
		$scope.getRoomData = function() { //@TODO
			$http.get('/data/roomlist.json').success(function(data, status, headers, config) {
				//data is an array of rooms, id the room by RoomID and return that data
				$scope.results = data;
				
				//var i = RoomID;
				var i = 0;
				var room = {
					"Name": data[i].Name,
				   	"Description": data[i].Description,
				   	"DateDestroy": data[i].DateDestroy, 
				   	"RoomID" : data[i].RoomID,
				   	"PrivacyEnabled":data[i].PrivacyEnabled
				};
				//@TODO Implement showing user list for a given room
			   $rootScope.room = $scope.room;

			}).error(function(data, status, headers, config) {
	  			console.log("Error acquiring Room data");
	  			return;
			});
		};
	}
]);