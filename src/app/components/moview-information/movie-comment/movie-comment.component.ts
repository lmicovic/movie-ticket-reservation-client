import { MovieService } from './../../../services/movie/movie.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, input } from '@angular/core';
import { faL, faStar } from '@fortawesome/free-solid-svg-icons';
import { RatingValidators } from '../../../validators/rating.validators';
import { Movie } from '../../../other/models/movie/movie.class';
import { MovieComment } from '../../../other/models/movie-comment/movieComment.class';
import { CommentService } from '../../../services/comment/comment.service';
import { MovieGenre } from '../../../other/enums';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../other/models/user/user.class';
import { ToastrService } from 'ngx-toastr';
import { UserInfo } from '../../../other/models/user/userInfo.class';
import { MovieDTO } from '../../../other/models/movie/movieDTO.interface';
import { UserDTO } from '../../../other/models/user/userDTO.interface';
import { MovieCommentDTO } from '../../../other/models/movie-comment/movieCommentDTO.interface';
import { AuthService } from '../../../services/auth-service/auth-service.service';
import { fade } from '../../../other/animations/fade.animation';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { expandCollapse } from '../../../other/animations/expandCollapse.animation';

@Component({
  selector: 'movie-comment',
  templateUrl: './movie-comment.component.html',
  styleUrl: './movie-comment.component.css',
  animations: [
    expandCollapse
  ]
})
export class MovieCommentComponent implements OnChanges {


  @Input("movie")
  movie: MovieDTO = new Movie(-1, "", MovieGenre.Action, "", -1, "", [], [], -1, "", -1, "");

  movieComments: MovieCommentDTO[] = [];     // All Comments fot the Movie
  
  form: FormGroup = new FormGroup({
    
    rating: new FormControl("", RatingValidators.ratingRequired),
    commentText: new FormControl("", [])

  });

  @Output("movieChange")
  movieChange: EventEmitter<MovieDTO> = new EventEmitter<MovieDTO>();
//------------------------------------------------------------------------------------------------

  user: UserDTO = new User(-1, "", new UserInfo(-1, "", "", "", "", ""), [], [], []);

  // Star Icon
  faStar = faStar;

  // addCommentMenu: boolean = false;
  addCommentMenu: boolean = false;
  addRating: boolean = false;
  ratingScore: number = 0;
  
  
  constructor(private ref: ElementRef, public authService: AuthService, private userService: UserService, private commentService: CommentService, private movieService: MovieService, private toastr: ToastrService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    
    if(changes["movie"].firstChange === false) {
      
      // Passed movie object from movie-information-component

      // Load All Comments for the passed Movie
      this.commentService.getMovieComments((this.movie.id as number)).subscribe((response) => {

        this.movieComments = response;  

        // DELETE
        this.user = this.authService.getCurrentUser() as UserDTO;
        //---------------------------------------------------

      }, (error: Response) => {

        // HTTP Error - Not-Found - 404
        if(error.status === 404) {
          alert("Movie with id: " + this.movie.id + " is not found.");
          return;
        }
        // Unexpected Error
        else {
          alert("Unexcpected Error Occured.");
          console.error(error);
          return;
        }

      });

      
    }
    
    
    
  }


  

  onAddCommentButton() {
    this.addCommentMenu = !this.addCommentMenu;
  }

  onStarHover($event: any, t?: any) {
    
    try {
    
      if(this.addRating === false) {
  
        let currentElement;
        let otherElements;
        
        if(t === undefined) {
          currentElement = $event.target;                            // Curernt Star Icon
          otherElements = $event.target.parentElement.children;      // All star icons
        }
  
        if(t !== undefined) {
          currentElement = t;                           
          otherElements = t.parentElement.children;      
        }
  
        let flag = false;
        for(let i = 0; i < otherElements.length; i++) {
          
         if(otherElements[i].id === currentElement.id) {
          otherElements[i].children[0].style.color = "rgba(252, 186, 3, 1)";
          flag = true;
          continue;
         }
         
         
         if(flag === false) {
          otherElements[i].children[0].style.color = "rgba(252, 186, 3, 1)";     
         }
         else if(flag === true) {
          otherElements[i].children[0].style.color = "gray";
         }
    
        }
  
      }

    } catch (error) {
       
    } 

  }


  onStarBlur($event: any) {
    
    if(this.addRating === false) {

      let htmlElements = this.ref.nativeElement.querySelectorAll(".star-icon");
    
      for(let i = 0; i < htmlElements.length; i++) {
        
        htmlElements[i].children[0].style.color = "gray";
  
      }

    }    
    
  }


