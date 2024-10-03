import { StatisticCardModel } from './../../../other/models/statistic-card-model/statistic-card-model.class';
import { StatisticCardModelDTO } from './../../../other/models/statistic-card-model/statistic-card-model.interface';
import { Component, numberAttribute, OnInit, ViewChild } from '@angular/core';
import { mainContentAnimation } from '../../../other/animations/sidebar.animation';
import { expandCollapse } from '../../../other/animations/expandCollapse.animation';
import { faArrowDown, faCircleQuestion, faClapperboard, faVideo, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrator-movies',
  templateUrl: './administrator-movies.component.html',
  styleUrl: './administrator-movies.component.css',
  animations: [
    mainContentAnimation,
    expandCollapse
  ]
})
export class AdministratorMoviesComponent implements OnInit{
  
  //----------------------------------------------------------------------------------------------------------------
  // Movie Statistic Cards
  //----------------------------------------------------------------------------------------------------------------
  newMoviesCardValues: StatisticCardModelDTO = new StatisticCardModel("New Movies", "3", "+1", "since last week", faVideo, "#06b6d4", "#c3edf5");
  totalMoviesCardValues: StatisticCardModelDTO = new StatisticCardModel("Total Movies", "252", "+3", "since last week", faClapperboard, "#a855f7", "#ead6fd");
  arrowDownIcon: IconDefinition = faArrowDown;
  questionIcon: IconDefinition = faCircleQuestion;
  //----------------------------------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------------------------------
  // Create New Movie - Form
  //----------------------------------------------------------------------------------------------------------------
  createMovieform: FormGroup = new FormGroup({
    
    movieTitle: new FormControl("", Validators.required),
    movieGenre: new FormControl("", Validators.required),
    movieDuration: new FormControl("", Validators.required),
    movieStatus: new FormControl("", Validators.required),
    movieImage: new FormControl(""),

  });
  //----------------------------------------------------------------------------------------------------------------


  //----------------------------------------------------------------------------------------------------------------
  // Filter Movie - Form
  //----------------------------------------------------------------------------------------------------------------
  filterMovieForm: FormGroup = new FormGroup({

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


  //----------------------------------------------------------------------------------------------------------------  
  // Chart Data
  //----------------------------------------------------------------------------------------------------------------
  chartData: any;
  chartOptions: any;
  //----------------------------------------------------------------------------------------------------------------

  constructor(public router: Router) {
    
  }

  ngOnInit(): void {
    this.initGraph();
  }

  //----------------------------------------------------------------------------------------------------
  // Create New Movie - Submit
  //----------------------------------------------------------------------------------------------------
  invalidForm: boolean = false;
  invalidMovieImage: boolean = false;
  submitNewMovie() {

    //---------------------------------------------
    // Input Check - Validations
    //---------------------------------------------
    if(this.createMovieform.invalid === true) {
      this.invalidForm = true;
      this.invalidMovieImage = false;
      return;
    }

    if(this.createMovieform.value.movieImage === "") {
      this.invalidMovieImage = true;
      this.invalidForm = false;
      return;
    }

    this.invalidForm = false;
    this.invalidMovieImage = false;
    //---------------------------------------------

    // Submit...

  }
  //----------------------------------------------------------------------------------------------------


  //----------------------------------------------------------------------------------------------------
  // Reset Create New Movie - Input Form
  //----------------------------------------------------------------------------------------------------
  resetCreateNewMovieForm() {

    this.createMovieform.reset();
    this.invalidForm = false;
    (document.getElementById("movie-genre-create") as any).value = "";
    (document.getElementById("movie-status-create") as any).value = "";
        
  }
  //----------------------------------------------------------------------------------------------------
  


  //----------------------------------------------------------------------------------------------------
  // Initialize - Best Movies Chart Informations
  //----------------------------------------------------------------------------------------------------
  private initGraph() {

    // let lastNMonths: string[] = Util.getLastNMonths(new Date(), 6).reverse();

    this.chartData = {
      labels: ["Movie 1", "Movie 2", "Movie 3" ,"Movie 4"],
      datasets: [
        {
          label: "Views",
          data: [1250, 1150, 525, 432],
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
  // Filter Panel
  //----------------------------------------------------------------------------------------------------
  isFilterPanelToggled: boolean = false;
  onFilter() {
    this.isFilterPanelToggled = !this.isFilterPanelToggled;
  }

  //----------------------------------------------------------------------------------------------------
  // Reset Create New Movie - Input Form
  //----------------------------------------------------------------------------------------------------
  resetFilterMovieForm() {

    this.filterMovieForm.reset();
    
    (document.getElementById("movie-genre") as any).value = "any";
    (document.getElementById("movie-status") as any).value = "all";
        
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

  //----------------------------------------------------------------------------------------------------
  // Used to transfer isSidePanelToggled data from topbar.components.ts to sidebar.component.ts
  //----------------------------------------------------------------------------------------------------
  isSidePanelToggled!: Boolean;
  onSidePanelToggled(value: Boolean) {
    this.isSidePanelToggled = value;
    return value;
  }
  //----------------------------------------------------------------------------------------------------

}

