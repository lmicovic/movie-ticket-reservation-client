import { Component, OnInit } from '@angular/core';
import { mainContentAnimation } from '../../../other/animations/sidebar.animation';
import { faCircleQuestion, faFilm, faUsersViewfinder, faVideo, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { StatisticCardModelDTO } from '../../../other/models/statistic-card-model/statistic-card-model.interface';
import { StatisticCardModel } from '../../../other/models/statistic-card-model/statistic-card-model.class';
import { expandCollapse } from '../../../other/animations/expandCollapse.animation';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-administrator-rooms',
  templateUrl: './administrator-rooms.component.html',
  styleUrl: './administrator-rooms.component.css',
  animations: [
    mainContentAnimation,
    expandCollapse
  ]
})
export class AdministratorRoomsComponent implements OnInit {

  //----------------------------------------------------------------------------------------------------
  // Icons
  //----------------------------------------------------------------------------------------------------
  questionIcon: IconDefinition = faCircleQuestion;
  //----------------------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------------------
  // Statistic Cards - Data
  //----------------------------------------------------------------------------------------------------
  totalRoomCardValues: StatisticCardModelDTO = new StatisticCardModel("Rooms", "5", "+1", "since last week", faVideo, "#a855f7", "#ead6fd");
  totalViewCardValues: StatisticCardModelDTO = new StatisticCardModel("Views", "25252", "+523", "since last week", faUsersViewfinder, "#3b82f6", "#d0e1fd");
  //----------------------------------------------------------------------------------------------------

  constructor() {

  }

  ngOnInit(): void {
    
    this.initGraph();

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
  // Room Graph
  //----------------------------------------------------------------------------------------------------
  chartData: any;
  chartOptions: any;

  private initGraph() {

    this.chartData = {
      labels: ["Room 1", "Room 2", "Room 3" ,"Room 4"],
      datasets: [
        {
          label: "Views",
          data: [252, 224, 153, 114],
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins: {
          legend: {
              labels: {
                  color: "gray"
              }
          }
      },
      scales: {
          y: {
              beginAtZero: true,
              ticks: {
                  color: "gray"
              },
              grid: {
                  color: "#e2e8f0",
                  // display: false,
              }
          },
          x: {
              ticks: {
                  color: "gray"
              },
              grid: {
                  color: "#e2e8f0",
                  // display: false,
              }
          }
      }
    };

  }
  //----------------------------------------------------------------------------------------------------


  //----------------------------------------------------------------------------------------------------
  // Filter Rooms
  //----------------------------------------------------------------------------------------------------
  
  fitlerRoomForm: FormGroup = new FormGroup({
    roomName: new FormControl(),
    seatsRow: new FormControl(),
    seatsColumn: new FormControl()
  });

  isFilterPanelToggled: boolean = false;
  onFilter() {
    this.isFilterPanelToggled = !this.isFilterPanelToggled;
  }
  
  resetFilterMovieForm() {
    this.fitlerRoomForm.reset();
  }
  //----------------------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------------------
  // Pagination
  //----------------------------------------------------------------------------------------------------
  first: number = 0;
  rows: number = 5;                       // Number of rows in one Page in Paggination
  onPaginationChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
  //----------------------------------------------------------------------------------------------------
}
