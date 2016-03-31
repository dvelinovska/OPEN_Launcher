import {
  beforeEachProviders,
  it,
  inject
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {Router} from 'angular2/router';

import {User} from '../../shared/models/User';
import {AuthService} from '../../shared/services/AuthService';
import {UserService} from '../../shared/services/UserService';
import {AlertingService} from '../alerting/AlertingService';
import {LoginComponent} from './LoginComponent';
import {Alert} from '../alerting/Alert';

import {UserServiceMock} from '../../shared/mocks/UserServiceMock';
import {RouterMock} from '../../shared/mocks/RouterMock';

describe('LoginComponentTests', function() {
  beforeEachProviders(() => [
    provide(AlertingService, { useClass: AlertingService }),
    provide(UserService, { useClass: UserServiceMock }),
    provide(AuthService, { useClass: AuthService }),
    provide(Router, { useClass: RouterMock }),
    LoginComponent
  ]);

  it('login_givenInvalidUser_shouldSetUnsuccessfulLoginAlertMessage',
    inject([LoginComponent], (instance) => {
      // Arrange
      var user = UserServiceMock.getTestUser('user1');
      spyOn(instance.authService, 'login').and.callFake(() => { return false; });
      spyOn(instance.alertingService, 'addDanger').and.callFake(() => { });
      instance.selectedUser = user;

      // Act
      instance.login();

      // Assert
      expect(instance.authService.login).toHaveBeenCalledWith(user.name);
      expect(instance.alertingService.addDanger).toHaveBeenCalledWith('Корисникот не е валиден.');
    }));

  it('login_givenValidUser_shouldSetSuccessfulLoginAlertMessageAndShouldRedirectToHome',
    inject([LoginComponent], (instance) => {
      // Arrange
      var user = UserServiceMock.getTestUser('user1');
      spyOn(instance.authService, 'login').and.callFake(function() { return true; });
      spyOn(instance.router, 'navigate').and.callFake(() => { });
      instance.selectedUser = user;

      // Act
      instance.login();

      // Assert
      expect(instance.authService.login).toHaveBeenCalledWith(user.name);
      expect(instance.router.navigate).toHaveBeenCalledWith(['/Home']);
    }));

  it('deleteUser_givenSelectedUser_shouldDeleteUserResetTheSelectedUserAndSetSuccessAlertMessage',
    inject([LoginComponent], (instance) => {
      // Arrange
      var user = UserServiceMock.getTestUser('user1');
      instance.selectedUser = user;
      spyOn(instance.alertingService, 'addSuccess').and.callFake(() => { });

      // Act
      instance.deleteUser();

      // Assert
      expect(instance.allUsers.length).toEqual(1);
      expect(instance.selectedUser).not.toEqual(user);
      expect(instance.alertingService.addSuccess).toHaveBeenCalledWith('Профилот е успешно избришан.');
    }));

  it('deleteCancelled_givenCancelDeletingIsChosen_shouldSetInfoAlertMessage',
    inject([LoginComponent], (instance) => {
      // Arrange
      spyOn(instance.alertingService, 'addInfo').and.callFake(() => { });

      // Act
      instance.deleteCancelled();

      // Assert
      expect(instance.alertingService.addInfo).toHaveBeenCalledWith('Бришењето е откажано.');
    }));

  it('selectUser_givenValidUser_shouldSetTheSelectedUser',
    inject([LoginComponent], (instance) => {
      // Arrange
      var user = UserServiceMock.getTestUser('user1');

      // Act
      instance.selectUser(user);

      // Assert
      expect(instance.selectedUser).toEqual(user);
    }));

  it('shouldApplySelectedUserLayout_givenSelectedUser_shouldReturnTrue',
    inject([LoginComponent], (instance) => {
      // Arrange
      var user = UserServiceMock.getTestUser('user1');
      instance.selectedUser = user;

      // Act
      var flag = instance.shouldApplySelectedUserLayout(user);

      // Assert
      expect(flag).toBeTruthy();
    }));

  it('shouldApplySelectedUserLayout_givenDifferentUser_shouldReturnFalse',
    inject([LoginComponent], (instance) => {
      // Arrange
      var selectedUser = UserServiceMock.getTestUser('user1');
      var user = UserServiceMock.getTestUser('user2');
      instance.selectedUser = selectedUser;

      // Act
      var flag = instance.shouldApplySelectedUserLayout(user);

      // Assert
      expect(flag).toBeFalsy();
    }));

  it('getAllUsers_givenAvailableUserService_shouldReturnAllUsers',
    inject([LoginComponent], (instance) => {
      // Arrange
      var localUsers = [{ 'name': 'user1' }, { 'name': 'user2' }];

      // Act
      instance.getAllUsers();

      // Assert
      expect(instance.allUsers).toEqual(localUsers);
    }));
});
