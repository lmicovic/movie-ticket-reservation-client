import { UserService } from './../../../services/user/user.service';
import { Component, OnInit, ElementRef, Renderer2, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../../other/models/movie/movie.class';
import { MovieService } from '../../../services/movie/movie.service';
import { combineLatest, Observable } from 'rxjs';
import { Day, MovieGenre } from '../../../other/enums';
import { Projection } from '../../../other/models/projection/projection.class';
import { ProjectionService } from '../../../services/projection/projection.service';
import { Util } from '../../../other/util.class';
import { ToastrService } from 'ngx-toastr';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { Reservation } from '../../../other/models/reservation/reservation.class';
import { User } from '../../../other/models/user/user.class';
import { ReservationService } from '../../../services/reservation/reservation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MovieDTO } from '../../../other/models/movie/movieDTO.interface';
import { ProjectionDTO } from '../../../other/models/projection/projectionDTO.interface';
import { UserDTO } from '../../../other/models/user/userDTO.interface';



@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrl: './buy-ticket.component.css'
})
export class BuyTicketComponent implements OnInit, OnChanges{

  movie: MovieDTO = new Movie(-1, "", MovieGenre.Action, "", -1, "", [], [], -1, "", -1, "");                // Movie related to this Component - gets value from home.component.html;
  movieProjection: ProjectionDTO | undefined;

  
  selectedDate: boolean = false;  
  selectedDay: Day = Day.Monday;
  
  totalPrice: number | undefined = 0;

  // ---------------------------------
  // Test - Delete This
  // ---------------------------------
  seatRow = Array(10).fill(0);
  seatCol = Array(10).fill(0);
  // ---------------------------------

  reservedSeats: number[] = [];

  user: UserDTO | undefined = undefined;

  constructor(private movieService: MovieService, private projectionService: ProjectionService, private userService: UserService, private reservationService: ReservationService, private ref: ElementRef, private renderer: Renderer2, private router: ActivatedRoute, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    
    
    let movieIdTmp: string | Number | null = this.router.snapshot.paramMap.get("movieId");
    let projectionIdTmp: string | Number | null = this.router.snapshot.queryParamMap.get("reservationId");
    
    let movieId: Number;
    let projectionId: Number;

    if(projectionIdTmp === null) {

      let i = 0;
      let movieIdValue: string = "";
      while(i < (movieIdTmp as string).length) {
        
        if((movieIdTmp as string)[i] === '0' || (movieIdTmp as string)[i] === '1' || (movieIdTmp as string)[i] === '2' || (movieIdTmp as string)[i] === '3' || (movieIdTmp as string)[i] === '4'
           || (movieIdTmp as string)[i] === '5' || (movieIdTmp as string)[i] === '6' || (movieIdTmp as string)[i] === '7' || (movieIdTmp as string)[i] === '8' || (movieIdTmp as string)[i] === '9' || (movieIdTmp as string)[i] === '0') {

            movieIdValue += (movieIdTmp as string)[i];
            i++;
            continue;

        }

        break;
      }

      
      let eq = false;
      let projectionIdValue = "";
      while(i < (movieIdTmp as string).length) {

        if((movieIdTmp as string)[i] === "=") {
          eq = true;
          i++;
          continue;
        }

        if(eq === true) {
          projectionIdValue += (movieIdTmp as string)[i];
          i++;
          continue;
        }

        i++;

      }

      
      
      movieIdTmp = movieIdValue;
      projectionIdTmp = projectionIdValue;
      
      
    }

    movieId = new Number((movieIdTmp));
    projectionId = new Number(projectionIdTmp);

    
    
    

    
    
    

    


    

    // If reservationId is not Provided
    if(projectionId.valueOf() === 0 || projectionId.valueOf() === undefined || projectionId.valueOf() === null) {
      this.selectedDate = false;
    }
    // If reservationId is provided
    else {
      this.selectedDate = true;
    }

    
    console.log(movieId);
    console.log(projectionId);
    
    

    // Load Movie
    combineLatest(this.movieService.getById(movieId), this.movieService.getMovieImage(movieId)).subscribe((response) => {
      
      this.movie = response[0];
      this.movie.image = URL.createObjectURL(response[1]);

      // Get Projetion by Id
      if(this.selectedDate === true) {
        this.projectionService.getById(projectionId).subscribe((projectionResponse: ProjectionDTO | undefined) => {
          
          if(projectionResponse !== undefined || projectionResponse !== null) {
            
            this.movieProjection = projectionResponse;

            (this.movieProjection as Projection).time = new Date(2024, 2, Util.translateDay("" + this.movieProjection?.projectionDate.day), this.movieProjection?.projectionDate.hours, this.movieProjection?.projectionDate.minutes);
            this.totalPrice = this.movieProjection?.price;

            this.projectionService.getProjectionsSelectedSeats(this.movieProjection?.id as number).subscribe((response) => {
              this.reservedSeats = response;

              this.initSeatSelection();

            });

          }
          
        });
      }

    //--------------------------------------------------------------------------------------------------------------------------------
    // Panel Component - Initialized Selected Day - Style
    //--------------------------------------------------------------------------------------------------------------------------------
    this.initSelectedDay();
    //--------------------------------------------------------------------------------------------------------------------------------
    // Panel Component - Initialized Selected Day - Style - END
    //--------------------------------------------------------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------------------------------------------------------
    // Seat Selection - Initialized Seat Selection Table
    //--------------------------------------------------------------------------------------------------------------------------------
    // this.initSeatSelection();
    //--------------------------------------------------------------------------------------------------------------------------------
    // Seat Selection - Initialized Seat Selection Table - END
    //--------------------------------------------------------------------------------------------------------------------------------

      
    }); 
    

    
    
    

    
    

  }

