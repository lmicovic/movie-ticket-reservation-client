import { Component, OnInit } from '@angular/core';
import { Movie } from '../../other/models/movie/movie.class';
import { MovieService } from '../../services/movie/movie.service';
import { combineLatest, switchMap } from 'rxjs';
import { MovieGenre } from '../../other/enums';
import { MovieDTO } from '../../other/models/movie/movieDTO.interface';
import { fade, fadeIn } from '../../other/animations/fade.animation';
import { transition, trigger, useAnimation } from '@angular/animations';
import { slideRightAnimation } from '../../other/animations/slide.animation';



@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [ 

    trigger("slideRight", [

      transition(":enter", [
        useAnimation(slideRightAnimation)
      ], {
        params: {
          duration: "0.5s",
          delay: "0s",
          easing: "ease-out"
        }
      })

    ])

  ]
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

    // Get All Movies (falls back to fake movies if the backend is unavailable / empty)
    this.movieService.getAll().subscribe({

      next: (response) => {

        if (!response || response.length === 0) {
          this.movies = this.getFakeMovies();
          return;
        }

        this.movies = response;

        // Load All Movies Images
        for (let i = 0; i < this.movies.length; i++) {

          this.movieService.getMovieImage((this.movies[i].id as number)).subscribe((blob) => {
            this.movies[i].image = URL.createObjectURL(blob);
          });
        }
      },

      error: () => {
        this.movies = this.getFakeMovies();
      }

    });

  }




  private loadRecommendedMovie(): void {

    this.loadRecommendedMovieOnce();

    // Refresh the recommendation periodically
    setInterval(() => {
      this.loadRecommendedMovieOnce();
    }, 30000);

  }


  private loadRecommendedMovieOnce(): void {

    this.movieService.getRecommendedMovie().subscribe({

      next: (response: MovieDTO) => {

        this.recommendedMovie = response;

        this.movieService.getMovieImage((this.recommendedMovie.id as number)).subscribe((blob) => {
          this.recommendedMovie.image = URL.createObjectURL(blob);
        });
      },

      error: () => {
        // Fall back to a fake recommendation if the backend is unavailable
        if (this.recommendedMovie.id === -1) {
          this.recommendedMovie = this.getFakeMovies()[0];
        }
      }

    });

  }


  // Fake movies used when the backend is unavailable (posters are generated from the title)
  private getFakeMovies(): MovieDTO[] {
    return [
      new Movie(1, "Neon Horizon", MovieGenre.Action, "", 8.4, "A rogue pilot races across a dystopian skyline to outrun her past.", ["A. Vega"], ["L. Stone", "M. Cruz"], 2024, "USA", 128, ""),
      new Movie(2, "The Last Letter", MovieGenre.Drama, "", 7.9, "Two strangers connect through a box of forgotten wartime letters.", ["R. Hale"], ["E. Park"], 2023, "UK", 112, ""),
      new Movie(3, "Midnight Comedy Club", MovieGenre.Comedy, "", 7.2, "An aspiring comedian gets one shot at the city's toughest stage.", ["J. Romano"], ["D. Fox"], 2024, "USA", 98, ""),
      new Movie(4, "Silent Frequency", MovieGenre.Thriller, "", 8.1, "A radio engineer intercepts a signal that should not exist.", ["S. Novak"], ["K. Reed"], 2022, "Germany", 121, ""),
      new Movie(5, "Crimson Tide Rising", MovieGenre.Action, "", 7.6, "A coastal town fights back when the sea turns against them.", ["P. Ocean"], ["T. Wave"], 2023, "Australia", 135, ""),
      new Movie(6, "Paper Moons", MovieGenre.Drama, "", 8.7, "A travelling puppeteer searches for the daughter he left behind.", ["I. Moon"], ["N. Star"], 2024, "France", 119, ""),
      new Movie(7, "Office Heist", MovieGenre.Comedy, "", 6.9, "Four bored interns plan the world's most harmless robbery.", ["B. Klein"], ["C. Day"], 2023, "Canada", 102, ""),
      new Movie(8, "Echoes in the Dark", MovieGenre.Thriller, "", 8.0, "A detective with insomnia chases a killer who only strikes at dawn.", ["V. Cole"], ["H. Frost"], 2022, "USA", 126, "")
    ];
  }

}

