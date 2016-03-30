import {Component} from 'angular2/core';

import {UserService} from '../../shared/services/UserService';
import {AuthService} from '../../shared/services/AuthService';
import {AlertingService} from '../alerting/AlertingService';
import {User} from '../../shared/models/User';

@Component({
  selector: 'home',
  templateUrl: `./app/components/home/home.html`
})
export class HomeComponent {
  public allUsers: User[] = new Array<User>();
  public newUser: User = new User();

  constructor(
    private alertingService: AlertingService,
    private userService: UserService,
    private authService: AuthService) {

    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers()
      .subscribe(data => this.allUsers = data, err => this.alertingService.addDanger(err.toString()));
  }

  deleteUser(name): void {
    this.userService.deleteUser(name)
      .subscribe(data => this.allUsers = data, err => this.alertingService.addDanger(err.toString()));
  }

  login(username: string): boolean {
    if (!this.authService.login(username)) {
      this.alertingService.addDanger('Корисникот не е валиден.');
    }
    return false;
  }

  logout(): void {
    this.authService.logout();
  }
}
