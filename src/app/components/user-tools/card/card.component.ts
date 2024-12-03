import { Component, Input } from '@angular/core';
import { CardType } from '../../../other/enums';
import { transition, trigger, useAnimation } from '@angular/animations';
import { slideRightAnimation } from '../../../other/animations/slide.animation';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  animations: [ 

    trigger("slideRight", [

      transition(":enter", [
        useAnimation(slideRightAnimation)
      ], {
        params: {
          duration: "0.5s",
          delay: "0s",
          easing: "ease-out"
        }
      })

    ])

  ]
})
export class CardComponent {

  @Input("cardTitle")
  cardTitle: string = "";
  
  @Input("cardType")
  cardType: CardType = CardType.Basic;

  constructor() {
    
  }

}
