import { MovieGenre } from "../../enums";
import { MovieDTO } from "./movieDTO.interface";


export class Movie implements MovieDTO {

    constructor(public id: number | undefined, public title: string, public genre: MovieGenre, public image: string | undefined, public rating: number, public description: string, public authors: string[], public actors: string[], public year: number, public country: string, public duration: number, public trailerUrl: string) {

    }
    
    // public static transformArray(movies: Movie[]): MovieDTO[] {

    //     let moviesDTO: MovieDTO[] = [];

    //     for(let i = 0; i < movies.length; i++) {
    //         let movieDTO: MovieDTO = Movie.transform(movies[i]);
    //         moviesDTO.push(movieDTO);
    //     }

    //     return moviesDTO;

    // }

    // public static transform(movie: Movie): MovieDTO {

    //     return {
    //         id: movie.id,
    //         title: movie.title,
    //         genre: movie.genre,
    //         image: movie.image,
    //         rating: movie.rating,
    //         description: movie.description,
    //         authors: movie.authors,
    //         actors: movie.actors,
    //         year: movie.year,
    //         country: movie.country,
    //         duration: movie.duration,
    //         trailerUrl: movie.trailerUrl
    //     }

    // }

}