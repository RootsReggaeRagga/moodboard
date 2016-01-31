'use strict';

// Authentication service for user variables
angular.module('mean').factory('Menu', ['$http',
	function($http) {
		return {
			updateMenu : function(show, page) {
				var displayValue = show ? 'block' : 'none';
				var leftPanel = angular.element(document.querySelector('#actionbar'));
				var addButton = angular.element(document.querySelector('#add-button'));
				var shareButton = angular.element(document.querySelector('#share-button'));

				leftPanel[0].style.display = displayValue;

				switch(page) {
			      case 'index':
			         addButton[0].style.display = 'block';
			         shareButton[0].style.display = 'block';
			         break;
			      case 'settings':
			         addButton[0].style.display = 'none';
			         shareButton[0].style.display = 'none';
			         break;
			      default:
			         console.log('There should not be a default failover at this thing.');
			   }
			}
	    };
	}
]);