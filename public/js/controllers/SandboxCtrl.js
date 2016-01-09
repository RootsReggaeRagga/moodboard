angular.module('SandboxCtrl', []).controller('SandboxController', function($scope, $rootScope, SandboxSrv) {
  	/* -------------------- METHODS -------------------- */
  	$scope.showActionBarAndElements = function() {
  		document.getElementById("actionbar").style.display = 'block';
  		document.getElementById("share-button").style.display = 'block';
  		document.getElementById("add-button").style.display = 'block';
  	}

  	/* -------------------- INIT -------------------- */
	SandboxSrv.getUserData($rootScope.username)
		.success(function(data) {
			$rootScope.userData = data;
	  		applyUserInterfaceStyle($rootScope.userData.apparences[0].colorpalette);
	  		$scope.showActionBarAndElements();
	   		doload(data);
	   	});
});