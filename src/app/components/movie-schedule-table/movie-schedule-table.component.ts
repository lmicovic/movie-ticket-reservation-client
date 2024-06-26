import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Day, MovieGenre } from '../../other/enums';
import { Movie } from '../../other/models/movie/movie.class';
import { MovieScheduleByDays } from '../../other/models/movie-schedule/movieScheduleByDay.interface';
import { ProjectionService } from '../../services/projection/projection.service';
import { Projection } from '../../other/models/projection/projection.class';
import { Util } from '../../other/util.class';
import { MovieDTO } from '../../other/models/movie/movieDTO.interface';
import { ProjectionDTO } from '../../other/models/projection/projectionDTO.interface';
import { fade, fadeIn } from '../../other/animations/fade.animation';
import { transition, trigger, useAnimation } from '@angular/animations';




@Component({
  selector: 'movie-schedule-table',
  templateUrl: './movie-schedule-table.component.html',
  styleUrl: './movie-schedule-table.component.css',
  animations: [

    trigger("fade", [

      transition(":enter", [
        useAnimation(fadeIn)
      ], {
        params: {
          duration: "200ms"
        }
      })

    ])
  ]
})
export class MovieScheduleTableComponent implements OnInit, OnChanges {
  
  @Input("movie")
  movie: MovieDTO = new Movie(-1, "", MovieGenre.Action, "", -1, "", [], [], new Date().getFullYear(), "", -1, "");

  @Input("selectedDay")
  selectedDay: Day = Day.Monday;    // Get selected Day from MovieInformation.html
  
  // reservationPanel - true - only when rendered from Reservation Panel in buy-ticket.component.html
  @Input("reservationPanel")
  reservationPanel: boolean = false;

  @Output("projectionReservation")
  projectionReservation = new EventEmitter();

  movieProjections: ProjectionDTO[] = [];
  
