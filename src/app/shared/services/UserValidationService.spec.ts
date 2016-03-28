import {UserValidationService} from './UserValidationService';
import {User} from '../models/User';
import {PointerType, PointerSize, PointerColor, BackgroundColor} from '../enums/UserSettingsEnums';

describe('UserValidationService', function() {
  var instance: UserValidationService = null;

  function getValidUser() {
    var result = new User();
    result.name = 'testName';
    result.profileImg = 'someProfileImage';
    result.userSettings.backgroundColor = BackgroundColor.InColor;
    result.userSettings.pointerColor = PointerColor.White;
    result.userSettings.pointerSize = PointerSize.Small;
    result.userSettings.pointerType = PointerType.Hand;
    return result;
  }

  beforeEach(() => {
    instance = new UserValidationService();
  });

  it('IsValid_NewUser_ReturnsErrorMessage', function() {
    // Arrange
    var user: User = new User();

    // Act
    var result = instance.IsValid(user);

    // Assert
    expect('Не се сите полиња пополнети.').toEqual(result);
  });

  it('IsValid_NewUserWithName_ReturnsErrorMessage', function() {
    // Arrange
    var user: User = new User();
    user.name = 'testName';

    // Act
    var result = instance.IsValid(user);

    // Assert
    expect('Не се сите полиња пополнети.').toEqual(result);
  });

  it('IsValid_ValidUserWithDefaultPicture_ReturnsErrorMessage', function() {
    // Arrange
    var user: User = getValidUser();
    user.profileImg = './assets/images/avatars/default.jpg';
    // Act
    var result = instance.IsValid(user);

    // Assert
    expect('За да креирате профил, ве молам изберете слика').toEqual(result);
  });

  it('IsValid_ValidUser_ReturnsEmptyMessage', function() {
    // Arrange
    var user: User = getValidUser();

    // Act
    var result = instance.IsValid(user);

    // Assert
    expect('').toEqual(result);
  });

  it('IsValid_ValidUserWithDefaultUserSettings_ReturnsEmptyMessage', function() {
    // Arrange
    var user: User = new User();
    user.name = 'smth';
    user.profileImg = 'smth';

    // Act
    var result = instance.IsValid(user);

    // Assert
    expect('').toEqual(result);
  });
});

