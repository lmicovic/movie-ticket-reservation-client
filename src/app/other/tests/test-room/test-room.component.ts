import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../../services/room/room.service';
import { RoomDTO } from '../../models/room/roomDTO.interface';
import { Room } from '../../models/room/room.class';

@Component({
  selector: 'test-room',
  templateUrl: './test-room.component.html',
  styleUrl: './test-room.component.css'
})
export class TestRoomComponent implements OnInit {
  
  jsonString: boolean = true;

  constructor(private roomService: RoomService) {

  }

  ngOnInit(): void {

    // this.getAllRooms();
    // this.getRoomById();
    // this.saveRoom();
    // this.updateRoom();
    this.deleteRoom();
  }

  getAllRooms() {

    this.roomService.getAll().subscribe((rooms: RoomDTO[]) => {

      if(this.jsonString === true) {
        console.log("Get All Rooms:\n" + JSON.stringify(rooms, null, 2));
      }
      else {
        console.log(rooms);
      }

    }, (error: Response) => {
      console.error(error);
    });

  }

  getRoomById() {
    
    this.roomService.getById(1).subscribe((room: RoomDTO) => {

      if(this.jsonString === true) {
        console.log("Get Room By ID:\n" + JSON.stringify(room, null, 2));
      }
      else {
        console.log(room);
      }

    }, (error: Response) => {
      console.error(error);
    });

  }

  saveRoom() {

    let room: RoomDTO = new Room(-1, "Test", 3, 4);

    this.roomService.save(room).subscribe((savedRoom: RoomDTO) => {

      if(this.jsonString === true) {
        console.log("Saved Room:\n" + JSON.stringify(savedRoom, null, 2));
      }
      else {
        console.log(savedRoom);
      }

    }, (error: Response) => {
      console.error(error);
    });

  }

  updateRoom() {

    this.roomService.getById(1).subscribe((room: RoomDTO) => {

      room.name = "Test123";

      this.roomService.update(room).subscribe((updatedRoom: RoomDTO) => {

        if(this.jsonString === true) {
          console.log("Update Room:\n" + JSON.stringify(updatedRoom, null, 2));
        }
        else {
          console.log(updatedRoom);
        }
  
      }, (error: Response) => {
        console.error(error);
      });
      

    }, (error: Response) => {
      console.error(error);
    });

  }

  deleteRoom() {

    this.roomService.delete(1).subscribe((response: any) => {
      console.log("Deleted Room with Id: " + 1);
    }, (error: Response) => {
      console.error(error);
    });

  }

  

}
