import { Component } from '@angular/core';
import { fade } from '../../../other/animations/fade.animation';


@Component({
  selector: 'user-tools',
  templateUrl: './user-tools.component.html',
  styleUrl: './user-tools.component.css',
  animations: [
    fade
  ]
})
export class UserToolsComponent {

}