  onStarClick($event: any) {

    this.addRating = false;
    this.onStarHover(undefined, $event.target.parentElement.parentElement);
    this.addRating = true;
    

    this.getRatingScore($event);


  }


  getRatingScore($event: any) {
    
    let elementId = $event.target.parentElement.parentElement.parentElement.children;
    
    let score = 0;
    for (let i = 0; i < elementId.length; i++) {

      if(elementId[i].children[0].style.color === "rgb(252, 186, 3)") {
        score++;
      }

    }

    this.ratingScore = score;    

  }


  onSubmit() {
    
    let rating = 0;

    // If Comment Form is Validate
    if(this.ratingValidation() && this.commentValidation()) {

      // Check Rating
      let stars = document.getElementsByClassName("star-icon");
      for (let i = 0; i < stars.length; i++) {
        
        let starColor = (document.getElementById(stars[i].id)?.childNodes[0] as HTMLElement).style.color;
        if(starColor === "rgb(252, 186, 3)") {
          rating++;  
        }
      }
      
      if(rating === 0) {

        this.form.controls["rating"].setErrors({ratingInsert: true});
        
        let htmlElements = this.ref.nativeElement.querySelectorAll(".star-icon");
        for(let i = 0; i < htmlElements.length; i++) {
          
          
          htmlElements[i].children[0].style.color = "gray";
        }

        return;
      }
      //---------------------------------------------------------------------------------------------------------


      //----------------------------------------------------------      
      // Submit Comment to Server
      //----------------------------------------------------------
      
      let date = new Date();        // Current Date
      let ratingValue = rating;
      let commentText = this.form.controls["commentText"].value;
      
      let movieComment = new MovieComment(undefined, this.user, this.movie, date, ratingValue, commentText);

      // Post Comment Request - HTTP POST
      this.commentService.save(movieComment).subscribe((savedComment: MovieCommentDTO) => {

        // savedComment.movie.image = URL.createObjectURL(movieImage)

        // Successfully Saved Comment
        this.movieComments.push(savedComment);      // Response - saved Comment Object from DataBase
        this.resetForm();  
        this.movieChange.emit(savedComment.movie);


        this.toastr.info("", "Comment have been posted successfully!", {
          positionClass: "toast-top-left",
        });
          
      }, (error: Response) => {

        alert("Unexpected Error Occured.");
        console.error(error);
        return;
        

      });

    } 

    
    
  }

  private resetForm(): void {

    // Comment Form

    // Reset Rating Values
    let stars = document.getElementsByClassName("star-icon");
    for (let i = 0; i < stars.length; i++) {
      
      (document.getElementById(stars[i].id)?.childNodes[0] as HTMLElement).style.color = "gray";
      
    }

    this.addRating = false;
    this.form.reset();

  }

  ratingValidation(): boolean {
    
    let ratingElement2 = this.ref.nativeElement.querySelectorAll(".star-icon");

    //--------------------------------------------------------------------------------------------------------
    // Movie Rating - Form Validation
    //--------------------------------------------------------------------------------------------------------

    // Count Selected Rating Stars
    let count = 0;
    for (let i = 0; i < ratingElement2.length; i++) {
      
      if(ratingElement2[i].children[0].style.color === "rgb(252, 186, 3)") {
        count++;
      }
      
    }

    
    // Validation Error - Rating not set
    if(count === 0) {
      this.form.controls["rating"].setErrors({ratingInsert: true});
      return false;
    }
    // Valiration - Accepted
    else if(count <= 5 && this.form.controls["rating"].hasError("ratingInsert")) {
      // @ts-ignore: Object is possibly 'null'.
      delete this.form.controls["rating"].errors["ratingInsert"];
      this.form.controls["rating"].updateValueAndValidity();
    }
    //--------------------------------------------------------------------------------------------------------
    // Movie Rating - Form Validation - END
    //--------------------------------------------------------------------------------------------------------

    return true;

  }

  commentValidation(): boolean {

    let comment: string = this.form.controls["commentText"].value;

    if(comment.length === 0) {
      this.form.controls["commentText"].setErrors({required: true});
      return false;
    }
    else if(comment.length > 0 && this.form.controls["commentText"].hasError("required")) {
      // @ts-ignore: Object is possibly 'null'.
      delete this.form.controls["commentText"].errors["required"];
    }

    return true;

  }


}
