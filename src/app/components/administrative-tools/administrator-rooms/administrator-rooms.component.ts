import { Component } from '@angular/core';
import { mainContentAnimation } from '../../../other/animations/sidebar.animation';

@Component({
  selector: 'app-administrator-rooms',
  templateUrl: './administrator-rooms.component.html',
  styleUrl: './administrator-rooms.component.css',
  animations: [
    mainContentAnimation
  ]
})
export class AdministratorRoomsComponent {

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
