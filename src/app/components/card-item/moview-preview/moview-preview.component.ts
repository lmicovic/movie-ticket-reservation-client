import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, input } from '@angular/core';
import { Movie } from '../../../other/models/movie/movie.class';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieGenre } from '../../../other/enums';
import { UserService } from '../../../services/user/user.service';
import { MovieDTO } from '../../../other/models/movie/movieDTO.interface';
import { AuthService } from '../../../services/auth-service/auth-service.service';
import { UserDTO } from '../../../other/models/user/userDTO.interface';

@Component({
  selector: 'moview-preview',
  templateUrl: './moview-preview.component.html',
  styleUrl: './moview-preview.component.css'
})
export class MoviewPreviewComponent implements OnInit {

  @Input("zoomEffect")
  zoomEffect: boolean = false;            // Boolean - for implementing Zoom Effect on Hover in MoviePreviewComponent
  
  @Input("ratingEffect")
  ratingEffect: boolean = false;          // Boolean - from implementing Rating Fadding Effect on Hover in MoviePreviewComponent

  @Input("bookmarkEffect")
  bookmarkEffect: boolean = false;        // Boolean - from implementing Bookmark Icon Fadding Effect on Hover in MoviePreviewComponent

  @Input("componentWidth")
  componentWidth: number = 100;           // CSS: width

  @Input("componentFontSize")
  componentFontSize:number = 18;          // CSS: font-size

  @Input("movie")
  movie: MovieDTO = new Movie(-1, "", MovieGenre.Action, "", -1, "", [], [], -1, "", -1, "");                // Movie related to this Component - gets value from home.component.html

  @Output("bookmarkedMovie")
  bookmarkedMovie = new EventEmitter<MovieDTO>();

  bookmarked: boolean = false;             // Boolean - used to determine if Movie is Bookmarked or not



  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private ref: ElementRef, private renderer: Renderer2, private userService: UserService){
    
  }


  ngOnInit(): void {

    //--------------------------------------------------------------------------------------------------------------------------------
    // Component Style
    //--------------------------------------------------------------------------------------------------------------------------------
    // Component - CSS: widh
    let component = this.ref.nativeElement.querySelector(".recommended-moview-preview");
    this.renderer.setStyle(component, 'width', this.componentWidth + "%");

    // Component - CSS: font-size
    component = this.ref.nativeElement.querySelector(".movie-rating-value");
    this.renderer.setStyle(component, "font-size", this.componentFontSize -2 + "px")
    //--------------------------------------------------------------------------------------------------------------------------------
    // Component Style - END
    //--------------------------------------------------------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------------------------------------------------------
    // Check if Movie is Bookmarked for Current Logged User
    //--------------------------------------------------------------------------------------------------------------------------------
    this.checkMovieBookmarked();

} 

  //--------------------------------------------------------------------------------------------------------------------------------
  // Check if Movie is Bookmarked for Current Logged User
  //--------------------------------------------------------------------------------------------------------------------------------
  checkMovieBookmarked() {

    let currentUser: UserDTO | null = this.authService.getCurrentUser();

    // If no User is logged In
    if(currentUser === null || this.authService.isLoggedIn() === false) {
      this.bookmarked = false;
    }
    // If User is Logged in and if User is Bookmarked Movie then show that Movie is Bookmarked
    else if(currentUser !== null || this.authService.isLoggedIn() === true) {
      
      this.userService.getUserBookmarks(currentUser.id).subscribe((bookmarks: MovieDTO[]) => {

        let flag: boolean = false;
        for (let i = 0; i < bookmarks.length; i++) {
          if(this.movie.id === bookmarks[i].id) {
            flag = true;
            break;
          }
        }

        if(flag === true) {
          this.bookmarked = true;
        }
        else if(flag === false) {
          this.bookmarked = false;
        }

      }, (error: Response) => {
        console.error(error);
      });

    }
    

  }
  //--------------------------------------------------------------------------------------------------------------------------------

  // Detects onHover Event on Movie Image, and apply specific Fadding Effects to Rating and Bookmark Icons
  onImageHover(rating: HTMLElement, bookmark: HTMLElement, focus: boolean) {

    if(bookmark.classList.contains('bookmark-not-visible')) {
      if(focus === true) {
        bookmark.style.opacity = '1';  
      }
      else if(focus === false) {
        bookmark.style.opacity = '0';
      }
    }

    if(rating.classList.contains("recomended-movies-image-rating-container-not-visible")) {
      if(focus === true) {
        rating.style.opacity = '1';
      }
      else if(focus === false) {  
        rating.style.opacity = '0';
      }   
    }

  }

  // onClick - on Bookmark Image, switches Bookamark Icon
  onBookmark($event: Event) {

    $event.stopPropagation();
    

    if(this.authService.isLoggedIn() === false) {
      this.router.navigate(["/login"]);
    }

    
    // Bookmark this movie to user
    
    //------------------------    
    // Test - DELETE
    //------------------------    
    
    let currentUser: UserDTO | null = this.authService.getCurrentUser();


    // Add Movie to Current User Bookmarks
    if(this.bookmarked === false) {
      this.userService.addMovieToUserBookmarks((currentUser as UserDTO).id , (this.movie.id as number)).subscribe((response) => {
        console.log(response);
      });
    }
    // Remove Movie from Bookmarks
    else if(this.bookmarked === true) {
      this.userService.removeMovieToUserBookmarks((currentUser as UserDTO).id, (this.movie.id as number)).subscribe((userBookmarkMovies: MovieDTO[]) => {

        (currentUser as UserDTO).bookmarks = userBookmarkMovies;
        this.authService.saveCurrentUser(currentUser as UserDTO);

      }, (error) => {
        console.error(error);
      })
    }
    

    this.bookmarked = !this.bookmarked;

  } 

  

}
