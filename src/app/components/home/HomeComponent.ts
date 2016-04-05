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
    public zapoznajSeSoKomp = ['Cause and Effect'];
    public ucimeSoKomp = ['Sets', 'Who is hiding', 'Puzzle/Halves', 'Me and my home', 'Story'];

    constructor(private authService: AuthService) { }
}