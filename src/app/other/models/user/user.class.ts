import { Movie } from "../movie/movie.class";
import { MovieDTO } from "../movie/movieDTO.interface";
import { Reservation } from "../reservation/reservation.class";
import { ReservationDTO } from "../reservation/reservationDTO.interface";
import { UserDTO } from "./userDTO.interface";
import { UserInfo } from "./userInfo.class";
import { UserInfoDTO } from "./userInfoDTO.interface";

export class User implements UserDTO{
    
    constructor(public id: number, public image: string | undefined, public userInfo: UserInfoDTO, public watchedMovies: MovieDTO[], public bookmarks: MovieDTO[], public reservations: ReservationDTO[]) {

    }

    // public static transform(user: User): UserDTO {
    //     return {
    //         id: user.id,
    //         image: user.image,
    //         userInfo: UserInfo.transform(user.userInfo),
    //         watchedMovies: Movie.transformArray(user.watchedMovies),
    //         bookmarks: Movie.transformArray(user.bookmarks),
    //         reservations: Reservation.transformArray(user.reservations)

    //     }
    // }

}