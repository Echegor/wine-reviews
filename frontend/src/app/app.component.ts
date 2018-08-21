import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None, //disable shadow dom. Allows self styling.
})
export class AppComponent {
  title = 'Wine Reviews';
}
