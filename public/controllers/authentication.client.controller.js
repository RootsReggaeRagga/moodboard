'use strict';

angular.module('mean').controller('AuthenticationController', ['$scope', '$rootScope', '$http', '$location', 'Authentication', 'SandboxSrv', '$mdToast',
    function($scope, $rootScope, $http, $location, Authentication, SandboxSrv, $mdToast) {
        $scope.authentication = Authentication;

        // If user is signed in then redirect back home
        if ($scope.authentication.user) {
            $location.path('/');
        }

        // Toast
        var last = {
            bottom: false,
            top: true,
            left: false,
            right: true
        };

        $scope.toastPosition = angular.extend({},last);
        
        $scope.getToastPosition = function() {
            sanitizePosition();
            return Object.keys($scope.toastPosition)
                .filter(function(pos) { return $scope.toastPosition[pos]; })
                .join(' ');
        };

        function sanitizePosition() {
            var current = $scope.toastPosition;
            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;
            last = angular.extend({},current);
        }  

        $scope.showSimpleToast = function(msg) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(msg)
                    .position($scope.getToastPosition())
                    .hideDelay(3000)
                );
        };
        // End Toast

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
                    applyUserInterfaceStyle($rootScope.userData.apparences.colorpalette);
                    doload(data);
                });

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
    }
    ]);
