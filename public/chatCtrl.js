 'use strict';
/**
 * @ngdoc overview
 * @name To Do App
 * @description
 * # To do Application
 *
 * Main module of the application.
 */
angular
.module('BizchatApp')
.controller('ChatCtrl', ['$scope', '$rootScope', '$http', '$route',

	function($scope,  $rootScope, $http, $route) {

		$scope.userName = "userName";

		$scope.getChatRoom = function() {
			//Nearly Equiv to RoomEditCtrl's getRoomData (maybe remove?)
			$scope.roomID = $route.current.params.roomID;
			console.log("getting chat room" + $scope.roomID);

			$scope.room = null;

            $http.get('/rooms/'+ $scope.roomID ).success(function(data, status, headers, config) {
                
				console.log("Room "+data.RoomID + " successfully obtained");
				$scope.room = data; 
				console.log("Room data successfully obtained " + JSON.stringify($scope.room));

 				           
                //get user data from userID (Owner name)
                console.log("UserID "+ $scope.room.UserID);
                
                $http.get('/user/'+ $scope.room.UserID ).success(function(data, status, headers, config) {
                    $scope.userName = data.Fname + " " + data.Lname;
                    console.log("Obtained Owner name: " + $scope.userName);
			    }).error(function(data, status, headers, config) {
				    console.log("Error acquiring Owner data");
				    return;
			    });

			    //get userlist from list of subscribed users (ref:roomlistCtrl)
			    if($scope.PrivacyEnabled == "True"){
				    $scope.userlist = [];
				    $scope.userlist.push($scope.userName);
				    for (var i = 0 ; i < $scope.room.AllowedUsers.length ; i++){
				    	var userID = $scope.room.AllowedUsers[i];
				    	console.log(userID);
				    	$http.get('/user/'+ userID ).success(function(data, status, headers, config) {
				    		if (data != null){
					    		var newName = data.Fname + " " + data.Lname;
		                    	$scope.userlist.push(newName);
		                    	console.log("Obtained user name: " + newName);	
				    		}
				    	})
				    }
				}
				               
    
			}).error(function(data, status, headers, config) {
				console.log("Error acquiring Room data");
				return;
			});

		};

	}
]);

