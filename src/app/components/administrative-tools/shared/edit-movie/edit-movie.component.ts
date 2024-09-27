import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatisticCardModelDTO } from '../../../../other/models/statistic-card-model/statistic-card-model.interface';
import { StatisticCardModel } from '../../../../other/models/statistic-card-model/statistic-card-model.class';
import { faMoneyBill, faStar, faTag, faUsersViewfinder, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { slideDown, slideRight } from '../../../../other/animations/slide.animation';
import { FormControl, FormGroup } from '@angular/forms';
import { MovieDTO } from '../../../../other/models/movie/movieDTO.interface';
import { Movie } from '../../../../other/models/movie/movie.class';
import { MovieGenre, movieGenres, movieStatus, MovieStatus } from '../../../../other/enums';


@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.css',
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
  movieForm: FormGroup = new FormGroup({

    movieId: new FormControl(this.movieId),
    movieTitle: new FormControl(),
    movieRating: new FormControl(),
    movieGenre: new FormControl(),
    movieDuration: new FormControl(),
    movieStatus: new FormControl(),
    movieDescription: new FormControl(),
    movieImage: new FormControl(),

  });
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------

  constructor(private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.movieOld = this.movie;

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
