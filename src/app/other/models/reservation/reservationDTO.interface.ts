import { ProjectionDTO } from "../projection/projectionDTO.interface";
import { UserDTO } from "../user/userDTO.interface";

export interface ReservationDTO {

    id: number | undefined,
    user: UserDTO,
    projection: ProjectionDTO,
    ticketCount: number,
    reservedSeats: number[],
    totalPrice: number,
    reservationDate: Date

}