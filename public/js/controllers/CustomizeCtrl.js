angular.module('CustomizeCtrl', []).controller('CustomizeController', function($scope, CustomizeSrv) {
	var response = CustomizeSrv.getPageName();
	console.log(response);
	$scope.pageName = response;
});