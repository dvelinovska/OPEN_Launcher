import {Component, Injector} from 'angular2/core';
import {CanActivate} from 'angular2/router';

import {AuthService} from '../../shared/services/AuthService';

@Component({
  selector: 'home',
  templateUrl: `./app/components/home/home.html`
})
@CanActivate(
  (nextInstr: any, currInstr: any) => {
    let injector: any = Injector.resolveAndCreate([AuthService]);
    let authService: AuthService = injector.get(AuthService);
    return authService.isLogged();
  }
)
export class HomeComponent {
  public zapoznajSeSoKomp = 'Cause and Effect';
  public ucimeSoKomp = ['Sets', 'Who is hiding', 'Puzzle/Halves', 'Me and my home', 'Story'];
}