  initSelectedDay() {

    if(this.selectedDate === false) {
      
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
    }

  }


  ticketIncrement(element: any) {

    let ticketCount = element.value;

    if(ticketCount > 4) {
      return;
    }

    element.value = Number(ticketCount) + 1;
    
    this.totalPrice = (this.movieProjection?.price as number) * element.value;    
   
    this.resetSelectedSeats();

  }

  ticketDecrement(element: any) {
    
    let ticketCount = element.value;

    if(ticketCount < 2) {
      return;
    }

    element.value = Number(ticketCount) - 1;
    
    this.totalPrice = (this.movieProjection?.price as number) * element.value;    

    this.resetSelectedSeats();

  }

  private resetSelectedSeats() {

    let seats = document.getElementsByClassName("seat-icon");
    for(let i = 0; i < seats.length; i++) {
      if((seats[i].children[0] as HTMLElement).style.fill === "green") {
        (seats[i].children[0] as HTMLElement).style.fill = "gray";
      }
    }

  }

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
        break
      case "wednesday":
       this.selectedDay = Day.Wednesday;
        break
      case "thursday":
        this.selectedDay = Day.Thursday;
       break
      case "friday":
        this.selectedDay = Day.Friday;
        break
      case "saturday":
       this.selectedDay = Day.Saturday;
       break
      case "sunday":
       this.selectedDay = Day.Sunday;
        break
        
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

  selectedDateError: boolean = false;
  selectedSeatsError: boolean = false;


  reserveTicket() {

    
    
    //-------------------------------------------------
    // Form Validation
    //-------------------------------------------------
    
    // Not selected Date - Show Error in Form
    if(this.selectedDate === false) {      
      this.selectedDateError = true;
      return;
    }
    else if(this.selectedDate === true) {
      this.selectedDateError = false;
    }


    // Get Selected Seats - count selected seats
    let seatCount: number = +(document.getElementById("movie-ticket-number") as HTMLInputElement).value;
    let seatIcon = document.getElementsByClassName("seat-icon");
    let selectedSeats: number[] = [];
    for(let i = 0; i < seatIcon.length; i++) {
      
      if((seatIcon[i].children[0] as HTMLElement).style.fill === "green") {
        selectedSeats.push(+(seatIcon[i] as HTMLElement).title);
        
        
      }

    }

    // Show Selected Seats Error in Form
    if(selectedSeats.length === 0) {
      this.selectedSeatsError = true;
      return;
    }
    else {
      this.selectedSeatsError = false;
    }


    // Show Toastr Error
    if(selectedSeats.length < seatCount) {
      
      this.toastr.info("Select more " + ((seatCount - selectedSeats.length) < 2 ? (seatCount - selectedSeats.length) + " seat." : (seatCount - selectedSeats.length) + " seats."), "", {
        positionClass: "toast-top-left",
      });
      return;
      
    }
    //-------------------------------------------------
    // Form Validation - END
    //-------------------------------------------------


    


    //-------------------------------------------------
    // Reserve Ticket
    //-------------------------------------------------
    
    this.userService.getById(1).subscribe((response) => {

      this.user = response;
      
      console.log(selectedSeats);
      
      
      let ticketCount = +(document.getElementById("movie-ticket-number") as HTMLInputElement).value;
      let totalPrice = +((document.getElementById("movie-price") as HTMLInputElement).value.substring(0, +(document.getElementById("movie-price") as HTMLInputElement).value.length-1));

      let reservation = new Reservation(undefined, this.user, (this.movieProjection as Projection), ticketCount, selectedSeats, totalPrice, new Date());
      this.reservationService.save(reservation).subscribe((response) => {

        // Reservation Object
        console.log(response);

        this.toastr.info("Successfully reserved ticket.", "", {
          positionClass: "toast-top-left",
        });

        setTimeout(() => {

            // Redirect to MovieInformation Component
            window.location.href = "http://localhost:4200/movie/" + this.movie.id;

        }, 1000);

        

        

      }, (error: HttpErrorResponse) => {
        
        if(error.status === 406) {
          this.toastr.warning("", error.error, {
            positionClass: "toast-top-left",
          })
        }

        console.error(error.error);
      });

    });

  }

