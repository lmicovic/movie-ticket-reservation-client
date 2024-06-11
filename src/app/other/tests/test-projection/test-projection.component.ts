import { ProjectionDate } from './../../models/projection/projectionDate.class';
import { Component, OnInit } from '@angular/core';
import { ProjectionService } from '../../../services/projection/projection.service';
import { ProjectionDTO } from '../../models/projection/projectionDTO.interface';
import { Projection } from '../../models/projection/projection.class';
import { MovieService } from '../../../services/movie/movie.service';
import { RoomService } from '../../../services/room/room.service';
import { MovieDTO } from '../../models/movie/movieDTO.interface';
import { RoomDTO } from '../../models/room/roomDTO.interface';
import { ProjectionDateDTO } from '../../models/projection/projectionDateDTO.interface';

@Component({
  selector: 'test-projection',
  templateUrl: './test-projection.component.html',
  styleUrl: './test-projection.component.css'
})
export class TestProjectionComponent implements OnInit {

  jsonString: boolean = true;

  constructor(private projectionService: ProjectionService, private movieService: MovieService, private roomService: RoomService) {

  }

  ngOnInit(): void {

    // this.getAllProjections();
    // this.getProjectionById();
    // this.saveProjection();
    // this.updateProjection();
    // this.deleteProjection();

  }

  getAllProjections() {

    this.projectionService.getAll().subscribe((projections: ProjectionDTO[]) => {

      if(this.jsonString === true) {
        console.log("Get All Projections:\n" + JSON.stringify(projections, null, 2));
      }
      else {
        console.log(projections);
      }

    }, (error: Response) => {
      console.error(error);
    });    

  }

  getProjectionById() {

    this.projectionService.getById(1).subscribe((projection: ProjectionDTO) => {

      if(this.jsonString === true) {
        console.log("Get Projection By ID:\n" + JSON.stringify(projection, null, 2));
      }
      else {
        console.log(projection);
      }

    }, (error: Response) => {
      console.error(error);
    });    

  }  

  saveProjection() {
    
    this.movieService.getById(1).subscribe((movie: MovieDTO) => {
      this.roomService.getById(1).subscribe((room: RoomDTO) => {

        console.log("test");
        

        let projectionDate: ProjectionDateDTO = new ProjectionDate(1,2,3);
        let projection: ProjectionDTO = new Projection(-1, movie, room, 50, projectionDate, new Date());

        this.projectionService.save(projection).subscribe((savedProjection: ProjectionDTO) => {

          if(this.jsonString === true) {
            console.log("Saved Projection:\n" + JSON.stringify(savedProjection, null, 2));
          }
          else {
            console.log(savedProjection);
          }

        }, (error: Response) => {
          console.error(error);
        });   

      }, (error: Response) => {
        console.error(error);
      });

    }, (error: Response) => {
      console.error(error);
    });

  }

  updateProjection() {

    this.projectionService.getById(1).subscribe((projection: ProjectionDTO) => {

      let projectionDate: ProjectionDateDTO = new ProjectionDate(6, 12, 25);
      projection.projectionDate = projectionDate;

      this.projectionService.update(projection).subscribe((updatedProjection: ProjectionDTO) => {

        if(this.jsonString === true) {
          console.log("Updated Projection:\n" + JSON.stringify(updatedProjection, null, 2));
        }
        else {
          console.log(updatedProjection);
        }      
  
        
  
      }, (error: Response) => {
        console.error(error);
      }); 


    }, (error: Response) => {
      console.error(error);
    }); 

  }

  deleteProjection() {

    this.projectionService.delete(3).subscribe((updatedProjection: ProjectionDTO) => {

      console.log("Deleted Projection");

    }, (error: Response) => {
      console.error(error);
    }); 

  }

}
