import { MovieGenre } from "../../enums";
import { MovieDTO } from "./movieDTO.interface";


export class Movie implements MovieDTO {

    constructor(public id: number | undefined, public title: string, public genre: MovieGenre, public image: string | undefined, public active: boolean, public rating: number, public description: string, public authors: string[], public actors: string[], public year: number, public country: string, public duration: number, public trailerUrl: string) {

    }
    
    public equal(other: MovieDTO): boolean {
        
        if( this.id === other.id &&
            this.title === other.title &&
            this.genre === other.genre &&
            this.image === other.image &&
            this.active === other.active &&
            this.rating === other.rating &&
            this.description == other.description &&
            JSON.stringify(this.authors) == JSON.stringify(other.authors) &&
            JSON.stringify(this.actors) == JSON.stringify(other.actors) &&
            this.year === other.year &&
            this.country === other.country &&
            this.duration === other.duration &&
            this.trailerUrl === other.trailerUrl
        ) {
            return true;
        }

        return false;
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