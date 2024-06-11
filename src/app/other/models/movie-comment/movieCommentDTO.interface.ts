import { MovieDTO } from "../movie/movieDTO.interface";
import { UserDTO } from "../user/userDTO.interface";

export interface MovieCommentDTO {

    id: number | undefined,
    user: UserDTO,
    movie: MovieDTO,
    date: Date,
    rating: number,
    commentText: string

}