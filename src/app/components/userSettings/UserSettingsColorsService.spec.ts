import {UserSettingsColorsService} from './UserSettingsColorsService';
import {PointerColor, BackgroundColor} from '../../shared/enums/UserSettingsEnums';


describe('UserSettingsColorsService', function() {
  var instance: UserSettingsColorsService = null;

  beforeEach(() => {
    instance = new UserSettingsColorsService();
  });

  it('UserSettingsColorsService_getPointerColors_ForBlackWhiteColor', function() {
    // Act
    var pointerColors = instance.getPointerColors(BackgroundColor.BlackAndWhite);

    // Assert
    expect(pointerColors.length).toEqual(2);
  });

  it('UserSettingsColorsService_getPointerColors_ForInColor', function() {
    // Act
    var inColorAvailablePointerColor = instance.getPointerColors(BackgroundColor.InColor);

    // Assert
    expect(inColorAvailablePointerColor.length).toEqual(5);
  });
});
