angular.module('moodboardApp', 	['ngRoute', 'appRoutes',
									'LoginCtrl',	'LoginService',					// Homepage
									'SandboxCtrl', 'SandboxService',				// Sandbox
									'SettingsCtrl', 'SettingsService',	 			// Customization
									'RandomCtrl', 'RandomService',
									'NotifierInit', 'UtilsCtrl'
								]);