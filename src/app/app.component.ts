import { Component } from '@angular/core';
import { fade } from './other/animations/fade.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    fade
  ]
})
export class AppComponent {
  title = 'project';

  

}
