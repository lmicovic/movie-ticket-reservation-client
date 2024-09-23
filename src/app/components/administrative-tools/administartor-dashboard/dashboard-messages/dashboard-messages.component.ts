import { Component } from '@angular/core';
import { faMessage, IconDefinition } from '@fortawesome/free-solid-svg-icons';

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

  // Message Notification
  notificationIcon: IconDefinition = faMessage;
  unreadMessages: number = 3;
  //-----------------------------------------------------

  constructor() {

  }

  // Message Notification
  onMessageClick(event: any) {

    // Change BackgroundColor of unread Message row
    event.target.parentNode.style.backgroundColor = "inherit";

    console.log();
    

    if(event.target.parentNode.classList.contains("unread-message") && this.unreadMessages > 0) {
      this.unreadMessages--;
    }

  }
  //-----------------------------------------------------



  // Pagination
  onPaginationChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
  //-----------------------------------------------------

}
