import { style } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { faHome, faVideo, faFilm, faBoxArchive, faTicket, faUsers } from '@fortawesome/free-solid-svg-icons'
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

  //------------------------------
  // Get HTML Element Reference
  //------------------------------
  @ViewChild("dashboardItem")
  dashboardItem!: ElementRef;

  //------------------------------

  constructor(private router: Router, private renderer: Renderer2) {
    
  }

  ngAfterViewInit(): void {
    
    this.changeStyleOnCurrentURL(this.router.url);
    
  }  

  //--------------------------------------------------
  // Changes Style of Selected Item in List
  //--------------------------------------------------
  private changeStyleOnCurrentURL(currentURL: string) {

    if(currentURL === "/admin") {
      this.changeListItemStyle(this.dashboardItem);
    }

  }

  private changeListItemStyle(element: ElementRef) {
    element.nativeElement.style.color = "#703BE7";
  }
  //--------------------------------------------------


}
