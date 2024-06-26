import { Movie } from '../../other/models/movie/movie.class';
import { Component, OnInit, ElementRef, Input, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Day, MovieGenre } from '../../other/enums';
import { MovieService } from '../../services/movie/movie.service';
import { ToastrService } from 'ngx-toastr';
import { MovieDTO } from '../../other/models/movie/movieDTO.interface';
import { slideDown, slideRight } from '../../other/animations/slide.animation';


@Component({
  selector: 'app-moview-information',
  templateUrl: './moview-information.component.html',
  styleUrl: './moview-information.component.css',
  animations: [
    slideRight, slideDown
  ]
})
export class MoviewInformationComponent implements OnInit {

  @Input("movie")
  movie: MovieDTO = new Movie(-1, "", MovieGenre.Action, "", -1, "", [], [], -1, "", -1, "");              // Movie related to this Component, movieId - passed from URL Parameter, and loaded from server by movieId().

  

  // Enum for Panel - Selected Day
  selectedDay: Day = Day.Monday;

  constructor(private movieService: MovieService, private route: ActivatedRoute, private ref: ElementRef, private toastr: ToastrService) {

  }

  ngOnInit(): void {

    
    // Load Selected Movie
    this.loadMovie();
    
    
    

    //--------------------------------------------------------------------------------------------------------------------------------
    // Panel Component - Initialized Selected Day - Style
    //--------------------------------------------------------------------------------------------------------------------------------
    switch(this.selectedDay) {
      case  Day.Monday:
        this.ref.nativeElement.querySelector("#monday").className = "movie-panel-item-active";
        break;
      case Day.Thuesday:
        this.ref.nativeElement.querySelector("#thuesday").className = "movie-panel-item-active";
        break;
      case Day.Wednesday:
        this.ref.nativeElement.querySelector("#wednesday").className = "movie-panel-item-active";
        break;
      case Day.Thursday:
        this.ref.nativeElement.querySelector("#thursday").className = "movie-panel-item-active";
        break;
      case Day.Friday:
        this.ref.nativeElement.querySelector("#friday").className = "movie-panel-item-active";
        break;
      case Day.Saturday:
        this.ref.nativeElement.querySelector("#saturday").className = "movie-panel-item-active";
        break;
      case Day.Sunday:
        this.ref.nativeElement.querySelector("#sunday").className = "movie-panel-item-active";
        break;
    }
    //--------------------------------------------------------------------------------------------------------------------------------
    // Panel Component - Initialized Selected Day - Style - END
    //--------------------------------------------------------------------------------------------------------------------------------


    //--------------------------------------------------------------------------------------------------------------------------------
    // Formatting Movie Desctription
    //--------------------------------------------------------------------------------------------------------------------------------
    // let movieDesctiptionFormat = this.movieDescriptionFormat();
    // this.movie.description = movieDesctiptionFormat;

    // let movieDescriptionArr = this.movie.description.split(". ");
    // let min = 10;
    // let max = 20;
    // let count = Math.floor(Math.random() * (max - min + 1)) + min;
    // for (let i = 0; i < movieDescriptionArr.length; i++) {
      
    //   if(count <= 0) {
    //     this.ref.nativeElement.querySelector(".movie-description-content").innerHTML += "<br><br>";
    //     count = Math.floor(Math.random() * (max - min + 1)) + min;
    //   }

      

    //   this.ref.nativeElement.querySelector(".movie-description-content").innerHTML += movieDescriptionArr[i] + ". ";
    //   count--;

    // }
    //--------------------------------------------------------------------------------------------------------------------------------
    // Formatting Movie Desctription - END
    //--------------------------------------------------------------------------------------------------------------------------------
    
    
  }

  private loadMovie(): void {

    this.route.paramMap.subscribe((paramMap) => {

      //--------------------------------------------------------------------------------------------------------------------------------
      // Component - Getting URL Parameters
      //--------------------------------------------------------------------------------------------------------------------------------
      let movieId = Number(paramMap.get("movieId"));          // Getting URL Parameter passed from home.component.html
      try {
        if(movieId === undefined || movieId === null) {
          throw new Error("MovieId: passed to path: ./movie/:movieId is - " + movieId);
        }    
      } catch (error) {
        console.error(error);
      }
  
      this.movieService.getById(movieId).subscribe((response) => {
        this.movie = response;
  
        this.movieService.getMovieImage((this.movie.id as number)).subscribe((response2) => {
  
          let image = URL.createObjectURL(response2);
          if(image === "" || image === undefined || image === null) {
            console.error("Image for Movie: " + this.movie + " is not found. - Image: " + response2);
          }
  
          this.movie.image = image;


        });
  
      });

    });





  }

  movieDescriptionFormat() {

    let movieDescriptionArr = this.movie.description.split(/(\s+)/);

    let newDescription = "";
    let min = 8;
    let max = 20;
    let count = Math.floor(Math.random() * (max - min + 1)) + min;
    let upperCase = false;
    for(let i = 0; i < movieDescriptionArr.length; i++) {

      if(upperCase && movieDescriptionArr[i] !== " ") {
        movieDescriptionArr[i] = movieDescriptionArr[i][0].toUpperCase() + movieDescriptionArr[i].substring(1, movieDescriptionArr[i].length);        
        upperCase = false;
      }
      
      if(count <= 0) {
        count = Math.floor(Math.random() * (max - min + 1)) + min;
        newDescription = newDescription.substring(0, newDescription.length-1) + ". ";
        upperCase = true;
        
        continue;
      }

      newDescription += movieDescriptionArr[i];
      
      count--;

    }

    return newDescription;

  }



  // Get Movie Schedule
  onClick($event: any) {


    //--------------------------------------------------------------------------------------------------------------------------------
    // Panel - Style - onCLick
    //--------------------------------------------------------------------------------------------------------------------------------
    $event.stopPropagation();    

    let htmlElement = $event.target;
    
    if(htmlElement.className === "movie-panel-item-active") {
      return;
    }
    
    this.ref.nativeElement.querySelector(".movie-panel-item-active").className = "movie-panel-item";
    htmlElement.className = "movie-panel-item-active";
    
    switch(htmlElement.id) {
      case "monday":
        this.selectedDay = Day.Monday;
        break;
      case "thuesday":
        this.selectedDay = Day.Thuesday;
        break;
      case "wednesday":
        this.selectedDay = Day.Wednesday;
        break;
      case "thursday":
        this.selectedDay = Day.Thursday;
       break;
      case "friday":
        this.selectedDay = Day.Friday;
        break;
      case "saturday":
        this.selectedDay = Day.Saturday;
        break;
      case "sunday":
        this.selectedDay = Day.Sunday;
        break;
        
    }  

    //--------------------------------------------------------------------------------------------------------------------------------
    // Panel - Style - onCLick - END
    //--------------------------------------------------------------------------------------------------------------------------------
    
    //--------------------------------------------------------------------------------------------------------------------------------
    // Panel - Change MovieSchedule Table - Based on Selected Date
    //--------------------------------------------------------------------------------------------------------------------------------
    


    //--------------------------------------------------------------------------------------------------------------------------------
    // Panel - Change MovieSchedule Table - Based on Selected Date - END
    //--------------------------------------------------------------------------------------------------------------------------------







  }

  getTrailer():void {
    
    if(this.movie.trailerUrl === null) {
      // alert("This movie does not have trailer.");
      this.toastr.warning("", "Movie does not have trailer.", {
        positionClass: "toast-top-left",
      });
    }

  }


  onMovieChange(movie: MovieDTO) {

    this.movie.rating = movie.rating;
    
  }

}
