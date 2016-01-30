'use strict';

angular.module('mean').factory('SandboxSrv', ['$http',
	function($http) {
		return {
	        getUserData : function(username) {
	            return $http.get('/api/v1/users/' + username + '/data');
	        }
	    };
	}
]);
