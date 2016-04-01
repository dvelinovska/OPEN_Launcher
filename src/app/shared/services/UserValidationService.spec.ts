import {
  it,
  inject,
  describe,
  beforeEachProviders
} from 'angular2/testing';

import {HTTP_PROVIDERS} from 'angular2/http';
import {provide} from 'angular2/core';
import {BaseRequestOptions, Http, Response, ResponseOptions} from 'angular2/http';
import {MockBackend, MockConnection} from 'angular2/http/testing';
import {Observable} from 'rxjs/Rx';

import {UserValidationService} from './UserValidationService';
import {GlobalService} from './GlobalService';
import {User} from '../models/User';
import {PointerType, PointerSize, PointerColor, BackgroundColor} from '../enums/UserSettingsEnums';
import {ValidationResponse} from '../../shared/models/ValidationResponse';

describe('UserValidationServiceTests', function() {
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

  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),

    GlobalService,
    UserValidationService
  ]);

  it('should have http', inject([UserValidationService], (userValidationService) => {
    expect(!!userValidationService.http).toEqual(true);
  }));



  it('isValid_givenDefaultProfilePicture_shouldReturnObservableOfValidationResponseWithInvalidUser',
    inject([UserValidationService], (instance) => {
      // Arrange
      let user: User = new User();
      user.name = 'eljesa';
      user.profileImg = './assets/images/avatars/default.jpg';
      instance.user = user;

      spyOn(instance, 'isUserPictureSet').and.callFake(() => {

        return false;
      });

      spyOn(instance, 'getInvalidUserPictureValidationResponse').and.callFake(() => { });

      // Act
      var result = instance.isValid(user);

      // Assert
      expect(instance.getInvalidUserPictureValidationResponse).toHaveBeenCalled();
    }));

  it('isValid_givenInvalidUserDataValidationResponse_shouldReturnErrorMessage',
    inject([UserValidationService], (instance) => {
      // Arrange
      let user: User = new User();
      user.name = 'eljesa';
      user.profileImg = './assets/images/avatars/devojce.jpg';
      instance.user = user;

      spyOn(instance, 'isUserPictureSet').and.callFake(() => {
        return true;
      });

      spyOn(instance, 'isValidUserData').and.callFake(() => {
        return false;
      });

      spyOn(instance, 'getInvalidUserDataValidationResponse').and.callFake(() => { });

      // Act
      var result = instance.isValid(user);

      // Assert
      expect(instance.getInvalidUserDataValidationResponse).toHaveBeenCalled();
    }));

  it('isValid_givenInvalidUserDataValidationResponse_shouldReturnErrorMessage',
    inject([UserValidationService], (instance) => {
      // Arrange
      let user: User = new User();
      user.name = 'eljesa';
      user.profileImg = './assets/images/avatars/devojce.jpg';
      instance.user = user;

      // Act
      spyOn(instance, 'isUserPictureSet').and.callFake(() => { return true; });
      spyOn(instance, 'isValidUserData').and.callFake(() => { return true; });
      spyOn(instance, 'getExistingUserValidationResponse').and.callFake(() => { });

      // Act
      var result = instance.isValid(user);

      // Assert
      expect(instance.getExistingUserValidationResponse).toHaveBeenCalled();
    }));

  it('isValid_givenValidUserDataValidationResponse_shouldReturnSuccessMessage',
    inject([UserValidationService], (instance) => {
      // Arrange
      let user: User = new User();
      user.name = 'eljesa';
      user.profileImg = './assets/images/avatars/devojce.jpg';
      instance.user = user;

      // Act
      spyOn(instance, 'isUserPictureSet').and.callFake(() => { return true; });
      spyOn(instance, 'isValidUserData').and.callFake(() => { return true; });
      spyOn(instance, 'getExistingUserValidationResponse').and.callFake(() => {
        var response: ValidationResponse = new ValidationResponse(false);
        return Observable.of(response);
      });

      // Act
      var result = instance.isValid(user);

      // Assert
      expect(instance.getExistingUserValidationResponse).toHaveBeenCalled();
    }));

  it('getInvalidUserPictureValidationResponse_givenInvalidValidationResponse_shouldReturnErrorMessage',
    inject([UserValidationService], (instance) => {
      // Arrange
      var response = new ValidationResponse(false, 'За да креирате профил, ве молам изберете слика.');
      var result: ValidationResponse;

      // Act
      instance.getInvalidUserPictureValidationResponse().subscribe(data => { result = data });

      // Assert
      expect(result).toEqual(response);
    }));

  it('getExistingUserValidationResponse_givenInvalidEmptyUser_shouldReturnErrorMessage',
    inject([UserValidationService, MockBackend], (userValidationService, mockBackend) => {
      // Arrange
      var existingUser = true;

      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: JSON.stringify(existingUser)
            }
            )));
        });

      // Act
      userValidationService.isExistingUser('user').subscribe(
        (data) => {
          // Assert
          expect(data).toBeTruthy();
        },
        (error) => {
          fail(error);
        }
      );
    }));

  it('isExistingUser_givenValidusername_shouldCallHttpSuccessfully',
    inject([UserValidationService], (userValidationService) => {
      // Arrange
      spyOn(userValidationService.http, "get").and.callFake(() => { });

      // Act
      userValidationService.isExistingUser('user');

      // Assert
      expect(userValidationService.http.get).toHaveBeenCalled();
    }));
});
