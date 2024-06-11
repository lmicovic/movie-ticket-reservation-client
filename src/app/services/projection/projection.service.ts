import { Injectable } from '@angular/core';
import { CRUDInterface } from '../crud.interface';
import { Projection } from '../../other/models/projection/projection.class';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProjectionDTO } from '../../other/models/projection/projectionDTO.interface';

//------------------------------------------
// Tested
//------------------------------------------

@Injectable({
  providedIn: 'root'
})
export class ProjectionService implements CRUDInterface<ProjectionDTO> {

  private projectionURL = "http://localhost:8080/projection";

  constructor(private http: HttpClient) {

  }

  getAll(): Observable<ProjectionDTO[]> {
    return this.http.get<ProjectionDTO[]>(this.projectionURL);
  }

  getById(id: Number): Observable<ProjectionDTO> {
    return this.http.get<ProjectionDTO>(this.projectionURL + "/" + id);
  }

  save(object: ProjectionDTO): Observable<ProjectionDTO> {
    return this.http.post<ProjectionDTO>(this.projectionURL, object);
  }

  update(object: ProjectionDTO): Observable<ProjectionDTO> {
    return this.http.put<ProjectionDTO>(this.projectionURL, object);
  }

  delete(id: number): Observable<ProjectionDTO> {
    return this.http.delete<ProjectionDTO>(this.projectionURL + "/" + id);
  }

  //------------------------------------------------------------------------------------------------------------  
  // Custom Movie Service
  //------------------------------------------------------------------------------------------------------------
  getMovieProjections(movieId: number): Observable<ProjectionDTO[]> {
    return this.http.get<Projection[]>(this.projectionURL + "/movie/" + movieId);
  }

  getProjectionsSelectedSeats(projectionId: number): Observable<number[]> {
    return this.http.get<number[]>("http://localhost:8080/reservation/projection/reserved-seats/" + projectionId);
  }
  

}
