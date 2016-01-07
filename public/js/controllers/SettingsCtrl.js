angular.module('SettingsCtrl', []).controller('SettingsController', function($scope, $rootScope, SettingsSrv) {

// --------------------------- FUNCTIONS --------------------------- // 
   $scope.saveChanges = function() {
      console.log('form values : ' + $scope.customize.colorpalette);
    }

    $scope.applyDefaultValues = function() {
      console.log('apply default values.');
    }

    $scope.updateBackgroundColor = function() {
      var color = $scope.customize.backgroundcolor;
      if (isHexaColor(color)) {
        // Apply background color if it's a valid hexa color
        document.getElementById('mainView').style.background = color;
      } else {
        console.log('hexa color is not valid.');
      }
    }

    $scope.switchPrivacy = function() {
      // Change switch value
      var switchPrivacy = document.getElementById('switch-privacy');
      if (hasClass(switchPrivacy, 'is-checked'))
        switchPrivacy.classList.remove('is-checked');
      else
        switchPrivacy.classList.add('is-checked');

      // Change label value
      $scope.privacy = $scope.privacy == 'Private' ? 'Public' : 'Private';
    }

    $scope.hideActionBarElements = function() {
      document.getElementById("share-button").style.display = 'none';
      document.getElementById("add-button").style.display = 'none';
    }

	 // --------------------------- APPLY USER'S VALUES --------------------------- //
	 // Retrieve user data
   applyUserInterfaceStyle($rootScope.userData);
   $scope.hideActionBarElements();

	 $scope.customize = {
		  colorpalette:$rootScope.userData.apparences[0].colorpalette
	 };

   $scope.privacy = capitalizeFirstLetter($rootScope.userData.settings[0].privacy);
   var switchPrivacy = document.getElementById('switch-privacy');
   switch($scope.privacy) {
      case 'Public':
        if (hasClass(switchPrivacy, 'is-checked'))
            switchPrivacy.classList.remove('is-checked');
            break;
      case 'Private':
        if (!hasClass(switchPrivacy, 'is-checked'))
            switchPrivacy.classList.add('is-checked');
            break;
   }

	 
});