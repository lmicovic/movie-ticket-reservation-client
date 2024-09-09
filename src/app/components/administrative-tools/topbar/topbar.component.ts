
// import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Component, EventEmitter, Output } from '@angular/core';
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

  //----------------------------------------------------------------------------------------------------
  // Used to transfer isSidePanelToggled data from topbar.components.ts to sidebar.component.ts
  //----------------------------------------------------------------------------------------------------
  @Output("sidePanelToggleEvent")
  sidePanelToggleEvent: EventEmitter<Boolean> = new EventEmitter();
  isSidePanelToggled: Boolean = true;
  
  onSidePanelToggle() {

    this.isSidePanelToggled = !this.isSidePanelToggled;
    this.sidePanelToggleEvent.emit(this.isSidePanelToggled);

  }
  //----------------------------------------------------------------------------------------------------


}
