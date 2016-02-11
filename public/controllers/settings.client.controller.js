'use strict';

angular.module('mean').controller('SettingsController', ['$scope', '$rootScope', '$location', 'SettingsSrv',
  function($scope, $rootScope, $location, SettingsSrv) {

      $rootScope.toolbarUrl = 'views/menu/menu.toolbar.full.html';

      var tempColorPalette;

      // --------------------------- FUNCTIONS --------------------------- //
      $scope.saveChanges = function() {
        SettingsSrv.putUserColorPalette($rootScope.username, tempColorPalette, $scope.privacy)
          .success(function(data) {
            console.log('update color with success. show toast.');
          });
      }

      $scope.settings = {};
      $scope.settings.previewColorPalette = function(event) {
          var element = event.target.parentElement;
          if (element !== null && (element.id !== undefined)) {
            var color = capitalizeFirstLetter(element.id.substring(3, element.id.length + 1));
            if (color !== '' && color !== null) {
              try { document.querySelector(".mdl-layout__content").style.background = palette.get(color, '100'); } catch (e) {}
              try { document.querySelector(".md-toolbar-tools").style.background = palette.get(color, '500'); } catch (e) {}
              try { document.querySelector(".mdl-switch__thumb").style.background = palette.get(color, '500'); } catch (e) {}
              try { document.querySelector(".mdl-button--raised").style.background = palette.get(color, '500'); } catch (e) {}
            }
            tempColorPalette = color;
          }
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

        $scope.switchPrivacy = function() {
          // Change switch value
          var switchPrivacy = document.getElementById('switch-privacy');
          var privacyLogo = document.getElementById('privacy-logo');

          $scope.privacy = $scope.privacy === 'Private' ? 'Public' : 'Private';

            switch($scope.privacy) {
              case 'Public':
                privacyLogo.textContent = 'lock_open';
              break;
              case 'Private':
                privacyLogo.textContent = 'lock_outline';
              break;
            }
        }

        // After document is rendered and loaded in the DOM
        angular.element(document).ready(function () {
            applyUserInterfaceStyle($rootScope.userData.apparences.colorpalette);

            $scope.email = $rootScope.userInfos.email;

            $scope.privacy = capitalizeFirstLetter($rootScope.userData.settings.privacy);
            var switchPrivacy = document.getElementById('switch-privacy');
            var privacyLogo = document.getElementById('privacy-logo');

            switch($scope.privacy) {
              case 'Public':
                privacyLogo.textContent = 'lock_open';
              break;
              case 'Private':
                eventFire(switchPrivacy, 'click');
                $scope.privacy = capitalizeFirstLetter($rootScope.userData.settings.privacy);
                privacyLogo.textContent = 'lock_outline';
              break;
            }
        });

       // --------------------------- APPLY USER'S VALUES --------------------------- //

       $scope.customize = {
        colorpalette: $rootScope.userData.apparences.colorpalette
      };
    }
]);
