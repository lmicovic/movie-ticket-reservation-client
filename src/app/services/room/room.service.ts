import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CRUDInterface } from '../crud.interface';
import { RoomDTO } from '../../other/models/room/roomDTO.interface';
import { Observable } from 'rxjs';
import { ProjectionDTO } from '../../other/models/projection/projectionDTO.interface';
import { ReservationDTO } from '../../other/models/reservation/reservationDTO.interface';

//------------------------------------------
// Tested
//------------------------------------------

@Injectable({
  providedIn: 'root'
})
export class RoomService implements CRUDInterface<RoomDTO> {

  private roomUrl = "http://localhost:8080/room";

  constructor(private http: HttpClient) { 
    
  }

  getAll(): Observable<RoomDTO[]> {
    return this.http.get<RoomDTO[]>(this.roomUrl);
  }

  getById(id: number): Observable<RoomDTO> {
    return this.http.get<RoomDTO>(this.roomUrl + "/" + id);
  }

  save(object: RoomDTO): Observable<RoomDTO> {
    return this.http.post<RoomDTO>(this.roomUrl, object);
  }

  update(object: RoomDTO): Observable<RoomDTO> {
    return this.http.put<RoomDTO>(this.roomUrl, object);
  }

  delete(id: number): Observable<RoomDTO> {
    return this.http.delete<RoomDTO>(this.roomUrl + "/" + id);
  }




  //------------------------------------------------------------------------------------------------------------  
  // Custom Room Service
  //------------------------------------------------------------------------------------------------------------
  getRoomProjections(roomId: number): Observable<ProjectionDTO[]> {
    return this.http.get<ProjectionDTO[]>("http://localhost:8080/projection/room/" + roomId);
  }

  getRoomReservations(roomId: number): Observable<ReservationDTO[]> {
    return this.http.get<ReservationDTO[]>("http://localhost:8080/reservation/room/" + roomId);
  }

}
