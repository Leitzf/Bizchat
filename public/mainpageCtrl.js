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
.controller('ProfileCtrl', ['$scope', '$rootScope', '$http',
	function($scope,  $rootScope, $http) {
		$scope.getProfile = function() {
			
			//Default data: Swedish Chef
			$scope.user = {
				Fname : "Not Signed In",
				Lname : "",
				Picture : "",
				EmailAddr : "",
				userID: ""
			};

			//@TODO remove hard-coded user
			$http.get('/user/:userId').success(function(data, status, headers, config) {
				$scope.user = data;
                console.log(data);
      			return;
    		}).
   			 error(function(data, status, headers, config) {
      			console.log("Error acquiring user data");
      			return;
    		});
 						
			var img = new Image();
			img.src = $scope.user.Picture;
		};
	}
]);

