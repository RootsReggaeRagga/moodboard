angular.module('RandomService', []).factory('RandomSrv', ['$http', function($http) {
	return {
		getPageName: function() {
			return 'Random';
		},

		/*
		*
		* These will work when more API routes are defined on the Node side of things
		*
		*/

        // call to get data a user
        getUserData : function(username) {
            return $http.get('/api/v1/users/' + username + '/data');
        }
    };
}]);
