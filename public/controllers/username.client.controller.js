'use strict';

angular.module('mean').controller('UsernameController', ['$scope', '$rootScope', '$routeParams', 'Authentication', 'SandboxSrv',
    function($scope, $rootScope, $routeParams, Authentication, SandboxSrv) {
        $scope.authentication = Authentication;
        $scope.searchedUsername = $routeParams.username;

        if ($scope.authentication.user !== null) {
            $rootScope.username = $scope.authentication.user.username;
        }


        SandboxSrv.getUserData($scope.searchedUsername)
            .success(function(data) {
                $scope.searchedUserData = data;
                applyUserInterfaceStyle($scope.searchedUserData.apparences.colorpalette);
                doload($scope.searchedUserData);
            });
    }
]);
