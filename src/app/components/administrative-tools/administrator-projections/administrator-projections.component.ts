import { Component, OnInit } from '@angular/core';
import { mainContentAnimation } from '../../../other/animations/sidebar.animation';
import { faArrowDown, faCircleQuestion, faFilm, faVideo, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidators } from '../../../validators/password.validators';
import { PriceValidators } from '../../../validators/price.validators';
import { StatisticCardModelDTO } from '../../../other/models/statistic-card-model/statistic-card-model.interface';
import { StatisticCardModel } from '../../../other/models/statistic-card-model/statistic-card-model.class';
import { expandCollapse } from '../../../other/animations/expandCollapse.animation';

@Component({
  selector: 'app-administrator-projections',
  templateUrl: './administrator-projections.component.html',
  styleUrl: './administrator-projections.component.css',
  animations: [
    mainContentAnimation,
    expandCollapse
  ]
})
export class AdministratorProjectionsComponent implements OnInit {

  //-------------------------------------------------------------------
  // Statistic Card Data
  //-------------------------------------------------------------------
  totalProjectionsCardValues: StatisticCardModelDTO = new StatisticCardModel("New Projections", "2", "+1", "since last week", faFilm, "#f97316", "#feddc7");
  newProjectionsCardValues: StatisticCardModelDTO = new StatisticCardModel("Total Projections", "125", "+3", "since last week", faVideo, "#a855f7", "#ead6fd");
  //-------------------------------------------------------------------

  //-------------------------------------------------------------------
  // Icons
  //-------------------------------------------------------------------
  arrowDownIcon: IconDefinition = faArrowDown;
  questionIcon: IconDefinition = faCircleQuestion;
  //-------------------------------------------------------------------

  //----------------------------------------------------------------------------------------------------------------  
  // Chart Data
  //----------------------------------------------------------------------------------------------------------------
  chartData: any;
  chartOptions: any;
  //----------------------------------------------------------------------------------------------------------------

  //-------------------------------------------------------------------
  // New Projection Form
  //-------------------------------------------------------------------
  createProjectionform: FormGroup = new FormGroup({

    projectionMovie: new FormControl("", Validators.required),
    projectionRoom: new FormControl("", Validators.required),
    projectionPrice: new FormControl("", Validators.required), 
    projectionDate: new FormControl("", Validators.required),
    projectionTime: new FormControl("", Validators.required)

  });
  //-------------------------------------------------------------------

  constructor() {

  }

  ngOnInit(): void {
    
    this.initGraph();

  }

  //----------------------------------------------------------------------------------------------------
  // Initialize - Best Projections Chart Informations
  //----------------------------------------------------------------------------------------------------
  private initGraph() {

    // let lastNMonths: string[] = Util.getLastNMonths(new Date(), 6).reverse();

    this.chartData = {
      labels: ["Projection 1", "Projection 2", "Projection 3" ,"Projection 4"],
      datasets: [
        {
          label: "Views",
          data: [252, 224, 153, 114],
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    }

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
  // Initialize - Best Projections Chart Informations - END
  //----------------------------------------------------------------------------------------------------


  //----------------------------------------------------------------------------------------------------
  // Used to transfer isSidePanelToggled data from topbar.components.ts to sidebar.component.ts
  //----------------------------------------------------------------------------------------------------
  isSidePanelToggled!: Boolean;
  onSidePanelToggled(value: Boolean) {
    this.isSidePanelToggled = value;
    return value;
  }
  //----------------------------------------------------------------------------------------------------

  invalidNewProjectionForm: boolean = false;
  submitNewProjection() {

    if(this.createProjectionform.invalid === true) {
      this.invalidNewProjectionForm = true;
      return;
    }

    this.invalidNewProjectionForm = false;

    //...

  }

  resetCreateNewProjectForm() {

    this.createProjectionform.reset();
    this.invalidNewProjectionForm = false;
    (document.getElementById("select-movie") as HTMLInputElement).value = "";
    (document.getElementById("select-room") as HTMLInputElement).value = "";


  }

  //----------------------------------------------------------------------------------------------------
  // Projection Table Panel
  //----------------------------------------------------------------------------------------------------
  
  //----------------------------------------------------------------------------------------------------------------
  // Filter Movie - Form
  //----------------------------------------------------------------------------------------------------------------
  filterProjectForm: FormGroup = new FormGroup({

    movieTitle: new FormControl(""),
    movieGenre: new FormControl("any"),
    movieDuration: new FormControl(""),
    movieDateAdded: new FormControl(""),
    movieStatus: new FormControl("all"),
    movieReservationsFrom: new FormControl(""),
    movieReservationsTo: new FormControl(""),
    movieTicketsFrom: new FormControl(""),
    movieTicketsTo: new FormControl(""),
    movieProfitFrom: new FormControl(""),
    movieProfitTo: new FormControl(""),

  });
  //----------------------------------------------------------------------------------------------------------------
  
  
  isFilterPanelToggled: boolean = false;
  onFilter() {
    this.isFilterPanelToggled = !this.isFilterPanelToggled;
  }

  resetFilterProjectionForm() {

    this.filterProjectForm.reset();
    
    (document.getElementById("movie-genre") as any).value = "any";
    (document.getElementById("movie-status") as any).value = "all";
        
  }

  first: number = 0;
  rows: number = 5;                       // Number of rows in one Page in Paggination
  onPaginationChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  //----------------------------------------------------------------------------------------------------
  // Projection Table Panel - END
  //----------------------------------------------------------------------------------------------------

}
