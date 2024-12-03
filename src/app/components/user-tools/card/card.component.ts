import { Component, Input } from '@angular/core';
import { CardType } from '../../../other/enums';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input("cardTitle")
  cardTitle: string = "";
  
  @Input("cardType")
  cardType: CardType = CardType.Basic;

  constructor() {
    
  }

}
