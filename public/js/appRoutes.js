angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		})

		.when('/sandbox', {
			templateUrl: 'views/sandbox.html',
			controller: 'SandboxController'	
		})

		.when('/customize', {
			templateUrl: 'views/customize.html',
			controller: 'CustomizeController'
		});

	$locationProvider.html5Mode(true);

}]);