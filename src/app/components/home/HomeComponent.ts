import {Component} from 'angular2/core';

@Component({
  selector: 'home',
  templateUrl: `./app/components/home/home.html`
})
export class HomeComponent {
  public zapoznajSeSoKomp = 'Cause and Effect';
  public ucimeSoKomp = ['Sets', 'Who is hiding', 'Puzzle/Halves', 'Me and my home', 'Story'];
}
