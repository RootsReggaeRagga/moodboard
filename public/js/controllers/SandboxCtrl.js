angular.module('SandboxCtrl', []).controller('SandboxController', function($scope, $rootScope, SandboxSrv) {
	SandboxSrv.getUserData($rootScope.username).success(function(data) {
		$rootScope.userData = data;
  		applyUserInterfaceStyle($rootScope.userData);
   		doload(data);
   	});
});