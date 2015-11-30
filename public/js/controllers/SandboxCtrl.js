angular.module('SandboxCtrl', []).controller('SandboxController', function($scope, $rootScope, SandboxSrv) {
  	/* -------------------- METHODS -------------------- */
  	$scope.showActionBar = function() {
  		document.getElementById("actionbar").style.display = 'block';
  	}

  	/* -------------------- INIT -------------------- */
	SandboxSrv.getUserData($rootScope.username)
		.success(function(data) {
			$rootScope.userData = data;
	  		applyUserInterfaceStyle($rootScope.userData);
	  		$scope.showActionBar();
	   		doload(data);
	   	});
});