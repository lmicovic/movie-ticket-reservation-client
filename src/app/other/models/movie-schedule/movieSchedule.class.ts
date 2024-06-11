import { Movie } from "../movie/movie.class";
import { MovieDTO } from "../movie/movieDTO.interface";
import { MovieScheduleDTO } from "./movieScheduleDTO.interface";


export class MovieSchedule {
    
    constructor(public id: number, public movie: MovieDTO, public room: string, public projectionDate: Date) {

    }

    // public static transform(movieSchedule: MovieSchedule): MovieScheduleDTO {
        
    //     return {
    //         id: movieSchedule.id,
    //         movie: Movie.transform(movieSchedule.movie),
    //         room: movieSchedule.room,
    //         projectionDate: movieSchedule.projectionDate
    //     }

    // }

}