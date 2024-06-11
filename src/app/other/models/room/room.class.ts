import { RoomDTO } from "./roomDTO.interface";

export class Room implements RoomDTO {
   
    constructor(public id: number, public name: string, public rows: number, public columns: number) {

    }

    // public static transform(room: Room): RoomDTO {
    //     return {
    //         id: room.id,
    //         name: room.name,
    //         rows: room.rows,
    //         columns: room.columns
    //     }
    // }

}