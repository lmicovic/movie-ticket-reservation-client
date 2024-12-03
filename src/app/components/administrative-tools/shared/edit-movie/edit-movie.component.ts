import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { interval as observableInterval } from "rxjs";
import { takeWhile, scan, tap } from "rxjs/operators";
import { StatisticCardModelDTO } from "../../../../other/models/statistic-card-model/statistic-card-model.interface";
import { StatisticCardModel } from "../../../../other/models/statistic-card-model/statistic-card-model.class";
import { faMoneyBill, faStar, faTag, faUsersViewfinder, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { slideDown, slideRight } from "../../../../other/animations/slide.animation";
import { MovieDTO } from "../../../../other/models/movie/movieDTO.interface";
import { Movie } from "../../../../other/models/movie/movie.class";
import { MovieGenre, movieGenres, movieStatus, MovieStatus } from "../../../../other/enums";
import { ToastrService } from "ngx-toastr";


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

  constructor(public activatedRoute: ActivatedRoute, private router: Router, private toastr: ToastrService) {

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
  resetForm(form: any) {

    // MovieId
    (document.getElementById("movie-id") as any).value = structuredClone(this.movieOld.id);
    
    // Movie Title
    (document.getElementById("movie-title") as any).value = structuredClone(this.movieOld.title);
    
    // Rating
    this.movie.rating = this.movieOld.rating;

    // Year
    (document.getElementById("movie-year") as any).value = structuredClone(this.movieOld.year);

    // Country
    (document.getElementById("movie-country") as any).value = structuredClone(this.movieOld.country);

    // Genre
    (document.getElementById("movie-genre") as any).value = movieGenres[this.movieOld.genre];
    
    // Duration
    (document.getElementById("movie-duration") as any).value = this.movieOld.duration;

    // Status
    let active: boolean = this.movieOld.active;
    if(active === true) {
      (document.getElementById("movie-status") as any).value = movieStatus[MovieStatus.Active];
    }
    else if(active === false) {
      (document.getElementById("movie-status") as any).value = movieStatus[MovieStatus.Inactive];
    }

    // Description
    (document.getElementById("movie-description") as any).value = this.movieOld.description;
    
    // Image
    (document.getElementById("image-input") as any).value = "";
    
    // Authors
    this.movie.authors = structuredClone(this.movieOld.authors);
  
    // Actors
    this.movie.actors = structuredClone(this.movieOld.authors);
  
    // Trailer
    (document.getElementById("movie-trailer") as any).value = this.movieOld.trailerUrl;
    
    // Scroll to top of Form Component
    form.scrollIntoView();
    
  }
  //---------------------------------------------------------------------------------------
  
  //---------------------------------------------------------------------------------------
  // Update Movie
  //---------------------------------------------------------------------------------------
  formNotChanged: boolean = false;
  onUpdate() {

    //-------------------------------------------------------------------------
    // Extract values from HTML Form Objects
    //-------------------------------------------------------------------------
    let movieId: number = +(document.getElementById("movie-id") as any).value;
    let movieTitle: string = (document.getElementById("movie-title") as any).value;
    let movieGenre: MovieGenre = movieGenres.indexOf((document.getElementById("movie-genre") as any).value);
    let movieImage: string = (document.getElementById("image-input") as any).value === "" ? this.movieOld.image : (document.getElementById("image-input") as any).value;;
    let movieActive: boolean = movieStatus.indexOf((document.getElementById("movie-status") as any).value) === 0 ? true : false;
    let movieRating: number = this.movieOld.rating;
    let movieDescription: string = (document.getElementById("movie-description") as any).value;
    let movieAuthors: string[] = this.movie.authors;
    let movieActors: string[] = this.movie.actors;
    let movieYear: number = +(document.getElementById("movie-year") as any).value;
    let movieCountry: string = (document.getElementById("movie-country") as any).value;
    let movieDuration: number = +(document.getElementById("movie-duration") as any).value;
    let movieTrailer: string = (document.getElementById("movie-trailer") as any).value;
    //-------------------------------------------------------------------------

    let updateMovie: MovieDTO = new Movie(movieId, movieTitle, movieGenre, movieImage, movieActive, movieRating, movieDescription, movieAuthors, movieActors, movieYear, movieCountry, movieDuration, movieTrailer);

    //-------------------------------------------------------------------------
    // Check If Movie Information is changed - if not do not update Movie
    //-------------------------------------------------------------------------
    if(updateMovie.equal(this.movieOld) === true) {
      this.formNotChanged = true;
      this.toastr.warning("You have not changed any field in Update Movie Form.", "Update Movie:", {
        positionClass: "toast-top-left",
      });
      return;
    }
    this.formNotChanged = false;
    //---------------------------------------------

    //-------------------------------------------------------------------------
    // Update Movie Informations
    //-------------------------------------------------------------------------
    if(updateMovie.image !== this.movieOld.image) {
      // movieService.updateMovieImage();   // Updates Movie Image
    }
    // movieSErvice.updateMovie();      // updates all Movie informations except movie Image, to updat movie image it is requred to call separate function: movieService.updateMovieImage(image);
    
    // ...
    
    this.toastr.success("Movie informations has been updated. ", "Update Movie:", {
      positionClass: "toast-top-left",
    });
    
    //-------------------------------------------------------------------------
  }


  //---------------------------------------------------------------------------------------
  // Enable Editing Movie Informations
  //---------------------------------------------------------------------------------------
  editMovie: boolean = false;
  onEdit() {
    this.editMovie = !this.editMovie;
  }
  //---------------------------------------------------------------------------------------

  //---------------------------------------------------------------------------------------
  // Open Delete Modal
  //---------------------------------------------------------------------------------------
  openedModal: boolean = false;
  openModal() {
    this.openedModal = !this.openedModal;
    console.log(this.openedModal);

    // this.router.navigateByUrl(this.activatedRoute.snapshot.queryParamMap.get("returnUrl") as string);

  }
  //---------------------------------------------------------------------------------------

  openModalChanged(value: any) {
    this.openedModal = value;
  }
  
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
