import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { StatisticCardModelDTO } from "../../../../other/models/statistic-card-model/statistic-card-model.interface";
import { StatisticCardModel } from "../../../../other/models/statistic-card-model/statistic-card-model.class";
import { faMoneyBill, faStar, faTag, faUsersViewfinder, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { slideDown, slideRight } from "../../../../other/animations/slide.animation";
import { FormControl, FormGroup } from "@angular/forms";
import { MovieDTO } from "../../../../other/models/movie/movieDTO.interface";
import { Movie } from "../../../../other/models/movie/movie.class";
import { MovieGenre, movieGenres, movieStatus, MovieStatus } from "../../../../other/enums";


@Component({
  selector: "app-edit-movie",
  templateUrl: "./edit-movie.component.html",
  styleUrl: "./edit-movie.component.css",
  animations: [
    slideDown, slideRight
  ]
})
export class EditMovieComponent implements OnInit{


  movie: MovieDTO = new Movie(1, "Movie 1", MovieGenre.Comedy, "../../../../../assets/images/image-placeholder-1.jpg", true, 3.7, "Morbi bibendum fermentum libero in porta. Donec velit arcu, mollis a vehicula eu, suscipit accumsan purus. Etiam ac metus egestas turpis porta pellentesque. Quisque volutpat ornare leo, sed cursus ex sollicitudin vitae. Aenean imperdiet ipsum justo, sit amet viverra nisi venenatis nec. Ut venenatis lorem in neque egestas lobortis. Praesent tempus sagittis augue vel tempus. In lorem arcu, pharetra id sem non, auctor rhoncus nunc. Ut ut arcu dignissim, rhoncus neque vel, consequat mi. Aenean ipsum risus, eleifend eu est a, porttitor vestibulum arcu. Aliquam porttitor eget tellus at pharetra. Vestibulum efficitur eros at felis imperdiet vestibulum.", ["Pera Peric", "Ana Anic", "Mika Anic"], ["Pera Peric", "Ana Anic", "Mika Anic"], 2024, "USA", 123, "");
  movieOld!: MovieDTO;

  newMovieImage: String = "";
  genres: string[] = movieGenres;
  

  private movieId!: number;
  selectedMovie!: MovieDTO;

  starIcon: IconDefinition = faStar;

  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Statistic Cards
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  profitCardValues: StatisticCardModelDTO = new StatisticCardModel("Profit", "$2.150", "+$1.500", "since last week", faMoneyBill, "#f97316", "#feddc7");
  viewsCardValues: StatisticCardModelDTO = new StatisticCardModel("Views", "152", "+24", "since last week", faUsersViewfinder, "#3b82f6", "#d0e1fd");
  reservationsCardValues: StatisticCardModelDTO = new StatisticCardModel("Reservations", "256", "+10", "since last week", faTag, "#a855f7", "#ead6fd");
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Update Movie Form
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // movieForm: FormGroup = new FormGroup({

  //   movieId: new FormControl(this.movie.id),
  //   movieTitle: new FormControl(this.movie.title),
  //   movieImage: new FormControl(this.movie.image),
  //   movieRating: new FormControl(this.movie.rating),
  //   movieStatus: new FormControl(this.movie.active),
  //   movieYear: new FormControl(this.movie.year),
  //   movieCountry: new FormControl(this.movie.country),
  //   movieGenre: new FormControl(this.movie.genre),
  //   movieDuration: new FormControl(this.movie.duration),
  //   movieAuthors: new FormControl(this.movie.authors),
  //   movieActors: new FormControl(this.movie.actors),
  //   movieDescription: new FormControl(this.movie.description),
  //   movieTrailer: new FormControl(this.movie.trailerUrl),
    
  // });
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------


  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Movie Projections Table - Data
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  movieProjectionTableHeaders: string[] = ["Id", "Movie", "Room", "Date", "Price"];
  movieProjectionTableData: string[][] = [

    ["1", "Movie 1", "Room 1", "24.5.2024", "$5"],
    ["2", "Movie 2", "Room 2", "24.5.2024", "$7"],
    ["3", "Movie 3", "Room 3", "24.5.2024", "$8"],
    ["4", "Movie 4", "Room 4", "24.5.2024", "$9"],
    ["5", "Movie 5", "Room 5", "24.5.2024", "$7"],
    ["6", "Movie 6", "Room 6", "24.5.2024", "$5"]

  ];
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------

  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Movie Projections Table - Data
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------
  movieReservationsHeaders: string[] = ["Id", "User", "Tickets", "Reserved Seats", "Date", "Price"];
  movieReservationTableData: string[][] = [

    ["1", "Pera Peric", "4", "9, 10, 11, 12", "24.5.2024", "$45"],
    ["2", "Pera Peric", "4", "9, 10, 11, 12", "24.5.2024", "$45"],
    ["3", "Pera Peric", "4", "9, 10, 11, 12", "24.5.2024", "$45"],
    ["4", "Pera Peric", "4", "9, 10, 11, 12", "24.5.2024", "$45"],
    ["5", "Pera Peric", "4", "9, 10, 11, 12", "24.5.2024", "$45"],
    ["6", "Pera Peric", "4", "9, 10, 11, 12", "24.5.2024", "$45"],

  ];
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------

  constructor(private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.movieOld = structuredClone(this.movie);

    // Get MovieId from URL Variable Parameter
    this.movieId = +(this.activatedRoute.snapshot.paramMap.get("movieId") as String);

  }
  

  //---------------------------------------------------------------------------------------
  // Changed Movie Authors - In Chips Form Compononent
  //---------------------------------------------------------------------------------------
  updatedAuthors(authors: string[]) {

    this.movie.authors = authors;
    // console.log(this.movie.authors);

  }
  //---------------------------------------------------------------------------------------

  //---------------------------------------------------------------------------------------
  // Changed Movie Actors - In Chips Form Compononent
  //---------------------------------------------------------------------------------------
  updatedActors(actors: string[]) {
    this.movie.actors = actors;
  }
  //---------------------------------------------------------------------------------------


  //---------------------------------------------------------------------------------------
  // File Input - Image Change
  //---------------------------------------------------------------------------------------
  onImageChange(event: any) {
    let newImageLocation: string = event.target.value;
    this.newMovieImage = newImageLocation;
  }
  //---------------------------------------------------------------------------------------


  //---------------------------------------------------------------------------------------
  // Reset Form - reset form to values before changing values
  //---------------------------------------------------------------------------------------
  resetForm() {

   
    
  }
  //---------------------------------------------------------------------------------------
  
  //---------------------------------------------------------------------------------------
  // Update Movie
  //---------------------------------------------------------------------------------------
  formNotChanged: boolean = false;
  onUpdate() {
    
    // // If Movie Update Form is not changed, no need to update Movie
    // if(this.movie.equal(this.movieOld)) {
    //   this.formNotChanged = true;
    //   return;
    // }

    this.formNotChanged = false;

    this.extractFormValues();
    
  }

  private extractFormValues() {
    

  }

  //---------------------------------------------------------------------------------------
  
  // Getter for MovieGenre Enum
  public get movieGenreEnum(): typeof MovieGenre {
    return MovieGenre;
  }

  // Movie Status Enum Getter
  public get movieStatusEnum(): typeof MovieStatus {
    return MovieStatus;
  }

  // Movie Status List Getter
  public get movieStatusList() {
    return movieStatus;
  }

  // Get Movie Rating - round rating to lower whole number
  public get getMovieRating() {
    let rating = Math.floor(this.movie.rating);         // lovers decimal number to lower whole number - 3.7 to 3.0
    return rating;
  }


}
