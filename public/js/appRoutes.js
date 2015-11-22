angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
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