angular.module('moodboardApp', 	['ngRoute', 'appRoutes',
									'MainCtrl',									// Homepage
									'SandboxCtrl', 'SandboxService',			// Sandbox
									'SettingsCtrl', 'SettingsService' 		// Customization
								]);