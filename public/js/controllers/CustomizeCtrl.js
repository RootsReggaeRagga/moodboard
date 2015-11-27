angular.module('CustomizeCtrl', []).controller('CustomizeController', function($scope, $rootScope, CustomizeSrv) {

	// --------------------------- APPLY USER'S VALUES --------------------------- //

	// $rootScope.user ...
	$scope.customize = {
		backgroundcolor:'#90C3D4',
		actionbarcolor:'#77HU00',
		edgeofpictures:'#67HY65'
	};

	// Apply user's background color
	// document.getElementById('mainView').style.background = $rootScope.user ...;

	var response = CustomizeSrv.getPageName();

	// --------------------------- FUNCTIONS --------------------------- // 

	$scope.saveChanges = function() {
    	console.log('form values : ' + $scope.customize.backgroundcolor);
    	console.log('form values : ' + $scope.customize.actionbarcolor);
    	console.log('form values : ' + $scope.customize.edgeofpictures);
  	}

  	$scope.applyDefaultValues = function() {
  		console.log('apply default values.');
  	}

  	$scope.updateBackgroundColor = function() {
  		var color = $scope.customize.backgroundcolor;
  		if (isHexaColor(color)) {
  			// Apply background color if it's a valid hexa color
  			document.getElementById('mainView').style.background = color;
  		} else {
  			console.log('hexa color is not valid.');
  		}
  	}
});