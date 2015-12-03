angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/login.html',
			controller: 'LoginController'
		})
		.when('/sandbox', {
			templateUrl: 'views/sandbox.html',
			controller: 'SandboxController'	
		})
		.when('/settings', {
			templateUrl: 'views/settings.html',
			controller: 'SettingsController'
		});
	$locationProvider.html5Mode(true);
}]);