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
				Fname : "Geneebedee",
				Lname : "Purmishurn",
				Picture : "http://www.firefoods.co.uk/wp-content/uploads/2013/03/SwedishChef.jpg",
				EmailAddr : "borkbork@example.com",
				userID: 1
			};

			$http.get('/data/user.json').success(function(data, status, headers, config) {
		   		$scope.results = data;
		   		$scope.user = {
					Fname : data[0].Fname,
					Lname : data[0].Lname,
					Picture : data[0].Picture,
					EmailAddr : data[0].EmailAddr
				}
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
