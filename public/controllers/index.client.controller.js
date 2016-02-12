'use strict';

angular.module('mean').controller('IndexController', ['$scope', '$rootScope', 'Authentication', 'SandboxSrv', 'UserSrv',
	function($scope, $rootScope, Authentication, SandboxSrv, UserSrv) {
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

            UserSrv.getUserInfos($rootScope.username).success(function(data) {
            	$rootScope.userInfos = data;
            });
		} else {
			$rootScope.toolbarUrl = 'views/menu/menu.toolbar.login.html';
		}
	}
	]);
