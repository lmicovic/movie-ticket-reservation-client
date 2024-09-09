import { Component } from '@angular/core';
import { mainContentAnimation } from '../../../other/animations/sidebar.animation';

@Component({
  selector: 'app-administrator-users',
  templateUrl: './administrator-users.component.html',
  styleUrl: './administrator-users.component.css',
  animations: [
    mainContentAnimation
  ]
})
export class AdministratorUsersComponent {

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
