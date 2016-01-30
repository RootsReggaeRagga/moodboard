'use strict';

angular.module('mean').controller('AuthenticationController', ['$scope', '$rootScope', '$http', '$location', 'Authentication', 'SandboxSrv',
    function($scope, $rootScope, $http, $location, Authentication, SandboxSrv) {
        $scope.authentication = Authentication;

        //If user is signed in then redirect back home
        if ($scope.authentication.user) {
            $location.path('/');
        }

        $scope.signup = function() {
            $http.post('/auth/signup', $scope.credentials).success(function(response) {
                //If successful we assign the response to the global user model
                $scope.authentication.user = response;

                //And redirect to the index page
                $location.path('/');
            }).error(function(response) {
                $scope.error = response.message;
            });
        };

        $scope.signin = function() {
            $http.post('/auth/signin', $scope.credentials).success(function(response) {
                //If successful we assign the response to the global user model
                $scope.authentication.user = response;
                $rootScope.username = response.username;

                SandboxSrv.getUserData($rootScope.username)
                .success(function(data) {
                    $rootScope.userData = data;
                    applyUserInterfaceStyle($rootScope.userData.apparences[0].colorpalette);
                    //$scope.showActionBarAndElements();
                    doload(data);
                });

                //And redirect to the index page
                $location.path('/');
            }).error(function(response) {
                $scope.error = response.message;
            });
        };
    }
]);