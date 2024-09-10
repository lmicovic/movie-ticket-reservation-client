import { Component, Input } from '@angular/core';
import { faUsersViewfinder } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-statistic-card',
  templateUrl: './statistic-card.component.html',
  styleUrl: './statistic-card.component.css'
})
//-------------------------------------------------
// Statistic Card - Reusable Component
//-------------------------------------------------
export class StatisticCardComponent {

  //-------------------------------------------------
  // GUI - variables
  //-------------------------------------------------
  @Input("tittle")
  tittle: string = "";

  @Input("value")
  value: string = "";
  
  @Input("lastWeekValue")
  lastWeekValue: string = "";

  @Input("lastWeekValueDesctription")
  lastWeekValueDesctription: string = "";

  @Input("icon")
  icon = faUsersViewfinder;
  @Input("iconColor")
  iconColor: string = "";
  @Input("iconBackgroundColor")
  iconBackgroundColor: string = "";
  //-------------------------------------------------
  
  constructor() {

  }

}
