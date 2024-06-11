import { MovieDTO } from "../movie/movieDTO.interface";
import { ReservationDTO } from "../reservation/reservationDTO.interface";
import { UserInfoDTO } from "./userInfoDTO.interface";

export interface UserDTO {

    id: number,
    image: string | undefined,
    userInfo: UserInfoDTO,
    watchedMovies: MovieDTO[],
    bookmarks: MovieDTO[],
    reservations: ReservationDTO[],

    

}