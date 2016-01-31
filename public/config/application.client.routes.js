'use strict';

// Setting up route
angular.module('mean')

.config(['$routeProvider',
    function($routeProvider) {
        // Application routing definition
        $routeProvider.
        when('/', {
            templateUrl: 'views/index.html',
            controller: 'IndexController',
            access: {restricted: false}
        }).
        when('/signup', {
            templateUrl: 'views/signup.html',
            controller: 'AuthenticationController',
            access: {restricted: false}
        }).
        when('/signin', {
            templateUrl: 'views/signin.html',
            controller: 'AuthenticationController',
            access: {restricted: false}
        }).
        when('/settings', {
            templateUrl: 'views/settings.html',
            controller: 'SettingsController',
            access: {restricted: true}
        }).
        otherwise({
            redirectTo: '/'
        });
    }
])
.run( function($rootScope, $location) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      if ($rootScope.username == null && next.access.restricted === true) {
          $location.path( "/");
        
      }     
    })
});