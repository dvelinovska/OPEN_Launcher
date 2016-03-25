import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
  injectAsync
} from 'angular2/testing';

import {provide, Injector, Component} from 'angular2/core';
import {FormBuilder} from 'angular2/common';
import {RouterLink, Router} from 'angular2/router';
import {Observable} from 'rxjs/Rx';

import {User, Users} from '../../shared/models/User';
import {ImagesService} from '../../shared/services/ImagesService';
import {UserService} from '../../shared/services/UserService';
import {UserValidationService} from '../../shared/services/UserValidationService';
import {AlertingService} from '../alerting/AlertingService';
import {RegisterComponent} from './RegisterComponent';
import {Alert} from '../alerting/Alert';

describe('RegistrationCompnent', function() {
  class ImagesServiceMock {
    getProfileImages() {
      var string1 = '["./app/assets/images/avatars/default.jpg", "./app/assets/images/avatars/devojce.png"]';
      var obj = JSON.parse(string1);
      return Observable.of(obj);
    }
  }

  class UserServiceMock {
    addUser(user: User) { }
  }

  class AlertingServiceMock {
    addDanger(message: string) {

    }

    addSuccess(message: string) {

    }
  }

  class RouterMock {
    navigate(urlList: Array<String>) {

    }
  }

  var injector: Injector;
  var instance: RegisterComponent = null;
  var _imagesService: ImagesService;
  var _userService: UserService;
  var _alertingService: AlertingService;
  var _router: Router;
  var _userValidationService: UserValidationService;
  var _formBuilder: FormBuilder;

  beforeEach(() => {
    injector = Injector.resolveAndCreate([
      provide(ImagesService, { useClass: ImagesServiceMock }),
      provide(UserService, { useClass: UserServiceMock }),
      provide(AlertingService, { useClass: AlertingServiceMock }),
      provide(Router, { useClass: RouterMock }),
      UserValidationService,
      FormBuilder
    ]);

    _imagesService = injector.get(ImagesService);
    _userService = injector.get(UserService);
    _alertingService = injector.get(AlertingService);
    _router = injector.get(Router);
    _userValidationService = injector.get(UserValidationService);
    _formBuilder = injector.get(FormBuilder);

    spyOn(_router, 'navigate').and.callThrough();
    spyOn(_alertingService, 'addSuccess').and.callThrough();
    spyOn(_alertingService, 'addDanger').and.callThrough();

    instance = new RegisterComponent(_alertingService, _imagesService, _userService, _userValidationService, _router, _formBuilder);
  });

  it('RegisterComponent_getAvailableImages_returnJSONOfImagesFiles', function() {
    // Act
    var allImagesLocal: string[] = new Array<string>();
    allImagesLocal = ['./app/assets/images/avatars/default.jpg', './app/assets/images/avatars/devojce.png'];

    // Assert
    expect(instance.allImages).toEqual(allImagesLocal);
  });

  it('RegisterComponent_onSelect_shouldbeEljesa', function() {
    //act
    instance.onSelect('eljesa');
    //assert
    expect(instance.user.profileImg).toBe('eljesa');
  });

  it('RegisterComponent_onSelect_shouldBeDefaultPath', function() {
    //assert
    expect(instance.user.profileImg).toBe('./assets/images/avatars/default.jpg');
  });

  it('RegisterComponent_adduser_shouldAddUserAndReturnUsersAndEmptyMessage', function() {
    //Arrange
    spyOn(_userService, 'addUser').and.callFake(function(user) {
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

      var response: Users = new Users(allUsers);
      return Observable.of({ users: response.users, message: '' });
    });


    //Act
    let user: User = new User();
    user.name = 'eljesa';
    user.profileImg = 'PATH';

    instance.user = user;
    instance.onSubmit();

    //Assert
    expect(_router.navigate).toHaveBeenCalledWith(['/Login']);
    expect(_alertingService.addSuccess).toHaveBeenCalledWith('Успешно внесен корисник.');
  });

  it('RegisterComponent_addUser_ExsitingName_ShouldNotAddAndWriteMessage', function() {
    //Arrange
    spyOn(_userService, 'addUser').and.callFake(function(user) {
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

      var response: Users = new Users(allUsers);
      return Observable.of({ users: response.users, message: 'Name exists' });
    });


    //Act
    let user: User = new User();
    user.name = 'eljesa';
    user.profileImg = 'PATH';

    instance.user = user;
    instance.onSubmit();

    //Assert
    expect(_alertingService.addDanger).toHaveBeenCalledWith('Корисничкото име веќе постои, обидете се да се регистрирате со друго име');
  });

  it('RegisterComponent_addUser_ShouldNotAddAndShouldReturnAllUsersWithWrittenMessage', function() {
    //Arrange
    //Act
    let user: User = new User();
    user.name = 'eljesa';
    user.profileImg = './assets/images/avatars/default.jpg';

    instance.user = user;
    instance.onSubmit();

    //Assert
    expect(_alertingService.addDanger).toHaveBeenCalledWith('За да креирате профил, ве молам изберете слика');
  });
});
