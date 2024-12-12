import { faArrowDown, faArrowUp, faCircleQuestion, faMoneyBill, faPerson, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { mainContentAnimation } from '../../../other/animations/sidebar.animation';
import { Util } from '../../../other/util.class';
import { expandCollapse } from '../../../other/animations/expandCollapse.animation';
import { StatisticCardModelDTO } from '../../../other/models/statistic-card-model/statistic-card-model.interface';
import { StatisticCardModel } from '../../../other/models/statistic-card-model/statistic-card-model.class';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-administrator-reservations',
  templateUrl: './administrator-reservations.component.html',
  styleUrl: './administrator-reservations.component.css',
  animations: [
    mainContentAnimation,
    expandCollapse
  ]
})
export class AdministratorReservationsComponent implements OnInit {

  // ------------------------------------------------------------------------------
  // Icons
  // ------------------------------------------------------------------------------
  arrowDownIcon: IconDefinition = faArrowDown;
  arrowUpIcon: IconDefinition = faArrowUp;
  questionIcon: IconDefinition = faCircleQuestion;
  // ------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------
  // Statistic Card Data
  // ------------------------------------------------------------------------------
  totalReservationsCardValue: StatisticCardModelDTO = new StatisticCardModel("Total Reservations", "10250", "+232", "since last week", faMoneyBill, "#f97316", "#feddc7");
  totalViewsCardValue: StatisticCardModelDTO = new StatisticCardModel("Total Views", "35250", "+2500", "since last week", faPerson, "#06b6d4", "#c3edf5");
  // ------------------------------------------------------------------------------

  constructor() {

  }

  ngOnInit(): void {
    this.initReservationsGraph();
  }
  
  //----------------------------------------------------------------------------------------------------
  // Used to transfer isSidePanelToggled data from topbar.components.ts to sidebar.component.ts
  //----------------------------------------------------------------------------------------------------
  isSidePanelToggled!: Boolean;
  onSidePanelToggled(value: Boolean) {
    this.isSidePanelToggled = value;
    return value;
  }
  //----------------------------------------------------------------------------------------------------


  //----------------------------------------------------------------------------------------------------
  // Reservation Statistic Graph
  //----------------------------------------------------------------------------------------------------
  chartData: any;
  chartOptions: any;
  
  private initReservationsGraph() {

    // Get Last N month name
    let lastNMonthsName: string[] = Util.getLastNMonths(new Date(), 6).reverse();

    // Init Graph Data
    this.chartData = {
      labels: lastNMonthsName,
      datasets: [
          {
              label: 'Reservations',
              data: [1250, 2350, 2525, 2253, 2045, 2500],
              fill: false,
              borderColor: "#fc8c41",
              tension: 0.4
          }
      ]
    };

    // Init Graph Options
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins: {
          legend: {
              labels: {
                  color: "black"
              }
          }
      },
      scales: {
          x: {
              // beginAtZero: true,
              ticks: {
                  color: "black"
              },
              grid: {
                  color: "#e2e8f0",
                  drawBorder: true
              }
          },
          y: {
              // beginAtZero: true,
              ticks: {
                  color: "black"
              },
              grid: {
                  color: "#e2e8f0",
                  drawBorder: true
              }
          }
      }
    };

  }
  //----------------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------
  // Expand - Collapse
  // ------------------------------------------------------------------------------
  isRecentReservationToggled: boolean = false;

  toggleRecentReservation() {
    this.isRecentReservationToggled = !this.isRecentReservationToggled;
  }
  // ------------------------------------------------------------------------------


  // ------------------------------------------------------------------------------
  // Paggination
  // ------------------------------------------------------------------------------
  first: number = 0;
  rows: number = 5;                       // Number of rows in one Page in Paggination
  onPaginationChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
  // ------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------
  // Reservations Filter Panel
  // ------------------------------------------------------------------------------
  
  reservationFilterForm: FormGroup = new FormGroup({
    firstname: new FormControl(),
    lastname: new FormControl(),
    movie: new FormControl(),
    room: new FormControl(),
    time: new FormControl(),
    date: new FormControl(),
    tickets: new FormControl(),                 // number of tickets for Reservation
    reservedSeats: new FormControl(),
    reservationDate: new FormControl(),
    price: new FormControl(),
  });

  isFilterPanelToggled: boolean = false;
  onFilter() {
    this.isFilterPanelToggled = !this.isFilterPanelToggled;
  }

  resetReservationForm() {
    this.reservationFilterForm.reset();
  }

  
  submitReservationFilter() {
    
    // ...
    console.log("test");
    

  }

  // ------------------------------------------------------------------------------
  // Reservations Filter Panel - END
  // ------------------------------------------------------------------------------

}
