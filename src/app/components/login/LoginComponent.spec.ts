import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
  injectAsync,
  TestComponentBuilder,
  ComponentFixture
} from 'angular2/testing';

import {provide, Injector, Component} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {RouterLink, Router} from 'angular2/router';

import {User} from '../../shared/models/User';
import {AuthService} from '../../shared/services/AuthService';
import {UserService} from '../../shared/services/UserService';
import {AlertingService} from '../alerting/AlertingService';
import {LoginComponent} from './LoginComponent';
import {Alert} from '../alerting/Alert';

describe('LoginComponent', function() {

  function getTestUser(name) {
    var user = new User();
    user.name = name;
    return user;
  }

  function getAllUsers() {
    var user1 = new User();
    user1.name = 'user1';
    var user2 = new User();
    user2.name = 'user2';
    var allUsers: User[] = new Array<User>();
    allUsers[0] = user1;
    allUsers[1] = user2;
    return allUsers;
  }

  class UserServiceMock {
    deleteUser(name) {
      var allUsers = getAllUsers();
      return Observable.of(allUsers);
    }

    getAllUsers() {
      var string1 = '[{"name": "Daniela", "profileImg":"danielImg"},{"name": "Daniela1", "profileImg":"danielImg1"}]';
      var obj = JSON.parse(string1);
      return Observable.of(obj);
    }
  }

  class AlertingServiceMock {
    addDanger() { }
    addSuccess() { }
    addInfo() { }
  }

  class AuthServiceMock {
    getUser() {
      var string1 = '[{"name": "Daniela", "profileImg":"danielImg"},{"name": "Daniela1", "profileImg":"danielImg1"}]';
      var obj = JSON.parse(string1);
      return Observable.of(obj);
    }
    login() { }
  }
  class RouterMock {
    navigate() { }
  }

  var injector: Injector;
  var instance: LoginComponent = null;
  var _authService: AuthService;
  var _userService: UserService;
  var _alertingService: AlertingService;
  var _router: Router;

  beforeEach(() => {

    injector = Injector.resolveAndCreate([
      provide(AuthService, { useClass: AuthServiceMock }),
      provide(UserService, { useClass: UserServiceMock }),
      provide(AlertingService, { useClass: AlertingServiceMock }),
      provide(Router, { useClass: RouterMock }),
    ]);

    _authService = injector.get(AuthService);
    _userService = injector.get(UserService);
    _alertingService = injector.get(AlertingService);
    _router = injector.get(Router);

    instance = new LoginComponent(_alertingService, _userService, _authService, _router);

  });

  it('Login_GivenInavlidUser_UnsuccessfulLogin', function() {
    //Arrange
    var user = getTestUser('user');

    //Act
    spyOn(_alertingService, 'addDanger').and.callThrough();
    spyOn(_authService, 'login').and.callFake(function() { return false; });
    instance.selectUser(user);
    instance.login();

    //Assert
    expect(_authService.login).toHaveBeenCalledWith(user.name);
    expect(_alertingService.addDanger).toHaveBeenCalledWith('Корисникот не е валиден.');
  });

  it('Login_GivenValidUser_SuccessfulLogin', function() {
    //Arrange
    var user = getTestUser('user');

    //Act
    spyOn(_router, 'navigate').and.callThrough();
    spyOn(_authService, 'login').and.callFake(function() { return true; });
    instance.selectUser(user);
    instance.login();

    //Assert
    expect(_authService.login).toHaveBeenCalledWith(user.name);
    expect(_router.navigate).toHaveBeenCalledWith(['/Home']);
  });

  it('DeleteUser_GivenSelectedUser_DeletesTheSelectedUser', function() {
    // Arrange
    var user = getTestUser('user');
    var allUsers = getAllUsers();

    // Act
    instance.selectedUser = user;
    instance.deleteUser();

    // Assert
    expect(instance.allUsers).toEqual(allUsers);
  });

  it('DeleteUser_GivenSelectedUser_ResetsTheSelectedUser', function() {
    // Arrange
    var user = getTestUser('user');

    // Act
    instance.selectedUser = user;
    instance.deleteUser();

    // Assert
    expect(instance.selectedUser).not.toEqual(user);
  });

  it('DeleteUser_WhenUserIsDeleted_SuccessMessageIsShown', function() {
    //Arrange
    spyOn(_alertingService, 'addSuccess').and.callThrough();

    // Act
    instance.deleteUser();

    // Assert
    expect(_alertingService.addSuccess).toHaveBeenCalledWith('Профилот е успешно избришан.');
  });

  it('DeleteCancelled_WhenDeleteIsCancelled_InfoMessageIsShown', function() {
    //Arrange
    spyOn(_alertingService, 'addInfo').and.callThrough();

    // Act
    instance.deleteCancelled();

    // Assert
    expect(_alertingService.addInfo).toHaveBeenCalledWith('Бришењето е откажано.');
  });

  it('SelectUser_GivenAuser_SetsTheSelectedUser', function() {
    // Arrange
    var user = getTestUser('user');

    // Act
    instance.selectUser(user);

    // Assert
    expect(instance.selectedUser).toEqual(user);
  });

  it('ShouldApplySelectedUserLayout_GivenTheSelectedUser_ReturnsTrue', function() {
    // Arrange
    var user = getTestUser('user');

    // Act
    instance.selectedUser = user;
    var flag = instance.ShouldApplySelectedUserLayout(user);

    // Assert
    expect(flag).toBeTruthy();
  });

  it('GetAllUsers_WhenLoginComponentIsInstantiated_AllUsersIsInitialized', function() {

    var localUsers = [{ 'name': 'Daniela', 'profileImg': 'danielImg' }, { 'name': 'Daniela1', 'profileImg': 'danielImg1' }];

    expect(instance.allUsers).toEqual(localUsers);
  });
});
