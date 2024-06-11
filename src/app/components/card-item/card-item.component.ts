import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'card-item',
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css'
})
export class CardItemComponent {

  @Input("cardTitle")
  title: string = "";               // HTML: <h3>Title</h3> - in Card Component

  @Input("titleSize")
  titleSize: string = '20px';       // CSS: font-size: 20px

  @Input("boldTitle")
  boldTitle: number = 500;          // CSS: font-weight: 500
  
  @Input("borderRadius")
  borderRadius: number = 16;        // CSS: border-radius: 16px

  @Input("borderRadiusTopRight")
  borderRadiusTopRight: number = 16;        // CSS: border-radius-top-right
  
  @Input("borderRadiusTopLeft")
  borderRadiusTopLeft: number = 16;         // CSS: border-radius-top-left

  @Input("borderRadiusBottomRight")
  borderRadiusBottomRight: number = 16;     // CSS: border-radius-bottom-right

  @Input("borderRadiusBottomLeft")
  borderRadiusBottomLeft: number = 16;      // CSS: border-radius-bottom-left

  @Input("marginTop")
  marginTop: string = "0px";

  @Input("marginBottom")
  marginBottom: string = "0px";

  constructor(private ref: ElementRef, private renderer: Renderer2) {

  }


}
