import { Component } from '@angular/core';
import { mainContentAnimation } from '../../../other/animations/sidebar.animation';

@Component({
  selector: 'app-administrator-settings',
  templateUrl: './administrator-settings.component.html',
  styleUrl: './administrator-settings.component.css',
  animations: [
    mainContentAnimation
  ]
})
export class AdministratorSettingsComponent {

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
