import {
    beforeEachProviders,
    describe,
    expect,
    it,
    inject
} from 'angular2/testing';

import {provide, Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {Observable} from 'rxjs/Rx';

import {User, Users} from '../../shared/models/User';
import {ImagesService} from '../../shared/services/ImagesService';
import {UserSettingsComponent} from '../userSettings/UserSettingsComponent';
import {UserSettingsService} from '../../shared/services/UserSettingsService';
import {UserValidationService} from '../../shared/services/UserValidationService';
import {AlertingService} from '../alerting/AlertingService';
import {UserSettingsEditComponent} from './UserSettingsEditComponent';
import {AuthService} from '../../shared/services/AuthService';
import {Alert} from '../alerting/Alert';
import {UserSettings} from '../../shared/models/UserSettings';
import {PointerType, PointerSize, PointerColor, BackgroundColor} from '../../shared/enums/UserSettingsEnums';

describe('UserSettingsEditComponentTests', function() {
    var instance: UserSettingsEditComponent;

    function setUserSetting(userSettings: UserSettings) {
        userSettings.backgroundColor = BackgroundColor.InColor;
        userSettings.pointerType = PointerType.Hand;
        userSettings.pointerSize = PointerSize.Small;
        userSettings.pointerColor = PointerColor.Blue;
    }

    class AuthServiceMock {
        getUser() {
            var userName = 'Ema&Eljesa';
            return userName;
        }
    }

    class UserSettingsServiceMock {
        getUserSettingsFor(userName: string) {
            var userSettings: UserSettings = new UserSettings();
            setUserSetting(userSettings);
            return Observable.of(userSettings);
        }

        saveUserSettingsForUser(userName: string, userSettings: UserSettings) {
            userSettings = new UserSettings();
            setUserSetting(userSettings);
            return Observable.of(userSettings);
        }
    }

    beforeEachProviders(() => [
        provide(AlertingService, { useClass: AlertingService }),
        provide(AuthService, { useClass: AuthServiceMock }),
        provide(UserSettingsService, { useClass: UserSettingsServiceMock }),
        UserSettingsEditComponent
    ]);

    it('saveUserSettings_givenAvailableUserSettingsService_saveUserSettingsShouldBeCalled',
        inject([UserSettingsEditComponent], (instance) => {
            // Arrange
            spyOn(instance, 'saveUserSettings').and.callThrough();

            // Act
            var userSettings: UserSettings = new UserSettings();
            setUserSetting(userSettings);
            instance.saveUserSettings();

            // Assert
            expect(instance.saveUserSettings).toHaveBeenCalled();
        }));

    it('saveUserSettings_givenAvailableUserSettingsService_shouldSaveUserSettingsAndAlertForSuccessIsCalled',
        inject([UserSettingsEditComponent], (instance) => {
            // Arrange
            spyOn(instance, 'saveUserSettings').and.callThrough();
            spyOn(instance.alertingService, 'addSuccess').and.callFake(() => { });

            // Act
            var userSettings: UserSettings = new UserSettings();
            setUserSetting(userSettings);
            instance.saveUserSettings();

            // Assert
            expect(instance.alertingService.addSuccess).toHaveBeenCalledWith('Корисничките подесувања се успешно зачувани.');
        }));

    it('saveUserSettings_givenAvailableUserSettingsService_saveUserSettingsServiceForUserShouldBeCalledFromUserSettingsService',
        inject([UserSettingsEditComponent], (instance) => {
            // Arrange
            spyOn(instance, 'saveUserSettings').and.callThrough();
            spyOn(instance.userSettingsService, 'saveUserSettingsForUser').and.callThrough();

            // Act
            var userSettings: UserSettings = new UserSettings();
            setUserSetting(userSettings);
            instance.saveUserSettings();

            // Assert
            expect(instance.userSettingsService.saveUserSettingsForUser).toHaveBeenCalled();
        }));
});
