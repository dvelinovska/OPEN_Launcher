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

import {UserValidationService} from './UserValidationService';
import {GlobalService} from './GlobalService';
import {User} from '../models/User';
import {PointerType, PointerSize, PointerColor, BackgroundColor} from '../enums/UserSettingsEnums';

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

  // it('isValid_givenInvalidEmptyUser_shouldReturnErrorMessage',
  //  inject([UserValidationService, MockBackend], (userSettingsService: UserValidationService, mockBackend) => {
  //       // Arrange
  //       var user: User = new User();

  //  //  var userSettingsObject = getDefaultUserSettingsObject();
  //           // mockBackend.connections.subscribe(
  //           //     (connection: MockConnection) => {
  //           //         connection.mockRespond(new Response(
  //           //             new ResponseOptions({
  //           //                 body: JSON.stringify(userSettingsObject)
  //           //             }
  //           //             )));
  //           //     });

  //       // Act
  //       var result = instance.isValid(user);

  //       // Assert
  //       expect('Не се сите полиња пополнети.').toEqual(result);
  //   }));

  //   it('isValid_givenInvalidEmptyUser_shouldReturnErrorMessage', function() {
  //       // Arrange
  //       var user: User = new User();

  //       // Act
  //       var result = instance.isValid(user);

  //       // Assert
  //       expect('Не се сите полиња пополнети.').toEqual(result);
  //   });

  //   it('isValid_givenInvalidUserWithName_shouldReturnErrorMessage', function() {
  //       // Arrange
  //       var user: User = new User();
  //       user.name = 'testName';

  //       // Act
  //       var result = instance.isValid(user);

  //       // Assert
  //       expect('Не се сите полиња пополнети.').toEqual(result);
  //   });

  //   it('isValid_givenValidUserWithTheDefaultPicture_shouldReturnErrorMessage', function() {
  //       // Arrange
  //       var user: User = getValidUser();
  //       user.profileImg = './assets/images/avatars/default.jpg';
  //       // Act
  //       var result = instance.isValid(user);

  //       // Assert
  //       expect('За да креирате профил, ве молам изберете слика').toEqual(result);
  //   });

  //   it('isValid_givenValidUser_shouldReturnEmptyMessage', function() {
  //       // Arrange
  //       var user: User = getValidUser();

  //       // Act
  //       var result = instance.isValid(user);

  //       // Assert
  //       expect('').toEqual(result);
  //   });

  //   it('isValid_givenValidUserWithDefaultUserSettings_shouldReturnEmptyMessage', function() {
  //       // Arrange
  //       var user: User = new User();
  //       user.name = 'smth';
  //       user.profileImg = 'smth';

  //       // Act
  //       var result = instance.isValid(user);

  //       // Assert
  //       expect('').toEqual(result);
  //   });

    //isExistingUser

     it('isExistingUser_givenValidUsername_shouldBeFalsy',
        inject([UserValidationService, MockBackend], (userSettingsService: UserValidationService, mockBackend) => {
            // Arrange
 }));

});
