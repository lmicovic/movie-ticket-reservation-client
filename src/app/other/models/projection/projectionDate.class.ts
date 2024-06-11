import { Day } from "../../enums";
import { ProjectionDateDTO } from "./projectionDateDTO.interface";

export class ProjectionDate implements ProjectionDateDTO {

    constructor(public day: Day, public hours: number, public minutes: number) {

    }

    // public static transform(projectionDate: ProjectionDate): ProjectionDateDTO {
    //     return {
    //         day: projectionDate.day,
    //         hours: projectionDate.hours,
    //         minutes: projectionDate.minutes
    //     }
    // }

}