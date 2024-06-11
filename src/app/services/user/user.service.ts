import { MovieDTO } from './../../other/models/movie/movieDTO.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CRUDInterface } from '../crud.interface';
import { User } from '../../other/models/user/user.class';
import { Observable } from 'rxjs';
import { Movie } from '../../other/models/movie/movie.class';
import { UserDTO } from '../../other/models/user/userDTO.interface';


//------------------------------------------
// Tested
//------------------------------------------

@Injectable({
  providedIn: 'root'
})
export class UserService implements CRUDInterface<UserDTO> {

  private userURL = "http://localhost:8080/user";

  constructor(private http: HttpClient) { 

  }

  getAll(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(this.userURL);
  }

  getById(id: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(this.userURL + "/" + id);
  }

  save(object: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(this.userURL, object);
  }

  update(object: UserDTO): Observable<UserDTO> {
    return this.http.put<UserDTO>(this.userURL, object);
  }

  delete(id: number): Observable<UserDTO> {
    return this.http.delete<UserDTO>(this.userURL + "/" + id);
  }

  //------------------------------------------------------------------------------------------------------------  
  // Custom User Service
  //------------------------------------------------------------------------------------------------------------

  getUserImage(userId: number): Observable<any> {
    return this.http.get(this.userURL + "/image/" + userId, { responseType: 'blob' });
  }

  updateUserImage(userId: number, image: File): Observable<UserDTO> {

    let formData = new FormData();
    formData.append("image", image, image.name);

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');



    return this.http.put<UserDTO>(this.userURL + "/image/" + userId, formData, {headers: headers});
  }

  getUserBookmarks(userId: number): Observable<MovieDTO[]> {
    return this.http.get<MovieDTO[]>(this.userURL + "/bookmark/" + userId);
  }
  
  addMovieToUserBookmarks(userId: number, movieId: number): Observable<UserDTO> {
    return this.http.put<any>(this.userURL + "/bookmark/movie/" + userId + "/" + movieId, undefined);
  }
  
  removeMovieToUserBookmarks(userId: number, movieId: number): Observable<MovieDTO[]> {
    return this.http.delete<any>(this.userURL + "/bookmark/movie/" + userId + "/" + movieId);
  }

  getUserWatchedMovies(userId: number): Observable<MovieDTO[]> {
    return this.http.get<Movie[]>(this.userURL + "/watched/" + userId);
  }

  addWatchedMovieToUser(userId: number, movieId: number): Observable<UserDTO> {
    return this.http.put<any>(this.userURL + "/watched/" + userId + "/" + movieId, undefined);
  }


  checkEmailExists(email: string): Observable<Boolean> {
    
    let header = new HttpHeaders({
      "Content-Type": "application/json",
    });

    let emailJson = { email: email };
    
    return this.http.put<Boolean>(this.userURL + "/check-email", emailJson, {headers: header});
  }

  getUserByEmail(email: String): Observable<UserDTO> {

    let headers = new HttpHeaders({
      // "Authorization": "Bearer " + localStorage.getItem("jwtToken"),
      "Content-Type": "application/json",
      "Accept": "application/json"
    });

    return this.http.get<UserDTO>(this.userURL + "/email/" + email, { headers: headers} );
  }

}
