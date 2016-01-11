angular.module('UtilsCtrl', []).controller('UtilsController', function($scope){
        $scope.hideLeftPanel = function(event) {
        	var target = event.target;
        	if (target !== null) {
        		if (hasClass(target, 'mdl-navigation__link') || hasClass(target, 'txt-menu-left') || hasClass(target, 'icon-menu-left')) {
        			// It's a link that was just clicked, then, hide the left panel
        			var obfuscator = document.getElementsByClassName('mdl-layout__obfuscator');
        			eventFire(obfuscator[0], 'click');
        		}
        	}
        } 
});