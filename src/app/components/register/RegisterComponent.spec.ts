import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from 'angular2/testing';

import {HTTP_PROVIDERS} from 'angular2/http';
import {provide, Component} from 'angular2/core';
import {FormBuilder} from 'angular2/common';
import {Router} from 'angular2/router';
import {Observable} from 'rxjs/Rx';

import {User, Users} from '../../shared/models/User';
import {ImagesService} from '../../shared/services/ImagesService';
import {GlobalService} from '../../shared/services/GlobalService';
import {UserService} from '../../shared/services/UserService';
import {UserValidationService} from '../../shared/services/UserValidationService';
import {AlertingService} from '../alerting/AlertingService';
import {RegisterComponent} from './RegisterComponent';
import {Alert} from '../alerting/Alert';

import {UserServiceMock} from '../../shared/mocks/UserServiceMock';
import {RouterMock} from '../../shared/mocks/RouterMock';
import {ImagesServiceMock} from '../../shared/mocks/ImagesServiceMock';
import {ValidationResponse} from '../../shared/models/ValidationResponse';

describe('RegisterComponentTests', function() {
  var instance: RegisterComponent = null;

  function setUser(user: User): User {
    user.name = 'eljesa';
    user.profileImg = 'PATH';
    return user;
  }

  function getAllUsers(user: User): User[] {
    var user1 = new User();
    user1.name = 'a';
    user1.profileImg = 'aa';
    var user2 = new User();
    user2.name = 'b';
    user2.profileImg = 'bb';
    var allUsers: User[] = new Array<User>();
    allUsers[0] = user1;
    allUsers[1] = user2;
    allUsers[2] = new User();
    allUsers[2].name = user.name;
    allUsers[2].profileImg = user.profileImg;

    return allUsers;
  }

  beforeEachProviders(() => [
    AlertingService,
    UserValidationService,
    provide(ImagesService, { useClass: ImagesServiceMock }),
    provide(UserService, { useClass: UserServiceMock }),
    provide(Router, { useClass: RouterMock }),
    FormBuilder,
    HTTP_PROVIDERS,
    GlobalService,
    RegisterComponent
  ]);

  it('setAvailableImages_givenImagesServiceIsAvailable_shouldReturnJSONOfImageFiles',
    inject([RegisterComponent], (instance) => {
      // Arrange
      var allImagesLocal: string[] = new Array<string>();
      allImagesLocal = ['./app/assets/images/avatars/default.jpg', './app/assets/images/avatars/devojce.png'];
      spyOn(instance.imagesService, 'getProfileImages').and.callThrough();

      // Act
      instance.setAvailableImages();

      // Assert
      expect(instance.imagesService.getProfileImages).toHaveBeenCalled();
      expect(instance.allImages).toEqual(allImagesLocal);
    }));

  it('onSelect_givenSelectedImagePath_shouldSetProfileImg',
    inject([RegisterComponent], (instance) => {
      // Act
      instance.onSelect('imagePath');

      // Assert
      expect(instance.user.profileImg).toBe('imagePath');
    }));

  it('onSubmit_givenAValidNewUser_shouldValidateAddUserThrowAlertForSuccessAndRedirectToLogin',
    inject([RegisterComponent], (instance) => {
      // Arrange
      let user: User = new User();
      instance.user = setUser(user);

      spyOn(instance.userValidationService, 'isValid').and.callFake(() => {
        var response: ValidationResponse = new ValidationResponse(true, 'Успешно внесен корисник.');
        return Observable.of(response);
      });

      spyOn(instance.userService, 'addUser').and.callFake(function(user) {
        var response: Users = new Users(getAllUsers(user));
        return Observable.of({ users: response.users });
      });

      spyOn(instance.alertingService, 'addSuccess').and.callFake(() => { });
      spyOn(instance.router, 'navigate').and.callThrough();

      // Act
      instance.onSubmit();

      // Assert
      expect(instance.userValidationService.isValid).toHaveBeenCalled();
      expect(instance.router.navigate).toHaveBeenCalledWith(['/Login']);
      expect(instance.alertingService.addSuccess).toHaveBeenCalledWith('Успешно внесен корисник.');
    }));

  it('onSubmit_givenInvalidUser_shouldValidateAddUserThrowAlertForDanger',
    inject([RegisterComponent], (instance) => {
      // Arrange
      let user: User = UserServiceMock.getTestUser('user');
      instance.user = setUser(user);

      spyOn(instance.userValidationService, 'isValid').and.callFake(() => {
        var response: ValidationResponse = new ValidationResponse(false, 'Корисничкото име веќе постои, обидете се да се регистрирате со друго име.');
        return Observable.of(response);
      });

      spyOn(instance.userService, 'addUser').and.callFake(function(user) {
        var response: Users = new Users(getAllUsers(user));
        return Observable.of({ users: response.users });
      });

      spyOn(instance.alertingService, 'addDanger').and.callFake(() => { });
      spyOn(instance.router, 'navigate').and.callThrough();

      // Act
      instance.onSubmit();

      // Assert
      expect(instance.userValidationService.isValid).toHaveBeenCalled();
      expect(instance.alertingService.addDanger).toHaveBeenCalledWith('Корисничкото име веќе постои, обидете се да се регистрирате со друго име.');
      expect(instance.router.navigate).not.toHaveBeenCalledWith(['/Login']);
    }));

  it('onSubmit_givenDefaultPicSelected_shouldNotAddAndShouldThrowAlertForDanger',
    inject([RegisterComponent], (instance) => {
      // Arrange
      let user: User = new User();
      user.name = 'eljesa';
      user.profileImg = './assets/images/avatars/default.jpg';
      instance.user = user;
      spyOn(instance.alertingService, 'addDanger').and.callFake(() => { });
      spyOn(instance.router, 'navigate').and.callThrough();
      spyOn(instance.userService, 'addUser').and.callFake(() => { });

      // Act
      instance.onSubmit();

      // Assert

      expect(instance.alertingService.addDanger).toHaveBeenCalledWith('За да креирате профил, ве молам изберете слика.');

      expect(instance.userService.addUser).not.toHaveBeenCalledWith(user);
      expect(instance.router.navigate).not.toHaveBeenCalledWith(['/Login']);


    }));
});
