import { MovieDTO } from './../movie/movieDTO.interface';
import { UserDTO } from './../user/userDTO.interface';
import { Movie } from "../movie/movie.class";
import { User } from "../user/user.class";
import { MovieCommentDTO } from "./movieCommentDTO.interface";

export class MovieComment implements MovieCommentDTO {
    
    constructor(public id: number | undefined, public user: UserDTO, public movie: MovieDTO, public date: Date, public rating: number, public commentText: string) {

    }

    // public static transform(movieComment: MovieComment): MovieCommentDTO {
    //     return {
    //         id: movieComment.id,
    //         user: User.transform(movieComment.user),
    //         movie: Movie.transform(movieComment.movie),
    //         date: movieComment.date,
    //         rating: movieComment.rating,
    //         commentText: movieComment.commentText
    //     }
    // }
    
}