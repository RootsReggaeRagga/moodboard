angular.module('moodboardApp', 	['ngRoute', 'appRoutes',
									'MainCtrl',	'MainService',					// Homepage
									'SandboxCtrl', 'SandboxService',			// Sandbox
									'SettingsCtrl', 'SettingsService'	 		// Customization
								]);