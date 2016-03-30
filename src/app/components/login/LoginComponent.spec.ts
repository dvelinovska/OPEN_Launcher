import {
    beforeEachProviders,
    describe,
    expect,
    it,
    inject
} from 'angular2/testing';

import {provide, Component} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {Router} from 'angular2/router';

import {User} from '../../shared/models/User';
import {AuthService} from '../../shared/services/AuthService';
import {UserService} from '../../shared/services/UserService';
import {AlertingService} from '../alerting/AlertingService';
import {LoginComponent} from './LoginComponent';
import {Alert} from '../alerting/Alert';

describe('LoginComponentTests', function() {
    var instance: LoginComponent = null;

    function getTestUser(name: string) {
        var user = new User();
        user.name = name;
        return user;
    }

    class UserServiceMock {
        deleteUser(name) {
            var allUsers: User[] = new Array<User>();
            allUsers[0] = getTestUser('user1');
            return Observable.of(allUsers);
        }

        getAllUsers(): Observable<User[]> {
            var allUsers: User[] = new Array<User>();
            var string1 = '[{"name": "user1"}, {"name": "user2"}]';
            var obj = JSON.parse(string1);
            return Observable.of(obj);
        }
    }

    class RouterMock {
        navigate() { }
    }

    beforeEachProviders(() => [
        provide(AlertingService, { useClass: AlertingService }),
        provide(UserService, { useClass: UserServiceMock }),
        provide(AuthService, { useClass: AuthService }),
        provide(Router, { useClass: RouterMock }),
        LoginComponent
    ]);

    it('login_givenInvalidUser_shouldSetUnsuccessfulLoginAlertMessage',
        inject([LoginComponent], (instance) => {
            //Arrange
            var user = getTestUser('user');
            spyOn(instance.alertingService, 'addDanger').and.callFake(() => { });
            spyOn(instance.authService, 'login').and.callFake(() => { return false; });
            instance.selectUser(user);

            //Act
            instance.login();

            //Assert
            expect(instance.authService.login).toHaveBeenCalledWith(user.name);
            expect(instance.alertingService.addDanger).toHaveBeenCalledWith('Корисникот не е валиден.');
        }));

    it('login_givenValidUser_shouldSetSuccessfulLoginAlertMessageAndShouldRedirectToHome',
        inject([LoginComponent], (instance) => {
            //Arrange
            var user = getTestUser('user');
            spyOn(instance.router, 'navigate').and.callFake(() => { });
            spyOn(instance.authService, 'login').and.callFake(function() { return true; });
            instance.selectUser(user);

            //Act
            instance.login();

            //Assert
            expect(instance.authService.login).toHaveBeenCalledWith(user.name);
            expect(instance.router.navigate).toHaveBeenCalledWith(['/Home']);
        }));

    it('deleteUser_givenSelectedUser_shouldDeleteUser',
        inject([LoginComponent], (instance) => {
            // Arrange
            instance.selectedUser = getTestUser('user1');

            // Act
            instance.deleteUser();

            // Assert
            expect(instance.allUsers.length).toEqual(1);
        }));

    it('deleteUser_givenSelectedUser_shouldResetTheSelectedUser',
        inject([LoginComponent], (instance) => {
            // Arrange
            var user = getTestUser('user');
            instance.selectedUser = user;

            // Act
            instance.deleteUser();

            // Assert
            expect(instance.selectedUser).not.toEqual(user);
        }));

    it('deleteUser_givenSelectedUser_shouldSetSuccessAlertMessage',
        inject([LoginComponent], (instance) => {
            //Arrange
            spyOn(instance.alertingService, 'addSuccess').and.callFake(() => { });

            // Act
            instance.deleteUser();

            // Assert
            expect(instance.alertingService.addSuccess).toHaveBeenCalledWith('Профилот е успешно избришан.');
        }));

    it('deleteCancelled_givenCancelDeletingIsChosen_shouldSetInfoAlertMessage',
        inject([LoginComponent], (instance) => {
            //Arrange
            spyOn(instance.alertingService, 'addInfo').and.callFake(() => { });

            // Act
            instance.deleteCancelled();

            // Assert
            expect(instance.alertingService.addInfo).toHaveBeenCalledWith('Бришењето е откажано.');
        }));

    it('selectUser_givenValidUser_shouldSetTheSelectedUser',
        inject([LoginComponent], (instance) => {
            // Arrange
            var user = getTestUser('user');

            // Act
            instance.selectUser(user);

            // Assert
            expect(instance.selectedUser).toEqual(user);
        }));

    it('shouldApplySelectedUserLayout_givenSelectedUser_shouldReturnTrue',
        inject([LoginComponent], (instance) => {
            // Arrange
            var user = getTestUser('user');

            // Act
            instance.selectedUser = user;
            var flag = instance.shouldApplySelectedUserLayout(user);

            // Assert
            expect(flag).toBeTruthy();
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
