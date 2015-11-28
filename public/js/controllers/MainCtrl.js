angular.module('MainCtrl', []).controller('MainController', function($scope, $rootScope) {
	$rootScope.username = '';
	applyDefaultInterfaceStyle();
	$scope.connect = function(item) {
    	$rootScope.username = document.getElementById('username').value;
  	}
});