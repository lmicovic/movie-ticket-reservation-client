import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CRUDInterface } from '../crud.interface';
import { MovieComment } from '../../other/models/movie-comment/movieComment.class';
import { Observable } from 'rxjs';
import { MovieCommentDTO } from '../../other/models/movie-comment/movieCommentDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentService implements CRUDInterface<MovieCommentDTO> {

  private commentURL = "http://localhost:8080/comment";

  constructor(private http: HttpClient) {

  }

  getAll(): Observable<MovieCommentDTO[]> {
    return this.http.get<MovieCommentDTO[]>(this.commentURL);
  }

  getById(id: number): Observable<MovieCommentDTO> {
    return this.http.get<MovieCommentDTO>(this.commentURL + "/" + id);
  }

  save(object: MovieCommentDTO): Observable<MovieCommentDTO> {

    let headers = new HttpHeaders().set("Content-Type", "application/json").set("Accept", "application/json");
    

    return this.http.post<MovieCommentDTO>(this.commentURL, JSON.stringify(object), {headers: headers});
  }

  update(object: MovieCommentDTO): Observable<MovieCommentDTO> {
    return this.http.put<MovieCommentDTO>(this.commentURL, object);
  }

  delete(id: number): Observable<MovieCommentDTO> {
    return this.http.delete<MovieCommentDTO>(this.commentURL + "/" + id);
  }

  //------------------------------------------------------------------------------------------------------------  
  // Custom MovieComment Service
  //------------------------------------------------------------------------------------------------------------  
  
  // Get All Comments for the Movie
  getMovieComments(movieId: number): Observable<MovieCommentDTO[]> {
    return this.http.get<MovieCommentDTO[]>(this.commentURL + "/movie/" + movieId);
  }
  
  getUserComments(userId: number): Observable<MovieCommentDTO[]> {
    return this.http.get<MovieCommentDTO[]>(this.commentURL + "/user/" + userId);
  }

}
