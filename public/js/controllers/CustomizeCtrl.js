angular.module('CustomizeCtrl', []).controller('CustomizeController', function($scope, CustomizeService) {
	CustomizeService.helloTest();
});