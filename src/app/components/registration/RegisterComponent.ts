import {Component} from 'angular2/core';
import {RouterLink, Router} from 'angular2/router';
import {
  FORM_DIRECTIVES,
  FormBuilder,
  ControlGroup,
  Validators
} from 'angular2/common';

import {User} from '../../shared/models/User';
import {ImagesService} from '../../shared/services/ImagesService';
import {UserService} from '../../shared/services/UserService';
import {UserValidationService} from '../../shared/services/UserValidationService';
import {AlertingService} from '../alerting/AlertingService';
import {UserSettingsComponent} from '../userSettings/UserSettingsComponent';
import {PointerType, PointerSize, PointerColor, BackgroundColor} from '../../shared/enums/UserSettingsEnums';

@Component({
  directives: [FORM_DIRECTIVES, RouterLink, UserSettingsComponent],
  templateUrl: './app/components/registration/register.html'
})
export class RegisterComponent {
  public vm: User = new User();
  public registerForm: ControlGroup;
  public allImages: string[] = new Array<string>();

  constructor(
    private alertingService: AlertingService,
    private imagesService: ImagesService,
    private userService: UserService,
    private userValidationService: UserValidationService,
    private router: Router,
    private fb: FormBuilder) {

    this.vm = this.getInitialUser();

    this.registerForm = fb.group({
      'name': ['', Validators.required]
    });

    this.getAvailableImages();
  }

  getInitialUser(): User {
    var user: User = new User();
    user.profileImg = './assets/images/avatars/default.jpg';
    user.userSettings.pointerType = PointerType.Hand;
    user.userSettings.backgroundColor = BackgroundColor.InColor;
    user.userSettings.pointerColor = PointerColor.White;
    user.userSettings.pointerSize = PointerSize.Small;
    return user;
  }

  getAvailableImages() {
    this.imagesService.getProfileImages()
      .subscribe(
      data => this.allImages = data,
      err => this.alertingService.addDanger(err.toString()));
  }

  onSelect(img: string) {
    this.vm.profileImg = img;
  }

  onSubmit() {
    var validationMessage = this.userValidationService.IsValid(this.vm);
    if (validationMessage) {
      this.alertingService.addDanger(validationMessage);
    } else {
      this.userService.addUser(this.vm)
        .subscribe(data => {
          if (data.message.length > 0) {
            this.alertingService.addDanger('Корисничкото име веќе постои, обидете се да се регистрирате со друго име');
          } else {
            this.alertingService.addSuccess('Успешно внесен корисник.');
            this.router.navigate(['/Login']);
          }
        }, err => this.alertingService.addDanger(err.toString()));
    }
  }
}
