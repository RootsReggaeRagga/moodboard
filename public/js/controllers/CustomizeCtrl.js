angular.module('CustomizeCtrl', []).controller('CustomizeController', function($scope, CustomizeSrv) {
	var response = CustomizeSrv.getPageName();

	$scope.saveChanges = function() {
    	console.log('save');
  	}

  	$scope.applyDefaultValues = function() {
  		console.log('apply default values.');
  	}
});