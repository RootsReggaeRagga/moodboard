angular.module('CustomizeService', []).factory('CustomizeSrv', ['$http', function($http) {
	return {
		getPageName: function() {
			return 'Customization';
		},

		/*
		*
		* These will work when more API routes are defined on the Node side of things
		*
		*/

        // call to get all users
        get : function() {
            return $http.get('/api/users');
        },
        // call to POST and create a new user
        create : function(nerdData) {
            return $http.post('/api/users', nerdData);
        },
        // call to DELETE a user
        delete : function(id) {
            return $http.delete('/api/users/' + id);
        }
    };
}]);