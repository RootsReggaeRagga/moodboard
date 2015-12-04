angular.module('LoginCtrl', ['ui-notification']).controller('LoginController', function($scope, $rootScope, $location, LoginSrv, Notification) {
	/* -------------------- METHODS -------------------- */
	$scope.resetSessionAndUserValues = function() {
		$rootScope.username = '';
		$rootScope.websiteName = 'MOODBOARD';
	}

  	$scope.hideActionBar = function() {
  		document.getElementById("actionbar").style.display = 'none';
  	}

  	$scope.applyDefaultInterfaceStyle = function() {
		document.querySelector(".mdl-layout__content").style.background = '#2e3764';
	  	document.querySelector(".mdl-layout__header").style.background = '#2e3764';
	}

	$scope.connect = function () {
      	$scope.error = false;
      	$scope.disabled = true;

      	// Trying to log in a user
      	LoginSrv.login($scope.loginForm.username, $scope.loginForm.password)
        	// User is known
	        .then(function () {
	          $rootScope.username = $scope.loginForm.username;
	      	  $rootScope.websiteName = 'MOODBOARD -';
	          $location.path('/sandbox');
	          $scope.disabled = false;
	          $scope.loginForm = {};
	        })
	        // An error occured ?
	        .catch(function (e) {
	          $scope.error = true;
	          $scope.errorMessage = 'Wrong credentials.';
	          $scope.disabled = false;
	          $scope.loginForm = {};
	          Notification.error($scope.errorMessage);
	        });
    };

	/* -------------------- INIT -------------------- */
	$scope.resetSessionAndUserValues();
	$scope.applyDefaultInterfaceStyle();
  	$scope.hideActionBar();
});