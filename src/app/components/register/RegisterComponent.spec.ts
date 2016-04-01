import {
  beforeEachProviders,
  it,
  inject
} from 'angular2/testing';
import {provide, Component} from 'angular2/core';
import {FormBuilder} from 'angular2/common';
import {Router} from 'angular2/router';
import {Observable} from 'rxjs/Rx';

import {User, Users} from '../../shared/models/User';
import {ImagesService} from '../../shared/services/ImagesService';
import {UserService} from '../../shared/services/UserService';
import {UserValidationService} from '../../shared/services/UserValidationService';
import {AlertingService} from '../alerting/AlertingService';
import {RegisterComponent} from './RegisterComponent';
import {Alert} from '../alerting/Alert';

import {UserServiceMock} from '../../shared/mocks/UserServiceMock';
import {RouterMock} from '../../shared/mocks/RouterMock';
import {ImagesServiceMock} from '../../shared/mocks/ImagesServiceMock';

describe('RegisterComponentTests', () => {
  beforeEachProviders(() => [
    AlertingService,
    UserValidationService,
    provide(ImagesService, { useClass: ImagesServiceMock }),
    provide(UserService, { useClass: UserServiceMock }),
    provide(Router, { useClass: RouterMock }),
    FormBuilder,
    RegisterComponent
  ]);

  it('setAvailableImages_givenImagesServiceIsAvailable_shouldReturnJSONOfImagesFiles',
    inject([RegisterComponent], (instance) => {
      // Arrange
      var allImagesLocal = ['./app/assets/images/avatars/default.jpg', './app/assets/images/avatars/devojce.png'];
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

  it('onSubmit_givenAValidNewUser_shouldAddUserReturnEmptyMessageAlertForSuccessAndRedirectToLogin',
    inject([RegisterComponent], (instance) => {
      // Arrange
      let user: User = UserServiceMock.getTestUser('user');
      instance.user = user;
      spyOn(instance.router, 'navigate').and.callThrough();
      spyOn(instance.alertingService, 'addSuccess').and.callFake(() => { });
      spyOn(instance.userService, 'addUser').and.callFake((user) => {
        return Observable.of({ users: new Array<User>(), message: '' });
      });

      // Act
      instance.onSubmit();

      // Assert
      expect(instance.userService.addUser).toHaveBeenCalledWith(user);
      expect(instance.router.navigate).toHaveBeenCalledWith(['/Login']);
      expect(instance.alertingService.addSuccess).toHaveBeenCalledWith('Успешно внесен корисник.');
    }));

  it('onSubmit_givenInvalidUser_ShouldNotAddAndShouldReturnWrittenMessage',
    inject([RegisterComponent], (instance) => {
      // Arrange
      let user: User = UserServiceMock.getTestUser('user');
      instance.user = user;
      spyOn(instance.router, 'navigate').and.callThrough();
      spyOn(instance.alertingService, 'addDanger').and.callFake(() => { });
      spyOn(instance.userService, 'addUser').and.callFake((user) => {
        return Observable.of({ users: new Array<User>(), message: 'Name exists' });
      });

      // Act
      instance.onSubmit();

      // Assert
      expect(instance.userService.addUser).toHaveBeenCalledWith(user);
      expect(instance.router.navigate).not.toHaveBeenCalledWith(['/Login']);
      expect(instance.alertingService.addDanger).toHaveBeenCalledWith('Корисничкото име веќе постои, обидете се да се регистрирате со друго име');
    }));

  it('onSubmit_givenDefaultPicSelected_ShouldNotAddAndShouldReturnAllUsersWithWrittenMessage',
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
      expect(instance.userService.addUser).not.toHaveBeenCalledWith(user);
      expect(instance.router.navigate).not.toHaveBeenCalledWith(['/Login']);
      expect(instance.alertingService.addDanger).toHaveBeenCalledWith('За да креирате профил, ве молам изберете слика');
    }));
});
