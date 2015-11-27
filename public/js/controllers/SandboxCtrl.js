angular.module('SandboxCtrl', []).controller('SandboxController', function($scope, $rootScope, SandboxSrv) {
	var data = SandboxSrv.getUserData($rootScope.username);
	console.log(data);
	doload($rootScope.username);
});