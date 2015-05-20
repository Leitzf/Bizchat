'use strict';
/**
 * @ngdoc overview
 * @name To Do App
 * @description
 * # This is the navbar controller
 *
 * Main module of the application.
 */
 angular
 .module('BizchatApp')
 .controller('DropdownCtrl', function ($scope, $log, $http, $rootScope) {
	$http.get('/data/notifications.json').success(function(data, status, headers, config) {
		$scope.results = data;
					
		var notifications = [];
		for (var i = 0; i < data.length; i++) {
			notifications[i] = {
				"NotificationID": data[i].NotificationID,
				"NotificationCode": data[i].NotificationCode,
				"Sender": data[i].Sender,
				"NoteInfo": data[i].NoteInfo
			};
		}
		$rootScope.notifications = notifications;
	});
  $scope.status = {
    isopen: false
  };

  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };
});