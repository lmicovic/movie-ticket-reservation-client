import { Component, Input, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { expandCollapse } from '../../../../other/animations/expandCollapse.animation';
import { TableDataDTO } from '../../../../other/models/editable-table/tableDataDTO.interface';

@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrl: './editable-table.component.css',
  animations: [
    expandCollapse
  ]
})
export class EditableTableComponent {

  @Input("expandable")
  expandable: boolean = false;

  @Input("pagination")
  pagination: boolean = false;

  @Input("paginationMaringTop")
  paginationMaringTop: string = "";

  @Input("tableMarginTop")
  tableMarginTop: string = "";

  @Input("tableTitle")
  tableTitle: string = "No Title";

  // @Input("headers")
  // headers: string[] = ["Header 1", "Header 2", "Header 3"];

  // @Input("tableData")
  // tableData: string[][] = [

  // ];
  
  @Input("tableData")
  tableData: TableDataDTO | undefined;

  arrowDownIcon: IconDefinition = faArrowDown;
  arrowUpIcon: IconDefinition = faArrowUp;

  constructor() {

  }

  ngOnInit(): void {
    
    this.expandableSettings();

  }

  //----------------------------------------------------------------------------------------------------
  // Expandable - Settings
  //----------------------------------------------------------------------------------------------------
  expandableSettings() {

    if(this.expandable === true) {
      this.expanded = false;
    }
    else if(this.expandable === false) {
      this.expanded = true;
    }

  }
  expanded: boolean = true;
  onExpand() {
    if(this.expandable === true) {
      this.expanded = !this.expanded;
    }
  }
  //----------------------------------------------------------------------------------------------------

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

}
