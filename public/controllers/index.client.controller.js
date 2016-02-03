'use strict';

angular.module('mean').controller('IndexController', ['$scope', '$rootScope', 'Authentication', 'SandboxSrv', 'Menu',
	function($scope, $rootScope, Authentication, SandboxSrv, Menu) {
		$scope.authentication = Authentication;

		if ($scope.authentication.user !== null) {
			$rootScope.username = $scope.authentication.user.username;

			SandboxSrv.getUserData($rootScope.username)
				.success(function(data) {
					$rootScope.userData = data;
					applyUserInterfaceStyle($rootScope.userData.apparences.colorpalette);
		            doload(data);
		        });
	        Menu.updateMenu(true, 'index');
		} else {
			Menu.updateMenu(false, 'index');
		}
	}
	]);
