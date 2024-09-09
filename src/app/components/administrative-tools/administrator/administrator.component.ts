import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'administrator',
  templateUrl: './administrator.component.html',
  styleUrl: './administrator.component.css',
  animations: [

    trigger("sideBarToggleAdminPageAnimation", [

      state("reduce", style( { transform: "translateX(0)" } )),
      state("enlarge", style( { transform: "translateX(0)" })),

      transition("reduce => enlarge", [
        animate("300ms ease-out")
      ]),

      transition("enlarge => reduce", [
          animate("300ms ease-in")
      ])

    ])

  ]
})
export class AdministratorComponent {

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
