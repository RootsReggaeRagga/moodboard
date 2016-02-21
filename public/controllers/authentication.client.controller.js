'use strict';

angular.module('mean').controller('AuthenticationController', ['$scope', '$rootScope', '$http', '$location', 'Authentication', 'SandboxSrv', '$mdToast', 'UserSrv',
    function($scope, $rootScope, $http, $location, Authentication, SandboxSrv, $mdToast, UserSrv) {
        $scope.authentication = Authentication;

        // If user is signed in then redirect back home
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
                $scope.showSimpleToast('Welcome back ' + $rootScope.username + '!');

                //And redirect to the index page
                $location.path('/');
            }).error(function(response) {
                $scope.error = response.message;
                var data = {
                    message: $scope.error
                };
                $scope.showSimpleToast(data.message);
            });
        };

        // Method to show a simple toast
        $scope.showSimpleToast = function(msg) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(msg)
                    .position(getToastPosition())
                    .hideDelay(3000)
                );
        };
    }
    ]);
