import { Component } from '@angular/core';
import { mainContentAnimation } from '../../../other/animations/sidebar.animation';
import { expandCollapse } from '../../../other/animations/expandCollapse.animation';

@Component({
  selector: 'app-administrator-movies',
  templateUrl: './administrator-movies.component.html',
  styleUrl: './administrator-movies.component.css',
  animations: [
    mainContentAnimation,
    expandCollapse
  ]
})
export class AdministratorMoviesComponent {

  

  constructor() {

  }

  //----------------------------------------------------------------------------------------------------
  // Filter Panel
  //----------------------------------------------------------------------------------------------------
  isFilterPanelToggled: boolean = false;
  onFilter() {
    this.isFilterPanelToggled = !this.isFilterPanelToggled;
  }

  //----------------------------------------------------------------------------------------------------
  // Pagination
  //----------------------------------------------------------------------------------------------------
  first: number = 0;
  rows: number = 5;                       // Number of rows in one Page in Paggination
  onPaginationChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
  //----------------------------------------------------------------------------------------------------

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
