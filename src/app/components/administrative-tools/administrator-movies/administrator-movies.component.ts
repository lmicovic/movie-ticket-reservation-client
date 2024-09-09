import { Component } from '@angular/core';
import { mainContentAnimation } from '../../../other/animations/sidebar.animation';

@Component({
  selector: 'app-administrator-movies',
  templateUrl: './administrator-movies.component.html',
  styleUrl: './administrator-movies.component.css',
  animations: [
    mainContentAnimation
  ]
})
export class AdministratorMoviesComponent {

  constructor() {

  }

  //----------------------------------------------------------------------------------------------------
  // Used to transfer isSidePanelToggled data from topbar.components.ts to sidebar.component.ts
  //----------------------------------------------------------------------------------------------------
  isSidePanelToggled!: Boolean;
  onSidePanelToggled(value: Boolean) {
    this.isSidePanelToggled = value;
    return value;
  }
  //----------------------------------------------------------------------------------------------------

}
