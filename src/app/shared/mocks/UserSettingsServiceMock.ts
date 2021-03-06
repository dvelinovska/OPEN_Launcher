import {Observable} from 'rxjs/Rx';

import {UserSettings} from '../models/UserSettings';
import {PointerType, PointerSize, PointerColor, BackgroundColor} from '../../shared/enums/UserSettingsEnums';
import {IUserSettingsService} from '../services/UserSettingsService';

export class UserSettingsServiceMock implements IUserSettingsService {
  static setUserSetting(userSettings: UserSettings) {
    userSettings.backgroundColor = BackgroundColor.InColor;
    userSettings.pointerType = PointerType.Hand;
    userSettings.pointerSize = PointerSize.Small;
    userSettings.pointerColor = PointerColor.Blue;
  }

  getUserSettingsFor(userName: string) {
    var userSettings: UserSettings = new UserSettings();
    UserSettingsServiceMock.setUserSetting(userSettings);
    return Observable.of(userSettings);
  }

  saveUserSettingsForUser(userName: string, userSettings: UserSettings) {
    userSettings = new UserSettings();
    UserSettingsServiceMock.setUserSetting(userSettings);
    return Observable.of(userSettings);
  }
}
