import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../../services/reservation/reservation.service';
import { ReservationDTO } from '../../models/reservation/reservationDTO.interface';
import { Reservation } from '../../models/reservation/reservation.class';
import { ProjectionService } from '../../../services/projection/projection.service';
import { UserService } from '../../../services/user/user.service';
import { UserDTO } from '../../models/user/userDTO.interface';
import { ProjectionDTO } from '../../models/projection/projectionDTO.interface';

@Component({
  selector: 'test-reservation',
  templateUrl: './test-reservation.component.html',
  styleUrl: './test-reservation.component.css'
})
export class TestReservationComponent implements OnInit {
  
  jsonString: boolean = true;

  constructor(private reservationService: ReservationService, private projectionService: ProjectionService, private userService: UserService) {

  }

  ngOnInit(): void {
    
    // this.getAllReservations();
    // this.getReservationById();
    // this.saveReservation();
    // this.updateReservation();
    // this.deleteReservation();
    
  }

  getAllReservations() {

    this.reservationService.getAll().subscribe((reservations: ReservationDTO[]) => {

      if(this.jsonString === true) {
        console.log("Get All Reservations:\n" + JSON.stringify(reservations, null, 2));
      }
      else {
        console.log(reservations);
      }

    }, (error: Response) => {
      console.error(error);
    });

  }

  getReservationById() {

    this.reservationService.getById(1).subscribe((reservation: ReservationDTO) => {

      if(this.jsonString === true) {
        console.log("Get Reservation By ID:\n" + JSON.stringify(reservation, null, 2));
      }
      else {
        console.log(reservation);
      }

    }, (error: Response) => {
      console.error(error);
    });

  }

  saveReservation() {

    this.userService.getById(1).subscribe((user: UserDTO) => {
      this.projectionService.getById(1).subscribe((projection: ProjectionDTO) => {

        let reservation: ReservationDTO = new Reservation(-1, user, projection, 5, [51,52,53,54,55], 250, new Date());

        this.reservationService.save(reservation).subscribe((savedReservation: ReservationDTO) => {

          if(this.jsonString === true) {
            console.log("Saved Reservation:\n" + JSON.stringify(savedReservation, null, 2));
          }          
          else {
            console.log(savedReservation);
          }

        }, (error: Response) => {
          console.error(error);
        });
      }, (error: Response) => {
        console.error(error);
      });
    }, (error: Response) => {
      console.error(error);
    });

  }

  updateReservation() {

    this.reservationService.getById(1).subscribe((reservation: ReservationDTO) => {

      reservation.reservedSeats = [25];
      reservation.ticketCount = 5;
      
      this.reservationService.update(reservation).subscribe((updatedReservation: ReservationDTO) => {

        if(this.jsonString === true) {
          console.log("Update Reservation:\n" + JSON.stringify(updatedReservation, null, 2));
        }
        else {
          console.log(updatedReservation);
        }
  
      }, (error: Response) => {
        console.error(error);
      });


    }, (error: Response) => {
      console.error(error);
    });

  }

  deleteReservation() {

    this.reservationService.delete(1).subscribe((response: any) => {

      console.log("Deleted Reservation: " + 1);

    }, (error: Response) => {
      console.error(error);
    });

  }

}
