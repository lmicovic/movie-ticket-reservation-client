import { UserService } from './../../../../services/user/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { MovieComment } from '../../../../other/models/movie-comment/movieComment.class';
import { User } from '../../../../other/models/user/user.class';
import { Movie } from '../../../../other/models/movie/movie.class';
import { MovieGenre } from '../../../../other/enums';
import { UserInfo } from '../../../../other/models/user/userInfo.class';
import { MovieCommentDTO } from '../../../../other/models/movie-comment/movieCommentDTO.interface';
import { Router } from '@angular/router';



@Component({
  selector: 'user-comment',
  templateUrl: './user-comment.component.html',
  styleUrl: './user-comment.component.css'
})
export class UserCommentComponent implements OnInit{
  
  user: User = new User(-1, "", new UserInfo(-1, "", "", "", "", ""), [], [], []);  
  movie: Movie = new Movie(-1, "", MovieGenre.Action, "", -1, "", [], [], -1, "", -1, "");

  @Input("comment")
  userComment: MovieCommentDTO = new MovieComment(-1, this.user, this.movie, new Date(), -1, "");

  faStar = faStar;

  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit(): void {    

    this.userService.getUserImage(this.userComment.user.id).subscribe((response) => {

      this.userComment.user.image = URL.createObjectURL(response);

    }, (error: Response) => {

      if(error.status === 404) {
        alert("User with id: " + this.userComment.user.id + " is not found."); 
        return;
      }
      else {
        alert("Unexpected Error Occured.");
        console.error(error);
        return;
      }

    });
    

  }

  onUserCommentClick(userId: number) {

    this.router.navigate(["/user/preview/" + userId]);

  }

}
