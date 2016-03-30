import {
    beforeEach,
    beforeEachProviders,
    describe,
    expect,
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

    class RouterMock {
        navigate(urlList: Array<String>) { }
    }

    beforeEachProviders(() => [
        provide(AlertingService, { useClass: AlertingService }),
        provide(ImagesService, { useClass: ImagesServiceMock }),
        provide(UserService, { useClass: UserServiceMock }),
        provide(UserValidationService, { useClass: UserValidationService }),
        provide(Router, { useClass: RouterMock }),
        FormBuilder,
        RegisterComponent
    ]);

    it('getAvailableImages_givenImagesServiceIsAvailable_shouldReturnJSONOfImagesFiles',
        inject([RegisterComponent], (instance) => {
            // Arrange
            var allImagesLocal: string[] = new Array<string>();
            allImagesLocal = ['./app/assets/images/avatars/default.jpg', './app/assets/images/avatars/devojce.png'];

            // Act
            instance.getAvailableImages();

            // Assert
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
            spyOn(instance.router, 'navigate').and.callThrough();
            spyOn(instance.alertingService, 'addSuccess').and.callFake(() => { });
            spyOn(instance.userService, 'addUser').and.callFake(function(user) {

                var response: Users = new Users(getAllUsers(user));
                return Observable.of({ users: response.users, message: '' });
            });
            let user: User = new User();
            instance.user = setUser(user);

            // Act      
            instance.onSubmit();

            // Assert
            expect(instance.router.navigate).toHaveBeenCalledWith(['/Login']);
            expect(instance.alertingService.addSuccess).toHaveBeenCalledWith('Успешно внесен корисник.');
        }));

    it('onSubmit_givenInvalidUser_ShouldNotAddAndShouldReturnWrittenMessage',
        inject([RegisterComponent], (instance) => {
            // Arrange
            spyOn(instance.alertingService, 'addDanger').and.callFake(() => { });
            spyOn(instance.userService, 'addUser').and.callFake(function(user) {
                var response: Users = new Users(getAllUsers(user));
                return Observable.of({ users: response.users, message: 'Name exists' });
            });
            let user: User = new User();
            instance.user = setUser(user);

            // Act      
            instance.onSubmit();

            // Assert
            expect(instance.alertingService.addDanger).toHaveBeenCalledWith('Корисничкото име веќе постои, обидете се да се регистрирате со друго име');
        }));

    it('onSubmit_givenDefaultPicSelected_ShouldNotAddAndShouldReturnAllUsersWithWrittenMessage',
        inject([RegisterComponent], (instance) => {
            // Arrange
            spyOn(instance.alertingService, 'addDanger').and.callFake(() => { });
            let user: User = new User();
            user.name = 'eljesa';
            user.profileImg = './assets/images/avatars/default.jpg';
            instance.user = user;

            // Act      
            instance.onSubmit();

            // Assert
            expect(instance.alertingService.addDanger).toHaveBeenCalledWith('За да креирате профил, ве молам изберете слика');
        }));
});