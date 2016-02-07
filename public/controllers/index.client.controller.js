'use strict';

angular.module('mean').controller('IndexController', ['$scope', '$rootScope', 'Authentication', 'SandboxSrv',
	function($scope, $rootScope, Authentication, SandboxSrv) {
		$scope.authentication = Authentication;

		if ($scope.authentication.user !== null) {
			$rootScope.toolbarUrl = 'views/menu/menu.toolbar.full.html';
			$rootScope.username = $scope.authentication.user.username;

			SandboxSrv.getUserData($rootScope.username)
				.success(function(data) {
					$rootScope.userData = data;
					applyUserInterfaceStyle($rootScope.userData.apparences.colorpalette);
		            doload(data);
		        });
		} else {
			$rootScope.toolbarUrl = 'views/menu/menu.toolbar.login.html';
		}
	}
	]);