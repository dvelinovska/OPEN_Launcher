import {Input, Component} from 'angular2/core';
import {RouterLink, Router} from 'angular2/router';
import {
  FORM_DIRECTIVES,
  FormBuilder,
  ControlGroup,
  Validators

} from 'angular2/common';
import {Observable} from 'rxjs';

import {User} from '../../shared/models/User';
import {UserSettingsColorsService} from '../userSettings/UserSettingsColorsService';
import {UserSettingsService} from '../../shared/services/UserSettingsService';
import {AuthService} from '../../shared/services/AuthService';
import {UserSettingsComponent} from '../userSettings/UserSettingsComponent';
import {UserSettings} from '../../shared/models/UserSettings';
import {PointerType, PointerSize, PointerColor, BackgroundColor} from '../../shared/enums/UserSettingsEnums';
import {EnumEx} from '../../shared/enums/EnumEx';
import {AlertingService} from '../alerting/AlertingService';

@Component({
  directives: [FORM_DIRECTIVES, RouterLink, UserSettingsComponent],
  templateUrl: './app/components/userSettingsEdit/userSettingsEdit.html'
})
export class UserSettingsEditComponent {
  public userSettings: Observable<UserSettings>;
  public userName: string;

  constructor(private alertingService: AlertingService, private authService: AuthService, private _userSettingsService: UserSettingsService) {
    this.userName = authService.getUser();
    var userSettings = this._userSettingsService.getUserSettingsFor(this.userName);
  }

  saveUserSettings(userSettings: UserSettings) {
    var userSettingsToBeSaved: UserSettings;
    this.userSettings.subscribe(data => userSettingsToBeSaved = data);

    this._userSettingsService.saveUserSettingsForUser(this.userName, userSettingsToBeSaved)
      .subscribe(data => { this.alertingService.addSuccess('Корисничките подесувања се успешно зачувани.'); });
  }
}
