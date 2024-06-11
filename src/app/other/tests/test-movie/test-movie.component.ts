import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../services/movie/movie.service';
import { MovieDTO } from '../../models/movie/movieDTO.interface';
import { Movie } from '../../models/movie/movie.class';
import { MovieGenre } from '../../enums';

@Component({
  selector: 'test-movie',
  templateUrl: './test-movie.component.html',
  styleUrl: './test-movie.component.css'
})
export class TestMovieComponent implements OnInit{

  jsonString: boolean = true;

  constructor(private movieService: MovieService) {

  }

  ngOnInit(): void {
    
    // this.getAllMovies();
    // this.getMovieById();
    // this.saveMovie();
    // this.updateMovie();
    // this.deleteMovie();
    // this.getMovieImage();
    // this.getRecommendedMovie();
    
  }

  getAllMovies() {

    this.movieService.getAll().subscribe((movies: MovieDTO[]) => {

      if(this.jsonString === true) {
        console.log("Get All Movies:\n" + JSON.stringify(movies, null, 2));
      }
      else {
        console.log(movies);
      }

    }, (error: Response) => {
      console.error(error);
    });

  }

  getMovieById() {

    this.movieService.getById(1).subscribe((movie: MovieDTO) => {

      if(this.jsonString === true) {
        console.log("Get Movie By Id:\n" + JSON.stringify(movie, null, 2));
      }
      else {
        console.log(movie);
      }

    }, (error: Response) => {
      console.error(error);
    });

  }

  saveMovie() {

    let movie: MovieDTO = new Movie(-1, "Test1", MovieGenre.Action, undefined, 0, "Test123", ["Pera Peric", "Ana Anic"], ["Pera Peric", "Ana Anic"], 2014, "USA", 120, "");

    this.movieService.save(movie).subscribe((savedMovie: MovieDTO) => {

      if(this.jsonString === true) {
        console.log("Saved Movie:\n" + JSON.stringify(savedMovie, null, 2));
      }
      else {
        console.log(savedMovie);
      }

    }, (error: Response) => {
      console.error(error);
    });    

  }

  updateMovie() {

    this.movieService.getById(1).subscribe((movie: MovieDTO) => {

      movie.title = "Test123";

      this.movieService.update(movie).subscribe((updatedMovie: MovieDTO) => {

        if(this.jsonString === true) {
          console.log("Updated Movie:\n" + JSON.stringify(updatedMovie, null, 2));
        }
        else {
          console.log(updatedMovie);
        }

      }, (error: Response) => {
        console.error(error);
        
      })

    }, (error: Response) => {
      console.error(error);
    });  

  }

  deleteMovie() {

    console.error("Delete Movie is not supported...");

  }


  getMovieImage() {

    this.movieService.getMovieImage(3).subscribe((image: Blob) => {

      console.log(image);

    }, (error: Response) => {
      console.error(error);
    });   

  }

  getRecommendedMovie() {

    this.movieService.getRecommendedMovie().subscribe((recommendedMovie: MovieDTO) => {

      if(this.jsonString === true) {
        console.log("Recommended Movie:\n" + JSON.stringify(recommendedMovie, null, 2));
      }
      else {
        console.log(recommendedMovie);
      }

    }, (error: Response) => {
      console.error(error);
    });  

  }

}
