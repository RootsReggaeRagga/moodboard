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
          if (hasClass(switchPrivacy, 'is-checked'))
            switchPrivacy.classList.remove('is-checked');
          else
            switchPrivacy.classList.add('is-checked');

          // Change label value
          $scope.privacy = $scope.privacy === 'Private' ? 'Public' : 'Private';
        }

       // Colorize color palette
       /*var colorPalette = document.getElementById('color-palette');
       for (var i = 0, iLen = colorPalette.children.length; i < iLen; i++) {
        var box = colorPalette.children[i];
        var boxId = colorPalette.children[i].getAttribute('id');
        var color = capitalizeFirstLetter(boxId.substring(3, boxId.length+1));
        box.style.background = palette.get(color, '500');
      }*/


       // --------------------------- APPLY USER'S VALUES --------------------------- //
       // Retrieve user data
       //applyUserInterfaceStyle($rootScope.userData.apparences.colorpalette);

       $scope.customize = {
        colorpalette: $rootScope.userData.apparences.colorpalette
      };

      /*$scope.privacy = capitalizeFirstLetter($rootScope.userData.settings.privacy);
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
      }*/
    }
]);
