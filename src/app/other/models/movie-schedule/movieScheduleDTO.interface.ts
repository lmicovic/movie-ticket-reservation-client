import { MovieDTO } from "../movie/movieDTO.interface";

export interface MovieScheduleDTO {

    id: number,
    movie: MovieDTO,
    room: string,
    projectionDate: Date

}