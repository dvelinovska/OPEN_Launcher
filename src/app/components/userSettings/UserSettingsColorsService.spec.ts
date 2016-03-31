import {
  beforeEach,
  it
} from 'angular2/testing';

import {UserSettingsColorsService} from './UserSettingsColorsService';
import {PointerColor, BackgroundColor} from '../../shared/enums/UserSettingsEnums';

describe('UserSettingsColorsServiceTests', function() {
  var instance: UserSettingsColorsService = null;

  beforeEach(function() {
    instance = new UserSettingsColorsService();
  });

  it('getPointerColors_givenBlackAndWhiteBgColor_getsWhiteAndYellowPointer',
    function() {
      // Act
      var pointerColors = instance.getPointerColors(BackgroundColor.BlackAndWhite);

      // Assert
      expect(pointerColors.length).toEqual(2);
    });

  it('getPointerColors_givenInColorBgColor_getsAllColorsAvailableFromEnums',
    function() {
      // Act
      var inColorAvailablePointerColor = instance.getPointerColors(BackgroundColor.InColor);

      // Assert
      expect(inColorAvailablePointerColor.length).toEqual(5);
    });
});
