import { Component } from '@angular/core';

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

@Component({
  selector: 'app-dashboard-messages',
  templateUrl: './dashboard-messages.component.html',
  styleUrl: './dashboard-messages.component.css'
})
export class DashboardMessagesComponent {

  first: number = 0;
  rows: number = 5;         // Number of rows in one Page in Paggination

  constructor() {

  }

  onPaginationChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

}
