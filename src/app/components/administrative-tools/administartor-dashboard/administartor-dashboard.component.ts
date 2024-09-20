import { Component } from '@angular/core';
import { faUsersViewfinder, faMoneyBill, faPerson, faVideo } from '@fortawesome/free-solid-svg-icons'
import { StatisticCardModel } from '../../../other/models/statistic-card-model/statistic-card-model.class';
import { StatisticCardModelDTO } from '../../../other/models/statistic-card-model/statistic-card-model.interface';



@Component({
  selector: 'app-administartor-dashboard',
  templateUrl: './administartor-dashboard.component.html',
  styleUrl: './administartor-dashboard.component.css'
})
export class AdministartorDashboardComponent {

  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Statistic Cards
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  viewsCardValues: StatisticCardModelDTO = new StatisticCardModel("Views", "152", "24", "since last week", faUsersViewfinder, "#3b82f6", "#d0e1fd");
  revenueCardValues: StatisticCardModelDTO = new StatisticCardModel("Revenue", "$2.150", "+$1.500", "since last week", faMoneyBill, "#f97316", "#feddc7");
  customersCardValues: StatisticCardModelDTO = new StatisticCardModel("Customers", "52", "20", "since last week", faPerson, "#06b6d4", "#c3edf5");
  moviesCardValues: StatisticCardModelDTO = new StatisticCardModel("Movies", "25", "3", "since last week", faVideo, "#a855f7", "#ead6fd");
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------

  constructor() {

  }
  
}
