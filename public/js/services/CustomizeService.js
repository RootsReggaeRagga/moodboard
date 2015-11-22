angular.module('CustomizeService', []).factory('CustomizeSrv', ['$http', function($http) {
	return {
		getPageName: function() {
			return 'Customization';
		}
	};
}]);