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
				var searchButton = angular.element(document.querySelector('#search-button'));
				var signinButton = angular.element(document.querySelector('#signin-button'));
				var signupButton = angular.element(document.querySelector('#signup-button'));
				var notifButton = angular.element(document.querySelector('#mood-notif'));
				var drawerButton = angular.element(document.querySelector('.mdl-layout__drawer-button'));

				leftPanel[0].style.display = displayValue;

				switch(page) {
					case 'index':
					addButton[0].style.display = 'block';
					shareButton[0].style.display = 'block';
					try { drawerButton[0].style.display = 'block'; } catch (e) {}
					searchButton[0].style.display = 'block';
					notifButton[0].style.display = '';
					signinButton[0].classList.add('invisible');
					signupButton[0].classList.add('invisible');
					break;

					case 'settings':
					addButton[0].style.display = 'none';
					shareButton[0].style.display = 'none';
					try { drawerButton[0].style.display = 'block'; } catch (e) {}
					searchButton[0].style.display = 'block';
					notifButton[0].style.display = '';
					signinButton[0].classList.add('invisible');
					signupButton[0].classList.add('invisible');
					break;

					case 'username':
					addButton[0].style.display = 'none';
					shareButton[0].style.display = 'none';
					try { drawerButton[0].style.display = 'none'; } catch (e) {}
					searchButton[0].style.display = 'block';
					notifButton[0].style.display = 'none';
					signinButton[0].classList.remove('invisible');
					signupButton[0].classList.remove('invisible');
					break;

					default:
					console.log('There should not be a default failover at this thing.');
				}
			}
		};
	}
	]);