  movieScheduleFilteredByDays: MovieScheduleByDays = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    satruday: [],
    sunday: []
  }

  // Ovde se nalazi raspored filma filtriran po danima
  emptySchedule: boolean = true;
  flag: boolean = false;
  
  // Used for Sorting MovieSchedue Table
  lastSortedByField: string = "time";
  ascendingOrder: boolean = true;

  


  

  constructor(private projectionService: ProjectionService) {
  }
  

  ngOnInit(): void {
  
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    
    // Load Movies Projections
    if(changes["movie"] !== undefined && changes["movie"].firstChange === false) {
      this.loadMovieProjections();
      
    }
    

    // Ako se promeni selektovani dan u Panelu - u movie-information-schedule-panel-u,
    // onda je potrebno promeniti Tabelu u kojoj se priklazaju zakazane Projekcije filmova za taj dan.
    if(changes["selectedDay"] !== undefined) {
      // Ovo se poziva svaki put kada se promeni vrednost this.selectedDay
      // ...
      this.checkEmptyDays();                // Proverava da li posaoji dan u nedelji kada ne postoji raspored za Projekciju.

    }

  }

  private loadMovieProjections(): void {

    this.projectionService.getMovieProjections((this.movie.id as number)).subscribe((response) => {

      this.movieProjections = response;

      // console.log(this.movieProjections);
      

      // Convert Response to Projection
      let projection: Projection;
      
      for(let i = 0; i < response.length; i++) {

        let day = Util.translateDay(this.movieProjections[i].projectionDate.day.toString());
        this.movieProjections[i].time = new Date(2024, 2, day, this.movieProjections[i].projectionDate.hours, this.movieProjections[i].projectionDate.minutes);
      
        
      }

      if(this.movieProjections.length === 0) {
        this.emptySchedule = true;
      } 
      else if(this.movieProjections.length > 0) {
        this.emptySchedule = false;
      } 

      if(this.emptySchedule === false) {
        this.sortMovieScheduleByDays();
      }
      
      
      


    }, (error: Response) => {

      if(error.status === 404) {
        alert("Movie with id: " + this.movie.id + " is not found."); 
      }

    });

  }

  private sortMovieScheduleByDays() {

    if(this.selectedDay !== undefined || null) {

      for(let i = 0; i < this.movieProjections.length; i++) {

        try {
          
          switch (this.movieProjections[i].projectionDate.day.toString()) {
            case "Monday":
              this.movieScheduleFilteredByDays["monday"].push(this.movieProjections[i]);
              break;
            case "Thuesday":
              this.movieScheduleFilteredByDays["tuesday"].push(this.movieProjections[i]);
              break;
            case "Wednesday":
              this.movieScheduleFilteredByDays["wednesday"].push(this.movieProjections[i]);
              break;
            case "Thursday":
              this.movieScheduleFilteredByDays["thursday"].push(this.movieProjections[i]);
              break;
            case "Friday":
              this.movieScheduleFilteredByDays["friday"].push(this.movieProjections[i]);
              break;  
            case "Saturday":
              this.movieScheduleFilteredByDays["satruday"].push(this.movieProjections[i]);
              break; 
            case "Sunday":
              this.movieScheduleFilteredByDays["sunday"].push(this.movieProjections[i]);
              break; 
            default:
              throw new Error("Wrong Day: " + this.movieProjections[i].projectionDate.day.toString());
  
          }

        } catch (error) {
          console.error(error);
        }

      }
    }

  }

  checkEmptyDays() {

    if(this.selectedDay !== undefined) {
      // Ovo se poziva svaki put kada se promeni vrednost this.selectedDay      
      if( (this.selectedDay == Day.Monday && this.movieScheduleFilteredByDays.monday.length <= 0) ||
          (this.selectedDay == Day.Thuesday && this.movieScheduleFilteredByDays.tuesday.length <= 0) || 
          (this.selectedDay == Day.Wednesday && this.movieScheduleFilteredByDays.wednesday.length <= 0) || 
          (this.selectedDay == Day.Thursday && this.movieScheduleFilteredByDays.thursday.length <= 0) || 
          (this.selectedDay == Day.Friday && this.movieScheduleFilteredByDays.friday.length <= 0) || 
          (this.selectedDay == Day.Saturday && this.movieScheduleFilteredByDays.satruday.length <= 0) || 
          (this.selectedDay == Day.Sunday && this.movieScheduleFilteredByDays.sunday.length <= 0)
      ) {

        this.emptySchedule = true;

      }
      else {
        this.emptySchedule = false;
      }      
    }

  }

  // Sorting Movie Table by selected Column
  sortTable(columnName: string) {

    let day:any = "";
    try { 
      switch (this.selectedDay) {
        // Monday
        case 1:
          day = "monday";
          break;
        case 2:
          day = "tuesday";
          break;
        case 3:
          day = "wednesday";
          break;
        case 4:
          day = "thursday";
          break;
        case 5:
        day = "friday";
          break;
          case 6:
        day = "saturday";
          break;
        case 0:
          day = "sunday";
          break;
        default:
          throw new Error("Wrong day name: " + day);
          break;
      }
    } catch (error) {
      console.error(error);
    }
    
    if(this.lastSortedByField === columnName) {
      this.ascendingOrder = !this.ascendingOrder;
    }
    else {
      this.lastSortedByField = columnName;
      this.ascendingOrder = true;
    }

    if(this.ascendingOrder) {
      this.movieScheduleFilteredByDays[day as keyof MovieScheduleByDays] = this.movieScheduleFilteredByDays[day as keyof MovieScheduleByDays].sort((a, b) => {
        
        

        // Room
        if(columnName === "room") {
          if(a.room.name < b.room.name) {
            return -1;
          }
          if(a.room.name > b.room.name) {
            return 1;
          }
          if(a.room.name === b.room.name) {
            return 0;
          }
        }

        // Title
        if(columnName === "title") {
          if(a.movie.title < b.movie.title) {
            return -1;
          }
          if(a.movie.title > b.movie.title) {
            return 1;
          }
          if(a.movie.title === b.movie.title) {
            return 0;
          }
        }
        

        if ((a as any)[columnName] < (b as any)[columnName])
          return -1;
        if ((a as any)[columnName] > (b as any)[columnName])
          return 1;
        return 0;
      });
    } else {
      this.movieScheduleFilteredByDays[day as keyof MovieScheduleByDays] = this.movieScheduleFilteredByDays[day as keyof MovieScheduleByDays].sort((a, b) => {
        
        // Room
        if(columnName === "room") {
          if(a.room.name < b.room.name) {
            return 1;
          }
          if(a.room.name > b.room.name) {
            return -1;
          }
          if(a.room.name === b.room.name) {
            return 0;
          }
        }
        
        // Title
        if(columnName === "title") {
          if(a.movie.title < b.movie.title) {
            return 1;
          }
          if(a.movie.title > b.movie.title) {
            return -1;
          }
          if(a.movie.title === b.movie.title) {
            return 0;
          }
        }

        if ((a as any)[columnName] < (b as any)[columnName])
          return 1;
        if ((a as any)[columnName] > (b as any)[columnName])
          return -1;
        return 0;
      });
    }
  }


  // Output - Injects Selected Projection Values to Buy-ticket.component.html Input Form Fields
  injectProjectionReservationFields(projection: ProjectionDTO) {

    
    

    this.projectionReservation.emit(projection);
    
  }


}






