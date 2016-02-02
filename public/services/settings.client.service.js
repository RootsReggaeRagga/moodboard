'use strict';

// Authentication service for user variables
angular.module('mean').factory('SettingsSrv', ['$http',
    function($http) {
        return {
            putUserColorPalette : function(username, colorPalette) {
                var data = {username: username, colorpalette: colorPalette};
                return $http.put('/api/v1/users/' + username + '/data/settings/colorpalette', data || {});
            }
        };
    }
]);
