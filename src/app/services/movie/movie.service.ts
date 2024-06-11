import { Injectable } from '@angular/core';
import { Movie } from '../../other/models/movie/movie.class';
import { MovieGenre } from '../../other/enums';
import { HttpClient } from '@angular/common/http';
import { CRUDInterface } from '../crud.interface';
import { Observable } from 'rxjs';
import { MovieDTO } from '../../other/models/movie/movieDTO.interface';

//------------------------------------------
// Tested
//------------------------------------------

@Injectable({
  providedIn: 'root'
})
export class MovieService implements CRUDInterface<MovieDTO> {

  private movieURL = "http://localhost:8080/movie";

  constructor(private http: HttpClient) { 

  }

  getAll(): Observable<MovieDTO[]> {
    return this.http.get<MovieDTO[]>(this.movieURL);
  }

  getById(id: Number): Observable<MovieDTO> {
    return this.http.get<MovieDTO>(this.movieURL + "/" + id);
  }

  save(object: MovieDTO): Observable<MovieDTO> {
    return this.http.post<MovieDTO>(this.movieURL, object);
  }

  update(object: MovieDTO): Observable<MovieDTO> {
    return this.http.put<MovieDTO>(this.movieURL, object);
  }

  delete(id: number): Observable<MovieDTO> {
    return this.http.delete<MovieDTO>(this.movieURL + "/" + id);
  }

  //------------------------------------------------------------------------------------------------------------  
  // Custom Movie Service
  //------------------------------------------------------------------------------------------------------------
  getMovieImage(movieId: Number): Observable<any> {
    return this.http.get(this.movieURL + "/image/" + movieId, { responseType: 'blob' });
  }

  getRecommendedMovie(): Observable<MovieDTO> {
    return this.http.get<MovieDTO>(this.movieURL + "/recommend");
  }

}
