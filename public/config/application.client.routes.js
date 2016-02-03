'use strict';

// Setting up route
angular.module('mean')

.config(['$routeProvider',
    function($routeProvider) {
        // Application routing definition
        $routeProvider.
        when('/', {
            title: 'Moodboard',
            templateUrl: 'views/index.html',
            controller: 'IndexController',
            access: {restricted: false}
        }).
        when('/signup', {
            title: 'Moodboard | Signup',
            templateUrl: 'views/signup.html',
            controller: 'AuthenticationController',
            access: {restricted: false}
        }).
        when('/signin', {
            title: 'Moodboard | Signin',
            templateUrl: 'views/signin.html',
            controller: 'AuthenticationController',
            access: {restricted: false}
        }).
        when('/settings', {
            title: 'Moodboard | My settings',
            templateUrl: 'views/settings.html',
            controller: 'SettingsController',
            access: {restricted: true}
        }).
        when('/:username', {
            title: 'Moodboard | User',
            templateUrl: 'views/username.html',
            controller: 'UsernameController',
            access: {restricted: false}
        }).
        otherwise({
            redirectTo: '/'
        });
    }
])
.run( function($rootScope, $location) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        console.log(next);
      if ($rootScope.username === null && next.$$route.access.restricted === true) {
          $location.path('/');
      }
    });
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
        $rootScope.pageTitle = current.$$route.title;
    });
});
