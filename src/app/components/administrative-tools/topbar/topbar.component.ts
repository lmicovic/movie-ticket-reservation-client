
// import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Component } from '@angular/core';
import { faBars} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {

  bars = faBars;

  constructor() {
    
  }

}
