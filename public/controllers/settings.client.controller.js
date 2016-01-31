'use strict';

angular.module('mean').controller('SettingsController', ['$scope', '$rootScope', '$location', 'Authentication', 
  function($scope, $rootScope, $location, Authentication) {
      /*
      if ($scope.authentication === undefined) {
          $location.path( "/" );
      }*/

      // --------------------------- FUNCTIONS --------------------------- // 
      $scope.saveChanges = function() {
        console.log('form values : ' + $scope.customize.colorpalette);
      }

      $scope.applyDefaultValues = function() {
        console.log('apply default values.');
      }

      $scope.updateBackgroundColor = function() {
        var color = $scope.customize.colorpalette;
        if (isHexaColor(color)) {
            // Apply background color if it's a valid hexa color
            document.getElementById('mainView').style.background = palette.get(color, '100');
          } else {
            console.log('hexa color is not valid.');
          }
        }

        $scope.previewColorPalette = function($event) {
          var element = event.target;
          if (element !== null && (element.id !== undefined)) {
            var color = capitalizeFirstLetter(element.id.substring(3, element.id.length+1));
            if (color !== '' && color !== null) {
              try { document.querySelector(".mdl-layout__content").style.background = palette.get(color, '100'); } catch (e) {}
              try { document.querySelector(".mdl-layout__header").style.background = palette.get(color, '500'); } catch (e) {}
              try { document.querySelector(".mdl-switch__thumb").style.background = palette.get(color, '500'); } catch (e) {}
              try { document.querySelector(".mdl-button--raised").style.background = palette.get(color, '500'); } catch (e) {}
            } 
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

       // Colorize color palette
       var colorPalette = document.getElementById('color-palette');
       for (var i = 0; i < colorPalette.children.length; i++) {
        var box = colorPalette.children[i];
        var boxId = colorPalette.children[i].getAttribute('id');
        var color = capitalizeFirstLetter(boxId.substring(3, boxId.length+1));
        box.style.background = palette.get(color, '500');
      }

       // --------------------------- APPLY USER'S VALUES --------------------------- //
       // Retrieve user data
       applyUserInterfaceStyle($rootScope.userData.apparences[0].colorpalette);
       $scope.hideActionBarElements();

       $scope.customize = {
        colorpalette: $rootScope.userData.apparences[0].colorpalette
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
    }
]);