import { MovieGenre } from "../../enums";

export interface MovieDTO {

    id: number | undefined,
    title: string,
    genre: MovieGenre,
    image: string | undefined,
    rating: number,
    description: string,
    authors: string[],
    actors: string[],
    year: number,
    country: string,
    duration: number,
    trailerUrl: string

}