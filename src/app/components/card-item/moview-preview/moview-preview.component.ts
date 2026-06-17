import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, input } from '@angular/core';
import { Movie } from '../../../other/models/movie/movie.class';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieGenre } from '../../../other/enums';
import { UserService } from '../../../services/user/user.service';
import { MovieDTO } from '../../../other/models/movie/movieDTO.interface';
import { AuthService } from '../../../services/auth-service/auth-service.service';
import { UserDTO } from '../../../other/models/user/userDTO.interface';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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

  @Input("useFakePoster")
  useFakePoster: boolean = false;         // When true, always show a generated mock poster (ignores movie.image)

  @Input("movie")
  movie: MovieDTO = new Movie(-1, "", MovieGenre.Action, "", -1, "", [], [], -1, "", -1, "");                // Movie related to this Component - gets value from home.component.html

  @Output("bookmarkedMovie")
  bookmarkedMovie = new EventEmitter<MovieDTO>();

  bookmarked: boolean = false;             // Boolean - used to determine if Movie is Bookmarked or not

  // Cache for the generated fake poster (rebuilt only when the title changes)
  private fallbackPosterCache: { key: string; uri: SafeUrl } | null = null;

  // Image used by the card: the real movie image when present, otherwise a generated fake poster.
  // When useFakePoster is set, always use the generated poster (e.g. to ignore a backend "No Image" placeholder).
  get displayImage(): string | SafeUrl {
    const image = this.movie?.image;
    if (!this.useFakePoster && image !== undefined && image !== null && image !== '') {
      return image;
    }
    return this.getFallbackPoster();
  }



  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private ref: ElementRef, private renderer: Renderer2, private userService: UserService, private sanitizer: DomSanitizer){
    
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


  // If the real image fails to load, clear it so a generated fake poster is shown instead
  onImgError(): void {
    if (this.movie) {
      this.movie.image = '';
    }
  }

  // Returns a generated fake poster for the current movie (cached per title).
  // Marked trusted because Angular's sanitizer otherwise blocks data:image/svg+xml URLs.
  private getFallbackPoster(): SafeUrl {
    const title = (this.movie?.title || '').trim() || 'Coming Soon';

    if (this.fallbackPosterCache && this.fallbackPosterCache.key === title) {
      return this.fallbackPosterCache.uri;
    }

    const uri = this.sanitizer.bypassSecurityTrustUrl(this.buildFallbackPoster(title));
    this.fallbackPosterCache = { key: title, uri };
    return uri;
  }

  // Builds a 2:3 gradient poster (with a play glyph + title) as an inline SVG data-URI
  private buildFallbackPoster(title: string): string {

    const palettes = [
      ['#4f6ef7', '#7b5cff'], ['#f7656e', '#a14bff'], ['#23a6d5', '#23d5ab'],
      ['#ff7e5f', '#feb47b'], ['#3a1c71', '#d76d77'], ['#11998e', '#38ef7d'],
      ['#8e2de2', '#4a00e0'], ['#ff512f', '#dd2476']
    ];

    let hash = 0;
    for (let i = 0; i < title.length; i++) {
      hash += title.charCodeAt(i);
    }
    const [c1, c2] = palettes[hash % palettes.length];

    const tspans = this.wrapText(title, 16)
      .slice(0, 3)
      .map((line, i) => `<tspan x="200" dy="${i === 0 ? 0 : 34}">${this.escapeXml(line)}</tspan>`)
      .join('');

    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600">` +
        `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
          `<stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>` +
        `</linearGradient></defs>` +
        `<rect width="400" height="600" fill="url(#g)"/>` +
        `<circle cx="200" cy="232" r="62" fill="rgba(255,255,255,0.16)"/>` +
        `<path d="M184 204 l40 28 l-40 28 z" fill="#ffffff"/>` +
        `<text x="200" y="420" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="700" fill="#ffffff">${tspans}</text>` +
        `<text x="200" y="552" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="14" letter-spacing="3" fill="rgba(255,255,255,0.8)">POPCORNPASS</text>` +
      `</svg>`;

    return 'data:image/svg+xml,' + encodeURIComponent(svg);
  }

  // Splits a title into lines no longer than maxChars (word-aware)
  private wrapText(text: string, maxChars: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let current = '';

    for (const word of words) {
      if (current !== '' && (current + ' ' + word).length > maxChars) {
        lines.push(current);
        current = word;
      } else {
        current = current === '' ? word : current + ' ' + word;
      }
    }
    if (current !== '') {
      lines.push(current);
    }

    return lines.length ? lines : [text];
  }

  private escapeXml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

}
