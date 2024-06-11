import { Component, OnInit } from '@angular/core';
import { Movie } from '../../other/models/movie/movie.class';
import { MovieService } from '../../services/movie/movie.service';
import { combineLatest, switchMap } from 'rxjs';
import { MovieGenre } from '../../other/enums';
import { MovieDTO } from '../../other/models/movie/movieDTO.interface';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  movies: MovieDTO[] = [];                // All Loaded Movies - from Server
  recommendedMovie: MovieDTO = new Movie(-1, "", MovieGenre.Action, "", -1, "", [], [], -1, "", -1, "");

  constructor(private movieService: MovieService) {
    
  }


  
  ngOnInit(): void {
    
    this.loadMovies();
    this.loadRecommendedMovie();

  }




  private loadMovies(): void {

    // Should Chain Observables - ERROR
    
    // Get All Movies
    this.movieService.getAll().subscribe((response) => {

      this.movies = response;
      
      // Load All Movies Images
      for(let i = 0; i < this.movies.length; i++) {

        this.movieService.getMovieImage((this.movies[i].id as number)).subscribe((response) => {
          
          // console.log(response);
          

          let image = URL.createObjectURL(response);
          if(image === undefined || image === null || image === "") {
            console.error("Image for Movie: " + this.movies[i] + " is not defined.");
          }

          this.movies[i].image = image;                    // Add Movie Image to Movie

        });
      }
    });

  }




  private loadRecommendedMovie(): void {

    this.movieService.getRecommendedMovie().subscribe((response) => {
        
      this.recommendedMovie = response;

      this.movieService.getMovieImage((this.recommendedMovie.id as number)).subscribe((response2) => {
       
        let image = URL.createObjectURL(response2);
        if(image === undefined || image === null || image === "") {
          console.error("Image for Movie: " + this.recommendedMovie + " is not defined.");
        }

        this.recommendedMovie.image = image;

      });
      
    });

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

