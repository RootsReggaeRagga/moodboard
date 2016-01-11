angular.module('SandboxService', []).factory('SandboxSrv', ['$http', function($http) {
	return {
		getPageName: function() {
			return 'Sandbox';
		},

		/*
		*
		* These will work when more API routes are defined on the Node side of things
		*
		*/

        // call to get data a user
        getUserData : function(username) {
            //return $http.get('/api/v1/users/' + username + '/data');
            return $http.get('/api/v1/users/footballgifs/data');
        }
    };
}]);
