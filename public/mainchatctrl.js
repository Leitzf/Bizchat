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

		var messagelist = []; //represents displayed messages NOTE: not equivalent to message database entry
		var userName = "Nan";
		var UserID;
		$http.get('/user/:userID' ).success(function(data, status, headers, config) {
            userName = data.Fname + " " + data.Lname;
            UserID = data.UserID;
            console.log("Obtained User name: " + userName);
            console.log("Obtained User ID: " + UserID);
	    }).error(function(data, status, headers, config) {
		    console.log("Error acquiring Joining User data");
		    return;
	    });

		$scope.getMessages = function() {
			$http.get('/messages/').success(function(data, status, headers, config) {	
				console.log("Message Data acquired")
				//console.log(JSON.stringify(data));		   
				var RoomID = "0"; //Main chat ID

				for(var i = 0; i < data.length; i++){
					//console.log(data[i]);
					var newName = "NaN";
					console.log(data[i].UserID);
			        $http.get('/user/info/'+ data[i].UserID ).success(function(userdata, status, headers, config) {
			            newName = userdata.Fname + " " + userdata.Lname;
			            console.log("Obtained User name: " + newName);

						if (data[i].RoomID == RoomID){
							var newMessage = {
								"userName": newName,
								"Message": data[i].Message, 
								"TimeStamp": data[i].TimeStamp,		
							}
						   	messagelist.push(data[i]);
				   		}	
				    });
				}
				console.log(messagelist);
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
			"userID": UserID,
			"Message": "", 
			"TimeStamp": "5/14/2015"
		};
			
		$scope.postMessage = function() {
			console.log("Attempting to Post Message to Main Chat");

			console.log("Data to post" + JSON.stringify($scope.newMessage) );

			$http({
				url: '/addmessage/',
				method: "POST",
				data:  JSON.stringify($scope.newMessage),
				headers: {'Content-Type': 'application/json'}
			}).success(function (data, status, headers, config) {

				console.log("Message sent = " + JSON.stringify($scope.newMessage) );
				var newMessage = {
					"userName": userName,
					"Message": $scope.newMessage.Message, 
					"TimeStamp": $scope.newMessage.TimeStamp,		
				}
				messagelist.push(newMessage);

				//refresh message scope
				$scope.newMessage = {
					"RoomID": "0",
					"MessageID": "1",
					"userID": UserID,
					"Message": "", 
					"TimeStamp": "5/14/2015"
				};	
				$scope.$apply();


			}).error(function (data, status, headers, config) {
				console.log("Data failed");
			});	
		};			
	}
]);