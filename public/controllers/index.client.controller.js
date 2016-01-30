'use strict';

angular.module('mean').controller('IndexController', ['$scope', '$rootScope', 'Authentication', 'SandboxSrv', 
    function($scope, $rootScope, Authentication, SandboxSrv) {
        $scope.authentication = Authentication;
        $rootScope.websiteName = 'MOODBOARD';
        if ($scope.authentication.user !== null) {
	        console.log($scope.authentication);
	        $rootScope.username = $scope.authentication.user.username;

	        SandboxSrv.getUserData($rootScope.username)
	        	.success(function(data) {
	                $rootScope.userData = data;
	                applyUserInterfaceStyle($rootScope.userData.apparences[0].colorpalette);
	                //$scope.showActionBarAndElements();
	                doload(data);
	            });
        }
    }
]);