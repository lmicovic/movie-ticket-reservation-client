import { Component, OnInit } from '@angular/core';
import { Movie } from '../../../other/models/movie/movie.class';
import { MovieService } from '../../../services/movie/movie.service';
import { combineLatest, switchMap } from 'rxjs';
import { MovieGenre } from '../../../other/enums';
import { MovieDTO } from '../../../other/models/movie/movieDTO.interface';
import { fade, fadeIn } from '../../../other/animations/fade.animation';
import { transition, trigger, useAnimation } from '@angular/animations';
import { slideRightAnimation } from '../../../other/animations/slide.animation';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  movies: MovieDTO[] = [];                // All Loaded Movies - from Server
  recommendedMovie: MovieDTO = new Movie(-1, "", MovieGenre.Action, "", true, -1, "", [], [], -1, "", -1, "");

  constructor(private movieService: MovieService) {
    
  }

  ngOnInit(): void {
    
    this.loadMovies();
    this.loadRecommendedMovie();

  }

  // Load All Movies from Server
  private loadMovies(): void {
    
    // Get All Movies
    this.movieService.getAll().subscribe((response: MovieDTO[]) => {

      this.movies = response;
      
      // Load All Movies Images from Server
      for(let i = 0; i < this.movies.length; i++) {

        this.movieService.getMovieImage((this.movies[i].id as number)).subscribe((response) => {
          
          let image = URL.createObjectURL(response);
          if(image === undefined || image === null || image === "") {
            console.error("Image for Movie: " + this.movies[i] + " is not defined.");
          }

          this.movies[i].image = image;                    // Add Movie Image to Movie

        });
      }
    });

  }



  // Loads Recommended Movie for Logged User, based on his preferrence
  private loadRecommendedMovie(): void {

    //-------------------------------------------------------------------------------------
    // Load Recomended Movie fomr Server
    //-------------------------------------------------------------------------------------
    this.movieService.getRecommendedMovie().subscribe((response: MovieDTO) => {
        
      this.recommendedMovie = response;

      this.movieService.getMovieImage((this.recommendedMovie.id as number)).subscribe((response2) => {
       
        let image = URL.createObjectURL(response2);
        if(image === undefined || image === null || image === "") {
          console.error("Image for Movie: " + this.recommendedMovie + " is not defined.");
        }

        this.recommendedMovie.image = image;

      });
      
    });

    //-------------------------------------------------------------------------------------

    //-------------------------------------------------------------------------------------
    // New Recommended Movie Interval
    //-------------------------------------------------------------------------------------
    // Set Recommended Movie Change Interval
    // New Recommended MOvie will be Displayed 30 secounds
    //-------------------------------------------------------------------------------------
    setInterval(() => {

      this.movieService.getRecommendedMovie().subscribe((response: MovieDTO) => {
        
        this.recommendedMovie = response;

        this.movieService.getMovieImage((this.recommendedMovie.id as number)).subscribe((response2) => {
         
          let image = URL.createObjectURL(response2);
          if(image === undefined || image === null || image === "") {
            console.error("Image for Movie: " + this.recommendedMovie + " is not defined.");
          }

          this.recommendedMovie.image = image;

        });
        
      });

    }, 30000);

  }

}

