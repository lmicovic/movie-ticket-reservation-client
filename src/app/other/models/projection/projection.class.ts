import { Movie } from "../movie/movie.class";
import { ProjectionDate } from "./projectionDate.class";
import { Room } from "../room/room.class";
import { ProjectionDTO } from "./projectionDTO.interface";
import { MovieDTO } from "../movie/movieDTO.interface";
import { RoomDTO } from "../room/roomDTO.interface";
import { ProjectionDateDTO } from "./projectionDateDTO.interface";

export class Projection {

    constructor(public id: number, public movie: MovieDTO, public room: RoomDTO, public price: number, public projectionDate: ProjectionDateDTO, public time: Date) {

    }
    
    // public static transform(projection: Projection): ProjectionDTO {
    //     return {
    //         id: projection.id,
    //         movie: Movie.transform(projection.movie),
    //         room: Room.transform(projection.room),
    //         price: projection.price,
    //         projectionDate: ProjectionDate.transform(projection.projectionDate),
    //         time: projection.time
    //     }
    // }

}