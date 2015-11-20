angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		})

		.when('/nerds', {
			templateUrl: 'views/customize.html',
			controller: 'CustomizeController'
		})

		.when('/sandbox', {
			templateUrl: 'views/sandbox.html',
			controller: 'SandboxController'	
		});

	$locationProvider.html5Mode(true);

}]);