  injectMovieProjectionValues(selectedProjection: Projection) {


    this.movieProjection = selectedProjection;
    this.totalPrice = this.movieProjection.price;

    this.ref.nativeElement.querySelector("#movie-ticket-number").value = 1;    

    this.selectedDate = true;
    this.selectedDateError = false;

    // console.log(this.movieProjection);
    this.initSeatSelection();


  }

  ngOnChanges(changes: SimpleChanges): void {
    
    
    
    
    
    

    

  }  

  numberOfSeats: number  = 0;
  numberOfRows: number = -1;
  numberOfRColumns: number = -1;
  initSeatSelection() {
    
    
    

    this.numberOfSeats = (this.movieProjection?.room.rows as number) * (this.movieProjection?.room.columns as number);
    this.numberOfRows = (this.movieProjection?.room.rows as number);
    this.numberOfRColumns = (this.movieProjection?.room.columns as number);
    
    


    // Wait to render - seat-selection-container
    // while(true) {

    //   if(this.ref.nativeElement.querySelector("seat-selection-container") !== undefined) {
    //     break;
    //   }

    // }

    // Inject seats in html
    

    let result = "";    // HTML
    let element: Element = this.ref.nativeElement.querySelector(".seat-selection-table-body");
    
    this.projectionService.getProjectionsSelectedSeats((this.movieProjection?.id as number)).subscribe((responseSelectedSeats) => {
      
      
          this.reservedSeats = responseSelectedSeats;
          
          // <svg style="width: 70px;height: margin-right: 0px; margin-bottom: 35px; 70px; fill: gray;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M288.02414 256c0-59 32.4-110 80-137.8V512h96V96h96v416h96V118.2c47.6 27.8 80 78.8 80 137.8v256h96V256C832.02414 114.6 717.42414 0 576.02414 0h-128C306.62414 0 192.02414 114.6 192.02414 256v256h96z m668.6 427.8l-21.4-64c-8.8-26.2-33.2-43.8-60.8-43.8H149.42414c-27.6 0-52 17.6-60.8 43.8l-21.4 64C53.62414 725.2 84.42414 768 128.02414 768v224c0 17.6 14.4 32 32 32h64c17.6 0 32-14.4 32-32V768h512v224c0 17.6 14.4 32 32 32h64c17.6 0 32-14.4 32-32V768c43.6 0 74.4-42.8 60.6-84.2z"></svg>

          let seatNumber = 1;
          let seatColor = "gray";
          for(let row = 0; row < this.numberOfRows; row++) {

            result += "<tr class='seat-selection-row' style='text-align: center'>";

            
            for(let col = 0; col < this.numberOfRColumns; col++, seatNumber++) {

              if(this.reservedSeats.includes(seatNumber)) {
                seatColor = "red";
              }
              else {
                seatColor = "gray";
              }

              if((col % 4 === 0 && col > 0 && col !== this.numberOfRColumns-1) && (row % 2 === 0 && row > 0 && row !== this.numberOfRows-1)) {
                result += "<td id='seat-" + seatNumber +"' class='seat-icon' style='text-align: center; padding-right: 50px; padding-top: 50px '>" + '<svg style="width: 70px;height: 70px; padding: 0px; margin-bottom: 35px; fill: ' + seatColor + ';" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M288.02414 256c0-59 32.4-110 80-137.8V512h96V96h96v416h96V118.2c47.6 27.8 80 78.8 80 137.8v256h96V256C832.02414 114.6 717.42414 0 576.02414 0h-128C306.62414 0 192.02414 114.6 192.02414 256v256h96z m668.6 427.8l-21.4-64c-8.8-26.2-33.2-43.8-60.8-43.8H149.42414c-27.6 0-52 17.6-60.8 43.8l-21.4 64C53.62414 725.2 84.42414 768 128.02414 768v224c0 17.6 14.4 32 32 32h64c17.6 0 32-14.4 32-32V768h512v224c0 17.6 14.4 32 32 32h64c17.6 0 32-14.4 32-32V768c43.6 0 74.4-42.8 60.6-84.2z"></svg>' + "</td>";  
                continue;
              }

              if(col % 4 === 0 && col > 0 && col !== this.numberOfRColumns-1) {
                result += "<td id=seat-'" + seatNumber +"' class='seat-icon' title='" + seatNumber + "' style='text-align: center; padding-right: 50px '>" + '<svg style="width: 70px;height: 70px; padding: 0px; margin-bottom: 35px; fill: ' + seatColor + ';" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M288.02414 256c0-59 32.4-110 80-137.8V512h96V96h96v416h96V118.2c47.6 27.8 80 78.8 80 137.8v256h96V256C832.02414 114.6 717.42414 0 576.02414 0h-128C306.62414 0 192.02414 114.6 192.02414 256v256h96z m668.6 427.8l-21.4-64c-8.8-26.2-33.2-43.8-60.8-43.8H149.42414c-27.6 0-52 17.6-60.8 43.8l-21.4 64C53.62414 725.2 84.42414 768 128.02414 768v224c0 17.6 14.4 32 32 32h64c17.6 0 32-14.4 32-32V768h512v224c0 17.6 14.4 32 32 32h64c17.6 0 32-14.4 32-32V768c43.6 0 74.4-42.8 60.6-84.2z"></svg>' + "</td>";  
                continue;
              }

              if(row % 2 === 0 && row > 0 && row !== this.numberOfRows-1) {
                result += "<td id='seat-" + seatNumber +"' class='seat-icon' title='" + seatNumber + "' style='text-align: center; padding-top: 50px '>" + '<svg style="width: 70px;height: 70px; padding: 0px; margin-bottom: 35px; fill: ' + seatColor + ';" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M288.02414 256c0-59 32.4-110 80-137.8V512h96V96h96v416h96V118.2c47.6 27.8 80 78.8 80 137.8v256h96V256C832.02414 114.6 717.42414 0 576.02414 0h-128C306.62414 0 192.02414 114.6 192.02414 256v256h96z m668.6 427.8l-21.4-64c-8.8-26.2-33.2-43.8-60.8-43.8H149.42414c-27.6 0-52 17.6-60.8 43.8l-21.4 64C53.62414 725.2 84.42414 768 128.02414 768v224c0 17.6 14.4 32 32 32h64c17.6 0 32-14.4 32-32V768h512v224c0 17.6 14.4 32 32 32h64c17.6 0 32-14.4 32-32V768c43.6 0 74.4-42.8 60.6-84.2z"></svg>' + "</td>";  
                continue;
              }        

              result += "<td id='seat-" + seatNumber +"' class='seat-icon' title='" + seatNumber + "' text-align: center;'>" + '<svg style="width: 70px; height: 70px; padding: 0; margin-bottom: 35px; fill: ' + seatColor + ';" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M288.02414 256c0-59 32.4-110 80-137.8V512h96V96h96v416h96V118.2c47.6 27.8 80 78.8 80 137.8v256h96V256C832.02414 114.6 717.42414 0 576.02414 0h-128C306.62414 0 192.02414 114.6 192.02414 256v256h96z m668.6 427.8l-21.4-64c-8.8-26.2-33.2-43.8-60.8-43.8H149.42414c-27.6 0-52 17.6-60.8 43.8l-21.4 64C53.62414 725.2 84.42414 768 128.02414 768v224c0 17.6 14.4 32 32 32h64c17.6 0 32-14.4 32-32V768h512v224c0 17.6 14.4 32 32 32h64c17.6 0 32-14.4 32-32V768c43.6 0 74.4-42.8 60.6-84.2z"></svg>' + "</td>";  

            }

            result += "</tr>"

          }

          element.innerHTML = result;
          
          // CSS - add on hover cursor: pointer
          let seatIcons = document.getElementsByClassName("seat-icon");
          for(let seat = 0; seat < seatIcons.length; seat++) {
            (seatIcons[seat] as HTMLElement).style.cursor = "pointer";
            (seatIcons[seat] as HTMLElement).onclick=this.selectSeat;
          }



          // 



    });
    

    

    
  }

  
  

  

  selectSeat($event :any) {
    
    $event.stopPropagation();

    let seat = (($event.currentTarget as HTMLElement).children[0] as HTMLElement);
    let selectSeatCount = +(document.getElementById("movie-ticket-number") as HTMLInputElement).value;
    
    
    // Count Selected Seats
    let seatIcons = document.getElementsByClassName("seat-icon");
    let selectedSeats = 0;
    for(let i = 0; i < seatIcons.length; i++) {
      if(((seatIcons[i] as HTMLElement).children[0] as HTMLElement).style.fill === "green") {
        selectedSeats++;
      }
    }
    
    if(seat.style.fill === "green") {
      seat.style.fill = "gray";
    }

    if(selectedSeats > selectSeatCount-1) {
      return;
    }

    if(seat.style.fill === "gray") {
      seat.style.fill = "green";
    }
    else if(seat.style.fill === "red") {
      alert("This seat is already reserved.")          
    }

  }



}
