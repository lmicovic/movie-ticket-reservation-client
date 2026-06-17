import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { fadeIn } from '../../other/animations/fade.animation';
import { transition, trigger, useAnimation } from '@angular/animations';
import { slideDownAnimation } from '../../other/animations/slide.animation';
import { MovieDTO } from '../../other/models/movie/movieDTO.interface';
import { MovieGenre } from '../../other/enums';


@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
  animations: [
    trigger("bannerFade", [

      transition(":enter", [
        useAnimation(fadeIn)
      ], {
        params: {
          duration: "1.5s",
          delay: "0s"
        }
      })

    ]),

    trigger("slideDown", [

      transition(":enter", [
        useAnimation(slideDownAnimation)
      ], {
        params: {
          duration: "1s",
          easing: "ease-out"
        }
      })

    ])

  ]



})
export class BannerComponent implements OnInit, OnChanges, OnDestroy {

  // Movies are loaded by HomeComponent and passed in - the banner just features them.
  @Input("movies")
  movies: MovieDTO[] = [];

  // The handful of movies shown in the hero carousel (top rated).
  featuredMovies: MovieDTO[] = [];
  currentImage = 0;

  private changeSlideInterval: any = undefined;

  constructor() {

  }

  ngOnInit(): void {

    // Auto-advance to the next featured movie every 6 seconds
    this.changeSlideInterval = setInterval(() => {
      this.changeSlideNext();
    }, 6000);

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes["movies"]) {
      this.buildFeaturedMovies();
    }

  }

  ngOnDestroy(): void {

    clearInterval(this.changeSlideInterval);

  }


  // Pick the top-rated movies as the "Now Showing" highlights (max 5).
  private buildFeaturedMovies(): void {

    this.featuredMovies = [...(this.movies || [])]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 5);

    // Keep the active index in range when the list changes
    if (this.currentImage > this.featuredMovies.length - 1) {
      this.currentImage = 0;
    }

  }


  // trackBy keeps slide DOM stable as images stream in
  trackByMovie(_index: number, movie: MovieDTO): number | undefined {
    return movie.id;
  }


  goToSlide(index: number): void {

    if (index < 0 || index > this.featuredMovies.length - 1) {
      return;
    }

    this.currentImage = index;

  }


  changeSlideNext(): void {

    if (this.featuredMovies.length === 0) {
      return;
    }

    this.currentImage = (this.currentImage + 1) % this.featuredMovies.length;

  }


  changeSlidePrevious(): void {

    if (this.featuredMovies.length === 0) {
      return;
    }

    this.currentImage = (this.currentImage - 1 + this.featuredMovies.length) % this.featuredMovies.length;

  }


  // Blurred poster used as the cinematic backdrop. Falls back to a genre tint
  // (the poster card itself still renders a generated poster when there is no image).
  backdropImage(movie: MovieDTO): string {

    if (movie.image !== undefined && movie.image !== null && movie.image !== '') {
      return `url('${movie.image}')`;
    }

    return 'none';

  }


  // Genre accent class used to tint the backdrop when no poster image is available.
  genreClass(genre: MovieGenre | string): string {

    switch (this.genreLabel(genre).toLowerCase()) {
      case 'action': return 'genre-action';
      case 'comedy': return 'genre-comedy';
      case 'drama': return 'genre-drama';
      case 'thriller': return 'genre-thriller';
      default: return 'genre-drama';
    }

  }


  // The backend sends the genre as a display name ("Drama"); the fake-movie
  // fallback uses the numeric enum. Handle both so the label is always readable.
  genreLabel(genre: MovieGenre | string): string {

    if (typeof genre === 'number') {
      return MovieGenre[genre];
    }

    return genre;

  }

}
