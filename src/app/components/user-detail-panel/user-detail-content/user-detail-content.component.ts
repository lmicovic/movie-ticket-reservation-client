
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { User } from '../../../other/models/user/user.class';
import { UserDTO } from '../../../other/models/user/userDTO.interface';
import { expandCollapse } from '../../../other/animations/expandCollapse.animation';
import { fade } from '../../../other/animations/fade.animation';

@Component({
  selector: 'user-detail-content',
  templateUrl: './user-detail-content.component.html',
  styleUrl: './user-detail-content.component.css',
  animations: [

    expandCollapse

  ]
  
})
export class UserDetailContentComponent implements OnInit, OnChanges {

  @Input("user")
  user: User | UserDTO | undefined = undefined;

  @Input("title")
  title: string = "";

  openContent: boolean = false;
  
  

  //-------------------------------------------------------
  // Style
  //-------------------------------------------------------
  
  @Input("lastPanelItem")
  lastPanelItem: boolean = false;
  //-------------------------------------------------------
  // Borders
  //-------------------------------------------------------
  @Input("borderTopLeft")
  borderTopLeft: string = "0px";

  @Input("borderTopRight")
  borderTopRight: string = "0px";

  @Input("borderBottomLeft")
  borderBottomLeft: string = "0px";

  @Input("borderBottomRight")
  borderBottomRight: string = "0px";
  //-------------------------------------------------------
  
  

  //-------------------------------------------------------


  constructor() {

  }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    if(this.user !== undefined) {
      // console.log(this.user);
    }

  }

  extendPanel(): void {

    // console.log("asdads");
    

    this.openContent = !this.openContent;
    // this.extendedPanel.emit(this.openContent);

  }

}
