angular.module('CustomizeCtrl', []).controller('CustomizeController', function($scope, $rootScope, CustomizeSrv) {

	// --------------------------- APPLY USER'S VALUES --------------------------- //
	// Retrieve user data
  applyUserInterfaceStyle($rootScope.userData);

	$scope.customize = {
		backgroundcolor:$rootScope.userData.apparences[0].backgroundcolor,
		actionbarcolor:$rootScope.userData.apparences[0].actionbarcolor,
		edgeofpictures:$rootScope.userData.apparences[0].edgeofpictures
	};

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