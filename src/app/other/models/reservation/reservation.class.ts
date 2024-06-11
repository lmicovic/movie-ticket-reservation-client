import { ReservationDTO } from './reservationDTO.interface';
import { Projection } from "../projection/projection.class";
import { User } from "../user/user.class";
import { UserDTO } from '../user/userDTO.interface';
import { ProjectionDTO } from '../projection/projectionDTO.interface';

export class Reservation implements ReservationDTO {
    
    constructor(public id: number | undefined, public user: UserDTO, public projection: ProjectionDTO, public ticketCount: number, public reservedSeats: number[], public totalPrice: number, public reservationDate: Date) {

    }

    // public static transformArray(reservations: Reservation[]): ReservationDTO[] {

    //     let reservationsDTO: ReservationDTO[] = [];

    //     for (let i = 0; i < reservations.length; i++) {
            
    //         let reservationDTO = Reservation.transform(reservations[i]);
    //         reservationsDTO.push(reservationDTO);
            
    //     }

    //     return reservationsDTO;

    // }

    // public static transform(reservation: Reservation): ReservationDTO {
    //     return {
    //         id: reservation.id,
    //         user: User.transform(reservation.user),
    //         projection: Projection.transform(reservation.projection),
    //         ticketCount: reservation.ticketCount,
    //         reservedSeats: reservation.reservedSeats,
    //         totalPrice: reservation.totalPrice,
    //         reserationDate: reservation.reservationDate
    //     }
    // }

}