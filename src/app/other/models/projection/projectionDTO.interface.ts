import { MovieDTO } from "../movie/movieDTO.interface";
import { RoomDTO } from "../room/roomDTO.interface";
import { ProjectionDate } from "./projectionDate.class";
import { ProjectionDateDTO } from "./projectionDateDTO.interface";

export interface ProjectionDTO {

    id: number,
    movie: MovieDTO,
    room: RoomDTO,
    price: number,
    projectionDate: ProjectionDateDTO,
    time: Date

}