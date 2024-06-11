import { Injectable } from '@angular/core';
import { CRUDInterface } from '../crud.interface';
import { Reservation } from '../../other/models/reservation/reservation.class';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ReservationDTO } from '../../other/models/reservation/reservationDTO.interface';

//------------------------------------------
// Tested
//------------------------------------------

@Injectable({
  providedIn: 'root'
})
export class ReservationService implements CRUDInterface<ReservationDTO> {

  private reservationURL = "http://localhost:8080/reservation";

  constructor(private http: HttpClient) {

  }

  getAll(): Observable<ReservationDTO[]> {
    return this.http.get<ReservationDTO[]>(this.reservationURL);
  }

  getById(id: number): Observable<ReservationDTO> {
    return this.http.get<ReservationDTO>(this.reservationURL + "/" + id);
  }

  save(object: ReservationDTO): Observable<ReservationDTO> {
    return this.http.post<ReservationDTO>(this.reservationURL, object);
  }

  update(object: ReservationDTO): Observable<ReservationDTO> {
    return this.http.put<ReservationDTO>(this.reservationURL, object);
  }

  delete(id: number): Observable<ReservationDTO> {
    return this.http.delete<ReservationDTO>(this.reservationURL + "/" + id);
  }


  //------------------------------------------------------------------------------------------------------------  
  // Custom Movie Service
  //------------------------------------------------------------------------------------------------------------
  
  getProjectionsSelectedSeats(projectionId: number): Observable<number[]> {
    return this.http.get<number[]>(this.reservationURL + "/projection/reserved-seats/" + projectionId);
  }

  getUserReservations(userId: number): Observable<ReservationDTO[]> {
    return this.http.get<ReservationDTO[]>(this.reservationURL + "/user/" + userId);
  }


}
