import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from '../../other/models/user/user.class';
import { UserService } from '../../services/user/user.service';
import { Movie } from '../../other/models/movie/movie.class';
import { ReservationService } from '../../services/reservation/reservation.service';
import { Reservation } from '../../other/models/reservation/reservation.class';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { CommentService } from '../../services/comment/comment.service';
import { MovieComment } from '../../other/models/movie-comment/movieComment.class';
import { UserDTO } from '../../other/models/user/userDTO.interface';
import { MovieDTO } from '../../other/models/movie/movieDTO.interface';
import { MovieCommentDTO } from '../../other/models/movie-comment/movieCommentDTO.interface';
import { ReservationDTO } from '../../other/models/reservation/reservationDTO.interface';

@Component({
  selector: 'user-detail-panel',
  templateUrl: './user-detail-panel.component.html',
  styleUrl: './user-detail-panel.component.css'
})
export class UserDetailPanelComponent implements OnChanges {


  @Input("user")
  user?: User | UserDTO;
  userComments: MovieCommentDTO[] = [];
  
  faStar = faStar;

  constructor(private userService: UserService, private reservationService: ReservationService, private commentService: CommentService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    
    if(this.user !== undefined) {
      // console.log(this.user);

      this.loadUserWatchedMovies();
      this.loadUserBookmarks();
      this.loadUserReservations();
      this.loadUserComments();
      
    }
    

  }

  private loadUserWatchedMovies() {

    // Load User Watched Movies
    this.userService.getUserWatchedMovies((this.user as User).id).subscribe((watchedMoviesResponse: MovieDTO[]) => {

      ((this.user as UserDTO).watchedMovies as MovieDTO[]) = watchedMoviesResponse;
      
    }, (error: Response) => {

      if(error.status === 404) {
        console.error(error);
        return;
      }

      console.error(error);
      alert("Unexpected Error Occured.");

    });
    
  }

  private loadUserBookmarks() {

    if(this.user === undefined) {
      return;
    }

    // Load User Bookmarks
    this.userService.getUserBookmarks((this.user as User)?.id).subscribe((bookmarkMoviesResponse: MovieDTO[]) => {
          
      ((this.user as UserDTO).bookmarks as MovieDTO[]) = bookmarkMoviesResponse;
      // console.log(this.user?.bookmarks);
      

    }, (error: Response) => {

      if(error.status === 404) {
        console.error(error);
        return;
      }

      console.error(error);
      alert("Unexpected Error Occured.");

    });
    
  }

  private loadUserReservations() {

    // Load Reservations
    this.reservationService.getUserReservations((this.user as User).id).subscribe((userReservations: ReservationDTO[]) => {

      ((this.user as UserDTO).reservations as ReservationDTO[]) = userReservations;

      // console.log(this.user?.reservations);
      
      
    }, (error: Response) => {

      if(error.status === 404) {
        console.error(error);
        return;
      }

      console.error(error);
      alert("Unexpected Error Occured.");

    });

  }

  private loadUserComments() {

    // Load User Comments
    this.commentService.getUserComments((this.user as User).id).subscribe((userComments: MovieCommentDTO[]) => {
        
      this.userComments = userComments;
      // console.log(this.userComments);
      

    }, (error: Response) => {
      
      if(error.status === 404) {
        console.error(error);
        return;
      }

      console.error(error);
      alert("Unexpected Error Occured.");
    });

  }

}
