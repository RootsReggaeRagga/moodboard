'use strict';

// Authentication service for user variables
angular.module('mean').factory('SettingsSrv', ['$http',
    function($http) {
        return {
            putSettings : function(username, colorPalette, privacy, oldp, newp, conp, view) {
                var data = {
                	username: username, 
                	colorpalette: colorPalette, 
                	privacy: privacy,
                	oldpassword: oldp,
                	newpassword: newp, 
                	confirmpassword: conp,
                    view: view
               	};
                return $http.put('/api/v1/users/' + username + '/data/settings', data || {});
            }
        };
    }
]);
