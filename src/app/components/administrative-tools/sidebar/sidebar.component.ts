import { style } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { faHome, faVideo, faFilm, faBoxArchive, faTicket, faUsers, faGear } from '@fortawesome/free-solid-svg-icons'
import { sideBarAnimation } from '../../../other/animations/sidebar.animation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  animations: [
    sideBarAnimation
  ]
})
export class SidebarComponent implements AfterViewInit{


  @Input("onExpandSidePanel")
  onExpandSidePanel: Boolean = true;      // value transfered from topbar.component.ts that tells to open or close sidebar component.

  homeIcon = faHome;
  movieIcon = faVideo;
  projectionIcon = faFilm;
  reservationIcon = faTicket;
  roomIcon = faBoxArchive;
  usersIcon = faUsers;
  settingsIcon = faGear;

  //------------------------------
  // Get HTML Element Reference
  //------------------------------
  @ViewChild("dashboardItem")
  dashboardItem!: ElementRef;

  @ViewChild("moviesItem")
  moviesItem!: ElementRef;
  
  @ViewChild("projectionsItem")
  projectionsItem!: ElementRef;

  @ViewChild("reservationsItem")
  reservationsItem!: ElementRef;

  @ViewChild("roomsItem")
  roomsItem!: ElementRef;

  @ViewChild("usersItem")
  usersItem!: ElementRef;

  @ViewChild("settingsItem")
  settingsItem!: ElementRef;

  lastChangedItem!: ElementRef;
  //------------------------------

  constructor(private router: Router, private renderer: Renderer2) {
    
  }

  ngAfterViewInit(): void {
    
    this.router.events.subscribe((val) => {
      this.changeStyleOnCurrentURL(this.router.url);
    });

    
    
  }  

  //--------------------------------------------------
  // Changes Style of Selected Item in List
  //--------------------------------------------------
  


  private changeStyleOnCurrentURL(currentURL: string) {

    // Dashboard - Selected
    if(currentURL === "/admin/dashboard") {
      this.changeListItemStyle(this.dashboardItem);
      if(this.lastChangedItem === undefined) {
        this.lastChangedItem = this.dashboardItem;
        return;
      }
      if(this.lastChangedItem === this.dashboardItem) {
        return;
      }
      this.resetListImetStyle(this.lastChangedItem);
      this.lastChangedItem = this.dashboardItem;
    }

    // Movies - Selected
    else if(currentURL === "/admin/movies") {
      this.changeListItemStyle(this.moviesItem);
      if(this.lastChangedItem === undefined) {
        this.lastChangedItem = this.moviesItem;
        return;
      }
      if(this.lastChangedItem === this.moviesItem) {
        return;
      }
      this.resetListImetStyle(this.lastChangedItem);
      this.lastChangedItem = this.moviesItem;
    }

    // Projections - Selected
    else if(currentURL === "/admin/projections") {
      this.changeListItemStyle(this.projectionsItem);
      if(this.lastChangedItem === undefined) {
        this.lastChangedItem = this.projectionsItem;
        return;
      }
      if(this.lastChangedItem === this.projectionsItem) {
        return;
      }
      this.resetListImetStyle(this.lastChangedItem);
      this.lastChangedItem = this.projectionsItem;
    }

    // Reservations - Selected
    else if(currentURL === "/admin/reservations") {
      this.changeListItemStyle(this.reservationsItem);
      if(this.lastChangedItem === undefined) {
        this.lastChangedItem = this.reservationsItem;
        return;
      }
      if(this.lastChangedItem === this.reservationsItem) {
        return;
      }
      this.resetListImetStyle(this.lastChangedItem);
      this.lastChangedItem = this.reservationsItem;
    }

    // Rooms - Selected
    else if(currentURL === "/admin/rooms") {
      this.changeListItemStyle(this.roomsItem);
      if(this.lastChangedItem === undefined) {
        this.lastChangedItem = this.roomsItem;
        return;
      }
      if(this.lastChangedItem === this.roomsItem) {
        return;
      }
      this.resetListImetStyle(this.lastChangedItem);
      this.lastChangedItem = this.roomsItem;
    }

    // Users - Selected
    else if(currentURL === "/admin/users") {
      this.changeListItemStyle(this.usersItem);
      if(this.lastChangedItem === undefined) {
        this.lastChangedItem = this.usersItem;
        return;
      }
      if(this.lastChangedItem === this.usersItem) {
        return;
      }
      this.resetListImetStyle(this.lastChangedItem);
      this.lastChangedItem = this.usersItem;
    }

    // Settings - Selected
    else if(currentURL === "/admin/settings") {
      this.changeListItemStyle(this.settingsItem);
      if(this.lastChangedItem === undefined) {
        this.lastChangedItem = this.settingsItem;
        return;
      }
      if(this.lastChangedItem === this.settingsItem) {
        return;
      }
      this.resetListImetStyle(this.lastChangedItem);
      this.lastChangedItem = this.settingsItem;
    }

  }

  private changeListItemStyle(element: ElementRef) {
    element.nativeElement.style.color = "#703BE7";
  }

  private resetListImetStyle(element: ElementRef) {
    element.nativeElement.style.color = "black";
  }
  //--------------------------------------------------


}
