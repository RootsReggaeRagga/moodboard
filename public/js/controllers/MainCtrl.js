angular.module('MainCtrl', []).controller('MainController', function($scope, $rootScope) {
	$rootScope.username = '';
	$rootScope.websiteName = 'MOODBOARD';
	applyDefaultInterfaceStyle();
	$scope.connect = function(item) {
    	$rootScope.username = document.getElementById('username').value;
    	$rootScope.websiteName = 'MOODBOARD -'; 
  	}
});