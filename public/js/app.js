angular.module('moodboardApp', 	['ngRoute', 'appRoutes',
									'MainCtrl',									// Homepage
									'SandboxCtrl', 'SandboxService',			// Sandbox
									'CustomizeCtrl', 'CustomizeService' 		// Customization
								]);