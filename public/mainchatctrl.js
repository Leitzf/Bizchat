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
.controller('MainChatCtrl', ['$scope', '$rootScope', '$http',
	function($scope,  $rootScope, $http) {
		var messagelist = [];
		$scope.getMessages = function() {
			$http.get('/messages/').success(function(data, status, headers, config) {	
				console.log("Message Data acquired")
				console.log(JSON.stringify(data));		   
				var RoomID = "0"; //Main chat ID
				for(var i = 0; i < data.length; i++){
					console.log(data[i]);
					if (data[i].RoomID == RoomID){
					   	messagelist.push(data[i]);
			   		}	
				}
				$rootScope.messagelist = messagelist;
				$scope.apply();	
			}).error(function(data, status, headers, config) {
	  			console.log("Error acquiring Message data");
	  			return;
			});
		};
		
		$scope.newMessage = {
			"RoomID": "0",
			"MessageID": "1",
			"userID": "1",
			"Message": "", 
			"TimeStamp": "5/14/2015"
		};
			
		$scope.postMessage = function() {
			console.log("Attempting to Post Message to Main Chat");

			console.log("Data to post" + JSON.stringify($scope.newMessage) );

			messagelist.push($scope.newMessage);
			$scope.$apply();

			$http({
				url: '/addmessage/',
				method: "POST",
				data:  JSON.stringify($scope.newMessage),
				headers: {'Content-Type': 'application/json'}
			}).success(function (data, status, headers, config) {
				console.log("Data sent = " + JSON.stringify($scope.newMessage) );
					
				//refresh message
				$scope.newMessage = {
					"RoomID": "0",
					"MessageID": "1",
					"userID": "1",
					"Message": "", 
					"TimeStamp": "5/14/2015"
				};	

			}).error(function (data, status, headers, config) {
				console.log("Data failed");
			});	
		};			
	}
]);