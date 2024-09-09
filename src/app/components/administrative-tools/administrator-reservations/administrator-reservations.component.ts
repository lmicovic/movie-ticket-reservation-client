import { Component } from '@angular/core';
import { mainContentAnimation } from '../../../other/animations/sidebar.animation';

@Component({
  selector: 'app-administrator-reservations',
  templateUrl: './administrator-reservations.component.html',
  styleUrl: './administrator-reservations.component.css',
  animations: [
    mainContentAnimation
  ]
})
export class AdministratorReservationsComponent {

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
