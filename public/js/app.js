angular.module('moodboardApp', 	['ngRoute', 'appRoutes',
									'HomeCtrl',									// Homepage
									'SandboxCtrl', 'SandboxService',			// Sandbox
									'CustomizeCtrl', 'CustomizeService' 		// Customization
								]);