'use strict';

angular.module('mean').factory('UserSrv', ['$http',
    function($http) {
        return {
            getUserInfos : function(username) {
                return $http.get('/api/v1/users/' + username + '/infos');
            }
        };
    }
]);
