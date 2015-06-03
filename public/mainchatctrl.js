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
		
		$scope.getMessages = function() {
			$http.get('/messages/').success(function(data, status, headers, config) {
			   
				var roomID = 0; //Obtain current room ID
				var messagelist = [];
				for(var i = 0; i < data.length; i++){
					var newMess = {
						"MessageID": data[i].MessageID,
						"userID": data[i].userID,
						"Message": data[i].Message, 
						"TimeStamp": data[i].TimeStamp
					}
					if (data[i].roomID == roomID){
					   	messagelist.push(newMess);
			   		}	
					
				}
				$rootScope.messagelist = messagelist;	

			}).error(function(data, status, headers, config) {
	  			console.log("Error acquiring Message data");
	  			return;
			});
		};
		
		$scope.newMessage = {
			"RoomID": "1",
			"MessageID": "1",
			"userID": "1",
			"Message": "", 
			"TimeStamp": "5/14/2015"
		};
			
		$scope.postRoom = function() {
			console.log("Attempting to Post Message to Main Chat");

			console.log("Data to post" + JSON.stringify($scope.newMessage) );

			$http({
				url: '/addMessage/',
				method: "POST",
				data:  JSON.stringify($scope.newMessage),
				headers: {'Content-Type': 'application/json'}
			}).success(function (data, status, headers, config) {
				console.log("Data sent = " + JSON.stringify($scope.newMessage) );
			}).error(function (data, status, headers, config) {
				console.log("Data failed");
			});	
		};			
	}
]);